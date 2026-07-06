<div class="modal" tabindex="-1" id="modalSinFechaHorario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
  <input type="hidden" name="" id="" value="">
  <input type="hidden" name="" id="" value="">

  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">No se puede cambiar este horario &nbsp;<i class="bi bi-x-lg"></i></h5>
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
              <p style="font-weight: 700;" class="p-existen-horarios">Al ser un horario especial con fecha definida, no se puede seleccionar. Solo se podría editar o eliminar el horario</p>
            </div>
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