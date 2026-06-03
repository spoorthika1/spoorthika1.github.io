/* ===================================
   SPOORTHIKA PORTFOLIO — MAIN JS
=================================== */

// ── NAV SCROLL EFFECT ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ── MOBILE MENU ──
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── SCROLL REVEAL ──
const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .cert-item, .contact-card, .tl-role, .about-grid, .section-title, .section-sub'
);

revealElements.forEach(el => {
  el.classList.add('reveal');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => observer.observe(el));

// ── SMOOTH ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinksAll.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--gold)';
    }
  });
}, { passive: true });

// ── SKILL CARD HOVER GLOW ──
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, #1e1e30, var(--bg-card))`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ── TYPING EFFECT FOR HERO ROLES ──
const roles = ['Software Developer', 'Data Analyst', 'AI Enthusiast', 'MERN Stack Dev', 'ML Engineer'];
let roleIndex = 0;
const roleTags = document.querySelectorAll('.role-tag');

// Cycle the middle role tag text subtly
if (roleTags.length >= 2) {
  const dynamicTag = roleTags[1];
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    dynamicTag.style.opacity = '0';
    dynamicTag.style.transform = 'translateY(-8px)';
    dynamicTag.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => {
      dynamicTag.textContent = roles[roleIndex];
      dynamicTag.style.opacity = '1';
      dynamicTag.style.transform = 'translateY(0)';
    }, 300);
  }, 3000);
}

// ── COUNTER ANIMATION ──
function animateCounter(el, target, suffix = '') {
  const duration = 1200;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const statNums = document.querySelectorAll('.stat-num');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNums.forEach(el => {
        const text = el.textContent;
        const num = parseInt(text);
        const suffix = text.replace(num, '');
        if (!isNaN(num)) {
          animateCounter(el, num, suffix);
        }
      });
    }
  });
}, { threshold: 0.5 });

if (statNums.length > 0) statsObserver.observe(statNums[0]);

// ── CURSOR TRAIL (subtle) ──
const trail = document.createElement('div');
trail.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 8px; height: 8px; border-radius: 50%;
  background: rgba(201,168,76,0.5);
  transition: transform 0.08s ease, opacity 0.3s ease;
  transform: translate(-50%, -50%);
  opacity: 0;
`;
document.body.appendChild(trail);

document.addEventListener('mousemove', (e) => {
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  trail.style.opacity = '1';
}, { passive: true });

document.addEventListener('mouseleave', () => {
  trail.style.opacity = '0';
});
