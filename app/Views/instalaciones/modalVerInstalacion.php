<script>
    const base_url = "<?= base_url() ?>";
    
</script>

<div class="modal " tabindex="-1" id="modalVerInstalacion">

    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="">Ver Instalación <i class="bi bi-eye"></i></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="imagenVerInstalacion"></div>
            <div class="modal-body">

                <h1 id="nombreVerInstalacion"></h1>
                <div id="categoriasVerInstalacion">
                    <span id="categoriaPrincipalVerInstalacion"></span>
                    <span id="categoriaSecundariaVerInstalacion"></span>
                </div>
                <p id="descripcionVerInstalacion"></p>

                <div class="row gap-5">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <label for="">Capacidad Completo: </label>
                            </div>
                            <div class="col">
                                <p id="capacidadCompletaVerInstalacion"></p>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <label for="">Precio Completo: </label>
                            </div>
                            <div class="col">
                                <p id="precioCompletoVerInstalacion"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>Pistas.</h2>
                <div class="accordion mt-3" id="accordionPistas">
                    <!-- Aquí se insertarán las pistas dinámicamente -->
                    
                </div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar <i class="bi bi-x-lg"></i>
                </button>
            </div>
        </div>
    </div>
</div>