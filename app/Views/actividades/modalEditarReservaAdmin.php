<div class="modal fade modal-stack-2" tabindex="-1" id="modalEditarReservaAdmin" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="" data-pedido="" data-actividad="">

    <div class="d-flex justify-content-center p-3 pb-0 d-none contenedor-alert-crear-persona-editar-actividad">
        <div class="alert alert-danger alert-dismissible mb-0 fade show alert-crear-persona-editar-actividad w-50" role="alert">

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
                <h5 class="modal-title"><i class="bi bi-eye"></i> Editar reserva: <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="" > 
                <div class="informacion-reserva">
                    <div class="d-flex justify-content-between align-items-center">
                        <h3></h3>
                        <p class="contador-plazas">Num de plazas de la reserva: <span class="plazas-reserva"></span><span class="plazas-libres"></span> </p>
                    </div>
                    <p class="descripcion"></p>
                    <p class="fecha-actividad"></p>
                </div>

                <div class="personas-editar-reserva">

                </div>

                <button class="btn btn-primary crear-persona-editar-reserva-actividad mt-3"><i class="bi bi-plus"></i> Añadir persona</button>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar <i class="bi bi-x-lg"></i>
                </button>

                <button type="button" class="btn btn-primary" id="btn-guardar-cambios-reserva-actividad-admin">
                    Guardar <i class="bi bi-check-lg"></i>
                </button>
            </div>

        </div>
    </div>
</div>