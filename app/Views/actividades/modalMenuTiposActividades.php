<div class="modal fade modal-stack" tabindex="-1" id="modalMenuTiposActividades" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="">

    <div class="d-flex justify-content-center p-3 pb-0 d-none contenedor-alert-menu-tipo-actividad">
        <div class="alert alert-danger alert-dismissible mb-0 fade show alert-errores-menu-tipo-actividad w-50" role="alert">

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
                <h5 class="modal-title"><i class="bi bi-plus-circle"></i> Menú Categorías <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="">
              <table class="table table-hover" id="tabla-categorias" style="vertical-align: middle;"> 
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
               </table>

               <p style="font-size: 0.8rem; color: #6c757d;">
                    <i class="bi bi-info-circle"></i>
                    Las categorías que están siendo usadas en actividades, no pueden ser eliminadas. Por ello no funcionará el botón de eliminar para esas categorías.
                </p>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar <i class="bi bi-x-lg"></i>
                </button>

                <button type="button" class="btn btn-primary btn-modal-crear-tipo-actividad">
                    Crear categoría <i class="bi bi-check-lg"></i>
                </button>
            </div>

        </div>
    </div>
</div>