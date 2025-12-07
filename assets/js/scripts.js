document.addEventListener('DOMContentLoaded', function() {
    var mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    var mainNav = document.querySelector('.main-nav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });
    }

    var dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function(dropdown) {
        var link = dropdown.querySelector('a');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    var toggleBtns = document.querySelectorAll('.toggle-content-btn');
    toggleBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var wrapper = this.closest('.content-wrapper');
            var hiddenContent = wrapper.querySelector('.content-hidden');
            if (hiddenContent) {
                hiddenContent.classList.toggle('active');
                this.textContent = hiddenContent.classList.contains('active') ? 'Show Less' : 'Show More';
            }
        });
    });
});
