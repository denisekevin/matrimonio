// ASPETTA IL CARICAMENTO
window.addEventListener("load", function () {

// ===== OBSERVER REVEAL (SUPER PERFORMANCE) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

  entry.target.classList.add("show");

  // 👇 AGGIUNGI QUESTO
  if (entry.target.classList.contains("intro-text")) {
    entry.target.classList.add("animate");
  }

  revealObserver.unobserve(entry.target);
}
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".reveal, .reveal-img, .intro-text").forEach(el => {
  revealObserver.observe(el);
});



const floatingBtn = document.querySelector('.floating-btn');



  // Fix floating button - scroll senza nuova scheda
  if (floatingBtn) {
    floatingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rsvpSection = document.getElementById('rsvp');
      if (rsvpSection) {
        rsvpSection.scrollIntoView({ behavior: 'smooth' });
      }
      return false;
    });
  }


const intro = document.getElementById("intro");
const overlay = document.querySelector(".overlay");
setTimeout(() => {

  overlay?.classList.add("show");

}, 800);
const video = document.getElementById("bg-video");

// blocca scroll SOLO se intro esiste
if (intro) {
  document.body.style.overflow = "hidden";
} else {
  document.body.style.overflow = "auto";
}

// Se c'è un hash, salta l'intro
if (window.location.hash && intro) {
  intro.style.display = 'none';
  document.body.style.overflow = "auto";
  if (video) { video.muted = true; video.play(); }
}


 

const scrollBtnTop = document.getElementById("scrollBtn");
const scrollBtn = document.querySelector(".scroll-next");

if (scrollBtnTop) {
  scrollBtnTop.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  });
}
document.querySelectorAll(".scroll-next").forEach(arrow => {

  arrow.addEventListener("click", () => {

    const currentSection = arrow.closest("section, .story-block");

    if (!currentSection) return;

    const nextSection = currentSection.nextElementSibling;

    if (nextSection) {

      nextSection.scrollIntoView({

        behavior: "smooth"

      });

    }

  });

});



  const locationSection = document.getElementById("location");


// Click disabilitato - sigillo si apre automaticamente
if (intro) {
  // Nessun click listener, l'apertura è automatica
}else {
  // fallback sicurezza
  document.body.style.overflow = "auto";
}

  // TESTO HERO
  setTimeout(() => {
    if (overlay) {
      overlay.classList.add("fade-out");

      setTimeout(() => {
        overlay.style.display = "none";
      }, 3000);
    }
  }, 6000);

  // FRECCIA
  setTimeout(() => {
    if (scrollBtn) {
      scrollBtn.style.display = "block";
      scrollBtn.style.opacity = "1";
    }
  }, 3000);


const seal = document.getElementById("sealBtn");
if (seal) {
  // 🎬 Sigillo si apre automaticamente dopo 2.5 secondi
  setTimeout(() => {
    
    seal.classList.add("open");

    // 🔓 sblocca scroll
    document.body.style.overflow = "auto";

    // 🎥 avvia video
       if (video) {
      video.muted = true;
      video.playsinline = true;
      video.play().catch(() => {
        // Safari a volte blocca, riprova
        setTimeout(() => video.play(), 100);
      });
    }

    // 🌫 fade overlay
    setTimeout(() => {
      overlay.classList.add("fade-out");
    }, 200);

    // 🎬 reveal intro
    setTimeout(() => {
      intro.classList.add("reveal");
    }, 400);

    // ⬇ mostra freccia
    setTimeout(() => {
      scrollBtn.style.display = "block";
    }, 1200);

  }, 2500); // 2.5 secondi di attesa
}
  
let ticking = false;

window.addEventListener("scroll", () => {

  if (!ticking) {

    window.requestAnimationFrame(() => {
      // ===== PARALLAX VIDEO =====
          // ===== PARALLAX + BLUR VIDEO =====
          if (video) {
            const scroll = window.scrollY;

            // movimento
            const offset = scroll * 0.3;
            video.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;

            // blur progressivo
            const blur = Math.min(scroll / 200, 6); // max blur 6px

            // luminosità (leggermente più scuro)
            const brightness = Math.max(1 - scroll / 1000, 0.7);

            video.style.filter = `blur(${blur}px) brightness(${brightness})`;
          }
      // ===== FLOATING BUTTON =====
      // Appare dopo aver scrollato 300px (stile WhatsApp)
      if (floatingBtn) {
        if (window.scrollY > 300) {
          floatingBtn.classList.add('show');
        } else {
          floatingBtn.classList.remove('show');
        }
      }


      const screenHeight = window.innerHeight;


      // ===== TIMELINE =====
      const timeline = document.querySelector(".timeline");
      const progress = document.querySelector(".timeline-progress");

      if (timeline && progress) {
        const rect = timeline.getBoundingClientRect();
        const total = rect.height;
        const visible = Math.min(screenHeight - rect.top, total);
        const percent = Math.max(0, Math.min(visible / total, 1));
        progress.style.height = (percent * 100) + "%";
      }

      // ===== TIMELINE ITEMS =====
      document.querySelectorAll(".timeline-item").forEach(item => {
        const pos = item.getBoundingClientRect().top;

        if (pos < screenHeight - 100) {
          item.classList.add("visible");
        }

        if (pos < screenHeight - 150) {
          item.classList.add("active");
        }
      });


      // 👉 IMPORTANTISSIMO
      ticking = false;

    });

    ticking = true;
  }

});

  

/* ===== TIMELINE CAROUSEL — effetto luminosità graduale + dots sincronizzati ===== */
const container = document.querySelector(".timeline-scroll");
const cards = document.querySelectorAll(".timeline-scroll .timeline-card");
const dots = document.querySelectorAll(".timeline-dots .dot");

function updateTimelineCards() {
  if (!container || cards.length === 0) return;

  // FIX: Usa coordinate assolute della viewport per entrambi
  const containerRect = container.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;
  const containerWidth = containerRect.width;

  let closestIndex = 0;
  let closestDistance = Infinity;

  cards.forEach((card, i) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(containerCenter - cardCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }

    // FIX: maxDist più stretto per schermi piccoli
    const maxDist = containerWidth * 0.4;
    const factor = Math.min(distance / maxDist, 1);

    const opacity = 1 - (factor * 0.55);
    const scale = 1 - (factor * 0.1);
    const blur = factor * 3;

    card.style.opacity = opacity.toFixed(3);
    card.style.transform = `scale(${scale.toFixed(3)})`;
    card.style.filter = `blur(${blur.toFixed(2)}px)`;
  });

  if (dots.length > 0) {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[closestIndex]) {
      dots[closestIndex].classList.add("active");
    }
  }
}

if (container) {
  // Usa requestAnimationFrame per performance fluide
  let ticking = false;
  container.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateTimelineCards();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Inizializza subito
  updateTimelineCards();
}

const rows = document.querySelectorAll(".timeline-row");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

rows.forEach(row => observer.observe(row));

  // ===== EMAILJS =====
  (function() {
    emailjs.init("mVNh9ENXU_PMGMlPn");
  })();

  const form = document.getElementById("form");

  if (form) {
    form.addEventListener("submit", function(e) {
  e.preventDefault();

  const btn = this.querySelector("button");

  // blocca invii multipli
  btn.disabled = true;
  btn.innerText = "Invio in corso...";

  emailjs.send("service_t4h35gq", "template_03xpiaa", {
    nome: this.nome.value,
    partecipanti: this.partecipanti.value,
    presenza: this.presenza.value,
    allergie: this.allergie.value
  })
  .then(() => {
    alert("Conferma inviata! 💌");
    this.reset();
  })
  .catch(() => {
    alert("Errore invio ❌ riprova");
  })
  .finally(() => {
    btn.disabled = false;
    btn.innerText = "Conferma presenza";
  });
});

    // NASCONDI PERSONE SE NON PARTECIPA
    const presenza = document.querySelector('[name="presenza"]');
    const personeField = document.querySelector('[name="partecipanti"]').parentElement;

    if (presenza && personeField) {
      presenza.addEventListener("change", () => {
        if (presenza.value === "No") {
          personeField.style.display = "none";
        } else {
          personeField.style.display = "block";
        }
      });
    }
  }




  

  // ===== COUNTDOWN =====
  function updateCountdown() {
    const date = new Date("May 7, 2027 00:00:00").getTime();
    const now = new Date().getTime();
    const diff = date - now;

    const d = document.getElementById("days");
    const h = document.getElementById("hours");
    const m = document.getElementById("minutes");
    const s = document.getElementById("seconds");

    if (d && h && m && s) {
      d.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
      h.innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
      m.innerText = Math.floor((diff / (1000 * 60)) % 60);
      s.innerText = Math.floor((diff / 1000) % 60);
    }
  }


const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel img');

if (track && slides.length > 0) {
  let index = 0;

  setInterval(() => {
    index++;

    if (index >= slides.length) {
      index = 0;
    }

    track.style.transform = `translateX(-${index * 100}%)`;
  }, 3000);
}
  

  updateCountdown();
  setInterval(updateCountdown, 1000);

  

});
document.addEventListener("DOMContentLoaded", () => {

  const chatSection = document.querySelector(".reveal-chat");
  let chatStarted = false; // 👈 CHIAVE

  const observerChat = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !chatStarted) {
        chatStarted = true;
        startChatAnimation();

        observerChat.disconnect(); // 👈 BLOCCA DEFINITIVAMENTE
      }
    });
  }, { threshold: 0.4 });

  if (chatSection) observerChat.observe(chatSection);


  function startChatAnimation() {
    const messages = document.querySelectorAll(".chat-story .msg");
    const typing = document.querySelector(".chat-story .typing");

    let i = 0;

    function nextMessage() {
      if (i >= messages.length) return;

      const msg = messages[i];

      if (
        msg.classList.contains("system") ||
        msg.classList.contains("highlight")
      ) {
        showMsg(msg);
        i++;
        setTimeout(nextMessage, 600);
        return;
      }

      if (i < messages.length - 2) {

        msg.parentNode.insertBefore(typing, msg);

        typing.classList.remove("left", "right");

        if (msg.classList.contains("right")) {
          typing.classList.add("right");
        } else {
          typing.classList.add("left");
        }

        typing.style.display = "block";

        setTimeout(() => {
          typing.style.display = "none";
          showMsg(msg);
          i++;
          setTimeout(nextMessage, 600);
        }, 1200);

      } else {
        showMsg(msg);
        i++;
        setTimeout(nextMessage, 600);
      }
    }

    nextMessage();
  }

  function showMsg(msg) {
    msg.style.opacity = 1;
    msg.style.transform = "translateX(0)";
  }

  

});

// Smooth scroll nativo gestito da CSS (html { scroll-behavior: smooth })
// RIMOSSO: smooth scroll custom che causava spazio vuoto sotto il body

const introText = document.querySelector(".intro-text");
let introDone = false;
