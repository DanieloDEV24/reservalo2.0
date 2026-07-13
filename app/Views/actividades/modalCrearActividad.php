<div class="modal fade modal-stack-2" tabindex="-1" id="modalCrearActividad" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="">

    <div class="d-flex justify-content-center p-3 pb-0 d-none contenedor-alert-nueva-actividad">
        <div class="alert alert-danger alert-dismissible mb-0 fade show alert-errores-nueva-actividad w-50" role="alert">

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
                <h5 class="modal-title"><i class="bi bi-plus-circle"></i> Crear Actividad <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="">
               <div class="row">
                    <div class="col-6">
                        <label for="nombre-actividad-crear">Nombre: <span class="campo-obligatorio">*</span></label>
                        <input type="text" id="nombre-actividad-crear" name="nombre-actividad-crear" class="form-control">
                    </div>

                    <div class="col-6">
                        <label for="categoria-actividad-crear">Categoría: <span class="campo-obligatorio">*</span></label>
                        <select id="categoria-actividad-crear" name="categoria-actividad-crear" class="form-select">
                            <option value="-1">Seleccione una categoría</option>
                            <?php foreach ($tipos_actividades as $tipo_actividad): ?>
                                <option value="<?= $tipo_actividad["id_tipos_actividades"] ?>"><?= $tipo_actividad["nombre"] ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
              </div>

                <div class="row">
                    <div class="col-12 mt-3">
                        <label for="descripcion-actividad-crear">Descripción: <span class="campo-obligatorio">*</span></label>
                        <textarea id="descripcion-actividad-crear" name="descripcion-actividad-crear" class="form-control" rows="3"></textarea>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 mt-3">
                        <label for="fecha-actividad-crear">Fecha de la actividad: <span class="campo-obligatorio">*</span></label>
                        <input type="date" id="fecha-actividad-crear" name="fecha-actividad-crear" class="form-control">
                    </div>

                    <div class="col-6 mt-3">
                        <label for="hora-actividad-crear">Hora de la actividad: <span class="campo-obligatorio">*</span></label>
                        <input type="time" id="hora-actividad-crear" name="hora-actividad-crear" class="form-control">
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 mt-3">
                        <label for="fecha-limite-actividad-crear">Fecha límite de inscripción: <span class="campo-obligatorio">*</span></label>
                        <input type="date" id="fecha-limite-actividad-crear" name="fecha-limite-actividad-crear" class="form-control">
                    </div>

                    <div class="col-6 mt-3">
                        <label for="hora-limite-actividad-crear">Hora límite de inscripción: <span class="campo-obligatorio">*</span></label>
                        <input type="time" id="hora-limite-actividad-crear" name="hora-limite-actividad-crear" class="form-control">
                    </div>
                </div>


                <div class="row mt-3">
                    <div class="col-3">
                        <div class="row ">
                            <div class="col-12 d-flex align-items-center gap-2 mt-3">
                                <label for="">¿Tiene aforo? </label>
                                <label class="toggle-switch">
                                <input type="checkbox" class="aforo">
                                <div class="toggle-switch-background">
                                    <div class="toggle-switch-handle"></div>
                                </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-3">
                        <label for="aforo-actividad-crear">Aforo: <span class="campo-obligatorio">*</span></label>
                        <input type="number" id="aforo-actividad-crear" name="aforo-actividad-crear" class="form-control" readonly style="color: #ccc">
                    </div>

                    <div class="col-3">
                        <div class="row ">
                            <div class="col-12 d-flex align-items-center gap-2 mt-3">
                                <label for="">¿Tiene precio? </label>
                                <label class="toggle-switch">
                                <input type="checkbox" class="precio">
                                <div class="toggle-switch-background">
                                    <div class="toggle-switch-handle"></div>
                                </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-3">
                        <label for="precio-actividad-crear">Precio: <span class="campo-obligatorio">*</span></label>
                        <input type="number" id="precio-actividad-crear" name="precio-actividad-crear" class="form-control" step="0.01" readonly style="color: #ccc;">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-6">
                        <label for="lugar-actividad-crear">Lugar de la actividad: <span class="campo-obligatorio">*</span></label>
                        <input type="text" id="lugar-actividad-crear" name="lugar-actividad-crear" class="form-control" step="0.01">
                    </div>

                    <div class="col-6">
                        <label for="duracion-actividad-crear">Duración de la actividad: <span class="campo-obligatorio">*</span></label>
                        <input type="time" id="duracion-actividad-crear" name="duracion-actividad-crear" class="form-control">
                    </div>

                </div>

                <div class="row mt-3">
                    <div class="col-10">
                        <div class="w-50">
                            Selecciona imagen para la actividad
                            <label class="btn btn-primary mt-1">
                            Imagen
                            <input class="imagenes" type="file" name="imagenes[]" accept="image/*" hidden="">
                            </label>
                        </div>
                    </div>
                </div>


            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar <i class="bi bi-x-lg"></i>
                </button>

                <button type="button" class="btn btn-primary" id="btn-guardar-crear-actividad">
                    Crear <i class="bi bi-check-lg"></i>
                </button>
            </div>

        </div>
    </div>
</div>