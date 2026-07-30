<div class="modal fade modal-stack-2" tabindex="-1" id="modalCrearTipoActividad" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="">

    <div class="d-flex justify-content-center p-3 pb-0 d-none contenedor-alert-nuevo-tipo-actividad">
        <div class="alert alert-danger alert-dismissible mb-0 fade show alert-errores-nuevo-tipo-actividad w-50" role="alert">

            <div class="errores">
                <ul>
                    
                </ul>
            </div>

        </div>

    </div>

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
        <div class="modal-content">
            <!-- Header -->
            <div class="modal-header border-bottom">
                <h5 class="modal-title"><i class="bi bi-plus-circle"></i> Crear Categoría <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="">
               <div class="row">
                    <div class="col-12">
                        <label for="nombre-tipo-actividad-crear">Nombre: <span class="campo-obligatorio">*</span></label>
                        <input type="text" id="nombre-tipo-actividad-crear" name="nombre-tipo-actividad-crear" class="form-control">
                    </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar <i class="bi bi-x-lg"></i>
                </button>

                <button type="button" class="btn btn-primary" id="btn-guardar-crear-tipo-actividad">
                    Crear <i class="bi bi-check-lg"></i>
                </button>
            </div>

        </div>
    </div>
</div>