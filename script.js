/* ================================================================
   WEBVIBES.ID - OFFICIAL INTERACTION SCRIPT
================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM ELEMENTS
    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navMenu: document.querySelector('.nav-menu'),
        backToTopBtn: document.getElementById('back-to-top'),
        contactForm: document.getElementById('contact-form'),
        audio: document.getElementById('hidden-audio-player'),
        modal: document.getElementById('music-welcome-modal'),
        closeModalBtn: document.getElementById('close-welcome-modal'),
        toggleMusicBtn: document.getElementById('toggle-hidden-music'),
        yearSpan: document.getElementById('current-year'),
        animatedItems: document.querySelectorAll('.service-card, .portfolio-item, .about-content, .about-image, .meaning-item, .poster-card'),
        posterCards: document.querySelectorAll('.poster-card') // New element for poster cards
    };

    // 2. MOBILE NAVIGATION
    if (elements.hamburger) {
        elements.hamburger.addEventListener('click', () => {
            elements.hamburger.classList.toggle('active');
            elements.navMenu.classList.toggle('active');
        });

        // Close menu when clicking links or outside
        document.addEventListener('click', (e) => {
            if (!elements.hamburger.contains(e.target) && !elements.navMenu.contains(e.target)) {
                elements.hamburger.classList.remove('active');
                elements.navMenu.classList.remove('active');
            }
        });
    }

    // 3. BACK TO TOP BUTTON
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            elements.backToTopBtn?.classList.add('show');
        } else {
            elements.backToTopBtn?.classList.remove('show');
        }
    }, { passive: true });

    elements.backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. FOOTER YEAR
    if (elements.yearSpan) elements.yearSpan.textContent = new Date().getFullYear();

    // 5. CONTACT FORM HANDLING
    elements.contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = elements.contactForm.querySelector('button');
        const nameInput = elements.contactForm.querySelector('input[type="text"]');
        
        if (!nameInput) return;
        
        const name = nameInput.value;
        
        // Disable button feedback
        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim...';

        setTimeout(() => {
            alert(`Terima kasih ${name}! Pesan berhasil dikirim.`);
            elements.contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Kirim Pesan';
        }, 1500);
    });

    // 6. HIDDEN MUSIC SYSTEM (OPTIMIZED)
    let isMusicPlaying = false;

    const playMusic = () => {
        if (!elements.audio) return;
        elements.audio.play()
            .then(() => {
                isMusicPlaying = true;
                if (elements.toggleMusicBtn) elements.toggleMusicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                if (elements.modal) elements.modal.style.display = 'none';
            })
            .catch(() => {
                // Autoplay blocked, show modal
                if (elements.modal) elements.modal.style.display = 'flex';
            });
    };

    // Initial attempt after 1s
    setTimeout(playMusic, 1000);

    // Interaction to start music
    elements.closeModalBtn?.addEventListener('click', playMusic);
    
    // Admin Toggle
    elements.toggleMusicBtn?.addEventListener('click', () => {
        if (!elements.audio) return;
        
        if (isMusicPlaying) {
            elements.audio.pause();
            elements.toggleMusicBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            elements.audio.play();
            elements.toggleMusicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Page Visibility (Pause when tab is inactive)
    document.addEventListener('visibilitychange', () => {
        if (elements.audio && isMusicPlaying) {
            document.hidden ? elements.audio.pause() : elements.audio.play();
        }
    });

    // 7. SCROLL ANIMATIONS (Using Intersection Observer - High Performance)
    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop watching once animated
            }
        });
    }, observerOptions);

    elements.animatedItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });

    // 8. SMOOTH SCROLL OFFSET
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (elements.navMenu && elements.navMenu.classList.contains('active')) {
                    elements.navMenu.classList.remove('active');
                    if (elements.hamburger) elements.hamburger.classList.remove('active');
                }
            }
        });
    });

    // 9. POSTER SECTION INTERACTIVITY
    function initPosterSection() {
        if (!elements.posterCards || elements.posterCards.length === 0) return;
        
        elements.posterCards.forEach(card => {
            // Hover effect enhancement
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.transition = 'transform 0.3s ease';
                card.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.zIndex = '1';
            });
            
            // Click effect
            card.addEventListener('click', (e) => {
                // Check if click was on the view button
                const viewBtn = card.querySelector('.view-poster-btn');
                if (viewBtn && !e.target.closest('.view-poster-btn')) {
                    const modalId = viewBtn.getAttribute('data-bs-target');
                    const modalElement = document.querySelector(modalId);
                    
                    if (modalElement && typeof bootstrap !== 'undefined') {
                        const modal = new bootstrap.Modal(modalElement);
                        modal.show();
                    }
                }
            });
        });
        
        // Add keyboard navigation for poster modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModals = document.querySelectorAll('.modal.show');
                openModals.forEach(modal => {
                    const bsModal = bootstrap.Modal.getInstance(modal);
                    if (bsModal) {
                        bsModal.hide();
                    }
                });
            }
        });
    }

    // 10. POSTER MODAL ENHANCEMENTS
    function initPosterModals() {
        const posterModals = document.querySelectorAll('.poster-modal');
        
        posterModals.forEach(modal => {
            modal.addEventListener('shown.bs.modal', () => {
                // Add animation to modal content
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.transform = 'scale(0.9)';
                    modalContent.style.opacity = '0';
                    
                    setTimeout(() => {
                        modalContent.style.transition = 'all 0.3s ease';
                        modalContent.style.transform = 'scale(1)';
                        modalContent.style.opacity = '1';
                    }, 50);
                }
            });
            
            // Close modal on background click
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    const bsModal = bootstrap.Modal.getInstance(this);
                    if (bsModal) {
                        bsModal.hide();
                    }
                }
            });
        });
    }

    // 11. IMAGE LAZY LOADING FOR POSTERS (Performance Optimization)
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('.poster-card img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, { threshold: 0.1 });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // 12. INITIALIZE ALL FUNCTIONS
    initPosterSection();
    initPosterModals();
    initLazyLoading();

    // 13. LOADING STATE HANDLER
    window.addEventListener('load', function() {
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        // Remove loading animation if exists
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }, 500);
        }
    });

    // Debug log untuk memastikan script berjalan
    console.log('WEBVIBES.ID Script loaded successfully!');
    console.log(`Poster cards found: ${elements.posterCards.length}`);
});