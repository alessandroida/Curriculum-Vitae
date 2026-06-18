document.addEventListener('DOMContentLoaded', () => {

    /* ── AOS init ── */
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 60
    });

    /* ── Navbar scroll effect ── */
    const navbar = document.querySelector('.navbar-floating');
    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ── Smooth scroll for anchor links ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;

            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const offset = navbar ? navbar.offsetHeight + 30 : 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });

                // Close sidebar menu if open
                const mobileSidebar = document.getElementById('mobileSidebar');
                const sidebarBackdrop = document.getElementById('sidebarBackdrop');
                if (mobileSidebar && mobileSidebar.classList.contains('open')) {
                    mobileSidebar.classList.remove('open');
                    if(sidebarBackdrop) sidebarBackdrop.classList.remove('show');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    /* ── Active nav link on scroll ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-floating .nav-link:not(.nav-cta-btn)');
    const mobileLinks = document.querySelectorAll('.msb-nav .msb-link:not(.cta)');

    const setActive = () => {
        const scrollY = window.pageYOffset;
        let currentId = '';

        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                currentId = id;
            }
        });

        // Update Desktop Links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (currentId) {
                if (href === '#' + currentId || href === 'index.html#' + currentId) {
                    link.classList.add('active');
                }
            } else {
                // If at the top of the page
                if (href === 'index.html' || href === '') {
                    link.classList.add('active');
                }
            }
        });

        // Update Mobile Links
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (currentId) {
                if (href === '#' + currentId || href === 'index.html#' + currentId) {
                    link.classList.add('active');
                }
            } else {
                if (href === 'index.html' || href === '') {
                    link.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();

    /* ── Animate progress bars on scroll ── */
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    const animateProgress = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                bar.style.width = bar.style.width; // trigger reflow
            }
        });
    };
    window.addEventListener('scroll', animateProgress, { passive: true });

    /* ── TASK Explorer Tabs ── */
    const taskTabs = document.querySelectorAll('.task-tab');
    const taskPanels = document.querySelectorAll('.task-panel');

    if (taskTabs.length > 0 && taskPanels.length > 0) {
        taskTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                taskTabs.forEach(t => t.classList.remove('active'));
                taskPanels.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                const targetId = 'panel-' + tab.getAttribute('data-tab');
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    /* ── Scroll to Top Button ── */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── Mobile Sidebar Menu 3/4 ── */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    if (mobileMenuBtn && mobileSidebar && mobileMenuClose && sidebarBackdrop) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileSidebar.classList.add('open');
            sidebarBackdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        const closeSidebar = () => {
            mobileSidebar.classList.remove('open');
            sidebarBackdrop.classList.remove('show');
            document.body.style.overflow = '';
        };

        mobileMenuClose.addEventListener('click', closeSidebar);
        sidebarBackdrop.addEventListener('click', closeSidebar);
    }

});
