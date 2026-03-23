$(document).ready(() => {

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".home .textoPortada", {
        x: "-100%",      // Desde fuera de la pantalla
        duration: 1.5,   // 1.5 segundos
        ease: "power2.out"
      });

      gsap.from(".home .mainDivBusqueda", {
        y: "100%",      // Desde fuera de la pantalla
        duration: 1.5,   // 1.5 segundos
        ease: "power2.out"
      })


      // 1. Párrafo introductorio: fade suave desde abajo
gsap.from(".datos-gif-parrafo p", {
  y: 25,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".contenedor-datos-gif",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});

// 2. Tarjetas: fadeInUp escalonado de izquierda a derecha
gsap.from(".dato-gif", {
  y: 40,
  opacity: 0,
  duration: 0.7,
  ease: "power2.out",
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".datos-gif",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});

// 3. GIFs: escala sutil al aparecer
gsap.from(".dato-gif img", {
  scale: 0.85,
  opacity: 0,
  duration: 0.5,
  ease: "back.out(1.4)",
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".datos-gif",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});

// 4. Contador numérico para los h2
const contadores = [
  { selector: ".dato-gif:nth-child(1) h2", target: 10, prefix: "+", suffix: "" },
  { selector: ".dato-gif:nth-child(2) h2", target: 5,    prefix: "+", suffix: "" },
  { selector: ".dato-gif:nth-child(3) h2", target: 30, prefix: "+", suffix: "" },
  // El 4º (24h) lo dejamos sin contador, solo con el fadeInUp
];

contadores.forEach(({ selector, target, prefix, suffix }) => {
  const el = document.querySelector(selector);
  if (!el) return;
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 1.8,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = prefix + Math.round(obj.val) + suffix;
    },
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});


gsap.from(".comoFunciona h1", {
  x: -40,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".containerComoFunciona",
    start: "top 78%",
    toggleActions: "play none none none"
  }
});

// Lista: cada item aparece escalonado hacia abajo
gsap.from(".comoFunciona ol li", {
  x: -25,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.12,
  scrollTrigger: {
    trigger: ".containerComoFunciona",
    start: "top 75%",
    toggleActions: "play none none none"
  }
});

// Cita y botón: fade simple, más tardío
gsap.from(".comoFunciona p, .comoFunciona .btn-primary-personal", {
  opacity: 0,
  y: 15,
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".containerComoFunciona",
    start: "top 72%",
    toggleActions: "play none none none"
  }
});

// Imágenes: entran desde la derecha escalonadas
gsap.from(".divImagenes img", {
  x: 50,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.18,
  scrollTrigger: {
    trigger: ".containerComoFunciona",
    start: "top 78%",
    toggleActions: "play none none none"
  }
});

gsap.from(".card-instalacion", {
  opacity: 0,
  y: 30,
  duration: 0.7,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".contenedor-top-instalaciones",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});

// Botón "Ver instalaciones": aparece después de las cards
gsap.from(".contenedor-btn-ver-instalaciones", {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".contenedor-btn-ver-instalaciones",
    start: "top 90%",
    toggleActions: "play none none none"
  }
});

      // gsap.from(".content .comoFunciona", {
      //   x: "-100%",
      //   duration: 1.5,
      //   ease: "power2.out",
      //   scrollTrigger: {
      //     trigger: ".content .comoFunciona",
      //     start: "top 80%", // Empieza la animación cuando el top del elemento esté al 80% de la ventana
      //     toggleActions: "play none none none"
      //   }
      // });
      
      // gsap.from(".content .divImagenes", {
      //   x: "100%",
      //   duration: 1.5,
      //   ease: "power2.out",
      //   scrollTrigger: {
      //     trigger: ".content .divImagenes",
      //     start: "top 80%",
      //     toggleActions: "play none none none"
      //   }
      // });

      

      $(window).on('scroll', function () {
        if ($(window).scrollTop() > 5) {
          $('header.headerHome').addClass('header-scrolled');
        } else {
          $('header.headerHome').removeClass('header-scrolled');
        }
        
      });


      $(document).on('click', '.img-pequena', function() {
        let imagenPequena = $(this);
        let imagenGrande  = $('.img-grande');

        let srcImgPequena = imagenPequena.attr('src');
        let srcImgGrande  = imagenGrande.attr('src');

        imagenGrande.attr('src', srcImgPequena);
        imagenPequena.attr('src', srcImgGrande);
      });


       gsap.from(".instalaciones .title-page", {
    x: -30,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out"
  });

  gsap.from(".instalaciones .description-page", {
    x: -20,
    opacity: 0,
    duration: 0.7,
    delay: 0.15,
    ease: "power2.out"
  });

  // ── Acordeón de filtros ───────────────────────────────────
  gsap.from(".filtrado", {
    opacity: 0,
    y: 15,
    duration: 0.6,
    delay: 0.25,
    ease: "power2.out"
  });

  // ── Resumen numérico (los 4 contadores) ──────────────────
  gsap.from(".div-numero-instalaciones", {
    opacity: 0,
    y: 25,
    duration: 0.5,
    delay: 0.35,
    stagger: 0.1,
    ease: "power2.out"
  });

  // Contador animado para cada número del resumen
  document.querySelectorAll(".div-numero-instalaciones h1").forEach(el => {
    const target = parseInt(el.textContent.trim());
    if (isNaN(target)) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.2,
      delay: 0.4,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(obj.val);
      }
    });
  });

  // ── Cards de instalaciones: fadeInUp escalonado ───────────
  gsap.from(".instalaciones-container .card-instalacion", {
    opacity: 0,
    y: 200,
    duration: 0.6,
    stagger: 0.08,
    delay: 0.5,
    ease: "power2.out", 
    clearProps: "all" 
  });

  // ── Animación para cards cargadas dinámicamente (por filtro) ──
  // Se llama manualmente tras actualizar el contenedor vía AJAX
  window.animarCardsInstalaciones = () => {
    gsap.from("#contenedor-instalaciones .card-instalacion", {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.07,
      ease: "power2.out"
    });
  };


  gsap.from(".categoriasInstalacion", {
    opacity: 0,
    y: -10,
    duration: 0.5,
    ease: "power2.out"
  });

  // Título
  gsap.from(".infoInstalacion .title-page", {
    opacity: 0,
    x: -30,
    duration: 0.7,
    delay: 0.1,
    ease: "power2.out"
  });

  // Descripción
  gsap.from(".infoInstalacion .description-page", {
    opacity: 0,
    y: 15,
    duration: 0.6,
    delay: 0.2,
    ease: "power2.out"
  });

  // Info-cards (Hay pistas, Reserva completa...): escalonadas
  gsap.fromTo(".info-card",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.3,
      ease: "power2.out",
      clearProps: "transform"
    }
  );

  // ── Sección Pistas (scroll trigger) ──────────────────────
  // Esta sección está más abajo, tiene más sentido activarla al hacer scroll

  // Título "Pistas"
  gsap.from(".pistasInstalacion .title-page", {
    opacity: 0,
    x: -25,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".pistasInstalacion",
      start: "top 100%",
      toggleActions: "play none none none"
    }
  });

  // Cards de pistas: fadeInUp escalonado
  gsap.fromTo(".container-pistas-instalacion .card-instalacion",
    { opacity: 0, y: 140 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
      clearProps: "transform",
      scrollTrigger: {
        trigger: ".container-pistas-instalacion",
        start: "top 100%",
        toggleActions: "play none none none"
      }
    }
  );


    // ── Cabecera ─────────────────────────────────────────────
  gsap.from(".title-page", {
    opacity: 0,
    x: -30,
    duration: 0.7,
    ease: "power2.out"
  });

  gsap.from(".description-page", {
    opacity: 0,
    y: 10,
    duration: 0.6,
    delay: 0.1,
    ease: "power2.out"
  });

  // ── Acordeón de filtros ───────────────────────────────────
  gsap.from("#accordionFiltro", {
    opacity: 0,
    y: 15,
    duration: 0.5,
    delay: 0.2,
    ease: "power2.out"
  });

  // ── Tabla: contenedor + filas escalonadas ─────────────────
  gsap.from(".divTable", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    delay: 0.3,
    ease: "power2.out"
  });

  gsap.fromTo("#tablaInstalaciones thead",
    { opacity: 0, y: -10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.4,
      ease: "power2.out",
      clearProps: "transform"
    }
  );

  gsap.fromTo("#tablaInstalaciones tbody tr",
    { opacity: 0, x: -15 },
    {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.06,
      delay: 0.45,
      ease: "power2.out",
      clearProps: "transform"
    }
  );

  // ── Botón "Nueva" ─────────────────────────────────────────
  gsap.fromTo("#crear",
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.6,
      ease: "power2.out",
      clearProps: "transform"
    }
  );

  // ── Animación para filas recargadas por filtro AJAX ───────
  window.animarFilasGestor = () => {
    gsap.fromTo("#tablaInstalaciones tbody tr",
      { opacity: 0, x: -15 },
      {
        opacity: 1,
        x: 0,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "transform"
      }
    );
  };

})