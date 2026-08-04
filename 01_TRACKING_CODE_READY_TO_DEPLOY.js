/*
 * Frothy Carwash Lounge — conversion measurement
 * Tracks only business-relevant actions and preserves paid-click identifiers
 * for booking-request follow-up.
 */
(function () {
  'use strict';

  var ATTRIBUTION_KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  var FORMSPREE_ENDPOINT = 'formspree.io/f/mdavkzej';

  function persistAttribution() {
    var params = new URLSearchParams(window.location.search);
    ATTRIBUTION_KEYS.forEach(function (key) {
      var value = params.get(key);
      if (value) window.sessionStorage.setItem('frothy_' + key, value);
    });
  }

  function storedAttribution() {
    return ATTRIBUTION_KEYS.reduce(function (values, key) {
      var value = window.sessionStorage.getItem('frothy_' + key);
      if (value) values[key] = value;
      return values;
    }, {});
  }

  function sendEvent(name, params) {
    if (window.gtag) window.gtag('event', name, params);
  }

  function installBookingRequestTracking() {
    var nativeFetch = window.fetch.bind(window);

    window.fetch = function (input, init) {
      return nativeFetch(input, init).then(function (response) {
        var url = typeof input === 'string' ? input : input && input.url;
        if (!response.ok || !url || url.indexOf(FORMSPREE_ENDPOINT) === -1) return response;

        var payload = {};
        try {
          payload = init && init.body ? JSON.parse(init.body) : {};
        } catch (error) {
          console.warn('Unable to read booking request payload for analytics.', error);
        }

        var reference = payload.reference || 'booking-' + Date.now();
        sendEvent('qualify_lead', Object.assign({
          event_id: 'frothy-' + reference,
          booking_reference: reference,
          service_type: payload.service || 'not_provided',
          lead_source: 'website_booking_request'
        }, storedAttribution()));

        return response;
      });
    };
  }

  function initTracking() {
    if (!window.gtag) {
      setTimeout(initTracking, 100);
      return;
    }

    persistAttribution();
    installBookingRequestTracking();

    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        sendEvent('phone_call_click', {
          phone_number: link.getAttribute('href').replace('tel:', ''),
          lead_source: 'website_phone_click'
        });
      });
    });

    document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
      link.addEventListener('click', function () {
        sendEvent('whatsapp_click', { lead_source: 'website_whatsapp_click' });
      });
    });

    document.querySelectorAll('a[href*="square.site/book"]').forEach(function (link) {
      link.addEventListener('click', function () {
        sendEvent('booking_start', Object.assign({
          lead_source: 'square_booking_start'
        }, storedAttribution()));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracking);
  } else {
    initTracking();
  }
})();
