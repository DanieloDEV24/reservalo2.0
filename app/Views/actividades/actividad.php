<div class="paginaActividad">

    <div class="d-flex justify-content-center d-none contenedor-alert-reserva-actividad pt-2">
    
        
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
                <h1 class="title-page" style="margin-top: 2%;"><?=$actividad["nombre"]?>.</h1>
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
                        <div class="info-label">Plazas</div>
                        <div class="info-value"><?= $actividad["plazas_ocupadas"] ?> <?= intval($actividad["tiene_aforo"]) === 1 ? "/".$actividad["aforo"] : '' ?></div>
                    </div>
                </div>
            </div>
            
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
                <button href="#" class="btn btn-reservar-plazas" id="btn-reservar-plaza-actividad" <?= (intval($usuario['id_rol']) === 2) ? 'disabled' : '' ?> >Reservar plaza</button>
            </div>
            
        </div>
    </div>
</div>