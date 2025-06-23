<div class="modal" tabindex="-1" id="modalNuevaInstalacion">

  <div class="d-flex p-4 pb-0 justify-content-center alertModal">

  </div>

  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear Instalación <i class="bi bi-plus-circle"></i></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <div class="row gap-5">
          <div class="col">
            <label for="nombreInstalacion">Nombre:</label>
            <input type="text" id="nombreInstalacion" name="nombreInstalacion" class="form-control" placeholder="Ej: Pista de padel">
          </div>

          <div class="col">
            <label for="categorias">Categoria:</label>
            <select name="categorias" id="categorias" class="form-select">
              <option value="-1" selected>Seleccione una categoria</option>
              <?php foreach ($categorias as $categoria): ?>
                <option value="<?= $categoria["id_categoria"] ?>"><?= $categoria["nombre"] ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>

        <div class="row gap-5 mt-3">
          <label for="">Seleccione una categoría secundaria (primero debe seleccionar una categoria principal)</label>
          <div class="radio-input" id="subcategorias">
            <!-- Aquí se insertarán los radios dinámicamente -->
          </div>
        </div>
        <div class="row gap-5 align-items-center">
          <div class="col d-flex align-items-center gap-2">
            <label for="">¿Puede hacer reserva completa?</label>
            <label class="toggle-switch">
              <input type="checkbox">
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
            </label>
          </div>

          <div class="col">
            <label for="precioCompleto">Precio completo:</label>
            <input type="number" id="precioCompleto" name="precioCompleto" class="form-control" readonly style="color: #ccc" value="0.0">
          </div>
      </div>

      <div class="row mt-3 pl-3 pr-3">
        <div class="col">
          <label for="">Escriba una descripcion</label>
        <textarea name="descripcion" id="descripcion" class="mr-3 ml-3"></textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Cerrar <i class="bi bi-x-lg"></i>
        </button>
        <button type="submit" class="btn btn-primary" id="guardarInstalacion">
          Guardar <i class="bi bi-check-lg"></i>
        </button>
      </div>
    </div>
  </div>
</div>