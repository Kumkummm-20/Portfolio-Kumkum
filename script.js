/* ══════════════════════════════════════════
   PORTFOLIO JAVASCRIPT  —  script.js
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────
     1. CUSTOM CURSOR
     ────────────────────────────────────── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  // Move cursor & ring with slight lag on ring
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';

    // Ring follows with a small delay for a smooth trailing effect
    setTimeout(() => {
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top  = e.clientY + 'px';
    }, 60);
  });

  // Grow cursor on interactive elements
  const interactiveEls = document.querySelectorAll(
    'a, button, .skill-card, .service-card, .testi-card'
  );

  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform     = 'translate(-50%, -50%) scale(2.5)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
      cursorRing.style.opacity   = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform     = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.opacity   = '0.6';
    });
  });

  // Hide custom cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity     = '0';
    cursorRing.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity     = '1';
    cursorRing.style.opacity = '0.6';
  });


  /* ──────────────────────────────────────
     2. STICKY NAVBAR ON SCROLL
     ────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    // Add frosted-glass dark style after scrolling 50px
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });


  /* ──────────────────────────────────────
     3. SCROLL REVEAL  (fade + slide up)
     ────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // If this revealed element contains a skill bar, animate it
          const bar = entry.target.querySelector('.skill-bar');
          if (bar) {
            bar.style.width = bar.dataset.pct + '%';
          }
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });


  /* ──────────────────────────────────────
     4. SKILL BAR ANIMATION
        (triggers when the skills section
        itself enters the viewport, ensuring
        all bars animate even if their cards
        were already partially visible)
     ────────────────────────────────────── */
  const skillsSection = document.getElementById('skills');

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          document.querySelectorAll('.skill-bar').forEach((bar) => {
            bar.style.width = bar.dataset.pct + '%';
          });
        }
      },
      { threshold: 0.2 }
    );

    skillsObserver.observe(skillsSection);
  }

  const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach(card => {

    card.addEventListener("click", () => {

        const inner = card.querySelector(".card-inner");

        inner.classList.toggle("flip");

    });

});

  /* ──────────────────────────────────────
     5. ACTIVE NAV LINK HIGHLIGHT
        (highlights the nav link matching
        whichever section is in view)
     ────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const activeLinkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove('active'));
          const activeAnchor = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (activeAnchor) activeAnchor.classList.add('active');
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((sec) => activeLinkObserver.observe(sec));


  /* ──────────────────────────────────────
     6. SMOOTH SCROLL for nav links
        (enhances browser default in case
        scroll-behavior: smooth isn't enough)
     ────────────────────────────────────── */
  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });


  /* ──────────────────────────────────────
     7. NEWSLETTER BUTTON
     ────────────────────────────────────── */
  const newsletterBtn   = document.querySelector('.newsletter-btn');
  const newsletterInput = document.querySelector('.newsletter-input');

  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
      const email = newsletterInput.value.trim();

      if (!email || !email.includes('@')) {
        // Simple validation flash
        newsletterInput.style.borderColor = '#e85d26';
        newsletterInput.placeholder = 'Enter a valid email!';
        setTimeout(() => {
          newsletterInput.style.borderColor = '';
          newsletterInput.placeholder = 'Your email';
        }, 2000);
        return;
      }

      // Success feedback
      newsletterBtn.textContent   = '✓';
      newsletterBtn.style.background = '#2ecc71';
      newsletterInput.value       = '';
      newsletterInput.placeholder = 'Thanks for subscribing!';

      setTimeout(() => {
        newsletterBtn.textContent      = '→';
        newsletterBtn.style.background = '';
        newsletterInput.placeholder    = 'Your email';
      }, 3000);
    });
  }


  /* ──────────────────────────────────────
     8. HERO PARALLAX  (subtle depth effect)
     ────────────────────────────────────── */
  const heroTitle = document.querySelector('.hero-title-wrap');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroTitle && scrollY < window.innerHeight) {
      heroTitle.style.transform = `translateY(${scrollY * 0.25}px)`;
      heroTitle.style.opacity   = 1 - (scrollY / (window.innerHeight * 0.7));
    }
  });


  /* ──────────────────────────────────────
     9. SERVICE CARD — click ripple effect
     ────────────────────────────────────── */
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect   = card.getBoundingClientRect();

      ripple.style.cssText = `
        position: absolute;
        width: 10px; height: 10px;
        background: rgba(232,93,38,0.35);
        border-radius: 50%;
        left: ${e.clientX - rect.left - 5}px;
        top:  ${e.clientY - rect.top  - 5}px;
        transform: scale(0);
        animation: ripple 0.55s linear;
        pointer-events: none;
      `;

      // Inject keyframes once
      if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
          @keyframes ripple {
            to { transform: scale(30); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      card.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

}); // end DOMContentLoaded
/* Contact Section Animation */

const contactCard = document.querySelector(".contact-card");

if(contactCard){

    window.addEventListener("mousemove",(e)=>{

        const rect = contactCard.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        contactCard.style.background =
        `radial-gradient(circle at ${x}px ${y}px,
        rgba(255, 170, 0, 0.12),
        rgba(255,255,255,0.04) 45%)`;

    });

}