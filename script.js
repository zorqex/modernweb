/* ─── Language Switcher ─── */
const LANG_MAP = { ru: 'ru', kz: 'kk', en: 'en' };

function applyLang(lang) {
    // Text elements
    document.querySelectorAll('[data-ru]').forEach(el => {
        const text = el.dataset[lang];
        if (text && el.children.length === 0) el.textContent = text;
    });

    // Input / textarea placeholders
    document.querySelectorAll('[data-ru-ph]').forEach(el => {
        const ph = el.dataset[lang + 'Ph'];
        if (ph) el.placeholder = ph;
    });

    // Select options
    document.querySelectorAll('select option[data-ru]').forEach(el => {
        const text = el.dataset[lang];
        if (text) el.textContent = text;
    });

    // Active button highlight
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = LANG_MAP[lang] || lang;
    localStorage.setItem('lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// Restore on load
const savedLang = localStorage.getItem('lang') || 'ru';
if (savedLang !== 'ru') applyLang(savedLang);

/* ─── Parallax on Hero blobs ─── */
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');

document.querySelector('.hero')?.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    if (blob1) blob1.style.transform = `translate(${x}px, ${y}px)`;
    if (blob2) blob2.style.transform = `translate(${-x}px, ${-y}px)`;
});

/* ─── Reveal on scroll ─── */
const revealTargets = document.querySelectorAll(
    '.about-card, .scroll-card, .belt, .stat-item, .schedule-card, .achievement'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

/* ─── Counter Animation ─── */
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.done) {
            entry.target.dataset.done = '1';
            const target = +entry.target.dataset.count;
            const step = target / (1400 / 16);
            let current = 0;
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                entry.target.textContent = Math.floor(current);
                if (current >= target) clearInterval(timer);
            }, 16);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ─── Drag-to-scroll horizontal container ─── */
const hContainer = document.querySelector('.horizontal-container');
if (hContainer) {
    let isDown = false, startX, scrollLeft;

    hContainer.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - hContainer.offsetLeft;
        scrollLeft = hContainer.scrollLeft;
    });
    hContainer.addEventListener('mouseleave', () => { isDown = false; });
    hContainer.addEventListener('mouseup',    () => { isDown = false; });
    hContainer.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - hContainer.offsetLeft;
        hContainer.scrollLeft = scrollLeft - (x - startX) * 1.4;
    });
}

/* ─── Sticky header shadow ─── */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 60
        ? '0 2px 20px rgba(0,0,0,0.7)'
        : 'none';
});

/* ─── Mobile nav ─── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── Contact form ─── */
document.querySelector('.contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = e.target.querySelector('.btn-primary');
    const lang = localStorage.getItem('lang') || 'ru';
    const orig = btn.textContent;
    btn.textContent = lang === 'kz' ? 'Жазылдыңыз! OSU! 🥋' : 'Записаны! OSU! 🥋';
    btn.style.opacity = '0.8';
    e.target.reset();
    setTimeout(() => {
        btn.textContent = orig;
        btn.style.opacity = '1';
    }, 3000);
});
