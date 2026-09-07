<?php use CodeIgniter\I18n\Time; ?>
<section class="actividades" aria-labelledby="titulo-actividades">
    <input type="hidden" id="rol_usuario" value="<?= (isset($usuario)) ? $usuario["id_rol"] : '' ?>">
    <input type="hidden" id="id_usuario" value="<?= (isset($usuario)) ? $usuario["id_usuario"] : '' ?>">
    <h1 id="titulo-actividades" class="title-page">Actividades</h1>
    <p class="description-page">Explora nuestras actividades y reserva tu lugar</p>

    <aside class="actividades-resumen" aria-label="Resumen de actividades">
        <dl class="div-numero-actividades">
            <dt class="stat-label">Actividades</dt>
            <dd><?= (isset($actividades)) ? count($actividades) : 0 ?></dd>
        </dl>

        <?php if(isset($actividades) && count($actividades) > 0): ?>
            
        <?php endif; ?>
    </aside>

        <ul class="grid-actividades <?= (isset($actividades) && count($actividades) > 0) ? "" : "d-none" ?>" role="list">
            <?php if(isset($actividades)): ?>
                <?php foreach($actividades as $actividad): ?>
                    <?php
                        $estaCancelada = $actividad['estado'] === 'cancelada';
                        $estaFinalizada = $actividad['estado'] === 'finalizada';
                        $estaInactiva = $estaCancelada || $estaFinalizada;
                    ?>
                    <li>
                    <article class="card-actividad" data-index="<?= $actividad["id_actividades"] ?>" aria-labelledby="titulo-actividad-<?= $actividad["id_actividades"] ?>">
                        <header class="card-actividad-img">
                            <img src="<?= base_url('images/' . $actividad['imagen']) ?>" alt="<?= $actividad['nombre'] ?>" class="<?= $estaInactiva ? 'grayscale-img' : '' ?>">
                            <span class="card-actividad-badge" style="background-color: <?= $estaInactiva ? '#adb5bd' : '#32cccc' ?>"><?= $actividad['categoria_actividad'] ?></span>
                            <?php if(isset($usuario) && (intval($usuario['id_rol']) === 2)): ?>
                                <div class="dropdown card-actividad-admin-menu">
                                    <button class="btn btn-sm card-actividad-admin-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Opciones de la actividad">
                                        <i class="bi bi-three-dots-vertical" aria-hidden="true"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item btn-editar-actividad" href="#"><i class="bi bi-pencil me-2" aria-hidden="true"></i>Editar</a></li>
                                        <li><a class="dropdown-item btn-inscritos-actividad" href="#"><i class="bi bi-people me-2" aria-hidden="true"></i>Ver inscritos</a></li>
                                        <?php if(!$estaFinalizada): ?>
                                            <li><hr class="dropdown-divider"></li>
                                            <?php if($estaCancelada): ?>
                                                <li><a class="dropdown-item btn-reactivar-actividad" href="#"><i class="bi bi-arrow-clockwise me-2" aria-hidden="true"></i>Reactivar</a></li>
                                            <?php else: ?>
                                                <li><a class="dropdown-item text-danger btn-borrar-actividad" href="#"><i class="bi bi-x-lg me-2" aria-hidden="true"></i>Cancelar</a></li>    
                                            <?php endif; ?>
                                        <?php endif; ?>
                                    </ul>
                                </div>
                            <?php endif; ?>
                        </header>
                        <section class="card-actividad-body">
                            <h2 id="titulo-actividad-<?= $actividad["id_actividades"] ?>" class="card-actividad-titulo"><?= $actividad['nombre'] ?></h2>
                            <p class="card-actividad-desc"><?= $actividad['descripcion'] ?></p>

                            

                            <div class="card-actividad-meta">
                                <div>
                                    <i class="bi bi-calendar" aria-hidden="true"></i>
                                    <time datetime="<?= date('Y-m-d', strtotime($actividad['fecha_actividad'])) ?>T<?= substr($actividad['hora_actividad'], 0, 5) ?>">
                                        <?= date('d/m/Y', strtotime($actividad['fecha_actividad'])) ?>, <?= substr($actividad['hora_actividad'], 0, 5) ?>
                                    </time>
                                </div>
                                <div><i class="bi bi-geo-alt" aria-hidden="true"></i> <?= $actividad['lugar'] ?></div>
                                <?php if ((int) $actividad['tiene_aforo'] === 1): ?>
                                    <div><i class="bi bi-people" aria-hidden="true"></i> <?= $actividad['plazas_ocupadas'] ?> / <?= $actividad['aforo'] ?> plazas</div>
                                <?php else: ?>
                                    <div><i class="bi bi-people" aria-hidden="true"></i> <?= $actividad['plazas_ocupadas'] ?> inscritos</div>
                                <?php endif; ?>
                            </div>
                            <div class="card-actividad-footer">
                                <span class="card-actividad-precio"><?= $actividad['tiene_precio'] ? $actividad['precio'] . '€' : 'Gratis' ?></span>
                                <a class="btn btn-outline-actividad"
                                <?= $estaInactiva ? 'aria-disabled="true" tabindex="-1"' : '' ?>
                                href="<?= isset($baseUrl) ? $baseUrl : '' ?>index.php/actividad/<?= $actividad['id_actividades'] ?>">
                                    <?= $estaCancelada ? 'Cancelada' : ($estaFinalizada ? 'Finalizada' : 'Ver más') ?>
                                </a>
                            </div>
                            <?php
                                $fechaLanzamiento = Time::createFromFormat(
                                    'Y-m-d H:i:s',
                                    $actividad['fecha_limite'] . ' ' . $actividad['hora_limite']
                                ); 

                                $fechaActividad= Time::createFromFormat(
                                    'Y-m-d H:i:s',
                                    $actividad['fecha_actividad'] . ' ' . $actividad['hora_actividad']
                                );
                            ?>
                            <?php if($fechaActividad->isBefore(Time::now())): ?>
                                <span class="no-inscripciones finalizada" role="status">Actividad finalizada</span>
                            <?php elseif($fechaLanzamiento->isBefore(Time::now())): ?>
                                <span class="no-inscripciones" role="status">Ya no se permiten inscripciones</span>
                            <?php endif; ?>
                        </section>
                    </article>
                    </li>
                <?php endforeach; ?>
            <?php endif; ?>
        </ul>  

        <div class="botones-actividades <?= ((isset($actividades) && count($actividades) > 0) && (isset($usuario) && intval($usuario["id_rol"]) === 2)) ? "" : "d-none" ?>">
            <a href="" class="btn-primary-personal btn-crear-actividad">Crear actividad</a>
            <?= (isset($numeroTiposActividad) && $numeroTiposActividad > 0) ? '<a href="" class="btn-secondary-personal btn-modal-menu-tipo-actividad">Menu categorías</a>' : '<a href="" class="btn-secondary-personal btn-modal-crear-tipo-actividad">Crear categoría</a>' ?>
        </div>

        <section class="no-actividades <?= (isset($actividades) && count($actividades) === 0) ? '' : 'd-none' ?>">
            <div class="icono-no-actividades">
                <i class="bi bi-calendar-x-fill" aria-hidden="true"></i>
            </div>
            <h2>Todavía no hay actividades disponibles.</h2>
            <p>En cuanto el ayuntamiento publique alguna actividad, podrás reservar tu plaza aquí.</p>
            <?php if(isset($usuario) && intval($usuario['id_rol']) === 2): ?>
               <div class="botones-no-actividades">
                    <a href="" class="btn-primary-personal btn-crear-actividad">Crear actividad</a>
                    <?= (isset($numeroTiposActividad) && $numeroTiposActividad > 0) ? '<a href="" class="btn-secondary-personal btn-modal-menu-tipo-actividad">Menu categorías</a>' : '<a href="" class="btn-secondary-personal btn-modal-crear-tipo-actividad">Crear categoría</a>' ?>
               </div>
            <?php endif; ?>
        </section>
</section>

<?= (isset($modalCrearTipoActividad)) ? $modalCrearTipoActividad : '' ?>
<?= (isset($modalMenuTiposActividades)) ? $modalMenuTiposActividades : '' ?>
<?= (isset($modalEditarTipoActividad)) ? $modalEditarTipoActividad : '' ?>
<?= (isset($modalEliminarTipoActividad)) ? $modalEliminarTipoActividad : '' ?>
<?= (isset($modalCrearActividad)) ? $modalCrearActividad : '' ?>
<?= (isset($modalEditarActividad)) ? $modalEditarActividad : '' ?>
<?= (isset($modalCancelarActividad)) ? $modalCancelarActividad : '' ?>
<?= (isset($modalInscritosActividad)) ? $modalInscritosActividad : '' ?>
<?= (isset($modalEliminarReservaActividad)) ? $modalEliminarReservaActividad : '' ?>
<?= (isset($modalInformacionUsuarioActividad)) ? $modalInformacionUsuarioActividad : '' ?>
<?= (isset($modalEditarReservaAdmin)) ? $modalEditarReservaAdmin : '' ?>