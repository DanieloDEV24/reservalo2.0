<div class="modal fade" tabindex="-1" id="modalMisReservas" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">

  <!-- <div class="d-flex justify-content-center p-3 d-none contenedor-alert-reservas">
    <div class="alert alert-danger alert-dismissible fade alertHoraNoDisponible w-50" role="alert">

      <i class="bi bi-exclamation-triangle fs-5"></i>

      <strong>Ups!!</strong>&nbsp;Ha habido un error. Esa hora ya no está disponible

      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div> -->

  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <!-- <input type="hidden" id="pistaId"> -->
      <!-- Header -->
      <div class="modal-header border-bottom">
        <div class="w-100 d-flex gap-2 align-items-center">
            <i class="bi bi-calendar-check"></i>
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