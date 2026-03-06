<div class="modal fade" tabindex="-1" id="modalMisReservas" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">

  <div class="d-flex justify-content-center p-3 d-none contenedor-alert-anular-horas">
    
    <div class="alert alert-danger alert-dismissible fade show alertHoraNoDisponible w-50" role="alert">

      <i class="bi bi-exclamation-triangle fs-5"></i>

      <strong>Ups!!</strong>&nbsp;No ha seleccionado ninguna hora para anular

      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

  </div>


  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <!-- <input type="hidden" id="pistaId"> -->
      <!-- Header -->
      <div class="modal-header border-bottom">
        <div class="w-100 d-flex gap-2 align-items-center">
            <div class="icon-modal-header">
              <i class="bi bi-calendar-check"></i>
            </div>
            <h5 class="modal-title fw-bold" id="titulo-modal-pista">Mis Reservas</h5>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Body -->
      <div class="modal-body" style="padding: 5%;">
        <div class="reservas-list">
          
        </div>
      </div>

    </div>
  </div>
</div>

<?= $modalAnularHoras ?>