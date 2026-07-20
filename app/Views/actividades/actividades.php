<div class="actividades">
    <input type="hidden" id="rol_usuario" value="<?= (isset($usuario)) ? $usuario["id_rol"] : '' ?>">
    <h1 class="title-page">Actividades</h1>
    <p class="description-page">Explora nuestras actividades y reserva tu lugar</p>

     <div class="actividades-resumen">
        <div class="div-numero-actividades">
            <h1><?=count($actividades)?></h1>
            <p>Actividades</p>
        </div>

        <?php if(count($actividades) > 0): ?>
            
        <?php endif; ?>
     </div>

        <div class="grid-actividades <?= (count($actividades) > 0) ? "" : "d-none" ?>">
            <?php foreach($actividades as $actividad): ?>
                <?php
                    $estaCancelada = $actividad['estado'] === 'cancelada';
                    $estaFinalizada = $actividad['estado'] === 'finalizada';
                    $estaInactiva = $estaCancelada || $estaFinalizada;
                ?>
                <div class="card-actividad" data-index="<?= $actividad["id_actividades"] ?>">
                    <div class="card-actividad-img">
                        <img src="<?= base_url('images/' . $actividad['imagen']) ?>" alt="<?= $actividad['nombre'] ?>" class="<?= $estaInactiva ? 'grayscale-img' : '' ?>">
                        <span class="card-actividad-badge" style="background-color: <?= $estaInactiva ? '#adb5bd' : '#32cccc' ?>"><?= $actividad['categoria_actividad'] ?></span>
                        <?php if(isset($usuario) && (intval($usuario['id_rol']) === 2)): ?>
                            <div class="dropdown card-actividad-admin-menu">
                                <button class="btn btn-sm card-actividad-admin-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item btn-editar-actividad" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                                    <li><a class="dropdown-item btn-inscritos-actividad" href="#"><i class="bi bi-people me-2"></i>Ver inscritos</a></li>
                                    <?php if(!$estaFinalizada): ?>
                                        <li><hr class="dropdown-divider"></li>
                                        <?php if($estaCancelada): ?>
                                            <li><a class="dropdown-item btn-reactivar-actividad" href="#"><i class="bi bi-arrow-clockwise me-2"></i>Reactivar</a></li>
                                        <?php else: ?>
                                            <li><a class="dropdown-item text-danger btn-borrar-actividad" href="#"><i class="bi bi-x-lg me-2"></i>Cancelar</a></li>    
                                        <?php endif; ?>
                                    <?php endif; ?>
                                </ul>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="card-actividad-body">
                        <p class="card-actividad-titulo"><?= $actividad['nombre'] ?></p>
                        <p class="card-actividad-desc"><?= $actividad['descripcion'] ?></p>
                        <div class="card-actividad-meta">
                            <div><i class="bi bi-calendar"></i> <?= date('d/m/Y', strtotime($actividad['fecha_actividad'])) ?>, <?= substr($actividad['hora_actividad'], 0, 5) ?></div>
                            <div><i class="bi bi-geo-alt"></i> <?= $actividad['lugar'] ?></div>
                            <?php if ((int) $actividad['tiene_aforo'] === 1): ?>
                                <div><i class="bi bi-people"></i> <?= $actividad['plazas_ocupadas'] ?> / <?= $actividad['aforo'] ?> plazas</div>
                            <?php endif; ?>
                        </div>
                        <div class="card-actividad-footer">
                            <span class="card-actividad-precio"><?= $actividad['tiene_precio'] ? $actividad['precio'] . '€' : 'Gratis' ?></span>
                            <a class="btn btn-outline-actividad" <?= $estaInactiva ? 'disabled' : '' ?> href="<?= $baseUrl.'index.php/actividad/'.$actividad['id_actividades'] ?>">
                                <?= $estaCancelada ? 'Cancelada' : ($estaFinalizada ? 'Finalizada' : 'Ver más') ?>
                            </a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>  

        <div class="botones-actividades <?= ((count($actividades) > 0) && (isset($usuario) && intval($usuario["id_rol"]) === 2)) ? "" : "d-none" ?>">
            <a href="" class="btn-primary-personal btn-crear-actividad">Crear actividad</a>
        </div>

        <div class="no-actividades <?= (count($actividades) === 0) ? '' : 'd-none' ?>">
            <div class="icono-no-actividades">
                <i class="bi bi-calendar-x-fill"></i>
            </div>
            <h2>Todavía no hay actividades disponibles.</h2>
            <p>En cuanto el ayuntamiento publique alguna actividad, podrás reservar tu plaza aquí.</p>
            <?php if($usuario && intval($usuario['id_rol']) === 2): ?>
               <div class="botones-no-actividades">
                    <a href="" class="btn-primary-personal btn-crear-actividad">Crear actividad</a>
                    <?= ($numeroTiposActividad > 0) ? '<a href="" class="btn-secondary-personal btn-modal-menu-tipo-actividad">Menu categorías</a>' : '<a href="" class="btn-secondary-personal btn-modal-crear-tipo-actividad">Crear categoría</a>' ?>
               </div>
            <?php endif; ?>
        </div>
</div>
<?= $modalCrearTipoActividad ?>
<?= $modalMenuTiposActividades ?>
<?= $modalEditarTipoActividad ?>
<?= $modalEliminarTipoActividad ?>
<?= $modalCrearActividad ?>
<?= $modalEditarActividad ?>
<?= $modalCancelarActividad ?>