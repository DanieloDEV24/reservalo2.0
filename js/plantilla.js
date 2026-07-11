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
                $('#modalMisReservas .reservas-list').empty();

                let pedido;
                let reservasPorPedido = {};
                
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

                        $('#modalMisReservas .reservas-list').append(div);
                });

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

    
});