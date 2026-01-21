<div class="modal fade" tabindex="-1" id="modalReservaPista" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <input type="hidden" id="pistaId" >
      <!-- Header -->
      <div class="modal-header border-bottom">
        <div>
          <span class="badge bg-info text-white mb-2">deporte</span>
          <h5 class="modal-title fw-bold mb-1" id="nombre-pista"></h5>
          <p class="text-muted mb-0 small">
            <i class="bi bi-people"></i> <span id="capacidad-pista"></span>
          </p>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        
        <!-- Carrusel de Imágenes -->
        <div id="carouselPista" class="carousel slide mb-4" data-bs-ride="carousel">
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
              <img id="img4-pista" src="" class="d-block w-100" alt="Pista 3">
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
          </div>
        </div>

        <!-- Descripción -->
        

        <!-- Estados de Disponibilidad -->
        

        <!-- Calendario Visual -->
        <div class="mb-4">
          <label class="form-label fw-semibold mb-3">
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
        <div class="mb-4">
          <label class="form-label fw-semibold mb-3">
            <i class="bi bi-clock text-info me-2"></i>Horarios disponibles
          </label>
          <div class="grid-horarios">
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="09:00">09:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="10:00">10:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="11:00">11:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="12:00">12:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="13:00">13:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="14:00">14:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="15:00">15:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="16:00">16:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="17:00">17:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="18:00">18:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="19:00">19:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="20:00">20:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="21:00">21:00</button>
            <button type="button" class="btn btn-outline-secondary btn-horario" data-hora="22:00">22:00</button>
          </div>
        </div>

        <!-- Precio -->
        <div class="card-precio mb-3">
          <p class="text-muted small mb-1">Precio por hora</p>
          <h2 class="mb-0">
            <span class="fw-bold">28</span>
            <span class="fs-5 text-secondary">€</span>
            <span class="fs-6 text-muted fw-normal">/hora</span>
          </h2>
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
// Variables globales
let fechaSeleccionada = null;
let horaSeleccionada = null;
let mesActual = new Date().getMonth();
let añoActual = new Date().getFullYear();

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
               'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

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
    dia.dataset.fecha = fechaDia.toISOString().split('T')[0];

    // Marcar día de hoy
    if (fechaDia.getTime() === hoy.getTime()) {
      dia.classList.add('hoy');
    }

    // Deshabilitar días pasados
    if (fechaDia < hoy) {
      dia.classList.add('disabled');
    } else {
      dia.addEventListener('click', function() {
        document.querySelectorAll('.dia-calendario').forEach(d => {
          d.classList.remove('seleccionado');
        });
        this.classList.add('seleccionado');
        fechaSeleccionada = this.dataset.fecha;
        validarFormulario();
      });
    }

    calendarioDias.appendChild(dia);
  }

  // Completar con días del mes siguiente
  const diasRestantes = 42 - (diaSemana + diasMes);
  for (let i = 1; i <= diasRestantes; i++) {
    const dia = document.createElement('div');
    dia.className = 'dia-calendario otro-mes';
    dia.textContent = i;
    calendarioDias.appendChild(dia);
  }
}

// Validar formulario
function validarFormulario() {
  const btnConfirmar = document.getElementById('btnConfirmarReserva');
  const mensajeSeleccion = document.getElementById('mensajeSeleccion');
  
  if (!btnConfirmar || !mensajeSeleccion) return;
  
  if (fechaSeleccionada && horaSeleccionada) {
    btnConfirmar.disabled = false;
    mensajeSeleccion.style.display = 'none';
  } else {
    btnConfirmar.disabled = true;
    mensajeSeleccion.style.display = 'block';
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

  // Manejo de selección de horario
  const botonesHorario = document.querySelectorAll('.btn-horario');
  botonesHorario.forEach(btn => {
    btn.addEventListener('click', function() {
      botonesHorario.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      horaSeleccionada = this.dataset.hora;
      validarFormulario();
    });
  });

  // Confirmar reserva
  const btnConfirmar = document.getElementById('btnConfirmarReserva');
  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', function() {
      const mensajeExito = document.getElementById('mensajeExito');
      if (mensajeExito) {
        mensajeExito.classList.remove('d-none');
        
        console.log('Reserva confirmada:', {
          pistaId: document.getElementById('pistaId').value,
          fecha: fechaSeleccionada,
          hora: horaSeleccionada
        });

        setTimeout(() => {
          mensajeExito.classList.add('d-none');
          const modal = bootstrap.Modal.getInstance(document.getElementById('modalReservaPista'));
          if (modal) modal.hide();
        }, 3000);
      }
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
      botonesHorario.forEach(b => b.classList.remove('active'));
      const mensajeExito = document.getElementById('mensajeExito');
      if (mensajeExito) {
        mensajeExito.classList.add('d-none');
      }
      validarFormulario();
    });
  }
});
</script>