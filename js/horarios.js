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