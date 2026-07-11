<div class="modal fade modal-stack-2" tabindex="-1" id="modalEliminarTipoActividad" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="">
    <input type="hidden" id="id-tipo-actividad-eliminar" name="id-tipo-actividad-eliminar" value="">
    <div class="d-flex justify-content-center p-3 pb-0 d-none contenedor-alert-eliminar-tipo-actividad">
        <div class="alert alert-danger alert-dismissible mb-0 fade show alert-errores-eliminar-tipo-actividad w-50" role="alert">

            <div class="errores">
                <ul>
                    
                </ul>
            </div>

        </div>

    </div>

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <!-- Header -->
            <div class="modal-header border-bottom">
                <h5 class="modal-title"><i class="bi bi-plus-circle"></i> Eliminar Categoría <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="">
               <div class="row">
                    <div class="col-12">
                        <p style="text-align: center; font-size: 1.1rem;">¿Estás seguro de que deseas eliminar la categoría <strong><span id="nombre-tipo-actividad-eliminar"></span></strong>? Esta acción no se puede deshacer.</p>
                        <p style="text-align: center; font-size: .9rem">Si la categoría tiene actividades asociadas, no se podrá eliminar.</p>
                    </div>

              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar <i class="bi bi-x-lg"></i>
                </button>

                <button type="button" class="btn btn-danger" id="btn-guardar-eliminar-tipo-actividad">
                    Eliminar <i class="bi bi-check-lg"></i>
                </button>
            </div>

        </div>
    </div>
</div>