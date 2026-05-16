// =============================================
// script.js — Jyoti Nayak Portfolio
// =============================================

// 1. Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('nav a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));


// 2. Skill bars — animate in when visible
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const targetWidth = el.style.width;
      el.style.width = '0%';
      el.style.transition = 'width 0.8s ease';
      setTimeout(() => { el.style.width = targetWidth; }, 100);
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(bar => skillObserver.observe(bar));


// 3. Contact form — send button feedback
const sendBtn = document.querySelector('.contact-form .btn-primary');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name    = document.querySelector('.contact-form input[type="text"]').value.trim();
    const email   = document.querySelector('.contact-form input[type="email"]').value.trim();
    const message = document.querySelector('.contact-form textarea').value.trim();

    if (!name || !email || !message) {
      sendBtn.textContent = 'Fill all fields!';
      sendBtn.style.background = 'var(--accent3)';
      setTimeout(() => {
        sendBtn.textContent = 'Send Message →';
        sendBtn.style.background = '';
      }, 2000);
      return;
    }

    sendBtn.textContent = 'Sent ✓';
    sendBtn.style.background = 'var(--accent2)';
    setTimeout(() => {
      sendBtn.textContent = 'Send Message →';
      sendBtn.style.background = '';
    }, 3000);
  });
}


// 4. Project cards — subtle tilt on mouse move
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
    card.style.transform = `translateY(-3px) rotateX(${-y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.3s ease';
  });
});


// 5. Scroll-reveal for section cards
const revealEls = document.querySelectorAll(
  '.cert-card, .skill-group, .project-card'
);

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));