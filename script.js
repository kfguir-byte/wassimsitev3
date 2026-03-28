document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.service-card, .media-card, .section-header, .guide-image, .guide-content');
    
    // Initial assignment of reveal class
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Trigger once on load
    revealOnScroll();

    // Trigger on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Handle HTML5 Video Playback on hover for desktop, or click for mobile
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Automatically pause other videos when one plays
        video.addEventListener('play', () => {
            videos.forEach(v => {
                if (v !== video) v.pause();
            });
        });

        // Add visual feedback when video is hovered
        const card = video.closest('.video-card');
        if (card) {
            card.addEventListener('mouseenter', () => {
                video.style.transform = 'scale(1.05)';
            });
            card.addEventListener('mouseleave', () => {
                video.style.transform = 'scale(1)';
            });
        }
    });
});
