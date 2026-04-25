// ASPETTA IL CARICAMENTO
window.addEventListener("load", function () {

  document.body.style.overflow = "hidden";

  const video = document.getElementById("bg-video");
  document.getElementById("scrollBtn").addEventListener("click", () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
});




  const locationSection = document.getElementById("location");

  // FIX iPhone video
  document.addEventListener("click", () => {
    if (video) video.play();
  }, { once: true });

  intro.addEventListener("click", () => {
  if (video) {
    video.muted = true;
    video.play().then(() => {
      console.log("Video partito ✅");
    }).catch(err => {
      console.log("Bloccato ❌", err);
    });
  }
});



setTimeout(() => {
  if (video) {
    video.muted = true;
    video.play().catch(() => {
      console.log("Serve interazione utente");
    });
  }
}, 3000);


document.body.addEventListener("touchstart", () => {
  if (video) {
    video.play();
  }
}, { once: true });

  // INTRO
 setTimeout(() => {
  const intro = document.getElementById("intro");

  if (intro) {
    intro.classList.add("reveal"); // 👈 ANIMAZIONE APERTURA

    setTimeout(() => {
      intro.style.display = "none";
      document.body.style.overflow = "auto"; // riattiva scroll
      window.scrollTo(0, 0);
      if (video) video.play();
    }, 1500);
  }
}, 3000);

  // TESTO HERO
  setTimeout(() => {
    const overlay = document.querySelector(".overlay");
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


  document.addEventListener("DOMContentLoaded", () => {

  const seal = document.getElementById("sealBtn");
  const intro = document.getElementById("intro");
  const scrollBtn = document.getElementById("scrollBtn");

  // sicurezza: evita errori se manca qualcosa
  if (!seal) return;

  seal.addEventListener("click", () => {

    // animazione sigillo
    seal.classList.add("open");

    // reveal pagina
    setTimeout(() => {
      intro.classList.add("reveal");
    }, 400);

    // mostra freccia
    setTimeout(() => {
      if (scrollBtn) {
        scrollBtn.style.display = "block";
      }
    }, 1200);

  });

});

  // CLICK SCROLL
  if (scrollBtn && locationSection) {
    scrollBtn.onclick = () => {
      locationSection.scrollIntoView({ behavior: "smooth" });
    };
  }

  // ===== SCROLL UNICO (FIX COMPLETO) =====
  window.addEventListener("scroll", () => {

    const screenHeight = window.innerHeight;

    // SEZIONI
    document.querySelectorAll("section").forEach(section => {
      const pos = section.getBoundingClientRect().top;
      if (pos < screenHeight - 100) {
        section.classList.add("visible");
      }
    });

    // TIMELINE PROGRESS
    const timeline = document.querySelector(".timeline");
    const progress = document.querySelector(".timeline-progress");

    if (timeline && progress) {
      const rect = timeline.getBoundingClientRect();

      const total = rect.height;
      const visible = Math.min(screenHeight - rect.top, total);
      const percent = Math.max(0, Math.min(visible / total, 1));

      progress.style.height = (percent * 100) + "%";
    }

    // TIMELINE ITEMS
    document.querySelectorAll(".timeline-item").forEach(item => {
      const pos = item.getBoundingClientRect().top;

      if (pos < screenHeight - 100) {
        item.classList.add("visible");
      }

      if (pos < screenHeight - 150) {
        item.classList.add("active");
      }
    });

    // REVEAL
    document.querySelectorAll(".reveal").forEach(el => {
      const pos = el.getBoundingClientRect().top;
      if (pos < screenHeight - 100) {
        el.classList.add("show");
      }
    });

  });
  

const container = document.querySelector(".timeline-scroll");
const cards = document.querySelectorAll(".timeline-scroll .timeline-card");
const dots = document.querySelectorAll(".dot");

if (container) {
  container.addEventListener("scroll", () => {
    let center = container.scrollLeft + container.offsetWidth / 2;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;

      if (Math.abs(center - cardCenter) < card.offsetWidth / 2) {
        card.classList.add("active");

        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[i]) dots[i].classList.add("active");

      } else {
        card.classList.remove("active");
      }
    });
  });
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

      emailjs.send("service_t4h35gq", "template_03xpiaa", {
        nome: this.nome.value,
        partecipanti: this.partecipanti.value,
        presenza: this.presenza.value,
        allergie: this.allergie.value
      })
      .then(() => {
        alert("Conferma inviata! 💌");
        this.reset();
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

  

  updateCountdown();
  setInterval(updateCountdown, 1000);

});
