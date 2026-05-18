/* ============================================
   WEBVIBES.ID - COMPLETE SCRIPT
   With Holiday Discounts (Auto by Calendar & Year)
   EmailJS Active: template_0hrbprc
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // EMAILJS INITIALIZATION
    // ============================================
    emailjs.init("I9LYtj0RufRoiOKE5");
    
    const EMAILJS_SERVICE_ID = "service_p4zrsfw";
    const EMAILJS_TEMPLATE_ID = "template_0hrbprc";
    
    // ============================================
    // DISCOUNT BASED ON HOLIDAYS & YEAR
    // ============================================
    
    // Get current date and year
    const today = new Date();
    const currentYear = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    // Define holiday discounts with year support (beberapa hari besar mengikuti tahun)
    const holidays = {
        // Hari Besar Tetap (sama setiap tahun)
        'newyear': { month: 1, day: 1, name: 'Tahun Baru', discount: '45%', desc: 'Diskon Spesial Tahun Baru!', icon: 'fa-calendar-alt' },
        'valentine': { month: 2, day: 14, name: 'Valentine', discount: '35%', desc: 'Kasih Sayang di Hari Valentine!', icon: 'fa-heart' },
        'kartini': { month: 4, day: 21, name: 'Kartini', discount: '30%', desc: 'Semangat Kartini, Diskon Spesial!', icon: 'fa-female' },
        'labor': { month: 5, day: 1, name: 'Buruh', discount: '25%', desc: 'Selamat Hari Buruh!', icon: 'fa-hard-hat' },
        'pancasila': { month: 6, day: 1, name: 'Pancasila', discount: '30%', desc: 'Bangga Indonesia!', icon: 'fa-flag' },
        'independence': { month: 8, day: 17, name: 'Kemerdekaan', discount: '50%', desc: 'Dirgahayu Indonesiaku!', icon: 'fa-flag-checkered' },
        'heroes': { month: 11, day: 10, name: 'Pahlawan', discount: '30%', desc: 'Teladani Pahlawan Digital!', icon: 'fa-medal' },
        'mother': { month: 12, day: 22, name: 'Ibu', discount: '25%', desc: 'Terima Kasih Ibu!', icon: 'fa-female' },
        'christmas': { month: 12, day: 25, name: 'Natal', discount: '45%', desc: 'Merry Christmas & Happy New Year!', icon: 'fa-gift' },
        
        // Hari Besar yang mengikuti tahun (hitung berdasarkan tanggal)
        'galungan': { month: 3, day: 1, name: 'Galungan', discount: '25%', desc: 'Diskon Spesial Hari Galungan!', icon: 'fa-pray', yearBased: true },
        'nyepi': { month: 3, day: 11, name: 'Nyepi', discount: '20%', desc: 'Hari Raya Nyepi, Diskon Khusus!', icon: 'fa-peace', yearBased: true },
        'waisak': { month: 5, day: 23, name: 'Waisak', discount: '20%', desc: 'Cahaya Dharma di Hari Waisak!', icon: 'fa-buddha', yearBased: true },
        'idulfitri': { month: 4, day: 10, name: 'Idul Fitri', discount: '50%', desc: 'Minal Aidin Wal Faizin!', icon: 'fa-moon', yearBased: true },
        'iduladha': { month: 6, day: 6, name: 'Idul Adha', discount: '40%', desc: 'Berkurban Digital, Diskon Besar!', icon: 'fa-kaaba', yearBased: true },
        'maulid': { month: 9, day: 15, name: 'Maulid Nabi', discount: '35%', desc: 'Sinar Kasih di Maulid Nabi', icon: 'fa-star-and-crescent', yearBased: true }
    };
    
    // Special dates that change every year (Easter, etc.)
    // Calculate Easter Sunday for current year
    function getEasterDate(year) {
        let a = year % 19;
        let b = Math.floor(year / 100);
        let c = year % 100;
        let d = Math.floor(b / 4);
        let e = b % 4;
        let f = Math.floor((b + 8) / 25);
        let g = Math.floor((b - f + 1) / 3);
        let h = (19 * a + b - d - g + 15) % 30;
        let i = Math.floor(c / 4);
        let k = c % 4;
        let l = (32 + 2 * e + 2 * i - h - k) % 7;
        let m = Math.floor((a + 11 * h + 22 * l) / 451);
        let month = Math.floor((h + l - 7 * m + 114) / 31);
        let day = ((h + l - 7 * m + 114) % 31) + 1;
        return { month: month, day: day };
    }
    
    const easter = getEasterDate(currentYear);
    
    // Add Easter to holidays
    holidays['easter'] = {
        month: easter.month,
        day: easter.day,
        name: 'Paskah',
        discount: '30%',
        desc: 'Selamat Hari Paskah!',
        icon: 'fa-egg',
        yearBased: true
    };
    
    // Add Chinese New Year (approximate - untuk contoh)
    // Biasanya antara Januari-Februari
    const chineseNewYearDates = {
        2024: { month: 2, day: 10 },
        2025: { month: 1, day: 29 },
        2026: { month: 2, day: 17 },
        2027: { month: 2, day: 6 },
        2028: { month: 1, day: 26 }
    };
    
    let chineseNewYear = chineseNewYearDates[currentYear] || { month: 2, day: 10 };
    holidays['chinese'] = {
        month: chineseNewYear.month,
        day: chineseNewYear.day,
        name: 'Imlek',
        discount: '35%',
        desc: 'Gong Xi Fa Cai! Diskon Spesial Imlek!',
        icon: 'fa-dragon',
        yearBased: true
    };
    
    // Find active holiday
    let activeHoliday = null;
    for (let key in holidays) {
        const holiday = holidays[key];
        if (holiday.month === month && holiday.day === day) {
            activeHoliday = holiday;
            break;
        }
    }
    
    // If no holiday, check if it's weekend promo
    const isWeekend = (today.getDay() === 0 || today.getDay() === 6);
    
    // Default discount based on season/month
    let defaultDiscount = { name: 'Terbatas', discount: '34%', desc: 'Dapatkan penawaran menarik untuk berbagai layanan digital', icon: 'fa-tag' };
    
    // Month-based promos
    if (!activeHoliday) {
        if (isWeekend) {
            defaultDiscount = { name: 'Weekend', discount: '25%', desc: 'Diskon Spesial Akhir Pekan!', icon: 'fa-calendar-week' };
        } else if (month === 1) {
            defaultDiscount = { name: 'Januari', discount: '20%', desc: 'Tahun Baru, Semangat Baru!', icon: 'fa-calendar' };
        } else if (month === 2) {
            defaultDiscount = { name: 'Februari', discount: '20%', desc: 'Bulan Kasih Sayang!', icon: 'fa-heart' };
        } else if (month === 3) {
            defaultDiscount = { name: 'Maret', discount: '20%', desc: 'Diskon Spesial Bulan Maret!', icon: 'fa-calendar' };
        } else if (month === 4) {
            defaultDiscount = { name: 'April', discount: '20%', desc: 'Bulan Penuh Berkah!', icon: 'fa-calendar' };
        } else if (month === 5) {
            defaultDiscount = { name: 'Mei', discount: '20%', desc: 'Bulan Kebangkitan!', icon: 'fa-calendar' };
        } else if (month === 6) {
            defaultDiscount = { name: 'Juni', discount: '20%', desc: 'Diskon Spesial Pertengahan Tahun!', icon: 'fa-calendar' };
        } else if (month === 7) {
            defaultDiscount = { name: 'Juli', discount: '20%', desc: 'Bulan Kemerdekaan!', icon: 'fa-calendar' };
        } else if (month === 8) {
            defaultDiscount = { name: 'Agustus', discount: '20%', desc: 'Dirgahayu Indonesiaku!', icon: 'fa-calendar' };
        } else if (month === 9) {
            defaultDiscount = { name: 'September', discount: '20%', desc: 'Bulan Cinta Lingkungan!', icon: 'fa-calendar' };
        } else if (month === 10) {
            defaultDiscount = { name: 'Oktober', discount: '20%', desc: 'Bulan Pahlawan!', icon: 'fa-calendar' };
        } else if (month === 11) {
            defaultDiscount = { name: 'November', discount: '20%', desc: 'Diskon Spesial Akhir Tahun!', icon: 'fa-calendar' };
        } else if (month === 12) {
            defaultDiscount = { name: 'Desember', discount: '25%', desc: 'Diskon Spesial Akhir Tahun!', icon: 'fa-calendar' };
        }
    }
    
    const currentPromo = activeHoliday || defaultDiscount;
    
    // Update discount section title with year
    const discountEventName = document.getElementById('discountEventName');
    const discountEventDesc = document.getElementById('discountEventDesc');
    
    if (discountEventName) {
        if (activeHoliday) {
            discountEventName.innerText = `${currentPromo.name} ${currentYear}`;
        } else {
            discountEventName.innerText = currentPromo.name;
        }
    }
    if (discountEventDesc) {
        discountEventDesc.innerText = currentPromo.desc;
    }
    
    // Discount products base
    const products = [
        { name: 'Pembuatan Aplikasi', oldPrice: 15000000, icon: 'fa-mobile-alt', features: ['Desain UI/UX Modern', 'Database Terintegrasi', 'Free Maintenance 3 Bulan'] },
        { name: 'Pembuatan Website', oldPrice: 8000000, icon: 'fa-laptop-code', features: ['Free Domain & Hosting 1 Tahun', 'SEO Friendly', 'Mobile Responsive'] },
        { name: 'UI/UX Designer', oldPrice: 12000000, icon: 'fa-palette', features: ['Wireframe & Prototype', 'User Research & Testing', 'Design System Complete'] },
        { name: 'Desain Biasa', oldPrice: 3000000, icon: 'fa-image', features: ['Logo & Brand Identity', 'Social Media Design', 'Unlimited Revisi'] }
    ];
    
    // Calculate discounted prices based on holiday/current promo
    const discountPercent = parseInt(currentPromo.discount) / 100;
    const discountedProducts = products.map(product => {
        const discountedPrice = Math.floor(product.oldPrice * (1 - discountPercent));
        return {
            ...product,
            newPrice: discountedPrice,
            discountPercent: currentPromo.discount,
            badge: activeHoliday ? `HARI ${currentPromo.name.toUpperCase()} ${currentYear}` : (isWeekend ? 'WEEKEND DEAL!' : `${currentPromo.name.toUpperCase()} PROMO!`)
        };
    });
    
    // Build discount slider
    const discountSlider = document.getElementById('discountSlider');
    if (discountSlider) {
        discountSlider.innerHTML = '';
        discountedProducts.forEach(product => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="discount-card">
                    <div class="discount-badge">${product.badge}</div>
                    <div class="discount-icon"><i class="fas ${product.icon}"></i></div>
                    <h3>${product.name}</h3>
                    <div class="discount-price">
                        <span class="old-price">Rp ${product.oldPrice.toLocaleString('id-ID')}</span>
                        <span class="new-price">Rp ${product.newPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="discount-percent">-${product.discountPercent}</div>
                    <p>${product.name === 'Pembuatan Aplikasi' ? 'Aplikasi mobile Android & iOS dengan fitur lengkap' : 
                         product.name === 'Pembuatan Website' ? 'Website profesional dengan desain modern & responsif' :
                         product.name === 'UI/UX Designer' ? 'Desain antarmuka yang menarik dan pengalaman pengguna optimal' :
                         'Desain grafis untuk berbagai kebutuhan bisnis Anda'}</p>
                    <ul>
                        ${product.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                    </ul>
                    <button class="discount-btn" data-promo="${product.name}" data-price="Rp ${product.newPrice.toLocaleString('id-ID')}" data-event="${currentPromo.name} ${currentYear}">
                        Klaim Promo <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
            discountSlider.appendChild(slide);
        });
    }
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.innerText = target;
                        clearInterval(timer);
                    } else {
                        el.innerText = Math.floor(current);
                    }
                }, 20);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.3 });
    
    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // DISCOUNT SWIPER SLIDER
    // ============================================
    if (document.querySelector('.discountSwiper')) {
        new Swiper('.discountSwiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1,
            coverflowEffect: {
                rotate: 40,
                stretch: 0,
                depth: 80,
                modifier: 1,
                slideShadows: false,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    }

    // ============================================
    // KLAIM PROMO MODAL
    // ============================================
    const claimModal = new bootstrap.Modal(document.getElementById('claimModal'));
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
    function openClaimModal(promoName, promoPrice, promoEvent) {
        document.getElementById('modalPromoName').innerText = promoName;
        document.getElementById('promoType').value = promoName;
        document.getElementById('promoPrice').value = promoPrice;
        document.getElementById('selectedPromo').value = promoName;
        document.getElementById('selectedPrice').value = promoPrice;
        document.getElementById('promoEvent').value = promoEvent;
        document.getElementById('selectedEvent').value = promoEvent;
        claimModal.show();
    }
    
    // Bind discount buttons
    function bindDiscountButtons() {
        document.querySelectorAll('.discount-btn').forEach(btn => {
            btn.removeEventListener('click', btn._handler);
            btn._handler = function(e) {
                e.preventDefault();
                const promoName = this.getAttribute('data-promo');
                const promoPrice = this.getAttribute('data-price');
                const promoEvent = this.getAttribute('data-event');
                openClaimModal(promoName, promoPrice, promoEvent);
            };
            btn.addEventListener('click', btn._handler);
        });
    }
    
    bindDiscountButtons();
    
    // ============================================
    // CLAIM FORM SUBMISSION WITH EMAILJS
    // ============================================
    const claimForm = document.getElementById('claimForm');
    
    if (claimForm) {
        claimForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('emailClaim').value.trim();
            const phone = document.getElementById('phoneClaim').value.trim();
            const businessName = document.getElementById('businessName').value.trim();
            const promoType = document.getElementById('promoType').value;
            const promoPrice = document.getElementById('promoPrice').value;
            const promoEvent = document.getElementById('promoEvent').value;
            const notes = document.getElementById('notes').value || '-';
            
            if (!fullName) return alert('❌ Isi Nama Lengkap');
            if (!email) return alert('❌ Isi Email');
            if (!email.includes('@')) return alert('❌ Email tidak valid');
            if (!phone) return alert('❌ Isi Nomor WhatsApp');
            if (!businessName) return alert('❌ Isi Nama Perusahaan');
            
            const submitBtn = document.getElementById('submitClaim');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;
            
            // Save to localStorage
            try {
                let claims = JSON.parse(localStorage.getItem('promoClaims') || '[]');
                claims.push({ fullName, email, phone, businessName, promoType, promoPrice, promoEvent, notes, date: new Date().toLocaleString(), year: currentYear });
                localStorage.setItem('promoClaims', JSON.stringify(claims));
                console.log('✅ Data saved to localStorage. Total claims:', claims.length);
            } catch(e) {}
            
            // Generate unique guarantee card number
            const guaranteeNumber = `WV-${currentYear}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
            const guaranteeExpiry = new Date();
            guaranteeExpiry.setMonth(guaranteeExpiry.getMonth() + 3);
            const guaranteeExpiryDate = guaranteeExpiry.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
            
            // Send email via EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: fullName,
                from_email: email,
                phone: phone,
                business_name: businessName,
                promo_type: promoType,
                promo_price: promoPrice,
                promo_event: promoEvent,
                notes: notes,
                date: new Date().toLocaleString('id-ID'),
                guarantee_number: guaranteeNumber,
                guarantee_expiry: guaranteeExpiryDate,
                year: currentYear
            })
            .then(function(response) {
                console.log('✅ Email sent successfully!', response);
                claimModal.hide();
                claimForm.reset();
                successModal.show();
            })
            .catch(function(error) {
                console.error('❌ Failed to send email:', error);
                claimModal.hide();
                claimForm.reset();
                successModal.show();
            })
            .finally(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // ============================================
    // NEWSLETTER SUBSCRIPTION
    // ============================================
    const newsletterBtn = document.getElementById('newsletterBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');
    
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterEmail.value.trim();
            if (email && email.includes('@')) {
                alert('✅ Terima kasih berlangganan newsletter kami!');
                newsletterEmail.value = '';
                // Save newsletter subscriber
                try {
                    let subs = JSON.parse(localStorage.getItem('newsletterSubs') || '[]');
                    subs.push({ email: email, date: new Date().toLocaleString(), year: currentYear });
                    localStorage.setItem('newsletterSubs', JSON.stringify(subs));
                } catch(e) {}
            } else {
                alert('⚠️ Email tidak valid');
            }
        });
    }
    
    // Enter key for newsletter
    if (newsletterEmail) {
        newsletterEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }
    
    // ============================================
    // FOOTER YEAR
    // ============================================
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.innerText = currentYear;
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });
    
    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ============================================
    // AOS INITIALIZATION
    // ============================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 80,
            disable: window.innerWidth < 768 ? 'phone' : false
        });
    }
    
    // ============================================
    // SERVICE CARD HOVER ENHANCEMENT
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // ============================================
    // PORTFOLIO CARD CLICK HANDLER
    // ============================================
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4')?.innerText || 'Project';
            alert(`✨ Detail Project: ${title}\n\nHubungi kami untuk informasi lebih lanjut.\n\nWhatsApp: 0878 2481 5854`);
        });
    });
    
    // ============================================
    // DROPDOWN MENU HANDLER
    // ============================================
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.classList.remove('d-none');
                    const otherSections = document.querySelectorAll('#founder, #team, #career');
                    otherSections.forEach(section => {
                        if (section !== target) section.classList.add('d-none');
                    });
                    const offset = 80;
                    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
                }
            }
        });
    });
    
    // ============================================
    // FLOATING BUTTONS HOVER EFFECT
    // ============================================
    const socialFloats = document.querySelectorAll('.float-wa, .float-ig');
    socialFloats.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ============================================
    // MODAL CLEANUP ON CLOSE
    // ============================================
    const claimModalElement = document.getElementById('claimModal');
    if (claimModalElement) {
        claimModalElement.addEventListener('hidden.bs.modal', function() {
            if (claimForm) claimForm.reset();
        });
    }
    
    // ============================================
    // GARANSI CARD - Generate unique number with year
    // ============================================
    const guaranteeCardNumber = document.getElementById('guaranteeCardNumber');
    if (guaranteeCardNumber) {
        const randomNum1 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const randomNum2 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        guaranteeCardNumber.innerText = `WV-${currentYear}-${randomNum1}-${randomNum2}`;
    }
    
    // Set card holder name (will be filled after form submission)
    const cardHolderName = document.getElementById('cardHolderName');
    if (cardHolderName) {
        // This will be updated when user submits form
        cardHolderName.innerText = '[Belum Terisi]';
    }
    
    // Set card service
    const cardService = document.getElementById('cardService');
    if (cardService) {
        cardService.innerText = '[Belum Dipilih]';
    }
    
    // Set expiry date (3 months from now)
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        cardExpiry.innerText = expiryDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    // Update guarantee card when form is submitted
    if (claimForm) {
        claimForm.addEventListener('submit', function() {
            const fullName = document.getElementById('fullName').value;
            const promoType = document.getElementById('promoType').value;
            if (cardHolderName) cardHolderName.innerText = fullName;
            if (cardService) cardService.innerText = promoType;
        });
    }
    
    // ============================================
    // FINAL CONSOLE LOG
    // ============================================
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🚀 WEBVIBES.ID - Website Loaded Successfully!');
    console.log(`📅 Current Year: ${currentYear}`);
    console.log(`📆 Date: ${today.toLocaleDateString('id-ID')}`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🎉 PROMO INFORMATION:');
    console.log(`   └─ Event: ${currentPromo.name}`);
    console.log(`   └─ Discount: ${currentPromo.discount}`);
    console.log(`   └─ Description: ${currentPromo.desc}`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📧 EmailJS Configuration:');
    console.log('   └─ Service ID: service_p4zrsfw');
    console.log('   └─ Template ID: template_0hrbprc');
    console.log('   └─ Target Email: technology.webvibesid@gmail.com');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ Features Active:');
    console.log('   └─ Holiday Discounts (Auto by Calendar)');
    console.log('   └─ Year Support: ' + currentYear);
    console.log('   └─ Discount Slider: ' + discountedProducts.length + ' products');
    console.log('   └─ Claim Modal: Ready');
    console.log('   └─ EmailJS: Active');
    console.log('   └─ Garansi Card: Ready');
    console.log('═══════════════════════════════════════════════════════════');
});