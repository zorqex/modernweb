// Parallax Effect
const parallaxElements = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    parallaxElements.forEach(element => {
        const parallaxValue = element.dataset.parallax;
        const offset = scrollY * parallaxValue;
        element.style.transform = `translateY(${offset}px)`;
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);

    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});

// Observe scroll cards
document.querySelectorAll('.scroll-card').forEach(card => {
    observer.observe(card);
});

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.dataset.count);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
};

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Add success animation
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Отправлено!';
    submitBtn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';

    // Reset form
    contactForm.reset();

    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 3000);
});

// Add scroll classes for header
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.style.background = 'rgba(26, 26, 46, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
        header.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Horizontal scroll momentum (smooth scrolling)
const horizontalContainer = document.querySelector('.horizontal-container');
let isDown = false;
let startX;
let scrollLeft;

horizontalContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - horizontalContainer.offsetLeft;
    scrollLeft = horizontalContainer.scrollLeft;
});

horizontalContainer.addEventListener('mouseleave', () => {
    isDown = false;
});

horizontalContainer.addEventListener('mouseup', () => {
    isDown = false;
});

horizontalContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - horizontalContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    horizontalContainer.scrollLeft = scrollLeft - walk;
});

// Add CSS class for animations
const style = document.createElement('style');
style.textContent = `
    .feature-card.in-view {
        animation: fadeInScale 0.6s ease-out forwards;
    }

    .gallery-item.in-view {
        animation: fadeInScale 0.6s ease-out forwards;
    }

    .scroll-card.in-view {
        animation: fadeInScale 0.6s ease-out forwards;
    }

    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// CTA Button interaction
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    const featuresSection = document.querySelector('#features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
});

// Add mouse follow effect to hero section
const hero = document.querySelector('.hero');
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');

hero.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blob1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    blob2.style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
});

// Page visibility optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animation = 'none';
    } else {
        // Resume when tab becomes visible
        document.body.style.animation = '';
    }
});

console.log('✨ ModernWeb website loaded successfully!');
