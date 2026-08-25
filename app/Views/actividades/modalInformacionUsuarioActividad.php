<div class="modal fade modal-stack-2" tabindex="-1" id="modalInformacionUsuarioActividad" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="">

    <div class="d-flex justify-content-center p-3 pb-0 d-none contenedor-alert-informacion-usuario-actividad">
        <div class="alert alert-danger alert-dismissible mb-0 fade show alert-errores-informacion-usuario-actividad w-50" role="alert">

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
                <h5 class="modal-title"><i class="bi bi-person-check-fill"></i> Información que debe añadir el usuario.</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="">
                <p>Marque los campos que deba rellenar el usuario para la reserva de la actividad</p>
                <div class="row">
                    <div class="col-6">
                        <div class="row">
                            <div class="col-12 d-flex align-items-center gap-2 mt-3">
                                <label for="nombre-usuario">Nombre</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" class="nombre-usuario" name="nombre-usuario" id="nombre-usuario">
                                    <div class="toggle-switch-background">
                                        <div class="toggle-switch-handle"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="row">
                            <div class="col-12 d-flex align-items-center gap-2 mt-3">
                                <label for="apellidos-usuario">Apellidos</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" class="apellidos-usuario" name="apellidos-usuario" id="apellidos-usuario">
                                    <div class="toggle-switch-background">
                                        <div class="toggle-switch-handle"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 d-flex align-items-center gap-5 mt-3">
                        <div class="row">
                            <div class="col-12 d-flex align-items-center gap-2">
                                <label for="fecha-nacimiento-usuario">Fecha de nacimiento</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" class="fecha-nacimiento-usuario" name="fecha-nacimiento-usuario" id="fecha-nacimiento-usuario">
                                    <div class="toggle-switch-background">
                                        <div class="toggle-switch-handle"></div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 d-flex align-items-center gap-2">
                                <label for="edad-min-usuario" style="color: #ccc;">Edad Min.</label>
                                <input type="number" name="edad-min-usuario" id="edad-min-usuario" style="width: 25%; border-radius: .3rem; border: 1px solid #ccc; padding: .2rem .5rem" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="row">
                            <div class="col-12 d-flex align-items-center gap-2 mt-3">
                                <label for="dni-nie-usuario">DNI/NIE</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" class="dni-nie-usuario" name="dni-nie-usuario" id="dni-nie-usuario">
                                    <div class="toggle-switch-background">
                                        <div class="toggle-switch-handle"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-6">
                        <div class="row">
                            <div class="col-12 d-flex align-items-center gap-2 mt-3">
                                <label for="email-usuario">Email</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" class="email-usuario" name="email-usuario" id="email-usuario">
                                    <div class="toggle-switch-background">
                                        <div class="toggle-switch-handle"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="row">
                            <div class="col-12 d-flex align-items-center gap-2 mt-3">
                                <label for="telefono-usuario">Teléfono</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" class="telefono-usuario" name="telefono-usuario" id="telefono-usuario">
                                    <div class="toggle-switch-background">
                                        <div class="toggle-switch-handle"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-6">
                        <div class="row">
                            <div class="col-12 d-flex align-items-center gap-2 mt-3">
                                <label for="direccion-usuario">Dirección</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" class="direccion-usuario" name="direccion-usuario" id="direccion-usuario">
                                    <div class="toggle-switch-background">
                                        <div class="toggle-switch-handle"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary btn-cancelar-informacion-usuario" data-bs-dismiss="modal">
                    Cancelar <i class="bi bi-x-lg"></i>
                </button>

                <button type="button" class="btn btn-primary" id="btn-guardar-informacion-necesita-usuario">
                    Guardar información <i class="bi bi-check-lg"></i>
                </button>
            </div>

        </div>
    </div>
</div>