<div class="modal" tabindex="-1" id="modalBorrarHorario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
  <input type="hidden" name="idHorarioBorrar" id="idHorarioBorrar" value="">
  <input type="hidden" name="idInstalacionBorrar" id="idInstalacionBorrar" value="">
  <div class="d-flex p-4 pb-0 justify-content-center alertModal" id="errores-editar-horario">

  </div>

  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Borrar Horario <i class="bi bi-trash3"></i></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>


      <div style="position: relative; min-height: 70px;" class="contenedor-loader">
        <div id="loaderModalBorrar" class="loader" style="display: none;"></div>
        <div class="modal-body">
          <div class="iconoModal">
            <div>
              <i class="bi bi-exclamation-triangle"></i>
            </div>
          </div>

          <div class="contenedor-a-borrar">
            <div class="horario-a-borrar">
              <p>Horario a borrar: </p>
              <span id="nombre-horario-borrar"></span>
            </div>
          </div>

          <div class="pregunta-borrado" style="text-align: center;">
            <p style="font-size: 1.3rem;">¿Estás seguro de que deseas este horario?</p>
            <p style="font-size: 0.9rem;">Se borrarán también las excepciones asociadas.</p>
            <p style="color: #aaa; font-size: 1.1rem;">Esta acción no se puede deshacer.</p>
          </div>

          <div class="btns-borrado" style="display: flex; justify-content: center; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
            <button class="btn-primary-personal" id="aceptarBorrarHorario"> Borrar horario</button>
            <button class="btn-secondary-personal" id="cancelarBorrarHorario" data-bs-dismiss="modal" aria-label="Cancelar">Cancelar</button>
          </div>
        </div>
        <!-- Cierre -->
      </div>
    </div>
  </div>
</div>