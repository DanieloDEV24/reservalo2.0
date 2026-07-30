<div class="modal fade" tabindex="-1" id="modalBorrarCategoria" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="">  

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
        <div class="modal-content">
            <!-- Header -->
            <div class="modal-header border-bottom">
                <h5 class="modal-title"><i class="bi bi-trash3"></i> Borrar categoría <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%; text-align: center;" data-index="">
               <h4>¿Está seguro de que desea borrar la categoria <span id="nombre-categoria-borrar" style="font-weight: bold;"></span>?</h4>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Cancelar <i class="bi bi-x-lg"></i>
                    </button>

                <button type="button" class="btn btn-danger" id="btn-confirmar-borrar-categoria">
                    Borrar <i class="bi bi-trash3"></i>
                </button>
            </div>

        </div>
    </div>
</div>