// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const hiddenAudioPlayer = document.getElementById('hidden-audio-player');
const musicWelcomeModal = document.getElementById('music-welcome-modal');
const closeWelcomeModalBtn = document.getElementById('close-welcome-modal');
const toggleHiddenMusicBtn = document.getElementById('toggle-hidden-music');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    
    // Show success animation
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
    submitBtn.style.backgroundColor = '#25D366';
    
    // In a real application, you would send this data to a server
    // For now, we'll just show an alert
    setTimeout(() => {
        alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda di ${email} dalam waktu 1-2 hari kerja.`);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
        contactForm.reset();
    }, 1500);
});

// Hidden Music System
let isMusicPlaying = false;
let hasUserInteracted = false;

// Initialize hidden audio
function initializeHiddenAudio() {
    // Set volume to 50%
    hiddenAudioPlayer.volume = 0.5;
    
    // Try to play audio automatically
    const playAudio = () => {
        if (!hasUserInteracted) {
            const playPromise = hiddenAudioPlayer.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isMusicPlaying = true;
                    console.log('Musik "Lebih Indah" diputar otomatis');
                }).catch(error => {
                    console.log('Autoplay dicegah oleh browser');
                    // Show modal to inform user
                    showWelcomeModal();
                });
            }
        }
    };
    
    // Wait a bit before playing to ensure page is loaded
    setTimeout(playAudio, 1000);
}

// Toggle hidden music (developer/admin only)
toggleHiddenMusicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        hiddenAudioPlayer.pause();
        isMusicPlaying = false;
        toggleHiddenMusicBtn.innerHTML = '<i class="fas fa-play"></i>';
        toggleHiddenMusicBtn.style.animation = 'pulse 2s infinite';
        console.log('Musik dihentikan (admin mode)');
    } else {
        hiddenAudioPlayer.play();
        isMusicPlaying = true;
        toggleHiddenMusicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        toggleHiddenMusicBtn.style.animation = 'none';
        console.log('Musik diputar (admin mode)');
    }
});

// Show welcome modal
function showWelcomeModal() {
    musicWelcomeModal.style.display = 'flex';
}

// Close welcome modal and start music
closeWelcomeModalBtn.addEventListener('click', () => {
    musicWelcomeModal.style.display = 'none';
    hasUserInteracted = true;
    
    // Start music after user interaction
    hiddenAudioPlayer.play();
    isMusicPlaying = true;
    toggleHiddenMusicBtn.style.animation = 'none';
});

// Handle user interaction to enable audio
document.addEventListener('click', () => {
    if (!hasUserInteracted && !isMusicPlaying) {
        hasUserInteracted = true;
        hiddenAudioPlayer.play();
        isMusicPlaying = true;
        musicWelcomeModal.style.display = 'none';
        toggleHiddenMusicBtn.style.animation = 'none';
    }
}, { once: true });

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause music
        if (isMusicPlaying) {
            hiddenAudioPlayer.pause();
        }
    } else {
        // Page is visible again, resume music if it was playing
        if (isMusicPlaying) {
            hiddenAudioPlayer.play();
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ANIMASI BERGERAK - JAVASCRIPT
// ============================================

// Fungsi untuk membuat partikel animasi
function createParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    // Jumlah partikel berdasarkan ukuran layar
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    // Hapus partikel lama jika ada
    particlesContainer.innerHTML = '';
    
    // Buat partikel baru
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Ukuran random
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posisi random
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Warna random dari palet
        const colors = [
            'rgba(67, 97, 238, 0.1)',
            'rgba(247, 37, 133, 0.1)',
            'rgba(76, 201, 240, 0.1)',
            'rgba(58, 12, 163, 0.1)'
        ];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Animasi dengan durasi random
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `particleFloat ${duration}s infinite linear ${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Pulsing CTA Button Click Handler
document.getElementById('pulsing-cta')?.addEventListener('click', function() {
    // Scroll ke contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        window.scrollTo({
            top: contactSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
    
    // Efek ripple
    createRippleEffect(this);
});

// Fungsi untuk membuat efek ripple
function createRippleEffect(element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    ripple.style.position = 'fixed';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(67, 97, 238, 0.3)';
    ripple.style.left = `${rect.left + rect.width/2 - 50}px`;
    ripple.style.top = `${rect.top + rect.height/2 - 50}px`;
    ripple.style.zIndex = '999';
    ripple.style.animation = 'rippleEffect 0.6s forwards';
    
    document.body.appendChild(ripple);
    
    // Hapus ripple setelah animasi selesai
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Tambahkan style untuk ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0.5);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Animasi untuk logo vibes dengan delay
function animateLogoVibes() {
    const logoVibes = document.querySelector('.logo-vibes');
    const footerLogoVibes = document.querySelector('.footer-vibes');
    
    if (logoVibes) {
        setTimeout(() => {
            logoVibes.style.animation = 'logoVibe 4s infinite ease-in-out';
        }, 1000);
    }
    
    if (footerLogoVibes) {
        setTimeout(() => {
            footerLogoVibes.style.animation = 'logoVibe 4s infinite ease-in-out';
        }, 1500);
    }
}

// Animasi untuk text typing effect
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle && heroTitle.classList.contains('typing-text')) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.overflow = 'hidden';
        heroTitle.style.whiteSpace = 'nowrap';
        heroTitle.style.borderRight = '3px solid var(--accent-color)';
        
        // Simulasi efek typing
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Setelah selesai, hilangkan cursor
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Animasi saat scroll (parallax effect)
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-circle, .floating-triangle, .floating-square');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed * 0.1);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.01}deg)`;
        });
    });
}

// Tambahkan animasi untuk semua card
function addCardAnimations() {
    const cards = document.querySelectorAll('.service-card, .mission-card, .value-card, .meaning-item, .portfolio-item');
    
    cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Animasi untuk list items
function addListAnimations() {
    const meaningItems = document.querySelectorAll('.meaning-item');
    meaningItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    const visionItems = document.querySelectorAll('.vision-list li');
    visionItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    const aboutItems = document.querySelectorAll('.about-list li');
    aboutItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    const formFields = document.querySelectorAll('.form-group');
    formFields.forEach((field, index) => {
        field.style.setProperty('--field-index', index);
    });
}

// Animasi untuk social icons
function addSocialIconAnimations() {
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach((icon, index) => {
        icon.style.setProperty('--icon-index', index);
    });
}

// Animasi untuk footer links
function addFooterLinkAnimations() {
    const footerLinks = document.querySelectorAll('.footer-links ul li');
    footerLinks.forEach((link, index) => {
        link.style.setProperty('--link-index', index);
    });
}

// Animasi wave effect untuk buttons
function addWaveEffectToButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-nav, .modal-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const wave = document.createElement('span');
            wave.style.position = 'absolute';
            wave.style.borderRadius = '50%';
            wave.style.background = 'rgba(255, 255, 255, 0.5)';
            wave.style.transform = 'scale(0)';
            wave.style.animation = 'ripple 0.6s linear';
            wave.style.left = `${x}px`;
            wave.style.top = `${y}px`;
            wave.style.width = '100px';
            wave.style.height = '100px';
            wave.style.marginLeft = '-50px';
            wave.style.marginTop = '-50px';
            wave.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(wave);
            
            setTimeout(() => {
                wave.remove();
            }, 600);
        });
    });
}

// Animasi untuk section dengan delay bertahap
function addSectionAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Visi & misi section
    const visionMissionSections = document.querySelectorAll('.vision-section, .mission-section');
    visionMissionSections.forEach((section, index) => {
        section.style.setProperty('--section-index', index);
    });
}

// Animasi hover dengan efek scale
function addHoverScaleEffects() {
    const hoverElements = document.querySelectorAll('.service-card, .mission-card, .value-card, .meaning-item, .portfolio-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05)';
            element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = '';
        });
    });
}

// Animasi untuk logo connection lines
function animateConnectionLines() {
    const connectionLines = document.querySelector('.connection-lines');
    if (connectionLines) {
        const beforeLine = connectionLines.querySelector(':before');
        const afterLine = connectionLines.querySelector(':after');
        
        if (beforeLine && afterLine) {
            beforeLine.style.setProperty('--line-width', '2px');
            beforeLine.style.setProperty('--line-height', '60px');
            afterLine.style.setProperty('--line-width', '60px');
            afterLine.style.setProperty('--line-height', '2px');
        }
    }
}

// Initialize all animations
function initializeAnimations() {
    // Buat partikel background
    createParticles();
    
    // Animasi logo
    animateLogoVibes();
    
    // Animasi typing effect
    addTypingEffect();
    
    // Efek parallax
    initParallaxEffect();
    
    // Animasi card dengan delay
    addCardAnimations();
    
    // Animasi list items
    addListAnimations();
    
    // Animasi social icons
    addSocialIconAnimations();
    
    // Animasi footer links
    addFooterLinkAnimations();
    
    // Efek gelombang pada button
    addWaveEffectToButtons();
    
    // Animasi section
    addSectionAnimations();
    
    // Efek hover scale
    addHoverScaleEffects();
    
    // Animasi connection lines
    animateConnectionLines();
    
    // Recreate particles on window resize
    window.addEventListener('resize', createParticles);
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .about-image, .meaning-item, .mission-card, .value-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card, .portfolio-item, .about-content, .about-image, .meaning-item, .mission-card, .value-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initialize animations
    initializeAnimations();
});

// Panggil juga saat halaman selesai dimuat
window.addEventListener('load', () => {
    animateOnScroll();
    initializeAnimations();
});

// Inisialisasi saat scroll
window.addEventListener('scroll', animateOnScroll);

// Initialize dengan scroll untuk trigger animations
setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
}, 500);

// Initialize hidden audio system
initializeHiddenAudio();

// Pulsing CTA untuk konsultasi
document.querySelectorAll('#open-consultation-modal, .pulsing-cta').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.href && this.href.includes('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Efek ketik untuk tagline
function animateTagline() {
    const taglines = document.querySelectorAll('.tagline');
    taglines.forEach(tagline => {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        const typeTagline = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeTagline, 50);
            }
        };
        
        setTimeout(typeTagline, 2000);
    });
}

// Panggil animasi tagline setelah loading
setTimeout(animateTagline, 1500);

// Konfirmasi sebelum keluar
window.addEventListener('beforeunload', function (e) {
    if (isMusicPlaying) {
        // Optional: Tampilkan konfirmasi
        e.preventDefault();
        e.returnValue = 'Musik masih diputar. Yakin ingin meninggalkan halaman?';
    }
});

// Toast notification untuk interaksi
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#25D366' : '#FF6B6B'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Contoh penggunaan toast
document.querySelectorAll('.wave-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent.includes('Proyek')) {
            showToast('Siap memulai proyek Anda! 🚀', 'success');
        } else if (this.textContent.includes('Makna')) {
            showToast('Mari mengenal WEBVIBES.ID lebih dalam! ❤️', 'success');
        }
    });
});

// Tambahkan style untuk toast
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyle);