function mostrarLoader(){
  document.getElementById('ajax-loader-overlay').classList.add('active');
}
 
function ocultarLoader(){
  document.getElementById('ajax-loader-overlay').classList.remove('active');
}
 
// Se activa/desactiva automáticamente con cualquier petición $.ajax, $.get, $.post
$(document).ajaxStart(mostrarLoader).ajaxStop(ocultarLoader);
 