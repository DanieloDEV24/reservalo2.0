$(document).ready(() => {

    let horasAnt = []
    let rangoFechas = []


    $(document).on('click', '.btn-panel-reservas', function (e) {
        e.preventDefault();

        // Obtenemos el id de la pista de la que queremos hacer la reserva
        let pistaId = $(this).closest('.card-instalacion').data('index');
        let rolUsuario  = parseInt($("#menu-usuario").data('rol'))
        let tipoReserva = parseInt($(this).closest('.card-instalacion').data('sinhorario'))
        let completa = parseInt($(this).closest('.card-instalacion').data('completa'))

        // Guardar el pistaId en el input hidden del modal
        $('#pistaId').val(pistaId);

        let fechaFormateada = new Date().toISOString().split('T')[0];

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getInfoPistasReserva`,
            data: { pistaId: pistaId, "fecha": fechaFormateada, rol: rolUsuario, tipo_reserva: tipoReserva, completa: completa },
            dataType: "json",
            success: function (response) {

                if (response.success === true) {

                    if(tipoReserva === 1){

                        response.allReservas.map(function(r) {
                            $('#calendarioDias .dia-calendario').each(function() {
                                if($(this).data('fecha') === r.fecha){
                                    $(this).addClass('disabled')
                                }
                            })
                        })
                    }

                    if (response.infoPista.length > 0 && parseInt(response.infoPista[0].estado) === 0) {

                        $("#nombre-pista").text(response.infoPista[0].nombre_pista);
                        $("#capacidad-pista").text(response.infoPista[0].capacidad_pista + " personas");
                        $("#img1-pista").attr("src", BASE_URL +  "images/" + response.infoPista[0].imagen1);
                        $("#img2-pista").attr("src", BASE_URL +  "images/" + response.infoPista[0].imagen2);
                        $("#img3-pista").attr("src", BASE_URL +  "images/" + response.infoPista[0].imagen3);
                        $("#img4-pista").attr("src", BASE_URL +  "images/" + response.infoPista[0].imagen4);
                        $("#categoria-pista").text(response.infoPista[0].categoria);
                        $("#precio-pista").text(response.infoPista[0].precio_pista)


                        if (response.hayHorarios === true) {

                            let horasDisponibles = [];
                            
                            if(tipoReserva === 0) {
                                // Obtenemos los margenes de horas
                                let horaInicioManana = response.infoPista[0].hora_inicio_manana;
                                let horaFinManana = response.infoPista[0].hora_fin_manana;
                                let horaInicioTarde = response.infoPista[0].hora_inicio_tarde;
                                let horaFinTarde = response.infoPista[0].hora_fin_tarde;

                                horasDisponibles = [
                                    ...generarHoras(horaInicioManana, horaFinManana),
                                    ...generarHoras(horaInicioTarde, horaFinTarde)
                                ]
                            }
                            else {
                                horasDisponibles = []
                            }

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

                            if(tipoReserva === 0) {
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
                            }

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

                        $('#modalReservaPista .contenedor-usuarios-admin').empty();

                        if (response?.usuarios && response.usuarios.length > 0) {

                            let select = $('<select class="form-select" id="select-usuarios" style="width: 100%"></select>')
                            select.append(`<option value="-1" selected >Seleccione un usuario</option>`)

                            response.usuarios.map(u => {

                                if (parseInt(u.id_rol) === 1) {
                                    select.append(`<option value="${u.id_usuario}">${u.nombre} - ${u.email} - ${u.telf}</option>`)
                                }
                            })


                            $('#modalReservaPista .contenedor-usuarios-admin').append(select);
                            $('#select-usuarios').select2({
                                theme: 'bootstrap-5',
                                placeholder: 'Seleccione un usuario',
                                allowClear: true,
                                dropdownParent: $('#modalReservaPista') // ⚠️ importante cuando está dentro de un modal
                            });
                        }
                        
                        $('#modalReservaPista').data('tipoReserva', tipoReserva)
                        $('#modalReservaPista').modal('show');
                    }
                    else {
                        
                        $('.contenedor-alert-instalacion').removeClass('d-none')
                        $('.alert-instalacion-no-disponible').show()
                        return;
                    }
                }
                else {
                    $('.contenedor-alert-instalacion').removeClass('d-none')
                    $('.alert-instalacion-no-disponible').show()
                    return;
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
        let rolUsuario = parseInt($("#menu-usuario").data('rol'))
        let tipoReserva = parseInt($('#modalReservaPista').data('tipoReserva'))
        let completa = parseInt($('.card-instalacion[data-index="' + pista + '"]').data('completa'))

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getInfoPistasReserva`,
            data: { "pistaId": pista, "fecha": fecha, rol: rolUsuario, tipo_reserva: tipoReserva, completa: completa },
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

                $('#modalReservaPista .contenedor-usuarios-admin').empty();

                if (parseInt(response.usuarios.length) > 0) {

                    let select = $('<select class="form-select" id="select-usuarios" style="width: 100%"></select>')
                    select.append(`<option value="-1" selected >Seleccione un usuario</option>`)

                    response.usuarios.map(u => {

                        if (parseInt(u.id_rol) === 1) {
                            select.append(`<option value="${u.id_usuario}">${u.nombre} - ${u.email} - ${u.telf}</option>`)
                        }
                    })


                    $('#modalReservaPista .contenedor-usuarios-admin').append(select);
                    $('#select-usuarios').select2({
                        theme: 'bootstrap-5',
                        placeholder: 'Seleccione un usuario',
                        allowClear: true,
                        dropdownParent: $('#modalReservaPista') // ⚠️ importante cuando está dentro de un modal
                    });
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
            url: `${BASE_URL}index.php/comprobarReservas`,
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
                        else if ($('.card-precio').find('.card-precio-total').length > 0) {
                            let precio = parseInt($('#precio-pista').text() * horasAnt.length)
                            $('#precio-total').text(precio)
                        }
                    }
                    else {
                        $(this).removeClass('horaSeleccionada');
                        $('.contenedor-alert-reservas').removeClass('d-none')
                        $('.alertHoraNoDisponible').show();
                        $('.alert-no-usuario').hide()
                    }
                }
            }
        });


    })

    $(document).on('change', '#select-usuarios', function () {

        let idUsuario = parseInt($(this).closest('.modal-content').find('#select-usuarios').val())

        if (idUsuario === 0 || idUsuario === -1) {
            $('#btnConfirmarReserva').prop('disabled', true)
            $('.contenedor-alert-reservas').removeClass('d-none')
            $('.alert-no-usuario').show()
            $('.alertHoraNoDisponible').hide()
            return;
        }
        else {
            $('#btnConfirmarReserva').prop('disabled', false)
            $('.contenedor-alert-reservas').addClass('d-none')
        }
    })


    $(document).on('click', '#btnConfirmarReserva', function (e) {

        e.preventDefault();
        let tipoReserva = parseInt($(this).closest('.modal-content').find('.modal-body').data('tiporeserva'))


        let data = []
        let precio
        if (tipoReserva === 0) {

            data = horasAnt.map(function (item) {
                return {
                    ...item,
                    horaFin: sumarHora(item.hora)
                }
            })

            precio = parseFloat($('#precio-total').text());

        } else {

            data = [...rangoFechas]
            data.push({ pista: $('#pistaId').val() });

            precio = parseFloat($('#precio-pista').text())

        }

        let precioReserva = parseFloat($('#precio-pista').text());

        let idUsuario = 0
        if (parseInt($("#menu-usuario").data('rol')) === 2) {
            idUsuario = parseInt($(this).closest('.modal-content').find('#select-usuarios').val())
        }

        if (idUsuario === -1) {
            $('#btnConfirmarReserva').prop('disabled', true)
            $('.contenedor-alert-reservas').removeClass('d-none')
            $('.alert-no-usuario').show()
            $('.alertHoraNoDisponible').hide()
            return; 
        }
        else {
            $('#btnConfirmarReserva').prop('disabled', false)
            $('.contenedor-alert-reservas').addClass('d-none')
        }


        console.log(precio)

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/hacerReserva`,
            data: { datos: data, precio: precio, tipo_reserva: tipoReserva, precio_reserva: precioReserva, id_usuario: idUsuario },
            dataType: "JSON",
            success: function (response) {
                if (response.success) {

                    // Mostrar mensaje
                    $('.contenedor-alert-reservas-success').removeClass('d-none')
                    $('.alert-reserva-hecha').show()

                    setTimeout(() => {
                        $('.alert-reserva-hecha').hide();
                        $('.contenedor-alert-reservas-success').addClass('d-none');
                    }, 3000); // 3 segundos

                    // Cerrar modal
                    bootstrap.Modal.getInstance(document.getElementById('modalReservaPista'))?.hide();
                    horasAnt = [];

                    // Descargar PDF (nueva ventana o iframe)
                    window.location.href = `${BASE_URL}index.php/descargarTicket/${response.id_pedido}`;

                    horasAnt = [];
                    $('.btn-horario.horaSeleccionada').removeClass('horaSeleccionada')
                    // O en nueva pestaña:
                    // window.open(`${BASE_URL}index.php/descargarTicket/${response.id_pedido}`, '_blank');

                } else {
                    $('.contenedor-alert-errores').removeClass('d-none')
                    $('.alert-error-reserva').show()
                    console.error(response.mensaje)
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                $('.contenedor-alert-errores').removeClass('d-none')
                $('.alert-error-reserva').show()
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
    $(document).on('click', '.modal-body[data-tipoReserva="0"] .dia-calendario:not(.disabled, .otro-mes)', function () {

        $('.dia-calendario').removeClass('seleccionado');
        $(this).addClass('seleccionado');
        fechaSeleccionada = $(this).data('fecha');
    });

    $(document).on('click', '.modal-body[data-tipoReserva="1"] .dia-calendario:not(.disabled, .otro-mes)', function () {

        // Modo rango de fechas
        if ($('.dia-calendario.seleccionado').length < 2)
            $(this).addClass('seleccionado');




        console.log($('.dia-calendario.seleccionado').length)

        // Si ahora hay 2 seleccionados, marcar intermedios
        if ($('.dia-calendario.seleccionado').length === 2) {
            let fechaInicio = $('.dia-calendario.seleccionado').eq(0).data('fecha');
            let fechaFin = $('.dia-calendario.seleccionado').eq(1).data('fecha');

            let inicio = new Date(fechaInicio);
            let fin = new Date(fechaFin);

            // Asegurar que inicio sea menor que fin
            if (inicio > fin) {
                [inicio, fin] = [fin, inicio];
            }

            let fechaActual = new Date(inicio);
            while (fechaActual < fin) {
                fechaActual.setDate(fechaActual.getDate() + 1);
                let fechaStr = fechaActual.toISOString().split('T')[0];
                $('.dia-calendario[data-fecha="' + fechaStr + '"]').addClass('fecha-intermedia');
            }

            $('#btnConfirmarReserva').prop('disabled', false);
        }

        fechaSeleccionada = $(this).data('fecha');
    });

    $(document).on('click', '.modal-body[data-tipoReserva="1"] .dia-calendario', function () {

        let longitud = $('.dia-calendario.seleccionado').length
        console.log($('.dia-calendario.seleccionado'))

        if (longitud === 1) {
            rangoFechas = []
            rangoFechas.push({ fecha_inicio: $('.dia-calendario.seleccionado').eq(0).data('fecha') });
        }
        else if (longitud === 2) {
            rangoFechas = []
            rangoFechas.push({ fecha_inicio: $('.dia-calendario.seleccionado').eq(0).data('fecha') });
            rangoFechas.push({ fecha_fin: $('.dia-calendario.seleccionado').eq(1).data('fecha') });
            $('#btnConfirmarReserva').prop('disabled', false);
        }
        else {
            return;
        }

    });

    $(document).on('click', '.modal-body[data-tipoReserva="1"] .dia-calendario.seleccionado', function () {

        let fechaClickeada = $(this).data('fecha');

        rangoFechas = rangoFechas.filter(function (fecha) {
            return fecha.fecha_inicio !== fechaClickeada && fecha.fecha_fin !== fechaClickeada;
        });

        if (rangoFechas.length < 2) {
            $(this).removeClass("seleccionado");
            $('.dia-calendario.fecha-intermedia').removeClass('fecha-intermedia');
            $('#btnConfirmarReserva').prop('disabled', true);
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

    function esFechaHoy(fechaString) {
        let hoy = new Date();
        let year = hoy.getFullYear();
        let month = String(hoy.getMonth() + 1).padStart(2, '0');
        let day = String(hoy.getDate()).padStart(2, '0');

        return fechaString === `${year}-${month}-${day}`;
    }

})

