// Initialize Lucide Icons
lucide.createIcons();

// ─── Mouse Follow Glow ───────────────────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    if (cursorGlow) {
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top  = `${glowY}px`;
    }
    requestAnimationFrame(animateGlow);
}
animateGlow();

// Glow size on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .about-card, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (!cursorGlow) return;
        cursorGlow.style.width  = '80px';
        cursorGlow.style.height = '80px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(249,115,22,0.4), transparent 70%)';
    });
    el.addEventListener('mouseleave', () => {
        if (!cursorGlow) return;
        cursorGlow.style.width  = '300px';
        cursorGlow.style.height = '300px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(249,115,22,0.15), transparent 70%)';
    });
});

// ─── Project Card Glow on Mouse Move ─────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
    });
});

// ─── Scroll Animations ────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));

// Trigger hero on load
window.addEventListener('load', () => {
    const hero = document.getElementById('hero');
    if (hero) setTimeout(() => hero.classList.add('is-visible'), 80);
});

// ─── Active Nav Link on Scroll ───────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ─── Language Selector ───────────────────────────────────────────────────────
const langSelector   = document.getElementById('langSelector');
const currentLabel   = document.getElementById('currentLangLabel');
const langOptions    = document.querySelectorAll('.lang-option');
const langTriggerBtn = document.getElementById('langTriggerBtn');

if (langTriggerBtn) {
    langTriggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langSelector.classList.toggle('open');
    });
}

document.addEventListener('click', () => {
    langSelector?.classList.remove('open');
});

langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        setLanguage(opt.dataset.value);
        langSelector?.classList.remove('open');
    });
});

function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    const labels = { ja: '日本語', en: 'English', ko: '한국어', zh: '中文' };
    if (currentLabel) currentLabel.textContent = labels[lang] ?? lang;

    langOptions.forEach(o => o.classList.toggle('active', o.dataset.value === lang));
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
}

function initLanguage() {
    const saved   = localStorage.getItem('preferredLanguage');
    const browser = navigator.language.slice(0, 2);
    const supported = ['ja', 'en', 'ko', 'zh'];
    const lang = (saved && supported.includes(saved)) ? saved
               : supported.includes(browser) ? browser
               : 'ja';
    setLanguage(lang);
}

initLanguage();
