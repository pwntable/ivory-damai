let currentLang = 'ms';
        
// --- THEME LOGIC ---
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-btn');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        btn.innerText = '🌙';
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        btn.innerText = '☀️';
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-btn').innerText = savedTheme === 'dark' ? '☀️' : '🌙';
}

// --- BACK TO TOP LOGIC ---
let mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "flex";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// --- DYNAMIC LIGHTBOX LOGIC ---
let galleryImages = [];
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Collect all images in gallery
    const images = document.querySelectorAll('.gallery-grid img');
    galleryImages = Array.from(images).map(img => img.src);

    // 2. Add click event to each image wrapper
    images.forEach((img, index) => {
        img.parentElement.addEventListener('click', () => {
            openLightbox(index);
        });
    });
});

function openLightbox(index) {
    currentImageIndex = index;
    document.getElementById("myLightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = galleryImages[currentImageIndex];
    document.body.style.overflow = "hidden"; // Disable scroll
}

function closeLightbox() {
    document.getElementById("myLightbox").style.display = "none";
    document.body.style.overflow = "auto"; // Enable scroll
}

function changeSlide(n) {
    currentImageIndex += n;
    // Loop functionality
    if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
    document.getElementById("lightbox-img").src = galleryImages[currentImageIndex];
}

// Close on outside click
document.getElementById('myLightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") closeLightbox();
});

// --- TIKTOK LAZY LOAD ---
function loadTiktok(element, videoId) {
    // Find template
    const template = element.nextElementSibling;
    if (!template) return;
    
    // Create content
    const clone = template.content.cloneNode(true);
    const parent = element.parentElement;
    
    // Clear parent and append new content
    parent.innerHTML = '';
    parent.appendChild(clone);
    
    // Check if script needs loading
    if (!window.tiktokEmbedScriptLoaded) {
        const script = document.createElement('script');
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        window.tiktokEmbedScriptLoaded = true;
    } else if (window.tiktok) {
        // If script already loaded, re-render
         window.tiktok.embed.page.render();
    }
}

// --- HERO BACKGROUND SLIDER ---
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('home');
    const images = document.querySelectorAll('.gallery-grid img');
    
    if(images.length > 0 && hero) {
        let index = 0;
        const imageUrls = Array.from(images).map(img => img.src);
        
        // Preload images
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
        
        // --- UPDATE: Create Slideshow Divs for Better Transition ---
        // Buat container jika belum ada
        let slideContainer = document.getElementById('hero-slideshow');
        if (!slideContainer) {
             slideContainer = document.createElement('div');
             slideContainer.id = 'hero-slideshow';
             slideContainer.className = 'hero-slideshow';
             hero.prepend(slideContainer);
        }
        
        // Create slides
        imageUrls.forEach((url, i) => {
            const slide = document.createElement('div');
            slide.className = `hero-slide ${i === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url('${url}')`;
            slideContainer.appendChild(slide);
        });
        
        const slides = document.querySelectorAll('.hero-slide');

        setInterval(() => {
            slides[index].classList.remove('active');
            index = (index + 1) % slides.length;
            slides[index].classList.add('active');
        }, 5000); // Tukar setiap 5 saat
    }
});

// --- TRANSLATIONS (Updated) ---
const translations = {
    'ms': {
        nav_home: "Utama", nav_about: "Tentang", nav_facilities: "Fasiliti", nav_gallery: "Galeri", nav_price: "Harga", nav_review: "Review", nav_location: "Lokasi", nav_book: "Tempah",
        hero_badge: "⭐ Pilihan Keluarga No.1",
        hero_title: "Percutian Idaman Keluarga Di Parit Raja",
        hero_sub: "Lengkap dengan Private Pool, Mini Golf & BBQ. Hanya 5 minit ke UTHM. Sesuai untuk konvokesyen & family day.",
        hero_cta: "Tempah Sekarang", hero_gal: "Lihat Galeri",
        about_title: "Tentang Ivory Damai",
        about_text: "Terletak strategik di Parit Raja, Ivory Damai adalah pilihan utama ibu bapa dan keluarga pelajar UTHM. Kami menawarkan pengalaman penginapan eksklusif lengkap dengan kolam renang peribadi, BBQ, dan mini golf. Lokasi kami sangat dekat dengan kampus, memudahkan urusan pendaftaran atau konvokesyen anda.",
        fac_title: "Fasiliti Premium", fac_sub: "Segala kelengkapan disediakan untuk keselesaan anda sekeluarga.",
        
        // NEW PRICES & FEATURES
        price_title: "Pakej Promosi", price_sub: "Nikmati harga promosi hebat untuk masa terhad.",
        pk_weekday: "Hari Bekerja", pk_weekend: "Hujung Minggu", pk_cuti: "Cuti Umum", 
        day_wd: "Isnin - Khamis", day_we: "Jumaat - Ahad", per_night: "/malam",
        
        price_wd_val: '<span class="price-old">RM 899</span> RM 799',
        price_we_val: '<span class="price-old">RM 1199</span> RM 949',
        price_ph_val: 'RM 1499',

        badge_pop: "Paling Laris 🔥", btn_choose: "Pilih Tarikh",
        feat_acc: "Akses Penuh Fasiliti", feat_fam: "Sesuai Family Day", 
        feat_depo: "Deposit RM300 (Refundable)",
        feat_rooms: "4 Bilik Tidur",
        
        rev_title: "Apa Kata Tetamu", rev_sub: "Pengalaman sebenar dari tetamu yang berpuas hati.",
        gal_title: "Galeri Homestay", gal_sub: "Lihat suasana sebenar di Ivory Damai. Klik gambar untuk paparan penuh.",
        
        social_title: "Ikuti Kami", social_sub: "Kekal berhubung untuk promosi terkini.",
        tiktok_title: "Video Menarik", tiktok_sub: "Tonton momen indah di Ivory Damai.",
        
        loc_title: "Lokasi Kami",
        book_title: "Tempah Sekarang", book_desc: "Isi maklumat di bawah, kami akan bawa anda terus ke WhatsApp untuk pengesahan segera.",
        form_name: "Nama Anda", form_pax: "Bilangan Orang"
    },
    'en': {
        nav_home: "Home", nav_about: "About", nav_facilities: "Facilities", nav_gallery: "Gallery", nav_price: "Pricing", nav_review: "Reviews", nav_location: "Location", nav_book: "Book",
        hero_badge: "⭐ Top Family Choice",
        hero_title: "Your Dream Family Getaway in Parit Raja",
        hero_sub: "Complete with Private Pool, Mini Golf & BBQ. Just 5 mins to UTHM. Perfect for convocation & family days.",
        hero_cta: "Book Now", hero_gal: "View Gallery",
        about_title: "About Ivory Damai",
        about_text: "Strategically located in Parit Raja, Ivory Damai is the top choice for parents and families of UTHM students. We offer an exclusive stay experience complete with a private pool, BBQ, and mini golf. Our location is very close to the campus, making your registration or convocation trips convenient.",
        fac_title: "Premium Facilities", fac_sub: "Everything you need for a comfortable family stay.",
        
        // NEW PRICES & FEATURES
        price_title: "Promo Packages", price_sub: "Enjoy great savings for a limited time.",
        pk_weekday: "Weekday", pk_weekend: "Weekend", pk_cuti: "Public Holiday", 
        day_wd: "Monday - Thursday", day_we: "Friday - Sunday", per_night: "/night",
        
        price_wd_val: '<span class="price-old">RM 899</span> RM 799',
        price_we_val: '<span class="price-old">RM 1199</span> RM 949',
        price_ph_val: 'RM 1499',

        badge_pop: "Best Seller 🔥", btn_choose: "Choose Date",
        feat_acc: "Full Facility Access", feat_fam: "Perfect for Family Day", 
        feat_depo: "Deposit RM300 (Refundable)",
        feat_rooms: "4 Bedrooms",
        
        rev_title: "Guest Reviews", rev_sub: "Real experiences from happy guests.",
        gal_title: "Homestay Gallery", gal_sub: "Take a look inside Ivory Damai. Click on image to enlarge.",
        
        social_title: "Follow Us", social_sub: "Stay connected for latest updates.",
        tiktok_title: "Video Highlights", tiktok_sub: "Watch beautiful moments at Ivory Damai.",
        
        loc_title: "Our Location",
        book_title: "Book Now", book_desc: "Fill in details below, we will redirect you to WhatsApp for confirmation.",
        form_name: "Your Name", form_pax: "No. of Pax"
    }
};

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('btn-ms').classList.remove('active');
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById(`btn-${lang}`).classList.add('active');
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // GUNA innerHTML supaya tag HTML macam <span> tak hilang
            el.innerHTML = translations[lang][key]; 
        }
    });
}

// --- MENU LOGIC ---
function toggleMenu() { 
    document.getElementById("navLinks").classList.toggle("active");
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById("navLinks").classList.remove("active");
    });
});

function sendToWhatsapp(e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var checkin = document.getElementById("checkin").value;
    var checkout = document.getElementById("checkout").value;
    var pax = document.getElementById("pax").value;
    
    var phoneNumber = "60103134144"; 

    var message = currentLang === 'en' 
        ? `Hi Ivory Damai, I'd like to book.%0A%0AName: ${name}%0ACheck-in: ${checkin}%0ACheck-out: ${checkout}%0APax: ${pax}%0A%0AIs this date available?`
        : `Salam Ivory Damai, saya berminat untuk tempah.%0A%0ANama: ${name}%0ACheck-in: ${checkin}%0ACheck-out: ${checkout}%0APax: ${pax}%0A%0AAdakah tarikh ini masih kosong?`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}
