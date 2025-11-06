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
                beforeSend: function() {
                    $('#loaderNuevoHorario').show();
                    $('#btnGuardarNuevoHorario').addClass('cargando')
                    $('#sidebar input').addClass('cargando')
                    $('#sidebar textarea').addClass('cargando')
                },
                success: function (response) {
                
                    if(response.success === true) {

                        $('#loaderNuevoHorario').hide();
                        $('#btnGuardarNuevoHorario').removeClass('cargando')
                        $('#sidebar input').removeClass('cargando')
                        $('#sidebar textarea').removeClass('cargando')

                        console.log(response)

                        generarCalendario();
                        $('.legend').append(`
                                        <div class="legend-item">
                                            <div class="legend-color" style="background-color: ${response.infoHorario["color"]}"></div> 
                                            <span>${response.infoHorario["nombre"]}</span>
                                        </div>
                        `)

                        $('#horarios-normailes-menu').append(`
                            <div data-index="${response.infoHorario["id_tipo_horario"]}" style="background-color: ${response.infoHorario["color"]}20; color: ${response.infoHorario["color"]}; border: 2px solid ${response.infoHorario["color"]}90" class="card-menu-horarios">
                                <span>${response.infoHorario["nombre"]}</span>
                                <div class="fechas">
                                    ${
                                        new Date(response.infoHorario["fecha_inicio"]).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                    }
                                    -
                                    ${
                                        new Date(response.infoHorario["fecha_fin"]).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                    }
                                </div>

                                <div class="descripcion">
                                    ${response.infoHorario["descripcion"]}
                                </div>

                                <div class="dropdown opciones-horario" style="max-width: 200px;">
                                    <a href="#" class="opciones-horario-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: ${response.infoHorario["color"]};"><i class="bi bi-three-dots-vertical"></i></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="" class="btnEditarHorario"><i class="bi bi-pencil"></i>&nbsp;&nbsp;Editar</a></li>
                                        <li><a href="" class="delete-option"><i class="bi bi-trash3"></i>&nbsp;&nbsp;Eliminar</a></li>
                                    </ul>
                                </div>
                            </div>
                        `)

                        $('#sidebar').removeClass('active');
                    }                    
                }, 
                complete: function() {
                    $('#loaderNuevoHorario').hide();
                    $('#btnGuardarNuevoHorario').removeClass('cargando')
                    $('#sidebar input').removeClass('cargando')
                    $('#sidebar textarea').removeClass('cargando')
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


    $(document).on('click', '.btnEditarHorario', function(e){
        
        e.preventDefault();

        let id = $(this).closest('.card-menu-horarios').data('index');
        console.log(id)

        $('#idHorarioEditar').val(id);
        
        $.ajax({
            type: "POST",
            url: "../getHorario",
            data: {id: id},
            dataType: "json",
            success: function (response) {
                
                if(response.succes === true){

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
                    
                    if(parseInt(response.franjas[0].franja_unica) === 0) {

                        $('#contenedor-input-horas-editar').append(diferentesNodeEditar)    

                        response.franjas.map(function(franja){
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

                    $('#modalEditarHorario').show();
                }
            }
        });

    })

    $(document).on('click', '#btnGurdarHorarioEditar', function(e){
        
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
        let finishYear  = fechaFinDate.getFullYear();

        data["id_tipo_horario"] = $('#idHorarioEditar').val();

        // Validaciones básicas
        if (nombre !== ""){
            data["nombre"] = nombre;
            $('#nombreHorarioEditar').removeClass('is-invalid')
        }
        else{
            errores.push("Debe escribir un nombre para el horario.");  
            $('#nombreHorarioEditar').addClass('is-invalid');
        }

        if (descripcion !== ""){
            data["descripcion"] = descripcion;
            $('#descripcionHorarioEditar').removeClass('is-invalid')
        }
        else {
            errores.push("Debe escribir una descripción para el horario.");
            $('#descripcionHorarioEditar').addClass('is-invalid');
        }

        if (fechaInicio === ""){
            errores.push("Si no es un horario especial debe seleccionar la fecha de inicio del horario.");
            $('#fechaIincioHorarioEditar').addClass('is-invalid')
            $('#fechaFinHorarioEditar').removeClass('is-invalid')
        }
        else if (fechaFin === ""){
            errores.push("Si no es un horario especial debe seleccionar la fecha de fin del horario.");
            $('#fechaIincioHorarioEditar').removeClass('is-invalid')
            $('#fechaFinHorarioEditar').addClass('is-invalid')
        }
        else if (fechaInicioDate > fechaFinDate ){
            errores.push("La fecha de inicio no puede ser mayor que la final");
            $('#fechaIincioHorarioEditar').addClass('is-invalid')
            $('#fechaFinHorarioEditar').addClass('is-invalid')
        }
        else if((initialYear < currentYear) || (finishYear < currentYear))
        {
            errores.push("No se puede crear un horario para años anteriores al " + currentYear + ".");
            $('#fechaIincioHorarioEditar').addClass('is-invalid')
            $('#fechaFinHorarioEditar').removeClass('is-invalid')
        }
        else if((finishYear > nextYear) || (initialYear > nextYear))
        {
            errores.push("No se puede crear un horario para años anteriores al " + nextYear +".");
            $('#fechaIincioHorarioEditar').removeClass('is-invalid')
            $('#fechaFinHorarioEditar').addClass('is-invalid')
        }
        else 
        {
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

        if(errores.length === 0) {
            console.log(data);
            $.ajax({
                type: "POST",
                url: "../editarHorario",
                data: {data: data},
                dataType: "json",
                beforeSend: function () {
                    $('#loaderModalEditar').show();
                    $('#modalEditarHorario .modal-footer button').addClass('cargando')
                    $('#modalEditarHorario input').addClass('cargando')
                    $('#modalEditarHorario textarea').addClass('cargando')
                },
                success: function (response) {
                    
                    if(response.success === true) {

                        $('#loaderModalEditar').hide();
                        $('#modalEditarHorario .modal-footer button').removeClass('cargando')
                        $('#modalEditarHorario input').removeClass('cargando')
                        $('#modalEditarHorario textarea').removeClass('cargando')

                        generarCalendario();
                        $('#modalEditarHorario').hide();
                    }
                },
                complete: function() {
                    $('#loaderModalEditar').hide();
                    $('#modalEditarHorario .modal-footer button').removeClass('cargando')
                    $('#modalEditarHorario input').removeClass('cargando')
                    $('#modalEditarHorario textarea').removeClass('cargando')
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
            $('#errores-editar-horario').append(alertBox);
        }

        
    })

    $(document).on('change', '#horarioDistintoEditar', function(){
        
        let checked = $(this).is(':checked');
        $('#contenedor-input-horas-editar').empty();
        if(checked){
            $('#contenedor-input-horas-editar').append(diferentesNodeEditar)
        }
        else {
            $('#contenedor-input-horas-editar').append(igualNodeEditar)
        }
    })

    $(document).on('change', '#scheduleColorEditar', function(){
        let color = $(this).val()
        $('#colorValueEditar').text(color)
    })

    $(document).on('click', '.modal .btn-close', function(e){
        e.preventDefault()
        $('#modalEditarHorario').hide();
    })


    $(document).on('click', '.btnBorrarHorario', function(e){
        e.preventDefault();

        let id = $(this).closest('.card-menu-horarios').data('index');

        $.ajax({
            type: "POST",
            url: "../getHorario",
            data: {id: id},
            dataType: "JSON",
            success: function (response) {
                
                if(response.succes === true) {

                    $('#idHorarioBorrar').val(id);
                   
                }
            }
        });
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
            beforeSend: function (event) {
                
                // Mostrar loader
                $("#loaderCalendario").show();
            },
            success: function (response) {
                
                let horarios = response.horarios;
                renderizadoCalendario(currentYear, horarios)
            }, 
            complete: function (event) {
                
                // Ocultar loader siempre, éxito o error
                $("#loaderCalendario").hide();
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
        const dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
        const turnos = ["Manana","Tarde"];

        dias.forEach(dia => {
            const claveDia = dia.toLowerCase();
            dataHorarios[claveDia] = { manana: null, tarde: null };

            turnos.forEach(turno => {
                const inicio = $(`#horaInicio${turno}${dia}HorarioEditar`).val();
                const fin    = $(`#horaFin${turno}${dia}HorarioEditar`).val();
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
        const turnos = ["Manana","Tarde"];

        turnos.forEach(turno => {
            const inicio = $(`#horaInicio${turno}HorarioEditar`).val();
            const fin    = $(`#horaFin${turno}HorarioEditar`).val();
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

    return valido;
}



})