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
            <input type="text" id="nombreInstalacion" name="nombreInstalacion" class="form-control" placeholder="Ej: Pistas de padel">
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

        <div class="row gap-3 mt-3">
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

        <div class="accordion mt-3" id="accordionExample">
  <div class="accordion-item" data-index="1">
    <h2 class="accordion-header">
      <button class="accordion-button nuevaPista collapsed d-flex justify-content-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        <div>Añadir Pista&nbsp;<i class="bi bi-plus-circle"></i></div>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div class="row gap-5">
          <div class="col">
            <label>Nombre:</label>
            <input type="text" name="nombrePista" class="form-control nombrePista" placeholder="Ej: Pista de padel nº 1">
          </div>
        </div>

        <div class="row gap-5 mt-3">
          <div class="col">
            <label>Capacidad de la Pista:</label>
            <input type="text" name="capacidadPista" class="form-control capacidadPista" placeholder="Ej: 4">
          </div>

          <div class="col">
            <label>Precio de la Pista:</label>
            <input type="text" name="precioPista" class="form-control precioPista" placeholder="Ej: 21">
          </div>
        </div>

        <div class="d-flex justify-content-start mt-4">
          <div class="w-50">
            Selecciona las imágenes de la pista (máx 4)
            <label class="btn btn-primary mt-1">
              Imagenes
              <input class="imagenes" type="file" name="imagenes[]" multiple accept="image/*" hidden>
            </label>
          </div>
        </div>

        <div class="d-flex gap-2 mt-3 justify-content-end botonesPista">
          <button class="btn btn-primary guardarPista">Guardar <i class="bi bi-check-lg"></i></button>
        </div>

      </div>
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