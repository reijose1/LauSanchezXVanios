/* ── PRELOADER PETALS ── */
(function () {
  const cont = document.getElementById ('petals');
  if (cont) {
    for (let i = 0; i < 22; i++) {
      const p = document.createElement ('div');
      p.className = 'petal';
      p.style.left = Math.random () * 100 + '%';
      p.style.animationDuration = 4 + Math.random () * 7 + 's';
      p.style.animationDelay = Math.random () * 8 + 's';
      p.style.width = 7 + Math.random () * 10 + 'px';
      p.style.height = 11 + Math.random () * 12 + 'px';
      cont.appendChild (p);
    }
  }
}) ();

/* ── PRELOADER ── */
function abrirInvitacion () {
  const pl = document.getElementById ('preloader');
  if (pl) {
    pl.classList.add ('abierto');
    setTimeout (() => {
      pl.style.display = 'none';
      document.body.style.overflow = '';
    }, 1300);
  }
}
document.body.style.overflow = 'hidden';

/* ── COUNTDOWN ── */
function updateCountdown () {
  const target = new Date ('2026-07-04T19:00:00-05:00');
  const now = new Date ();
  let diff = target - now;
  if (diff < 0) diff = 0;
  const d = Math.floor (diff / 864e5);
  const h = Math.floor (diff % 864e5 / 36e5);
  const m = Math.floor (diff % 36e5 / 6e4);
  const s = Math.floor (diff % 6e4 / 1e3);
  document.getElementById ('cd-days').textContent = String (d).padStart (
    2,
    '0'
  );
  document.getElementById ('cd-hours').textContent = String (h).padStart (
    2,
    '0'
  );
  document.getElementById ('cd-mins').textContent = String (m).padStart (
    2,
    '0'
  );
  document.getElementById ('cd-secs').textContent = String (s).padStart (
    2,
    '0'
  );
}
updateCountdown ();
setInterval (updateCountdown, 1000);

/* ── PETALS PARA COUNTDOWN Y HERO ── */
function createFallingPetal (containerSelector) {
  const container = document.querySelector (containerSelector);
  if (!container) return;
  const petal = document.createElement ('div');
  petal.classList.add ('petal');
  const size = Math.random () * 10 + 8;
  petal.style.width = size + 'px';
  petal.style.height = size + Math.random () * 6 + 'px';
  petal.style.left = Math.random () * 100 + '%';
  const duration = Math.random () * 14 + 18;
  petal.style.animationDuration = duration + 's';
  petal.style.animationDelay = Math.random () * 5 + 's';
  petal.style.backgroundColor = '#FFB3C6';
  petal.style.opacity = (Math.random () * 0.2 + 0.12).toFixed (2);
  container.appendChild (petal);
  petal.addEventListener ('animationend', () => petal.remove ());
}

setInterval (() => createFallingPetal ('.petals-container'), 5500);
for (let i = 0; i < 3; i++)
  setTimeout (
    () => createFallingPetal ('.petals-container'),
    i * 1200
  );

setInterval (
  () => createFallingPetal ('.hero-petals-container'),
  6000
);
for (let i = 0; i < 3; i++)
  setTimeout (
    () => createFallingPetal ('.hero-petals-container'),
    i * 1400
  );

/* ── INTERSECTION OBSERVER (reveal) ── */
const observer = new IntersectionObserver (
  entries => {
    entries.forEach (e => {
      if (e.isIntersecting) e.target.classList.add ('active');
    });
  },
  {threshold: 0.12}
);
document.querySelectorAll ('.reveal').forEach (el => observer.observe (el));

/* ── NAVBAR SCROLL ── */
window.addEventListener ('scroll', () => {
  const nav = document.getElementById ('navbar');
  if (nav) nav.classList.toggle ('scrolled', window.scrollY > 40);
});

/* ===== CARRUSEL AUTOMÁTICO + SWIPE TÁCTIL ===== */
document.addEventListener ('DOMContentLoaded', function () {
  const slidesContainer = document.querySelector ('.carousel-slides');
  const slides = document.querySelectorAll ('.carousel-slide');
  const prevBtn = document.querySelector ('.carousel-btn.prev');
  const nextBtn = document.querySelector ('.carousel-btn.next');
  const dotsContainer = document.querySelector ('.carousel-dots');

  if (!slidesContainer || slides.length === 0) return;

  let currentIndex = 0;
  let autoInterval;
  const intervalTime = 4000;

  let touchStartX = 0;
  let touchEndX = 0;
  let isSwiping = false;
  const minSwipeDistance = 50;

  function createDots () {
    dotsContainer.innerHTML = '';
    slides.forEach ((_, idx) => {
      const dot = document.createElement ('div');
      dot.classList.add ('dot');
      if (idx === currentIndex) dot.classList.add ('active');
      dot.addEventListener ('click', () => goToSlide (idx));
      dotsContainer.appendChild (dot);
    });
  }

  function goToSlide (index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    currentIndex = index;
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots ();
  }

  function updateDots () {
    const dots = document.querySelectorAll ('.dot');
    dots.forEach ((dot, idx) => {
      if (idx === currentIndex) dot.classList.add ('active');
      else dot.classList.remove ('active');
    });
  }

  function nextSlide () {
    if (currentIndex + 1 < slides.length) goToSlide (currentIndex + 1);
    else goToSlide (0);
  }

  function prevSlide () {
    if (currentIndex - 1 >= 0) goToSlide (currentIndex - 1);
    else goToSlide (slides.length - 1);
  }

  function startAutoSlide () {
    if (autoInterval) clearInterval (autoInterval);
    autoInterval = setInterval (() => nextSlide (), intervalTime);
  }

  function stopAutoSlide () {
    if (autoInterval) clearInterval (autoInterval);
  }

  if (prevBtn) {
    prevBtn.addEventListener ('click', () => {
      stopAutoSlide ();
      prevSlide ();
      startAutoSlide ();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener ('click', () => {
      stopAutoSlide ();
      nextSlide ();
      startAutoSlide ();
    });
  }

  const btnRsvp = document.querySelector ('#rsvp .btn-gold');
  btnRsvp.addEventListener ('click', e => {
    e.preventDefault ();
    const msg = document.createElement ('div');
    msg.textContent = '✨ ¡Muchas Gracias a Ti!  ✨';
    msg.style.position = 'fixed';
    msg.style.bottom = '50%';
    msg.style.left = '50%';
    msg.style.transform = 'translateX(-50%)';
    msg.style.backgroundColor = '#FFF';
    msg.style.color = '#000';
    msg.style.padding = '12px 24px';
    msg.style.borderRadius = '30px';
    msg.style.fontFamily = 'var(--serif2)';
    msg.style.fontStyle = 'italic';
    msg.style.fontSize = '1.2rem';
    msg.style.zIndex = '1000';
    msg.style.opacity = '0';
    msg.style.transition = 'opacity 0.3s';
    document.body.appendChild (msg);
    setTimeout (() => (msg.style.opacity = '1'), 10);
    setTimeout (() => {
      msg.style.opacity = '0';
      setTimeout (() => msg.remove (), 1100);
    }, 1500);
  });

  const carouselContainer = document.querySelector ('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener ('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      isSwiping = true;
      stopAutoSlide ();
    });

    carouselContainer.addEventListener (
      'touchmove',
      e => {
        if (!isSwiping) return;
        e.preventDefault ();
      },
      {passive: false}
    );

    carouselContainer.addEventListener ('touchend', e => {
      if (!isSwiping) return;
      touchEndX = e.changedTouches[0].screenX;
      const deltaX = touchEndX - touchStartX;
      if (Math.abs (deltaX) > minSwipeDistance) {
        if (deltaX > 0) prevSlide ();
        else nextSlide ();
      }
      isSwiping = false;
      startAutoSlide ();
    });
  }

  if (carouselContainer) {
    carouselContainer.addEventListener ('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener ('mouseleave', startAutoSlide);
  }

  createDots ();
  goToSlide (0);
  startAutoSlide ();
});

/* ── AUDIO ── */
const audio = document.getElementById ('bg-audio');
const playBtn = document.getElementById ('play-btn');
const eq = document.getElementById ('eq');

let isPlaying = false;

function toggleAudio () {
  if (!audio) return;

  if (isPlaying) {
    audio.pause ();
    playBtn.textContent = '▶';
    if (eq) eq.classList.add ('paused');
    isPlaying = false;
  } else {
    const promise = audio.play ();
    if (promise !== undefined) {
      promise
        .then (() => {
          playBtn.textContent = '⏸';
          if (eq) eq.classList.remove ('paused');
          isPlaying = true;
        })
        .catch (error => {
          console.log ('Error al reproducir:', error);
          setTimeout (() => {
            audio
              .play ()
              .then (() => {
                playBtn.textContent = '⏸';
                if (eq) eq.classList.remove ('paused');
                isPlaying = true;
              })
              .catch (() => {});
          }, 100);
        });
    }
  }
}

playBtn.addEventListener ('click', toggleAudio);

/* ── COPIAR NEQUI ── */
function copiarNequi () {
  navigator.clipboard.writeText ('3216412877').then (() => {
    const msg = document.getElementById ('copy-msg');
    if (msg) {
      msg.textContent = '✓ Número copiado al portapapeles';
      setTimeout (() => (msg.textContent = ''), 2500);
    }
  });
}

/* ===== MODAL DE GOOGLE FORMS ===== */
document.addEventListener ('DOMContentLoaded', function () {
  const modal = document.getElementById ('modal-googleform');
  const btnAbrir = document.getElementById ('btn-abrir-modal-rsvp');
  const btnCerrar = document.getElementById ('btn-cerrar-modal-rsvp');
  const iframe = document.getElementById ('iframe-googleform');

  if (!modal || !btnAbrir || !btnCerrar) return;

  let formularioEnviado = false;

  btnAbrir.addEventListener ('click', function () {
    modal.style.display = 'flex';
    formularioEnviado = false;
    document.body.style.overflow = 'hidden';
  });

  btnCerrar.addEventListener ('click', function () {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });

  modal.addEventListener ('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  iframe.addEventListener ('load', function () {
    if (!formularioEnviado) {
      formularioEnviado = true;
      return;
    }
    if (formularioEnviado) {
      setTimeout (function () {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        formularioEnviado = false;
      }, 1500);
    }
  });
});

/* ===== CORAZONES FLOTANTES EN RSVP ===== */
(function () {
  const rsvpBtn = document.querySelector ('#rsvp .btn-gold');
  if (!rsvpBtn) return;

  const symbols = ['❤️', '💖', '🌸', '✨', '💕', '💗'];
  const minCount = 5;
  const maxCount = 10;

  function createFloatingElement (symbol, x, y) {
    const el = document.createElement ('div');
    el.textContent = symbol;
    el.className = 'floating-heart';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    const randomOffsetX = (Math.random () - 0.5) * 60;
    el.style.setProperty ('--offset-x', randomOffsetX + 'px');
    const duration = 0.8 + Math.random () * 0.8;
    el.style.animationDuration = duration + 's';
    const randomRotate = (Math.random () - 0.5) * 40;
    el.style.transform = `rotate(${randomRotate}deg)`;
    document.body.appendChild (el);
    setTimeout (() => el.remove (), duration * 1000);
  }

  function onRsvpClick (event) {
    event.preventDefault ();

    const rect = rsvpBtn.getBoundingClientRect ();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const count =
      Math.floor (Math.random () * (maxCount - minCount + 1)) + minCount;

    for (let i = 0; i < count; i++) {
      const randomSymbol =
        symbols[Math.floor (Math.random () * symbols.length)];
      const offsetX = (Math.random () - 0.5) * 80;
      const offsetY = (Math.random () - 0.5) * 60;
      const x = centerX + offsetX;
      const y = centerY + offsetY;
      createFloatingElement (randomSymbol, x, y);
    }

    setTimeout (() => {
      window.open (rsvpBtn.href, '_blank');
    }, 1200);
  }

  rsvpBtn.addEventListener ('click', onRsvpClick);
}) ();

/* ===== DESTELLOS ESCARCHA CON DEPURACIÓN ===== */
(function () {
  function init () {
    console.log ('Iniciando generador de destellos escarcha');
    const MAX_PARTICLES = 25;
    const GENERATION_INTERVAL = 2500;
    let activeCount = 0;

    function createParticle () {
      if (activeCount >= MAX_PARTICLES) return;

      const particle = document.createElement ('div');
      particle.classList.add ('frost-particle');

      const r = Math.random ();
      if (r < 0.6) particle.classList.add ('small');
      else if (r < 0.85) particle.classList.add ('medium');
      else particle.classList.add ('large');

      const posX = Math.random () * window.innerWidth;
      particle.style.left = posX + 'px';

      const startY = window.innerHeight * (0.7 + Math.random () * 0.3);
      particle.style.top = startY + 'px';

      const duration = 5 + Math.random () * 7;
      particle.style.animationDuration = duration + 's';

      const delay = Math.random () * 2;
      particle.style.animationDelay = delay + 's';

      const direction = (Math.random () - 0.5) * 80;
      particle.style.setProperty ('--dir', direction / 100);

      particle.addEventListener ('animationend', () => {
        particle.remove ();
        activeCount--;
      });

      document.body.appendChild (particle);
      activeCount++;
      console.log (`Destello creado (total activos: ${activeCount})`);
    }

    setInterval (createParticle, GENERATION_INTERVAL);

    for (let i = 0; i < 7; i++) {
      setTimeout (createParticle, i * 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener ('DOMContentLoaded', init);
  } else {
    init ();
  }
}) ();

// ===== MENÚ HAMBURGUESA PARA MÓVILES =====
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      console.log('Menú toggled');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  } else {
    console.log('No se encontró el botón o el menú');
  }
});