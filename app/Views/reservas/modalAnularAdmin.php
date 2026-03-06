<div class="modal fade" tabindex="-1" id="modalAnularReservaAdmin" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-pedido="" data-reserva="" data-tipo="">

  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <!-- <input type="hidden" id="pistaId"> -->
      <!-- Header -->
      <div class="modal-header border-bottom">
        <div class="w-100 d-flex gap-2 align-items-center">
            <div class="icon-modal-header">
              <i class="bi bi-exclamation-triangle-fill"></i>
            </div>
            <h5 class="modal-title fw-bold" id="titulo-modal-pista">Anular Reserva. Admin</h5>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Body -->
      <div class="modal-body" style="padding: 5%;">
        <h2 class="w-100">¿Desea anular esta reserva?</h2>
        <p class="fs-5" style="color: #aaa;">Esta acción no se puede deshacer. Revisa los detalles antes de continuar.</p>
        
        <div class="datos-reserva-anular-admin">
            <div class="info-principal">
                <p class="nombrePista"></p>
                <p class="instalacionDireccion"></p>
            </div>
            <div class="fecha-anular-reserva-admin">
                <div class="title-anular-admin">
                    <i class="bi bi-calendar"></i>
                    <span>Fecha</span>
                </div>
                <div class="texto-anular-admin">

                </div>
            </div>

            <div class="horario-anular-reserva-admin">
                <div class="title-anular-admin">
                    <i class="bi bi-stopwatch"></i>
                    <span>Horario</span>
                </div>
                <div class="texto-anular-admin">
                    
                </div>
            </div>


            <div class="pedido-anular-reserva-admin">
                <div class="title-anular-admin">
                    <i class="bi bi-file-text"></i>
                    <span>Num de pedido</span>
                </div>
                <div class="texto-anular-admin">
                    
                </div>
            </div>


            <div class="precio-anular-reserva-admin">
                <div class="title-anular-admin">
                    <i class="bi bi-currency-euro"></i>
                    <span>Precio</span>
                </div>
                <div class="texto-anular-admin">
                    
                </div>
            </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger" id="btn-anular-admin-confirmar">Anular Reserva</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelar-btn-modal-anular-horas">Cancelar</button>
      </div>

    </div>
  </div>
</div>