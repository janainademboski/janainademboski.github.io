// ----- Contact form Formspree -----
const contatoForm = document.getElementById('contatoForm');
const formMsg     = document.getElementById('formMsg');

if (contatoForm) {
  contatoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contatoForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
      const res = await fetch(contatoForm.action, {
        method : 'POST',
        body   : new FormData(contatoForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        formMsg.style.display     = 'block';
        formMsg.style.background  = 'rgba(74, 122, 90, 0.08)';
        formMsg.style.border      = '1px solid rgba(74, 122, 90, 0.3)';
        formMsg.style.color       = '#4a7a5a';
        formMsg.textContent       = 'Mensagem enviada! Responderei em breve.';
        contatoForm.reset();
      } else {
        throw new Error('Erro');
      }
    } catch {
      formMsg.style.display     = 'block';
      formMsg.style.background  = 'rgba(192, 57, 43, 0.08)';
      formMsg.style.border      = '1px solid rgba(192, 57, 43, 0.3)';
      formMsg.style.color       = '#c0392b';
      formMsg.textContent       = 'Erro ao enviar. Por favor tente novamente ou entre em contato pelo WhatsApp.';
    }

    btn.disabled    = false;
    btn.textContent = 'Enviar mensagem';
  });
}

// ----- Auto year -----
document.getElementById('year').textContent = new Date().getFullYear();

// ----- Scroll nav style -----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ----- Mobile nav — hamburger animates to X -----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

function openMenu() {
  navLinks.classList.add('open');
  navToggle.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navToggle.classList.contains('is-open') ? closeMenu() : openMenu();
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ----- Scroll reveal -----
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach(el => revealObserver.observe(el));
  setTimeout(() => reveals.forEach(el => el.classList.add('visible')), 2000);
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

// ----- Parallax on hero image (desktop only) -----
const heroWrap = document.querySelector('.hero-image-wrap');
if (heroWrap && window.innerWidth > 900) {
  window.addEventListener('scroll', () => {
    heroWrap.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }, { passive: true });
}

// ----- Image scale-in on scroll -----
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'scale(1)';
      entry.target.style.opacity = '1';
      imgObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.sobre-img, .hero-photo').forEach(img => {
  img.style.transform = 'scale(1.05)';
  img.style.opacity = '0';
  img.style.transition = 'transform 1s ease, opacity 0.9s ease';
  imgObserver.observe(img);
});

// ----- Counter animation on badge -----
const badge = document.querySelector('.sobre-badge-num');
if (badge) {
  const target = parseInt(badge.textContent.replace('+', ''));
  let started = false;
  const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        let count = 0;
        badge.textContent = '+0';
        const timer = setInterval(() => {
          count++;
          badge.textContent = '+' + count;
          if (count >= target) clearInterval(timer);
        }, 200);
      }
    });
  }, { threshold: 0.5 });
  badgeObserver.observe(badge);
}