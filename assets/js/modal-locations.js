/**
 * Modal Locations - Find Your Town
 * Pure Vanilla JavaScript - No dependencies
 * Bergen County Appliance Repair
 */

(function() {
    'use strict';

    // DOM Elements
    let modal = null;
    let openBtn = null;
    let closeBtns = null;
    let modalContent = null;

    /**
     * Initialize modal functionality
     */
    function initModal() {
        modal = document.getElementById('locationsModal');
        openBtn = document.getElementById('openModal');
        modalContent = modal ? modal.querySelector('.modal-content') : null;
        closeBtns = modal ? modal.querySelectorAll('[data-close-modal]') : [];

        if (!modal || !openBtn) {
            return;
        }

        // Open modal button
        openBtn.addEventListener('click', openModal);

        // Close buttons
        closeBtns.forEach(function(btn) {
            btn.addEventListener('click', closeModal);
        });

        // Click outside modal content to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Prevent modal content clicks from closing
        if (modalContent) {
            modalContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }

    /**
     * Open the modal
     */
    function openModal() {
        if (!modal) return;

        modal.style.display = 'flex';
        document.body.classList.add('modal-open');

        // Trigger animation after display change
        requestAnimationFrame(function() {
            modal.classList.add('active');
            requestAnimationFrame(function() {
                modal.classList.add('fade-in');
            });
        });

        // Focus trap - focus first link in modal
        var firstLink = modal.querySelector('.towns-grid a');
        if (firstLink) {
            setTimeout(function() {
                firstLink.focus();
            }, 300);
        }

        // Analytics tracking (optional)
        if (typeof gtag === 'function') {
            gtag('event', 'modal_open', {
                'event_category': 'engagement',
                'event_label': 'Find Your Town Modal'
            });
        }
    }

    /**
     * Close the modal
     */
    function closeModal() {
        if (!modal) return;

        modal.classList.remove('fade-in');

        setTimeout(function() {
            modal.classList.remove('active');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }, 300);

        // Return focus to open button
        if (openBtn) {
            openBtn.focus();
        }
    }

    /**
     * Expose functions globally for inline onclick handlers
     */
    window.openLocationsModal = openModal;
    window.closeLocationsModal = closeModal;

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }

})();
