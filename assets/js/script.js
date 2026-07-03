// ─── Theme Toggle ────────────────────────────────────────────────────────────
// Initial theme is set inline in <head> before first paint.
const themeBtns = document.querySelectorAll('.js-theme');

function renderThemeBtn() {
    const cur = document.documentElement.getAttribute('data-theme');
    themeBtns.forEach(btn => {
        btn.textContent = cur === 'dark' ? '[light]' : '[dark]';
    });
}

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        document.querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', next === 'dark' ? '#131311' : '#f4f2ed');
        renderThemeBtn();
    });
});

// Follow OS preference live, unless the user picked one manually
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        renderThemeBtn();
    }
});

renderThemeBtn();

// ─── Tokyo Clock ─────────────────────────────────────────────────────────────
const clockEls = document.querySelectorAll('.js-clock');
const clockFmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
});
function tick() {
    const now = clockFmt.format(new Date());
    clockEls.forEach(el => { el.textContent = now; });
}
tick();
setInterval(tick, 1000);

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// Hero reveals on load
window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach(el => {
        setTimeout(() => el.classList.add('in'), 60);
    });
});

// ─── Language ────────────────────────────────────────────────────────────────
const allLangItems = document.querySelectorAll('.lang-item');

function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    allLangItems.forEach(o => {
        o.classList.toggle('active', o.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
}

allLangItems.forEach(item => {
    item.addEventListener('click', () => setLanguage(item.dataset.lang));
});

function initLanguage() {
    const saved = localStorage.getItem('preferredLanguage');
    const browser = navigator.language.slice(0, 2);
    const supported = ['ja', 'en', 'ko', 'zh'];
    const lang = (saved && supported.includes(saved)) ? saved
               : supported.includes(browser) ? browser
               : 'en';
    setLanguage(lang);
}

initLanguage();
