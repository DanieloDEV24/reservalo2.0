<div class="modal" tabindex="-1" id="modalEditarHorario">
  <input type="hidden" name="idHorarioEditar" id="idHorarioEditar" value="">
  <input type="hidden" name="idInstalacion" id="idInstalacion" value="">
  <div class="d-flex p-4 pb-0 justify-content-center alertModal" id="errores-editar-horario">

  </div>

  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editar Horario: <span id="nombre-horario"></span> <i class="bi bi-pencil-square"></i></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>


      <div style="position: relative; min-height: 70px;" class="contenedor-loader">
        <div id="loaderModalEditar" class="loader" style="display: none;"></div>
        <div class="modal-body">
          <div class="row" style="margin-top: 2%;">
            <div class="col">
              <label for="nombreHorarioEditar">Nombre: <span class="campo-obligatorio">*</span></label>
              <input type="text" id="nombreHorarioEditar" name="nombreHorarioEditar" class="form-control">
            </div>
          </div>


          <div class="row" style="margin-top: 2%;">
            <div class="col">
              <label for="descripcionHorarioEditar">Descripción del horario: <span class="campo-obligatorio">*</span></label>
              <textarea type="text" id="descripcionHorarioEditar" name="descripcionHorarioEditar" class="form-control"></textarea>
            </div>
          </div>


          <div class="row" style="margin-top: 2%;">
            <div class="col-6">
              <label for="fechaIincioHorarioEditar">Fecha de inicio: <span class="campo-obligatorio">*</span></label>
              <input type="date" id="fechaIincioHorarioEditar" name="fechaIincioHorarioEditar" class="form-control">
            </div>

            <div class="col-6">
              <label for="fechaFinHorarioEditar">Fecha de fin: <span class="campo-obligatorio">*</span></label>
              <input type="date" id="fechaFinHorarioEditar" name="fechaFinHorarioEditar" class="form-control">
            </div>
          </div>

          <div class="row" style="margin-top: 2%;">
            <div class="col">
              <div class="checkbox-wrapper-4 horarioDistintoEditar">
                <input class="inp-cbx" id="horarioDistintoEditar" type="checkbox">
                <label class="cbx" for="horarioDistintoEditar"><span>
                    <svg width="20px" height="20px">

                    </svg></span><span>Establecer un horario distinto para cada día</span></label>
                <svg class="inline-svg">
                  <symbol id="check-4" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>
            </div>
          </div>


          <div id="contenedor-input-horas-editar"></div>
          <div class="row">
            <div class="color-picker-section col">
              <div class="color-picker-wrapper">
                <span class="color-picker-label">Seleccione el color del horario</span>
                <input type="color" id="scheduleColorEditar" value="#000">
                <span class="color-value" id="colorValueEditar">#000000</span>
              </div>
            </div>
          </div>

          <div class="row">
                    <div style="display: flex; align-items: start; justify-content: start; gap: 2%; margin-bottom: 3%;">
        <div class="checkbox-wrapper-4 masInstalacionesEditar">
          <input class="inp-cbx" id="masInstalacionesEditar" type="checkbox">
          <label class="cbx" for="masInstalacionesEditar">
            <span><svg width="20px" height="20px"></svg></span>
            <span>Modificar este horario en las otras instalaciones que lo tiene.</span>
          </label>
          <svg class="inline-svg">
            <symbol id="check-4" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </symbol>
          </svg>
        </div>
        <div id="loaderInstalacionesEditar" class="loader2" style="display: none;"></div>
        </div>
        <div class="contenedor-instalaciones">

        </div>
          </div>
        </div>
        <!-- Cierre -->
      </div>


      <div class="modal-footer">
        <button type="button" class="btn-secondary-personal" data-bs-dismiss="modal">
          Cerrar <i class="bi bi-x-lg"></i>
        </button>
        <button type="submit" class="btn-primary-personal" id="btnGurdarHorarioEditar">
          Guardar <i class="bi bi-check-lg"></i>
        </button>
      </div>

    </div>
  </div>
</div>