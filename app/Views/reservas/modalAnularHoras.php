<div class="modal fade" tabindex="-1" id="modalAnularHoras" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-pedido="">

  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
    <div class="modal-content">
      <!-- <input type="hidden" id="pistaId"> -->
      <!-- Header -->
      <div class="modal-header border-bottom">
        <div class="w-100 d-flex gap-2 align-items-center">
            <div class="icon-modal-header">
              <i class="bi bi-exclamation-triangle-fill"></i>
            </div>
            <h5 class="modal-title fw-bold" id="titulo-modal-pista">¿Estás seguro de anular estas horas?</h5>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Body -->
      <div class="modal-body" style="padding: 5%;">
        <div class="contenedor-total">
            <div class="grid-stats">

            <div class="stat-item horas">
                <h1 class="hora"></h1>
                <span class="hora">HORAS</span>
            </div>

            <div class="stat-item dias">
                <h1 class="dia"></h1>
                <span class="dia">DIAS</span>
            </div>

            <div class="stat-item total">
                <h1 class="total"></h1>
                <span class="total">EN TOTAL</span>
            </div>

        </div>

        <div class="contenedor-horas">

        </div>
        </div>
      </div>

      <div class="modal-footer">
       <button type="button" class="btn btn-danger" id="btn-anular-horas">Anular Horas</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelar-btn-modal-anular-horas">Cancelar</button>
      </div>

    </div>
  </div>
</div>