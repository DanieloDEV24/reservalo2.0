<div class="modal" tabindex="-1" id="modalHorarioExistente" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
  <input type="hidden" name="" id="" value="">
  <input type="hidden" name="" id="" value="">
  <div class="d-flex p-4 pb-0 justify-content-center alertModal" id="errores-editar-horario">

  </div>

  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">No se ha podido crear el Horario &nbsp;<i class="bi bi-x-lg"></i></h5>
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
              <p style="font-weight: 700;" class="p-existen-horarios">Ya existen horarios en las fechas seleccionadas:</p>
              <div class="nombres-horarios-existentes">
                <ul></ul>
              </div>
            </div>
          </div>
          <div>
            <p style="text-align: center; color: #aaa; font-size: 1.1rem;">Al menos que el horario sea especial, no se puede crear un horario encima de otras fechas</p>
          </div>
          <div class="btns-borrado" style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
            <button class="btn-secondary-personal" data-bs-dismiss="modal" aria-label="Cancelar">Cancelar</button>
          </div>
        </div>
        <!-- Cierre -->
      </div>
    </div>
  </div>
</div>