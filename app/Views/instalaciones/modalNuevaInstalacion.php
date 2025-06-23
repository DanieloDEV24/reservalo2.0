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