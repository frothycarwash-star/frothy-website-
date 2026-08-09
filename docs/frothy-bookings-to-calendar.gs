/**
 * Frothy Carwash Lounge - website bookings into Google Calendar
 * ------------------------------------------------------------
 * Reads the booking emails Formspree sends and creates a matching Google
 * Calendar event for each one.
 *
 * Runs inside the Frothy Google account, so there are no API keys and no
 * service account. Square bookings arrive separately via Square's own
 * calendar sync - this only handles bookings made through the website form.
 *
 * SETUP
 *   1. script.google.com -> New project
 *   2. Paste this file in, replacing the default code
 *   3. Run "createTrigger" once and accept the authorization prompt
 *   4. Done - it checks for new bookings every 5 minutes
 *
 * Check the project timezone is America/New_York under Project Settings,
 * otherwise events land at the wrong hour.
 */

var CALENDAR_ID = 'frothycarwash@gmail.com';
var PROCESSED_LABEL = 'frothy-synced';
var LOCATION = '2223 Pembroke Rd, Hollywood, FL 33020';

var SEARCH_QUERY = 'subject:"New booking" -label:' + PROCESSED_LABEL + ' newer_than:14d';

// How long each service occupies a bay, in minutes. Adjust freely.
var DURATIONS = [
  [/exterior wash/i, 30],
  [/interior vacuum/i, 30],
  [/inside & out/i, 45],
  [/signature detail/i, 60],
  [/executive finish/i, 90],
  [/full detail/i, 180],
  [/showroom detail/i, 240],
  [/paint correction/i, 240],
  [/ceramic coating/i, 480],
  [/headlight restoration/i, 60],
  [/membership/i, 30]
];

/**
 * Run this ONCE to schedule the sync. Safe to run again - it replaces any
 * existing trigger rather than stacking duplicates.
 */
function createTrigger() {
  var existing = ScriptApp.getProjectTriggers();
  for (var i = 0; i < existing.length; i++) {
    if (existing[i].getHandlerFunction() === 'syncBookingsToCalendar') {
      ScriptApp.deleteTrigger(existing[i]);
    }
  }
  ScriptApp.newTrigger('syncBookingsToCalendar').timeBased().everyMinutes(5).create();
  Logger.log('Done - bookings will now sync every 5 minutes.');
}

/**
 * The job itself. Finds unprocessed booking emails, creates calendar events,
 * then labels the emails so they are never handled twice.
 */
function syncBookingsToCalendar() {
  var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  if (!calendar) {
    Logger.log('Could not open calendar: ' + CALENDAR_ID);
    return;
  }

  var label = getOrCreateLabel_(PROCESSED_LABEL);
  var threads = GmailApp.search(SEARCH_QUERY, 0, 50);
  Logger.log('Found ' + threads.length + ' booking email(s) to check.');

  for (var t = 0; t < threads.length; t++) {
    var messages = threads[t].getMessages();
    var handled = 0;

    for (var m = 0; m < messages.length; m++) {
      var booking = parseBooking_(messages[m].getPlainBody());
      if (!booking) continue;
      if (createEvent_(calendar, booking)) handled++;
    }

    threads[t].addLabel(label);
    if (handled === 0) {
      Logger.log('No usable booking found in: ' + threads[t].getFirstMessageSubject());
    }
  }
}

function getOrCreateLabel_(name) {
  return GmailApp.getUserLabelByName(name) || GmailApp.createLabel(name);
}

function durationFor_(service) {
  for (var i = 0; i < DURATIONS.length; i++) {
    if (DURATIONS[i][0].test(service || '')) return DURATIONS[i][1];
  }
  return 60;
}

function parseBooking_(body) {
  if (!body) return null;

  function field(name) {
    var match = new RegExp('^\\s*' + name + '\\s*:\\s*(.+)$', 'im').exec(body);
    return match ? match[1].trim() : '';
  }

  var booking = {
    reference: field('reference'),
    name: field('name'),
    phone: field('phone'),
    service: field('service'),
    addOns: field('addOns'),
    date: field('date'),
    time: field('time'),
    notes: field('notes')
  };

  if (!booking.name || !booking.date || !booking.time) return null;
  return booking;
}

function buildStart_(dateStr, timeStr) {
  var d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr).trim());
  var t = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(String(timeStr).trim());
  if (!d || !t) return null;

  var hour = parseInt(t[1], 10);
  var minute = parseInt(t[2], 10);
  if (/pm/i.test(t[3]) && hour !== 12) hour += 12;
  if (/am/i.test(t[3]) && hour === 12) hour = 0;

  return new Date(parseInt(d[1], 10), parseInt(d[2], 10) - 1, parseInt(d[3], 10), hour, minute);
}

function createEvent_(calendar, booking) {
  var start = buildStart_(booking.date, booking.time);
  if (!start) {
    Logger.log('Unreadable date/time: ' + booking.date + ' ' + booking.time);
    return false;
  }

  var end = new Date(start.getTime() + durationFor_(booking.service) * 60000);

  if (booking.reference) {
    var nearby = calendar.getEvents(
      new Date(start.getTime() - 86400000),
      new Date(start.getTime() + 86400000)
    );
    for (var i = 0; i < nearby.length; i++) {
      if (nearby[i].getDescription().indexOf(booking.reference) !== -1) {
        Logger.log('Already in calendar: ' + booking.reference);
        return false;
      }
    }
  }

  var lines = [
    'Name: ' + booking.name,
    'Phone: ' + (booking.phone || 'not given'),
    'Service: ' + (booking.service || 'not specified'),
    'Add-ons: ' + (booking.addOns || 'None')
  ];
  if (booking.notes) lines.push('Notes: ' + booking.notes);
  lines.push('Reference: ' + (booking.reference || 'n/a'));
  lines.push('');
  lines.push('Booked via the website form.');

  calendar.createEvent(
    'WEB - ' + (booking.service || 'Booking') + ' - ' + booking.name,
    start,
    end,
    { description: lines.join('\n'), location: LOCATION }
  );

  Logger.log('Created: ' + booking.name + ' on ' + booking.date + ' at ' + booking.time);
  return true;
}
