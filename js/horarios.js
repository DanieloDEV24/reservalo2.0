/*****************************************************************************************************************************************
******************************************************************** HORARIOS ************************************************************ 
******************************************************************************************************************************************/
/*****************************************************************************************************************************************
 * En este archivo, generaremos el calendario del año para generar horarios, crear horarios, modificarlos... : 
 * Creación del calendario --> Creación del calendario dinamico de este año y el siguiente, podiendo de esta manera generar sus horarios
********************************************************************************************************************************************/
$(document).ready(() => {

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
    })


    $(document).on('click', '#btnCerraSidebarCrear', function(e){

        e.preventDefault()
        $('#sidebar').removeClass('active');
    })

    /***********************************************************************************************************************************
    *******************************************************  FUNCIONES DE AYUDA  *******************************************************
    ***********************************************************************************************************************************/

    $(document).on('click', '#horarioDistinto', function(){

        let checked = $(this).is(':checked');
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

    /***********************************************************************************************************************************
    *******************************************************  FUNCIONES DE AYUDA  *******************************************************
    ***********************************************************************************************************************************/

    function generarCalendario(year = null) {

        const fecha = new Date()
        const currentYear = (year === null) ? fecha.getFullYear() : year

        renderizadoCalendario(currentYear)
    }

    function renderizadoCalendario(year) {

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

                        return `<div class="numero-dia${esHoy ? ' today' : ''} ${(dia.getDay() === 0 || dia.getDay() === 6) ? "weekend" : ""}">${dia.getDate()}</div>`;
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
})