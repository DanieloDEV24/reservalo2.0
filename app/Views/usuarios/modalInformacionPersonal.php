<div class="modal fade" tabindex="-1" id="modalInformacionPersonal" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-usuario="">  

    <div class="d-flex justify-content-center p-3 pb-0 d-none contenedor-alert-editar-usuario">
        <div class="alert alert-danger alert-dismissible mb-0 fade show alert-errores-editar-usuario w-50" role="alert">

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
                <h5 class="modal-title"><i class="bi bi-person-fill"></i> Informacion del usuario <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="">
                <div class="datos-usuario-editar">
                    <div class="logo-usuario"></div>

                    <div class="info-usuario">
                        <p class="nombre-usuario"></p>
                        <p class="registro-ultm-acceso"></p>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-6">
                        <label for="nombre-usuario-personal">Nombre: <span class="campo-obligatorio">*</span></label>
                        <input type="text" id="nombre-usuario-personal" name="nombre-usuario-personal" class="form-control">
                    </div>
                    <div class="col-6">
                        <label for="telf-usuario-personal">Telf: <span class="campo-obligatorio">*</span></label>
                        <input type="number" id="telf-usuario-personal" name="telf-usuario-personal" class="form-control">
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-12">
                        <label for="email-usuario-personal">Email: <span class="campo-obligatorio">*</span></label>
                        <input type="email" id="email-usuario-personal" name="email-usuario-personal" class="form-control">
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-12">
                        <label for="password-actual-usuario-personal">Contraseña actual: </label>
                        <div class="input-group input-group-merge password-actual-usuario-personal">
                            <input type="password" id="password-actual-usuario-personal" class="form-control" name="password-actual-usuario-personal" aria-describedby="password">
                            <span class="input-group-text cursor-pointer boton-password-usuario-personal" style="background-color: transparent;"><i class="bi bi-eye"></i></span>
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-12">
                        <label for="password-usuario-personal">Contraseña nueva: </label>
                        <div class="input-group input-group-merge password-usuario">
                            <input type="password" id="password-usuario-personal" class="form-control" name="password-usuario-personal" aria-describedby="password" readonly>
                            <span class="input-group-text cursor-pointer boton-password-usuario-personal" style="background-color: transparent;"><i class="bi bi-eye"></i></span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Cancelar <i class="bi bi-x-lg"></i>
                    </button>

                <button type="button" class="btn btn-primary" id="btn-guardar-info-usuario-personal">
                    Guardar <i class="bi bi-check-lg"></i>
                </button>
            </div>

        </div>
    </div>
</div>