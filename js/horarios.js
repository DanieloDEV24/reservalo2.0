/*****************************************************************************************************************************************
******************************************************************** HORARIOS ************************************************************ 
******************************************************************************************************************************************/
/*****************************************************************************************************************************************
 * En este archivo, generaremos el calendario del año para generar horarios, crear horarios, modificarlos... : 
 * Creación del calendario --> Creación del calendario dinamico de este año y el siguiente, podiendo de esta manera generar sus horarios
********************************************************************************************************************************************/
$(document).ready(() => {

    
    let contenedor = $('.seleccion-horas');
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

    generarCalendario()
    
    /***********************************************************************************************************************************
    ********************************************************  SELECCIÓN DE AÑO *********************************************************
    ***********************************************************************************************************************************/

    $(document).on('click', '#btn-next-year', function(){

        let currentYearSpan = parseInt($('#anoActual').text());
        let newYear = currentYearSpan + 1;
        let currentYear = new Date().getFullYear();

        console.log(currentYear)

        if(newYear > (currentYear + 1)){
            return 
        }
        else
        {
            $('#anoActual').text(newYear);
            generarCalendario(newYear);
        }

        
    })

    $(document).on('click', '#btn-previous-year', function(){

    let currentYearSpan = parseInt($('#anoActual').text());
    let newYear = currentYearSpan - 1;
    let currentYear = new Date().getFullYear();

    console.log(currentYear)

    if(newYear < (currentYear - 1)){
        return 
    }
    else
    {
        $('#anoActual').text(newYear);
        generarCalendario(newYear);
    }    
    })


    /***********************************************************************************************************************************
    ************************************************************  CREAR HORARIO  *******************************************************
    ***********************************************************************************************************************************/

    $(document).on('click', '#btnCrearHorario', function(e){

        e.preventDefault()
        $('#sidebar').addClass('active');
        $('#sidebarMenu').removeClass('active');
    })


    $(document).on('click', '#btnCerraSidebarCrear', function(e){

        e.preventDefault()
        $('#sidebar').removeClass('active');
    })

    /***********************************************************************************************************************************
    ******************************************************  CREACIÓN DEL HORARIO  ******************************************************
    ***********************************************************************************************************************************/

    $(document).on('click', '#horarioDistinto', function(){
        
        let checked = $(this).is(':checked');
        contenedor.empty();
        if(checked)
        {
            contenedor.append(diferentesNode)
        }
        else
        {
            contenedor.append(igualNode)
        }

    })

    $(document).on('click', '#horarioEspecial', function(){

        if($(this).is(':checked')){

            $('#infoText').addClass('show')
            if($('#horarioDistinto').is(':checked')){
                
                $('#horarioDistinto').prop('checked', false)
                contenedor.empty();
                contenedor.append(igualNode)
            }
           
            $('#horarioDistinto').prop('disabled', true)
            $('.horarioDistinto label').addClass('label-disabled')
        }
        else{
            $('#infoText').removeClass('show')
            $('#horarioDistinto').prop('disabled', false)
            $('.horarioDistinto label').removeClass('label-disabled')
        }
    })


$(document).on('click', '#btnGuardarNuevoHorario', function(e) {

    e.preventDefault();
    let data = {};
    let errores = [];

    data["instalacion"] = $('#instalacion').val()

    // Obtenemos los datos del formulario
    let nombre          = $('#nombreHorario').val();
    let descripcion     = $('#descripcionHorario').val();
    let horarioEspecial = ($('#horarioEspecial').is(':checked')) ? 1 : 0;
    let fechaInicio     = $('#fechaInicioHorario').val(); 
    let fechaFin        = $('#fechaFinHorario').val();
    let horarioDistinto = $('#horarioDistinto').is(':checked');

    let fechaInicioDate = new Date(fechaInicio)
    let fechaFinDate = new Date(fechaFin)

    let initialYear = fechaInicioDate.getFullYear()
    let finishYear  = fechaFinDate.getFullYear();

    let currentYear = new Date().getFullYear()
    let nextYear = (new Date().getFullYear() + 1)

    let color = $('#scheduleColor').val();
    data["color"] = color

    // Validaciones básicas
    if (nombre !== ""){
        data["nombre"] = nombre;
        $('#nombreHorario').removeClass('is-invalid')
    }
    else{
        errores.push("Debe escribir un nombre para el horario.");  
        $('#nombreHorario').addClass('is-invalid');
    }

    if (descripcion !== ""){
        data["descripcion"] = descripcion;
        $('#descripcionHorario').removeClass('is-invalid')
    }
    else {
        errores.push("Debe escribir una descripción para el horario.");
        $('#descripcionHorario').addClass('is-invalid');
    }

    if (horarioEspecial === 0 && fechaInicio === ""){
        errores.push("Si no es un horario especial debe seleccionar la fecha de inicio del horario.");
        $('#fechaInicioHorario').addClass('is-invalid')
        $('#fechaFinHorario').removeClass('is-invalid')
    }
    else if (horarioEspecial === 0 && fechaFin === ""){
        errores.push("Si no es un horario especial debe seleccionar la fecha de fin del horario.");
        $('#fechaInicioHorario').removeClass('is-invalid')
        $('#fechaFinHorario').addClass('is-invalid')
    }
    else if (fechaInicioDate > fechaFinDate ){
        errores.push("La fecha de inicio no puede ser mayor que la final");
        $('#fechaInicioHorario').addClass('is-invalid')
        $('#fechaFinHorario').addClass('is-invalid')
    }
    else if((initialYear < currentYear) || (finishYear < currentYear))
    {
        errores.push("No se puede crear un horario para años anteriores al " + currentYear + ".");
        $('#fechaInicioHorario').addClass('is-invalid')
        $('#fechaFinHorario').removeClass('is-invalid')
    }
    else if((finishYear > nextYear) || (initialYear > nextYear))
    {
        errores.push("No se puede crear un horario para años anteriores al " + nextYear +".");
        $('#fechaInicioHorario').removeClass('is-invalid')
        $('#fechaFinHorario').addClass('is-invalid')
    }
    else 
    {
        data['fecha_inicio'] = fechaInicio, 
        data['fecha_fin'] = fechaFin
        $('#fechaInicioHorario').removeClass('is-invalid')
        $('#fechaFinHorario').removeClass('is-invalid')
    }
      
    // ✅ Validación de horarios (incluye orden de horas)
    if (!validarHorarios(horarioDistinto, errores, data)) {
        console.error("Errores en horarios detectados");
    }

    $('.erroresHorario').empty();
    // Si no hay errores, mostramos datos
    if (errores.length === 0) {
        // console.log(data);
        $.ajax({
            type: "POST",
            url: "../crearHorario",
            data: {data: data},
            dataType: "json",
            success: function (response) {
               
                if(response.success === true) {
                    generarCalendario();
                    $('.legend').append(`
                                    <div class="legend-item">
                                        <div class="legend-color" style="background-color: ${response.infoHorario["color"]}"></div> 
                                        <span>${response.infoHorario["nombre"]}</span>
                                    </div>
                    `)

                    $('#sidebar').removeClass('active');
                }                    
            }
        });
    }
    else {

        let lista = $(`<ul></ul>`)
        errores.map(function(error){
            let elemento = $(`<li>${error}</li>`);
            lista.append(elemento)
        })

        let alertBox = $(`<div class="alert alert-danger mb-0" role="alert"></div>`);
        alertBox.append(lista)

        $('.erroresHorario').append(alertBox);
    }
});


$(document).on('change', '#scheduleColor', function(){

    let color = $(this).val()
    $('#colorValue').text(color)
})

    /***********************************************************************************************************************************
    *********************************************************  MENÚ DE HORARIOS  *******************************************************
    ***********************************************************************************************************************************/
    
    $(document).on('click', '#btnMenuHorario', function(e){

        e.preventDefault()
        $('#sidebarMenu').addClass('active');
        $('#sidebar').removeClass('active');
    })


    $(document).on('click', '#btnCerraSidebarMenu', function(e){

        e.preventDefault()
        $('#sidebarMenu').removeClass('active');
    })

    /***********************************************************************************************************************************
    *******************************************************  FUNCIONES DE AYUDA  *******************************************************
    ***********************************************************************************************************************************/

    function generarCalendario(year = null) {

        const fecha = new Date()
        const currentYear = (year === null) ? fecha.getFullYear() : year

        $.ajax({
            type: "POST",
            url: "../comprobarHorarios",
            data: {year: currentYear},
            dataType: "json",
            success: function (response) {
                
                let horarios = response.horarios;
                renderizadoCalendario(currentYear, horarios)
            }
        });

        
    }

    function renderizadoCalendario(year, horarios = null) {

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
                            let nombre = ""
                            if(horarios && Array.isArray(horarios) && horarios.length > 0) {
                                
                                horarios.forEach(function(horario){
                                    let fechaInicio = new Date(horario.fecha_inicio); 
                                    let fechaFin    = new Date(horario.fecha_fin);
                                    let color       = horario.color;
                                    nombre = horario.nombre

                                    if(dia >= fechaInicio && dia <= fechaFin) {
                                        colorFondo = color;
                                    }
                                })

                            }
                            

                        return `<div data-day="${dia.getDate()}/${dia.getMonth() + 1}/${dia.getFullYear()}" class="numero-dia${esHoy ? ' today' : ''} ${(dia.getDay() === 0 || dia.getDay() === 6) ? "weekend" : ""}" style="background-color: ${colorFondo}20; color: ${colorFondo}">${dia.getDate()}</div>`;
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
        const dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
        const turnos = ["Manana","Tarde"];

        dias.forEach(dia => {
            const claveDia = dia.toLowerCase();
            dataHorarios[claveDia] = { manana: null, tarde: null };

            turnos.forEach(turno => {
                const inicio = $(`#horaInicio${turno}${dia}Horario`).val();
                const fin    = $(`#horaFin${turno}${dia}Horario`).val();
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
        const turnos = ["Manana","Tarde"];

        turnos.forEach(turno => {
            const inicio = $(`#horaInicio${turno}Horario`).val();
            const fin    = $(`#horaFin${turno}Horario`).val();
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


})