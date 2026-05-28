/* ─── Theme Switcher ─── */
const themes = {
    red:    { c1: '#c0392b', c2: '#e74c3c', name: 'Кровь и огонь' },
    gold:   { c1: '#b8860b', c2: '#f0c040', name: 'Чемпион' },
    blue:   { c1: '#1a5276', c2: '#2e86c1', name: 'Синее небо' },
    green:  { c1: '#1e8449', c2: '#27ae60', name: 'Лес и сила' },
    purple: { c1: '#6c3483', c2: '#9b59b6', name: 'Мастер' },
    orange: { c1: '#ca6f1e', c2: '#f39c12', name: 'Закат воина' },
};

const root = document.documentElement;
const toast = document.getElementById('themeToast');
let toastTimer;

function applyTheme(key) {
    const t = themes[key];
    if (!t) return;

    root.style.setProperty('--c1', t.c1);
    root.style.setProperty('--c2', t.c2);
    root.style.setProperty('--gradient', `linear-gradient(135deg, ${t.c1} 0%, ${t.c2} 100%)`);

    document.body.dataset.theme = key;

    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.toggle('active', card.dataset.theme === key);
    });

    toast.textContent = `${t.name} 🔥`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => applyTheme(card.dataset.theme));
});

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
const reveals = document.querySelectorAll(
    '.about-card, .scroll-card, .theme-card, .belt, .stat-item'
);

reveals.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));

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
    hContainer.addEventListener('mouseup', () => { isDown = false; });
    hContainer.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - hContainer.offsetLeft;
        hContainer.scrollLeft = scrollLeft - (x - startX) * 1.4;
    });
}

/* ─── Sticky header ─── */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 60
        ? '0 2px 20px rgba(0,0,0,0.6)'
        : 'none';
});

/* ─── Mobile nav ─── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── Contact form ─── */
document.querySelector('.contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-primary');
    const orig = btn.textContent;
    btn.textContent = 'Записаны! OSU!';
    btn.style.opacity = '0.8';
    e.target.reset();
    setTimeout(() => {
        btn.textContent = orig;
        btn.style.opacity = '1';
    }, 3000);
});
