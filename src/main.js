import './style.css';

lucide.createIcons();

let ticking = false;
const progressBar = document.getElementById("progressBar");

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const winScroll = window.scrollY || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            if (progressBar) progressBar.style.width = `${scrolled}%`;
            ticking = false;
        });
        ticking = true;
    }
});

const bentoCards = document.querySelectorAll('.bento-outer'); 
bentoCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(226, 183, 20, 0.1), transparent 40%)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

const initMarquee = () => {
    const track = document.getElementById('marquee-track');
    if (!track) return;

    const content = track.innerHTML;
    track.innerHTML = content + content + content;

    let scrollPos = 0;
    const speed = 0.8;
    let isPaused = false;

    const animate = () => {
        if (!isPaused) {
            scrollPos -= speed;
            if (Math.abs(scrollPos) >= track.scrollWidth / 3) {
                scrollPos = 0;
            }
            track.style.transform = `translate3d(${scrollPos}px, 0, 0)`;
        }
        requestAnimationFrame(animate);
    };

    track.addEventListener('mouseenter', () => isPaused = true);
    track.addEventListener('mouseleave', () => isPaused = false);
    animate();
};

document.addEventListener('DOMContentLoaded', () => {
    initMarquee();
    
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});