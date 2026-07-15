<div class="modal fade modal-stack-2" tabindex="-1" id="modalCancelarActividad" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="">

    <input type="hidden" id="id-actividad" value="">

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <!-- Header -->
            <div class="modal-header border-bottom">
                <h5 class="modal-title"><i class="bi bi-exclamation-triangle"></i> Cancelar Actividad <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="">
               <div class="row">
                    <div class="col-12">
                        <p>Esta acción cancelará la actividad para todos los inscritos. Al estar cancelada nadie podrá acceder a ella. Se notificará por email a los participantes registrados.</p>

                        <div class="informacion-actividad">
                            <div class="row">
                                <div class="col-12">
                                    <p class="text-muted small mb-0"></i>Actividad</p>
                                    <p class="fw-semibold mb-0" id="baja-nombre"></p>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-4">
                                    <p class="text-muted small mb-0"></i>Fecha</p>
                                    <p class="fw-semibold mb-0" id="baja-fecha"></p>
                                </div>

                                <div class="col-4">
                                    <p class="text-muted small mb-0"></i>Salida</p>
                                    <p class="fw-semibold mb-0" id="baja-salida"></p>
                                </div>

                                <div class="col-4">
                                    <p class="text-muted small mb-0"></i>Duración</p>
                                    <p class="fw-semibold mb-0" id="baja-duracion"></p>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-4">
                                    <p class="text-muted small mb-0"></i>Lugar</p>
                                    <p class="fw-semibold mb-0" id="baja-lugar"></p>
                                </div>

                                <div class="col-4">
                                    <p class="text-muted small mb-0"></i>Inscritos</p>
                                    <p class="fw-semibold mb-0" id="baja-inscritos"></p>
                                </div>
                            </div>

                            <hr>

                            <div class="row">
                                <div class="col-12">
                                    <p id="precio-datos-inscripcion"></p>
                                </div>
                            </div>

                            <div class="email-inscritos">
                                <i class="bi bi-exclamation-circle"></i>
                                <p>Las personas inscritas recibirán un email de cancelación.</p>
                            </div>
                        </div>
                    </div>
               </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar <i class="bi bi-x-lg"></i>
                </button>

                <button type="button" class="btn btn-danger" id="btn-guardar-cancelar-actividad">
                    Dar de baja <i class="bi bi-trash3"></i>
                </button>
            </div>

        </div>
    </div>
</div>