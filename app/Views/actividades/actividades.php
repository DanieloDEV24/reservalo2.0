<div class="actividades">
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
                <div class="card-actividad">
            <div class="card-actividad-img">
                <img src="<?= base_url('images/' . $actividad['imagen']) ?>" alt="<?= $actividad['nombre'] ?>">
                <span class="card-actividad-badge" style="background-color: #32cccc"><?= $actividad['categoria_actividad'] ?></span>
            </div>
            <div class="card-actividad-body">
                <p class="card-actividad-titulo"><?= $actividad['nombre'] ?></p>
                <p class="card-actividad-desc"><?= $actividad['descripcion'] ?></p>
                <div class="card-actividad-meta">
                    <div><i class="bi bi-calendar"></i> <?= date('d/m/Y', strtotime($actividad['fecha_actividad'])) ?>, <?= $actividad['hora_actividad'] ?></div>
                    <div><i class="bi bi-geo-alt"></i> <?= $actividad['lugar'] ?></div>
                    <?php if ((int) $actividad['tiene_aforo'] === 1): ?>
                        <div><i class="bi bi-people"></i> <?= $actividad['plazas_ocupadas'] ?> / <?= $actividad['aforo'] ?> plazas</div>
                    <?php endif; ?>
                </div>
                <div class="card-actividad-footer">
                    <span class="card-actividad-precio"><?= $actividad['tiene_precio'] ? $actividad['precio'] . '€' : 'Gratis' ?></span>
                    <button class="btn btn-outline-actividad">Ver más</button>
                </div>
            </div>
        </div>
            <?php endforeach; ?>
        </div>  

        <div class="botones-actividades <?= (count($actividades) > 0) ? "" : "d-none" ?>">
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