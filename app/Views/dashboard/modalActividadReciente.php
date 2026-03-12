<div class="modal fade" tabindex="-1" id="modalActividadReciente" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">

  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <!-- <input type="hidden" id="pistaId"> -->
      <!-- Header -->
      <div class="modal-header border-bottom">
        <div class="w-100 d-flex gap-2 align-items-center">
            
            <h5 class="modal-title fw-bold" id="titulo-modal-pista"><i class="bi bi-hourglass-split"></i> Actividad Reciente</h5>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Body -->
      <div class="modal-body" style="padding: 5%;">
        <?php foreach($actividades as $actividad) : ?>
            <div class="actividad-reciente">
                <div class="informacion-actividad">
                    <div class="d-flex align-items-center gap-2">
                        <div class="leyenda-actividad" style="background-color: <?= $actividad["color"] ?>;"></div>
                        <p class="descripcion"><?= $actividad["descripcion"] ?></p>
                    </div>
                    <p class="fecha"><?= tiempoTranscurrido($actividad["fecha"]) ?></p>
                </div>
            </div>
        <?php endforeach; ?>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelar-btn-modal-anular-horas">Cerrar</button>
      </div>

    </div>
  </div>
</div>