/* ================================================================
   WEBVIBES.ID - OFFICIAL INTERACTION SCRIPT
   =============================================================== */

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
        posterCards: document.querySelectorAll('.poster-card'),
        heroImage: document.querySelector('.hero-image img'),
        floatingShapes: document.querySelectorAll('.floating-shapes .shape'),
        // ============ NEW: VISI & MISI ELEMENTS ============
        visionCards: document.querySelectorAll('.vision-section .value-card, .vision-section .mission-card'),
        missionCards: document.querySelectorAll('.mission-section .mission-card'),
        missionSection: document.querySelector('.mission-section'),
        visionSection: document.querySelector('.vision-section'),
        missionIcons: document.querySelectorAll('.mission-card-icon i'),
        visionIcons: document.querySelectorAll('.vision-section .value-card i, .vision-section .mission-card i')
    };

    // 2. MOBILE NAVIGATION
    if (elements.hamburger) {
        elements.hamburger.addEventListener('click', () => {
            elements.hamburger.classList.toggle('active');
            elements.navMenu.classList.toggle('active');
        });

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
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim...';

        setTimeout(() => {
            alert(`Terima kasih ${name}! Pesan berhasil dikirim.`);
            elements.contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Kirim Pesan';
        }, 1500);
    });

    // 6. HIDDEN MUSIC SYSTEM
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
                if (elements.modal) elements.modal.style.display = 'flex';
            });
    };

    setTimeout(playMusic, 1000);

    elements.closeModalBtn?.addEventListener('click', playMusic);
    
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

    document.addEventListener('visibilitychange', () => {
        if (elements.audio && isMusicPlaying) {
            document.hidden ? elements.audio.pause() : elements.audio.play();
        }
    });

    // ================ ANIMASI GAMBAR BERGERAK ================
    
    // 7. HERO IMAGE FLOATING ANIMATION
    function initHeroImageAnimation() {
        if (elements.heroImage) {
            elements.heroImage.style.animation = 'floatHero 6s infinite ease-in-out';
            
            const styleSheet = document.createElement("style");
            styleSheet.textContent = `
                @keyframes floatHero {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-15px) rotate(2deg);
                    }
                    50% {
                        transform: translateY(-25px) rotate(0deg);
                    }
                    75% {
                        transform: translateY(-15px) rotate(-2deg);
                    }
                }
                
                @keyframes floatShape {
                    0%, 100% {
                        transform: translate(0, 0);
                    }
                    25% {
                        transform: translate(15px, -15px);
                    }
                    50% {
                        transform: translate(-10px, 10px);
                    }
                    75% {
                        transform: translate(-15px, -10px);
                    }
                }
                
                @keyframes pulseSlow {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.3;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.5;
                    }
                }
                
                @keyframes rotateSlow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes slideInOut {
                    0%, 100% {
                        transform: translateX(0) translateY(0);
                    }
                    25% {
                        transform: translateX(20px) translateY(-10px);
                    }
                    50% {
                        transform: translateX(-15px) translateY(15px);
                    }
                    75% {
                        transform: translateX(10px) translateY(-15px);
                    }
                }
                
                @keyframes floatCard {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }
                
                @keyframes pulseIcon {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }
                
                @keyframes rotateIcon {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes bounceCard {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    // 8. FLOATING SHAPES ANIMATION
    function initFloatingShapes() {
        if (elements.floatingShapes.length > 0) {
            elements.floatingShapes.forEach((shape, index) => {
                shape.style.animation = `floatShape ${12 + index * 2}s infinite ease-in-out`;
                shape.style.animationDelay = `${index * 2}s`;
                
                shape.addEventListener('mouseenter', function() {
                    this.style.animationDuration = '3s';
                    this.style.opacity = '0.5';
                });
                
                shape.addEventListener('mouseleave', function() {
                    this.style.animationDuration = `${12 + index * 2}s`;
                    this.style.opacity = '0.3';
                });
            });
        }
    }

    // 9. MEANING CARDS ANIMATION
    function initMeaningCardsAnimation() {
        const meaningCards = document.querySelectorAll('.meaning-item');
        
        meaningCards.forEach((card, index) => {
            card.style.transition = 'all 0.4s ease';
            card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                
                const icon = this.querySelector('.meaning-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
                
                const icon = this.querySelector('.meaning-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0)';
                }
            });
        });
    }

    // 10. VALUE CARDS ANIMATION
    function initValueCardsAnimation() {
        const valueCards = document.querySelectorAll('.value-card');
        
        valueCards.forEach((card, index) => {
            card.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.animation = `fadeInUp 0.5s ease ${0.3 + index * 0.1}s forwards`;
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.03)';
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        });
    }

    // ============ NEW: VISI & MISI ANIMATIONS ============
    
    // 11. VISION CARDS ANIMATION
    function initVisionCardsAnimation() {
        if (!elements.visionCards || elements.visionCards.length === 0) return;
        
        elements.visionCards.forEach((card, index) => {
            // Initial animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
            
            // Hover animation
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.05)';
                this.style.boxShadow = '0 20px 30px rgba(0,0,0,0.15)';
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(360deg) scale(1.2)';
                    icon.style.transition = 'all 0.6s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0) scale(1)';
                }
            });
        });
    }

    // 12. MISSION CARDS ANIMATION
    function initMissionCardsAnimation() {
        if (!elements.missionCards || elements.missionCards.length === 0) return;
        
        elements.missionCards.forEach((card, index) => {
            // Initial animation - staggered entrance
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + (index * 80));
            
            // Floating animation for each card
            setInterval(() => {
                if (!card.matches(':hover')) {
                    card.style.animation = 'floatCard 3s infinite ease-in-out';
                }
            }, 100);
            
            // Hover animation
            card.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                this.style.transform = 'translateY(-15px) scale(1.05)';
                this.style.boxShadow = '0 20px 30px rgba(0,0,0,0.2)';
                this.style.zIndex = '10';
                
                // Animate icon
                const icon = this.querySelector('.mission-card-icon i');
                if (icon) {
                    icon.style.animation = 'rotateIcon 0.8s ease';
                    icon.style.color = '#f72585';
                }
                
                // Animate icon container
                const iconContainer = this.querySelector('.mission-card-icon');
                if (iconContainer) {
                    iconContainer.style.background = 'rgba(247, 37, 133, 0.3)';
                    iconContainer.style.transform = 'scale(1.1)';
                    iconContainer.style.transition = 'all 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.animation = 'floatCard 3s infinite ease-in-out';
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
                this.style.zIndex = '1';
                
                const icon = this.querySelector('.mission-card-icon i');
                if (icon) {
                    icon.style.animation = 'none';
                    icon.style.color = 'white';
                }
                
                const iconContainer = this.querySelector('.mission-card-icon');
                if (iconContainer) {
                    iconContainer.style.background = 'rgba(255,255,255,0.2)';
                    iconContainer.style.transform = 'scale(1)';
                }
            });
        });
    }

    // 13. MISSION SECTION HEADER ANIMATION
    function initMissionHeaderAnimation() {
        if (elements.missionSection) {
            const missionHeader = elements.missionSection.querySelector('.mission-header');
            const missionIcon = elements.missionSection.querySelector('.mission-icon');
            
            if (missionHeader) {
                missionHeader.style.animation = 'fadeInUp 0.8s ease forwards';
            }
            
            if (missionIcon) {
                // Pulse animation for main mission icon
                setInterval(() => {
                    missionIcon.style.animation = 'pulseIcon 2s infinite ease-in-out';
                }, 100);
                
                missionIcon.addEventListener('mouseenter', function() {
                    this.style.animation = 'rotateIcon 1s ease';
                    this.style.background = 'linear-gradient(135deg, #f72585, #b5179e)';
                });
                
                missionIcon.addEventListener('mouseleave', function() {
                    this.style.animation = 'pulseIcon 2s infinite ease-in-out';
                    this.style.background = 'linear-gradient(135deg, #4361ee, #3a0ca3)';
                });
            }
        }
    }

    // 14. VISION SECTION ANIMATION
    function initVisionSectionAnimation() {
        if (elements.visionSection) {
            const visionHeader = elements.visionSection.querySelector('.section-header');
            const visionCards = elements.visionSection.querySelectorAll('.value-card');
            
            if (visionHeader) {
                visionHeader.style.animation = 'fadeInUp 0.8s ease forwards';
            }
            
            visionCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.15}s`;
            });
        }
    }

    // 15. MISSION ICONS ENHANCEMENT
    function initMissionIconsAnimation() {
        if (elements.missionIcons.length > 0) {
            elements.missionIcons.forEach((icon, index) => {
                icon.style.transition = 'all 0.3s ease';
                
                // Random subtle animation on load
                setTimeout(() => {
                    icon.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        icon.style.transform = 'scale(1)';
                    }, 300);
                }, 500 + (index * 100));
            });
        }
    }

    // 16. POSTER SECTION ANIMATION
    function initPosterSection() {
        if (!elements.posterCards || elements.posterCards.length === 0) return;
        
        elements.posterCards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s forwards`;
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.03)';
                card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.zIndex = '10';
                
                const img = card.querySelector('.poster-image');
                if (img) {
                    img.style.transform = 'scale(1.08)';
                    img.style.transition = 'all 0.6s ease';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.zIndex = '1';
                
                const img = card.querySelector('.poster-image');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
            
            card.addEventListener('click', (e) => {
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
    }

    // 17. SERVICE CARDS ANIMATION
    function initServiceCardsAnimation() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
            
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'rotate(360deg) scale(1.1)';
                    icon.style.transition = 'all 0.6s ease';
                    icon.style.background = 'rgba(255,255,255,0.3)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0) scale(1)';
                    icon.style.background = 'rgba(255,255,255,0.2)';
                }
            });
        });
    }

    // 18. SCROLL ANIMATIONS
    const observerOptions = { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.animatedItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(item);
    });

    // 19. SMOOTH SCROLL OFFSET
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
                
                if (elements.navMenu && elements.navMenu.classList.contains('active')) {
                    elements.navMenu.classList.remove('active');
                    if (elements.hamburger) elements.hamburger.classList.remove('active');
                }
            }
        });
    });

    // 20. POSTER MODAL ENHANCEMENTS
    function initPosterModals() {
        const posterModals = document.querySelectorAll('.poster-modal');
        
        posterModals.forEach(modal => {
            modal.addEventListener('shown.bs.modal', () => {
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.transform = 'scale(0.8) rotate(-2deg)';
                    modalContent.style.opacity = '0';
                    
                    setTimeout(() => {
                        modalContent.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        modalContent.style.transform = 'scale(1) rotate(0)';
                        modalContent.style.opacity = '1';
                    }, 50);
                }
            });
            
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

    // 21. PARALLAX EFFECT ON SCROLL
    function initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            if (elements.heroImage) {
                elements.heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
            
            elements.floatingShapes.forEach((shape, index) => {
                shape.style.transform = `translate(${scrolled * 0.02 * (index + 1)}px, ${scrolled * 0.01 * (index + 1)}px)`;
            });
        }, { passive: true });
    }

    // 22. IMAGE LAZY LOADING
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
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // ================ INITIALIZE ALL ANIMATIONS ================
    initHeroImageAnimation();
    initFloatingShapes();
    initMeaningCardsAnimation();
    initValueCardsAnimation();
    initLogoAnimation();
    initPosterSection();
    initServiceCardsAnimation();
    initPosterModals();
    initParallaxEffect();
    initLazyLoading();
    
    // ============ NEW: INITIALIZE VISI & MISI ANIMATIONS ============
    initVisionCardsAnimation();
    initMissionCardsAnimation();
    initMissionHeaderAnimation();
    initVisionSectionAnimation();
    initMissionIconsAnimation();

    // 23. LOGO ANIMATION ENHANCEMENT
    function initLogoAnimation() {
        const logos = document.querySelectorAll('.logo-circle');
        
        logos.forEach((logo, index) => {
            logo.style.animation = `pulseSlow 3s infinite ease-in-out`;
            logo.style.animationDelay = `${index * 0.5}s`;
            
            logo.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                this.style.transform = 'scale(1.2) rotate(5deg)';
                this.style.transition = 'all 0.3s ease';
                this.style.zIndex = '100';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.animation = `pulseSlow 3s infinite ease-in-out`;
                this.style.animationDelay = `${index * 0.5}s`;
                this.style.transform = 'scale(1) rotate(0)';
            });
        });
    }

    // 24. LOADING STATE HANDLER
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }, 500);
        }
        
        if (elements.heroImage) {
            elements.heroImage.style.animation = 'floatHero 6s infinite ease-in-out';
        }
        
        // Trigger mission cards entrance animation again on load
        if (elements.missionCards.length > 0) {
            elements.missionCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 + (index * 50));
            });
        }
    });

    // Debug log
    console.log('✓ WEBVIBES.ID Script loaded successfully!');
    console.log('✓ Animations initialized:');
    console.log('  - Hero Image Floating');
    console.log('  - Floating Shapes');
    console.log('  - Meaning Cards');
    console.log('  - Value Cards');
    console.log('  - Logo Animation');
    console.log('  - Poster Cards');
    console.log('  - Service Cards');
    console.log('  - Parallax Effect');
    // ============ NEW: DEBUG LOG FOR VISI & MISI ============
    console.log('  ✓ Vision Cards Animation');
    console.log('  ✓ Mission Cards Animation');
    console.log('  ✓ Mission Header Animation');
    console.log('  ✓ Mission Icons Animation');
    console.log(`  - Mission Cards found: ${elements.missionCards.length}`);
    console.log(`  - Vision Cards found: ${elements.visionCards.length}`);
});