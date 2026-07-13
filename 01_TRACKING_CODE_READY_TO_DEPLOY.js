/**
 * FROTHY CAR WASH - CONVERSION TRACKING
 * Production-Ready Tracking Implementation
 * Ready to paste into GTM or website <head>
 *
 * This code tracks:
 * - Phone clicks (tel: links)
 * - WhatsApp clicks (wa.me links)
 * - Contact form submissions
 * - Service page views
 * - Booking page engagement
 */

(function() {
    'use strict';

   // Wait for GA4/GTM to be ready
   function initTracking() {
         if (!window.gtag || !window.dataLayer) {
                 setTimeout(initTracking, 100);
                 return;
         }

      // ========== PHONE CLICK TRACKING ==========
      document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
              link.addEventListener('click', function() {
                        var phone = link.getAttribute('href').replace('tel:', '');
                        gtag('event', 'phone_call', {
                                    'phone_number': phone,
                                    'event_category': 'engagement',
                                    'event_label': 'click_to_call'
                        });
                        dataLayer.push({'event': 'phone_call', 'phone_number': phone});
              });
      });

      // ========== WHATSAPP CLICK TRACKING ==========
      document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
              link.addEventListener('click', function() {
                        gtag('event', 'whatsapp_click', {
                                    'event_category': 'engagement',
                                    'event_label': 'whatsapp_inquiry'
                        });
                        dataLayer.push({'event': 'whatsapp_click'});
              });
      });

      // ========== CONTACT FORM TRACKING ==========
      var contactForm = document.querySelector('form');
         if (contactForm) {
                 contactForm.addEventListener('submit', function() {
                           gtag('event', 'form_submit', {
                                       'form_type': 'contact',
                                       'form_name': 'quick_message',
                                       'event_category': 'lead',
                                       'event_label': 'contact_form'
                           });
                           dataLayer.push({'event': 'form_submit', 'form_type': 'contact'});
                 });
         }

      // ========== BOOKING PAGE TRACKING ==========
      var path = window.location.pathname;
         if (path === '/contact' || path === '/services' || path === '/ceramic') {
                 gtag('event', 'page_view_' + path.replace(/\//g, '_'), {
                           'event_category': 'engagement',
                           'page_path': path
                 });
                 dataLayer.push({'event': 'booking_page_view', 'page_path': path});
         }
   }

   // Start tracking when DOM is ready
   if (document.readyState === 'loading') {
         document.addEventListener('DOMContentLoaded', initTracking);
   } else {
         initTracking();
   }

})();
