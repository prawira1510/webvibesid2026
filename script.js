/* ============================================
   WEBVIBES.ID - COMPLETE SCRIPT
   With WhatsApp Payment Integration
   WA Admin: 6285183098588
   Template ID: template_0hrbprc
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // EMAILJS INITIALIZATION
    // ============================================
    emailjs.init("I9LYtj0RufRoiOKE5");
    
    const EMAILJS_SERVICE_ID = "service_p4zrsfw";
    const EMAILJS_TEMPLATE_ID = "template_0hrbprc";
    const WA_ADMIN_NUMBER = "6285183098588";
    
    console.log('✅ EmailJS initialized');
    console.log('   Service ID:', EMAILJS_SERVICE_ID);
    console.log('   Template ID:', EMAILJS_TEMPLATE_ID);
    console.log('   WA Admin:', WA_ADMIN_NUMBER);
    
    // ============================================
    // DISCOUNT CONFIGURATION
    // ============================================
    const BASE_DISCOUNT_WEBSITE = 15;
    const BASE_DISCOUNT_DESIGN = 5;
    
    const today = new Date();
    const currentYear = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const isWeekend = (today.getDay() === 0 || today.getDay() === 6);
    
    const holidays = {
        'newyear': { month: 1, day: 1, name: 'Tahun Baru', extraDiscount: 10 },
        'valentine': { month: 2, day: 14, name: 'Valentine', extraDiscount: 5 },
        'kartini': { month: 4, day: 21, name: 'Kartini', extraDiscount: 5 },
        'labor': { month: 5, day: 1, name: 'Buruh', extraDiscount: 5 },
        'pancasila': { month: 6, day: 1, name: 'Pancasila', extraDiscount: 5 },
        'independence': { month: 8, day: 17, name: 'Kemerdekaan', extraDiscount: 15 },
        'heroes': { month: 11, day: 10, name: 'Pahlawan', extraDiscount: 5 },
        'mother': { month: 12, day: 22, name: 'Ibu', extraDiscount: 5 },
        'christmas': { month: 12, day: 25, name: 'Natal', extraDiscount: 10 }
    };
    
    let activeHoliday = null;
    for (let key in holidays) {
        if (holidays[key].month === month && holidays[key].day === day) {
            activeHoliday = holidays[key];
            break;
        }
    }
    
    let websiteDiscount = BASE_DISCOUNT_WEBSITE;
    let designDiscount = BASE_DISCOUNT_DESIGN;
    let promoName = 'HARI BIASA';
    
    if (activeHoliday) {
        websiteDiscount = BASE_DISCOUNT_WEBSITE + activeHoliday.extraDiscount;
        designDiscount = BASE_DISCOUNT_DESIGN + activeHoliday.extraDiscount;
        promoName = activeHoliday.name;
    } else if (isWeekend) {
        websiteDiscount = BASE_DISCOUNT_WEBSITE + 5;
        designDiscount = BASE_DISCOUNT_DESIGN + 5;
        promoName = 'Weekend';
    } else if (month === 12) {
        websiteDiscount = BASE_DISCOUNT_WEBSITE + 5;
        designDiscount = BASE_DISCOUNT_DESIGN + 5;
        promoName = 'Desember';
    } else if (month === 8) {
        websiteDiscount = BASE_DISCOUNT_WEBSITE + 5;
        designDiscount = BASE_DISCOUNT_DESIGN + 5;
        promoName = 'Agustus';
    } else {
        promoName = 'Bulan Ini';
    }
    
    websiteDiscount = Math.min(websiteDiscount, 50);
    designDiscount = Math.min(designDiscount, 50);
    
    // Update promo banner
    const promoBanner = document.getElementById('promoBanner');
    if (promoBanner) {
        promoBanner.innerHTML = `
            <div class="promo-banner-content">
                <i class="fas fa-gift"></i>
                <span>🎉 PROMO ${promoName.toUpperCase()} ${currentYear} - Website/UIUX/Aplikasi: ${websiteDiscount}% | Desain: ${designDiscount}% OFF! 🎉</span>
                <i class="fas fa-tag"></i>
            </div>
        `;
    }
    
    // Update discount badges
    const websiteBadge = document.getElementById('websiteDiscountBadge');
    const designBadge = document.getElementById('designDiscountBadge');
    if (websiteBadge) websiteBadge.innerText = `Diskon ${websiteDiscount}%`;
    if (designBadge) designBadge.innerText = `Diskon ${designDiscount}%`;
    
    // ============================================
    // PRICE DATA
    // ============================================
    const websitePrices = {
        'pelajar': { min: 500000, max: 1500000, name: 'Pelajar / Mahasiswa' },
        'cafe': { min: 2500000, max: 2500000, name: 'Cafe, Restoran, Tempat Ibadah, dll' },
        'perusahaan': { min: 3000000, max: 3000000, name: 'Perusahaan, Bisnis, dll' },
        'umkm': { min: 1500000, max: 2000000, name: 'UMKM' },
        'umk': { min: 3500000, max: 5000000, name: 'UMK' }
    };
    
    const designPrices = {
        'pelajar': { min: 50000, max: 100000, name: 'Pelajar / Mahasiswa' },
        'cafe': { min: 100000, max: 100000, name: 'Cafe, Restoran, Tempat Ibadah, dll' },
        'perusahaan': { min: 200000, max: 200000, name: 'Perusahaan, Bisnis, dll' },
        'umkm': { min: 50000, max: 150000, name: 'UMKM' },
        'umk': { min: 100000, max: 250000, name: 'UMK' }
    };
    
    function getDiscountedPrice(originalMin, originalMax, discountPercent) {
        const discountMultiplier = (100 - discountPercent) / 100;
        const discountedMin = Math.floor(originalMin * discountMultiplier);
        const discountedMax = Math.floor(originalMax * discountMultiplier);
        if (originalMin === originalMax) {
            return `Rp ${discountedMin.toLocaleString('id-ID')}`;
        }
        return `Rp ${discountedMin.toLocaleString('id-ID')} - Rp ${discountedMax.toLocaleString('id-ID')}`;
    }
    
    function getOriginalPriceDisplay(min, max) {
        if (min === max) {
            return `Rp ${min.toLocaleString('id-ID')}`;
        }
        return `Rp ${min.toLocaleString('id-ID')} - Rp ${max.toLocaleString('id-ID')}`;
    }
    
    function getSaveAmount(originalMin, originalMax, discountPercent) {
        const avgOriginal = (originalMin + originalMax) / 2;
        const savedAmount = Math.floor(avgOriginal * discountPercent / 100);
        return `Rp ${savedAmount.toLocaleString('id-ID')}`;
    }
    
    // Render Website Pricing Cards
    const websiteContainer = document.getElementById('websitePricingContainer');
    if (websiteContainer) {
        const websiteCategories = ['pelajar', 'cafe', 'perusahaan', 'umkm', 'umk'];
        websiteContainer.innerHTML = '';
        
        websiteCategories.forEach((cat, index) => {
            const price = websitePrices[cat];
            const originalDisplay = getOriginalPriceDisplay(price.min, price.max);
            const discountedDisplay = getDiscountedPrice(price.min, price.max, websiteDiscount);
            const saveAmount = getSaveAmount(price.min, price.max, websiteDiscount);
            
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100) + 100);
            card.innerHTML = `
                <div class="pricing-card ${index === 2 ? 'featured' : ''}">
                    ${index === 2 ? '<div class="pricing-badge">POPULER</div>' : ''}
                    <div class="pricing-icon"><i class="fas ${getIconForCategory(cat)}"></i></div>
                    <h3>${price.name}</h3>
                    <div class="pricing-price">
                        <div class="original-price">
                            <span class="original-label">Harga Asli:</span>
                            <span class="original-value">${originalDisplay}</span>
                        </div>
                        <div class="discount-badge-small">-${websiteDiscount}%</div>
                        <div class="discounted-price">
                            <span class="discounted-label">Setelah Diskon:</span>
                            <span class="discounted-value">${discountedDisplay}</span>
                        </div>
                        <div class="save-amount">
                            <i class="fas fa-save"></i> Hemat ${saveAmount}
                        </div>
                    </div>
                    <ul class="pricing-features">
                        <li><i class="fas fa-check"></i> Website/Aplikasi/UIUX</li>
                        <li><i class="fas fa-check"></i> ${index === 2 ? 'Free Domain & Hosting' : (index === 1 ? 'Free Domain 1 Tahun' : 'Free Konsultasi')}</li>
                        <li><i class="fas fa-check"></i> Garansi ${index === 4 ? '12' : (index === 2 ? '6' : '3')} Bulan</li>
                        <li><i class="fas fa-check"></i> Free Maintenance</li>
                    </ul>
                    <button class="pricing-btn" data-paket="${price.name} - Website/UIUX/Aplikasi" data-harga="${discountedDisplay}" data-original="${originalDisplay}" data-discount="${websiteDiscount}">
                        Pilih Paket <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
            websiteContainer.appendChild(card);
        });
    }
    
    // Render Design Pricing Cards
    const designContainer = document.getElementById('designPricingContainer');
    if (designContainer) {
        const designCategories = ['pelajar', 'cafe', 'perusahaan', 'umkm', 'umk'];
        designContainer.innerHTML = '';
        
        designCategories.forEach((cat, index) => {
            const price = designPrices[cat];
            const originalDisplay = getOriginalPriceDisplay(price.min, price.max);
            const discountedDisplay = getDiscountedPrice(price.min, price.max, designDiscount);
            const saveAmount = getSaveAmount(price.min, price.max, designDiscount);
            
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100) + 100);
            card.innerHTML = `
                <div class="pricing-card">
                    <div class="pricing-icon"><i class="fas ${getDesignIconForCategory(cat)}"></i></div>
                    <h3>${price.name}</h3>
                    <div class="pricing-price">
                        <div class="original-price">
                            <span class="original-label">Harga Asli:</span>
                            <span class="original-value">${originalDisplay}</span>
                        </div>
                        <div class="discount-badge-small">-${designDiscount}%</div>
                        <div class="discounted-price">
                            <span class="discounted-label">Setelah Diskon:</span>
                            <span class="discounted-value">${discountedDisplay}</span>
                        </div>
                        <div class="save-amount">
                            <i class="fas fa-save"></i> Hemat ${saveAmount}
                        </div>
                    </div>
                    <ul class="pricing-features">
                        <li><i class="fas fa-check"></i> Logo/Banner/Poster</li>
                        <li><i class="fas fa-check"></i> ${index === 2 ? 'Unlimited Revisi' : (index === 1 ? '3x Revisi' : '2x Revisi')}</li>
                        <li><i class="fas fa-check"></i> File High Quality</li>
                        <li><i class="fas fa-check"></i> Cepat & Profesional</li>
                    </ul>
                    <button class="pricing-btn" data-paket="${price.name} - Desain" data-harga="${discountedDisplay}" data-original="${originalDisplay}" data-discount="${designDiscount}">
                        Pilih Paket <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
            designContainer.appendChild(card);
        });
    }
    
    function getIconForCategory(cat) {
        const icons = {
            'pelajar': 'fa-graduation-cap',
            'cafe': 'fa-store',
            'perusahaan': 'fa-building',
            'umkm': 'fa-chart-line',
            'umk': 'fa-city'
        };
        return icons[cat] || 'fa-tag';
    }
    
    function getDesignIconForCategory(cat) {
        const icons = {
            'pelajar': 'fa-graduation-cap',
            'cafe': 'fa-store',
            'perusahaan': 'fa-building',
            'umkm': 'fa-chart-line',
            'umk': 'fa-city'
        };
        return icons[cat] || 'fa-palette';
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
    // PRICING MODAL
    // ============================================
    const pricingModal = new bootstrap.Modal(document.getElementById('pricingModal'));
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    let currentOrderData = {};
    
    function openPricingModal(paketName, paketPrice, originalPrice, discountPercentValue) {
        document.getElementById('modalPaketName').innerText = paketName;
        document.getElementById('paketType').value = paketName;
        document.getElementById('paketPrice').value = paketPrice;
        document.getElementById('paketOriginalPrice').value = originalPrice;
        document.getElementById('paketDiscount').value = discountPercentValue;
        document.getElementById('selectedPaket').value = paketName;
        document.getElementById('selectedPricePaket').value = paketPrice;
        document.getElementById('selectedOriginalPrice').value = originalPrice;
        document.getElementById('selectedDiscount').value = `${discountPercentValue}%`;
        pricingModal.show();
    }
    
    function bindPricingButtons() {
        document.querySelectorAll('.pricing-btn').forEach(btn => {
            btn.removeEventListener('click', btn._handler);
            btn._handler = function(e) {
                e.preventDefault();
                const paketName = this.getAttribute('data-paket');
                const paketPrice = this.getAttribute('data-harga');
                const originalPrice = this.getAttribute('data-original') || '';
                const discountPercentValue = this.getAttribute('data-discount') || '0';
                openPricingModal(paketName, paketPrice, originalPrice, discountPercentValue);
            };
            btn.addEventListener('click', btn._handler);
        });
    }
    bindPricingButtons();
    
    // ============================================
    // WHATSAPP MESSAGE FUNCTION
    // ============================================
    function generateWhatsAppMessage(orderData) {
        const message = `Halo Admin WEBVIBES.ID,

Saya ingin melakukan pembayaran untuk pesanan berikut:

📌 Nama: ${orderData.fullName}
📌 Email: ${orderData.email}
📌 WhatsApp: ${orderData.phone}
📌 Perusahaan: ${orderData.businessName}
📌 Paket: ${orderData.paketType}
📌 Harga Asli: ${orderData.originalPrice}
📌 Harga Diskon: ${orderData.paketPrice}
📌 Diskon: ${orderData.discount}%
📌 Promo: ${orderData.promoEvent}

📝 Catatan Pengerjaan:
${orderData.notes}

Mohon info metode pembayarannya. Terima kasih.`;
        
        return encodeURIComponent(message);
    }
    
    // ============================================
    // PRICING FORM SUBMISSION
    // ============================================
    const pricingForm = document.getElementById('pricingForm');
    const whatsappPaymentBtn = document.getElementById('whatsappPaymentBtn');
    
    if (pricingForm) {
        pricingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('emailClaim').value.trim();
            const phone = document.getElementById('phoneClaim').value.trim();
            const businessName = document.getElementById('businessName').value.trim();
            const paketType = document.getElementById('paketType').value;
            const paketPrice = document.getElementById('paketPrice').value;
            const originalPrice = document.getElementById('paketOriginalPrice')?.value || '';
            const discountValue = document.getElementById('paketDiscount')?.value || '0';
            const notes = document.getElementById('notes').value.trim();
            
            if (!fullName) {
                alert('❌ Mohon isi Nama Lengkap Anda');
                document.getElementById('fullName').focus();
                return;
            }
            if (!email) {
                alert('❌ Mohon isi Email Anda');
                document.getElementById('emailClaim').focus();
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                alert('❌ Masukkan email yang valid!');
                document.getElementById('emailClaim').focus();
                return;
            }
            if (!phone) {
                alert('❌ Mohon isi Nomor WhatsApp Anda');
                document.getElementById('phoneClaim').focus();
                return;
            }
            if (!businessName) {
                alert('❌ Mohon isi Nama Perusahaan/Bisnis/Sekolah Anda');
                document.getElementById('businessName').focus();
                return;
            }
            if (!notes) {
                alert('❌ Mohon isi Catatan (Jelaskan yang ingin dikerjakan)');
                document.getElementById('notes').focus();
                return;
            }
            
            const submitBtn = document.getElementById('submitPricing');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;
            
            // Save order data for WhatsApp
            currentOrderData = {
                fullName: fullName,
                email: email,
                phone: phone,
                businessName: businessName,
                paketType: paketType,
                paketPrice: paketPrice,
                originalPrice: originalPrice,
                discount: discountValue,
                promoEvent: `${promoName} ${currentYear}`,
                notes: notes,
                date: new Date().toLocaleString('id-ID')
            };
            
            // Generate WhatsApp link
            const waMessage = generateWhatsAppMessage(currentOrderData);
            const waLink = `https://wa.me/${WA_ADMIN_NUMBER}?text=${waMessage}`;
            if (whatsappPaymentBtn) {
                whatsappPaymentBtn.href = waLink;
            }
            
            // Generate guarantee card number
            const guaranteeNumber = `WV-${currentYear}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
            const guaranteeExpiry = new Date();
            guaranteeExpiry.setMonth(guaranteeExpiry.getMonth() + 3);
            const guaranteeExpiryDate = guaranteeExpiry.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
            
            // Send email via EmailJS
            const templateParams = {
                from_name: fullName,
                from_email: email,
                phone: phone,
                business_name: businessName,
                paket_type: paketType,
                original_price: originalPrice,
                paket_price: paketPrice,
                discount_percent: `${discountValue}%`,
                promo_event: `${promoName} ${currentYear}`,
                notes: notes,
                date: currentOrderData.date,
                guarantee_number: guaranteeNumber,
                guarantee_expiry: guaranteeExpiryDate,
                year: currentYear
            };
            
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('✅ Email sent successfully!', response);
                    pricingModal.hide();
                    pricingForm.reset();
                    successModal.show();
                })
                .catch(function(error) {
                    console.error('❌ Failed to send email:', error);
                    pricingModal.hide();
                    pricingForm.reset();
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
            if (email && email.includes('@') && email.includes('.')) {
                alert('✅ Terima kasih telah berlangganan newsletter kami!');
                newsletterEmail.value = '';
                try {
                    let subs = JSON.parse(localStorage.getItem('newsletterSubs') || '[]');
                    subs.push({ email: email, date: new Date().toLocaleString(), year: currentYear });
                    localStorage.setItem('newsletterSubs', JSON.stringify(subs));
                } catch(e) {}
            } else {
                alert('⚠️ Mohon masukkan email yang valid.');
            }
        });
        
        if (newsletterEmail) {
            newsletterEmail.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') newsletterBtn.click();
            });
        }
    }
    
    // ============================================
    // FOOTER YEAR
    // ============================================
    document.getElementById('currentYear').innerText = currentYear;
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
    
    // ============================================
    // ACTIVE NAV LINK
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
    // AOS INIT
    // ============================================
    AOS.init({ duration: 600, once: true, offset: 80 });
    
    // ============================================
    // DROPDOWN HANDLER
    // ============================================
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.classList.remove('d-none');
                    document.querySelectorAll('#founder, #team, #career').forEach(section => {
                        if (section !== target) section.classList.add('d-none');
                    });
                    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                }
            }
        });
    });
    
    // ============================================
    // FLOATING BUTTONS HOVER
    // ============================================
    document.querySelectorAll('.float-wa, .float-ig').forEach(btn => {
        btn.addEventListener('mouseenter', function() { this.style.transform = 'scale(1.1)'; });
        btn.addEventListener('mouseleave', function() { this.style.transform = 'scale(1)'; });
    });
    
    // ============================================
    // MODAL CLEANUP
    // ============================================
    const pricingModalElement = document.getElementById('pricingModal');
    if (pricingModalElement) {
        pricingModalElement.addEventListener('hidden.bs.modal', function() {
            if (pricingForm) pricingForm.reset();
        });
    }
    
    // ============================================
    // GARANSI CARD
    // ============================================
    const guaranteeCardNumber = document.getElementById('guaranteeCardNumber');
    if (guaranteeCardNumber) {
        const randomNum1 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const randomNum2 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        guaranteeCardNumber.innerText = `WV-${currentYear}-${randomNum1}-${randomNum2}`;
    }
    
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        cardExpiry.innerText = expiryDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    if (pricingForm) {
        pricingForm.addEventListener('submit', function() {
            const fullName = document.getElementById('fullName').value;
            const paketType = document.getElementById('paketType').value;
            const cardHolderName = document.getElementById('cardHolderName');
            const cardService = document.getElementById('cardService');
            if (cardHolderName) cardHolderName.innerText = fullName;
            if (cardService) cardService.innerText = paketType;
        });
    }
    
    // ============================================
    // PORTFOLIO CLICK
    // ============================================
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4')?.innerText || 'Project';
            alert(`✨ Detail Project: ${title}\n\nHubungi kami via WhatsApp: 0878 2481 5854`);
        });
    });
    
    // ============================================
    // SERVICE CARD HOVER
    // ============================================
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // ============================================
    // FINAL CONSOLE LOG
    // ============================================
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🚀 WEBVIBES.ID - Website Loaded Successfully!');
    console.log(`📅 Date: ${today.toLocaleDateString('id-ID')} | Year: ${currentYear}`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📧 EmailJS Configuration:');
    console.log(`   └─ Service ID: ${EMAILJS_SERVICE_ID}`);
    console.log(`   └─ Template ID: ${EMAILJS_TEMPLATE_ID}`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('💰 DISCOUNT ACTIVE:');
    console.log(`   └─ Website/UIUX/Aplikasi: ${websiteDiscount}% OFF`);
    console.log(`   └─ Desain Biasa: ${designDiscount}% OFF`);
    console.log(`   └─ Promo: ${promoName} ${currentYear}`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📱 WhatsApp Payment:');
    console.log(`   └─ Admin Number: ${WA_ADMIN_NUMBER}`);
    console.log('═══════════════════════════════════════════════════════════');
});