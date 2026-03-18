<div class="modal fade" tabindex="-1" id="modalReservaPista" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-tipoReserva="">

  <div class="d-flex justify-content-center d-none contenedor-alert-reservas pt-2">
    
    <div class="alert alert-danger alert-dismissible fade alertHoraNoDisponible w-50 m-0" role="alert">

      <i class="bi bi-exclamation-triangle fs-5"></i>

      <strong>Ups!!</strong>&nbsp;Ha habido un error. Esa hora ya no está disponible

    </div>

    <div class="alert alert-danger alert-dismissible fade show alert-no-usuario w-40 d-flex align-items-center justify-content-center gap-2 m-0" role="alert">

      <i class="bi bi-exclamation-triangle fs-5"></i>

      <p class="mb-0"><strong>Ups!!</strong>&nbsp;Debe seleccionar un usuario</p>

    </div>

  </div>


  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <input type="hidden" id="pistaId">
      <!-- Header -->
      <div class="modal-header border-bottom">
        <div>
          <span class="card-categoria" id="categoria-pista"></span>
          <h3 class="modal-title fw-bold mb-1" id="nombre-pista"></h3>
          <p class="text-muted mb-0 fs-6">
            <i class="bi bi-people"></i> <span id="capacidad-pista"></span>
          </p>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Body -->
      <div class="modal-body" style="padding: 5%;" data-tipoReserva="<?= $instalacion["tipo_reserva"] ?>">

        <!-- Carrusel de Imágenes -->
        <div id="carouselPista" class="carousel slide" style="margin-bottom: 5%;" data-bs-ride="carousel">
          <div class="carousel-inner carousel-pista">

            <!-- Imagen 1 -->
            <div class="carousel-item active">
              <img id="img1-pista" src="" class="d-block w-100" alt="Pista 1">
            </div>

            <!-- Imagen 2 -->
            <div class="carousel-item">
              <img id="img2-pista" src="" class="d-block w-100" alt="Pista 2">
            </div>

            <!-- Imagen 3 -->
            <div class="carousel-item">
              <img id="img3-pista" src="" class="d-block w-100" alt="Pista 3">
            </div>

            <div class="carousel-item">
              <img id="img4-pista" src="" class="d-block w-100" alt="Pista 4">
            </div>

          </div>

          <!-- Controles del carrusel -->
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselPista" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselPista" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
          </button>

          <!-- Indicadores -->
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselPista" data-bs-slide-to="0" class="active" aria-current="true"></button>
            <button type="button" data-bs-target="#carouselPista" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carouselPista" data-bs-slide-to="2"></button>
            <button type="button" data-bs-target="#carouselPista" data-bs-slide-to="3"></button>
          </div>
        </div>

        <!-- Descripción -->


        <!-- Estados de Disponibilidad -->


        <!-- Calendario Visual -->
        <?php if (intval($instalacion["tipo_reserva"]) === 0) : ?>
          <div class="row mb-4">

            <div class="col-8">
              <label class="form-label fw-semibold mb-3" style="font-size: 18px; color: #555">
                <i class="bi bi-calendar text-info me-2"></i>Selecciona la fecha
              </label>
              <div class="calendario-container">
                <div class="calendario-header">
                  <button class="btn-mes" id="btnMesAnterior">
                    <i class="bi bi-chevron-left"></i>
                  </button>
                  <span class="calendario-mes" id="mesActual">Enero 2026</span>
                  <button class="btn-mes" id="btnMesSiguiente">
                    <i class="bi bi-chevron-right"></i>
                  </button>
                </div>

                <div class="calendario-dias-semana">
                  <div class="dia-semana">L</div>
                  <div class="dia-semana">M</div>
                  <div class="dia-semana">X</div>
                  <div class="dia-semana">J</div>
                  <div class="dia-semana">V</div>
                  <div class="dia-semana">S</div>
                  <div class="dia-semana">D</div>
                </div>

                <div class="calendario-dias" id="calendarioDias">
                  <!-- Los días se generarán con JavaScript -->
                </div>
              </div>
            </div>

            <!-- Selección de Horario -->
            <div class="col-4">
              <label class="form-label fw-semibold mb-3" style="font-size: 18px; color: #555">
                <i class="bi bi-clock text-info me-2"></i>Horarios disponibles
              </label>
              <div class="grid-horarios no-ver" id="grid-horas-disponibles">

              </div>
              <div id="no-hay-horario" class="no-ver"></div>
            </div>
          </div>
        <?php else : ?>

          <div class="row mb-4 d-flex justify-content-center">
            <div class="col-10">
              <label class="form-label fw-semibold mb-3" style="font-size: 18px; color: #555">
                <i class="bi bi-calendar text-info me-2"></i>Selecciona la fecha
              </label>
              <div class="calendario-container">
                <div class="calendario-header">
                  <button class="btn-mes" id="btnMesAnterior">
                    <i class="bi bi-chevron-left"></i>
                  </button>
                  <span class="calendario-mes" id="mesActual">Enero 2026</span>
                  <button class="btn-mes" id="btnMesSiguiente">
                    <i class="bi bi-chevron-right"></i>
                  </button>
                </div>

                <div class="calendario-dias-semana">
                  <div class="dia-semana">L</div>
                  <div class="dia-semana">M</div>
                  <div class="dia-semana">X</div>
                  <div class="dia-semana">J</div>
                  <div class="dia-semana">V</div>
                  <div class="dia-semana">S</div>
                  <div class="dia-semana">D</div>
                </div>

                <div class="calendario-dias" id="calendarioDias">
                  <!-- Los días se generarán con JavaScript -->
                </div>
              </div>
            </div>
          </div>
        <?php endif; ?>

        <?php $session = session(); ?>

        <div class="contenedor-usuarios-admin pb-4">

        </div>

        <!-- Precio -->
        <div class="card-precio mb-3 w-100">
          <div>
            <p class="text-muted small mb-1">Precio por hora</p>
            <h2 class="mb-0">
              <span class="fw-bold" id="precio-pista"></span>
              <span class="fs-5 text-secondary">€</span>
              <span class="fs-6 text-muted fw-normal">/hora</span>
            </h2>
          </div>

        </div>

        <!-- Mensaje de éxito -->
        <div class="alert alert-success d-none" id="mensajeExito" role="alert">
          <i class="bi bi-check-circle-fill me-2"></i>
          <span>¡Reserva realizada con éxito!</span>
        </div>

      </div>

      <!-- Footer -->
      <div class="modal-footer border-top">
        <button type="button" class="btn btn-info btn-lg w-100 text-white fw-semibold" id="btnConfirmarReserva" disabled>
          Confirmar reserva <i class="bi bi-arrow-right ms-2"></i>
        </button>
        <p class="text-center text-muted small w-100 mb-0 mt-2" id="mensajeSeleccion">
          Selecciona fecha y hora para continuar
        </p>
      </div>

    </div>
  </div>
</div>

<script>
  const tipo_reserva = <?= intval($instalacion["tipo_reserva"]) ?>

  // Variables globales
  let fechaSeleccionada = null;
  let horaSeleccionada = null;
  let mesActual = new Date().getMonth();
  let añoActual = new Date().getFullYear();

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Función para generar el calendario
  function generarCalendario() {
    const calendarioDias = document.getElementById('calendarioDias');
    const mesActualSpan = document.getElementById('mesActual');

    if (!calendarioDias || !mesActualSpan) return;

    calendarioDias.innerHTML = '';
    mesActualSpan.textContent = `${meses[mesActual]} ${añoActual}`;

    const primerDia = new Date(añoActual, mesActual, 1);
    const ultimoDia = new Date(añoActual, mesActual + 1, 0);
    const diasMes = ultimoDia.getDate();

    // Ajustar el día de la semana (0 = Domingo, queremos que 0 = Lunes)
    let diaSemana = primerDia.getDay();
    diaSemana = diaSemana === 0 ? 6 : diaSemana - 1;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Días del mes anterior
    const diasMesAnterior = new Date(añoActual, mesActual, 0).getDate();
    for (let i = diaSemana - 1; i >= 0; i--) {
      const dia = document.createElement('div');
      dia.className = 'dia-calendario otro-mes';
      dia.textContent = diasMesAnterior - i;
      calendarioDias.appendChild(dia);
    }

    // Días del mes actual
    for (let i = 1; i <= diasMes; i++) {
      const dia = document.createElement('div');
      const fechaDia = new Date(añoActual, mesActual, i);
      fechaDia.setHours(0, 0, 0, 0);

      dia.className = 'dia-calendario';
      dia.textContent = i;

      const year = fechaDia.getFullYear();
      const month = String(fechaDia.getMonth() + 1).padStart(2, '0');
      const day = String(fechaDia.getDate()).padStart(2, '0');

      dia.dataset.fecha = `${year}-${month}-${day}`;

      // Marcar día de hoy
      if (fechaDia.getTime() === hoy.getTime() && tipo_reserva === 0) {
        dia.classList.add('seleccionado');
      }

      if (fechaDia.getTime() === hoy.getTime() && tipo_reserva === 1) {
        dia.classList.add('disabled');
      }

      // Deshabilitar días pasados
      if (fechaDia < hoy) {
        dia.classList.add('disabled');
      }
      // NO agregamos addEventListener aquí - se manejará con jQuery

      calendarioDias.appendChild(dia);
    }

    // Completar con días del mes siguiente
    const diasRestantes = 42 - (diaSemana + diasMes);
    for (let i = 1; i <= diasRestantes; i++) {
      const dia = document.createElement('div');

      if (parseInt(tipo_reserva) === 0) {
        // Modo normal: días del siguiente mes no seleccionables
        dia.className = 'dia-calendario otro-mes';
        dia.textContent = i;
      } else {
        // Modo días completos: días del siguiente mes SÍ seleccionables
        const fechaDia = new Date(añoActual, mesActual + 1, i);
        fechaDia.setHours(0, 0, 0, 0);

        dia.className = 'dia-calendario';
        dia.textContent = i;

        const year = fechaDia.getFullYear();
        const month = String(fechaDia.getMonth() + 1).padStart(2, '0');
        const day = String(fechaDia.getDate()).padStart(2, '0');

        dia.dataset.fecha = `${year}-${month}-${day}`;

        // NO agregamos addEventListener aquí - se manejará con jQuery
      }

      calendarioDias.appendChild(dia);
    }
  }

  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    // Generar calendario inicial
    generarCalendario();

    // Navegación de meses
    const btnMesAnterior = document.getElementById('btnMesAnterior');
    const btnMesSiguiente = document.getElementById('btnMesSiguiente');

    if (btnMesAnterior) {
      btnMesAnterior.addEventListener('click', function() {
        if (mesActual === 0) {
          mesActual = 11;
          añoActual--;
        } else {
          mesActual--;
        }
        generarCalendario();
      });
    }

    if (btnMesSiguiente) {
      btnMesSiguiente.addEventListener('click', function() {
        if (mesActual === 11) {
          mesActual = 0;
          añoActual++;
        } else {
          mesActual++;
        }
        generarCalendario();
      });
    }

    // Resetear al cerrar
    const modalElement = document.getElementById('modalReservaPista');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', function() {
        fechaSeleccionada = null;
        horaSeleccionada = null;
        mesActual = new Date().getMonth();
        añoActual = new Date().getFullYear();
        generarCalendario();
        const mensajeExito = document.getElementById('mensajeExito');
        if (mensajeExito) {
          mensajeExito.classList.add('d-none');
        }
      });
    }
  });
</script>