<div class="modal fade modal-stack-2" tabindex="-1" id="modalEliminarReservaActividadUsuario" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="">
    <input type="hidden" id="id-reserva-eliminar" name="id-reserva-eliminar" value="">

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
        <div class="modal-content">
            <!-- Header -->
            <div class="modal-header border-bottom">
                <h5 class="modal-title"><i class="bi bi-plus-circle"></i> Eliminar reserva <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="">
               <div class="row">
                    <div class="col-12">
                        <p style="text-align: center; font-size: 1.1rem;">¿Estás seguro de que deseas eliminar la siguiente reserva?. Esta acción no se puede deshacer.</p>
                    </div>

                    <div class="col-12">

                        <div class="datos-reservas-eliminar">
                            <div class="row">
                                <div class="col-6"><strong>Actividad</strong></div>
                                <div class="col-6"><span id="nombre-actividad-eliminar-reserva-usuario"></span></div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-6"><strong>Fecha de la actividad</strong></div>
                                <div class="col-6"><span id="fecha-eliminar-reserva-usuario"></span></div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-6"><strong>Hora de la actividad</strong>

                            </div>
                                <div class="col-6"><span id="hora-eliminar-reserva-usuario"></span></div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-6"><strong>Plazas reservadas</strong></div>
                                <div class="col-6"><span id="plazas-eliminar-reserva-usuario"></span></div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-6"><strong>Precio de la reserva</strong></div>
                                <div class="col-6"><span id="precio-eliminar-reserva-usuario"></span></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-3">
                        <div class="div-avio-email">
                            <i class="bi bi-info-circle"></i>
                            <p>La plaza quedara libre para otras personas usuarias y se enviara un aviso por correo electrónico.</p>
                        </div>
                    </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar <i class="bi bi-x-lg"></i>
                </button>

                <button type="button" class="btn btn-danger" id="btn-guardar-eliminar-reserva-actividad-usuario">
                    Eliminar <i class="bi bi-check-lg"></i>
                </button>
            </div>

        </div>
    </div>
</div>