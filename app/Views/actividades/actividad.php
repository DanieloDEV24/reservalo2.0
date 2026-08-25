<div class="paginaActividad">

    <input type="hidden" id="rol_usuario" value="<?= (isset($usuario)) ? $usuario["id_rol"] : '' ?>">
    <input type="hidden" id="id_usuario" value="<?= (isset($usuario)) ? $usuario["id_usuario"] : '' ?>">

    <div class="d-flex justify-content-center d-none contenedor-alert-reserva-actividad pt-2 alert-flotante">
    
        
        <div class="alert alert-danger alert-dismissible fade show alert-errores-reservar-actividad w-40 d-flex align-items-center justify-content-center gap-2 m-0" role="alert">
            <div class="errores">
                <ul>
                    
                </ul>
            </div>
        </div>

  </div>

<div class="d-flex justify-content-center d-none contenedor-alert-reserva-actividad-2 pt-2 alert-flotante">

    <div class="alert alert-success alert-dismissible fade show alert-reserva-actividad-completada w-40 d-flex align-items-center justify-content-center gap-2 m-0" role="alert">
        <div class="errores">
            <ul>
                <li>La reserva se ha realizado correctamente</li>
            </ul>
        </div>
    </div>

</div>



    <input type="hidden" id="id-actividad" value="<?= $actividad["id_actividades"] ?>">
    <div id="img-ir-actividad" style="background-image: url('<?= $baseUrl.'images/'.$actividad["imagen"] ?>');">

    </div>
    
    <div class="info-actividad">
        <div class="row">
            <div class="col-12">
                <span class="categoria-actividad"><?= $actividad["categoria_actividad"] ?></span>
                <h1 class="title-page principal" style="margin-top: 2%;"><?=$actividad["nombre"]?>.</h1>
            </div>

            <div class="row">
                <div class="col-12">
                   <p class="description-page"><?=$actividad["descripcion"]?></p>
                </div>
            </div>

            <div class="row g-3 mt-3">
                <div class="col-3">
                    <div class="info-card fecha">
                        <div class="info-label">Fecha de la actividad</div>
                        <div class="info-value"><?= date('d/m/Y', strtotime($actividad["fecha_actividad"])) ?></div>
                    </div>
                </div>

                <div class="col-3">
                    <div class="info-card salida-duracion">
                        <div class="info-label">Salida / Duración de la actividad</div>
                        <div class="info-value"><?= substr($actividad["hora_actividad"], 0, 5) ?> · <?= substr($actividad["duracion"], 0, 5) ?>h aprox.</div>
                    </div>
                </div>

                <div class="col-3">
                    <div class="info-card lugar">
                        <div class="info-label">Lugar</div>
                        <div class="info-value"><?= $actividad["lugar"] ?></div>
                    </div>
                </div>

                <div class="col-3">
                    <div class="info-card plazas">
                        <div class="info-label"><?= intval($actividad["tiene_aforo"]) === 1 ? 'Plazas' : 'Inscritos' ?></div>
                        <div class="info-value"><?= $actividad["plazas_ocupadas"] ?> <?= intval($actividad["tiene_aforo"]) === 1 ? "/".$actividad["aforo"] : '' ?></div>
                    </div>
                </div>
            </div>
            
            <?php if(intval($actividad["tiene_precio"]) === 0) : ?>
                <div class="reserva-plaza mt-5">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="title-page">Reserva tu plaza.</h1>
                            <p class="descripcion-reserva-plaza">Plazo de inscripción hasta el <span id="fecha-limite-actividad"><?= date('d/m/Y', strtotime($actividad["fecha_limite"])) ?></span> a las <span id="hora-limite-actividad"><?= substr($actividad["hora_limite"], 0, 5) ?>h.</span></p>
                        </div>
                    </div>

                    <div class="selector-plazas">
                        <span class="selector-plazas-label">Número de plazas</span>
                        <div class="selector-plazas-controles">
                            <button type="button" class="btn-plazas" id="btn-restar-plaza" aria-label="Restar plaza">−</button>
                            <input type="number" class="selector-plazas-valor" id="num-plazas" value="1" min="1" max="<?= intval($actividad["tiene_aforo"]) === 1 ? $actividad["aforo"] : '' ?>" inputmode="numeric">
                            <button type="button" class="btn-plazas" id="btn-sumar-plaza" aria-label="Sumar plaza">+</button>
                        </div>

                        <input type="hidden" name="" id="num-aforo-actividad" value="<?= intval($actividad["tiene_aforo"]) === 1 ? (intval($actividad["aforo"]) - intval($actividad["plazas_ocupadas"])) : '' ?>">
                    </div>

                    <hr>

                    <div class="precio-ver-actividad">
                        <input type="hidden" name="" id="precio-actividad" value="<?= intval($actividad["tiene_precio"]) === 1 ? $actividad["precio"] : '' ?>">
                        <p style="font-size: 18px;">Total</p>
                        <p id="precio-total-ver-actividad" style="font-size: 20px;"><strong><?= (intval($actividad["tiene_precio"]) === 1) ? $actividad["precio"].'€' : 'Gratis' ?></strong></p>
                    </div>

                    <?php if(intval($usuario['id_rol']) === 2) : ?>
                        <div class="row mt-3">
                            <div class="col-12">
                                <div class="contenedor-usuarios-admin pb-4">
                                    <label for="usuarios-reserva-actividad">Seleccione al usuario de la reserva:</label>
                                    <select name="" id="usuarios-reserva-actividad" class="select-usuario-reserva">
                                        <option value="-1">Seleccione un usuario</option>
                                        <?php foreach($usuarios as $user) : ?>
                                            <?php if(intval($user['id_rol']) !== 2): ?>
                                                <option value="<?= $user["id_usuario"] ?>"><?= $user["nombre"] ?> - <?= $user["email"] ?> - <?= $user["telf"] ?></option>
                                            <?php endif; ?>
                                        <?php endforeach ; ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                    <?php endif ; ?> 
                    <?php
                        $plazoExpirado = false;
                        if (!empty($actividad["fecha_limite"])) {
                            $fechaHoraLimite = strtotime($actividad["fecha_limite"] . ' ' . ($actividad["hora_limite"] ?? '23:59:59'));
                            $plazoExpirado = $fechaHoraLimite < time();
                        }
                    ?>   
                    
                    <?php
                        $edadMinima = intval($actividad["edad_minima_usuario"]);
                        $fechaMaxNacimiento = $edadMinima > 0 ? date('Y-m-d', strtotime('-' . $edadMinima . ' years')) : '';
                    ?>

                    <div class="informacion-adicional" data-nombre="<?= $actividad["nombre_usuario"] ?>" data-apellidos="<?= $actividad["apellidos_usuario"] ?>" data-fecha="<?= $actividad["fecha_nacimiento_usuario"] ?>" data-dni="<?= $actividad["dni_usuario"] ?>" data-email="<?= $actividad["email_usuario"] ?>" data-telefono="<?= $actividad["telefono_usuario"] ?>" data-direccion="<?= $actividad["direccion_usuario"] ?>" data-edad="<?= $actividad["edad_minima_usuario"] ?>">
                        
                        <div class="contenedor-personas-actividad" id="contenedor-personas">

                            <article class="info-adicional-persona" data-persona="1">

                                <p class="titulo-persona">Persona 1</p>

                                <?php if (intval($actividad["nombre_usuario"]) === 1) : ?>
                                    <div class="form-group mb-3">
                                        <label class="form-label" for="nombre_1">Nombre</label>
                                        <input type="text" class="form-control" id="nombre_1" name="nombre_1" data-campo="nombre" required>
                                    </div>
                                <?php endif; ?>

                                <?php if (intval($actividad["apellidos_usuario"]) === 1) : ?>
                                    <div class="form-group mb-3">
                                        <label class="form-label" for="apellidos_1">Apellidos</label>
                                        <input type="text" class="form-control" id="apellidos_1" name="apellidos_1" data-campo="apellidos" required>
                                    </div>
                                <?php endif; ?>

                                <?php if (intval($actividad["fecha_nacimiento_usuario"]) === 1) : ?>
                                    <div class="form-group mb-3">
                                        <label class="form-label" for="fecha_nacimiento_1">Fecha de nacimiento</label>
                                        <input type="date" class="form-control" id="fecha_nacimiento_1" name="fecha_nacimiento_1" data-campo="fecha-nacimiento" <?= $fechaMaxNacimiento ? 'max="' . $fechaMaxNacimiento . '"' : '' ?> required>
                                    </div>
                                <?php endif; ?>

                                <?php if (intval($actividad["dni_usuario"]) === 1) : ?>
                                    <div class="form-group mb-3">
                                        <label class="form-label" for="dni_1">DNI</label>
                                        <input type="text" class="form-control" id="dni_1" name="dni_1" data-campo="dni" required>
                                    </div>
                                <?php endif; ?>

                                <?php if (intval($actividad["email_usuario"]) === 1) : ?>
                                    <div class="form-group mb-3">
                                        <label class="form-label" for="email_1">Email</label>
                                        <input type="email" class="form-control" id="email_1" name="email_1" data-campo="email" required>
                                    </div>
                                <?php endif; ?>

                                <?php if (intval($actividad["telefono_usuario"]) === 1) : ?>
                                    <div class="form-group mb-3">
                                        <label class="form-label" for="telefono_1">Teléfono</label>
                                        <input type="tel" class="form-control" id="telefono_1" name="telefono_1" data-campo="telefono" required>
                                    </div>
                                <?php endif; ?>

                                <?php if (intval($actividad["direccion_usuario"]) === 1) : ?>
                                    <div class="form-group mb-3">
                                        <label class="form-label" for="direccion_1">Dirección</label>
                                        <input type="text" class="form-control" id="direccion_1" name="direccion_1" data-campo="direccion" required>
                                    </div>
                                <?php endif; ?>

                            </article>

                        </div>
                    </div>
                    
                    <button href="#" class="btn btn-reservar-plazas" id="btn-reservar-plaza-actividad" <?= (intval($usuario['id_rol']) === 2) ? 'disabled' : '' ?> <?= (intval($usuario['id_rol']) === 1 && $plazoExpirado) ? 'disabled' : '' ?> >Reservar plaza</button>
                </div>
            <?php endif;  ?>
            
        </div>
    </div>
</div>
