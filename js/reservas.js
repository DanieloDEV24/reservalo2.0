$(document).ready(() => {

    let horasAnt = []
    let rangoFechas = []


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
                        const year = ahora.getFullYear();
                        const month = String(ahora.getMonth() + 1).padStart(2, '0');
                        const day = String(ahora.getDate()).padStart(2, '0');

                        const fecha = `${year}-${month}-${day}`;
                        const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();

                        const horasOcupadas = new Set(response.reservas.map(reserva => formatearHora(reserva.hora_inicio)));
                        const diaSeleccionado = $('.dia-calendario.seleccionado').data('fecha')

                        horasDisponibles.map(hora => {

                            let minutosHora = horaEnMinutos(hora)
                            let existe = horasOcupadas.has(hora); // O(1) en lugar de O(n)



                            let btn = `<button type="button" 
                                            class="btn btn-outline-secondary btn-horario 
                                            ${((minutosHora <= minutosAhora && (fecha === diaSeleccionado)) || existe) ? 'hora-pasada' : ''}" 
                                            data-hora="${hora}">
                                            ${hora}
                                        </button>`;

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
                    const year = ahora.getFullYear();
                    const month = String(ahora.getMonth() + 1).padStart(2, '0');
                    const day = String(ahora.getDate()).padStart(2, '0');

                    const fecha = `${year}-${month}-${day}`;
                    const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();

                    const horasOcupadas = new Set(response.reservas.map(reserva => formatearHora(reserva.hora_inicio)));
                    const diaSeleccionado = $('.dia-calendario.seleccionado').data('fecha')

                    console.log(horasAnt)

                    horasDisponibles.map(hora => {

                        let minutosHora = horaEnMinutos(hora);
                        let existe = horasOcupadas.has(hora);

                        // 🔁 Reiniciar para cada hora
                        let horaSeleccionada = false;

                        horasAnt.forEach(horaAnt => {
                            if (
                                horaAnt.hora === hora &&
                                horaAnt.fecha === diaSeleccionado &&
                                parseInt(horaAnt.pista) === parseInt($('#pistaId').val())
                            ) {
                                horaSeleccionada = true;
                            }
                        });

                        let btn = `<button type="button"
        class="btn btn-outline-secondary btn-horario
        ${horaSeleccionada ? 'horaSeleccionada' : ''}
        ${((minutosHora <= minutosAhora && fecha === diaSeleccionado) || existe) ? 'hora-pasada' : ''}"
        data-hora="${hora}">
        ${hora}
    </button>`;

                        $('#grid-horas-disponibles').append(btn);
                    });

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

        if ($('.btn-horario.seleccionado').length === 0) {
            $('#btnConfirmarReserva').prop('disabled', true);
        }


        if ($(this).hasClass('horaSeleccionada')) {
            $(this).removeClass('horaSeleccionada');

            const horaActual = $(this).data('hora');
            const fechaSeleccionada = $('.dia-calendario.seleccionado').data('fecha');
            const pistaId = $('#pistaId').val();

            // Filtrar el array excluyendo el elemento que coincide
            horasAnt = horasAnt.filter(hora =>
                !(hora.hora === horaActual &&
                    hora.fecha === fechaSeleccionada &&
                    hora.pista === pistaId)
            );

            return
        }



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
                        horasAnt.push({ fecha: fecha, hora: hora, pista: pista })

                        if ($('.card-precio').find('.card-precio-total').length === 0) {
                            let div = `<div class="card-precio-total">
                                            <p class="text-muted small mb-1">Precio total</p>
                                            <h2 class="mb-0">
                                            <span class="fw-bold" id="precio-total">${$('#precio-pista').text()}</span>
                                            <span class="fs-5 text-secondary">€</span>
                                            </h2>
                                        </div>`;

                            $('.card-precio').append(div)
                        }
                        else if($('.card-precio').find('.card-precio-total').length > 0){
                            let precio = parseInt($('#precio-pista').text() * horasAnt.length)
                            $('#precio-total').text(precio)
                        }
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


  $(document).on('click', '#btnConfirmarReserva', function (e) {

    e.preventDefault();

    let data = horasAnt.map(function(item) {
        return {
            ...item, 
            horaFin: sumarHora(item.hora)
        }
    })

    let precio = parseFloat($('#precio-total').text());

    $.ajax({
        type: "POST",
        url: "../hacerReserva",
        data: {datos: data, precio: precio},
        dataType: "JSON",
        success: function (response) {
            if (response.success) {
                
                // Mostrar mensaje
                alert(response.mensaje);
                
                // Cerrar modal
                bootstrap.Modal.getInstance(document.getElementById('modalReservaPista'))?.hide();
                horasAnt = [];
                
                // Descargar PDF (nueva ventana o iframe)
                window.location.href = '../descargarTicket/' + response.id_pedido;
                
                horasAnt = [];
                $('.btn-horario.horaSeleccionada').removeClass('.horaSeleccionada')
                // O en nueva pestaña:
                // window.open('../descargarTicket/' + response.id_pedido, '_blank');
                
            } else {
                alert(response.mensaje);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('Ha ocurrido un error al procesar la reserva');
        }
    });
});


$('#modalReservaPista').on('hidden.bs.modal', function () {
    horasAnt = [];
    rangoFechas = [];
    $('.btn-horario.horaSeleccionada').removeClass("horaSeleccionada");
    $('#btnConfirmarReserva').prop('disabled', true);
});





// Manejo de clicks en días del calendario
$(document).on('click', '.modal-body[data-tipoReserva="0"] .dia-calendario:not(.disabled, .otro-mes)', function(){

        $('.dia-calendario').removeClass('seleccionado');
        $(this).addClass('seleccionado');
        fechaSeleccionada = $(this).data('fecha');
});

$(document).on('click', '.modal-body[data-tipoReserva="1"] .dia-calendario:not(.disabled, .otro-mes)', function(){

            // Modo rango de fechas
            if($('.dia-calendario.seleccionado').length < 2)
                $(this).addClass('seleccionado');

            console.log($('.dia-calendario.seleccionado').length)
            
            // Si ahora hay 2 seleccionados, marcar intermedios
            if($('.dia-calendario.seleccionado').length === 2){
                let fechaInicio = $('.dia-calendario.seleccionado').eq(0).data('fecha');
                let fechaFin = $('.dia-calendario.seleccionado').eq(1).data('fecha');
                
                let inicio = new Date(fechaInicio);
                let fin = new Date(fechaFin);
                
                // Asegurar que inicio sea menor que fin
                if(inicio > fin) {
                    [inicio, fin] = [fin, inicio];
                }
                
                let fechaActual = new Date(inicio);
                while (fechaActual < fin) {
                    fechaActual.setDate(fechaActual.getDate() + 1);
                    let fechaStr = fechaActual.toISOString().split('T')[0];
                    $('.dia-calendario[data-fecha="'+ fechaStr +'"]').addClass('fecha-intermedia');
                }
            }
        
        fechaSeleccionada = $(this).data('fecha');
});


    
$(document).on('click', '.modal-body[data-tipoReserva="1"] .dia-calendario', function(){
    
    let longitud = $('.dia-calendario.seleccionado').length
    console.log($('.dia-calendario.seleccionado'))

    if(longitud === 1){
        rangoFechas = []
        rangoFechas.push({fecha_inicio: $('.dia-calendario.seleccionado').eq(0).data('fecha')});
    }
    else if(longitud === 2){
        rangoFechas = []
        rangoFechas.push({fecha_inicio: $('.dia-calendario.seleccionado').eq(0).data('fecha')});
        rangoFechas.push({fecha_fin: $('.dia-calendario.seleccionado').eq(1).data('fecha')});
    }
    else {
        return;
    }

});

    $(document).on('click', '.modal-body[data-tipoReserva="1"] .dia-calendario.seleccionado', function(){
        
        let fechaClickeada = $(this).data('fecha');

        rangoFechas = rangoFechas.filter(function(fecha){
            return fecha.fecha_inicio !== fechaClickeada && fecha.fecha_fin !== fechaClickeada;
        });

        if(rangoFechas.length < 2)
        {
            $(this).removeClass("seleccionado");
            $('.dia-calendario.fecha-intermedia').removeClass('fecha-intermedia');

        }

    });



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


    function sumarHora(hora) {
        const [h, m] = hora.split(':').map(Number);
        let nuevaHora = (h + 1) + ":00";
        return nuevaHora;
    }

    function formatearHora(hora) {
        const partes = hora.split(':');
        return `${partes[0]}:${partes[1]}`;
    }

})

