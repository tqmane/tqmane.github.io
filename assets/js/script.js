// Initialize Lucide Icons
lucide.createIcons();

// ─── Scroll Animations ───────────────────────────────────────────────────────
const animEls = document.querySelectorAll('.anim-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
animEls.forEach(el => observer.observe(el));

// Trigger hero animations on load
window.addEventListener('load', () => {
    document.querySelectorAll('.hero .anim-up').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 80);
    });
});

// ─── Active Nav Link on Scroll ───────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${current}`);
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ─── Hamburger / Mobile Menu ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ─── Language Selector (Desktop) ─────────────────────────────────────────────
const langSelect = document.getElementById('langSelect');
const langBtn = document.getElementById('langBtn');

if (langBtn && langSelect) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langSelect.classList.toggle('open');
    });
    document.addEventListener('click', () => langSelect.classList.remove('open'));
}

// All lang items (desktop dropdown + mobile)
const allLangItems = document.querySelectorAll('.lang-item');
allLangItems.forEach(item => {
    item.addEventListener('click', () => {
        setLanguage(item.dataset.lang);
        langSelect?.classList.remove('open');
        if (mobileMenu?.classList.contains('open')) {
            hamburger?.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

// ─── i18n Engine ─────────────────────────────────────────────────────────────
const langLabel = document.getElementById('langLabel');
const langLabels = { ja: 'JA', en: 'EN', ko: 'KO', zh: 'ZH' };

function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    if (langLabel) langLabel.textContent = langLabels[lang] || lang;

    // Update active states on all lang items
    allLangItems.forEach(o => {
        o.classList.toggle('active', o.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
}

function initLanguage() {
    const saved = localStorage.getItem('preferredLanguage');
    const browser = navigator.language.slice(0, 2);
    const supported = ['ja', 'en', 'ko', 'zh'];
    const lang = (saved && supported.includes(saved)) ? saved
               : supported.includes(browser) ? browser
               : 'ja';
    setLanguage(lang);
}

initLanguage();
