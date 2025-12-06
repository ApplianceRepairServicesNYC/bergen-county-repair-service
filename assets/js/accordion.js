/**
 * Accordion Locations Menu
 * Pure Vanilla JS - No frameworks required
 * Bergen County Appliance Repair
 */

(function() {
    'use strict';

    // Initialize accordion functionality
    function initAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        if (!accordionHeaders.length) return;

        accordionHeaders.forEach(function(header) {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                const isActive = accordionItem.classList.contains('active');
                
                // Optional: Close other accordions (uncomment for single-open behavior)
                // const allItems = document.querySelectorAll('.accordion-item');
                // allItems.forEach(function(item) {
                //     item.classList.remove('active');
                // });

                // Toggle current accordion
                if (isActive) {
                    accordionItem.classList.remove('active');
                } else {
                    accordionItem.classList.add('active');
                }
            });

            // Keyboard accessibility
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });

            // Make header focusable
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');
        });

        // Update aria-expanded on toggle
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const item = mutation.target;
                    const header = item.querySelector('.accordion-header');
                    if (header) {
                        const isActive = item.classList.contains('active');
                        header.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                    }
                }
            });
        });

        document.querySelectorAll('.accordion-item').forEach(function(item) {
            observer.observe(item, { attributes: true });
        });

        // Open first accordion by default (optional)
        // const firstItem = document.querySelector('.accordion-item');
        // if (firstItem) firstItem.classList.add('active');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccordion);
    } else {
        initAccordion();
    }
})();
