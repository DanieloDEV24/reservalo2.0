// Mini Calendar Implementation
let currentDate = new Date(); // Febrero 10, 2026
let selectedDate = new Date();
let currentMonth = currentDate.getMonth(); // Febrero (0-indexed)
let currentYear = currentDate.getFullYear();

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


$(document).ready(function () {
    const $calendarTrigger = $('#calendarTrigger');
    const $miniCalendar = $('#miniCalendar');
    const $calendarDays = $('#calendarDays');
    const $calendarMonth = $('#calendarMonth');
    const $selectedDateSpan = $('#selectedDate');
    const $prevMonthBtn = $('#prevMonth');
    const $nextMonthBtn = $('#nextMonth');

    // Toggle calendar
    $calendarTrigger.on('click', function (e) {
        e.stopPropagation();
        $miniCalendar.toggleClass('show');
        $calendarTrigger.toggleClass('active');
    });

    // Close calendar when clicking outside
    $(document).on('click', function (e) {
        if (!$miniCalendar.is(e.target) && $miniCalendar.has(e.target).length === 0 &&
            !$calendarTrigger.is(e.target) && $calendarTrigger.has(e.target).length === 0) {
            $miniCalendar.removeClass('show');
            $calendarTrigger.removeClass('active');
        }
    });

    // Prevent calendar from closing when clicking inside it
    $miniCalendar.on('click', function (e) {
        e.stopPropagation();
    });

    // Navigation
    $prevMonthBtn.on('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    $nextMonthBtn.on('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });


    function renderCalendar() {

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getFechasReservas`,
            data: {
                mes: currentMonth,
                year: currentYear
            },
            dataType: "JSON",
            success: function (response) {

                if (response.success == true) {
                    $calendarDays.empty();
                    $calendarMonth.text(`${monthNames[currentMonth]} ${currentYear}`);

                    const firstDay = new Date(currentYear, currentMonth, 1);
                    const lastDay = new Date(currentYear, currentMonth + 1, 0);
                    const prevLastDay = new Date(currentYear, currentMonth, 0);

                    const firstDayWeekday = firstDay.getDay() === 0 ? 7 : firstDay.getDay(); // Monday = 1
                    const lastDayDate = lastDay.getDate();
                    const prevLastDayDate = prevLastDay.getDate();
                    const today = new Date();

                    // Previous month days
                    for (let i = firstDayWeekday - 1; i > 0; i--) {
                        const $dayBtn = $('<button>')
                            .addClass('calendar-day other-month disabled')
                            .text(prevLastDayDate - i + 1);
                        $calendarDays.append($dayBtn);
                    }

                    // Current month days
                    for (let day = 1; day <= lastDayDate; day++) {
                        const $dayBtn = $('<button>')
                            .addClass('calendar-day')
                            .attr('data-fecha', `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
                            .text(day);

                        // Today
                        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                            $dayBtn.addClass('today');
                        }

                        // Selected
                        if (day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()) {
                            $dayBtn.addClass('selected');
                        }

                        let existe = response.fechasReservas.some(item => item.fecha === $dayBtn.data("fecha"));

                        if (existe) {
                            $dayBtn.addClass('has-reservations');
                        }

                        // Click handler
                        $dayBtn.on('click', function () {

                            selectDate(day);

                            if ($(this).hasClass('has-reservations')) {

                                let fecha = $(this).data('fecha');
                                console.log(fecha)

                                $.ajax({
                                    type: "POST",
                                    url: `${BASE_URL}index.php/getReservasByDate`,
                                    data: {
                                        fecha: fecha
                                    },
                                    dataType: "JSON",
                                    success: function (response) {

                                        if (response.success === true) {

                                            $('.paginaReservas .contenedor-reservas').empty();

                                            $('.stat-total').text(response.reservas.length)
                                            $('.stat-confirmadas').text(response.reservas.filter(r => parseInt(r.pagadas) === 1).length)
                                            $('.stat-no-confirmadas').text(response.reservas.filter(r => parseInt(r.pagadas) === 0).length)

                                            response.reservas.map(function (item) {

                                                let extras = "";

                                                if (parseInt(item.iluminacion) === 1 && parseInt(item.material) === 1) {
                                                    extras = "Iluminación + Material";
                                                } else if (parseInt(item.iluminacion) === 1) {
                                                    extras = "Iluminación";
                                                } else if (parseInt(item.material) === 1) {
                                                    extras = "Material";
                                                }


                                                let hoy = new Date();
                                                hoy.setHours(0, 0, 0, 0);

                                                let fechaReserva = new Date(item.fecha);
                                                fechaReserva.setHours(0, 0, 0, 0);

                                                let claseEstado = "";
                                                let textoEstado = "";

                                                if (fechaReserva < hoy && parseInt(item.pagadas) === 0) {
                                                    claseEstado = "estado-no-pagada";
                                                    textoEstado = "No asistida"
                                                } else if (parseInt(item.pagadas) === 1) {
                                                    claseEstado = "estado-confirmado";
                                                    textoEstado = "Confirmada"
                                                } else {
                                                    claseEstado = "estado-tramite";
                                                    textoEstado = "En trámite"
                                                }

                                                let card = `<div class="card-reserva" data-index="${item.id_reserva}" data-pedido="${item.id_pedido}" data-tipo="${item.tipo_reserva}">
                    <div class="contenedor-img-reserva" style="background-image: url('${BASE_URL}images/${item.imagen1}');"></div>
                    <div class="contenedor-card-reserva">
                        <span class="categoria-instalacion-reserva">${item.categoria}</span>
                        <h1 class="title-pista-reserva">${item.nombre_pista}</h1>
                        <p class="instalacionDireccion">${item.nombre_instalacion} · ${item.direccion}</p>

                        <div class="contenedor-usuario">
                            <div class="logo-img">${item.nombre_usuario[0].toUpperCase()}</div>
                            <div class="informacion-usuario">
                                <p class="nombre-usuario">${item.nombre_usuario}</p>
                                <p class="email-usuario">${item.email}</p>
                            </div>
                        </div>

                        <div class="contenedor-abajo">

                            <div class="contenedor-extras">
                                <p class="label-extras">EXTRAS</p>
                                <div class="lista-extras">
                                    ${extras}
                                </div>

                                <div class="estado-reserva ${claseEstado}">
                                    ${textoEstado}
                                </div>

                            </div>

                            <div class="precio-hora-reserva">
                            
                               ${(parseInt(item.tipo_reserva) === 0) ? `<p class="hora-reserva">${item.hora_inicio.substring(0, 5)}<span class="duracion-reserva"> • 1h</span></p>` : "" } 
                                <div class="precio-reserva">
                                    <p class="precio-reserva-text">${item.precio_pista}€</p>
                                    <span class="texto-precio">por reserva</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                <button type="button" class="btn btn-danger" id="btn-anular-admin"><i class="bi bi-x-lg"></i>&nbsp;Anular</button>
                ${(parseInt(item.pagadas) === 0) ? '<button type="button" class="btn btn-success" id="btn-checkIn"><i class="bi bi-check-lg"></i>&nbsp;Check-In</button>' : '<button type="button" class="btn btn-secondary" id="btn-deshacer-check-in"><i class="bi bi-arrow-counterclockwise"></i>&nbsp;Deshacer Check-In</button>'}
      </div>
                    </div>
                </div>`

                                                $('.paginaReservas .contenedor-reservas').append(card)
                                            })
                                        }
                                    }
                                });
                            }



                        });

                        $calendarDays.append($dayBtn);
                    }

                    // Next month days to complete the grid
                    const totalCells = $calendarDays.children().length;
                    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
                    for (let i = 1; i <= remainingCells; i++) {
                        const $dayBtn = $('<button>')
                            .addClass('calendar-day other-month disabled')
                            .text(i);
                        $calendarDays.append($dayBtn);
                    }
                }
            }
        });
    }

    function selectDate(day) {
        selectedDate = new Date(currentYear, currentMonth, day);

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        $selectedDateSpan.text(selectedDate.toLocaleDateString('es-ES', options));

        renderCalendar();

        $miniCalendar.removeClass('show');
        $calendarTrigger.removeClass('active');

        // Aquí cargarías reservas de la nueva fecha
    }

    // Initial render
    renderCalendar();

    // Filter tabs
    $('.filter-tab').on('click', function () {
        $('.filter-tab').removeClass('active');
        $(this).addClass('active');
        console.log('Filtro seleccionado:', $(this).text());
    });

    
    $(document).on('click', '#btn-anular-admin', function(){
       
        let idReserva   = parseInt($(this).closest('.card-reserva').data('index'))
        let idPedido    = parseInt($(this).closest('.card-reserva').data('pedido'))
        let tipoReserva = parseInt($(this).closest('.card-reserva').data('tipo'))

        $('#modalAnularReservaAdmin').data('reserva', idReserva)
        $('#modalAnularReservaAdmin').data('pedido', idPedido)
        $('#modalAnularReservaAdmin').data('tipo', tipoReserva)

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getInfoReserva`,
            data: {idReserva: idReserva},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#modalAnularReservaAdmin .nombrePista').text(response.reserva[0].nombre_pista)
                    $('#modalAnularReservaAdmin .instalacionDireccion').text(response.reserva[0].nombre_instalacion + " · " + response.reserva[0].direccion)
                    $('#modalAnularReservaAdmin .fecha-anular-reserva-admin .texto-anular-admin').text(formatearFecha(response.reserva[0].fecha ))
                    $('#modalAnularReservaAdmin .horario-anular-reserva-admin .texto-anular-admin').text(response.reserva[0].hora_inicio.substring(0, 5) + " - " + sumarHora(response.reserva[0].hora_inicio.substring(0, 5)))
                    $('#modalAnularReservaAdmin .pedido-anular-reserva-admin .texto-anular-admin').text("#" + response.reserva[0].num_pedido);
                    $('#modalAnularReservaAdmin .precio-anular-reserva-admin .texto-anular-admin').text(response.reserva[0].precio_reserva + "€");


                    $('#modalAnularReservaAdmin').modal('show');
                }
            }
        });
        
    })


    $(document).on('click', '#btn-anular-admin-confirmar', function(){

        let idReserva   = parseInt($('#modalAnularReservaAdmin').data('reserva'))
        let idPedido    = parseInt($('#modalAnularReservaAdmin').data('pedido'))
        let tipoReserva = parseInt($('#modalAnularReservaAdmin').data('tipo'))

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/anularReservasById`,
            data: {idReserva: idReserva, idPedido: idPedido, tipoReserva: tipoReserva},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {
                    
                    $(`.paginaReservas .card-reserva[data-index="${idReserva}"]`).remove()
                    $(`.paginaReservas .stat-total`).text(response.num_reservas)
                    $(`.paginaReservas .stat-confirmadas`).text(response.num_reservas_pagadas)
                    $(`.paginaReservas .stat-no-confirmadas`).text(response.num_reservas_no_pagadas)
                    $('#modalAnularReservaAdmin').modal('hide');
                }
            }
        });
    })


    $(document).on('click', '#btn-checkIn', function(){

        let idReserva   = parseInt($(this).closest('.card-reserva').data('index'))
        let idPedido    = parseInt($(this).closest('.card-reserva').data('pedido'))
        let tipoReserva = parseInt($(this).closest('.card-reserva').data('tipo'))

        $.ajax({
            type: "POST",
            url:  `${BASE_URL}index.php/checkIn`,
            data: {idReserva: idReserva},
            dataType: "json",
            success: function (response) {
                
                if(response.success == true){
                    
                    $(`.paginaReservas .card-reserva[data-index="${idReserva}"] .estado-reserva`).text("Confirmada")
                    $(`.paginaReservas .card-reserva[data-index="${idReserva}"] .estado-reserva`).removeClass('estado-tramite')
                    $(`.paginaReservas .card-reserva[data-index="${idReserva}"] .estado-reserva`).addClass('estado-confirmado')


                    $(`.paginaReservas .stat-confirmadas`).text(response.num_reservas_pagadas)
                    $(`.paginaReservas .stat-no-confirmadas`).text(response.num_reservas_no_pagadas)

                    $(`.paginaReservas .card-reserva[data-index="${idReserva}"] .card-footer #btn-checkIn`).replaceWith('<button type="button" class="btn btn-secondary" id="btn-deshacer-check-in"><i class="bi bi-arrow-counterclockwise"></i>&nbsp;Deshacer Check-In</button>');
                    
                }
            }
        });

    })


    $(document).on('click', '#btn-deshacer-check-in', function(){

        let idReserva   = parseInt($(this).closest('.card-reserva').data('index'))

        $.ajax({
            type: "post",
            url: `${BASE_URL}index.php/deshacerCheckIn`,
            data: {idReserva: idReserva},
            dataType: "json",
            success: function (response) {
                
                if(response.success == true) {

                    $(`.paginaReservas .card-reserva[data-index="${idReserva}"] .estado-reserva`).text("En trámite")
                    $(`.paginaReservas .card-reserva[data-index="${idReserva}"] .estado-reserva`).removeClass('estado-confirmado')
                    $(`.paginaReservas .card-reserva[data-index="${idReserva}"] .estado-reserva`).addClass('estado-tramite')

                    $(`.paginaReservas .stat-confirmadas`).text(response.num_reservas_pagadas)
                    $(`.paginaReservas .stat-no-confirmadas`).text(response.num_reservas_no_pagadas)

                    $(`.paginaReservas .card-reserva[data-index="${idReserva}"] .card-footer #btn-deshacer-check-in`).replaceWith('<button type="button" class="btn btn-success" id="btn-checkIn"><i class="bi bi-check-lg"></i>&nbsp;Check-In</button>');

                }
            }
        });

    })

    function formatearFecha(fechaStr) {
        const d = new Date(fechaStr);
        return d.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }


    function sumarHora(hora) {
        const [h, m] = hora.split(':').map(Number);
        let nuevaHora = (h + 1) + ":00";
        return nuevaHora;
    }

});


