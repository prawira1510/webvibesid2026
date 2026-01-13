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
        animatedItems: document.querySelectorAll('.service-card, .portfolio-item, .about-content, .about-image, .meaning-item')
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
        const name = elements.contactForm.querySelector('input[type="text"]').value;
        
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
                elements.modal.style.display = 'none';
            })
            .catch(() => {
                // Autoplay blocked, show modal
                elements.modal.style.display = 'flex';
            });
    };

    // Initial attempt after 1s
    setTimeout(playMusic, 1000);

    // Interaction to start music
    elements.closeModalBtn?.addEventListener('click', playMusic);
    
    // Admin Toggle
    elements.toggleMusicBtn?.addEventListener('click', () => {
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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});