/*****************************************************************************************************************************************
******************************************************************** HORARIOS ************************************************************ 
******************************************************************************************************************************************/
/*****************************************************************************************************************************************
 * En este archivo, generaremos el calendario del año para generar horarios, crear horarios, modificarlos... : 
 * Creación del calendario --> Creación del calendario dinamico de este año y el siguiente, podiendo de esta manera generar sus horarios
********************************************************************************************************************************************/
$(document).ready(() => {

    // Contenedor donde va cambiado los campos para la selección de horas
    let contenedor = $('.seleccion-horas');

    // Campos en los que las horas no cambian según el día
    let igualNode = $(`
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
        `)

    // Campos en los que la hora si cambia dependiendo del día
    let diferentesNode = $(`

                
                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Lunes</label>
                    <div class="col"><label for="horaInicioMananaLunesHorario">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaLunesHorario" name="horaInicioMananaLunesHorario" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaLunesHorario">Fin mañana:</label>
                        <input type="time" id="horaFinMananaLunesHorario" name="horaFinMananaLunesHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeLunesHorario">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeLunesHorario" name="horaInicioTardeLunesHorario" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeLunesHorario">Fin tarde:</label>
                        <input type="time" id="horaFinTardeLunesHorario" name="horaFinTardeLunesHorario" class="form-control">
                    </div>
                </div>

                
                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Martes</label>
                    <div class="col"><label for="horaInicioMananaMartesHorario">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaMartesHorario" name="horaInicioMananaMartesHorario" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaMartesHorario">Fin mañana:</label>
                        <input type="time" id="horaFinMananaMartesHorario" name="horaFinMananaMartesHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeMartesHorario">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeMartesHorario" name="horaInicioTardeMartesHorario" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeMartesHorario">Fin tarde:</label>
                        <input type="time" id="horaFinTardeMartesHorario" name="horaFinTardeMartesHorario" class="form-control">
                    </div>
                </div>

                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Miércoles</label>
                    <div class="col"><label for="horaInicioMananaMiercolesHorario">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaMiercolesHorario" name="horaInicioMananaMiercolesHorario" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaMiercolesHorario">Fin mañana:</label>
                        <input type="time" id="horaFinMananaMiercolesHorario" name="horaFinMananaMiercolesHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeMiercolesHorario">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeMiercolesHorario" name="horaInicioTardeMiercolesHorario" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeMiercolesHorario">Fin tarde:</label>
                        <input type="time" id="horaFinTardeMiercolesHorario" name="horaFinTardeMiercolesHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Jueves</label>
                    <div class="col"><label for="horaInicioMananaJuevesHorario">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaJuevesHorario" name="horaInicioMananaJuevesHorario" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaJuevesHorario">Fin mañana:</label>
                        <input type="time" id="horaFinMananaJuevesHorario" name="horaFinMananaJuevesHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeJuevesHorario">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeJuevesHorario" name="horaInicioTardeJuevesHorario" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeJuevesHorario">Fin tarde:</label>
                        <input type="time" id="horaFinTardeJuevesHorario" name="horaFinTardeJuevesHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Viernes</label>
                    <div class="col"><label for="horaInicioMananaViernesHorario">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaViernesHorario" name="horaInicioMananaViernesHorario" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaViernesHorario">Fin mañana:</label>
                        <input type="time" id="horaFinMananaViernesHorario" name="horaFinMananaViernesHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeViernesHorario">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeViernesHorario" name="horaInicioTardeViernesHorario" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeViernesHorario">Fin tarde:</label>
                        <input type="time" id="horaFinTardeViernesHorario" name="horaFinTardeViernesHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Sábado</label>
                    <div class="col"><label for="horaInicioMananaSabadoHorario">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaSabadoHorario" name="horaInicioMananaSabadoHorario" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaSabadoHorario">Fin mañana:</label>
                        <input type="time" id="horaFinMananaSabadoHorario" name="horaFinMananaSabadoHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeSabadoHorario">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeSabadoHorario" name="horaInicioTardeSabadoHorario" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeSabadoHorario">Fin tarde:</label>
                        <input type="time" id="horaFinTardeSabadoHorario" name="horaFinTardeSabadoHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Domingo</label>
                    <div class="col"><label for="horaInicioMananaDomingoHorario">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaDomingoHorario" name="horaInicioMananaDomingoHorario" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaDomingoHorario">Fin mañana:</label>
                        <input type="time" id="horaFinMananaDomingoHorario" name="horaFinMananaDomingoHorario" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeDomingoHorario">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeDomingoHorario" name="horaInicioTardeDomingoHorario" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeDomingoHorario">Fin tarde:</label>
                        <input type="time" id="horaFinTardeDomingoHorario" name="horaFinTardeDomingoHorario" class="form-control">
                    </div>
                </div>
        `)

    // Campos en los que las horas no cambian según el día
    let igualNodeEditar = $(`
                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario de mañana</label>
                    <div class="col"><label for="horaInicioMananaHorarioEditar">Inicio:</label>
                        <input type="time" id="horaInicioMananaHorarioEditar" name="horaInicioMananaHorarioEditar" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaHorarioEditar">Fin:</label>
                        <input type="time" id="horaFinMananaHorarioEditar" name="horaFinMananaHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario de tarde</label>
                    <div class="col"><label for="horaInicioTardeHorarioEditar">Inicio:</label>
                        <input type="time" id="horaInicioTardeHorarioEditar" name="horaInicioTardeHorarioEditar" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeHorarioEditar">Fin:</label>
                        <input type="time" id="horaFinTardeHorarioEditar" name="horaFinTardeHorarioEditar" class="form-control">
                    </div>
                </div>
        `)

    // Campos en los que la hora si cambia dependiendo del día
    let diferentesNodeEditar = $(`

                
                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Lunes</label>
                    <div class="col"><label for="horaInicioMananaLunesHorarioEditar">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaLunesHorarioEditar" name="horaInicioMananaLunesHorarioEditar" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaLunesHorarioEditar">Fin mañana:</label>
                        <input type="time" id="horaFinMananaLunesHorarioEditar" name="horaFinMananaLunesHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeLunesHorarioEditar">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeLunesHorarioEditar" name="horaInicioTardeLunesHorarioEditar" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeLunesHorarioEditar">Fin tarde:</label>
                        <input type="time" id="horaFinTardeLunesHorarioEditar" name="horaFinTardeLunesHorarioEditar" class="form-control">
                    </div>
                </div>

                
                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Martes</label>
                    <div class="col"><label for="horaInicioMananaMartesHorarioEditar">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaMartesHorarioEditar" name="horaInicioMananaMartesHorarioEditar" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaMartesHorarioEditar">Fin mañana:</label>
                        <input type="time" id="horaFinMananaMartesHorarioEditar" name="horaFinMananaMartesHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeMartesHorarioEditar">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeMartesHorarioEditar" name="horaInicioTardeMartesHorarioEditar" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeMartesHorarioEditar">Fin tarde:</label>
                        <input type="time" id="horaFinTardeMartesHorarioEditar" name="horaFinTardeMartesHorarioEditar" class="form-control">
                    </div>
                </div>

                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Miércoles</label>
                    <div class="col"><label for="horaInicioMananaMiercolesHorarioEditar">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaMiercolesHorarioEditar" name="horaInicioMananaMiercolesHorarioEditar" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaMiercolesHorarioEditar">Fin mañana:</label>
                        <input type="time" id="horaFinMananaMiercolesHorarioEditar" name="horaFinMananaMiercolesHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeMiercolesHorarioEditar">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeMiercolesHorarioEditar" name="horaInicioTardeMiercolesHorarioEditar" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeMiercolesHorarioEditar">Fin tarde:</label>
                        <input type="time" id="horaFinTardeMiercolesHorarioEditar" name="horaFinTardeMiercolesHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Jueves</label>
                    <div class="col"><label for="horaInicioMananaJuevesHorarioEditar">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaJuevesHorarioEditar" name="horaInicioMananaJuevesHorarioEditar" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaJuevesHorarioEditar">Fin mañana:</label>
                        <input type="time" id="horaFinMananaJuevesHorarioEditar" name="horaFinMananaJuevesHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeJuevesHorarioEditar">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeJuevesHorarioEditar" name="horaInicioTardeJuevesHorarioEditar" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeJuevesHorarioEditar">Fin tarde:</label>
                        <input type="time" id="horaFinTardeJuevesHorarioEditar" name="horaFinTardeJuevesHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Viernes</label>
                    <div class="col"><label for="horaInicioMananaViernesHorarioEditar">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaViernesHorarioEditar" name="horaInicioMananaViernesHorarioEditar" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaViernesHorarioEditar">Fin mañana:</label>
                        <input type="time" id="horaFinMananaViernesHorarioEditar" name="horaFinMananaViernesHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeViernesHorarioEditar">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeViernesHorarioEditar" name="horaInicioTardeViernesHorarioEditar" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeViernesHorarioEditar">Fin tarde:</label>
                        <input type="time" id="horaFinTardeViernesHorarioEditar" name="horaFinTardeViernesHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Sábado</label>
                    <div class="col"><label for="horaInicioMananaSabadoHorarioEditar">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaSabadoHorarioEditar" name="horaInicioMananaSabadoHorarioEditar" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaSabadoHorarioEditar">Fin mañana:</label>
                        <input type="time" id="horaFinMananaSabadoHorarioEditar" name="horaFinMananaSabadoHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeSabadoHorarioEditar">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeSabadoHorarioEditar" name="horaInicioTardeSabadoHorarioEditar" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeSabadoHorarioEditar">Fin tarde:</label>
                        <input type="time" id="horaFinTardeSabadoHorarioEditar" name="horaFinTardeSabadoHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    <label for="">Horario del Domingo</label>
                    <div class="col"><label for="horaInicioMananaDomingoHorarioEditar">Inicio mañana:</label>
                        <input type="time" id="horaInicioMananaDomingoHorarioEditar" name="horaInicioMananaDomingoHorarioEditar" class="form-control">
                    </div>

                    <div class="col"><label for="horaFinMananaDomingoHorarioEditar">Fin mañana:</label>
                        <input type="time" id="horaFinMananaDomingoHorarioEditar" name="horaFinMananaDomingoHorarioEditar" class="form-control">
                    </div>
                </div>


                <div class="row" style="margin-bottom: 7%;">
                    
                    <div class="col"><label for="horaInicioTardeDomingoHorarioEditar">Inicio tarde:</label>
                        <input type="time" id="horaInicioTardeDomingoHorarioEditar" name="horaInicioTardeDomingoHorarioEditar" class="form-control">
                    </div>
                    <div class="col"><label for="horaFinTardeDomingoHorarioEditar">Fin tarde:</label>
                        <input type="time" id="horaFinTardeDomingoHorarioEditar" name="horaFinTardeDomingoHorarioEditar" class="form-control">
                    </div>
                </div>
        `)

    // Ponemos el año actual
    $('#anoActual').text(new Date().getFullYear());

    // Al abrir la página de horarios, generamos el calendario del año actual 
    generarCalendario($('#anoActual').text());

    /***********************************************************************************************************************************
    ********************************************************  SELECCIÓN DE AÑO *********************************************************
    ***********************************************************************************************************************************/

    // Función en la que cambiamos al calendario del año siguiente
    $(document).on('click', '#btn-next-year', function () {

        let spanYear = ""
        spanYear = parseInt($('#anoActual').text())
        let currentYear = new Date().getFullYear(); // --> Año actual
        let newYear = (spanYear === "") ? currentYear + 1 : spanYear + 1 // --> Año siguiente


        // De esta manera solo podemos mostrar hasta un año más es decir, si estamos en 2025, solo podemos mostrar hasta 2026
        if (newYear > (currentYear + 1)) {
            return
        }
        else {

            $.ajax({
                type: "POST",
                url: "../comprobarHorariosAno",
                data: { year: newYear, instalacion: $('#instalacion').val() },
                dataType: "JSON",
                beforeSend: function () {
                    $('#loaderAno').show();
                    $('#anoActual').addClass('loading');
                    $('.legend-name').addClass('loading');
                    $('.legend-color').addClass('loading');
                    $('.div-mes h3').addClass('loading');
                    $('.div-mes .grid-dias-mes').addClass('loading');
                    $('.div-mes .grid-nombres-mes').addClass('loading');
                },
                success: function (response) {
                    $('.legend .no-selected').empty();
                    response.horarios.map(horario => {
                        let color = `<div class='legend-color' data-index='${horario.id_tipo_horario}' style='background-color: ${horario.color};'></div>`
                        let nombre = `<div class='legend-name'>${horario.nombre}</div>`
                        $('.legend .no-selected').append(`<div class='legend-item'>${color}${nombre}</div>`)
                    })

                    $('#anoActual').text(newYear); // --> Mostramos el año en el texto
                    generarCalendario(newYear)
                }, 
                complete: function () {
                    $('#loaderAno').hide();
                    $('#anoActual').removeClass('loading');
                    $('.legend-name').removeClass('loading');
                    $('.legend-color').removeClass('loading');
                    $('.div-mes h3').removeClass('loading');
                    $('.div-mes .grid-dias-mes').removeClass('loading');
                    $('.div-mes .grid-nombres-mes').removeClass('loading');
                }
            });
        }


    })

    // Función en la que cambiamos al calendario del año pasado
    $(document).on('click', '#btn-previous-year', function () {

        let spanYear = ""
        spanYear = parseInt($('#anoActual').text())
        let currentYear = new Date().getFullYear(); // --> Año actual
        let newYear = (spanYear === "") ? currentYear - 1 : spanYear - 1 // --> Año siguiente

        console.log(currentYear)

        // De esta manera solo podemos mostrar hasta un año menos es decir, si estamos en 2025, solo podemos mostrar hasta 2024
        if (newYear < (currentYear - 1)) {
            return
        }
        else {

            $.ajax({
                type: "POST",
                url: "../comprobarHorariosAno",
                data: { year: newYear, instalacion: $('#instalacion').val() },
                dataType: "JSON",
                beforeSend: function () {
                    $('#loaderAno').show();
                    $('#anoActual').addClass('loading');
                    $('.legend-name').addClass('loading');
                    $('.legend-color').addClass('loading');
                    $('.div-mes h3').addClass('loading');
                    $('.div-mes .grid-dias-mes').addClass('loading');
                    $('.div-mes .grid-nombres-mes').addClass('loading');
                },
                success: function (response) {
                    $('.legend .no-selected').empty();
                    response.horarios.map(horario => {
                        let color = `<div class='legend-color' data-index='${horario.id_tipo_horario}' style='background-color: ${horario.color};'></div>`
                        let nombre = `<div class='legend-name'>${horario.nombre}</div>`
                        $('.legend .no-selected').append(`<div class='legend-item'>${color}${nombre}</div>`)
                    })

                    $('#anoActual').text(newYear); // --> Mostramos el año en el texto
                    generarCalendario(newYear)
                }, 
                complete: function () {
                    $('#loaderAno').hide();
                    $('#anoActual').removeClass('loading');
                    $('.legend-name').removeClass('loading');
                    $('.legend-color').removeClass('loading');
                    $('.div-mes h3').removeClass('loading');
                    $('.div-mes .grid-dias-mes').removeClass('loading');
                    $('.div-mes .grid-nombres-mes').removeClass('loading');
                }
            });
        }
    })


    /***********************************************************************************************************************************
    ************************************************************  CREAR HORARIO  *******************************************************
    ***********************************************************************************************************************************/

    // Función el que abrimos el sidebar (menú lateral) para crear un nuevo horario
    $(document).on('click', '#btnCrearHorario', function (e) {

        e.preventDefault()

        $('#sidebar').addClass('active'); // --> Mostramos el sidebar
        $('#sidebarMenu').removeClass('active'); // --> Ocultamos el sidebar del menú de horarios
    })


    // Función con la que cerramos el sidebar (menú lateral) para crear un nuevo horario
    $(document).on('click', '#btnCerraSidebarCrear', function (e) {

        e.preventDefault()

        $('#sidebar').removeClass('active'); // --> Desactivamos el menú lateral de nuevo horario
    })

    /***********************************************************************************************************************************
    ******************************************************  CREACIÓN DEL HORARIO  ******************************************************
    ***********************************************************************************************************************************/

    // Evento para cambiar los campos de selección de horas si el horario es distinto según el día. 
    $(document).on('click', '#horarioDistinto', function () {

        let checked = $(this).is(':checked'); // --> Comprobamos si está seleccionado o no
        contenedor.empty(); // --> Vaciamos el contenedor de selección de horas
        if (checked) {
            contenedor.append(diferentesNode) // --> Si está seleccionado ponemos los campos de horario distinto
        }
        else {
            contenedor.append(igualNode) // --> Si no está seleccionado ponemos los campos de horario igual
        }

    })

    // Evento para seleccionar si el horario es especial, es decir, son horarios pueden no tener fecha inicio y fin, puede ser para un 
    // solo día o unas fechas concretas para festejos como la semana de la juventud...
    $(document).on('click', '#horarioEspecial', function () {

        if ($(this).is(':checked')) {

            $('#infoText').addClass('show')
            if ($('#horarioDistinto').is(':checked')) {

                $('#horarioDistinto').prop('checked', false)
                contenedor.empty();
                contenedor.append(igualNode)
            }

            // $('#horarioDistinto').prop('disabled', true)
            // $('.horarioDistinto label').addClass('label-disabled')
        }
        else {
            $('#infoText').removeClass('show')
            // $('#horarioDistinto').prop('disabled', false)
            // $('.horarioDistinto label').removeClass('label-disabled')
        }
    })

    // Evento en el que guardamos el nuevo horario. Para ello recibimos los datos del formulario, los validamos y si todo es correcto
    // los enviamos al servidor para su creación
    $(document).on('click', '#btnGuardarNuevoHorario', function (e) {

        e.preventDefault();
        let data = {}; // --> Objeto donde guardamos los datos del nuevo horario
        let errores = []; // --> Array donde guardamos los errores de validacion

        // Guardamos el id de la instalación a la que le asignamos el nuevo horario
        data["instalacion"] = $('#instalacion').val()

        // Obtenemos los datos del formulario
        let nombre = $('#nombreHorario').val();
        let descripcion = $('#descripcionHorario').val();
        let horarioEspecial = ($('#horarioEspecial').is(':checked')) ? 1 : 0;
        let fechaInicio = $('#fechaInicioHorario').val();
        let fechaFin = $('#fechaFinHorario').val();
        let horarioDistinto = $('#horarioDistinto').is(':checked');

        // Creamos los objetos de las fechas de la fecha de inicio y fin
        let fechaInicioDate = new Date(fechaInicio)
        let fechaFinDate = new Date(fechaFin)

        // Obtenemos el año inicial y final
        let initialYear = fechaInicioDate.getFullYear()
        let finishYear = fechaFinDate.getFullYear();

        // Obtenemos el año actual y el siguiente que son los años límites 
        let currentYear = new Date().getFullYear()
        let nextYear = (new Date().getFullYear() + 1)

        let color = $('#scheduleColor').val();
        data["color"] = color

        data["sin_fecha"] = 0;

        // Validaciones básicas
        if (nombre !== "" && nombre.length < 50) {
            data["nombre"] = nombre;
            $('#nombreHorario').removeClass('is-invalid')
        }
        else if (nombre.length > 50) {
            errores.push("El nombre un máximo de 50 caracteres");
            $('#nombreHorario').addClass('is-invalid');
        }
        else {
            errores.push("Debe escribir un nombre para el horario.");
            $('#nombreHorario').addClass('is-invalid');
        }

        if (descripcion !== "" && descripcion.length < 250) {
            data["descripcion"] = descripcion;
            $('#descripcionHorario').removeClass('is-invalid')
        }
        else if (descripcion.length > 250) {
            errores.push("La descripción tiene un máximo de 250 caracteres");
            $('#descripcionHorario').addClass('is-invalid');
        }
        else {
            errores.push("Debe escribir una descripción para el horario.");
            $('#descripcionHorario').addClass('is-invalid');
        }

        if (horarioEspecial === 0 && fechaInicio === "") {
            errores.push("Si no es un horario especial debe seleccionar la fecha de inicio del horario.");
            $('#fechaInicioHorario').addClass('is-invalid')
            $('#fechaFinHorario').removeClass('is-invalid')
        }
        else if (horarioEspecial === 0 && fechaFin === "") {
            errores.push("Si no es un horario especial debe seleccionar la fecha de fin del horario.");
            $('#fechaInicioHorario').removeClass('is-invalid')
            $('#fechaFinHorario').addClass('is-invalid')
        }
        else if (horarioEspecial === 1) {

            if (fechaInicio !== "" && fechaFin === "") {
                errores.push("Si ha seleccionado una fecha de inicio, debe seleccionar también una fecha de fin.");
                $('#fechaInicioHorario').removeClass('is-invalid')
                $('#fechaFinHorario').addClass('is-invalid')
            }
            else if (fechaInicio === "" && fechaFin !== "") {
                errores.push("Si ha seleccionado una fecha de fin, debe seleccionar también una fecha de inicio.");
                $('#fechaInicioHorario').removeClass('is-invalid')
                $('#fechaFinHorario').addClass('is-invalid')
            }
            else if (fechaInicio === "" && fechaFin === "") {
                data["sin_fecha"] = 1
            }
            else if (fechaInicioDate > fechaFinDate) {
                errores.push("La fecha de inicio no puede ser mayor que la final");
                $('#fechaInicioHorario').addClass('is-invalid')
                $('#fechaFinHorario').addClass('is-invalid')
            }
            else if ((initialYear < currentYear) || (finishYear < currentYear)) {
                errores.push("No se puede crear un horario para años anteriores al " + currentYear + ".");
                $('#fechaInicioHorario').addClass('is-invalid')
                $('#fechaFinHorario').removeClass('is-invalid')
            }
            else if ((finishYear > nextYear) || (initialYear > nextYear)) {
                errores.push("No se puede crear un horario para años anteriores al " + nextYear + ".");
                $('#fechaInicioHorario').removeClass('is-invalid')
                $('#fechaFinHorario').addClass('is-invalid')
            }
            else {
                data['fecha_inicio'] = fechaInicio,
                    data['fecha_fin'] = fechaFin
                $('#fechaInicioHorario').removeClass('is-invalid')
                $('#fechaFinHorario').removeClass('is-invalid')
            }
        }
        else if (fechaInicioDate > fechaFinDate) {
            errores.push("La fecha de inicio no puede ser mayor que la final");
            $('#fechaInicioHorario').addClass('is-invalid')
            $('#fechaFinHorario').addClass('is-invalid')
        }
        else if ((initialYear < currentYear) || (finishYear < currentYear)) {
            errores.push("No se puede crear un horario para años anteriores al " + currentYear + ".");
            $('#fechaInicioHorario').addClass('is-invalid')
            $('#fechaFinHorario').removeClass('is-invalid')
        }
        else if ((finishYear > nextYear) || (initialYear > nextYear)) {
            errores.push("No se puede crear un horario para años anteriores al " + nextYear + ".");
            $('#fechaInicioHorario').removeClass('is-invalid')
            $('#fechaFinHorario').addClass('is-invalid')
        }
        else {
            data['fecha_inicio'] = fechaInicio,
                data['fecha_fin'] = fechaFin
            $('#fechaInicioHorario').removeClass('is-invalid')
            $('#fechaFinHorario').removeClass('is-invalid')
        }

        // ✅ Validación de horarios (incluye orden de horas)
        if (!validarHorarios(horarioDistinto, errores, data)) {
            console.error("Errores en horarios detectados");
        }

        data["horario_especial"] = horarioEspecial;

        $('.erroresHorario').empty();
        // Si no hay errores, mostramos datos
        if (errores.length === 0) {
            // console.log(data);
            $.ajax({
                type: "POST",
                url: "../crearHorario",
                data: { data: data },
                dataType: "json",
                // Cargamos el loader y desactivamos los botones e inputs
                beforeSend: function () {
                    $('#loaderNuevoHorario').show();
                    $('#btnGuardarNuevoHorario').addClass('cargando')
                    $('#sidebar input').addClass('cargando')
                    $('#sidebar textarea').addClass('cargando')
                },
                // Mostramos la respuesta del servidor
                success: function (response) {

                    // Si todo ha ido bien
                    if (response.success === true) {

                        // Cerramos el loader y desactivamos las clases de carga 
                        $('#loaderNuevoHorario').hide();
                        $('#btnGuardarNuevoHorario').removeClass('cargando')
                        $('#sidebar input').removeClass('cargando')
                        $('#sidebar textarea').removeClass('cargando')

                        console.log(response)

                        // Generamos el calendario
                        generarCalendario($('#anoActual').text());

                        // Añadimos la leyenda al nuevo horario
                        $('.legend').append(`
                                        <div class="legend-item" data-index="${response.infoHorario["id_tipo_horario"]}">
                                            <div class="legend-color" style="background-color: ${response.infoHorario["color"]}"></div> 
                                            <span>${response.infoHorario["nombre"]}</span>
                                        </div>
                        `)

                        // Añadimos el card del nuevo horario del menu de horarios
                        if (parseInt(response.infoHorario["es_especial"]) === 0) {
                            $('#horarios-normailes-menu').append(`
                            <div data-index="${response.infoHorario["id_tipo_horario"]}" style="background-color: ${response.infoHorario["color"]}20; color: ${response.infoHorario["color"]}; border: 2px solid ${response.infoHorario["color"]}90" class="card-menu-horarios">
                                <span>${response.infoHorario["nombre"]}</span>
                                <div class="fechas">
                                    ${new Date(response.infoHorario["fecha_inicio"]).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                }
                                    -
                                    ${new Date(response.infoHorario["fecha_fin"]).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                }
                                </div>

                                <div class="descripcion">
                                    ${response.infoHorario["descripcion"]}
                                </div>

                                <div class="dropdown opciones-horario" style="max-width: 200px;">
                                    <a href="#" class="opciones-horario-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: ${response.infoHorario["color"]};"><i class="bi bi-three-dots-vertical"></i></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="" class="btnEditarHorario"><i class="bi bi-pencil"></i>&nbsp;&nbsp;Editar</a></li>
                                        <li><a href="" class="btnBorrarHorario delete-option"><i class="bi bi-trash3"></i>&nbsp;&nbsp;Eliminar</a></li>
                                    </ul>
                                </div>
                            </div>
                        `)
                        }
                        else if (parseInt(response.infoHorario["es_especial"]) === 1) {
                            $('#horarios-especiales-menu').append(`
                            <div data-index="${response.infoHorario["id_tipo_horario"]}" style="background-color: ${response.infoHorario["color"]}20; color: ${response.infoHorario["color"]}; border: 2px solid ${response.infoHorario["color"]}90" class="card-menu-horarios">
                                <span>${response.infoHorario["nombre"]}</span>
                                <div class="fechas">
                                    ${new Date(response.infoHorario["fecha_inicio"]).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                }
                                    -
                                    ${new Date(response.infoHorario["fecha_fin"]).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                }
                                </div>

                                <div class="descripcion">
                                    ${response.infoHorario["descripcion"]}
                                </div>

                                <div class="dropdown opciones-horario" style="max-width: 200px;">
                                    <a href="#" class="opciones-horario-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: ${response.infoHorario["color"]};"><i class="bi bi-three-dots-vertical"></i></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="" class="btnEditarHorario"><i class="bi bi-pencil"></i>&nbsp;&nbsp;Editar</a></li>
                                        <li><a href="" class="btnBorrarHorario delete-option"><i class="bi bi-trash3"></i>&nbsp;&nbsp;Eliminar</a></li>
                                    </ul>
                                </div>
                            </div>
                        `)
                        }

                        $('#sidebar').removeClass('active');
                    }
                    else {
                        let divNombres = $('#modalHorarioExistente .nombres-horarios-existentes ul');
                        divNombres.empty();

                        response.infoHorario.map(function (horario) {

                            divNombres.append(`<li>${horario.nombre}</li>`)
                        })

                        $('#modalHorarioExistente').show();
                    }

                                 $('#loaderNuevoHorario').hide();
                    $('#btnGuardarNuevoHorario').removeClass('cargando')
                    $('#sidebar input').removeClass('cargando')
                    $('#sidebar textarea').removeClass('cargando')

                    $('#nombreHorario').val('');
                    $('#descripcionHorario').val('');
                    $('#fechaInicioHorario').val('');
                    $('#fechaFinHorario').val('');
                    $('#horarioDistinto').prop('checked', false);
                    $('#horarioEspecial').prop('checked', false);

                    $('#horaInicioMananaHorario').val('');
                    $('#horaFinMananaHorario').val('');
                    $('#horaInicioTardeHorario').val('');
                    $('#horaFinTardeHorario').val('');

                    $('#horaInicioMananaLunesHorario').val('');
                    $('#horaFinMananaLunesHorario').val('');
                    $('#horaInicioTardeLunesHorario').val('');
                    $('#horaFinTardeLunesHorario').val('');

                    $('#horaInicioMananaMartesHorario').val('');
                    $('#horaFinMananaMartesHorario').val('');
                    $('#horaInicioTardeMartesHorario').val('');
                    $('#horaFinTardeMartesHorario').val('');
                    
                    $('#horaInicioMananaMiercolesHorario').val('');
                    $('#horaFinMananaMiercolesHorario').val('');
                    $('#horaInicioTardeMiercolesHorario').val('');
                    $('#horaFinTardeMiercolesHorario').val('');

                    $('#horaInicioMananaJuevesHorario').val('');
                    $('#horaFinMananaJuevesHorario').val('');
                    $('#horaInicioTardeJuevesHorario').val('');
                    $('#horaFinTardeJuevesHorario').val('');

                    $('#horaInicioMananaViernesHorario').val('');
                    $('#horaFinMananaViernesHorario').val('');
                    $('#horaInicioTardeViernesHorario').val('');
                    $('#horaFinTardeViernesHorario').val('');

                    $('#horaInicioMananaSabadoHorario').val('');
                    $('#horaFinMananaSabadoHorario').val('');
                    $('#horaInicioTardeSabadoHorario').val('');
                    $('#horaFinTardeSabadoHorario').val('');

                    $('#horaInicioMananaDomingoHorario').val('');
                    $('#horaFinMananaDomingoHorario').val('');
                    $('#horaInicioTardeDomingoHorario').val('');
                    $('#horaFinTardeDomingoHorario').val('');
                    
                    $('#scheduleColor').val('#000000')
                },
                complete: function () {
                    $('#loaderNuevoHorario').hide();
                    $('#btnGuardarNuevoHorario').removeClass('cargando')
                    $('#sidebar input').removeClass('cargando')
                    $('#sidebar textarea').removeClass('cargando')

                    $('#nombreHorario').val('');
                    $('#descripcionHorario').val('');
                    $('#fechaInicioHorario').val('');
                    $('#fechaFinHorario').val('');
                    $('#horarioDistinto').prop('checked', false);
                    $('#horarioEspecial').prop('checked', false);

                    $('#horaInicioMananaHorario').val('');
                    $('#horaFinMananaHorario').val('');
                    $('#horaInicioTardeHorario').val('');
                    $('#horaFinTardeHorario').val('');

                    $('#horaInicioMananaLunesHorario').val('');
                    $('#horaFinMananaLunesHorario').val('');
                    $('#horaInicioTardeLunesHorario').val('');
                    $('#horaFinTardeLunesHorario').val('');

                    $('#horaInicioMananaMartesHorario').val('');
                    $('#horaFinMananaMartesHorario').val('');
                    $('#horaInicioTardeMartesHorario').val('');
                    $('#horaFinTardeMartesHorario').val('');
                    
                    $('#horaInicioMananaMiercolesHorario').val('');
                    $('#horaFinMananaMiercolesHorario').val('');
                    $('#horaInicioTardeMiercolesHorario').val('');
                    $('#horaFinTardeMiercolesHorario').val('');

                    $('#horaInicioMananaJuevesHorario').val('');
                    $('#horaFinMananaJuevesHorario').val('');
                    $('#horaInicioTardeJuevesHorario').val('');
                    $('#horaFinTardeJuevesHorario').val('');

                    $('#horaInicioMananaViernesHorario').val('');
                    $('#horaFinMananaViernesHorario').val('');
                    $('#horaInicioTardeViernesHorario').val('');
                    $('#horaFinTardeViernesHorario').val('');

                    $('#horaInicioMananaSabadoHorario').val('');
                    $('#horaFinMananaSabadoHorario').val('');
                    $('#horaInicioTardeSabadoHorario').val('');
                    $('#horaFinTardeSabadoHorario').val('');

                    $('#horaInicioMananaDomingoHorario').val('');
                    $('#horaFinMananaDomingoHorario').val('');
                    $('#horaInicioTardeDomingoHorario').val('');
                    $('#horaFinTardeDomingoHorario').val('');
                    
                    $('#scheduleColor').val('#000000')
                }
            });
        }
        else {

            let lista = $(`<ul></ul>`)
            errores.map(function (error) {
                let elemento = $(`<li>${error}</li>`);
                lista.append(elemento)
            })

            let alertBox = $(`<div class="alert alert-danger mb-0" role="alert"></div>`);
            alertBox.append(lista)

            $('.erroresHorario').append(alertBox);
        }
    });

    // Evento para actualizar el valor del color seleccionado en la creación de un nuevo horario
    $(document).on('change', '#scheduleColor', function () {

        let color = $(this).val()
        $('#colorValue').text(color)
    })

    /***********************************************************************************************************************************
    *********************************************************  MENÚ DE HORARIOS  *******************************************************
    ***********************************************************************************************************************************/

    $(document).on('click', '#btnMenuHorario', function (e) {

        e.preventDefault()

        $.ajax({
            type: "POST",
            url: "../menuHorario",
            data: {year: $('#anoActual').text(), instalacion: $('#instalacion').val()},
            dataType: "JSON",
            beforeSend: function () {
                $('#loaderMenuHorarios').show();
                $('.card-menu-horarios').addClass('loading');
            },
            success: function (response) {
                if(response.succes == true) {

                    $('#sidebarMenu .menu-content').empty();

                    let hayEspeciales = response.horarios.some(horario => {
                        return parseInt(horario.es_especial) === 1
                    })

                    let hayNormal = response.horarios.some(horario => {
                        return parseInt(horario.es_especial) === 0
                    })

                    if(hayNormal) {
                        $('#sidebarMenu .menu-content').append(
                            `<div id="horarios-normailes-menu">
                                <p class="tipo-horarios">Horarios normales</p>
                                <div class="horarios-normales"></div>
                            </div>`
                        )
                    }

                    if(hayEspeciales) {
                        $('#sidebarMenu .menu-content').append(
                            `<div id="horarios-especiales-menu">
                                <p class="tipo-horarios">Horarios especiales</p>
                                <div class="horarios-especiales"></div>
                            </div>`
                        )
                    }

                    $('.horarios-normales').empty();
                    $('.horarios-especiales').empty();

                    response.horarios.map(horario => {
                        if(parseInt(horario.es_especial) === 0) {
                            $('.horarios-normales').append(`
                                <div data-index="${horario.id_tipo_horario}" style="background-color: ${horario.color}20; color: ${horario.color}; border: 2px solid ${horario.color}90" class="card-menu-horarios">
                                    <span>${horario.nombre}</span>
                                    <div class="descripcion">${horario.descripcion}</div>
                                                                <div class="dropdown opciones-horario" style="max-width: 200px;">
                                <a href="#" class="opciones-horario-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color:${horario.color}"><i class="bi bi-three-dots-vertical"></i></a>
                                <ul class="dropdown-menu">
                                    <li><a href="" class="btnEditarHorario"><i class="bi bi-pencil"></i>&nbsp;&nbsp;Editar</a></li>
                                    <li><a href="" class="btnBorrarHorario delete-option"><i class="bi bi-trash3"></i>&nbsp;&nbsp;Eliminar</a></li>
                                </ul>
                            </div>
                                </div>
                                `)
                        }
                        else if(parseInt(horario.es_especial) === 1) {
                            $('.horarios-especiales').append(`
                                <div data-index="${horario.id_tipo_horario}" style="background-color: ${horario.color}20; color: ${horario.color}; border: 2px solid ${horario.color}90" class="card-menu-horarios">
                                    <span>${horario.nombre}</span>
                                    <div class="descripcion">${horario.descripcion}</div>
                                                                <div class="dropdown opciones-horario" style="max-width: 200px;">
                                <a href="#" class="opciones-horario-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: ${horario.color}"><i class="bi bi-three-dots-vertical"></i></a>
                                <ul class="dropdown-menu">
                                    <li><a href="" class="btnEditarHorario"><i class="bi bi-pencil"></i>&nbsp;&nbsp;Editar</a></li>
                                    <li><a href="" class="btnBorrarHorario delete-option"><i class="bi bi-trash3"></i>&nbsp;&nbsp;Eliminar</a></li>
                                </ul>
                            </div>
                                </div>
                            `)
                        }
                    })
                }

                $('#loaderMenuHorarios').hide();
            },
            complete: function () {
                $('#loaderMenuHorarios').hide();
                $('.card-menu-horarios').removeClass('loading');
            }
        });

        $('#sidebarMenu').addClass('active');
        $('#sidebar').removeClass('active');
    })


    $(document).on('click', '#btnCerraSidebarMenu', function (e) {

        e.preventDefault()
        $('#sidebarMenu').removeClass('active');
    })


    $(document).on('click', '.btnEditarHorario', function (e) {

        e.preventDefault();

        let id = $(this).closest('.card-menu-horarios').data('index');
        console.log(id)

        $('#idHorarioEditar').val(id);

        $.ajax({
            type: "POST",
            url: "../getHorario",
            data: { id: id },
            dataType: "json",
            success: function (response) {

                if (response.succes === true) {

                    const horario = response.horario;
                    console.log(response)

                    $('#idInstalacion').val(response.franjas[0].id_instalacion)
                    $('#nombreHorarioEditar').val(horario.nombre)
                    $('#nombre-horario').text(horario.nombre)
                    $('#descripcionHorarioEditar').val(horario.descripcion)
                    $('#fechaIincioHorarioEditar').val(horario.fecha_inicio)
                    $('#fechaFinHorarioEditar').val(horario.fecha_fin)
                    $('#horarioDistintoEditar').prop('checked', (parseInt(response.franjas[0].franja_unica) === 0))

                    $('#contenedor-input-horas-editar').empty

                    if (parseInt(response.franjas[0].franja_unica) === 0) {

                        $('#contenedor-input-horas-editar').append(diferentesNodeEditar)

                        response.franjas.map(function (franja) {
                            let diaSemana = parseInt(franja.id_dia_semana);

                            switch (diaSemana) {
                                case 1: // Lunes
                                    $('#horaInicioMananaLunesHorarioEditar').val(franja.hora_inicio_manana === '00:00:00' ? '' : franja.hora_inicio_manana);
                                    $('#horaFinMananaLunesHorarioEditar').val(franja.hora_fin_manana === '00:00:00' ? '' : franja.hora_fin_manana);
                                    $('#horaInicioTardeLunesHorarioEditar').val(franja.hora_inicio_tarde === '00:00:00' ? '' : franja.hora_inicio_tarde);
                                    $('#horaFinTardeLunesHorarioEditar').val(franja.hora_fin_tarde === '00:00:00' ? '' : franja.hora_fin_tarde);
                                    break;

                                case 2: // Martes
                                    $('#horaInicioMananaMartesHorarioEditar').val(franja.hora_inicio_manana === '00:00:00' ? '' : franja.hora_inicio_manana);
                                    $('#horaFinMananaMartesHorarioEditar').val(franja.hora_fin_manana === '00:00:00' ? '' : franja.hora_fin_manana);
                                    $('#horaInicioTardeMartesHorarioEditar').val(franja.hora_inicio_tarde === '00:00:00' ? '' : franja.hora_inicio_tarde);
                                    $('#horaFinTardeMartesHorarioEditar').val(franja.hora_fin_tarde === '00:00:00' ? '' : franja.hora_fin_tarde);
                                    break;

                                case 3: // Miércoles
                                    $('#horaInicioMananaMiercolesHorarioEditar').val(franja.hora_inicio_manana === '00:00:00' ? '' : franja.hora_inicio_manana);
                                    $('#horaFinMananaMiercolesHorarioEditar').val(franja.hora_fin_manana === '00:00:00' ? '' : franja.hora_fin_manana);
                                    $('#horaInicioTardeMiercolesHorarioEditar').val(franja.hora_inicio_tarde === '00:00:00' ? '' : franja.hora_inicio_tarde);
                                    $('#horaFinTardeMiercolesHorarioEditar').val(franja.hora_fin_tarde === '00:00:00' ? '' : franja.hora_fin_tarde);
                                    break;

                                case 4: // Jueves
                                    $('#horaInicioMananaJuevesHorarioEditar').val(franja.hora_inicio_manana === '00:00:00' ? '' : franja.hora_inicio_manana);
                                    $('#horaFinMananaJuevesHorarioEditar').val(franja.hora_fin_manana === '00:00:00' ? '' : franja.hora_fin_manana);
                                    $('#horaInicioTardeJuevesHorarioEditar').val(franja.hora_inicio_tarde === '00:00:00' ? '' : franja.hora_inicio_tarde);
                                    $('#horaFinTardeJuevesHorarioEditar').val(franja.hora_fin_tarde === '00:00:00' ? '' : franja.hora_fin_tarde);
                                    break;

                                case 5: // Viernes
                                    $('#horaInicioMananaViernesHorarioEditar').val(franja.hora_inicio_manana === '00:00:00' ? '' : franja.hora_inicio_manana);
                                    $('#horaFinMananaViernesHorarioEditar').val(franja.hora_fin_manana === '00:00:00' ? '' : franja.hora_fin_manana);
                                    $('#horaInicioTardeViernesHorarioEditar').val(franja.hora_inicio_tarde === '00:00:00' ? '' : franja.hora_inicio_tarde);
                                    $('#horaFinTardeViernesHorarioEditar').val(franja.hora_fin_tarde === '00:00:00' ? '' : franja.hora_fin_tarde);
                                    break;

                                case 6: // Sábado
                                    $('#horaInicioMananaSabadoHorarioEditar').val(franja.hora_inicio_manana === '00:00:00' ? '' : franja.hora_inicio_manana);
                                    $('#horaFinMananaSabadoHorarioEditar').val(franja.hora_fin_manana === '00:00:00' ? '' : franja.hora_fin_manana);
                                    $('#horaInicioTardeSabadoHorarioEditar').val(franja.hora_inicio_tarde === '00:00:00' ? '' : franja.hora_inicio_tarde);
                                    $('#horaFinTardeSabadoHorarioEditar').val(franja.hora_fin_tarde === '00:00:00' ? '' : franja.hora_fin_tarde);
                                    break;

                                case 7: // Domingo
                                    $('#horaInicioMananaDomingoHorarioEditar').val(franja.hora_inicio_manana === '00:00:00' ? '' : franja.hora_inicio_manana);
                                    $('#horaFinMananaDomingoHorarioEditar').val(franja.hora_fin_manana === '00:00:00' ? '' : franja.hora_fin_manana);
                                    $('#horaInicioTardeDomingoHorarioEditar').val(franja.hora_inicio_tarde === '00:00:00' ? '' : franja.hora_inicio_tarde);
                                    $('#horaFinTardeDomingoHorarioEditar').val(franja.hora_fin_tarde === '00:00:00' ? '' : franja.hora_fin_tarde);
                                    break;

                                default:
                                    console.warn("Día de la semana no válido:", diaSemana);
                            }

                        })
                    }
                    else {
                        $('#contenedor-input-horas-editar').append(igualNodeEditar)
                        $('#horaInicioMananaHorarioEditar').val(response.franjas[0].hora_inicio_manana === '00:00:00' ? '' : response.franjas[0].hora_inicio_manana);
                        $('#horaFinMananaHorarioEditar').val(response.franjas[0].hora_fin_manana === '00:00:00' ? '' : response.franjas[0].hora_fin_manana);
                        $('#horaInicioTardeHorarioEditar').val(response.franjas[0].hora_inicio_tarde === '00:00:00' ? '' : response.franjas[0].hora_inicio_tarde);
                        $('#horaFinTardeHorarioEditar').val(response.franjas[0].hora_fin_tarde === '00:00:00' ? '' : response.franjas[0].hora_fin_tarde);
                    }

                    $('#scheduleColorEditar').val(horario.color);
                    $('#colorValueEditar').text(horario.color);

                    $('#modalEditarHorario').addClass('show');
                    $('#modalEditarHorario').show();
                }
            }
        });

    })

    $(document).on('click', '#btnGurdarHorarioEditar', function (e) {

        e.preventDefault();
        let data = {};
        let errores = [];

        // Obtenemos los datos del formulario
        let nombre = $('#nombreHorarioEditar').val()
        let descripcion = $('#descripcionHorarioEditar').val()
        let fechaInicio = $('#fechaIincioHorarioEditar').val()
        let fechaFin = $('#fechaFinHorarioEditar').val()
        let horarioDistinto = $('#horarioDistintoEditar').is(':checked');
        let color = $('#scheduleColorEditar').val();

        let fechaInicioDate = new Date(fechaInicio);
        let fechaFinDate = new Date(fechaFin);

        let currentYear = new Date().getFullYear();
        let nextYear = (new Date().getFullYear() + 1);

        let initialYear = fechaInicioDate.getFullYear();
        let finishYear = fechaFinDate.getFullYear();

        data["id_tipo_horario"] = $('#idHorarioEditar').val();

        // Validaciones básicas
        if (nombre !== "" && nombre.length < 50) {
            data["nombre"] = nombre;
            $('#nombreHorarioEditar').removeClass('is-invalid')
        }
        else if (nombre.length > 50) {
            errores.push("El nombre debe tener un máximo de 50 caracteres");
            $('#nombreHorarioEditar').addClass('is-invalid');
        }
        else {
            errores.push("Debe escribir un nombre para el horario.");
            $('#nombreHorarioEditar').addClass('is-invalid');
        }

        if (descripcion !== "" && descripcion.length < 250) {
            data["descripcion"] = descripcion;
            $('#descripcionHorarioEditar').removeClass('is-invalid')
        }
        else if (descripcion.length > 250) {
            errores.push("La descripción debe tener como máximo 250 caracteres.");
            $('#descripcionHorarioEditar').addClass('is-invalid');
        }
        else {
            errores.push("Debe escribir una descripción para el horario.");
            $('#descripcionHorarioEditar').addClass('is-invalid');
        }

        if (fechaInicio === "") {
            errores.push("Si no es un horario especial debe seleccionar la fecha de inicio del horario.");
            $('#fechaIincioHorarioEditar').addClass('is-invalid')
            $('#fechaFinHorarioEditar').removeClass('is-invalid')
        }
        else if (fechaFin === "") {
            errores.push("Si no es un horario especial debe seleccionar la fecha de fin del horario.");
            $('#fechaIincioHorarioEditar').removeClass('is-invalid')
            $('#fechaFinHorarioEditar').addClass('is-invalid')
        }
        else if (fechaInicioDate > fechaFinDate) {
            errores.push("La fecha de inicio no puede ser mayor que la final");
            $('#fechaIincioHorarioEditar').addClass('is-invalid')
            $('#fechaFinHorarioEditar').addClass('is-invalid')
        }
        else if ((initialYear < currentYear) || (finishYear < currentYear)) {
            errores.push("No se puede crear un horario para años anteriores al " + currentYear + ".");
            $('#fechaIincioHorarioEditar').addClass('is-invalid')
            $('#fechaFinHorarioEditar').removeClass('is-invalid')
        }
        else if ((finishYear > nextYear) || (initialYear > nextYear)) {
            errores.push("No se puede crear un horario para años anteriores al " + nextYear + ".");
            $('#fechaIincioHorarioEditar').removeClass('is-invalid')
            $('#fechaFinHorarioEditar').addClass('is-invalid')
        }
        else {
            data['fecha_inicio'] = fechaInicio,
                data['fecha_fin'] = fechaFin
            $('#fechaIincioHorarioEditar').removeClass('is-invalid')
            $('#fechaFinHorarioEditar').removeClass('is-invalid')
        }

        data["franja_unica"] = horarioDistinto ? 0 : 1;
        data["instalacion"] = $('#idInstalacion').val();

        // ✅ Validación de horarios (incluye orden de horas)
        if (!validarHorariosEditar(horarioDistinto, errores, data)) {
            console.error("Errores en horarios detectados");
        }

        data["color"] = color;

        $('#errores-editar-horario').empty();

        if (errores.length === 0) {
            console.log(data);
            $.ajax({
                type: "POST",
                url: "../editarHorario",
                data: { data: data },
                dataType: "json",
                beforeSend: function () {
                    $('#modalEditarHorario').addClass('show');
                    $('#loaderModalEditar').show();
                    $('#modalEditarHorario .modal-footer button').addClass('cargando')
                    $('#modalEditarHorario input').addClass('cargando')
                    $('#modalEditarHorario textarea').addClass('cargando')
                },
                success: function (response) {

                    if (response.success === true) {

                        $('#loaderModalEditar').hide();
                        $('#modalEditarHorario .modal-footer button').removeClass('cargando')
                        $('#modalEditarHorario input').removeClass('cargando')
                        $('#modalEditarHorario textarea').removeClass('cargando')

                        generarCalendario($('#anoActual').text());
                        $('#modalEditarHorario').removeClass('show');
                        $('#modalEditarHorario').hide();

                        $('#sidebarMenu').find((`div.card-menu-horarios[data-index='${response.infoHorario["id_tipo_horario"]}'] span`)).text(response.infoHorario["nombre"]);

                        const { fecha_inicio, fecha_fin } = response.infoHorario;

                        const formatDate = (dateString) => {
                            const date = new Date(dateString);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = date.getFullYear();
                            return `${day}/${month}/${year}`;
                        };

                        const cadena = `${formatDate(fecha_inicio)} - ${formatDate(fecha_fin)}`;

                        $('#sidebarMenu').find((`div.card-menu-horarios[data-index='${response.infoHorario["id_tipo_horario"]}'] .fechas`)).text(cadena);
                        $('#sidebarMenu').find((`div.card-menu-horarios[data-index='${response.infoHorario["id_tipo_horario"]}'] .descripcion`)).text(response.infoHorario["descripcion"]);
                        $('#sidebarMenu').find((`div.card-menu-horarios[data-index='${response.infoHorario["id_tipo_horario"]}']`)).css({
                            backgroundColor: `${color}20`, // el "20" al final es transparencia en hex (≈ 12%)
                            color: color,
                            border: `2px solid ${color}90` // "90" es ≈ 56% de opacidad
                        }
                        )


                        $('#sidebarMenu').find((`div.card-menu-horarios[data-index='${response.infoHorario["id_tipo_horario"]}'] .opciones-horario-link`)).css({
                            color: color,
                        }
                        )

                    }
                },
                complete: function () {
                    $('#loaderModalEditar').hide();
                    $('#modalEditarHorario .modal-footer button').removeClass('cargando')
                    $('#modalEditarHorario input').removeClass('cargando')
                    $('#modalEditarHorario textarea').removeClass('cargando')
                }
            });
        }
        else {
            let lista = $(`<ul></ul>`)
            errores.map(function (error) {
                let elemento = $(`<li>${error}</li>`);
                lista.append(elemento)
            })

            let alertBox = $(`<div class="alert alert-danger mb-0" role="alert"></div>`);
            alertBox.append(lista)
            $('#errores-editar-horario').append(alertBox);
        }


    })

    $(document).on('change', '#horarioDistintoEditar', function () {

        let checked = $(this).is(':checked');
        $('#contenedor-input-horas-editar').empty();
        if (checked) {
            $('#contenedor-input-horas-editar').append(diferentesNodeEditar)
        }
        else {
            $('#contenedor-input-horas-editar').append(igualNodeEditar)
        }
    })

    $(document).on('change', '#scheduleColorEditar', function () {
        let color = $(this).val()
        $('#colorValueEditar').text(color)
    })

    $(document).on('click', '.modal .btn-close', function (e) {
        e.preventDefault()
        $(this).closest('.modal').removeClass('show');
        $(this).closest('.modal').hide();
    })

    $(document).on('click', '.modal .btn-secondary-personal', function (e) {
        e.preventDefault()
        $(this).closest('.modal').removeClass('show');
        $(this).closest('.modal').hide();
    })


    $(document).on('click', '.btnBorrarHorario', function (e) {
        e.preventDefault();

        let id = $(this).closest('.card-menu-horarios').data('index');

        $.ajax({
            type: "POST",
            url: "../getHorario",
            data: { id: id },
            dataType: "JSON",
            success: function (response) {

                if (response.succes === true) {

                    $('#idHorarioBorrar').val(id);
                    $('#nombre-horario-borrar').text(response.horario.nombre);
                    $('#nombre-horario-borrar2').text(response.horario.nombre);

                    $('#modalBorrarHorario').addClass('show');
                    $('#modalBorrarHorario').show();

                }
            }
        });
    })


    $(document).on('click', '#aceptarBorrarHorario', function (e) {
        e.preventDefault();

        let id = $('#idHorarioBorrar').val();

        $.ajax({
            type: "POST",
            url: "../borrarHorario",
            data: { id: id },
            dataType: "JSON",
            beforeSend: function () {
                $('#loaderModalBorrar').show();
                $('#modalBorrarHorario button').addClass('cargando');
                $('#modalBorrarHorario p').addClass('cargando');
                $('#modalBorrarHorario span').addClass('cargando');
                $('#modalBorrarHorario .iconoModal i').addClass('cargando');

            },
            success: function (response) {
                if (response.success === true) {
                    $('#loaderModalBorrar').hide();
                    $('#modalBorrarHorario button').removeClass('cargando');
                    $('#modalBorrarHorario p').removeClass('cargando');
                    $('#modalBorrarHorario span').removeClass('cargando');
                    $('#modalBorrarHorario .iconoModal i').removeClass('cargando');
                    $('#modalBorrarHorario').hide();

                    $('#sidebarMenu').find(`div.card-menu-horarios[data-index='${id}']`).remove();
                    $('.legend').find(`div[data-index='${id}']`).remove();
                    generarCalendario($('#anoActual').text());
                }
            },
            complete: function () {
                $('#loaderModalBorrar').hide();
                $('#modalBorrarHorario button').removeClass('cargando');
                $('#modalBorrarHorario p').removeClass('cargando');
                $('#modalBorrarHorario span').removeClass('cargando');
                $('#modalBorrarHorario .iconoModal i').removeClass('cargando');
            }
        });
    })


    /***********************************************************************************************************************************
    *********************************************************  SELECCIÓN DE DÍA  *******************************************************
    ***********************************************************************************************************************************/
    
    $(document).on('click', '#btnCerraSidebarCambio', function (e) {

        e.preventDefault()

        $('#sidebar-cambio-horario').removeClass('active'); // --> Desactivamos el menú lateral de nuevo horario
        $('#calendario').removeClass('seleccion-dia')
        $(`.numero-dia.dia-seleccionado`).removeClass('dia-seleccionado');
    })



    $(document).on('click', '.numero-dia', function (e) {
        e.preventDefault();

        if ($(this).text() === '') return;
        

        /* =========================
           🟠 CASO: EXCEPCIÓN
           ========================= */
        if ($(this).data('exception') === true) {

            if ($('.dia-seleccionado:not([data-exception])').length > 0) {

                $('#modalCambioHorario #mensaje-dia-sin-horario').text('El día seleccionado no tiene un horario normal asignado.')
                $('#modalCambioHorario #mensaje-opciones').text(' Puedes continuar con el cambio de horario o cerrarlo para asignar un horario normal a este día.')
                $('#modalCambioHorario').show();
            return;
            }




            $(this).addClass('dia-seleccionado');

            if($('.dia-seleccionado[data-exception="true"]').length === 1) 
                $('#sidebar-cambio-horario .contenedor-cambio-horarios-card').empty(); 

            $('#sidebar-cambio-horario p.seleccion-horario-nuevo')
                .text('¿Desea volver al siguiente horario? :');


            let idHorario = parseInt($(this).data('index'));

            let horariosSeleccionados = $('.horarios-old div').map(function() {
                let id = parseInt($(this).data('new'))
                return id
            }).get()

            let existeLeyenda = horariosSeleccionados.includes(idHorario);

            if (!existeLeyenda) {
                
                const data = {
                    "horario-excepcion": $(this).data('index'),
                    "fecha": $(this).data('day')
                };

                

                $.ajax({
                    type: "POST",
                    url: "../getHorariosChangeException",
                    data: { data },
                    dataType: "JSON",
                    beforeSend: function () {
                        $('#loaderSidebarCambioHorario').show();
                    },
                    success: function (response) {

                        if (!response.success) return;

                        $('#loaderSidebarCambioHorario').hide();

                        const idHorarioBase = response.excepcion.id_tipo_horario_base;
                        const $contenedor = $('#sidebar-cambio-horario .contenedor-cambio-horarios-card');

                            const e = response.excepcion;

                            let cardHorario = ''

                        // }

                        const num2 = $(`.numero-dia.dia-seleccionado[data-name="${response.horario_excepcion.nombre}"]`).length;
                        const div = `
                                <div data-name="${response.horario_excepcion.nombre}" data-color="${response.horario_excepcion.color}" data-new="${response.horario_excepcion.id_tipo_horario}"
                                    style="width:40px;height:40px;border-radius:5px;
                                            background-color:${response.horario_excepcion.color}50;color:${response.horario_excepcion.color};
                                            border:1px solid ${response.horario_excepcion.color};
                                            display:flex;align-items:center;justify-content:center;">
                                    <span>${num2}</span>
                                </div>
                        `;

                        let horariosExistentes = $('.horarios-new div').map(function(cardHorario) {
                            return $(this).data('new')
                        }).get()

                        let existeLeyenda2 = horariosExistentes.includes(parseInt(response.excepcion.id_tipo_horario));

                        let div2 = ''
                        if(!existeLeyenda2) {
                            div2 = `
                                    <div data-name="${response.excepcion.nombre}" data-color="${response.excepcion.color}" data-new="${response.excepcion.id_tipo_horario}"
                                        style="width:40px;height:40px;border-radius:5px;
                                                background-color:${response.excepcion.color};color:${response.excepcion.color};
                                                border:1px solid ${response.excepcion.color};
                                                display:flex;align-items:center;justify-content:center;">
                                        <span>${num2}</span>
                                    </div>
                            `;


                            cardHorario = `
                                <div data-index="${idHorarioBase}" data-color="${e.color}"
                                    style="background-color:${e.color}20;color:${e.color};
                                            border:2px solid ${e.color}90"
                                    class="card-menu-horarios">

                                    <span>${e.nombre}</span>
                                    <div class="descripcion">${e.descripcion}</div>
                                </div>
                            `;
                        }
                            
                            $('.horarios-old').append(div);

                            if(!existeLeyenda2) {
                                $contenedor.append(cardHorario);
                                $('.horarios-new').append(div2);
                            }
                    }, 
                    complete: function () {
                        $('#loaderSidebarCambioHorario').hide();
                    }
                    });
            }
            else {
                const num2 = $(`.numero-dia.dia-seleccionado[data-name="${$(this).data('name')}"]`).length;
                $(`.horarios-old div[data-name="${$(this).data('name')}"] span`).text(num2);
            }
            
            

            $('#sidebar-cambio-horario').addClass('active');
            $('#calendario, #contenedor-loader-horario').addClass('seleccion-dia');
            $('#btn-guardar-cambio-seleccion').removeClass('btn-primary-personal-disabled');
            return; // ⛔ NO continúa con la lógica normal
        }

        if($(this).data('index') === "") {
            return;
        }

        /* =========================
           🟢 CASO NORMAL (ACTUAL)
           ========================= */

        if ($('#sidebar-cambio-horario').hasClass('active') && $(this).data('name') === '') {
            $('#modalCambioHorario').show();
            return;
        }

        if($('.dia-seleccionado[data-exception="true"]').length > 0) {
            
            $('#modalCambioHorario #mensaje-dia-sin-horario').text('El día seleccionado no tiene un horario especial asignado.')
            $('#modalCambioHorario #mensaje-opciones').text(' Puedes continuar con el cambio de horario o cerrarlo para asignar un horario especial a este día.')
            $('#modalCambioHorario').show();
            return;
        }

        $('#sidebar-cambio-horario p.seleccion-horario-nuevo').text('Seleccione el horario que desea establecer en dichas fechas');

        $(this).addClass('dia-seleccionado');

        const colorFondo = $(this).data('color');
        const nombreHorario = $(this).data('name');

        let num = 0
        let div = ''
        if (nombreHorario !== "") {

           num = $(`.numero-dia.dia-seleccionado[data-name="${nombreHorario}"]`).length;

            div = `
            <div data-name="${nombreHorario}" data-color="${colorFondo}"
                 style="width:40px;height:40px;border-radius:5px;
                        background-color:${colorFondo}50;color:${colorFondo};
                        border:1px solid ${colorFondo};
                        display:flex;align-items:center;justify-content:center;">
                <span>${num}</span>
            </div>
        `;

            // let existe = false;
            // $('.horarios-old div').each(function () {
            //     if ($(this).data('color') === colorFondo) existe = true;
            // });

            if (num === 1) {
                $('.horarios-old').append(div);
            } else if (num > 1 ) {
                $(`.horarios-old div[data-name="${nombreHorario}"] span`)
                    .text(num);
            }
        }

        if ($('.dia-seleccionado').length === 1) {

            $('#sidebar-cambio-horario .contenedor-cambio-horarios-card').empty();
            $('#sidebar-cambio-horario .horarios-old').empty();
            $('#sidebar-cambio-horario .horarios-new').empty();

            if (num === 1) {
                $('.horarios-old').append(div);

            }

            $.ajax({
                type: "POST",
                url: "../getHorariosChange",
                data: { year: $('#anoActual').text() },
                dataType: "json",
                beforeSend: function () {
                    $('#loaderSidebarCambioHorario').show();
                },
                success: function (response) {

                    $('#loaderSidebarCambioHorario').hide();

                    const $contenedor = $('.contenedor-cambio-horarios-card');
                    $contenedor.empty();

                    response.horarios.forEach(horario => {
                        $contenedor.append(`
                        <div data-index="${horario.id_tipo_horario}" data-color="${horario.color}"
                             style="background-color:${horario.color}20;color:${horario.color};
                                    border:2px solid ${horario.color}90"
                             class="card-menu-horarios card-cambio-horario">

                            <span>${horario.nombre}</span>
                            <div class="descripcion">${horario.descripcion}</div>
                        </div>
                    `);
                    });
                }, 
                complete: function () {
                    $('#loaderSidebarCambioHorario').hide();
                }
            });

            $('#sidebar-cambio-horario').addClass('active');
            $('#calendario, #contenedor-loader-horario').addClass('seleccion-dia');
        }

        $('#dias-seleccionados').text($('.dia-seleccionado').length);
    });



    $(document).on('click', '.contenedor-cambio-horarios-card .card-cambio-horario', function (e) {

        e.preventDefault();

        $('.horarios-new').empty();

        let colorFondo = $(this).data('color');
        let idNuevoHorario = $(this).data('index');
        let div = $(`<div data-color="${colorFondo}" data-new="${idNuevoHorario}" style="width: 40px; height: 40px; border-radius: 5px; background-color: ${colorFondo}"></div>`)

        $('.horarios-new').append(div)
        $('#btn-guardar-cambio-seleccion').removeClass('btn-primary-personal-disabled');
    })

    $(document).on('click', '.dia-seleccionado', function (e) {

        e.preventDefault();
        $(this).removeClass('dia-seleccionado')
        let nombreHorario = $(this).data('name');

        if ($('.numero-dia.dia-seleccionado[data-name="' + nombreHorario + '"]').length === 0) {
            $(`.horarios-old div[data-name="${nombreHorario}"]`).remove();
        }
        else {
            $(`.horarios-old div[data-name="${nombreHorario}"] span`).text($('.numero-dia.dia-seleccionado[data-name="' + nombreHorario + '"]').length);
        }


        if ($('.dia-seleccionado').length < 1) {
            $('#sidebar-cambio-horario').removeClass('active');

            $('#calendario').removeClass('seleccion-dia')
            $('#contenedor-loader-horario').removeClass('seleccion-dia')
            $('.horarios-old').empty();
            $('.horarios-new').empty();
            $('#btn-guardar-cambio-seleccion').addClass('btn-primary-personal-disabled');
        }

        $('#dias-seleccionados').text($('.dia-seleccionado').length)

    })



    $(document).on('click', '#btn-guardar-cambio-seleccion', function (e) {
        e.preventDefault();

        console.log('Guardar cambios de selección de días');

        if ($(this).hasClass('btn-primary-personal-disabled')) return;

        let cambios = []

        $('.dia-seleccionado').map(function (i, diaSeleccionado) {
            let fecha = $(diaSeleccionado).data('day');
            let idHorario = $(diaSeleccionado).data('index');
            let nuevoHorario = $('.horarios-new div').attr('data-new');

            cambios.push({
                excepcion: ($('.dia-seleccionado').is('[data-exception="true"]')) ? true : false ,
                fecha: fecha,
                horarioAntiguo: idHorario,
                horarioNuevo: nuevoHorario
            });
        })

        $.ajax({
            type: "POST",
            url: "../cambiarHorariosSeleccionados",
            data: { cambios: cambios },
            dataType: "JSON",
            success: function (response) {
                if (response.success === true) {
                    generarCalendario($('#anoActual').text());
                    $('#sidebar-cambio-horario').removeClass('active');
                    $('#calendario').removeClass('seleccion-dia')
                    $('#contenedor-loader-horario').removeClass('seleccion-dia')
                    $('.dia-seleccionado').removeClass('dia-seleccionado')
                    $('.horarios-old').empty();
                    $('.horarios-new').empty();
                    $('#btn-guardar-cambio-seleccion').addClass('btn-primary-personal-disabled');
                }
            }
        });
    })



    // $(document).on('click', '.numero-dia.dia-seleccionado[data-exception="true"]', function(e){
    //     e.preventDefault();
    // })

    


    /***********************************************************************************************************************************
    *******************************************************  FUNCIONES DE AYUDA  *******************************************************
    ***********************************************************************************************************************************/

    function generarCalendario(year = null) {

        const fecha = new Date()
        const currentYear = (year === null) ? fecha.getFullYear() : year
        const instalacion = $('#instalacion').val();
        console.log(instalacion)

        $.ajax({
            type: "POST",
            url: "../comprobarHorarios",
            data: { year: currentYear, instalacion: instalacion },
            dataType: "json",
            beforeSend: function (event) {

                // Mostrar loader
                $("#loaderCalendario").show();
            },
            success: function (response) {

                let horarios = response.horarios;
                let excepciones = response.excepciones;
                renderizadoCalendario(currentYear, horarios, excepciones)
            },
            complete: function (event) {

                // Ocultar loader siempre, éxito o error
                $("#loaderCalendario").hide();
            }
        });


    }

    function renderizadoCalendario(year, horarios = null, excepciones = null) {

        $('#calendario').empty();

        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

        months.map(function (month, index) {

            let mes = generarMes(year, index)
            console.log(mes)
            let divMonth = $(`<div class="div-mes">
                                <div class="nombre-mes">
                                    <h3>${month}</h3>
                                </div>
                                
                                <div class="calendario-mes">
                                    <div class="grid-nombres-mes">
                                        ${days.map(function (day, index) {
                return `<div class="nombre-dia ${(index === 5 || index === 6) ? "weekend" : ""}">${day}</div>`;
            }).join('')
                }
                                    </div>
                                    <div class="grid-dias-mes">
                                        ${mes.map(function (semana) {
                    return semana.map(function (dia) {
                        if (!dia) return `<div class="numero-dia"></div>`;

                        const hoy = new Date();
                        const esHoy = dia.getFullYear() === hoy.getFullYear() &&
                            dia.getMonth() === hoy.getMonth() &&
                            dia.getDate() === hoy.getDate();
                        let colorFondo = '';
                        let nombre = ''
                        let idHorario = ''
                        let hayExcepcion = false;

                        if (excepciones && Array.isArray(excepciones) && excepciones.length > 0) {
                            excepciones.forEach(function (excepcion) {
                                let fechaExcepcionInicio = new Date(excepcion.fecha_inicio);
                                let fechaExcepcionFin = new Date(excepcion.fecha_fin);

                                fechaExcepcionInicio.setHours(0, 0, 0, 0)
                                fechaExcepcionFin.setHours(0, 0, 0, 0)

                                if (dia >= fechaExcepcionInicio && dia <= fechaExcepcionFin) {
                                    colorFondo = excepcion.color;
                                    nombre = excepcion.nombre;
                                    idHorario = excepcion.id_tipo_horario_excepcion;
                                    hayExcepcion = true;
                                }
                            })
                        }

                        if (!hayExcepcion && horarios && Array.isArray(horarios) && horarios.length > 0) {

                            horarios.forEach(function (horario) {

                                if (parseInt(horario.sin_fecha) === 0) {
                                    let fechaInicio = new Date(horario.fecha_inicio);
                                    let fechaFin = new Date(horario.fecha_fin);
                                    let color = horario.color;

                                    fechaInicio.setHours(0, 0, 0, 0)
                                    fechaFin.setHours(0, 0, 0, 0)

                                    if (dia >= fechaInicio && dia <= fechaFin) {
                                        colorFondo = color;
                                        nombre = horario.nombre
                                        idHorario = horario.id_tipo_horario;
                                    }
                                }
                            })

                        }


                        return `
<div data-color="${colorFondo}" data-name="${(nombre !== '') ? nombre : ''}" data-index= "${(idHorario !== '') ? idHorario : ''}" ${(hayExcepcion) ? 'data-exception="true"' : ''}

  title="${(nombre !== '') ? nombre : ''}"
  data-day="${dia.getDate()}/${dia.getMonth() + 1}/${dia.getFullYear()}"
  class="numero-dia${esHoy ? ' today' : ''} ${(dia.getDay() === 0 || dia.getDay() === 6) ? "weekend" : ""} ${nombre !== '' ? 'con-horario' : ''}"
  style="--colorFondo: ${colorFondo}; color: ${colorFondo};"
>
  ${dia.getDate()}
</div>`;

                    }).join('');
                }).join('')
                }
                                    </div>
                                </div>
                                </div>
            `);

            $('#calendario').append(divMonth);
        });
    }


    function generarMes(year, month) {
        let mes = [];
        let semana = new Array(7).fill(null);
        let lastDay = new Date(year, month + 1, 0).getDate();

        for (let dia = 1; dia <= lastDay; dia++) {
            let date = new Date(year, month, dia);
            let diaSemana = date.getDay()

            diaSemana = (diaSemana === 0) ? 6 : diaSemana - 1

            if (diaSemana === 6) {

                semana[diaSemana] = date
                mes.push(semana)
                semana = new Array(7).fill(null);
            }
            else {

                semana[diaSemana] = date

                if (dia === lastDay) {

                    mes.push(semana)
                    semana = new Array(7).fill(null);
                }
            }

        }

        return mes
    }


    function validarHorarios(horarioDistinto, errores, dataOpcional) {
        let valido = true;
        let dataHorarios = null;

        function horaMenor(h1, h2) {
            return h1.localeCompare(h2) < 0;
        }

        const LIMITE_MANANA = "15:00";
        const LIMITE_TARDE = "16:00";

        if (horarioDistinto === true) {
            dataHorarios = {};
            const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
            const turnos = ["Manana", "Tarde"];

            dias.forEach(dia => {
                const claveDia = dia.toLowerCase();
                dataHorarios[claveDia] = { manana: null, tarde: null };

                turnos.forEach(turno => {
                    const inicio = $(`#horaInicio${turno}${dia}Horario`).val();
                    const fin = $(`#horaFin${turno}${dia}Horario`).val();
                    const campos = $(`#horaInicio${turno}${dia}Horario, #horaFin${turno}${dia}Horario`);
                    campos.removeClass('is-invalid');

                    if ((inicio && !fin) || (!inicio && fin)) {
                        valido = false;
                        errores.push(`Debe completar ambas horas (${turno.toLowerCase()}) del ${dia}.`);
                        campos.addClass('is-invalid');
                    } else if (inicio && fin && !horaMenor(inicio, fin)) {
                        valido = false;
                        errores.push(`La hora de inicio (${inicio}) debe ser menor que la de fin (${fin}) en ${turno.toLowerCase()} del ${dia}.`);
                        campos.addClass('is-invalid');
                    }

                    // 🔧 CAMBIO: siempre guardamos el objeto, incluso si están vacíos
                    dataHorarios[claveDia][turno.toLowerCase()] = {
                        inicio: inicio || "",
                        fin: fin || ""
                    };

                    // 🔹 Validaciones adicionales
                    if (inicio && fin) {
                        if (turno === "Manana" && fin > LIMITE_MANANA) {
                            valido = false;
                            errores.push(`La hora de fin de la mañana del ${dia} (${fin}) no puede ser posterior a las ${LIMITE_MANANA}.`);
                            $(`#horaFinManana${dia}Horario`).addClass('is-invalid');
                        }

                        if (turno === "Tarde" && inicio < LIMITE_TARDE) {
                            valido = false;
                            errores.push(`La hora de inicio de la tarde del ${dia} (${inicio}) no puede ser anterior a las ${LIMITE_TARDE}.`);
                            $(`#horaInicioTarde${dia}Horario`).addClass('is-invalid');
                        }
                    }
                });

                // 🔹 Validación entre turnos
                const maniana = dataHorarios[claveDia].manana;
                const tarde = dataHorarios[claveDia].tarde;

                if (maniana.inicio && maniana.fin && tarde.inicio && tarde.fin) {
                    if (!horaMenor(maniana.fin, tarde.inicio)) {
                        valido = false;
                        errores.push(`El horario de la mañana del ${dia} (${maniana.fin}) debe ser anterior al inicio de la tarde (${tarde.inicio}).`);
                        $(`#horaFinManana${dia}Horario, #horaInicioTarde${dia}Horario`).addClass('is-invalid');
                    }
                }
            });

        } else {
            dataHorarios = { manana: null, tarde: null };
            const turnos = ["Manana", "Tarde"];

            turnos.forEach(turno => {
                const inicio = $(`#horaInicio${turno}Horario`).val();
                const fin = $(`#horaFin${turno}Horario`).val();
                const campos = $(`#horaInicio${turno}Horario, #horaFin${turno}Horario`);
                campos.removeClass('is-invalid');

                if ((inicio && !fin) || (!inicio && fin)) {
                    valido = false;
                    errores.push(`Debe completar ambas horas (${turno.toLowerCase()}) del horario general.`);
                    campos.addClass('is-invalid');
                } else if (inicio && fin && !horaMenor(inicio, fin)) {
                    valido = false;
                    errores.push(`La hora de inicio (${inicio}) debe ser menor que la de fin (${fin}) en el turno de ${turno.toLowerCase()}.`);
                    campos.addClass('is-invalid');
                }

                // 🔧 CAMBIO: siempre guardamos los campos, aunque estén vacíos
                dataHorarios[turno.toLowerCase()] = {
                    inicio: inicio || "",
                    fin: fin || ""
                };

                // 🔹 Validaciones de límites
                if (inicio && fin) {
                    if (turno === "Manana" && fin > LIMITE_MANANA) {
                        valido = false;
                        errores.push(`La hora de fin de la mañana (${fin}) no puede ser posterior a las ${LIMITE_MANANA}.`);
                        $(`#horaFinMananaHorario`).addClass('is-invalid');
                    }

                    if (turno === "Tarde" && inicio < LIMITE_TARDE) {
                        valido = false;
                        errores.push(`La hora de inicio de la tarde (${inicio}) no puede ser anterior a las ${LIMITE_TARDE}.`);
                        $(`#horaInicioTardeHorario`).addClass('is-invalid');
                    }
                }
            });

            // 🔹 Validación entre turnos
            const maniana = dataHorarios.manana;
            const tarde = dataHorarios.tarde;

            if (maniana.inicio && maniana.fin && tarde.inicio && tarde.fin) {
                if (!horaMenor(maniana.fin, tarde.inicio)) {
                    valido = false;
                    errores.push(`El horario de la mañana (${maniana.fin}) debe ser anterior al inicio de la tarde (${tarde.inicio}) en el horario general.`);
                    $(`#horaFinMananaHorario, #horaInicioTardeHorario`).addClass('is-invalid');
                }
            }
        }

        if (valido && dataOpcional && typeof dataOpcional === 'object') {
            dataOpcional['horarios'] = dataHorarios;
        }

        return valido;
    }



    function validarHorariosEditar(horarioDistinto, errores, dataOpcional) {
        let valido = true;
        let dataHorarios = null;

        function horaMenor(h1, h2) {
            return h1.localeCompare(h2) < 0;
        }

        const LIMITE_MANANA = "15:00";
        const LIMITE_TARDE = "16:00";

        if (horarioDistinto === true) {
            dataHorarios = {};
            const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
            const turnos = ["Manana", "Tarde"];

            dias.forEach(dia => {
                const claveDia = dia.toLowerCase();
                dataHorarios[claveDia] = { manana: null, tarde: null };

                turnos.forEach(turno => {
                    const inicio = $(`#horaInicio${turno}${dia}HorarioEditar`).val();
                    const fin = $(`#horaFin${turno}${dia}HorarioEditar`).val();
                    const campos = $(`#horaInicio${turno}${dia}HorarioEditar, #horaFin${turno}${dia}HorarioEditar`);
                    campos.removeClass('is-invalid');

                    if ((inicio && !fin) || (!inicio && fin)) {
                        valido = false;
                        errores.push(`Debe completar ambas horas (${turno.toLowerCase()}) del ${dia}.`);
                        campos.addClass('is-invalid');
                    } else if (inicio && fin && !horaMenor(inicio, fin)) {
                        valido = false;
                        errores.push(`La hora de inicio (${inicio}) debe ser menor que la de fin (${fin}) en ${turno.toLowerCase()} del ${dia}.`);
                        campos.addClass('is-invalid');
                    }

                    // Guardamos los datos aunque estén vacíos
                    dataHorarios[claveDia][turno.toLowerCase()] = {
                        inicio: inicio || "",
                        fin: fin || ""
                    };

                    // Validaciones adicionales
                    if (inicio && fin) {
                        if (turno === "Manana" && fin > LIMITE_MANANA) {
                            valido = false;
                            errores.push(`La hora de fin de la mañana del ${dia} (${fin}) no puede ser posterior a las ${LIMITE_MANANA}.`);
                            $(`#horaFinManana${dia}HorarioEditar`).addClass('is-invalid');
                        }

                        if (turno === "Tarde" && inicio < LIMITE_TARDE) {
                            valido = false;
                            errores.push(`La hora de inicio de la tarde del ${dia} (${inicio}) no puede ser anterior a las ${LIMITE_TARDE}.`);
                            $(`#horaInicioTarde${dia}HorarioEditar`).addClass('is-invalid');
                        }
                    }
                });

                // Validación entre turnos
                const maniana = dataHorarios[claveDia].manana;
                const tarde = dataHorarios[claveDia].tarde;

                if (maniana.inicio && maniana.fin && tarde.inicio && tarde.fin) {
                    if (!horaMenor(maniana.fin, tarde.inicio)) {
                        valido = false;
                        errores.push(`El horario de la mañana del ${dia} (${maniana.fin}) debe ser anterior al inicio de la tarde (${tarde.inicio}).`);
                        $(`#horaFinManana${dia}HorarioEditar, #horaInicioTarde${dia}HorarioEditar`).addClass('is-invalid');
                    }
                }
            });

        } else {
            dataHorarios = { manana: null, tarde: null };
            const turnos = ["Manana", "Tarde"];

            turnos.forEach(turno => {
                const inicio = $(`#horaInicio${turno}HorarioEditar`).val();
                const fin = $(`#horaFin${turno}HorarioEditar`).val();
                const campos = $(`#horaInicio${turno}HorarioEditar, #horaFin${turno}HorarioEditar`);
                campos.removeClass('is-invalid');

                if ((inicio && !fin) || (!inicio && fin)) {
                    valido = false;
                    errores.push(`Debe completar ambas horas (${turno.toLowerCase()}) del horario general.`);
                    campos.addClass('is-invalid');
                } else if (inicio && fin && !horaMenor(inicio, fin)) {
                    valido = false;
                    errores.push(`La hora de inicio (${inicio}) debe ser menor que la de fin (${fin}) en el turno de ${turno.toLowerCase()}.`);
                    campos.addClass('is-invalid');
                }

                dataHorarios[turno.toLowerCase()] = {
                    inicio: inicio || "",
                    fin: fin || ""
                };

                if (inicio && fin) {
                    if (turno === "Manana" && fin > LIMITE_MANANA) {
                        valido = false;
                        errores.push(`La hora de fin de la mañana (${fin}) no puede ser posterior a las ${LIMITE_MANANA}.`);
                        $(`#horaFinMananaHorarioEditar`).addClass('is-invalid');
                    }

                    if (turno === "Tarde" && inicio < LIMITE_TARDE) {
                        valido = false;
                        errores.push(`La hora de inicio de la tarde (${inicio}) no puede ser anterior a las ${LIMITE_TARDE}.`);
                        $(`#horaInicioTardeHorarioEditar`).addClass('is-invalid');
                    }
                }
            });

            const maniana = dataHorarios.manana;
            const tarde = dataHorarios.tarde;

            if (maniana.inicio && maniana.fin && tarde.inicio && tarde.fin) {
                if (!horaMenor(maniana.fin, tarde.inicio)) {
                    valido = false;
                    errores.push(`El horario de la mañana (${maniana.fin}) debe ser anterior al inicio de la tarde (${tarde.inicio}) en el horario general.`);
                    $(`#horaFinMananaHorarioEditar, #horaInicioTardeHorarioEditar`).addClass('is-invalid');
                }
            }
        }

        if (valido && dataOpcional && typeof dataOpcional === 'object') {
            dataOpcional['horarios'] = dataHorarios;
        }


        $.ajax({
            type: "method",
            url: "url",
            data: "data",
            dataType: "dataType",
            success: function (response) {
                
            }
        });

        return valido;
    }

/***********************************************************************************************************************************
*************************************************  RESIZE SIDEBAR FOOTER  **********************************************************
***********************************************************************************************************************************/

/**
 * 🚀 Clase para redimensionar el sidebar-footer eficientemente
 */
class SidebarFooterResizer {
    constructor(options = {}) {
        this.config = {
            targetSelector: options.targetSelector || '#sidebar-cambio-horario .sidebar-footer',
            handleClass: 'resize-handle-footer',
            minHeight: options.minHeight || 150,
            maxHeight: options.maxHeight || 500,
            storageKey: options.storageKey || 'sidebar_footer_height',
            saveToStorage: options.saveToStorage !== false
        };

        this.state = {
            isResizing: false,
            rafId: null,
            $element: null,
            startY: 0,
            startHeight: 0
        };

        this.init();
    }

    init() {
        this.state.$element = $(this.config.targetSelector);
        
        if (this.state.$element.length === 0) {
            console.warn('Sidebar footer no encontrado');
            return;
        }

        this.createHandle();
        this.restoreHeight();
        this.bindEvents();
    }

    createHandle() {
        // Verificar si ya existe el handle
        if (this.state.$element.find(`.${this.config.handleClass}`).length > 0) {
            return;
        }

        const $handle = $(`<div class="${this.config.handleClass}"></div>`);
        this.state.$element.prepend($handle);
    }

    bindEvents() {
        const self = this;

        // MouseDown - Iniciar resize
        $(document).on('mousedown', `.${this.config.handleClass}`, function(e) {
            e.preventDefault();
            self.startResize(e);
        });

        // MouseMove - Durante resize
        $(document).on('mousemove', function(e) {
            if (!self.state.isResizing) return;
            self.handleMouseMove(e);
        });

        // MouseUp - Finalizar resize
        $(document).on('mouseup', function() {
            if (self.state.isResizing) {
                self.stopResize();
            }
        });

        // Prevenir selección de texto
        $(document).on('selectstart', function(e) {
            if ($('body').hasClass('resizing-sidebar-footer')) {
                e.preventDefault();
                return false;
            }
        });
    }

    startResize(e) {
        this.state.isResizing = true;
        this.state.startY = e.clientY;
        this.state.startHeight = this.state.$element.outerHeight();

        // Añadir clases para estilos
        $('body').addClass('resizing-sidebar-footer');
        this.state.$element.addClass('resizing-active');
    }

    handleMouseMove(e) {
        // Cancelar frame anterior si existe
        if (this.state.rafId) {
            cancelAnimationFrame(this.state.rafId);
        }

        // Programar nuevo frame con RAF
        this.state.rafId = requestAnimationFrame(() => {
            this.resize(e.clientY);
            this.state.rafId = null;
        });
    }

    resize(clientY) {
        // Calcular nueva altura (invertido porque el handle está arriba)
        const deltaY = this.state.startY - clientY;
        let newHeight = this.state.startHeight + deltaY;

        // Aplicar límites
        newHeight = Math.max(this.config.minHeight, Math.min(this.config.maxHeight, newHeight));

        // Aplicar nueva altura
        this.state.$element.css('height', newHeight + 'px');
    }

    stopResize() {
        this.state.isResizing = false;

        // Cancelar cualquier frame pendiente
        if (this.state.rafId) {
            cancelAnimationFrame(this.state.rafId);
            this.state.rafId = null;
        }

        // Remover clases
        $('body').removeClass('resizing-sidebar-footer');
        this.state.$element.removeClass('resizing-active');

        // Guardar altura en localStorage
        if (this.config.saveToStorage) {
            this.saveHeight();
        }
    }

    saveHeight() {
        const height = this.state.$element.outerHeight();
        try {
            localStorage.setItem(this.config.storageKey, height);
        } catch (e) {
            console.warn('No se pudo guardar la altura en localStorage');
        }
    }

    restoreHeight() {
        if (!this.config.saveToStorage) return;

        try {
            const savedHeight = localStorage.getItem(this.config.storageKey);
            if (savedHeight) {
                const height = parseInt(savedHeight);
                if (height >= this.config.minHeight && height <= this.config.maxHeight) {
                    this.state.$element.css('height', height + 'px');
                }
            }
        } catch (e) {
            console.warn('No se pudo restaurar la altura desde localStorage');
        }
    }

    destroy() {
        // Cancelar RAF si existe
        if (this.state.rafId) {
            cancelAnimationFrame(this.state.rafId);
        }

        // Remover handle
        this.state.$element.find(`.${this.config.handleClass}`).remove();

        // Unbind events
        $(document).off('mousedown', `.${this.config.handleClass}`);

        // Limpiar estilos
        $('body').removeClass('resizing-sidebar-footer');
        this.state.$element.removeClass('resizing-active');
    }

    setHeight(height) {
        height = Math.max(this.config.minHeight, Math.min(this.config.maxHeight, height));
        this.state.$element.css('height', height + 'px');
        
        if (this.config.saveToStorage) {
            this.saveHeight();
        }
    }

    getHeight() {
        return this.state.$element.outerHeight();
    }
}

/***********************************************************************************************************************************
************************************************  INICIALIZACIÓN DEL RESIZER  ******************************************************
***********************************************************************************************************************************/

// Inicializar el resizer del sidebar footer
window.sidebarFooterResizer = new SidebarFooterResizer({
    targetSelector: '#sidebar-cambio-horario .sidebar-footer',
    minHeight: 100,
    maxHeight: 500,
    storageKey: 'sidebar_cambio_horario_footer_height',
    saveToStorage: true // Guarda la altura preferida del usuario
});

// Limpiar cuando se cierra el sidebar (opcional)
$(document).on('click', '#btnCerraSidebarCambio', function() {
    // El resizer sigue activo, solo se oculta el sidebar
    // Si quieres resetear la altura al cerrar, descomenta:
    // window.sidebarFooterResizer.setHeight(200);
});

})