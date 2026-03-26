$(document).ready(() => {
  gsap.registerPlugin(ScrollTrigger);

  const esHome               = document.querySelector(".home") !== null;
  const esInstalaciones      = document.querySelector(".instalaciones") !== null;
  const esPaginaInstalacion  = document.querySelector(".paginaInstalacion") !== null;
  const esGestorInstalaciones = document.querySelector("#tablaInstalaciones") !== null;
  const esGestorCategorias   = document.querySelector(".pagina-gestor-categorias") !== null;
  const esReservas = document.querySelector(".paginaReservas") !== null;
  const esGestorUsuarios = document.querySelector(".pagina-gestor-usuarios") !== null;
  const esDashboard = document.querySelector(".pagina-dashboard") !== null;

  // ════════════════════════════════════════════════════════
  // HOME
  // ════════════════════════════════════════════════════════
  if (esHome) {

    gsap.from(".home .textoPortada", {
      x: "-100%",
      duration: 1.5,
      ease: "power2.out"
    });

    gsap.from(".home .mainDivBusqueda", {
      y: "100%",
      duration: 1.5,
      ease: "power2.out"
    });

    // Párrafo introductorio
    gsap.from(".datos-gif-parrafo p", {
      y: 25, opacity: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: ".contenedor-datos-gif", start: "top 80%", toggleActions: "play none none none" }
    });

    // Tarjetas GIF
    gsap.from(".dato-gif", {
      y: 40, opacity: 0, duration: 0.7, ease: "power2.out", stagger: 0.15,
      scrollTrigger: { trigger: ".datos-gif", start: "top 80%", toggleActions: "play none none none" }
    });

    // Iconos GIF
    gsap.from(".dato-gif img", {
      scale: 0.85, opacity: 0, duration: 0.5, ease: "back.out(1.4)", stagger: 0.15,
      scrollTrigger: { trigger: ".datos-gif", start: "top 80%", toggleActions: "play none none none" }
    });

    // Contadores numéricos
    const contadores = [
      { selector: ".dato-gif:nth-child(1) h2", target: 10, prefix: "+", suffix: "" },
      { selector: ".dato-gif:nth-child(2) h2", target: 5,    prefix: "+", suffix: "" },
      { selector: ".dato-gif:nth-child(3) h2", target: 30, prefix: "+", suffix: "" },
    ];
    contadores.forEach(({ selector, target, prefix }) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 1.8, ease: "power2.out",
        onUpdate: () => { el.textContent = prefix + Math.round(obj.val); },
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
      });
    });

    // ¿Cómo funciona?
    gsap.from(".comoFunciona h1", {
      x: -40, opacity: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: ".containerComoFunciona", start: "top 78%", toggleActions: "play none none none" }
    });

    gsap.from(".comoFunciona ol li", {
      x: -25, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.12,
      scrollTrigger: { trigger: ".containerComoFunciona", start: "top 75%", toggleActions: "play none none none" }
    });

    gsap.from(".comoFunciona p, .comoFunciona .btn-primary-personal", {
      opacity: 0, y: 15, duration: 0.6, ease: "power2.out", stagger: 0.15,
      scrollTrigger: { trigger: ".containerComoFunciona", start: "top 72%", toggleActions: "play none none none" }
    });

    gsap.from(".divImagenes img", {
      x: 50, opacity: 0, duration: 0.8, ease: "power2.out", stagger: 0.18,
      scrollTrigger: { trigger: ".containerComoFunciona", start: "top 78%", toggleActions: "play none none none" }
    });

    // Cards top instalaciones
    gsap.from(".card-instalacion", {
      opacity: 0, y: 30, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".contenedor-top-instalaciones", start: "top 80%", toggleActions: "play none none none" }
    });

    gsap.from(".contenedor-btn-ver-instalaciones", {
      opacity: 0, y: 20, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: ".contenedor-btn-ver-instalaciones", start: "top 90%", toggleActions: "play none none none" }
    });
  }

  // ════════════════════════════════════════════════════════
  // LISTADO INSTALACIONES
  // ════════════════════════════════════════════════════════
  if (esInstalaciones) {

    gsap.fromTo(".instalaciones .title-page",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".instalaciones .description-page",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".filtrado",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.25, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".div-numero-instalaciones",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.35, stagger: 0.1, ease: "power2.out", clearProps: "transform" }
    );

    document.querySelectorAll(".div-numero-instalaciones h1").forEach(el => {
      const target = parseInt(el.textContent.trim());
      if (isNaN(target)) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 1.2, delay: 0.4, ease: "power2.out",
        onUpdate: () => { el.textContent = Math.round(obj.val); }
      });
    });

    gsap.fromTo(".instalaciones-container .card-instalacion",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 0.5, ease: "power2.out", clearProps: "transform" }
    );

    window.animarCardsInstalaciones = () => {
      gsap.fromTo("#contenedor-instalaciones .card-instalacion",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out", clearProps: "transform" }
      );
    };
  }

  // ════════════════════════════════════════════════════════
  // DETALLE INSTALACIÓN
  // ════════════════════════════════════════════════════════
  if (esPaginaInstalacion) {

    gsap.fromTo(".categoriasInstalacion",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".infoInstalacion .title-page",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.1, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".infoInstalacion .description-page",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".info-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".pistasInstalacion .title-page",
      { opacity: 0, x: -25 },
      {
        opacity: 1, x: 0, duration: 0.6, ease: "power2.out", clearProps: "transform",
        scrollTrigger: { trigger: ".pistasInstalacion", start: "top 80%", toggleActions: "play none none none" }
      }
    );

    gsap.fromTo(".container-pistas-instalacion .card-instalacion",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out", clearProps: "transform",
        scrollTrigger: { trigger: ".container-pistas-instalacion", start: "top 82%", toggleActions: "play none none none" }
      }
    );
  }

  // ════════════════════════════════════════════════════════
  // GESTOR INSTALACIONES
  // ════════════════════════════════════════════════════════
  if (esGestorInstalaciones) {

    gsap.fromTo(".title-page",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".description-page",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo("#accordionFiltro",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".divTable",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo("#tablaInstalaciones thead",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.4, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo("#tablaInstalaciones tbody tr",
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, delay: 0.45, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo("#crear",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.6, ease: "power2.out", clearProps: "transform" }
    );

    window.animarFilasGestor = () => {
      gsap.fromTo("#tablaInstalaciones tbody tr",
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, ease: "power2.out", clearProps: "transform" }
      );
    };
  }

  // ════════════════════════════════════════════════════════
  // GESTOR CATEGORÍAS
  // ════════════════════════════════════════════════════════
  if (esGestorCategorias) {

    gsap.fromTo(".pagina-gestor-categorias .title-page",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".pagina-gestor-categorias .description-page",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".pagina-gestor-categorias .divTable",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo("#tabla-categorias thead",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.3, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo("#tabla-categorias tbody tr",
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, delay: 0.35, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".div-btn-gestor-categorias",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.5, ease: "power2.out", clearProps: "transform" }
    );
  }

  // ════════════════════════════════════════════════════════
  // EVENTOS GLOBALES (todas las páginas)
  // ════════════════════════════════════════════════════════
  $(window).on('scroll', function () {
    $('header.headerHome').toggleClass('header-scrolled', $(window).scrollTop() > 5);
  });

  $(document).on('click', '.img-pequena', function () {
    const srcPequena = $(this).attr('src');
    const srcGrande  = $('.img-grande').attr('src');
    $('.img-grande').attr('src', srcPequena);
    $(this).attr('src', srcGrande);
  });


  // ════════════════════════════════════════════════════════
  // GESTOR RESERVAS
  // ════════════════════════════════════════════════════════
  if (esReservas) {

    // Cabecera
    gsap.fromTo(".paginaReservas .title-page",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".paginaReservas .description-page",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out", clearProps: "transform" }
    );

    // Panel de fecha + stats
    gsap.fromTo(".date-selector",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out", clearProps: "transform" }
    );

    // Stat cards: escalonadas
    gsap.fromTo(".stat-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out", clearProps: "transform" }
    );

    // Contadores de las stat cards
    document.querySelectorAll(".stat-number").forEach(el => {
      const target = parseInt(el.textContent.trim());
      if (isNaN(target)) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.2,
        delay: 0.4,
        ease: "power2.out",
        onUpdate: () => { el.textContent = Math.round(obj.val); }
      });
    });

    // Cards de reservas: fadeInUp escalonado
    gsap.fromTo(".card-reserva",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.4, ease: "power2.out", clearProps: "transform" }
    );

    // Animación para cards recargadas al cambiar de fecha (AJAX)
      window.animarCardsReservas = () => {
        gsap.fromTo(".card-reserva",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", clearProps: "transform" }
        );
      };
  }

  // ════════════════════════════════════════════════════════
  // GESTOR USUARIOS
  // ════════════════════════════════════════════════════════
  if (esGestorUsuarios) {

    gsap.fromTo(".pagina-gestor-usuarios .title-page",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".pagina-gestor-usuarios .description-page",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".pagina-gestor-usuarios .row",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".pagina-gestor-usuarios .divTable",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo("#tabla-usuarios thead",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.4, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo("#tabla-usuarios tbody tr",
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, delay: 0.45, ease: "power2.out", clearProps: "transform" }
    );

    // Para reanimar filas tras filtrado AJAX
    window.animarFilasGestorUsuarios = () => {
      gsap.fromTo("#tabla-usuarios tbody tr",
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, ease: "power2.out", clearProps: "transform" }
      );
    };
  }

  // ════════════════════════════════════════════════════════
  // DASHBOARD
  // ════════════════════════════════════════════════════════

  if (esDashboard) {

    // Gráfico de barras
    gsap.fromTo(".grafico-reservas",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", clearProps: "transform" }
    );

    // Gráfico donut
    gsap.fromTo(".grafico-donut",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out", clearProps: "transform" }
    );

    // Tabla reservas por instalaciones
    gsap.fromTo(".tabla-reservas",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".tabla-reservas thead",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.35, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".tabla-reservas tbody tr",
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, delay: 0.4, ease: "power2.out", clearProps: "transform" }
    );

    // Panel actividad reciente
    gsap.fromTo(".tabla-actividad-reciente",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.25, ease: "power2.out", clearProps: "transform" }
    );

    gsap.fromTo(".actividad-reciente",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, delay: 0.45, ease: "power2.out", clearProps: "transform" }
    );
  }

});