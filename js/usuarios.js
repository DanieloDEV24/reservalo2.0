$(document).ready(() => {

    $(document).on('click', '.btn-borrar-usuario', function (e) {

        e.preventDefault();

        let idUsuario = $(this).closest('tr').data('index');

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getUsuario`,
            data: { id_usuario: idUsuario },
            dataType: "json",
            success: function (response) {

                if (response.success == true) {

                    $('#modalBorrarUsuario .contenedor-datos-usuario .info-personal-usuario .logo-usuario').text(response.usuario.nombre[0]);
                    $('#modalBorrarUsuario .contenedor-datos-usuario .info-personal-usuario .info-usuario .nombre-usuario').text(response.usuario.nombre);
                    $('#modalBorrarUsuario .contenedor-datos-usuario .info-personal-usuario .info-usuario .email-telf-usuario').text(response.usuario.email + " · " + response.usuario.telf);
                    $('#modalBorrarUsuario .contenedor-datos-usuario .info-personal-usuario .info-usuario .email-telf-usuario-movil').text(response.usuario.email);

                    $('#modalBorrarUsuario .contenedor-datos-usuario .info-registro-usuario .fecha-registro-usuario').text(new Date(response.usuario.fecha_registro).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }));
                    $('#modalBorrarUsuario .contenedor-datos-usuario .info-registro-usuario .numero-reservas-usuario').text(response.usuario.num_reservas + " reservas");
                    $('#modalBorrarUsuario .contenedor-datos-usuario .info-registro-usuario .ultimo-acceso-usuario').text(tiempoTranscurrido(response.usuario.ultimo_inicio));

                    $('#modalBorrarUsuario').data('usuario', idUsuario);

                    $('#modalBorrarUsuario').modal('show');
                }
            }
        });
    })

    $(document).on('click', '#btn-confirmar-eliminar-usuario', function (e) {

        e.preventDefault();

        let idUsuario = parseInt($('#modalBorrarUsuario').data('usuario'));

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/borrarUsuario`,
            data: { id_usuario: idUsuario },
            dataType: "json",
            success: function (response) {

                if (response.success == true) {

                    $('#modalBorrarUsuario').modal('hide');
                    $(`#tabla-usuarios tr[data-index = "${idUsuario}"]`).remove();
                }
            }
        });

    })

    $(document).on('click', '.btn-ver-reservas', function (e) {

        e.preventDefault();

        let idUsuario = $(this).closest('tr').data('index');

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getReservasUsuario`,
            data: { id_usuario: idUsuario },
            dataType: "JSON",
            success: function (response) {

                if (response.success == true) {

                    $('#modalReservasUsuario .modal-header .modal-title span').text(response.usuario.email)

                    $('#modalReservasUsuario .datos-usuario-reservas .info-personal-usuario .logo-usuario').text(response.usuario.nombre[0])
                    $('#modalReservasUsuario .datos-usuario-reservas .info-personal-usuario .info-usuario .nombre-usuario').text(response.usuario.nombre)
                    $('#modalReservasUsuario .datos-usuario-reservas .info-personal-usuario .info-usuario .email-telf-usuario').text(response.usuario.email + " · " + response.usuario.telf);
                    $('#modalReservasUsuario .datos-usuario-reservas .info-personal-usuario .info-usuario .email-telf-usuario-movil').text(response.usuario.email);

                    $('#modalReservasUsuario .stats-usuario .total-reservas h3').text(response.reservas.length)
                    $('#modalReservasUsuario .stats-usuario .total-gastado h3').text((response.reservas.length > 0) ? response.reservas.filter(r => parseInt(r.pagadas) === 1).reduce((acc, r) => acc + parseFloat(r.precio_reserva), 0) + " €" : "0 €")
                    $('#modalReservasUsuario .stats-usuario .reservas-activas h3').text((response.reservas.length > 0) ? response.reservas.filter(r => new Date(`${r.fecha}T${r.hora_inicio}`) >= new Date()).length : 0)

                    $('#modalReservasUsuario .contenedor-reservas').empty()
                    response.reservas.map(r => {

                        let claseEstado = ""
                        let textoEstado = ""

                        if (parseInt(r.pagadas) === 1) {
                            claseEstado = "estado-confirmado";
                            textoEstado = "Confirmada"
                        }
                        else if (new Date(`${r.fecha}T${r.hora_inicio}`) < new Date() && parseInt(r.pagadas) === 0) {
                            claseEstado = "estado-no-pagada";
                            textoEstado = "No asistida"
                        }
                        else {
                            claseEstado = "estado-tramite";
                            textoEstado = "En trámite"
                        }

                        let card = `<div class="card-reserva-usuario-gestor" data-reserva="${r.id_reserva}" data-tipo="${r.tipo_reserva}" data-pedido="${r.id_pedido}">
                                        
                                        <div class="categoria-precio">
                                            <span class="categoria">${r.categoria}</span>
                                            <h3 class="precio">${r.precio_reserva} €</h3>
                                        </div>

                                        <div class="info-reserva">
                                            <h4>${r.nombre_pista}</h4>
                                            <p><i class="bi bi-calendar-check"></i> ${formatearFecha(r.fecha)} · ${formatearHora(r.hora_inicio)} - ${formatearHora(r.hora_final)}</p>
                                        </div>

                                        <div class="extras-reserva">
                                            ${(parseInt(r.iluminacion) === 1) ? '<span><i class="bi bi-lightbulb"></i> Iluminacion</span>' : ""}
                                            ${(parseInt(r.iluminacion) === 1) ? '<span><i class="bi bi-cone-striped"></i> Material</span>' : ""}
                                        </div>

                                        <div class="contenedor-estado-reserva">
                                            <span class="estado-reserva ${claseEstado}">${textoEstado}</span>
                                            <button type="button" class="btn btn-danger btn-anular-usuario"><i class="bi bi-x-lg"></i>&nbsp;Anular</button>
                                        </div>

                                    </div>`

                        $('#modalReservasUsuario .contenedor-reservas').append(card)
                    })

                    $('#modalReservasUsuario').modal('show');

                }
            }
        });

    })

    $(document).on('click', '.card-reserva-usuario-gestor[data-tipo="0"] .btn-anular-usuario', function (e) {

        e.preventDefault();

        let idReserva = parseInt($(this).closest('.card-reserva-usuario-gestor').data('reserva'))
        let idPedido = parseInt($(this).closest('.card-reserva-usuario-gestor').data('pedido'))

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/anularReservasById`,
            data: { idReserva: idReserva, idPedido: idPedido },
            dataType: "JSON",
            success: function (response) {

                if (response.success == true) {

                    $(`.card-reserva-usuario-gestor[data-reserva="${idReserva}"]`).remove()

                    $('#modalReservasUsuario .stats-usuario .total-reservas h3').text(response.todas_reservas.length)
                    $('#modalReservasUsuario .stats-usuario .total-gastado h3').text((response.todas_reservas.length > 0) ? response.todas_reservas.filter(r => r.pagadas).reduce((acc, r) => acc + parseFloat(r.precio_reserva), 0) + " €" : "0 €")
                    $('#modalReservasUsuario .stats-usuario .reservas-activas h3').text((response.todas_reservas.length > 0) ? response.todas_reservas.filter(r => new Date(`${r.fecha}T${r.hora_inicio}`) >= new Date()).length : 0)
                }
            }
        });
    })

    $(document).on('click', '.btn-editar-usuario', function (e) {

        e.preventDefault();

        let idUsuario = parseInt($(this).closest('tr').data('index'));

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getUsuario`,
            data: { id_usuario: idUsuario },
            dataType: "JSON",
            success: function (response) {

                if (response.success == true) {

                    $('#modalInfoUsuario').data('usuario', idUsuario);

                    $('#modalInfoUsuario .datos-usuario-editar .logo-usuario').text(response.usuario.nombre[0])
                    $('#modalInfoUsuario .datos-usuario-editar .info-usuario .nombre-usuario').text(response.usuario.nombre)
                    $('#modalInfoUsuario .datos-usuario-editar .info-usuario .registro-ultm-acceso').text(`Fecha Registro: ${formatearFecha(response.usuario.fecha_registro)} · Último Acceso: ${tiempoTranscurrido(response.usuario.ultimo_inicio)}`)

                    $('#modalInfoUsuario #nombre-usuario').val(response.usuario.nombre)
                    $('#modalInfoUsuario #telf-usuario').val(response.usuario.telf)
                    $('#modalInfoUsuario #email-usuario').val(response.usuario.email)

                    $('#modalInfoUsuario').modal('show')
                }
            }
        });

    })

    $(document).on('click', '.boton-password-usuario', function () {

        if ($('#password-usuario').attr("type") === "password") {

            $(this).find('i').replaceWith('<i class="bi bi-eye-slash"></i>');
            $('#password-usuario').attr("type", "text")
        }
        else {

            $(this).find('i').replaceWith('<i class="bi bi-eye"></i>');
            $('#password-usuario').attr("type", "password")
        }

    })

    $(document).on('click', '#btn-guardar-info-usuario', function () {

        let errores = []

        let idUsuario = $('#modalInfoUsuario').data('usuario')
        let nombre = $('#nombre-usuario').val();
        let telf = $('#telf-usuario').val().trim();
        let email = $('#email-usuario').val();
        let password = $('#password-usuario').val();

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


        if (errores.length === 0) {
            $.ajax({
                type: "POST",
                url: `${BASE_URL}index.php/editarUsuario`,
                data: { id_usuario: idUsuario, nombre: nombre, email: email, telf: telf, password: password },
                dataType: "JSON",
                success: function (response) {

                    if (response.success == true) {
                        $('#modalInfoUsuario').modal('hide')
                        $(`#tabla-usuarios tbody tr[data-index="${idUsuario}"] td:nth-of-type(2)`).text(response.usuario.nombre)
                        $(`#tabla-usuarios tbody tr[data-index="${idUsuario}"] td:nth-of-type(3)`).text(response.usuario.email)
                        $(`#tabla-usuarios tbody tr[data-index="${idUsuario}"] td:nth-of-type(4)`).text(response.usuario.telf)
                    }
                    else {
                        $('.contenedor-alert-editar-usuario .alert-errores-editar-usuario .errores ul').append(`<li>${response.message}</li>`)

                        $('.contenedor-alert-editar-usuario').removeClass('d-none')
                        $('.alert-errores-editar-usuario').show();
                    }
                }
            });
        }
        else {

            $('#modalInfoUsuario .alert-errores-editar-usuario .errores ul').empty()

            errores.map(e => {
                $('#modalInfoUsuario .alert-errores-editar-usuario .errores ul').append(`<li>${e.message}</li>`)
            })

            $('#modalInfoUsuario .contenedor-alert-editar-usuario').removeClass('d-none');
            $('#modalInfoUsuario .alert-errores-editar-usuario').show();
        }
    })

    $(document).on('click', '.btn-baja-usuario', function (e) {

        e.preventDefault();

        let idUsuario = parseInt($(this).closest('tr').data('index'));
        let elemento = $(this)

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/darBaja`,
            data: { id_usuario: idUsuario },
            dataType: "JSON",
            success: function (response) {

                if (response.success == true) {

                    let tr = elemento.closest('tr'); // guardar ANTES del replaceWith

                    tr.find('td:last-of-type').empty();
                    tr.addClass('table-danger');

                    elemento.replaceWith('<a class="dropdown-item btn-alta-usuario" href="">Dar de alta <i class="bi bi-check-lg"></i></a>');

                    tr.find('td:last-of-type').append(`<i class="bi bi-info-circle"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="Este usuario está de baja">
        </i>`);
                }
            }
        });
    })

    $(document).on('click', '.btn-alta-usuario', function (e) {

        e.preventDefault();

        let idUsuario = parseInt($(this).closest('tr').data('index'));
        let elemento = $(this)

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/darAltaUsuario`,
            data: { id_usuario: idUsuario },
            dataType: "JSON",
            success: function (response) {
                if (response.success == true) {

                    let tr = elemento.closest('tr'); // guardar ANTES del replaceWith

                    tr.removeClass('table-danger');

                    if (parseInt(response.num_reservas) >= 3) {
                        tr.find('td:last-of-type').empty();
                        tr.addClass('table-warning')
                        tr.find('td:last-of-type').append(`<i class="bi bi-info-circle"
                data-bs-toggle="tooltip" data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Este usuario lleva ya 3 o más reservas sin asistir">
            </i>`);
                    } else {
                        tr.find('td:last-of-type').empty();
                    }

                    elemento.replaceWith('<a class="dropdown-item btn-baja-usuario" href="">Dar de baja <i class="bi bi-x-lg"></i></a>');
                }
            }
        });
    })

    $(document).on('input', '#input-filtro-usuarios', function(){

        let valor  = $(this).val();
        let estado = $('#baja-filtro-usuario').prop('checked');

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/filtroUsuarios`,
            data: {valor: valor, estado: estado},
            dataType: "JSON",
            success: function (response) {
                
                $('#tabla-usuarios tbody').empty()
                
                let cont = 0
                response.resultado.map(r => {

                    if(parseInt(r.id_rol) !== 2) {
                        cont++;
                        let tr = $(`<tr data-index="${r.id_usuario}" class="${(parseInt(r.reservas_pasadas) >= 3) ? "table-warning" : ""} ${(parseInt(r.usuario_baja) === 1) ? "table-danger" : ""}">
                                    <td>${cont}</td>
                                    <td>${r.nombre}</td>
                                    <td title="${r.email}">${r.email}</td>
                                    <td>${r.telf}</td>
                                    <td>${(r.token_date === null) ? "---" : String(new Date(r.token_date).getDate()).padStart(2, '0') + "/" + String(new Date(r.token_date).getMonth() + 1).padStart(2, '0') + "/" + new Date(r.token_date).getFullYear()}</td>
                                    <td>
                                        <div class="dropdown" style="max-width: 200px;">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="bi bi-three-dots-vertical"></i>
                                            </button>

                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item btn-borrar-usuario" href="">Borrar &nbsp;<i class="bi bi-trash3"></i></a></li>
                                                <li><a class="dropdown-item btn-ver-reservas" href="">Reservas <i class="bi bi-bookmark-check-fill"></i></a></li>
                                                <li><a class="dropdown-item btn-editar-usuario" href="">Editar <i class="bi bi-pencil-fill"></i></a></li>
                                                <li><a class="dropdown-item ${(parseInt(r.usuario_baja) === 0 ) ? "btn-baja-usuario" : "btn-alta-usuario"}"  href="">${(parseInt(r.usuario_baja) === 0 ) ? "Dar de baja" : "Dar de alta" } ${(parseInt(r.usuario_baja) === 0 ) ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-check-lg"></i>'}</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>
                                        ${(parseInt(r.usuario_baja) === 1) ? `<i  class="bi bi-info-circle"
                                                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                                                data-bs-custom-class="custom-tooltip"
                                                                                data-bs-title="Este usuario está de baja">
                                                                              </i>` 
                                                                            : (parseInt(r.reservas_pasadas) >= 3) ? `<i class="bi bi-info-circle"
                                                                                                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                                                                                                        data-bs-custom-class="custom-tooltip"
                                                                                                                        data-bs-title="Este usuario lleva ya 3 o más reservas sin asistir">
                                                                                                                    </i>` 
                                                                                                                   : ""}     
                                    </td>
                                </tr>`)

                    $('#tabla-usuarios tbody').append(tr);
                    }
                })
            }
        });
    })

    $(document).on('change', '#baja-filtro-usuario', function(){

        let estado = $(this).prop('checked');
        let valor  = $('#input-filtro-usuarios').val()

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/filtroUsuarios`,
            data: {valor: valor, estado: estado},
            dataType: "JSON",
            success: function (response) {
                
                $('#tabla-usuarios tbody').empty()
                
                let cont = 0
                response.resultado.map(r => {

                    if(parseInt(r.id_rol) !== 2) {
                        cont++;
                        let tr = $(`<tr data-index="${r.id_usuario}" class="${(parseInt(r.reservas_pasadas) >= 3) ? "table-warning" : ""} ${(parseInt(r.usuario_baja) === 1) ? "table-danger" : ""}">
                                    <td>${cont}</td>
                                    <td>${r.nombre}</td>
                                    <td title="${r.email}" >${r.email}</td>
                                    <td>${r.telf}</td>
                                    <td>${(r.token_date === null) ? "---" : String(new Date(r.token_date).getDate()).padStart(2, '0') + "/" + String(new Date(r.token_date).getMonth() + 1).padStart(2, '0') + "/" + new Date(r.token_date).getFullYear()}</td>
                                    <td>
                                        <div class="dropdown" style="max-width: 200px;">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="bi bi-three-dots-vertical"></i>
                                            </button>

                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item btn-borrar-usuario" href="">Borrar &nbsp;<i class="bi bi-trash3"></i></a></li>
                                                <li><a class="dropdown-item btn-ver-reservas" href="">Reservas <i class="bi bi-bookmark-check-fill"></i></a></li>
                                                <li><a class="dropdown-item btn-editar-usuario" href="">Editar <i class="bi bi-pencil-fill"></i></a></li>
                                                <li><a class="dropdown-item ${(parseInt(r.usuario_baja) === 0 ) ? "btn-baja-usuario" : "btn-alta-usuario"}"  href="">${(parseInt(r.usuario_baja) === 0 ) ? "Dar de baja" : "Dar de alta" } ${(parseInt(r.usuario_baja) === 0 ) ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-check-lg"></i>'}</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>
                                        ${(parseInt(r.usuario_baja) === 1) ? `<i  class="bi bi-info-circle"
                                                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                                                data-bs-custom-class="custom-tooltip"
                                                                                data-bs-title="Este usuario está de baja">
                                                                              </i>` 
                                                                            : (parseInt(r.reservas_pasadas) >= 3) ? `<i class="bi bi-info-circle"
                                                                                                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                                                                                                        data-bs-custom-class="custom-tooltip"
                                                                                                                        data-bs-title="Este usuario lleva ya 3 o más reservas sin asistir">
                                                                                                                    </i>` 
                                                                                                                   : ""}     
                                    </td>
                                </tr>`)

                    $('#tabla-usuarios tbody').append(tr);
                    }
                })
            }
        });
    })


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

    function formatearFecha(fechaStr) {
        const d = new Date(fechaStr);
        return d.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    function formatearHora(hora) {
        const partes = hora.split(':');
        return `${partes[0]}:${partes[1]}`;
    }
})