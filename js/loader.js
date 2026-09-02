function mostrarLoader(){
  const loader = document.getElementById('ajax-loader-overlay');

  // Siempre al final de <body>, gane quien gane en el DOM
  if (document.body.lastElementChild !== loader) {
    document.body.appendChild(loader);
  }

  // Z-index dinámico: siempre por encima del modal/backdrop/offcanvas más alto abierto
  let maxZ = 9999;
  document.querySelectorAll('.modal.show, .modal-backdrop, .offcanvas.show, .offcanvas-backdrop').forEach(el => {
    const z = parseInt(window.getComputedStyle(el).zIndex, 10);
    if (!isNaN(z) && z >= maxZ) maxZ = z + 10;
  });
  loader.style.zIndex = maxZ;

  loader.classList.add('active');
}

function ocultarLoader(){
  document.getElementById('ajax-loader-overlay').classList.remove('active');
}

// Se activa/desactiva automáticamente con cualquier petición $.ajax, $.get, $.post
$(document).ajaxStart(mostrarLoader).ajaxStop(ocultarLoader);