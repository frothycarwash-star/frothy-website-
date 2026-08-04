/* Frothy Carwash Lounge — conversion measurement */
(function () {
  'use strict';

  var ATTRIBUTION_KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  var FORMSPREE_ENDPOINT = 'formspree.io/f/mdavkzej';
  var trackingInstalled = false;

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
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  }

  function installBookingRequestTracking() {
    var nativeFetch = window.fetch.bind(window);

    window.fetch = function (input, init) {
      return nativeFetch(input, init).then(function (response) {
        var url = typeof input === 'string' ? input : input && input.url;
        if (!url || url.indexOf(FORMSPREE_ENDPOINT) === -1) return response;

        if (!response.ok) {
          return Promise.reject(new Error('Booking request was not accepted.'));
        }

        var payload = {};
        try {
          payload = init && typeof init.body === 'string' ? JSON.parse(init.body) : {};
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
    if (trackingInstalled) return;
    if (typeof window.gtag !== 'function') {
      setTimeout(initTracking, 100);
      return;
    }

    trackingInstalled = true;
    persistAttribution();
    installBookingRequestTracking();

    document.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (!link) return;
      var href = link.getAttribute('href') || '';

      if (href.indexOf('tel:') === 0) {
        sendEvent('phone_call_click', {
          phone_number: href.replace('tel:', ''),
          lead_source: 'website_phone_click'
        });
      }

      if (href.indexOf('wa.me') !== -1) {
        sendEvent('whatsapp_click', { lead_source: 'website_whatsapp_click' });
      }

      if (href.indexOf('square.site/book') !== -1) {
        sendEvent('booking_start', Object.assign({
          lead_source: 'square_booking_start'
        }, storedAttribution()));
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracking);
  } else {
    initTracking();
  }
})();
