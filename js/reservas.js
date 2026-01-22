$(document).ready(() => {
    $(document).on('click', '.btn-panel-reservas', function (e) {
        e.preventDefault();

        // Obtenemos el id de la pista de la que queremos hacer la reserva
        let pistaId = $(this).closest('.card-instalacion').data('index');

        // Guardar el pistaId en el input hidden del modal
        $('#pistaId').val(pistaId);

        let fechaFormateada = new Date().toISOString().split('T')[0];

        $.ajax({
            type: "POST",
            url: "../getInfoPistasReserva",
            data: { pistaId: pistaId, "fecha": fechaFormateada },
            dataType: "json",
            success: function (response) {
                if (response.success === true) {

                    $("#nombre-pista").text(response.infoPista[0].nombre_pista);
                    $("#capacidad-pista").text(response.infoPista[0].capacidad_pista + " personas");
                    $("#img1-pista").attr("src", response.baseUrl + "images/" + response.infoPista[0].imagen1);
                    $("#img2-pista").attr("src", response.baseUrl + "images/" + response.infoPista[0].imagen2);
                    $("#img3-pista").attr("src", response.baseUrl + "images/" + response.infoPista[0].imagen3);
                    $("#img4-pista").attr("src", response.baseUrl + "images/" + response.infoPista[0].imagen4);
                    $("#categoria-pista").text(response.infoPista[0].categoria);
                    $("#precio-pista").text(response.infoPista[0].precio_pista)


                    if (response.hayHorarios === true) {

                        // Obtenemos los margenes de horas
                        let horaInicioManana = response.infoPista[0].hora_inicio_manana;
                        let horaFinManana = response.infoPista[0].hora_fin_manana;
                        let horaInicioTarde = response.infoPista[0].hora_inicio_tarde;
                        let horaFinTarde = response.infoPista[0].hora_fin_tarde;

                        let horasDisponibles = [
                            ...generarHoras(horaInicioManana, horaFinManana),
                            ...generarHoras(horaInicioTarde, horaFinTarde)
                        ]

                        $('#grid-horas-disponibles').empty();
                        $('#no-hay-horario').addClass('no-ver');

                        const ahora = new Date();
                        const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();

                        horasDisponibles.map(hora => {

                            let minutosHora = horaEnMinutos(hora)

                            let btn = `<button type="button" class="btn btn-outline-secondary btn-horario ${(minutosHora <= minutosAhora) ? 'hora-pasada' : ''}" data-hora="${hora}">${hora}</button>`
                            $('#grid-horas-disponibles').append(btn);
                        })

                        $('#grid-horas-disponibles').removeClass('no-ver');


                    }
                    else {
                        let div = $(`
                               <div class="d-flex justify-content-center align-items-center gap-1 flex-column p-2" >
                                   <i class="bi bi-exclamation-triangle" style="font-size: 3rem;"></i> 
                                   <span style="font-size: 1.2rem; text-align: center;">No hay horarios disponibles para esta fecha.</span>
                               </div>
                            `)

                        $('#no-hay-horario').empty().append(div)
                        $('#grid-horas-disponibles').addClass('no-ver');
                        $('#no-hay-horario').removeClass('no-ver');
                    }


                    $('#modalReservaPista').modal('show');
                }
            }
        });

    })


    $(document).on('click', '.otro-mes', function () {
        return;
    })

    $(document).on('click', '.disabled', function () {
        return;
    })

    $(document).on('click', '.dia-calendario', function () {

        if ($(this).hasClass('otro-mes')) return;
        if ($(this).hasClass('disabled')) return;

        let fecha = $(this).data('fecha');
        let pista = parseInt($('#pistaId').val())

        $.ajax({
            type: "POST",
            url: "../getInfoPistasReserva",
            data: { "pistaId": pista, "fecha": fecha },
            dataType: "JSON",
            success: function (response) {

                if (response.hayHorarios === true) {

                    // Obtenemos los margenes de horas
                    let horaInicioManana = response.infoPista[0].hora_inicio_manana;
                    let horaFinManana = response.infoPista[0].hora_fin_manana;
                    let horaInicioTarde = response.infoPista[0].hora_inicio_tarde;
                    let horaFinTarde = response.infoPista[0].hora_fin_tarde;

                    let horasDisponibles = [
                        ...generarHoras(horaInicioManana, horaFinManana),
                        ...generarHoras(horaInicioTarde, horaFinTarde)
                    ]

                    $('#grid-horas-disponibles').empty();
                    $('#no-hay-horario').addClass('no-ver');

                    const ahora = new Date();
                    const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();

                    horasDisponibles.map(hora => {

                        let minutosHora = horaEnMinutos(hora)

                        let btn = `<button type="button" class="btn btn-outline-secondary btn-horario ${(minutosHora <= minutosAhora) ? 'hora-pasada' : ''}" data-hora="${hora}">${hora}</button>`
                        $('#grid-horas-disponibles').append(btn);
                    })

                    $('#grid-horas-disponibles').removeClass('no-ver');


                }
                else {

                    let div = $(`
                               <div class="d-flex justify-content-center align-items-center gap-1 flex-column p-2" >
                                   <i class="bi bi-exclamation-triangle" style="font-size: 3rem;"></i> 
                                   <span style="font-size: 1.2rem; text-align: center;">No hay horarios disponibles para esta fecha.</span>
                               </div>
                            `)

                    $('#no-hay-horario').empty().append(div)
                    $('#grid-horas-disponibles').addClass('no-ver');
                    $('#no-hay-horario').removeClass('no-ver');
                }
            }
        });
    })


    $(document).on('click', '.btn-horario', function (e) {

        e.preventDefault()

        let hora = $(this).data('hora');
        let fecha = $('.dia-calendario.seleccionado').data('fecha');
        let pista = $('#pistaId').val();

        $(this).addClass('horaSeleccionada');

        $.ajax({
            type: "POST",
            url: "../comprobarReservas",
            data: { fecha: fecha, hora: hora, pista: pista },
            dataType: "JSON",
            success: function (response) {
                if (response.success === true) {
                    if (response.hayReserva === false) {
                        $('.alertHoraNoDisponible').hide();
                        $('.contenedor-alert-reservas').addClass('d-none')
                        $('#btnConfirmarReserva').prop('disabled', false);
                    }
                    else {
                        $(this).removeClass('horaSeleccionada');
                        $('.contenedor-alert-reservas').removeClass('d-none');
                        $('.alertHoraNoDisponible').show();
                    }
                }
            }
        });


    })


    $(document).on('click', '#btnConfirmarReserva', function(e){
        
        e.preventDefault();

        let fecha      = $('.dia-calendario.seleccionado').data('fecha');
        let horaInicio = $('.horaSeleccionada').data('hora');
        let horaFin    = sumarHora(horaInicio);

        $.ajax({
            type: "POST",
            url: "../hacerReserva",
            data: {fecha: fecha, horaInicio: horaInicio, horaFin: horaFin},
            dataType: "JSON",
            success: function (response) {
               if(response.success){
                 $('#modalReservaPista').hide();
               }
            }
        });
    })


    function generarHoras(inicio, fin) {
        const horas = [];

        let horaInicio = parseInt(inicio.split(':')[0], 10);
        let horaFin = parseInt(fin.split(':')[0], 10);

        for (let h = horaInicio; h < horaFin; h++) {
            if (h !== 0) horas.push(String(h).padStart(2, '0') + ':00');
        }

        return horas;
    }


    function horaEnMinutos(hora) {
        const [h, m] = hora.split(':').map(Number);
        return h * 60 + m;
    }


    function sumarHora(hora){
        const [h, m] = hora.split(':').map(Number);
        let nuevaHora = (h + 1) + ":00";
        return nuevaHora;
    }
})

