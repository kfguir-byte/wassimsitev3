document.addEventListener('DOMContentLoaded', () => {
    const syncAnnouncementMarquee = () => {
        const track = document.getElementById('announcement-track');
        const firstRun = track?.querySelector('.announcement-bar__run');
        if (!track || !firstRun || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        const w = firstRun.offsetWidth;
        if (w > 0) {
            track.style.setProperty('--marquee-shift', `${-w}px`);
        }
    };

    syncAnnouncementMarquee();
    window.addEventListener('resize', syncAnnouncementMarquee);
    if (document.fonts?.ready) {
        document.fonts.ready.then(() => syncAnnouncementMarquee());
    }

    const COLLAPSED_STORY_MAX_PX = 260;

    document.querySelectorAll('[data-transformation-story]').forEach((story) => {
        const content = story.querySelector('.transformation-story-content');
        const btn = story.querySelector('.transformation-read-more-btn');
        if (!content || !btn) return;

        story.classList.remove('is-collapsed');
        const fullHeight = content.scrollHeight;

        if (fullHeight <= COLLAPSED_STORY_MAX_PX) {
            btn.hidden = true;
            return;
        }

        btn.hidden = false;
        story.classList.add('is-collapsed');
        btn.textContent = 'Read more';
        btn.setAttribute('aria-expanded', 'false');

        btn.addEventListener('click', () => {
            const expanding = story.classList.contains('is-collapsed');
            story.classList.toggle('is-collapsed');
            btn.setAttribute('aria-expanded', expanding ? 'true' : 'false');
            btn.textContent = story.classList.contains('is-collapsed') ? 'Read more' : 'Read less';
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.service-card, .media-card, .video-showcase-item, .section-header, .guide-image, .guide-content');
    
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

    });
});
