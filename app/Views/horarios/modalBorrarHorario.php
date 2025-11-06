<div class="modal" tabindex="-1" id="modalBorrarHorario">
  <input type="hidden" name="idHorarioBorrar" id="idHorarioBorrar" value="">
  <input type="hidden" name="idInstalacionBorrar" id="idInstalacionBorrar" value="">
  <div class="d-flex p-4 pb-0 justify-content-center alertModal" id="errores-editar-horario">

  </div>

  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Borrar Horario: <span id="nombre-horario-borrar"></span> <i class="bi bi-pencil-square"></i></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>


      <div style="position: relative; min-height: 70px;" class="contenedor-loader">
        <div id="loaderModalBorrar" class="loader" style="display: none;"></div>
        <div class="modal-body">
          <div class="pregunta-borrado">
            <h2>¿Estás seguro de que deseas borrar el horario: <span id="nombre-horario-borrar2"></span>?</h2>
            <p>Esta acción no se puede deshacer.</p>
          </div>
          <div class="btns-borrado">
            <button class="btn-primary-personal" id="aceptarBorrarHorario">Borrar Horario</button>
            <button class="btn-secondary-personal" id="cancelarBorrarHorario" data-bs-dismiss="modal" aria-label="Cancelar">Cancelar</button>
          </div>
        </div>
        <!-- Cierre -->
      </div>
    </div>
  </div>
</div>