<div class="modal" tabindex="-1" id="modalBorrarInstalacion">

  <div class="d-flex p-4 pb-0 justify-content-center alertModal">

  </div>

  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">¿Está seguro/a de que quiere borrar la instalación: <span></span> ? <i class="bi bi-pencil-square"></i></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <div class="row gap-5">
          <div class="col">
            <label for="nombreInstalacionBorrar">Nombre:</label>
            <input type="text" id="nombreInstalacionBorrar" name="nombreInstalacionBorrar" class="form-control">
          </div>

          <div class="col">
            <label for="categoriasBorrar">Categoria:</label>
            <input type="text" id="categoriasBorrar" name="categoriasBorrar" class="form-control">
          </div>
        </div>

        <div class="row gap-3 mt-3">
          <div class="col">
            <label for="categoriaSecundariaBorrar">Categoría opcional: </label>
            <input type="text" id="categoriaSecundariaBorrar" name="categoriaSecundariaBorrar" class="form-control">
          </div>
        </div>

        <div class="row gap-5">
          <div class="col d-flex align-items-center gap-2 mt-3">
            <label for="">La instalacion no tiene pistas, zonas...; es solo completa</label>
            <label class="toggle-switch">
              <input type="checkbox" class="noPistas" id="noPistasBorrar">
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
            </label>
          </div>
        </div>

        <div class="row gap-5 align-items-center mt-3">
          <div class="col d-flex align-items-center gap-2">
            <label for="">¿Puede hacer reserva completa?</label>
            <label class="toggle-switch">
              <input type="checkbox" class="puedeCompleto" id="puedeCompletoBorrar">
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
            </label>
          </div>
        </div>

        <div class="row gap-5 mt-3">
          <div class="col">
            <label for="capacidadCompletoBorrar">Capacidad completo:</label>
            <input type="number" id="capacidadCompletoBorrar" name="capacidadCompletoBorrar" class="form-control">
          </div>

          <div class="col">
            <label for="precioCompletoBorrar">Precio completo:</label>
            <input type="number" id="precioCompletoBorrar" name="precioCompletoBorrar" class="form-control">
          </div>
        </div>

        <div class="row mt-3 pl-3 pr-3">
          <div class="col">
            <label for="">Escriba una descripcion</label>
            <textarea name="descripcionBorrar" id="descripcionBorrar" class="mr-3 ml-3 form-control"></textarea>
          </div>
        </div>
        <!-- Acordeones -->
        <div class="accordion mt-3" id="accordionBorrarPistas">
          <!-- aquí se generan tus acordeones -->
        </div>
      </div>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Cancelar <i class="bi bi-x-lg"></i>
        </button>
        <button type="submit" class="btn btn-primary" id="aceptarBorrarInstalacion">
          Borrar Instalación <i class="bi bi-check-lg"></i>
        </button>
      </div>
    </div>
  </div>
</div>

