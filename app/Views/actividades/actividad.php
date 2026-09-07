<?php use CodeIgniter\I18n\Time; ?>

<section class="paginaActividad">

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

   <input type="hidden" id="id-actividad" value="<?= isset($actividad["id_actividades"]) ? $actividad["id_actividades"] : '' ?>">

    <figure
        id="img-ir-actividad"
        style="background-image: url('<?= isset($baseUrl) ? $baseUrl : '' ?>images/<?= isset($actividad["imagen"]) ? $actividad["imagen"] : '' ?>');"
        role="img"
        aria-label="<?= isset($actividad["nombre"]) ? $actividad["nombre"] : '' ?>"
    >
    </figure>

    <article class="info-actividad">
        <div class="row">

            <div class="col-12">
                <header class="header-actividad">
                    <span class="categoria-actividad">
                        <?= isset($actividad["categoria_actividad"]) ? $actividad["categoria_actividad"] : '' ?>
                    </span>

                    <h1 class="title-page principal" style="margin-top: 2%;">
                        <?= isset($actividad["nombre"]) ? $actividad["nombre"] : '' ?>.
                    </h1>

                    <p class="description-page">
                        <?= isset($actividad["descripcion"]) ? $actividad["descripcion"] : '' ?>
                    </p>
                </header>
            </div>

            <div class="col-12">
                <dl class="row g-3">
                    <div class="col-3">
                        <div class="info-card fecha">
                            <dt class="info-label">Fecha de la actividad</dt>
                            <dd class="info-value"><?= isset($actividad["fecha_actividad"]) ? date('d/m/Y', strtotime($actividad["fecha_actividad"])) : '' ?></dd>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="info-card salida-duracion">
                            <dt class="info-label">Salida / Duración de la actividad</dt>
                            <dd class="info-value"><?= isset($actividad["hora_actividad"]) ? substr($actividad["hora_actividad"], 0, 5) : '' ?> · <?= isset($actividad["duracion"]) ? substr($actividad["duracion"], 0, 5) : '' ?>h aprox.</dd>
                        </div>
                    </div>

                    <div class="col-3 ">
                        <div class="info-card lugar">
                            <dt class="info-label">Lugar</dt>
                            <dd class="info-value"><?= isset($actividad["lugar"]) ? $actividad["lugar"] : '' ?></dd>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="info-card plazas">
                            <dt class="info-label"><?= isset($actividad["tiene_aforo"]) ? (intval($actividad["tiene_aforo"]) === 1 ? 'Plazas' : 'Inscritos') : '' ?></dt>
                            <dd class="info-value"><?= isset($actividad["plazas_ocupadas"]) ? $actividad["plazas_ocupadas"] : '' ?> <?= isset($actividad["aforo"]) ? (intval($actividad["tiene_aforo"]) === 1 ? "/".$actividad["aforo"] : '') : '' ?></dd>
                        </div>
                    </div>
                </dl>
            </div>

            <?php
                 $fechaLanzamiento = Time::createFromFormat(
                                        'Y-m-d H:i:s',
                                        isset($actividad['fecha_limite']) ? $actividad['fecha_limite'] . ' ' . $actividad['hora_limite'] : ''
                                    );
            ?>
            <?php if(isset($actividad["tiene_precio"]) && intval($actividad["tiene_precio"]) === 0) : ?>
                <div class="col-12">
                <section class="reserva-plaza mt-5">

                    <div class="row">
                        <div class="col-12">
                            <h2 class="title-page">Reserva tu plaza.</h2>
                            <p class="descripcion-reserva-plaza">Plazo de inscripción hasta el <span id="fecha-limite-actividad"><?= isset($actividad["fecha_limite"]) ? date('d/m/Y', strtotime($actividad["fecha_limite"])) : '' ?></span> a las <span id="hora-limite-actividad"><?= isset($actividad["hora_limite"]) ? substr($actividad["hora_limite"], 0, 5) : '' ?>h.</span></p>
                        </div>
                    </div>

                    <?php if(!$fechaLanzamiento->isBefore(Time::now())): ?>

                        <form id="form-reserva-actividad">

                            <fieldset class="selector-plazas">
                                <legend class="selector-plazas-label">Número de plazas</legend>
                                <div class="selector-plazas-controles">
                                    <button type="button" class="btn-plazas" id="btn-restar-plaza" aria-label="Restar plaza">−</button>
                                    <input type="number" class="selector-plazas-valor" id="num-plazas" value="1" min="1" max="<?= isset($actividad["tiene_aforo"]) && intval($actividad["tiene_aforo"]) === 1 ? $actividad["aforo"] : '' ?>" inputmode="numeric">
                                    <button type="button" class="btn-plazas" id="btn-sumar-plaza" aria-label="Sumar plaza">+</button>
                                </div>

                                <input type="hidden" id="num-aforo-actividad" value="<?= isset($actividad["tiene_aforo"]) && intval($actividad["tiene_aforo"]) === 1 ? (intval($actividad["aforo"]) - intval($actividad["plazas_ocupadas"])) : '' ?>">
                            </fieldset>

                            <hr>

                            <dl class="precio-ver-actividad">
                                <input type="hidden" id="precio-actividad" value="<?= isset($actividad["tiene_precio"]) && intval($actividad["tiene_precio"]) === 1 ? $actividad["precio"] : '' ?>">
                                <dt style="font-size: 18px;">Total</dt>
                                <dd id="precio-total-ver-actividad" style="font-size: 20px;"><strong><?= (isset($actividad["tiene_precio"]) && intval($actividad["tiene_precio"]) === 1) ? $actividad["precio"].'€' : 'Gratis' ?></strong></dd>
                            </dl>

                            <?php if(isset($usuario['id_rol']) && intval($usuario['id_rol']) === 2) : ?>
                                <div class="row mt-3">
                                    <div class="col-12">
                                        <div class="contenedor-usuarios-admin pb-4">
                                            <label for="usuarios-reserva-actividad">Seleccione al usuario de la reserva:</label>
                                            <select id="usuarios-reserva-actividad" class="select-usuario-reserva">
                                                <option value="-1">Seleccione un usuario</option>
                                                <?php if(isset($usuarios)): ?>
                                                    <?php foreach($usuarios as $user) : ?>
                                                        <?php if(isset($user['id_rol']) && intval($user['id_rol']) !== 2): ?>
                                                            <option value="<?= $user["id_usuario"] ?>"><?= $user["nombre"] ?> - <?= $user["email"] ?> - <?= $user["telf"] ?></option>
                                                        <?php endif; ?>
                                                    <?php endforeach ; ?>
                                                <?php endif; ?>
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

                                    <fieldset class="info-adicional-persona" data-persona="1">

                                        <legend class="titulo-persona">Persona 1</legend>

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

                                    </fieldset>

                                </div>
                            </div>

                            <button type="button" class="btn btn-reservar-plazas" id="btn-reservar-plaza-actividad" <?= (isset($usuario) && intval($usuario['id_rol']) === 2) ? 'disabled' : '' ?> <?= (isset($usuario) && intval($usuario['id_rol']) === 1 && $plazoExpirado) ? 'disabled' : '' ?>>Reservar plaza</button>

                        </form>

                    <?php endif; ?>

                </section>
                </div>
            <?php endif;  ?>

        </div>
    </article>
</section>