// ── STARS CANVAS ──
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 160;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      dir: Math.random() > 0.5 ? 1 : -1
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fill();
    s.alpha += s.speed * 0.01 * s.dir;
    if (s.alpha >= 0.8 || s.alpha <= 0.1) s.dir *= -1;
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => { resize(); initStars(); });
resize();
initStars();
drawStars();


// ── FADE IN ON SCROLL ──
const fadeEls = document.querySelectorAll('.fade-in');

// Activa inmediatamente los que ya están en pantalla al cargar
function checkVisible() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

// IntersectionObserver como respaldo para scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // deja de observar una vez visible
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', checkVisible);
window.addEventListener('load', checkVisible);
checkVisible(); // ejecutar también de inmediato


// ── NAV ACTIVE LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));


// ── NAV SCROLL SHRINK ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.padding = '10px 60px';
  } else {
    nav.style.padding = '18px 60px';
  }
});

// ======================================
// CONTACT FORM VALIDATION
// ======================================

const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", async function(e)  {

        e.preventDefault();

        const fullname =
            document.getElementById("fullname").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const feedback =
            document.getElementById("form-feedback");

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullname || !email || !message) {

            feedback.className = "error-message";

            feedback.innerHTML =
                "⚠ Compila tutti i campi obbligatori.";

            return;
        }

        if (!emailRegex.test(email)) {

            feedback.className = "error-message";

            feedback.innerHTML =
                "⚠ Inserisci un indirizzo email valido.";

            return;
        }

      try {

    const reason =
        document.querySelector(
            'input[name="reason"]:checked'
        )?.value || "Altro";

    const response = await fetch(
    "https://ronconi-backend.onrender.com/contact",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                fullname,
                email,
                reason,
                message
            })
        }
    );

    const result = await response.json();

    if (response.ok) {

        feedback.className = "success-message";

        feedback.innerHTML = `
            <strong>✓ Messaggio ricevuto!</strong><br><br>

            Grazie per aver dedicato qualche minuto a visitare il mio portfolio.<br><br>

            Ho ricevuto il tuo messaggio e ti risponderò il prima possibile.<br><br>

            Nel frattempo, ti auguro una splendida giornata.<br><br>

            — Joaquín Ronconi
        `;

        form.reset();

    } else {

        feedback.className = "error-message";

        feedback.innerHTML =
            "⚠ Errore durante l'invio del messaggio.";
    }

} catch (error) {

    console.error(error);

    feedback.className = "error-message";

    feedback.innerHTML =
        "⚠ Impossibile contattare il server.";
}
    });
}