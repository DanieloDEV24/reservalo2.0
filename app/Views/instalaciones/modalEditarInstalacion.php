<div class="modal" tabindex="-1" id="modalEditarInstalacion">

  <div class="d-flex p-4 pb-0 justify-content-center alertModal">

  </div>

  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editar Instalación <i class="bi bi-pencil-square"></i></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <div class="row gap-5">
          <div class="col">
            <label for="nombreInstalacionEditar">Nombre: <span class="campo-obligatorio">*</span></label>
            <input type="text" id="nombreInstalacionEditar" name="nombreInstalacionEditar" class="form-control">
          </div>

          <div class="col">
            <label for="categoriasEditar">Categoria: <span class="campo-obligatorio">*</span></label>
            <!-- Aquí debo meter lógica de programación -->
            <select name="categoriasEditar" id="categoriasEditar" class="form-select">
              <?php foreach ($categorias as $categoria): ?>
                <option value="<?= $categoria["id_categoria"] ?>"><?= $categoria["nombre"] ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>

        <div class="row gap-3 mt-3">
          <!-- Aquí debo meter lógica de programación -->
          <label for="">Seleccione una categoría secundaria (primero debe seleccionar una categoria principal)</label>
          <div class="radio-input" id="subcategoriasEditar">
            <!-- Aquí se insertarán los radios dinámicamente -->

          </div>
        </div>

        <div class="row gap-5">
          <div class="col d-flex align-items-center gap-2 mt-3">
            <label for="">Tiene iluminación</label>
            <label class="toggle-switch">
              <input type="checkbox" id="iluminacionEditar">
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
            </label>
          </div>
        </div>

        
        <div class="row gap-5">
          <div class="col d-flex align-items-center gap-2 mt-3">
            <label for="">Se puede prestar material</label>
            <label class="toggle-switch">
              <input type="checkbox" id="materialEditar">
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
            </label>
          </div>
        </div>


        <div class="row gap-5">
          <div class="col d-flex align-items-center gap-2 mt-3">
            <label for="">La instalacion no tiene pistas, zonas...; es solo completa</label>
            <label class="toggle-switch">
              <input type="checkbox" class="noPistas" id="noPistasEditar">
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
              <input type="checkbox" class="puedeCompleto" id="puedeCompletoEditar">
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
            </label>
          </div>
        </div>


        <div class="row gap-5 align-items-center mt-3">
          <div class="col d-flex align-items-center gap-2">
           <label for="">Reserva por día completo (no hay horarios)</label>
            <label class="toggle-switch">
              <input type="checkbox" class="sinHorario" id="sinHorarioEditar">
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
            </label>
          </div>
        </div>


        <div class="row gap-5 mt-3">
          <div class="col">
            <label for="capacidadCompletoEditar">Capacidad completo:</label>
            <input type="number" id="capacidadCompletoEditar" name="capacidadCompletoEditar" class="form-control">
          </div>

          <div class="col">
            <label for="precioCompletoEditar">Precio completo:</label>
            <input type="number" id="precioCompletoEditar" name="precioCompletoEditar" class="form-control">
          </div>
        </div>

        <div class="row mt-3 pl-3 pr-3">
          <div class="col">
            <label for="">Escriba una descripcion <span class="campo-obligatorio">*</span></label>
            <textarea name="descripcionEditar" id="descripcionEditar" class="mr-3 ml-3"></textarea>
          </div>
        </div>

        <div style="position: relative; min-height: 70px;" class="contenedor-loader">
          <!-- Tu loader -->
          <div id="loader" class="loader" style="display: none;"></div>

          <!-- Acordeones -->
          <div class="accordion mt-3" id="accordionEditarPistas">
            <!-- aquí se generan tus acordeones -->
          </div>
        </div>

        <!-- Meterle logica de programación -->
        <!-- <div class="accordion-item" data-index="1">
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
  </div> -->
      </div>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Cerrar <i class="bi bi-x-lg"></i>
        </button>
        <button type="submit" class="btn btn-primary" id="guardarInstalacionEditar">
          Guardar <i class="bi bi-check-lg"></i>
        </button>
      </div>
    </div>
  </div>
</div>

