<div class="modal" tabindex="-1" id="modalCambioHorario" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
  <input type="hidden" name="diaSeleccionado" id="diaSeleccionado" value="">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Día sin Horario Asignado &nbsp;<i class="bi bi-calendar-x"></i></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div style="position: relative; min-height: 70px;" class="contenedor-loader">
        <div id="loaderModalDiaSinHorario" class="loader" style="display: none;"></div>
        <div class="modal-body">
          <div class="iconoModal">
            <div>
              <i class="bi bi-exclamation-circle" style="color: #32cccc; transform: translateY(1px);"></i>
            </div>
          </div>
          <div class="contenedor-mensaje">
            <div class="mensaje-dia-sin-horario">
              <p style="font-weight: 700; text-align: center;">El día seleccionado no tiene un horario asignado</p>
              <p style="text-align: center; color: #666; font-size: 1rem; margin-top: 10px;">
                Puedes continuar con el cambio de horario o cerrarlo para asignar un horario a este día.
              </p>
            </div>
          </div>
          <div class="btns-acciones" style="display: flex; justify-content: center; gap: 15px; margin-top: 25px; flex-wrap: wrap;">
            <button class="btn-secondary-personal" data-bs-dismiss="modal" aria-label="Continuar" style="width: 69%;">
              <i class="bi bi-arrow-return-left"></i> Continuar
            </button>
            <button class="btn-primary-personal" id="btnAsignarHorario" aria-label="Asignar horario" style="width: 69%;"> 
              <i class="bi bi-calendar-plus"></i> Asignar horario a este día
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .iconoModal {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .iconoModal i {
    font-size: 4rem;
  }
  
  @media (max-width: 576px) {
    .btns-acciones {
      flex-direction: column;
    }
    
    .btns-acciones button {
      width: 100%;
    }
  }
</style>

<script>
  // Ejemplo de uso del modal
  document.addEventListener('DOMContentLoaded', function() {
    
    // Botón para cerrar el menú de horarios
    const btnCerrarMenu = document.getElementById('btnCerrarMenuHorario');
    if (btnCerrarMenu) {
      btnCerrarMenu.addEventListener('click', function() {
        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalDiaSinHorario'));
        if (modal) {
          modal.hide();
        }
        
        // Aquí añades la lógica para cerrar el menú de cambio de horario
        console.log('Cerrando menú de cambio de horario...');
        // Por ejemplo: cerrarMenuCambioHorario();
      });
    }
    
    // Botón para asignar horario al día
    const btnAsignarHorario = document.getElementById('btnAsignarHorario');
    if (btnAsignarHorario) {
      btnAsignarHorario.addEventListener('click', function() {
        // Obtener el día seleccionado
        const diaSeleccionado = document.getElementById('diaSeleccionado').value;
        
        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalDiaSinHorario'));
        if (modal) {
          modal.hide();
        }
        
        // Aquí añades la lógica para abrir el formulario de asignación de horario
        console.log('Asignando horario al día:', diaSeleccionado);
        // Por ejemplo: abrirFormularioAsignarHorario(diaSeleccionado);
      });
    }
  });
</script>