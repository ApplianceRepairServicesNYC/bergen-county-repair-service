/* ============================================
   MAIN.JS - Local Service Website Template
   Complete interactive functionality
   ============================================ */

(function($) {
    'use strict';

    // ============================================
    // 1. DOCUMENT READY
    // ============================================
    $(document).ready(function() {
        initMobileNav();
        initMegaMenu();
        initStickyNav();
        initTestimonialSlider();
        initSmoothScroll();
        initContactForm();
        initPhoneMask();
        initScrollAnimations();
        setCurrentYear();
        initBackToTop();
    });


    // ============================================
    // 2. MOBILE NAVIGATION
    // ============================================
    function initMobileNav() {
        var $navToggle = $('#navToggle');
        var $navMenu = $('#navMenu');

        $navToggle.on('click', function() {
            $navMenu.toggleClass('active');
            $(this).toggleClass('active');
        });

        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.nav-wrapper').length) {
                $navMenu.removeClass('active');
                $navToggle.removeClass('active');
            }
        });

        // Close menu when clicking on a link
        $navMenu.find('a').on('click', function() {
            if ($(window).width() < 992) {
                if (!$(this).parent().hasClass('has-dropdown')) {
                    $navMenu.removeClass('active');
                    $navToggle.removeClass('active');
                }
            }
        });
    }


    // ============================================
    // 3. MEGA MENU (Mobile Toggle)
    // ============================================
    function initMegaMenu() {
        var $dropdowns = $('.has-dropdown');

        $dropdowns.each(function() {
            var $this = $(this);
            var $link = $this.find('> a');
            
            $link.on('click', function(e) {
                if ($(window).width() < 992) {
                    e.preventDefault();
                    $this.toggleClass('active');
                    $this.siblings('.has-dropdown').removeClass('active');
                }
            });
        });

        // Desktop hover behavior
        if ($(window).width() >= 992) {
            $dropdowns.hover(
                function() {
                    $(this).find('.mega-menu').stop(true, true).slideDown(200);
                },
                function() {
                    $(this).find('.mega-menu').stop(true, true).slideUp(200);
                }
            );
        }
    }


    // ============================================
    // 4. STICKY NAVIGATION
    // ============================================
    function initStickyNav() {
        var $nav = $('.main-nav');
        var navOffset = $nav.offset() ? $nav.offset().top : 0;
        var isSticky = false;

        $(window).on('scroll', function() {
            var scrollTop = $(window).scrollTop();

            if (scrollTop > navOffset && !isSticky) {
                $nav.addClass('sticky');
                isSticky = true;
            } else if (scrollTop <= navOffset && isSticky) {
                $nav.removeClass('sticky');
                isSticky = false;
            }
        });
    }


    // ============================================
    // 5. TESTIMONIAL SLIDER
    // ============================================
    function initTestimonialSlider() {
        if ($('.testimonial-slider').length) {
            $('.testimonial-slider').owlCarousel({
                items: 1,
                loop: true,
                margin: 0,
                nav: true,
                dots: true,
                autoplay: true,
                autoplayTimeout: 6000,
                autoplayHoverPause: true,
                smartSpeed: 800,
                navText: [
                    '<i class="fa fa-angle-left"></i>',
                    '<i class="fa fa-angle-right"></i>'
                ],
                responsive: {
                    0: {
                        nav: false,
                        dots: true
                    },
                    768: {
                        nav: true,
                        dots: true
                    }
                }
            });
        }
    }


    // ============================================
    // 6. SMOOTH SCROLL
    // ============================================
    function initSmoothScroll() {
        $('a[href*="#"]:not([href="#"])').on('click', function() {
            if (
                location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
                location.hostname === this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {
                    var offset = $('.main-nav').outerHeight() || 0;
                    $('html, body').animate({
                        scrollTop: target.offset().top - offset - 20
                    }, 800);
                    return false;
                }
            }
        });
    }


    // ============================================
    // 7. CONTACT FORM
    // ============================================
    function initContactForm() {
        var $form = $('#contactForm');

        $form.on('submit', function(e) {
            e.preventDefault();

            var isValid = validateForm($form);

            if (isValid) {
                submitForm($form);
            }
        });

        // Remove error on input
        $form.find('.form-control').on('input', function() {
            $(this).removeClass('error');
            $(this).siblings('.form-error').remove();
        });
    }

    function validateForm($form) {
        var isValid = true;
        var $requiredFields = $form.find('[required]');

        // Remove previous errors
        $form.find('.form-error').remove();
        $form.find('.form-control').removeClass('error');

        $requiredFields.each(function() {
            var $field = $(this);
            var value = $field.val().trim();
            var fieldType = $field.attr('type');

            if (!value) {
                showFieldError($field, 'This field is required');
                isValid = false;
            } else if (fieldType === 'email' && !isValidEmail(value)) {
                showFieldError($field, 'Please enter a valid email');
                isValid = false;
            } else if (fieldType === 'tel' && !isValidPhone(value)) {
                showFieldError($field, 'Please enter a valid phone number');
                isValid = false;
            }
        });

        return isValid;
    }

    function showFieldError($field, message) {
        $field.addClass('error');
        $field.after('<span class="form-error">' + message + '</span>');
    }

    function isValidEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function isValidPhone(phone) {
        var cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10;
    }

    function submitForm($form) {
        var $submitBtn = $form.find('.btn-submit');
        var originalText = $submitBtn.text();

        // Show loading state
        $submitBtn.prop('disabled', true).text('Sending...');
        $form.addClass('form-loading');

        // Simulate form submission (replace with actual AJAX in production)
        setTimeout(function() {
            $form.removeClass('form-loading');
            $submitBtn.prop('disabled', false).text(originalText);

            // Show success message
            $form.before('<div class="form-success">Thank you! Your message has been sent. We will contact you shortly.</div>');
            $form[0].reset();

            // Remove success message after 5 seconds
            setTimeout(function() {
                $('.form-success').fadeOut(function() {
                    $(this).remove();
                });
            }, 5000);
        }, 1500);

        /* 
        // Actual AJAX submission (uncomment for production)
        $.ajax({
            url: '/submit-form.php',
            type: 'POST',
            data: $form.serialize(),
            success: function(response) {
                $form.removeClass('form-loading');
                $submitBtn.prop('disabled', false).text(originalText);
                $form.before('<div class="form-success">Thank you! We will contact you soon.</div>');
                $form[0].reset();
            },
            error: function() {
                $form.removeClass('form-loading');
                $submitBtn.prop('disabled', false).text(originalText);
                alert('Something went wrong. Please try again.');
            }
        });
        */
    }


    // ============================================
    // 8. PHONE NUMBER MASK
    // ============================================
    function initPhoneMask() {
        var $phoneInput = $('#phoneInput');

        $phoneInput.on('input', function() {
            var value = $(this).val().replace(/\D/g, '');
            var formatted = '';

            if (value.length > 0) {
                formatted = '(' + value.substring(0, 3);
            }
            if (value.length >= 4) {
                formatted += ') ' + value.substring(3, 6);
            }
            if (value.length >= 7) {
                formatted += '-' + value.substring(6, 10);
            }

            $(this).val(formatted);
        });

        // Prevent non-numeric input
        $phoneInput.on('keypress', function(e) {
            if (!/\d/.test(String.fromCharCode(e.which)) && e.which !== 8 && e.which !== 0) {
                e.preventDefault();
            }
        });
    }


    // ============================================
    // 9. SCROLL ANIMATIONS
    // ============================================
    function initScrollAnimations() {
        var $animatedElements = $('.service-card, .trust-feature, .testimonial-item, .brand-item');

        // Add initial state
        $animatedElements.css({
            opacity: 0,
            transform: 'translateY(30px)'
        });

        function checkVisibility() {
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            var threshold = 100;

            $animatedElements.each(function() {
                var $element = $(this);
                var elementTop = $element.offset().top;

                if (elementTop < (scrollTop + windowHeight - threshold) && !$element.hasClass('animated')) {
                    $element.addClass('animated').css({
                        opacity: 1,
                        transform: 'translateY(0)',
                        transition: 'all 0.6s ease'
                    });
                }
            });
        }

        // Initial check
        checkVisibility();

        // Check on scroll with throttle
        var scrollTimer;
        $(window).on('scroll', function() {
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(checkVisibility, 50);
        });
    }


    // ============================================
    // 10. SET CURRENT YEAR
    // ============================================
    function setCurrentYear() {
        var year = new Date().getFullYear();
        $('#currentYear').text(year);
    }


    // ============================================
    // 11. BACK TO TOP BUTTON
    // ============================================
    function initBackToTop() {
        // Create button
        var $backToTop = $('<button id="backToTop" title="Back to Top"><i class="fa fa-chevron-up"></i></button>');
        $('body').append($backToTop);

        // Style button
        $backToTop.css({
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '45px',
            height: '45px',
            background: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            opacity: 0,
            visibility: 'hidden',
            transition: 'all 0.3s ease',
            zIndex: 998,
            fontSize: '18px'
        });

        // Show/hide on scroll
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 400) {
                $backToTop.css({
                    opacity: 1,
                    visibility: 'visible'
                });
            } else {
                $backToTop.css({
                    opacity: 0,
                    visibility: 'hidden'
                });
            }
        });

        // Scroll to top on click
        $backToTop.on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 600);
        });

        // Hover effect
        $backToTop.hover(
            function() {
                $(this).css('background', '#c0392b');
            },
            function() {
                $(this).css('background', '#e74c3c');
            }
        );
    }


    // ============================================
    // 12. WINDOW RESIZE HANDLER
    // ============================================
    var resizeTimer;
    $(window).on('resize', function() {
        if (resizeTimer) {
            clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(function() {
            // Reset mobile menu on resize to desktop
            if ($(window).width() >= 992) {
                $('#navMenu').removeClass('active');
                $('#navToggle').removeClass('active');
                $('.has-dropdown').removeClass('active');
            }
        }, 250);
    });


    // ============================================
    // 13. LAZY LOADING IMAGES
    // ============================================
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            var lazyImages = document.querySelectorAll('img[data-src]');

            var imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var image = entry.target;
                        image.src = image.dataset.src;
                        image.removeAttribute('data-src');
                        image.classList.add('loaded');
                        imageObserver.unobserve(image);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            lazyImages.forEach(function(image) {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            $('img[data-src]').each(function() {
                $(this).attr('src', $(this).data('src'));
            });
        }
    }


    // ============================================
    // 14. UTILITY FUNCTIONS
    // ============================================
    
    // Throttle function
    function throttle(func, wait) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            if (!timeout) {
                timeout = setTimeout(function() {
                    timeout = null;
                    func.apply(context, args);
                }, wait);
            }
        };
    }

    // Debounce function
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

})(jQuery);
