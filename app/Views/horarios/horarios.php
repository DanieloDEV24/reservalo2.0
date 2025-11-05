<div class="horario">
<input type="hidden" name="" id="instalacion" value="<?=$id_instalacion?>">
<div class="p-4 erroresHorario">

</div>

    <div class="titulo-horario">
        <h1 class="title-page">Horario <?= $instalacion["nombre"] ?></h1>
        <p class="description-page">Configura los horarios para la instalacion <?= $instalacion["nombre"] ?> para cada temporada del año.</p>
    </div>

    <div class="ano-horario">

        <div class="div-ano">
            <button id="btn-previous-year">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <span id="anoActual">2025</span>
            <button id="btn-next-year">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>

        <div class="legend">
            <div class="legend-item">
                <div class="legend-color color-selected"></div>
                <span>Seleccionado</span>
            </div>

            <?php
                    if(isset($horarios) && count($horarios) > 0)
                    {
                        foreach($horarios as $horario)
                        {
                            ?>
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: <?=$horario["color"]?>;"></div>
                                    <span><?=$horario["nombre"]?></span>
                                </div>
                            <?php
                        }
                    }
                ?>

        </div>

    </div>

    <div class="calendario" id="calendario"></div>

    <div class="sidebar" id="sidebar">
        <button id="btnCerraSidebarCrear" class="close-sidebar">✕</button>
        <div class="sidebar-header">
            <div style="display: flex; align-items: center; gap:10px; margin-bottom: 2%;">
                <div class="contenedor-iconos"><i class="bi bi-calendar4-week"></i></div>
                <h2 id="sidebarTitle1">Crear horario</h2>
            </div>
            <p id="sidebarSubtitle1">Crear horarios para poder establecerselo a las instalaciones</p>
        </div>
        <div class="sidebar-content">
            <div class="sidebarForm">
                <div class="row" style="margin-bottom: 7%;">
                    <label for="nombreHorario" id="labelNombreHorario">Nombre del horario: <span class="campo-obligatorio">*</span></label>
                    <input type="text" id="nombreHorario" name="nombreHorario" class="form-control">
                </div>

                <div class="row" style="margin-bottom: 7%">
                    <label for="descripcionHorario">Escriba una descripcion <span class="campo-obligatorio">*</span></label>
                    <textarea name="descripcionHorario" id="descripcionHorario" class="mr-3 ml-3"></textarea>
                </div>

                <div class="checkbox-wrapper-4 horarioEspecial">
              <input class="inp-cbx" id="horarioEspecial" type="checkbox">
              <label class="cbx" for="horarioEspecial"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>Horario especial (para días puntuales)</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </div>

            <div class="info-text" id="infoText">
                💡 Selección de horarios especiales. Puede no seleccionar rango de fechas (días puntuales), o seleccionar rango de fechas (semanas...)
            </div>

                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Seleccione el rango del horario</label>
                    <div class="col-6">
                        <label for="fechaInicio">Inicio:</label>
                        <input type="date" id="fechaInicioHorario" name="fechaInicioHorario" class="form-control">
                    </div>

                    <div class="col-6">
                        <label for="fechaFin">Fin:</label>
                        <input type="date" id="fechaFinHorario" name="fechaFinHorario" class="form-control">
                    </div>
                </div>
                <div class="checkbox-wrapper-4 horarioDistinto">
              <input class="inp-cbx" id="horarioDistinto" type="checkbox">
              <label class="cbx" for="horarioDistinto"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>Establecer un horario distinto para cada día</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </div>

                <div class="seleccion-horas" style="margin-bottom: 7%;">
                    <div class="row" style="margin-bottom: 7%;">
                        <label for="">Horario de mañana</label>
                        <div class="col"><label for="horaInicioMananaHorario">Inicio:</label>
                            <input type="time" id="horaInicioMananaHorario" name="horaInicioMananaHorario" class="form-control">
                        </div>

                        <div class="col"><label for="horaFinMananaHorario">Fin:</label>
                            <input type="time" id="horaFinMananaHorario" name="horaFinMananaHorario" class="form-control">
                        </div>
                    </div>


                    <div class="row" style="margin-bottom: 7%;">
                        <label for="">Horario de tarde</label>
                        <div class="col"><label for="horaInicioTardeHorario">Inicio:</label>
                            <input type="time" id="horaInicioTardeHorario" name="horaInicioTardeHorario" class="form-control">
                        </div>
                        <div class="col"><label for="horaFinTardeHorario">Fin:</label>
                            <input type="time" id="horaFinTardeHorario" name="horaFinTardeHorario" class="form-control">
                        </div>
                    </div>

                </div>

                <div class="color-picker-section">
      <div class="color-picker-wrapper">
        <span class="color-picker-label">Seleccione el color del horario</span>
        <input type="color" id="scheduleColor" value="#000">
        <span class="color-value" id="colorValue">#000000</span>
      </div>
    </div>

                <div class="button">
                    <a href="#" class="btn-primary-personal" id="btnGuardarNuevoHorario">Crear horario</a>
                </div>
            </div>
        </div>
    </div>




    <div class="sidebar" id="sidebarMenu">
        <button id="btnCerraSidebarMenu" class="close-sidebar">✕</button>
        <div class="sidebar-header">
            <div style="display: flex; align-items: center; gap:10px; margin-bottom: 2%;">
                <div class="contenedor-iconos"><i class="bi bi-list"></i></div>
                <h2 id="sidebarTitle1">Menú de horarios</h2>
            </div>
            <p id="sidebarSubtitle1">Gestiona los horarios creados para la instalación</p>
        </div>
        <div class="sidebar-content">
            <div class="menu-content">
                <?php
                if (isset($horarios) && count($horarios) > 0) {
                ?>
                    <p class="tipo-horarios">Horarios normales</p>
                    <?php foreach($horarios as $horario): ?>
                        <div data-index="<?=$horario["id_tipo_horario"]?>" style="background-color: <?=$horario["color"]?>20; color: <?=$horario["color"]?>; border: 2px solid <?=$horario["color"]?>90" class="card-menu-horarios">
                            <span><?=$horario["nombre"]?></span>
                            <div class="fechas">
                                <?php
                                    $fecha_inicio = DateTime::createFromFormat('Y-m-d', $horario["fecha_inicio"]);
                                    $fecha_fin = DateTime::createFromFormat('Y-m-d', $horario["fecha_fin"]);

                                    echo $fecha_inicio->format('d/m/Y').' - '.$fecha_fin->format('d/m/Y'); 
                                ?>
                            </div>

                            <div class="descripcion">
                                <?=$horario["descripcion"]?>
                            </div>

                            <div class="dropdown opciones-horario" style="max-width: 200px;">
                                <a href="#" class="opciones-horario-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: <?=$horario["color"]?>;"><i class="bi bi-three-dots-vertical"></i></a>
                                <ul class="dropdown-menu">
                                    <li><a href="" class="btnEditarHorario"><i class="bi bi-pencil"></i>&nbsp;&nbsp;Editar</a></li>
                                    <li><a href="" class="delete-option"><i class="bi bi-trash3"></i>&nbsp;&nbsp;Eliminar</a></li>
                                </ul>
                            </div>
                        </div>
                    <?php endforeach;?>
                    
                <?php    
                }
                ?>
                </div>
        </div>
    </div>




    <div class="div-button">
        <a href="" id="btnCrearHorario" class="btn-primary-personal" style="width: 23%;">Crear horario<i class="bi bi-plus-circle"></i></a>
        <a href="" id="btnMenuHorario" class="btn-primary-personal" style="width: 23%;">Menú de horarios<i class="bi bi-list"></i></a>
    </div>
</div>

<?=$modalEditar?>