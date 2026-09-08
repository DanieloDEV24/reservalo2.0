<section class="horario">
  <input type="hidden" name="" id="instalacion" value="<?= isset($id_instalacion) ? $id_instalacion : '' ?>">
  <div class="p-4 erroresHorario" role="alert" aria-live="assertive"></div>

  <header class="titulo-horario">
    <h1 class="title-page">Horario <?= isset($instalacion["nombre"]) ? $instalacion["nombre"] : '' ?></h1>
    <p class="description-page">Configura los horarios para la instalacion <?= isset($instalacion["nombre"]) ? $instalacion["nombre"] : '' ?> para cada temporada del año.</p>
  </header>

  <?php if( isset($instalacion["tipo_reserva"]) && intval($instalacion["tipo_reserva"]) === 0) : ?>
  <section class="ano-horario" aria-label="Selector de año y leyenda de horarios">

    <div class="container-year">
      <div class="div-ano">
        <button type="button" id="btn-previous-year" aria-label="Año anterior">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span id="anoActual"></span>
        <button type="button" id="btn-next-year" aria-label="Año siguiente">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      <div id="loaderAno" class="loader2" style="display: none;" aria-hidden="true"></div>
    </div>

    <div class="legend" role="list" aria-label="Leyenda de horarios">
      <div class="legend-item" role="listitem">
        <div class="legend-color color-selected"></div>
        <div class="legend-name">Seleccionado</div>
      </div>
      <div class="no-selected" role="list">
        <?php
          if(isset($horarios) && count($horarios) > 0)
          {
              foreach($horarios as $horario)
              {
                  ?>
                      <div class="legend-item" data-index="<?=$horario["id_tipo_horario"]?>" role="listitem">
                          <div class="legend-color" style="background-color: <?=$horario["color"]?>;"></div>
                          <div class='legend-name'><?=$horario["nombre"]?></div>
                      </div>
                  <?php
              }
          }
        ?>
      </div>
    </div>

  </section>

  <div style="position: relative; min-height: 70px;" class="contenedor-loader" id="contenedor-loader-horario">
    <div id="loaderCalendario" class="loader" style="display: none;" aria-hidden="true"></div>
    <div class="calendario" id="calendario" role="region" aria-label="Calendario de horarios de la instalación"></div>
  </div>

  <aside class="sidebar" id="sidebar" aria-label="Crear horario">
    <button type="button" id="btnCerraSidebarCrear" class="close-sidebar" aria-label="Cerrar panel de crear horario">✕</button>
    <div class="sidebar-header">
      <div style="display: flex; align-items: center; gap:10px; margin-bottom: 2%;">
        <div class="contenedor-iconos" aria-hidden="true"><i class="bi bi-calendar4-week"></i></div>
        <h2 id="sidebarTitleCrear">Crear horario</h2>
      </div>
      <p id="sidebarSubtitleCrear">Crear horarios para poder establecerselo a las instalaciones</p>
    </div>

    <div class="sidebar-content">
      <div style="position: relative; min-height: 70px;" class="contenedor-loader">
        <div id="loaderModalEditar" class="loader" style="display: none;" aria-hidden="true"></div>

        <form class="sidebarForm" onsubmit="return false;">
          <div class="row" style="margin-bottom: 7%;">
            <label for="nombreHorario" id="labelNombreHorario">
              Nombre del horario: <span class="campo-obligatorio">*</span>
            </label>
            <input type="text" id="nombreHorario" name="nombreHorario" class="form-control">
          </div>

          <div class="row" style="margin-bottom: 7%">
            <label for="descripcionHorario">Escriba una descripción <span class="campo-obligatorio">*</span></label>
            <textarea name="descripcionHorario" id="descripcionHorario" class="mr-3 ml-3"></textarea>
          </div>

          <div class="checkbox-wrapper-4 horarioEspecial">
            <input class="inp-cbx" id="horarioEspecial" type="checkbox">
            <label class="cbx" for="horarioEspecial">
              <span><svg width="20px" height="20px"></svg></span>
              <span>Horario especial (para días puntuales)</span>
            </label>
            <svg class="inline-svg">
              <symbol id="check-4" viewBox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </symbol>
            </svg>
          </div>

          <div class="info-text" id="infoText" role="status">
            💡 Selección de horarios especiales. Puede no seleccionar rango de fechas (días puntuales), o seleccionar rango de fechas (semanas...)
          </div>

          <div class="row" style="margin-bottom: 7%;">
            <label for="fechaInicioHorario">Seleccione el rango del horario</label>
            <div class="col-6">
              <label for="fechaInicioHorario">Inicio:</label>
              <input type="date" id="fechaInicioHorario" name="fechaInicioHorario" class="form-control">
            </div>
            <div class="col-6">
              <label for="fechaFinHorario">Fin:</label>
              <input type="date" id="fechaFinHorario" name="fechaFinHorario" class="form-control">
            </div>
          </div>

          <div class="checkbox-wrapper-4 horarioDistinto">
            <input class="inp-cbx" id="horarioDistinto" type="checkbox">
            <label class="cbx" for="horarioDistinto">
              <span><svg width="20px" height="20px"></svg></span>
              <span>Establecer un horario distinto para cada día</span>
            </label>
            <svg class="inline-svg">
              <symbol id="check-4" viewBox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </symbol>
            </svg>
          </div>

          <div class="seleccion-horas" style="margin-bottom: 7%;">
            <div class="row" style="margin-bottom: 7%;">
              <label for="horaInicioMananaHorario">Horario de mañana</label>
              <div class="col">
                <label for="horaInicioMananaHorario">Inicio:</label>
                <input type="time" id="horaInicioMananaHorario" name="horaInicioMananaHorario" class="form-control">
              </div>

              <div class="col">
                <label for="horaFinMananaHorario">Fin:</label>
                <input type="time" id="horaFinMananaHorario" name="horaFinMananaHorario" class="form-control">
              </div>
            </div>

            <div class="row" style="margin-bottom: 7%;">
              <label for="horaInicioTardeHorario">Horario de tarde</label>
              <div class="col">
                <label for="horaInicioTardeHorario">Inicio:</label>
                <input type="time" id="horaInicioTardeHorario" name="horaInicioTardeHorario" class="form-control">
              </div>
              <div class="col">
                <label for="horaFinTardeHorario">Fin:</label>
                <input type="time" id="horaFinTardeHorario" name="horaFinTardeHorario" class="form-control">
              </div>
            </div>
          </div>

          <div class="color-picker-section">
            <div class="color-picker-wrapper">
              <label class="color-picker-label" for="scheduleColor">Seleccione el color del horario</label>
              <input type="color" id="scheduleColor" value="#000">
              <span class="color-value" id="colorValue">#000000</span>
            </div>
          </div>

          <div style="display: flex; align-items: start; justify-content: start; gap: 2%; margin-bottom: 3%;">
            <div class="checkbox-wrapper-4 masInstalacionesCrear">
              <input class="inp-cbx" id="masInstalacionesCrear" type="checkbox">
              <label class="cbx" for="masInstalacionesCrear">
                <span><svg width="20px" height="20px"></svg></span>
                <span>Establecer este horario a otras instalaciones</span>
              </label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </div>
            <div id="loaderInstalaciones" class="loader2" style="display: none;" aria-hidden="true"></div>
          </div>
          <div class="contenedor-instalaciones"></div>

          <div class="button">
            <button type="button" class="btn-primary-personal" id="btnGuardarNuevoHorario">
              Crear horario
            </button>
          </div>
        </form>
      </div>
    </div>
  </aside>

  <aside class="sidebar" id="sidebarMenu" aria-label="Menú de horarios">
    <button type="button" id="btnCerraSidebarMenu" class="close-sidebar" aria-label="Cerrar menú de horarios">✕</button>
    <div class="sidebar-header">
      <div style="display: flex; align-items: center; gap:10px; margin-bottom: 2%;">
        <div class="contenedor-iconos" aria-hidden="true"><i class="bi bi-list"></i></div>
        <h2 id="sidebarTitleMenu">Menú de horarios</h2>
      </div>
      <p id="sidebarSubtitleMenu">Gestiona los horarios creados para la instalación</p>
    </div>
    <div class="sidebar-content">
      <div style="position: relative; min-height: 70px;" class="contenedor-loader">
        <div id="loaderMenuHorarios" class="loader" style="display: none;" aria-hidden="true"></div>
        <div class="menu-content" style="width: 100%;"></div>
      </div>
    </div>
  </aside>

  <aside class="sidebar" id="sidebar-cambio-horario" aria-label="Cambio de horario">
    <button type="button" id="btnCerraSidebarCambio" class="close-sidebar" aria-label="Cerrar panel de cambio de horario">✕</button>

    <div class="sidebar-header">
      <div style="display: flex; align-items: center; gap:10px; margin-bottom: 2%;">
        <div class="contenedor-iconos" aria-hidden="true"><i class="bi bi-calendar4-week"></i></div>
        <h2 id="sidebarTitleCambio">Cambio de horario</h2>
      </div>
      <p id="sidebarSubtitleCambio">
        Días seleccionados: <span id="dias-seleccionados"></span>
      </p>
    </div>

    <div class="sidebar-content">
      <div style="position: relative; min-height: 70px;" class="contenedor-loader">
        <div id="loaderSidebarCambioHorario" class="loader" style="display: none;" aria-hidden="true"></div>

        <div class="sidebar-body" style="width: 100%;">

          <p class="seleccion-horario-nuevo">
            Seleccione el horario que desea establecer en dichas fechas
          </p>

          <div class="contenedor-cambio-horarios-card" style="width: 100%;"></div>

          <div style="display: flex; align-items: start; justify-content: start; gap: 2%; margin-bottom: 3%;">
            <div class="checkbox-wrapper-4 masInstalacionesCambiar">
              <input class="inp-cbx" id="masInstalacionesCambiar" type="checkbox" disabled>
              <label class="cbx" for="masInstalacionesCambiar">
                <span><svg width="20px" height="20px"></svg></span>
                <span>Establecer este horario a otras instalaciones</span>
              </label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </div>
            <div id="loaderInstalacionesCambiar" class="loader2" style="display: none;" aria-hidden="true"></div>
          </div>
          <div class="contenedor-instalaciones"></div>

        </div>
      </div>
    </div>

    <div class="sidebar-footer">
      <div class="content-confirmar-cambio">
        <div class="horarios-old"></div>
        <div class="flecha-horarios">
          <i class="bi bi-arrow-right" aria-hidden="true"></i>
        </div>
        <div class="horarios-new"></div>
      </div>
    </div>

    <div class="button div-btn-cambio-horario" style="width: 100%; padding-top: 3%">
      <button type="button"
              id="btn-guardar-cambio-seleccion"
              style="width: 100%"
              class="btn-primary-personal btn-primary-personal-disabled">
        Cambiar Horario
      </button>
    </div>
  </aside>

  <nav class="div-button" aria-label="Acciones sobre horarios">
      <a href="" id="btnCrearHorario" class="btn-primary-personal" style="width: 23%;">Crear horario<i class="bi bi-plus-circle" aria-hidden="true"></i></a>
      <a href="" id="btnMenuHorario" class="btn-primary-personal" style="width: 23%;">Menú de horarios<i class="bi bi-list" aria-hidden="true"></i></a>
  </nav>

  <?php else : ?>
  <section class="container-no-horarios">

    <div class="content-card">
      <div class="icon-container" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2>Esta instalación se reserva por días</h2>
      <p class="message">
        Esta instalación está configurada como instalación que se reserva por días, sin horario específico. Para poder asignar horarios, debes ir al gestor de instalaciones y editar esta propiedad de la instalación.
      </p>
    </div>
  </section>
  <?php endif ; ?>
</section>


<?=isset($modalEditar) ? $modalEditar : ''?>
<?=isset($modalBorrar) ? $modalBorrar : ''?>
<?=isset($modalHorarioExistente) ? $modalHorarioExistente : ''?>
<?=isset($modalCambioHorario) ? $modalCambioHorario : ''?>
<?=isset($modalSinFechaHorario) ? $modalSinFechaHorario : '' ?>