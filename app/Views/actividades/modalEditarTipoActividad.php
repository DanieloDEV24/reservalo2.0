<div class="modal fade modal-stack-2" tabindex="-1" id="modalEditarTipoActividad" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="">
    <input type="hidden" id="id-tipo-actividad-editar" name="id-tipo-actividad-editar" value="">
    <div class="d-flex justify-content-center p-3 pb-0 d-none contenedor-alert-editar-tipo-actividad">
        <div class="alert alert-danger alert-dismissible mb-0 fade show alert-errores-editar-tipo-actividad w-50" role="alert">

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
                <h5 class="modal-title"><i class="bi bi-plus-circle"></i> Editar Categoría <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="">
               <div class="row">
                    <div class="col-12">
                        <label for="nombre-tipo-actividad-editar">Nombre: <span class="campo-obligatorio">*</span></label>
                        <input type="text" id="nombre-tipo-actividad-editar" name="nombre-tipo-actividad-editar" class="form-control">
                    </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar <i class="bi bi-x-lg"></i>
                </button>

                <button type="button" class="btn btn-primary" id="btn-guardar-editar-tipo-actividad">
                    Editar <i class="bi bi-check-lg"></i>
                </button>
            </div>

        </div>
    </div>
</div>