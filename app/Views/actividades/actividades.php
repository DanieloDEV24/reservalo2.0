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

    <?php if(count($actividades) > 0): ?>
            
    <?php else: ?>
        <div class="no-actividades">
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
    <?php endif; ?>
</div>
<?= $modalCrearTipoActividad ?>
<?= $modalMenuTiposActividades ?>
<?= $modalEditarTipoActividad ?>
<?= $modalEliminarTipoActividad ?>
<?= $modalCrearActividad ?>