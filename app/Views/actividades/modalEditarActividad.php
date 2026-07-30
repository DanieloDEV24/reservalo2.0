<div class="modal fade modal-stack-2" tabindex="-1" id="modalEditarActividad" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-categoria="">
    <input type="hidden" id="id-actividad" value="">
    <div class="d-flex justify-content-center p-3 pb-0 d-none contenedor-alert-editar-actividad">
        <div class="alert alert-danger alert-dismissible mb-0 fade show alert-errores-editar-actividad w-50" role="alert">

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
                <h5 class="modal-title"><i class="bi bi-pencil-square"></i> Editar Actividad <span></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body" style="padding: 3%;" data-index="">
               <div class="row">
                    <div class="col-6">
                        <label for="nombre-actividad-editar">Nombre: <span class="campo-obligatorio">*</span></label>
                        <input type="text" id="nombre-actividad-editar" name="nombre-actividad-editar" class="form-control">
                    </div>

                    <div class="col-6">
                        <label for="categoria-actividad-editar">Categoría: <span class="campo-obligatorio">*</span></label>
                        <select id="categoria-actividad-editar" name="categoria-actividad-editar" class="form-select">
                            <option value="-1">Seleccione una categoría</option>
                            <?php foreach ($tipos_actividades as $tipo_actividad): ?>
                                <option value="<?= $tipo_actividad["id_tipos_actividades"] ?>"><?= $tipo_actividad["nombre"] ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
              </div>

                <div class="row">
                    <div class="col-12 mt-3">
                        <label for="descripcion-actividad-editar">Descripción: <span class="campo-obligatorio">*</span></label>
                        <textarea id="descripcion-actividad-editar" name="descripcion-actividad-editar" class="form-control" rows="3"></textarea>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 mt-3">
                        <label for="fecha-actividad-editar">Fecha de la actividad: <span class="campo-obligatorio">*</span></label>
                        <input type="date" id="fecha-actividad-editar" name="fecha-actividad-editar" class="form-control">
                    </div>

                    <div class="col-6 mt-3">
                        <label for="hora-actividad-editar">Hora de la actividad: <span class="campo-obligatorio">*</span></label>
                        <input type="time" id="hora-actividad-editar" name="hora-actividad-editar" class="form-control">
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 mt-3">
                        <label for="fecha-limite-actividad-editar">Fecha límite de inscripción: <span class="campo-obligatorio">*</span></label>
                        <input type="date" id="fecha-limite-actividad-editar" name="fecha-limite-actividad-editar" class="form-control">
                    </div>

                    <div class="col-6 mt-3">
                        <label for="hora-limite-actividad-editar">Hora límite de inscripción: <span class="campo-obligatorio">*</span></label>
                        <input type="time" id="hora-limite-actividad-editar" name="hora-limite-actividad-editar" class="form-control">
                    </div>
                </div>


                <div class="row mt-3">
                    <div class="col-3">
                        <div class="row ">
                            <div class="col-12 d-flex align-items-center gap-2 mt-3">
                                <label for="">¿Tiene aforo? </label>
                                <label class="toggle-switch">
                                <input type="checkbox" class="aforo-editar">
                                <div class="toggle-switch-background">
                                    <div class="toggle-switch-handle"></div>
                                </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-3">
                        <label for="aforo-actividad-editar">Aforo: <span class="campo-obligatorio">*</span></label>
                        <input type="number" id="aforo-actividad-editar" name="aforo-actividad-editar" class="form-control" readonly style="color: #ccc">
                    </div>

                    <div class="col-3">
                        <div class="row ">
                            <div class="col-12 d-flex align-items-center gap-2 mt-3">
                                <label for="">¿Tiene precio? </label>
                                <label class="toggle-switch">
                                <input type="checkbox" class="precio-editar">
                                <div class="toggle-switch-background">
                                    <div class="toggle-switch-handle"></div>
                                </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-3">
                        <label for="precio-actividad-editar">Precio: <span class="campo-obligatorio">*</span></label>
                        <input type="number" id="precio-actividad-editar" name="precio-actividad-editar" class="form-control" step="0.01" readonly style="color: #ccc;">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-6">
                        <label for="lugar-actividad-editar">Lugar de la actividad: <span class="campo-obligatorio">*</span></label>
                        <input type="text" id="lugar-actividad-editar" name="lugar-actividad-editar" class="form-control" step="0.01">
                    </div>

                    <div class="col-6">
                        <label for="duracion-actividad-editar">Duración de la actividad: <span class="campo-obligatorio">*</span></label>
                        <input type="time" id="duracion-actividad-editar" name="duracion-actividad-editar" class="form-control">
                    </div>

                </div>

                <div class="row mt-3">
                    <div class="col-6">
                        <div>
                            Selecciona imagen para la actividad
                            <label class="btn btn-primary mt-1">
                            Imagen
                            <input class="imagenes" type="file" name="imagenes[]" accept="image/*" hidden="">
                            </label>
                        </div>
                    </div>

                    <div class="col-6">
                        <label for="estado-actividad-editar">Estado: <span class="campo-obligatorio">*</span></label>
                        <select id="estado-actividad-editar" name="estado-actividad-editar" class="form-select">
                        </select>
                    </div>
                </div>


            </div>

            <!-- Footer -->
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar <i class="bi bi-x-lg"></i>
                </button>

                <button type="button" class="btn btn-primary" id="btn-guardar-editar-actividad">
                    Guardar <i class="bi bi-check-lg"></i>
                </button>
            </div>

        </div>
    </div>
</div>