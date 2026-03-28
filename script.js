document.addEventListener('DOMContentLoaded', () => {
    const syncAnnouncementMarquee = () => {
        const track = document.querySelector('.announcement-bar__track');
        if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        const half = track.scrollWidth / 2;
        if (half > 0) {
            track.style.setProperty('--marquee-shift', `${-half}px`);
        }
    };

    const runMarqueeSync = () => {
        requestAnimationFrame(() => {
            requestAnimationFrame(syncAnnouncementMarquee);
        });
    };

    runMarqueeSync();
    window.addEventListener('resize', runMarqueeSync);
    if (document.fonts?.ready) {
        document.fonts.ready.then(runMarqueeSync);
    }

    const trackEl = document.querySelector('.announcement-bar__track');
    if (trackEl && typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => runMarqueeSync());
        ro.observe(trackEl);
    }

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const closeNav = () => {
        if (!navToggle || !navMenu) return;
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        document.body.classList.remove('nav-open');
    };
    const openNav = () => {
        if (!navToggle || !navMenu) return;
        navMenu.classList.add('is-open');
        navToggle.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close menu');
        document.body.classList.add('nav-open');
    };

    navToggle?.addEventListener('click', () => {
        if (navMenu?.classList.contains('is-open')) {
            closeNav();
        } else {
            openNav();
        }
    });

    navMenu?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) closeNav();
    });

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
