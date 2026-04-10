/* ===== ALTIMA CLÍNICA INTEGRADA — Premium Scripts (Sephara-inspired) ===== */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  // =========================================
  // SCROLL PROGRESS
  // =========================================
  const prog = document.getElementById('scroll-progress');
  if (prog) {
    const updateProgress = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) prog.style.width = ((window.scrollY / h) * 100) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // =========================================
  // HEADER
  // =========================================
  const header = document.getElementById('header');
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('scrolled');
      header.classList.remove('not-scrolled');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('not-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // =========================================
  // MOBILE MENU
  // =========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const headerNav = document.getElementById('header-nav');
  const mobileOverlay = document.getElementById('mobile-overlay');

  const toggleMenu = () => {
    const isOpen = headerNav.classList.toggle('open');
    mobileToggle.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    
    // Accessibility updates
    mobileToggle.setAttribute('aria-expanded', isOpen);
    mobileToggle.setAttribute('aria-label', isOpen ? 'Fechar Menu' : 'Abrir Menu');
    
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  mobileToggle.addEventListener('click', toggleMenu);
  mobileOverlay.addEventListener('click', toggleMenu);

  headerNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (headerNav.classList.contains('open')) toggleMenu();
    });
  });

  // =========================================
  // SMOOTH SCROLL
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const pos = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // =========================================
  // ACTIVE NAV ON SCROLL
  // =========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = headerNav.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` || (id === 'home' && link.getAttribute('href') === '#home')) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // =========================================
  // HERO ANIMATION
  // =========================================
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });
  heroTl
    .from('.scroll-indicator', { opacity: 0, y: 20, duration: 0.8 });

  // Hero video parallax — using translate instead of scale to preserve sharpness
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    gsap.to(heroVideo, {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
  }

  // =========================================
  // INTRO SECTION
  // =========================================
  const introTl = gsap.timeline({
    scrollTrigger: { trigger: '.intro', start: 'top 80%' }
  });
  introTl
    .from('.intro .section-tag', { y: 15, opacity: 0, duration: 0.5 })
    .from('.reveal-text', { y: 30, opacity: 0, duration: 0.9 }, '-=0.2')
    .from('.subheadline', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
    .from('.hero-ctas', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');

  // =========================================
  // SECTION INTROS
  // =========================================
  gsap.utils.toArray('.section-intro').forEach(el => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%' } });
    const tag = el.querySelector('.section-tag');
    const h = el.querySelector('h2');
    const sub = el.querySelector('.section-subtitle');

    if (tag) { gsap.set(tag, { y: 10, opacity: 0 }); tl.to(tag, { y: 0, opacity: 1, duration: 0.4 }); }
    if (h) { gsap.set(h, { y: 20, opacity: 0 }); tl.to(h, { y: 0, opacity: 1, duration: 0.7 }, '-=0.15'); }
    if (sub) { gsap.set(sub, { y: 15, opacity: 0 }); tl.to(sub, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2'); }
  });

  // =========================================
  // SPLIT HEADER (About)
  // =========================================
  gsap.set('.split-header-text', { x: -30, opacity: 0 });
  gsap.to('.split-header-text', {
    scrollTrigger: { trigger: '.split-header', start: 'top 85%' },
    x: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
  });
  gsap.set('.split-header-stat', { x: 30, opacity: 0 });
  gsap.to('.split-header-stat', {
    scrollTrigger: { trigger: '.split-header', start: 'top 85%' },
    x: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
  });

  // Big stat counter
  const bigStatNum = document.querySelector('.big-stat-number');
  if (bigStatNum) {
    ScrollTrigger.create({
      trigger: '.split-header-stat',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const target = parseInt(bigStatNum.dataset.target, 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.5, ease: 'power2.out',
          onUpdate: () => { bigStatNum.textContent = Math.round(obj.v); }
        });
      }
    });
  }

  // =========================================
  // METRICS COUNTER
  // =========================================
  const metricsContainer = document.querySelector('.about-metrics');
  if (metricsContainer) {
    ScrollTrigger.create({
      trigger: metricsContainer,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        document.querySelectorAll('.metric-number').forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 2, ease: 'power2.out',
            onUpdate: () => {
              if (target >= 1000) {
                el.textContent = Math.floor(obj.v / 1000) + 'k';
              } else {
                el.textContent = Math.round(obj.v);
              }
            }
          });
        });
        gsap.set('.metric-card', { y: 30, opacity: 0 });
        gsap.to('.metric-card', { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' });
      }
    });
  }

  // =========================================
  // SPOTLIGHT GLOW — on [data-glow] cards
  // =========================================
  document.querySelectorAll('[data-glow]').forEach(card => {
    const updateGlow = (x, y) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${x - r.left}px`);
      card.style.setProperty('--mouse-y', `${y - r.top}px`);
    };
    card.addEventListener('mousemove', e => updateGlow(e.clientX, e.clientY));
    card.addEventListener('touchstart', e => {
      const t = e.touches && e.touches[0];
      if (t) updateGlow(t.clientX, t.clientY);
    }, { passive: true });
    card.addEventListener('touchmove', e => {
      const t = e.touches && e.touches[0];
      if (t) updateGlow(t.clientX, t.clientY);
    }, { passive: true });
  });

  // =========================================
  // 3D PARALLAX TILT — on [data-tilt] cards
  // =========================================
  if (window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const xc = r.width / 2;
        const yc = r.height / 2;
        gsap.to(el, {
          rotationY: ((x - xc) / xc) * 3,
          rotationX: -((y - yc) / yc) * 3,
          duration: 0.4, ease: 'power2.out',
          transformPerspective: 1000
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.7, ease: 'power3.out' });
      });
    });
  }

  // =========================================
  // BENTO (Specialties) REVEAL
  // =========================================
  gsap.set('.sol-card', { y: 40, opacity: 0 });
  gsap.to('.sol-card', {
    scrollTrigger: { trigger: '.specialties-grid', start: 'top 82%' },
    y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out'
  });

  // =========================================
  // TIMELINE (Diferenciais) REVEAL
  // =========================================
  gsap.utils.toArray('.process-step').forEach((step, i) => {
    gsap.set(step, { y: 30, opacity: 0 });
    gsap.to(step, {
      scrollTrigger: { trigger: step, start: 'top 88%' },
      y: 0, opacity: 1, duration: 0.7, delay: i * 0.08, ease: 'power3.out'
    });
  });

  // =========================================
  // GALLERY SLIDER LOGIC
  // =========================================
  const galleryTrack = document.getElementById('gallery-track');
  const galleryNext = document.getElementById('gallery-next');
  const galleryPrev = document.getElementById('gallery-prev');

  if (galleryTrack && galleryNext && galleryPrev) {
    const scrollAmount = () => galleryTrack.clientWidth;
    galleryNext.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
    galleryPrev.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
  }

  // =========================================
  // CTA REVEAL
  // =========================================
  gsap.set('.cta-card', { y: 30, opacity: 0, scale: 0.98 });
  gsap.to('.cta-card', {
    scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
    y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out'
  });

  // =========================================
  // FOOTER
  // =========================================
  gsap.set('.footer-grid > div', { y: 20, opacity: 0 });
  gsap.to('.footer-grid > div', {
    scrollTrigger: { trigger: '.footer', start: 'top 92%' },
    y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out'
  });

  // =========================================
  // MAGNETIC BUTTONS (desktop)
  // =========================================
  if (window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.magnetic, .magnetic-icon').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const strength = btn.classList.contains('magnetic-icon') ? 0.3 : 0.12;
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * strength,
          y: (e.clientY - r.top - r.height / 2) * strength,
          duration: 0.3, ease: 'power2.out'
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
      });
    });
  }

  // =========================================
  // CONSOLE
  // =========================================
  console.log('%cAltima Clínica Integrada', 'font-family: Georgia, serif; font-size: 18px; color: #C9A84C; font-weight: bold;');
  console.log('%c✦ Premium Light Experience', 'font-family: sans-serif; font-size: 11px; color: #6B6560; letter-spacing: 3px;');

});
