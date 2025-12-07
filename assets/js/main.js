/**
 * Bergen County Appliance Repair - Main JavaScript
 * Global UI handlers for modals, content expanders, and interactions
 */

(function() {
    'use strict';

    // ==========================================================================
    // MODAL SYSTEM
    // ==========================================================================

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    function closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(function(modal) {
            modal.style.display = 'none';
        });
        document.body.style.overflow = '';
    }

    // Global modal functions for inline onclick handlers
    window.openReviewsModal = function() { openModal('reviewsModal'); };
    window.closeReviewsModal = function() { closeModal('reviewsModal'); };
    window.openLocationsModal = function() { openModal('locationsModal'); };
    window.closeLocationsModal = function() { closeModal('locationsModal'); };
    window.openPhoneModal = function() { openModal('phoneModal'); };
    window.closePhoneModal = function() { closeModal('phoneModal'); };

    // ==========================================================================
    // REVIEWS MODAL TRIGGERS
    // ==========================================================================

    document.getElementById('navReviewsBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('reviewsModal');
    });

    document.getElementById('openReviewsBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('reviewsModal');
    });

    document.getElementById('footerReviewsBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('reviewsModal');
    });

    // ==========================================================================
    // LOCATIONS MODAL TRIGGERS
    // ==========================================================================

    document.getElementById('heroLocationsBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('locationsModal');
    });

    document.getElementById('footerLocationsBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('locationsModal');
    });

    document.getElementById('footerLocationsBtn2')?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('locationsModal');
    });

    // ==========================================================================
    // PHONE MODAL TRIGGERS
    // ==========================================================================

    document.getElementById('footerPhoneBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('phoneModal');
    });

    document.getElementById('showPhoneBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('phoneModal');
    });

    // ==========================================================================
    // MODAL CLOSE HANDLERS
    // ==========================================================================

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // ==========================================================================
    // CONTENT EXPANDER (SHOW MORE / SHOW LESS)
    // ==========================================================================

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('toggle-content-btn')) {
            const wrapper = e.target.closest('.content-wrapper');
            if (wrapper) {
                const hidden = wrapper.querySelector('.content-hidden');
                if (hidden) {
                    if (hidden.style.display === 'none' || hidden.style.display === '') {
                        hidden.style.display = 'block';
                        e.target.textContent = 'Show Less';
                    } else {
                        hidden.style.display = 'none';
                        e.target.textContent = 'Show More';
                    }
                }
            }
        }
    });

    // ==========================================================================
    // SMOOTH SCROLL
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================

    console.log('Bergen County Appliance Repair - UI Initialized');

})();

// ==========================================================================
// SHOW MORE/LESS BUTTONS FOR INTERNAL LINKS
// ==========================================================================

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('show-more-links-btn')) {
        const btn = e.target;
        const targetClass = btn.getAttribute('data-target');
        const hiddenSection = btn.parentElement.querySelector('.' + targetClass);
        
        if (hiddenSection) {
            if (hiddenSection.style.display === 'none' || !hiddenSection.classList.contains('expanded')) {
                hiddenSection.style.display = 'block';
                hiddenSection.classList.add('expanded');
                btn.classList.add('expanded');
                btn.textContent = 'Show Less ▲';
            } else {
                hiddenSection.style.display = 'none';
                hiddenSection.classList.remove('expanded');
                btn.classList.remove('expanded');
                btn.textContent = 'Show More ▼';
            }
        }
    }
});

// ==========================================================================
// TOGGLE LINK BLOCK - SHOW MORE / SHOW LESS
// ==========================================================================

function toggleLinkBlock(btn) {
    // Find the next ul sibling (the link list)
    const linkList = btn.nextElementSibling;
    
    if (linkList && linkList.tagName === 'UL') {
        if (linkList.classList.contains('links-collapsed')) {
            // Expand
            linkList.classList.remove('links-collapsed');
            linkList.classList.add('links-expanded');
            btn.classList.add('expanded');
            btn.textContent = 'Show Less ▲';
        } else {
            // Collapse
            linkList.classList.remove('links-expanded');
            linkList.classList.add('links-collapsed');
            btn.classList.remove('expanded');
            btn.textContent = 'Show More ▼';
        }
    }
}
