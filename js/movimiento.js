$(document).ready(() => {
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

      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".content .comoFunciona", {
        x: "-100%",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".content .comoFunciona",
          start: "top 80%", // Empieza la animación cuando el top del elemento esté al 80% de la ventana
          toggleActions: "play none none none"
        }
      });
      
      gsap.from(".content .divImagenes", {
        x: "100%",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".content .divImagenes",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      

      $(window).on('scroll', function () {
        if ($(window).scrollTop() > 5) {
          $('header').addClass('header-scrolled');
        } else {
          $('header').removeClass('header-scrolled');
        }
        
      });
})