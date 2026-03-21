/* ============================================
   ABY JOHNY — Portfolio | JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Lucide Icons ──
  if (window.lucide) lucide.createIcons();

  // ── Typing Effect ──
  const typedEl = document.getElementById('typedText');
  const phrases = [
    'intelligent AI systems',
    'full-stack web apps',
    'healthcare platforms',
    'multi-agent automations',
    'data-driven solutions'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let typingSpeed = 80;

  function type() {
    const current = phrases[phraseIdx];
    if (deleting) {
      typedEl.textContent = current.substring(0, charIdx--);
      typingSpeed = 40;
    } else {
      typedEl.textContent = current.substring(0, charIdx++);
      typingSpeed = 80;
    }

    if (!deleting && charIdx > current.length) {
      deleting = true;
      typingSpeed = 1800; // pause at end
    } else if (deleting && charIdx < 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400; // pause before next word
    }

    setTimeout(type, typingSpeed);
  }
  type();

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    scrollTop.classList.toggle('visible', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Scroll to top ──
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Mobile menu toggle ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── Scroll reveal (Intersection Observer) ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger animation
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach(el => observer.observe(el));

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ── Active nav link highlight ──
  const sections = document.querySelectorAll('.section, .hero');
  const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinksAll.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--text-primary)';
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ── Contact form handling ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Form will submit to Formspree (or mailto fallback)
      // Add a nice visual feedback
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.innerHTML = '<span>✓ Sent!</span>';
      btn.style.background = 'var(--green)';
      setTimeout(() => {
        btn.innerHTML = '<i data-lucide="send" style="width:18px;height:18px"></i> Send Message';
        btn.style.background = '';
        if (window.lucide) lucide.createIcons();
      }, 3000);
    });
  }

  // ── Parallax on hero avatar (subtle mouse move effect) ──
  const heroAvatar = document.querySelector('.hero-avatar');
  if (heroAvatar && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      heroAvatar.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

});
