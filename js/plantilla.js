$(document).ready(() => {

    $(document).on('click', '#btnMisReservas', function(e){
        e.preventDefault();
        e.stopPropagation(); // Evita que el evento suba al dropdown
        
        $('.dropdown-menu').removeClass('show');
        $('.dropdown-toggle').removeClass('show');
    
       $.ajax({
        type: "GET",
        url: `${BASE_URL}index.php/misReservas`,
        dataType: "JSON",
        success: function (response) {
            if(response.success === true){

                // Limpiar lista de reservas antes de agregar nuevas
                $('#modalMisReservas .reservas-list-instalaciones').empty();

                let pedido;
                let reservasPorPedido = {};
                
                if(response.reservas.length === 0) {
                    $('#modalMisReservas .reservas-list-instalaciones').append(`
                        
                        <div class="empty-state-reservas">
    <div class="empty-icon-reservas-wrapper">
        <i class="bi bi-calendar-check"></i>
    </div>
    <h3>Aún no tienes reservas</h3>
    <p>Cuando reserves una instalación o te apuntes a una actividad, aparecerá aquí para que puedas consultarla en cualquier momento.</p>
    <a href="${BASE_URL}index.php/instalaciones" class="btn-primary-personal">
        Ver instalaciones <span aria-hidden="true">→</span>
    </a>
</div>

                        `);
                }
                else {
                // Agrupar reservas por pedido
                response.reservas.forEach(reserva => {
                    if (!reservasPorPedido[reserva.id_pedido]) {
                        reservasPorPedido[reserva.id_pedido] = {
                            info: reserva,
                            dias: {}
                        };
                    }
                    
                    // Agrupar por fecha si es tipo_reserva == 0
                    if (reserva.tipo_reserva == 0) {
                        if (!reservasPorPedido[reserva.id_pedido].dias[reserva.fecha]) {
                            reservasPorPedido[reserva.id_pedido].dias[reserva.fecha] = [];
                        }
                        reservasPorPedido[reserva.id_pedido].dias[reserva.fecha].push({
                            hora_inicio: reserva.hora_inicio.slice(0,5),
                            hora_final: reserva.hora_final.slice(0,5)
                        });
                    }
                });

                // Generar HTML para cada pedido
                Object.keys(reservasPorPedido).forEach(idPedido => {
                    const pedidoData = reservasPorPedido[idPedido];
                    const reserva = pedidoData.info;
                    
                    // Calcular totales si es tipo_reserva == 0
                    let totalHoras = 0;
                    let totalDias = 0;
                    let diasHTML = '';
                    
                    if (reserva.tipo_reserva == 0) {
                        totalDias = Object.keys(pedidoData.dias).length;
                        
                        Object.keys(pedidoData.dias).forEach(fecha => {
                            const franjas = pedidoData.dias[fecha];
                            const horasDelDia = franjas.length;
                            totalHoras += horasDelDia;
                            
                            const fechaObj = new Date(fecha);
                            const dia = fechaObj.getDate();
                            const mes = fechaObj.toLocaleDateString('es-ES', { month: 'short' }).substring(0, 3).toUpperCase();
                            const nombreDia = fechaObj.toLocaleDateString('es-ES', { weekday: 'long' });
                            const fechaCompleta = formatearFecha(fecha);
                            
                            console.log(fecha, franjas)
                            let hoy = new Date();
                            let fechaReserva = new Date(fecha);
                            fechaReserva.setHours(parseInt(franjas[0].hora_inicio.split(':')[0]), parseInt(franjas[0].hora_inicio.split(':')[1]), 0, 0);

                            // Generar franjas horarias
                            let franjasHTML = franjas.map(franja => `
                                <div class="franja-horaria ${(hoy > fechaReserva || !horasPasadasDesde(fechaReserva, franja.hora_inicio)) ? 'hora-disabled' : ''}" data-hora="${franja.hora_inicio}">
                                    <span class="franja-horaria-icon">⏰</span>
                                    <span>${franja.hora_inicio} - ${franja.hora_final}</span>
                                </div>
                            `).join('');
                            
                            diasHTML += `
                                <div class="dia-card" data-fecha="${fecha}">
                                    <div class="dia-header">
                                        <div class="dia-fecha-info">
                                            <div class="dia-fecha-icon">
                                                <div class="dia-fecha-icon-mes">${mes}</div>
                                                <div class="dia-fecha-icon-dia">${dia}</div>
                                            </div>
                                            <div class="dia-fecha-text">
                                                <div class="dia-fecha-completa">${capitalizar(nombreDia)}, ${fechaCompleta}</div>
                                                <div class="dia-nombre">Reserva</div>
                                            </div>
                                        </div>
                                        <div class="dia-horas-count">
                                            <span>⏰</span>
                                            <span>${horasDelDia} ${horasDelDia === 1 ? 'hora' : 'horas'}</span>
                                        </div>
                                    </div>
                                    <div class="dia-franjas">
                                        ${franjasHTML}
                                    </div>
                                </div>
                            `;
                        });
                    }
                    else {

                    }

                    let div = $(`<div class="reserva-card" data-pedido="${reserva.id_pedido}">
                               
                               <div class="reserva-image-container" style="background-image: url('${response.baseUrl}images/${reserva.imagen1}')">
                               </div>

                               <div class="reserva-content">
                                  <div class="reserva-header">
                                      <div class="reserva-info">
                                          <h3 class="reserva-instalacion">${reserva.nombre_pista}</h3>
                                          <span class="reserva-tipo">${reserva.categoria}</span>
                                      </div>
                                  </div>

                                  <div class="reserva-detalles">
                                    ${(reserva.tipo_reserva == 1) ? `
                                    <div class="detalle-item">
                                       <div class="detalle-icon">📅</div>
                                       <div class="detalle-content">
                                          <div class="detalle-label">Fecha</div>
                                          <div class="detalle-value info-fechas">${formatearFecha(response.reservas[0].fecha) + " → " + formatearFecha(response.reservas[response.reservas.length - 1].fecha)}</div>
                                        </div>
                                    </div>

                                    <div class="detalle-item">
                                       <div class="detalle-icon">🕐</div>
                                       <div class="detalle-content">
                                          <div class="detalle-label">Hora</div>
                                          <div class="detalle-value">La reserva es del día completo</div>
                                        </div>
                                    </div>
                                    ` : ''}
                                    
                                    ${(reserva.tipo_reserva == 0) ? `
                                    <div class="detalle-item">
                                       <div class="detalle-icon">📅</div>
                                       <div class="detalle-content">
                                          <div class="detalle-label">Período</div>
                                          <div class="detalle-value">${formatearFechaPeriodo(Object.keys(pedidoData.dias))}</div>
                                        </div>
                                    </div>
                                    ` : ''}

                                    <div class="detalle-item">
                                       <div class="detalle-icon">👥</div>
                                       <div class="detalle-content">
                                           <div class="detalle-label">Capacidad</div>
                                           <div class="detalle-value">${reserva.capacidad_pista} personas</div>
                                       </div>
                                    </div>

                                    <div class="detalle-item">
                                       <div class="detalle-icon">💰</div>
                                       <div class="detalle-content">
                                           <div class="detalle-label">Precio</div>
                                           <div class="detalle-value">${reserva.precio_pedido} €</div>
                                        </div>
                                    </div>
                                  </div>

                                  ${(reserva.tipo_reserva == 0) ? `
                                  <div class="dias-horarios-section">
                                      <div class="dias-horarios-header">
                                          <div class="dias-horarios-title">
                                              <div class="dias-horarios-title-icon">📆</div>
                                              <span>Días y Horarios</span>
                                          </div>
                                          <div class="total-horas-badge">
                                              <span>⏱️</span>
                                              <span>Total: ${totalHoras} ${totalHoras === 1 ? 'hora' : 'horas'} en ${totalDias} ${totalDias === 1 ? 'día' : 'días'}</span>
                                          </div>
                                      </div>

                                      <div class="dias-container">
                                          ${diasHTML}
                                      </div>
                                  </div>
                                  ` : ''}

                                  ${(parseInt(reserva.tipo_reserva) === 1) ? "<div id='días-anular-reserva'></div>" : ""}
                               </div>

                               <div class="reserva-actions">
                                    <button class="btn btn-danger btn-anular-reserva" data-pedido="${reserva.id_pedido}" data-tipoReserva="${reserva.tipo_reserva}">Anular</button>
                                    ${(parseInt(reserva.tipo_reserva) === 1) ? `<button class="btn btn-danger btn-anular-reserva-dia" data-pedido="${reserva.id_pedido}" data-tipoReserva="${reserva.tipo_reserva}" data-reserva="${reserva.id_reserva}">Anular Día </button>` : ''}
                                </div>
                            </div>`);

                        $('#modalMisReservas .reservas-list-instalaciones').append(div);
                });
            }

                $('#modalMisReservas').modal('show');
            }
        }
       });
    });

    $(document).on('click', '.btn-anular-reserva', function(){
        const idPedido = $(this).data('pedido');
        const tipoReserva = $(this).data('tiporeserva');



        if(parseInt(tipoReserva) === 0){
            let esTarde = false;
            let cont = 0;
            $('.reserva-card[data-pedido="' + idPedido + '"] .dias-container .franja-horaria:not(.hora-disabled)').each(function(){
                
                let hora = $(this).find('span:nth-child(2)').text().split(' - ')[0];
                let fechaString = $(this).closest('.dia-card').data('fecha');
                let fechaReserva = new Date(fechaString);

                if(horasPasadasDesde(fechaReserva, hora)){
                    $(this).append(`<button class="icono-borrar-reserva"><i class="bi bi-x-lg icon-borrar"></i></button>`)
                }
                else {
                    esTarde = true;
                }

                cont++;
            })

            if($('.reserva-card[data-pedido="' + idPedido + '"] .dias-container .franja-horaria.hora-disabled').length > 0) esTarde = true;

            
            // $('.reserva-card[data-pedido="' + idPedido + '"] .dias-container .franja-horaria:not(.hora-disabled)').append(`<button class="icono-borrar-reserva"><i class="bi bi-x-lg icon-borrar"></i></button>`)

            $('.reserva-card[data-pedido="' + idPedido + '"] .reserva-actions').empty();

            let confirmarHoras = `<button class="btn btn-danger btn-confirmar-anulacion-horas" data-pedido="${idPedido}" data-tipoReserva="${tipoReserva}" ${cont === 0 ? 'disabled' : ''}>Anular Horas Seleccionadas</button>`;
            let confirmarPedido = `<button class="btn btn-danger btn-confirmar-anulacion-pedido" data-pedido="${idPedido}" data-tipoReserva="${tipoReserva}" ${esTarde || cont === 0 ? 'disabled' : ''}>Anular Reserva Completa</button>`;
            let cancelar = `<button class="btn btn-secondary btn-cancelar-anulacion" data-pedido="${idPedido}" data-tipoReserva="${tipoReserva}">Cancelar</button>`;

            $('.reserva-card[data-pedido="' + idPedido + '"] .reserva-actions').append(confirmarHoras + confirmarPedido + cancelar);
        }
        else {
            $(this).addClass('btn-anular-reserva-especial')
        }
    })

    $(document).on('click', '.icono-borrar-reserva', function () {
        if ($(this).closest('.hora-seleccionada-borrar').length) {
            return; // está dentro del padre → no hacer nada
        }

        $(this).closest('.franja-horaria').addClass('hora-seleccionada-borrar');
        $(this).empty();
        $(this).append(`<i class="bi bi-arrow-clockwise"></i>`)
        
    });


    $(document).on('click', '.hora-seleccionada-borrar .icono-borrar-reserva', function () {

        $(this).closest('.franja-horaria').removeClass('hora-seleccionada-borrar');
        $(this).empty();
        $(this).append(`<i class="bi bi-x-lg icon-borrar"></i>`)
        
    });

    $(document).on('click', '.btn-cancelar-anulacion', function(){

        $(this).closest('#modalMisReservas').find('.hora-seleccionada-borrar').removeClass('hora-seleccionada-borrar');
        $(this).closest('#modalMisReservas').find('.icono-borrar-reserva').remove();
        $(this).closest('.reserva-actions').empty().append(`<button class="btn btn-danger btn-anular-reserva" data-pedido="${$(this).data('pedido')}" data-tipoReserva="${$(this).data('tiporeserva')}">Anular</button>`);
        console.log($(this).closest('.reserva-actions'))
    })

    $(document).on('click', '.btn-confirmar-anulacion-horas', function(){

        let idPedido = $(this).data('pedido');
        let tipoReserva = $(this).data('tiporeserva');
        let horasAnular = [];

        $(this).closest('#modalMisReservas').find('.hora-seleccionada-borrar').each(function(){
            const fecha = $(this).closest('.dia-card').data('fecha');
            const hora  = $(this).find('span:nth-child(2)').text();

            horasAnular.push({fecha: fecha, hora: hora});
        })

        
        if(horasAnular.length === 0){
            $('.contenedor-alert-anular-horas').removeClass('d-none');
            $('.alertHoraNoDisponible').fadeIn(); // Usa fadeIn() en lugar de show()
            return;
        }
        else {
            $('.contenedor-alert-anular-horas').addClass('d-none');
            $('.alertHoraNoDisponible').fadeOut(); // Usa fadeOut() en lugar de hide()
            $('#modalAnularHoras').data('pedido', );
        }

        $('#modalAnularHoras').data('pedido', idPedido);
        $('#modalAnularHoras .horas h1.hora').text(horasAnular.length);
        let cont  = 0;
        let fecha = ""
        horasAnular.forEach(item => {
            if(item.fecha !== fecha){
                cont++;
                fecha = item.fecha;
            }
        })
        $('#modalAnularHoras .dias h1.dia').text(cont);
        $('#modalAnularHoras .total h1.total').text(horasAnular.length);

        $('#modalAnularHoras .contenedor-horas').empty();

        $('#modalAnularHoras .contenedor-horas').append(`<span id="span-horas-text">HORAS A ANULAR: </span>`);
        
        let fechaActual = "";

        horasAnular.forEach(item => {
           if(item.fecha !== fechaActual){

            fechaActual = item.fecha;

             let dia = $(`
                <div class="contenedor-dia-anular" data-fecha="${item.fecha}">
                    <div class="dia-hora-anular">
                        <div class="num-dia">${item.fecha.split('-')[2]}</div>
                        <div class="fecha-formateada">${formatearFecha(item.fecha)}</div>
                    </div>
                    <div class="horas-anular-modal">${
                            horasAnular.filter(h => h.fecha === item.fecha).map(h => `<div class="franja-horaria" data-hora="${h.hora.split(' - ')[0]}">
        
                            <span class="franja-horaria-icon">⏰</span>
                                <span>${h.hora}</span>
                            </div>`).join('')
                        }</div>
                </div>
                `)

            $('#modalAnularHoras .contenedor-horas').append(dia);

           }
        })

        $('#modalMisReservas').modal('hide');
        $('#modalAnularHoras').modal('show');
    })

    $(document).on('click', '#btn-anular-horas', function(){

        let datos = []
        
        $('#modalAnularHoras .contenedor-horas .franja-horaria').each(function(){
            datos.push({fecha: $(this).closest('.contenedor-dia-anular').data('fecha'), hora: $(this).data('hora'), pedido: $('#modalAnularHoras').data('pedido')})
        })

        $.ajax({
            url: `${BASE_URL}index.php/anularHora`,
            method: 'POST',
            data: {
                datos: datos
            },
            dataType: 'JSON',
            success: function(response) {
                if(response.success == true){
                    $('#modalAnularHoras').modal('hide');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al anular hora:', error);
            }
        })

    })

    $(document).on('click', '.btn-confirmar-anulacion-pedido', function(){

        let datos = []
        
        $('#modalMisReservas .dias-horarios-section .franja-horaria').each(function(){

            let fechaObj = new Date($(this).closest('.dia-card').data('fecha')); 

            if(!$(this).hasClass('hora-disabled') && horasPasadasDesde(fechaObj, $(this).data('hora'))){
                datos.push({fecha: $(this).closest('.dia-card').data('fecha'), hora: $(this).data('hora'), pedido: $(this).closest('.reserva-card').data('pedido')})
            }
        })

        $.ajax({
            url: `${BASE_URL}index.php/anularHora`,
            method: 'POST',
            data: {
                datos: datos
            },
            dataType: 'JSON',
            success: function(response) {
                if(response.success){
                    $('#modalMisReservas').modal('hide');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al anular hora:', error);
            }
        })

    })

    $(document).on('click', '.btn-anular-reserva-especial', function(){
        let idPedido = $(this).data('pedido');

        $.ajax({
            url: `${BASE_URL}index.php/anularReservaEspecial`,
            method: 'POST',
            data: {
                idPedido: idPedido
            },
            dataType: 'JSON',
            success: function(response) {
                if(response.success == true){
                    $('#modalMisReservas').modal('hide');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al anular reserva especial:', error);
            }
        })
    })

    $(document).on('click', '#btnMiPerfil', function(){

        let idUsuario = parseInt($("#menu-usuario").data('index'));

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getUsuario`,
            data: {id_usuario: idUsuario},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true){

                    $('#modalInformacionPersonal').data('usuario', idUsuario);

                    $('#modalInformacionPersonal .datos-usuario-editar .logo-usuario').text(response.usuario.nombre[0])
                    $('#modalInformacionPersonal .datos-usuario-editar .info-usuario .nombre-usuario').text(response.usuario.nombre)
                    $('#modalInformacionPersonal .datos-usuario-editar .info-usuario .registro-ultm-acceso').text(`Fecha Registro: ${formatearFecha(response.usuario.fecha_registro)} · Último Acceso: ${tiempoTranscurrido(response.usuario.ultimo_inicio)}`)

                    $('#modalInformacionPersonal .datos-usuario-editar .info-usuario .registro-movil').text(`Fecha Registro: ${formatearFecha(response.usuario.fecha_registro)}`)

                    $('#modalInformacionPersonal .datos-usuario-editar .info-usuario .ultm-acceso-movil').text(`Último Acceso: ${tiempoTranscurrido(response.usuario.ultimo_inicio)}`)

                    $('#modalInformacionPersonal #nombre-usuario-personal').val(response.usuario.nombre)
                    $('#modalInformacionPersonal #telf-usuario-personal').val(response.usuario.telf)
                    $('#modalInformacionPersonal #email-usuario-personal').val(response.usuario.email)

                    $('#modalInformacionPersonal').modal('show')
                }
            }
        });
    })

    $(document).on('click', '.boton-password-usuario-personal', function () {

        if ($(this).closest('div').find('input').attr("type") === "password") {

            $(this).find('i').replaceWith('<i class="bi bi-eye-slash"></i>');
            $(this).closest('div').find('input').attr("type", "text")
        }
        else {

            $(this).find('i').replaceWith('<i class="bi bi-eye"></i>');
            $(this).closest('div').find('input').attr("type", "password")
        }

    })

    // $(document).on('click', '#btn-guardar-info-usuario-personal', function() {
    //     let errores = []

    //     let idUsuario = $('#modalInformacionPersonal').data('usuario')
    //     let nombre = $('#nombre-usuario-personal').val();
    //     let telf = $('#telf-usuario-personal').val().trim();
    //     let email = $('#email-usuario-personal').val();
    //     let passwordActual = $('#password-actual-usuario-personal').val();
    //     let passwordNueva  = $('#password-usuario-personal').val();

    //     if (nombre === "") {
    //         errores.push({ campo: "Nombre", message: "El campo de nombre no puede estar vacío" })
    //     }

    //     if (telf === "") {
    //         errores.push({ campo: "Telf", message: "El campo de telefono no puede estar vacío" })
    //     }
    //     else if (isNaN(telf) || telf === "e") {
    //         errores.push({ campo: "Telf", message: "El telefono debe ser un numero" })
    //     }
    //     else if (!/^[6789]\d{8}$/.test(telf)) {
    //         errores.push({ campo: "Telf", message: "El telefono tener 9 dígitos y estar con el formato correcto" })
    //     }

    //     if (email === "") {
    //         errores.push({ campo: "Email", message: "El campo de email no puede estar vacío" })
    //     }
    //     else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
    //         errores.push({ campo: "Email", message: "El email debe tener un formato correcto" })
    //     }

    //     if(passwordActual !== "" && passwordNueva === "") {
    //         errores.push({ campo: "Contraseña", message: "Debe introducir una contraseña nueva" })
    //     }
    //     else if (passwordActual === "" && passwordNueva !== ""){
    //         errores.push({ campo: "Contraseña", message: "Debe introducir la contraseña actual" })
    //     }

    //     if(!$('#politicas-privacidad-2').is(':checked')){
    //         errores.push({ campo: "Políticas de privacidad", message: "Debe aceptar las políticas de privacidad" })
    //     }


    //     if (errores.length === 0) {
    //         $.ajax({
    //             type: "POST",
    //             url: `${BASE_URL}index.php/editarUsuarioPersonal`,
    //             data: { id_usuario: idUsuario, nombre: nombre, email: email, telf: telf, password_vieja: passwordActual, password_nueva: passwordNueva },
    //             dataType: "JSON",
    //             success: function (response) {

    //                 if (response.success == true) {
    //                     $('#modalInfoUsuario').modal('hide')
    //                 }
    //                 else {
    //                     $('.contenedor-alert-editar-usuario .alert-errores-editar-usuario .errores ul').append(`<li>${response.message}</li>`)

    //                     $('.contenedor-alert-editar-usuario').removeClass('d-none')
    //                     $('.alert-errores-editar-usuario').show();
    //                 }
    //             }
    //         });
    //     }
    //     else {

    //         $('#modalInfoUsuario .alert-errores-editar-usuario .errores ul').empty()

    //         errores.map(e => {
    //             $('#modalInfoUsuario .alert-errores-editar-usuario .errores ul').append(`<li>${e.message}</li>`)
    //         })

    //         $('#modalInfoUsuario .contenedor-alert-editar-usuario').removeClass('d-none');
    //         $('#modalInfoUsuario .alert-errores-editar-usuario').show();
    //     }
    // })

    $(document).on('click', '#btn-guardar-info-usuario-personal', function() {
        let errores = []

        let idUsuario = $('#modalInformacionPersonal').data('usuario')
        let nombre = $('#nombre-usuario-personal').val();
        let telf = $('#telf-usuario-personal').val().trim();
        let email = $('#email-usuario-personal').val();
        let passwordActual = $('#password-actual-usuario-personal').val();
        let passwordNueva  = $('#password-usuario-personal').val();

        if (nombre === "") {
            errores.push({ campo: "Nombre", message: "El campo de nombre no puede estar vacío" })
        }

        if (telf === "") {
            errores.push({ campo: "Telf", message: "El campo de telefono no puede estar vacío" })
        }
        else if (isNaN(telf) || telf === "e") {
            errores.push({ campo: "Telf", message: "El telefono debe ser un numero" })
        }
        else if (!/^[6789]\d{8}$/.test(telf)) {
            errores.push({ campo: "Telf", message: "El telefono tener 9 dígitos y estar con el formato correcto" })
        }

        if (email === "") {
            errores.push({ campo: "Email", message: "El campo de email no puede estar vacío" })
        }
        else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
            errores.push({ campo: "Email", message: "El email debe tener un formato correcto" })
        }

        if(passwordActual !== "" && passwordNueva === "") {
            errores.push({ campo: "Contraseña", message: "Debe introducir una contraseña nueva" })
        }
        else if (passwordActual === "" && passwordNueva !== ""){
            errores.push({ campo: "Contraseña", message: "Debe introducir la contraseña actual" })
        }

        if(!$('#politicas-privacidad-2').is(':checked')){
            errores.push({ campo: "Políticas de privacidad", message: "Debe aceptar las políticas de privacidad" })
        }


        if (errores.length === 0) {
            $.ajax({
                type: "POST",
                url: `${BASE_URL}index.php/editarUsuarioPersonal`,
                data: { id_usuario: idUsuario, nombre: nombre, email: email, telf: telf, password_vieja: passwordActual, password_nueva: passwordNueva },
                dataType: "JSON",
                success: function (response) {

                    if (response.success == true) {
                        $('#modalInformacionPersonal').modal('hide')
                        $('#modalInformacionPersonal #password-actual-usuario-personal').val('')
                        $('#modalInformacionPersonal #password-usuario-personal').val('')
                    }
                    else {
                        $('#modalInformacionPersonal .alert-errores-editar-usuario .errores ul').empty()
                        $('#modalInformacionPersonal .alert-errores-editar-usuario .errores ul').append(`<li>${response.message}</li>`)
                        $('#modalInformacionPersonal .contenedor-alert-editar-usuario').removeClass('d-none');
                        $('#modalInformacionPersonal .alert-errores-editar-usuario').show();    
                    }
                }
            });
        }
        else {

            $('#modalInformacionPersonal .alert-errores-editar-usuario .errores ul').empty()

            errores.map(e => {
                $('#modalInformacionPersonal .alert-errores-editar-usuario .errores ul').append(`<li>${e.message}</li>`)
            })

            $('#modalInformacionPersonal .contenedor-alert-editar-usuario').removeClass('d-none');
            $('#modalInformacionPersonal .alert-errores-editar-usuario').show();
        }
    })

    $(document).on('input', '#password-actual-usuario-personal', function() {

        let valor = $(this).val();
        if(valor !== "") {
            $('#password-usuario-personal').prop('readonly', false);
        }
        else {
            $('#password-usuario-personal').val("")
            $('#password-usuario-personal').prop('readonly', true);
        }
    })

    $(document).on('click', '.btn-anular-reserva-dia', function(){

        let idReserva   = parseInt($(this).data("reserva"))
        let idPedido    = parseInt($(this).data("pedido"))
        let tipoReserva = parseInt($(this).data("tipoReserva"))

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getReservasByPedido`,
            data: {id_pedido: idPedido,},
            dataType: "JSON",
            success: function (response) {

                if(response.success == true) {

                    if(response.reservas.length > 0){
                        
                        $('#días-anular-reserva').empty();
                        $('.reserva-actions').empty();
                        $('.reserva-actions').append(`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                         Cancelar <i class="bi bi-x-lg"></i>
                                                      </button>`)

                        $('.reserva-actions').append(`<button type="button" class="btn btn-danger btn-borrar-dia" >
                                                         Borrar <i class="bi bi-trash3"></i>
                                                      </button>`)

                        response.reservas.map(r => {
                            
                            let cardDia = $(`<div class="franja-horaria" data-reserva="${r.id_reserva}">
                                                <span class="franja-horaria-icon"><i class="bi bi-calendar-check"></i></span>
                                                <span>${formatearFecha(r.fecha)}</span>
                                                <button class="icono-borrar-reserva"><i class="bi bi-x-lg icon-borrar"></i></button>
                                            </div>`);

                            $('#días-anular-reserva').append(cardDia)
                        })
                    }
                }
            }
        });
    })

    $(document).on('click', '.btn-borrar-dia', function(){

        let datos = []; 
        let idPedido = $(this).closest('.reserva-card').data('pedido');

        $('#días-anular-reserva .franja-horaria.hora-seleccionada-borrar').map(function(i, el) {
            datos.push({ id_reserva: $(el).data("reserva"), id_pedido: idPedido });
        });

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/borrarReservasDia`,
            data: {data: datos},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    if(response.reservas.length > 0) {
                        datos.map(d => {
                            $(`#días-anular-reserva .franja-horaria.hora-seleccionada-borrar[data-reserva="${parseInt(d.id_reserva)}"]`).remove();
                        })

                        $(`.detalle-value.info-fechas`).text(formatearFecha(response.reservas[0].fecha) + " → " + formatearFecha(response.reservas[response.reservas.length - 1].fecha))
                    }
                    else {
                        $(`.reserva-card[data-pedido="${idPedido}"]`).remove();
                    }
                }
            }
        });
    })


    $(document).on('click', '.switch-tipo-reserva-btn', function () {
        const tipo = $(this).data('tipo');

        if ($(this).hasClass('active')) return;

        $('.switch-tipo-reserva-btn').removeClass('active').attr('aria-selected', 'false');
        $(this).addClass('active').attr('aria-selected', 'true');

        $('#switchPill').css('transform', tipo === 'actividades' ? 'translateX(100%)' : 'translateX(0)');

        $('.reservas-list-instalaciones').toggleClass('d-none', tipo !== 'instalaciones');
        $('.reservas-list-actividades').toggleClass('d-none', tipo !== 'actividades');

        if (tipo === 'actividades' && !$('.reservas-list-actividades').data('cargado')) {
            cargarMisActividades();
        }
    });

    $(document).on('click', '.btn-editar-reserva-actividad-mis-reservas', function(e){

        e.preventDefault()
        let pedido = parseInt($(this).closest('.reserva-card').data('pedido'));
        let actividad = parseInt($(this).closest('.reserva-card').data('actividad'));

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/obtenerPersonas`,
            data: { pedido: pedido, actividad: actividad },
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    let nombre = parseInt(response.actividad['0']['nombre_usuario']);
                    let apellidos = parseInt(response.actividad['0']['apellidos_usuario']);
                    let fechaNacimiento = parseInt(response.actividad['0']['fecha_nacimiento_usuario']);
                    let edadMinima = (response.actividad['0']['edad_minima_usuario'] !== null && response.actividad['0']['edad_minima_usuario'] !== '') ? parseInt(response.actividad['0']['edad_minima_usuario']) : 0;
                    let dni = parseInt(response.actividad['0']['dni_usuario']);
                    let email = parseInt(response.actividad['0']['email_usuario']);
                    let telefono = parseInt(response.actividad['0']['telefono_usuario']);
                    let direccion = parseInt(response.actividad['0']['direccion_usuario']);

                    $('#modalEditarReservaActividadUsuario .informacion-reserva h3').text(response.actividad['0']['nombre']);
                    $('#modalEditarReservaActividadUsuario .informacion-reserva p.descripcion').text(response.actividad['0']['descripcion']);
                    $('#modalEditarReservaActividadUsuario .informacion-reserva p.fecha-actividad').text(new Date(response.actividad['0']['fecha_actividad'] + 'T00:00:00').toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }));
                    $('#modalEditarReservaActividadUsuario .informacion-reserva p.contador-plazas span.plazas-reserva').text(parseInt(response.reservas.length));
                    $('#modalEditarReservaActividadUsuario .informacion-reserva p.contador-plazas span.plazas-libres').text((parseInt(response.actividad['0']['tiene_aforo']) === 1) ? '/' + parseInt(response.actividad['0']['aforo']) : ''); 

                    $('#modalEditarReservaActividadUsuario .personas-editar-reserva').empty();
                    let article = ''
                    let cont
                    response.reservas.map(function(reserva, index){
                        
                        cont = index + 1

                        article = crearInputsInfoAdicional(nombre, apellidos, fechaNacimiento, edadMinima, dni, email, telefono, direccion, cont, true, reserva["id_usuario"]);
                        $('#modalEditarReservaActividadUsuario .personas-editar-reserva').append(article);

                        if (nombre === 1) $('#modalEditarReservaActividadUsuario #nombre_' + cont).val(reserva['nombre_usuario']).prop('required', false).prop('readonly', true);
                        if (apellidos === 1) $('#modalEditarReservaActividadUsuario #apellidos_' + cont).val(reserva['apellidos_usuario']).prop('required', false).prop('readonly', true);
                        if (fechaNacimiento === 1) $('#modalEditarReservaActividadUsuario #fecha-nacimiento_' + cont).val(reserva['fecha_nacimiento_usuario']).prop('required', false).prop('readonly', true);
                        if (dni === 1) $('#modalEditarReservaActividadUsuario #dni_' + cont).val(reserva['dni_usuario']).prop('required', false).prop('readonly', true);
                        if (email === 1) $('#modalEditarReservaActividadUsuario #email_' + cont).val(reserva['email_usuario']).prop('required', false).prop('readonly', true);
                        if (telefono === 1) $('#modalEditarReservaActividadUsuario #telefono_' + cont).val(reserva['telefono_usuario']).prop('required', false).prop('readonly', true);
                        if (direccion === 1) $('#modalEditarReservaActividadUsuario #direccion_' + cont).val(reserva['direccion_usuario']).prop('required', false).prop('readonly', true);

                    })

                    $('#modalEditarReservaActividadUsuario #btn-guardar-cambios-reserva-actividad-admin').attr('data-place', 'misReservas')
                    $('#modalEditarReservaActividadUsuario').attr('data-pedido', parseInt(response.pedido));
                    $('#modalEditarReservaActividadUsuario').attr('data-actividad', parseInt(response.actividad['0']['id_actividades']));
                    $('#modalEditarReservaActividadUsuario').modal('show');
                }
            }
        });
    })


    $(document).on('click', '#modalEditarReservaActividadUsuario .eliminar-persona-reserva-actividad', function(e){

        e.preventDefault();
        $(this).closest('article').remove();
        $('#modalEditarReservaActividadUsuario .informacion-reserva p.contador-plazas span.plazas-reserva').text((parseInt($('#modalEditarReservaActividadUsuario .informacion-reserva p.contador-plazas span.plazas-reserva').text())-1))

    })


    $(document).on('input', '#modalEditarReservaActividadUsuario .personas-editar-reserva input', function(e){
        
        e.preventDefault();
        const regexDniNie = /^(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z])$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexTelefono = /^[6789]\d{8}$/;

        if($(this).data('campo') === 'fecha-nacimiento' && new Date($(this).val()) > new Date($(this).attr('max'))){
             $(this).addClass('is-invalid');
        }
        else if($(this).data('campo') === 'dni' && !regexDniNie.test($(this).val().toUpperCase().trim())){
            $(this).addClass('is-invalid');
            
        }
        else if($(this).data('campo') === 'email' && !regexEmail.test($(this).val().trim())){
            $(this).addClass('is-invalid');
            
        }
        else if($(this).data('campo') === 'telefono' && !regexTelefono.test($(this).val().replace(/[\s-]/g, ''))){
            $(this).addClass('is-invalid');
            
        }else if(($(this).data('campo') === 'nombre' || $(this).data('campo') === 'apellidos' || $(this).data('campo') === 'direccion' ) && $(this).val() === "" ){
            $(this).addClass('is-invalid');
        }
        else{
            $(this).removeClass('is-invalid');
        }
        

    })


    $(document).on('click', '#modalEditarReservaActividadUsuario .crear-persona-editar-reserva-actividad', function(e){

        let idActividad = parseInt($('#modalEditarReservaActividadUsuario').data('actividad'));

        e.preventDefault();
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getDataActividad`,
            data: {idActividad: idActividad},
            dataType: "JSON",
            success: function (response) {
              if(response.success === true){
                let tieneAforo = parseInt(response.actividad.tiene_aforo);
                let aforo = tieneAforo === 1 ? parseInt(response.actividad.aforo) : null
                let plazasOcupadas = parseInt(response.actividad.plazas_ocupadas)

                let nombre = parseInt(response.actividad['nombre_usuario']);
                let apellidos = parseInt(response.actividad['apellidos_usuario']);
                let fechaNacimiento = parseInt(response.actividad['fecha_nacimiento_usuario']);
                let edadMinima = (response.actividad['edad_minima_usuario'] !== null && response.actividad['edad_minima_usuario'] !== '') ? parseInt(response.actividad['edad_minima_usuario']) : 0;
                let dni = parseInt(response.actividad['dni_usuario']);
                let email = parseInt(response.actividad['email_usuario']);
                let telefono = parseInt(response.actividad['telefono_usuario']);
                let direccion = parseInt(response.actividad['direccion_usuario']);

                if(aforo !== null && (plazasOcupadas + 1) > aforo){
                    
                    $('#modalEditarReservaActividadUsuario .alert-crear-persona-editar-actividad .errores ul').empty()

                    $('#modalEditarReservaActividadUsuario .alert-crear-persona-editar-actividad .errores ul').append(`<li>No hay plazas suficientes</li>`)
                    

                    $('#modalEditarReservaActividadUsuario .contenedor-alert-crear-persona-editar-actividad').removeClass('d-none');
                    $('#modalEditarReservaActividadUsuario .alert-crear-persona-editar-actividad').show();

                    setTimeout(function() {
                        $('.paginaActividad .contenedor-alert-reserva-actividad').addClass('d-none');
                        $('.paginaActividad .alert-errores-reservar-actividad').hide();
                    }, 3000);
                }
                else {
                    let numPersona = parseInt($('#modalEditarReservaActividadUsuario .personas-editar-reserva article').last().data('persona'));
                    let articulo = crearInputsInfoAdicional(nombre, apellidos, fechaNacimiento, edadMinima, dni, email, telefono, direccion, (numPersona + 1), true);
                    $('#modalEditarReservaActividadUsuario .personas-editar-reserva').append(articulo)
                    $('#modalEditarReservaActividadUsuario .informacion-reserva p.contador-plazas span.plazas-reserva').text((parseInt($('#modalEditarReservaActividadUsuario .informacion-reserva p.contador-plazas span.plazas-reserva').text())+1))
                }
              }  
            }
        });

    })

    $(document).on('click', '#modalEditarReservaActividadUsuario #btn-guardar-cambios-reserva-actividad-admin', function(e){

        e.preventDefault();

        let button = $(this)

        let errores = [];
        const regexDniNie = /^(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z])$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexTelefono = /^[6789]\d{8}$/;

        let personas = [];
        
        let cont = 0;
        $('#modalEditarReservaActividadUsuario .personas-editar-reserva input').map(function(){
            let input = $(this);
            if(input.val() === ""){
                cont++;
                input.addClass('is-invalid');
            } else {

                if(input.data('campo') === 'fecha-nacimiento' && new Date(input.val()) > new Date(input.attr('max'))){
                    input.addClass('is-invalid');
                    errores.push({campo: 'fecha de nacimiento', mensaje: 'No respeta la edad indicada'})
                }
                else if(input.data('campo') === 'dni' && !regexDniNie.test(input.val().toUpperCase().trim())){
                    input.addClass('is-invalid');
                    errores.push({campo: 'DNI/NIE', mensaje: 'Debe introducir un dni o nie correcto'})
                }
                else if(input.data('campo') === 'email' && !regexEmail.test(input.val().trim())){
                    input.addClass('is-invalid');
                    errores.push({campo: 'email', mensaje: 'Debe introducir un email correcto'})
                }
                else if(input.data('campo') === 'telefono' && !regexTelefono.test(input.val().replace(/[\s-]/g, ''))){
                    input.addClass('is-invalid');
                    errores.push({campo: 'teléfono', mensaje: 'Debe introducir un número de teléfono correcto'})
                }
                else{
                    input.removeClass('is-invalid');
                }
            }
        })

        if(cont > 0){
            errores.push({campo: 'Alguno', mensaje: 'Debe completar toda la información'})
        }

        if(errores.length === 0){

            $('#modalEditarReservaActividadUsuario .personas-editar-reserva article').map(function(){
                let article = $(this);
                personas.push({
                    nombre: article.find('input[data-campo="nombre"]').length ? article.find('input[data-campo="nombre"]').val() : null,
                    apellidos: article.find('input[data-campo="apellidos"]').length ? article.find('input[data-campo="apellidos"]').val() : null,
                    fechaNacimiento: article.find('input[data-campo="fecha-nacimiento"]').length ? article.find('input[data-campo="fecha-nacimiento"]').val() : null,
                    edadMinima: article.data('data-edad') !== undefined ? parseInt(article.data('data-edad')) : null,
                    dni: article.find('input[data-campo="dni"]').length ? article.find('input[data-campo="dni"]').val() : null,
                    email: article.find('input[data-campo="email"]').length ? article.find('input[data-campo="email"]').val() : null,
                    telefono: article.find('input[data-campo="telefono"]').length ? parseInt(article.find('input[data-campo="telefono"]').val()) : null,
                    direccion: article.find('input[data-campo="direccion"]').length ? article.find('input[data-campo="direccion"]').val() : null,
                })
            })
            
            $.ajax({
                type: "POST",
                url: `${BASE_URL}index.php/editarReservaActividad`,
                data: {personas: personas, plazas: personas.length, pedido: parseInt($('#modalEditarReservaActividadUsuario').data('pedido')), actividad: parseInt($('#modalEditarReservaActividadUsuario').data('actividad'))},
                dataType: "JSON",
                success: function (response) {
                    if(response.success === true){
                        $('#modalEditarReservaActividadUsuario').modal('hide');
                        if(button.data('place') === 'misReservas') {
                            window.location.reload();
                        }
                    }
                    else {
                        $('#modalEditarReservaActividadUsuario .alert-crear-persona-editar-actividad .errores ul').empty()

                        $('#modalEditarReservaActividadUsuario .alert-crear-persona-editar-actividad .errores ul').append(`<li>No hay plazas suficientes</li>`)
                        

                        $('#modalEditarReservaActividadUsuario .contenedor-alert-crear-persona-editar-actividad').removeClass('d-none');
                        $('#modalEditarReservaActividadUsuario .alert-crear-persona-editar-actividad').show();

                        setTimeout(function() {
                            $('.paginaActividad .contenedor-alert-reserva-actividad').addClass('d-none');
                            $('.paginaActividad .alert-errores-reservar-actividad').hide();
                        }, 3000);
                    }
                }
            });
        }
        else {

            $('#modalEditarReservaActividadUsuario .alert-crear-persona-editar-actividad .errores ul').empty()

            errores.map(function(e){
                $('#modalEditarReservaActividadUsuario .alert-crear-persona-editar-actividad .errores ul').append(`<li>${e.mensaje}</li>`)
            })
            

            $('#modalEditarReservaActividadUsuario .contenedor-alert-crear-persona-editar-actividad').removeClass('d-none');
            $('#modalEditarReservaActividadUsuario .alert-crear-persona-editar-actividad').show();

            setTimeout(function() {
                $('.paginaActividad .contenedor-alert-reserva-actividad').addClass('d-none');
                $('.paginaActividad .alert-errores-reservar-actividad').hide();
            }, 3000);
        }
        

    })

    // $(document).on('input', '#modalEditarReservaActividadUsuario #numPlazas', function(e){
    //     e.preventDefault();

    //     let val = parseInt($(this).val());
    //     let max = parseInt($(this).attr('max'));
    //     let min = parseInt($(this).attr('min'));

    //     if(max < val || val < min) {
    //         $('#modalEditarReservaActividadUsuario #btnGuardarPlazas').prop('disabled', true)
    //     }
    //     else {
    //         $('#modalEditarReservaActividadUsuario #btnGuardarPlazas').prop('disabled', false)
    //         $('#modalEditarReservaActividadUsuario #totalPrecio').text(parseFloat( $('#modalEditarReservaActividadUsuario #precio-actividad').val()) * val);
    //     }

    // })

    // $(document).on('click', '#modalEditarReservaActividadUsuario #btnMenosPlazas', function(e){
    //     e.preventDefault();

    //     let val = parseInt($('#modalEditarReservaActividadUsuario #numPlazas').val());
    //     let max = parseInt($('#modalEditarReservaActividadUsuario #numPlazas').attr('max'));
    //     let min = parseInt($('#modalEditarReservaActividadUsuario #numPlazas').attr('min'));

    //     if(val > 1) {
    //         $('#modalEditarReservaActividadUsuario #numPlazas').val((val - 1))
            
    //         if(val < max) {
    //             $('#modalEditarReservaActividadUsuario #btnGuardarPlazas').prop('disabled', false);  
    //             $('#modalEditarReservaActividadUsuario #totalPrecio').text(parseFloat( $('#modalEditarReservaActividadUsuario #precio-actividad').val()) * (val-1));
    //         }
    //     }

    // })

    // $(document).on('click', '#modalEditarReservaActividadUsuario #btnMasPlazas', function(e){
    //     e.preventDefault();

    //     let val = parseInt($('#modalEditarReservaActividadUsuario #numPlazas').val());
    //     let max = parseInt($('#modalEditarReservaActividadUsuario #numPlazas').attr('max'));
    //     let min = parseInt($('#modalEditarReservaActividadUsuario #numPlazas').attr('min'));

    //     if(val < max || isNaN(max)) {
    //         $('#modalEditarReservaActividadUsuario #numPlazas').val((val + 1))
            
    //         if(val > -1) {
    //             $('#modalEditarReservaActividadUsuario #btnGuardarPlazas').prop('disabled', false);  
    //             $('#modalEditarReservaActividadUsuario #totalPrecio').text(parseFloat( $('#modalEditarReservaActividadUsuario #precio-actividad').val()) * (val+1));
    //         }
    //     }

    // })

    // $(document).on('click', '#modalEditarReservaActividadUsuario #btnGuardarPlazas', function(e){

    //     e.preventDefault()
    //     let plazas = parseInt($('#modalEditarReservaActividadUsuario #numPlazas').val());
    //     let reserva = parseInt($('#modalEditarReservaActividadUsuario #id-reserva-actividad').val())

    //     $.ajax({
    //         type: 'POST',
    //         url: `${BASE_URL}index.php/editarReservaActividad`,
    //         data: {plazas: plazas, reserva: reserva},
    //         dataType: "JSON",
    //         success: function (response) {
                
    //             if(response.success === true) {

    //                 $(`#modalMisReservas .reserva-card[data-reserva=${reserva}] .reserva-detalles .detalle-item`).eq(2).find('.detalle-value').text(response.reserva.plazas_reserva)
    //                 $(`#modalMisReservas .reserva-card[data-reserva=${reserva}] .reserva-detalles .detalle-item`).eq(3).find('.detalle-value').text(response.reserva.precio_reserva+'€')

    //                 $('#modalEditarReservaActividadUsuario').modal('hide');
    //             }
    //         }
    //     });
    // })


    $(document).on('shown.bs.modal', '.modal', function () {
        const openModalsCount = $('.modal.show').length;
        const zIndexModal = 9999 + (10 * openModalsCount);

        $(this).css('z-index', zIndexModal);
        $('.modal-backdrop:not(.modal-stack)').css('z-index', zIndexModal - 5).addClass('modal-stack');
    });


        $(document).on('click', '.btn-anular-reserva-actividad-mis-reservas', function(e){

        e.preventDefault();
        let pedido = parseInt($(this).closest('.reserva-card').data('pedido'))
        let actividad = parseInt($(this).closest('.reserva-card').data('actividad'))

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/obtenerPersonas`,
            data: {pedido: pedido, actividad: actividad},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    let nombre = parseInt(response.actividad[0]['nombre_usuario']);
                    let apellidos = parseInt(response.actividad[0]['apellidos_usuario']);
                    let fechaNacimiento = parseInt(response.actividad[0]['fecha_nacimiento_usuario']);
                    let edadMinima = (response.actividad[0]['edad_minima_usuario'] !== null && response.actividad[0]['edad_minima_usuario'] !== '') ? parseInt(response.actividad[0]['edad_minima_usuario']) : 0;
                    let dni = parseInt(response.actividad[0]['dni_usuario']);
                    let email = parseInt(response.actividad[0]['email_usuario']);
                    let telefono = parseInt(response.actividad[0]['telefono_usuario']);
                    let direccion = parseInt(response.actividad[0]['direccion_usuario']);

                    $('#modalEliminarReservaActividadUsuario #id-reserva-eliminar').val(response.reservas[0]['id_reserva_actividad'])
                    $('#modalEliminarReservaActividadUsuario #nombre-actividad-eliminar-reserva').text(response.actividad[0].nombre);
                    $('#modalEliminarReservaActividadUsuario #fecha-eliminar-reserva').text(timestampAFechaES(response.reservas[0].fecha_reserva));
                    $('#modalEliminarReservaActividadUsuario #plazas-eliminar-reserva').text(response.reservas[0].plazas_reserva);

                    response.reservas.map(function(reserva, index){
                        
                        let cont = index + 1

                        article = crearInputsInfoAdicional(nombre, apellidos, fechaNacimiento, edadMinima, dni, email, telefono, direccion, cont, false, reserva["id_usuario"]);
                        $('#modalEliminarReservaActividadUsuario .contenedor-personas-anular-reserva').append(article);

                        if (nombre === 1) $('#modalEliminarReservaActividadUsuario #nombre_' + cont).val(reserva['nombre_usuario']).prop('required', false).prop('readonly', true);
                        if (apellidos === 1) $('#modalEliminarReservaActividadUsuario #apellidos_' + cont).val(reserva['apellidos_usuario']).prop('required', false).prop('readonly', true);
                        if (fechaNacimiento === 1) $('#modalEliminarReservaActividadUsuario #fecha-nacimiento_' + cont).val(reserva['fecha_nacimiento_usuario']).prop('required', false).prop('readonly', true);
                        if (dni === 1) $('#modalEliminarReservaActividadUsuario #dni_' + cont).val(reserva['dni_usuario']).prop('required', false).prop('readonly', true);
                        if (email === 1) $('#modalEliminarReservaActividadUsuario #email_' + cont).val(reserva['email_usuario']).prop('required', false).prop('readonly', true);
                        if (telefono === 1) $('#modalEliminarReservaActividadUsuario #telefono_' + cont).val(reserva['telefono_usuario']).prop('required', false).prop('readonly', true);
                        if (direccion === 1) $('#modalEliminarReservaActividadUsuario #direccion_' + cont).val(reserva['direccion_usuario']).prop('required', false).prop('readonly', true);

                    })

                    $('#modalEliminarReservaActividadUsuario').attr('data-pedido', parseInt(response.pedido));
                    $('#modalEliminarReservaActividadUsuario').attr('data-actividad', parseInt(response.actividad['0']['id_actividades']));
                    $('#modalEliminarReservaActividadUsuario').modal('show');
                }
            }
        });

    })

    $(document).on('click', '#modalEliminarReservaActividadUsuario #btn-guardar-eliminar-reserva-actividad-usuario', function(e){

        e.preventDefault();
        let pedido = $('#modalEliminarReservaActividadUsuario').data('pedido')
        let actividad = $('#modalEliminarReservaActividadUsuario').data('actividad');

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/eliminarReservaActividad`,
            data: {pedido: pedido, actividad: actividad},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true){

                    $(`#modalInscritosActividad table tbody tr[data-pedido="${pedido}"][data-actividad="${actividad}"]`).remove();
                    $(`.grid-actividades .card-actividad[data-index='${response.actividad}'] .card-actividad-meta`).children('div').eq(2).html((parseInt(response.data_actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${response.data_actividad.plazas_ocupadas} / ${response.data_actividad.aforo} plazas</div>` : `<div><i class="bi bi-people">${response.data_actividad.plazas_ocupadas} inscritos</div>`);
                    $('#modalEliminarReservaActividadUsuario').modal('hide');
                    $(`#modalMisReservas`).modal('hide');

                }
            }
        });
    })


    function cargarMisActividades() {
        const cont = $('.reservas-list-actividades');
        cont.empty();

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/misReservasActividades`,
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    if(response.reservas.length > 0) {
                        response.reservas.forEach(function (reserva) {

                            cont.append(
                                    `
                                        <div class="reserva-card" data-pedido='${reserva.id_pedido}' data-actividad='${reserva.id_actividad}'>
                                            <div class="reserva-image-container" style="background-image: url('${BASE_URL}images/${reserva.imagen}')">
                                            </div>

                                            <div class="reserva-content">
                                                <div class="reserva-header">
                                                    <div class="reserva-info">
                                                        <h3 class="reserva-instalacion">${reserva.nombre}</h3>
                                                        <span class="reserva-tipo">${reserva.categoria}</span>
                                                    </div>
                                                </div>

                                                    <div class="reserva-detalles">
                                                        <div class="detalle-item">
                                                            <div class="detalle-icon">📅</div>
                                                            <div class="detalle-content">
                                                                <div class="detalle-label">Fecha de la actividad</div>
                                                                <div class="detalle-value info-fechas">${formatearFecha(reserva.fecha_actividad)}</div>
                                                            </div>
                                                        </div>

                                                        <div class="detalle-item">
                                                            <div class="detalle-icon">🕐</div>
                                                            <div class="detalle-content">
                                                                <div class="detalle-label">Hora/duración</div>
                                                                <div class="detalle-value">${formatHora(reserva.hora_actividad)} · ${formatHora(reserva.duracion)}</div>
                                                            </div>
                                                        </div>

                                                        <div class="detalle-item">
                                                            <div class="detalle-icon">👥</div>
                                                            <div class="detalle-content">
                                                                <div class="detalle-label">Plazas reservadas</div>
                                                                <div class="detalle-value">${reserva.plazas_reserva}</div>
                                                            </div>
                                                        </div>

                                                        <div class="detalle-item">
                                                            <div class="detalle-icon">💰</div>
                                                            <div class="detalle-content">
                                                                <div class="detalle-label">Precio</div>
                                                                <div class="detalle-value">${reserva.precio_reserva}€</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>

                                            <div class="reserva-actions">
                                                ${(!haPasado(reserva.fecha_limite, reserva.hora_limite)) ? 
                                                    `
                                                    <div class="d-flex gap-2">
                                                        <button class="btn btn-danger btn-anular-reserva-actividad-mis-reservas">Anular</button>
                                                        <button class="btn btn-primary btn-editar-reserva-actividad-mis-reservas">Editar</button>
                                                    </div>
                                                    `:
                                                    ''
                                                }
                                            </div>
                                        </div>
                                    `
                            )

                            cont.data('cargado', true);
                        })
                    }
                    else {
                        cont.append(`<div class="empty-state-reservas">
    <div class="empty-icon-reservas-wrapper">
        <i class="bi bi-calendar-check"></i>
    </div>
    <h3>Aún no tienes reservas</h3>
    <p>Cuando te apuntes a una actividad, aparecerá aquí para que puedas consultarla en cualquier momento.</p>
    <a href="${BASE_URL}index.php/actividades" class="btn-primary-personal">
        Ver actividades <span aria-hidden="true">→</span>
    </a>
</div>`)
                    }
                }
            }
        });
    }


    function sumarHora(hora) {
        let [horas, minutos] = hora.split(":");
        let nuevaHora = (parseInt(horas) + 1).toString().padStart(2, '0');
        return `${nuevaHora}:${minutos}`;
    }

    function formatearFecha(fechaStr) {
            const d = new Date(fechaStr);
            return d.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
    }

    function formatearFechaPeriodo(fechas) {
        if (fechas.length === 0) {
            return formatearFecha(fechas[0]);
        }
        // Ordenar fechas
        fechas.sort();
        const primera = formatearFecha(fechas[0]);
        const ultima = formatearFecha(fechas[fechas.length - 1]);
        return `${primera} → ${ultima}`;
    }

    function capitalizar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function horasPasadasDesde(fechaReserva, horaString) {
    const [horas, minutos] = horaString.split(':').map(Number);
    
    const fechaCompleta = new Date(fechaReserva);
    fechaCompleta.setHours(horas, minutos, 0, 0);

    console.log("Fecha completa de la reserva:", fechaCompleta);
    
    const ahora = new Date();
    
    // Calcular diferencia ABSOLUTA en milisegundos
    const diferencia = Math.abs(ahora - fechaCompleta);
    
    // Convertir a horas
    const horasPasadas = diferencia / (1000 * 60 * 60);
    
    return horasPasadas >= 24;
    }

    function tiempoTranscurrido(fechaString) {

        // Convertimos a formato válido para Date
        const fecha = new Date(fechaString.replace(" ", "T"));
        const ahora = new Date();

        const diferenciaMs = ahora - fecha;
        const segundos = Math.floor(diferenciaMs / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if (segundos < 60) {
            return "Hace un momento";
        } else if (minutos < 60) {
            return `Hace ${minutos} min`;
        } else if (horas < 24) {
            return `Hace ${horas} hora${horas > 1 ? "s" : ""}`;
        } else {
            return `Hace ${dias} día${dias > 1 ? "s" : ""}`;
        }
    }

    function formatHora(hora) {
        return hora ? hora.substring(0, 5) : '';
    }

    function haPasado(fecha, hora) {
        // fecha: "YYYY-MM-DD", hora: "HH:MM:SS" o "HH:MM"
        const fechaHora = new Date(`${fecha}T${hora}`);
        return fechaHora < new Date();
    }

    function crearInputsInfoAdicional(nombre, apellidos, fechaNacimiento, edadMinima, dni, email, telefono, direccion, numeroPersona, editarReserva = false, numeroReserva = '') {

        let campos = [
            { activo: nombre,          id: 'nombre',            label: 'Nombre',              tipo: 'text'  },
            { activo: apellidos,       id: 'apellidos',         label: 'Apellidos',           tipo: 'text'  },
            { activo: fechaNacimiento, id: 'fecha-nacimiento',  label: 'Fecha de nacimiento', tipo: 'date'  },
            { activo: dni,             id: 'dni',               label: 'DNI',                 tipo: 'text'  },
            { activo: email,           id: 'email',             label: 'Email',               tipo: 'email' },
            { activo: telefono,        id: 'telefono',          label: 'Teléfono',            tipo: 'tel'   },
            { activo: direccion,       id: 'direccion',         label: 'Dirección',           tipo: 'text'  },
        ];

        let article = $('<article>').addClass('info-adicional-persona').attr('data-persona', numeroPersona).attr('data-usuario', numeroReserva );

        $(`
            <div class="d-flex justify-content-between align-items-center">
                <p class="titulo-persona">Persona ${numeroPersona}</p>
                ${(editarReserva) ? '<button class="eliminar-persona-reserva-actividad btn btn-danger"><i class="bi bi-trash3"></i></button>' : '' }
            </div>
        `).appendTo(article);

        campos.map(function(campo) {
            if (parseInt(campo.activo) === 1) {

                const inputId = `${campo.id}_${numeroPersona}`;
                const grupo = $('<div>').addClass('form-group mb-3');

                $('<label>').addClass('form-label').attr('for', inputId).text(campo.label).appendTo(grupo);

                let input = $('<input>').addClass('form-control').attr({
                    type: campo.tipo,
                    id: inputId,
                    name: inputId,
                    required: true, 
                    'data-campo': campo.id

                });

                if (campo.id === 'fecha-nacimiento' && edadMinima > 0) {
                    input.attr('max', calcularFechaMaximaPorEdad(edadMinima));
                }

                input.appendTo(grupo);
                article.append(grupo);
            }
        });

        return article;
    }

    function calcularFechaMaximaPorEdad(edadMinima) {
        const hoy = new Date();
        const fechaMax = new Date(hoy.getFullYear() - edadMinima, hoy.getMonth(), hoy.getDate());
        return fechaMax.toISOString().split('T')[0]; // formato YYYY-MM-DD
    }
    
    function timestampAFechaES(timestamp) {
        const [fecha, hora] = timestamp.split(' ');
        const [anio, mes, dia] = fecha.split('-');
    
        if (hora) {
            return `${dia}/${mes}/${anio} ${hora}`;
        }
        return `${dia}/${mes}/${anio}`;
    }
});