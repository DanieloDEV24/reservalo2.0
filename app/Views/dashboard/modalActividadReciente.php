<script>
  const actividades = <?= json_encode($actividades) ?>;
</script>

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
        <div id="lista-actividades"></div>

        <!-- Paginador -->
        <div class="d-flex justify-content-between align-items-center mt-3">
          <small class="text-muted" id="pag-info"></small>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-secondary" id="pag-prev" onclick="cambiarPagina(-1)">
              <i class="bi bi-chevron-left"></i> Anterior
            </button>
            <button class="btn btn-sm btn-outline-secondary" id="pag-next" onclick="cambiarPagina(1)">
              Siguiente <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelar-btn-modal-anular-horas">Cerrar</button>
      </div>

    </div>
  </div>
</div>
<script>
  const POR_PAGINA = 10;
let paginaActual = 1;

function renderActividades() {
  const total = actividades.length;
  const totalPaginas = Math.ceil(total / POR_PAGINA);
  const inicio = (paginaActual - 1) * POR_PAGINA;
  const fin = inicio + POR_PAGINA;
  const slice = actividades.slice(inicio, fin);

  // Renderizar items
  const lista = document.getElementById('lista-actividades');
  lista.innerHTML = slice.map(a => `
    <div class="actividad-reciente">
      <div class="informacion-actividad">
        <div class="d-flex align-items-center gap-2">
          <div class="leyenda-actividad" style="background-color: ${a.color};"></div>
          <p class="descripcion">${a.descripcion}</p>
        </div>
        <p class="fecha">${a.fecha}</p>
      </div>
    </div>
  `).join('');

  // Info y botones
  document.getElementById('pag-info').textContent = 
    `${inicio + 1}–${Math.min(fin, total)} de ${total}`;
  document.getElementById('pag-prev').disabled = paginaActual === 1;
  document.getElementById('pag-next').disabled = paginaActual === totalPaginas;
}

function cambiarPagina(dir) {
  paginaActual += dir;
  renderActividades();
}

// Resetear a página 1 cada vez que abres el modal
document.getElementById('modalActividadReciente')
  .addEventListener('show.bs.modal', () => {
    paginaActual = 1;
    renderActividades();
  });
</script>