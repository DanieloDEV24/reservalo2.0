$(document).ready(function () {

    $(document).on('click', '.btn-modal-crear-tipo-actividad', function(e){

        e.preventDefault();

        $('#modalCrearTipoActividad').modal('show');
    })


    $(document).on('click', '#btn-guardar-crear-tipo-actividad', function(e){
    
        e.preventDefault();

        let errores = [];
        let nombre = $('#nombre-tipo-actividad-crear').val();

        if(nombre === '') {
            errores.push({campo: "nombre", mensaje: "El nombre de la categoría no puede estar vacío"});
        }

        if(errores.length === 0) {
            $.ajax({
                type: "POST",
                url: `${BASE_URL}index.php/crearTipoActividad`,
                data: {nombre: nombre},
                dataType: "JSON",
                success: function (response) {
                    if(response.success == true){
                        if(parseInt(response.numeroTiposActividad) === 1) {

                            $('#modalMenuTiposActividades table tbody').empty();

                            $('.no-actividades .botones-no-actividades .btn-modal-crear-tipo-actividad').remove();
                            $('.no-actividades .botones-no-actividades').append('<a href="" class="btn-secondary-personal btn-modal-menu-tipo-actividad">Menu categorías</a>');
                            
                            $('#modalCrearTipoActividad #nombre-tipo-actividad-crear').val('');
                            $('#modalCrearTipoActividad').modal('hide');
                        }
                        else {
                            $('#modalMenuTiposActividades table tbody').empty();
                            let cont = 0;
                            $('#modalCrearActividad #categoria-actividad-crear').empty();
                            $('#modalCrearActividad #categoria-actividad-crear').append(`<option value="-1">Seleccione una categoría</option>`);
                            let tiposActividad = response.tiposActividad;
                            tiposActividad.map(tipo => {
                                cont++
                                $('#modalMenuTiposActividades table tbody').append(`
                                    <tr data-index="${tipo.id_tipos_actividades}">
                                        <td style="width: 20%;">${cont}</td>
                                        <td style="width: 60%;">${tipo.nombre}</td>
                                        <td>
                                            <div style="display: flex; gap: 5px; justify-content: end;">
                                                <button class="btn btn-primary btn-editar-tipo-actividad" style="background-color: #32cccc; border-color: #32cccc;" title="Editar"><i class="bi bi-pencil-square"></i></button>
                                                <button class="btn btn-danger btn-eliminar-tipo-actividad" style="background-color: #32cccc; border-color: #32cccc;" title="Eliminar" ${tipo.total_actividades > 0 ? 'disabled' : ''}><i class="bi bi-trash3"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                `)
                                
                                $('#modalCrearActividad #categoria-actividad-crear').append(`<option value="${tipo.id_tipos_actividades}">${tipo.nombre}</option>`);
                                
                            });

                        $('#modalCrearTipoActividad').modal('hide');
                        }
                    }
                }
            });
        } else {
                $('#modalCrearTipoActividad .alert-errores-nuevo-tipo-actividad .errores ul').empty()

                errores.map(e => {
                    $('#modalCrearTipoActividad .alert-errores-nuevo-tipo-actividad .errores ul').append(`<li>${e.mensaje}</li>`)
                })

                $('#modalCrearTipoActividad .contenedor-alert-nuevo-tipo-actividad').removeClass('d-none');
                $('#modalCrearTipoActividad .alert-errores-nuevo-tipo-actividad').show();
        }
    })


    $(document).on('click', '.btn-modal-menu-tipo-actividad', function(e){
        
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getMenuTiposActividades`,
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#modalMenuTiposActividades table tbody').empty();

                    let cont = 0;
                    let tiposActividad = response.tiposActividad;
                    tiposActividad.map(tipo => {
                        cont++
                        $('#modalMenuTiposActividades table tbody').append(`
                            <tr data-index="${tipo.id_tipos_actividades}">
                                <td style="width: 20%;">${cont}</td>
                                <td style="width: 60%;">${tipo.nombre}</td>
                                <td>
                                    <div style="display: flex; gap: 5px; justify-content: end;">
                                        <button class="btn btn-primary btn-editar-tipo-actividad" style="background-color: #32cccc; border-color: #32cccc;" title="Editar"><i class="bi bi-pencil-square"></i></button>
                                        <button class="btn btn-danger btn-eliminar-tipo-actividad" style="background-color: #32cccc; border-color: #32cccc;" title="Eliminar" ${tipo.total_actividades > 0 ? 'disabled' : ''}><i class="bi bi-trash3"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `)
                    })

                    $('#modalMenuTiposActividades').modal('show');
                }
            }
        });
    })


    $(document).on('click', '.btn-editar-tipo-actividad', function(e){

        e.preventDefault();

        let index = $(this).closest('tr').data('index');

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getTipoActividad`,
            data: {id_tipo_actividad: index},
            dataType: "JSON",
            success: function (response) {

                if(response.success == true) {

                    $('#modalEditarTipoActividad #nombre-tipo-actividad-editar').val(response.tipoActividad.nombre);
                    $('#modalEditarTipoActividad #id-tipo-actividad-editar').val(response.tipoActividad.id_tipos_actividades);

                    $('#modalEditarTipoActividad').modal('show');
                }
            }
        });
    })


    $(document).on('click', '#btn-guardar-editar-tipo-actividad', function(e){

        e.preventDefault();

        let errores = [];
        let nombre = $('#nombre-tipo-actividad-editar').val();
        let id_tipo_actividad = $('#id-tipo-actividad-editar').val();

        if(nombre === '') {
            errores.push({campo: "nombre", mensaje: "El nombre de la categoría no puede estar vacío"});
        }

        if(errores.length === 0) {
            $.ajax({
                type: "POST",
                url: `${BASE_URL}index.php/editarTipoActividad`,
                data: {
                    nombre: nombre,
                    id_tipo_actividad: id_tipo_actividad
                },
                dataType: "JSON",
                success: function (response) {
                    if(response.success == true){
                        $('#modalMenuTiposActividades table tbody').empty();
                        $('#modalCrearActividad #categoria-actividad-crear').empty();
                        $('#modalCrearActividad #categoria-actividad-crear').append(`<option value="-1">Seleccione una categoría</option>`);
                        let cont = 0;
                        let tiposActividad = response.tiposActividad;
                        tiposActividad.map(tipo => {
                            cont++
                            $('#modalMenuTiposActividades table tbody').append(`
                                <tr data-index="${tipo.id_tipos_actividades}">
                                    <td style="width: 20%;">${cont}</td>
                                    <td style="width: 60%;">${tipo.nombre}</td>
                                    <td>
                                        <div style="display: flex; gap: 5px; justify-content: end;">
                                            <button class="btn btn-primary btn-editar-tipo-actividad" style="background-color: #32cccc; border-color: #32cccc;" title="Editar"><i class="bi bi-pencil-square"></i></button>
                                            <button class="btn btn-danger btn-eliminar-tipo-actividad" style="background-color: #32cccc; border-color: #32cccc;" title="Eliminar" ${tipo.total_actividades > 0 ? 'disabled' : ''}><i class="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            `)

                            $('#modalCrearActividad #categoria-actividad-crear').append(`<option value="${tipo.id_tipos_actividades}">${tipo.nombre}</option>`);
                        });

                        $('#modalEditarTipoActividad').modal('hide');

                    }
                }
            });
        }
        else {
            
                $('#modalEditarTipoActividad .alert-errores-editar-tipo-actividad .errores ul').empty()

                errores.map(e => {
                    $('#modalEditarTipoActividad .alert-errores-editar-tipo-actividad .errores ul').append(`<li>${e.mensaje}</li>`)
                })

                $('#modalEditarTipoActividad .contenedor-alert-editar-tipo-actividad').removeClass('d-none');
                $('#modalEditarTipoActividad .alert-errores-editar-tipo-actividad').show();
        }
    })

    $(document).on('click', '#btn-guardar-eliminar-tipo-actividad', function(e){

        e.preventDefault(); 

        let id_tipo_actividad = $('#id-tipo-actividad-eliminar').val();

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/eliminarTipoActividad`,
            data: { id_tipo_actividad: id_tipo_actividad },
            dataType: "json",
            success: function (response) {
                
                if(response.success == true){

                    $('#modalMenuTiposActividades table tbody').empty();
                    $('#modalCrearActividad #categoria-actividad-crear').empty();
                    $('#modalCrearActividad #categoria-actividad-crear').append(`<option value="-1">Seleccione una categoría</option>`);
                    let cont = 0;
                    let tiposActividad = response.tiposActividad;
                    
                    tiposActividad.map(tipo => {
                            cont++
                            $('#modalMenuTiposActividades table tbody').append(`
                                <tr data-index="${tipo.id_tipos_actividades}">
                                    <td style="width: 20%;">${cont}</td>
                                    <td style="width: 60%;">${tipo.nombre}</td>
                                    <td>
                                        <div style="display: flex; gap: 5px; justify-content: end;">
                                            <button class="btn btn-primary btn-editar-tipo-actividad" style="background-color: #32cccc; border-color: #32cccc;" title="Editar"><i class="bi bi-pencil-square"></i></button>
                                            <button class="btn btn-danger btn-eliminar-tipo-actividad" style="background-color: #32cccc; border-color: #32cccc;" title="Eliminar" ${tipo.total_actividades > 0 ? 'disabled' : ''}><i class="bi bi-trash3"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            `)

                            $('#modalCrearActividad #categoria-actividad-crear').append(`<option value="${tipo.id_tipos_actividades}">${tipo.nombre}</option>`);
                        });

                        $('#modalEliminarTipoActividad').modal('hide');

                }
            }
        });

    })


    $(document).on('click', '.btn-eliminar-tipo-actividad', function(e){
        e.preventDefault();
        const idTipoActividad = $(this).closest('tr').data('index');
        $('#id-tipo-actividad-eliminar').val(idTipoActividad);
        $('#nombre-tipo-actividad-eliminar').text($(this).closest('tr').find('td:nth-child(2)').text());
        $('#modalEliminarTipoActividad').modal('show');
    })


    $(document).on('click', '.btn-crear-actividad', function(e){
        
        e.preventDefault();
        $('#modalCrearActividad').modal('show');
    })


    $('.toggle-switch input.aforo').on('change', function (event) {

        event.preventDefault();

        let isChecked = $(this).is(':checked'); // --> Comprobamos si esta seleccionado

        // En el caso de que esté seleccionado, borramos el atributo readonly para poder añadir un valor) y ponemos el color del texto del input en negro. Además le añadimos el foco
        if (isChecked) {
            $('#aforo-actividad-crear').removeAttr('readonly').css('color', 'black').focus(); 
        }
        // Si no está seleccionado,  
        else {
           $('#aforo-actividad-crear').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
        }
    })

    $('.toggle-switch input.precio').on('change', function (event) {

        event.preventDefault();

        let isChecked = $(this).is(':checked'); // --> Comprobamos si esta seleccionado

        // En el caso de que esté seleccionado, borramos el atributo readonly para poder añadir un valor) y ponemos el color del texto del input en negro. Además le añadimos el foco
        if (isChecked) {
            $('#precio-actividad-crear').removeAttr('readonly').css('color', 'black').focus(); 
        }
        // Si no está seleccionado,  
        else {
           $('#precio-actividad-crear').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
        }
    })


    $(document).on('click', '#btn-guardar-crear-actividad', function(e){
        
        e.preventDefault();
        let errores = [];

        let nombre = $('#nombre-actividad-crear').val();
        let categoria = $('#categoria-actividad-crear').val();
        let descripcion = $('#descripcion-actividad-crear').val();
        let fecha = $('#fecha-actividad-crear').val();
        let hora = $('#hora-actividad-crear').val();
        let fechaLimite = $('#fecha-limite-actividad-crear').val();
        let horaLimite = $('#hora-limite-actividad-crear').val();
        let tieneAforo = $('.toggle-switch .aforo').is(':checked');
        let aforo = tieneAforo ? $('#aforo-actividad-crear').val() : null;
        let tienePrecio = $('.toggle-switch .precio').is(':checked');
        let precio = tienePrecio ? $('#precio-actividad-crear').val() : null;
        let lugar = $('#lugar-actividad-crear').val();
        let duracion = $('#duracion-actividad-crear').val();
        let imagen = $('#modalCrearActividad .imagenes')[0].files[0];

        let nombreUsuario = $('#modalInformacionUsuarioActividad .nombre-usuario').is(':checked');
        let apellidosUsuario = $('#modalInformacionUsuarioActividad .apellidos-usuario').is(':checked');
        let fechaNacimientoUsuario = $('#modalInformacionUsuarioActividad .fecha-nacimiento-usuario').is(':checked');
        let edadMinimaUsuario = $(fechaNacimientoUsuario) ? $('#modalInformacionUsuarioActividad #edad-min-usuario').val() : null;
        let dniUsuario = $('#modalInformacionUsuarioActividad .dni-nie-usuario').is(':checked');
        let emailUsuario = $('#modalInformacionUsuarioActividad .email-usuario').is(':checked');
        let telefonoUsuario = $('#modalInformacionUsuarioActividad .telefono-usuario').is(':checked');
        let direccionUsuario = $('#modalInformacionUsuarioActividad .direccion-usuario').is(':checked');


        if(nombre === '') {
            errores.push({campo: 'nombre', mensaje: 'El nombre de la actividad no puede estar vacío'})
        }

        if(parseInt(categoria) === -1 ) {
            errores.push({campo: 'categoría', mensaje: "Debe seleccionar una categoría"})
        }

        if(descripcion === '') {
            errores.push({campo: 'descripción', mensaje: "La descripción de la actividad no puede estar vacío"})
        }

        if(fecha === '') {
            errores.push({campo: 'fecha', mensaje: "Debe seleccionar una fecha para la actividad"})
        }

        if(hora === '') {
            errores.push({campo: 'hora', mensaje: "Debe seleccionar una hora para la actividad"})
        }

        if(fechaLimite === '') {
            errores.push({campo: 'fecha límite', mensaje: "Debe seleccionar una fecha límite de inscripción"})
        }

        if(toDate(parseFechaES(fecha)) <= toDate(parseFechaES(fechaLimite))){
            errores.push({campo: 'fecha límite', mensaje: "La fecha límite debe ser menor que la fecha de la actividad"})
        }

        const hoy = new Date().toISOString().split('T')[0]; 
        if(toDate(parseFechaES(fecha)) <= toDate(parseFechaES(hoy))){
            errores.push({campo: 'fecha', mensaje: "No puede seleccionar una fecha pasada"})
        }

        if(toDate(parseFechaES(fechaLimite)) <= toDate(parseFechaES(hoy))){
            errores.push({campo: 'fecha límite', mensaje: "No puede seleccionar una fecha pasada"})
        }

        if(horaLimite === '') {
            errores.push({campo: 'hora límite', mensaje: "Debe seleccionar una hora límite de inscripción"})
        }

        if(tieneAforo &&  (aforo === '' || parseFloat(aforo) === 0)) {
            errores.push({campo: 'aforo', mensaje: "Debe seleccionar un aforo para la actividad"})
        }

        if(tienePrecio && (precio === '' || parseFloat(precio) === 0)) {
            errores.push({campo: 'precio', mensaje: "Debe seleccionar un precio para la actividad"})
        }

        if(lugar === '') {
            errores.push({campo: 'lugar', mensaje: "Debe introducir el lugar de la actividad"})
        }

        if(duracion === '') {
            errores.push({campo: 'duracion', mensaje: "Debe seleccionar la duración de la actividad"})
        }

        


        if(errores.length > 0) {

            $('#modalCrearActividad .alert-errores-nueva-actividad .errores ul').empty()

            errores.map(e => {
                $('#modalCrearActividad .alert-errores-nueva-actividad .errores ul').append(`<li>${e.mensaje}</li>`)
            })

            $('#modalCrearActividad .contenedor-alert-nueva-actividad').removeClass('d-none');
            $('#modalCrearActividad .alert-errores-nueva-actividad').show();
        }
        else {

            let formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('categoria', categoria);
            formData.append('descripcion', descripcion);
            formData.append('fecha', fecha);
            formData.append('hora', hora);
            formData.append('fechaLimite', fechaLimite);
            formData.append('horaLimite', horaLimite);
            formData.append('tieneAforo', tieneAforo);
            formData.append('aforo', aforo);
            formData.append('tienePrecio', tienePrecio);
            formData.append('precio', precio);
            formData.append('lugar', lugar);
            formData.append('duracion', duracion);
            formData.append('imagen', imagen);


            formData.append('nombre_usuario', nombreUsuario);
            formData.append('apellidos_usuario', apellidosUsuario);
            formData.append('fecha_nacimiento_usuario', fechaNacimientoUsuario);
            formData.append('edad_minima_usuario', edadMinimaUsuario);
            formData.append('dni_usuario', dniUsuario);
            formData.append('email_usuario', emailUsuario);
            formData.append('telefono_usuario', telefonoUsuario);
            formData.append('direccion_usuario', direccionUsuario);

            $.ajax({
                type: "POST",
                url: `${BASE_URL}index.php/crearActividad`,
                data: formData,
                processData: false,
                contentType: false,
                dataType: "JSON",
                success: function (response) {
                    
                    if(response.success == true) {
                        
                        if(response.actividades.length > 1) {
                            
                            $('.actividades .grid-actividades').empty();

                            response.actividades.map(function(actividad){
                                $('.actividades .grid-actividades').append(`
                                <div class="card-actividad" data-index="${actividad.id_actividades}">
                                    <div class="card-actividad-img">
                                        <img src="${BASE_URL}images/${actividad.imagen}" alt="${actividad.nombre}">
                                        <span class="card-actividad-badge" style="background-color: #32cccc">${actividad.categoria_actividad}</span>

                                        ${(parseInt($('#rol_usuario').val()) === 2) ? `
                                            <div class="dropdown card-actividad-admin-menu">
                                                <button class="btn btn-sm card-actividad-admin-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item btn-editar-actividad" href="#" "><i class="bi bi-pencil me-2"></i>Editar</a></li>
                                                    <li><a class="dropdown-item btn-inscritos-actividad" href="#"><i class="bi bi-people me-2"></i>Ver inscritos</a></li>
                                                    <li><hr class="dropdown-divider"></li>
                                                    <li><a class="dropdown-item text-danger btn-borrar-actividad" href="#" ><i class="bi bi-x-lg me-2"></i></i>Cancelar</a></li>
                                                </ul>
                                            </div>
                                        ` : ''}
                                    </div>
                                    <div class="card-actividad-body">
                                        <p class="card-actividad-titulo">${actividad.nombre}</p>
                                        <p class="card-actividad-desc">${actividad.descripcion}</p>
                                        <div class="card-actividad-meta">
                                            <div><i class="bi bi-calendar"></i> ${parseFechaES(actividad.fecha_actividad)}, ${actividad.hora_actividad}</div>
                                            <div><i class="bi bi-geo-alt"></i> ${actividad.lugar}</div>
                                            ${(parseInt(actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${actividad.plazas_ocupadas} / ${actividad.aforo} plazas</div>` : `<div><i class="bi bi-people"> ${actividad.plazas_ocupadas} inscritos</div>`}
                                        </div>
                                        <div class="card-actividad-footer">
                                            <span class="card-actividad-precio">${(parseInt(actividad.tiene_precio) === 1) ? actividad.precio+'€' : 'Gratis'}</span>
                                            <a class="btn btn-outline-actividad" href="${BASE_URL}index.php/actividad/${actividad.id_actividades}">Ver más</a>
                                        </div>
                                    </div>
                                </div>
                                `)
                            })

                            $('#modalCrearActividad').modal('hide');
                        }
                        else {
                            $('.actividades .no-actividades').addClass('d-none');
                            $('.actividades .grid-actividades').removeClass('d-none');
                            
                            response.actividades.map(function(actividad){
                                $('.actividades .grid-actividades').append(`
                                <div class="card-actividad" data-index="${actividad.id_actividades}">
                                    <div class="card-actividad-img">
                                        <img src="${BASE_URL}images/${actividad.imagen}" alt="${actividad.nombre}">
                                        <span class="card-actividad-badge" style="background-color: #32cccc">${actividad.categoria_actividad}</span>

                                        ${(parseInt($('#rol_usuario').val()) === 2) ? `
                                            <div class="dropdown card-actividad-admin-menu">
                                                <button class="btn btn-sm card-actividad-admin-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item btn-editar-actividad" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                                                    <li><a class="dropdown-item btn-inscritos-actividad" href="#" ><i class="bi bi-people me-2"></i>Ver inscritos</a></li>
                                                    <li><hr class="dropdown-divider"></li>
                                                    <li><a class="dropdown-item text-danger btn-borrar-actividad" href="#" ><i class="bi bi-x-lg me-2"></i></i>Cancelar</a></li>
                                                </ul>
                                            </div>
                                        ` : ''}
                                    </div>
                                    <div class="card-actividad-body">
                                        <p class="card-actividad-titulo">${actividad.nombre}</p>
                                        <p class="card-actividad-desc">${actividad.descripcion}</p>
                                        <div class="card-actividad-meta">
                                            <div><i class="bi bi-calendar"></i> ${parseFechaES(actividad.fecha_actividad)}, ${actividad.hora_actividad}</div>
                                            <div><i class="bi bi-geo-alt"></i> ${actividad.lugar}</div>
                                            ${(parseInt(actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${actividad.plazas_ocupadas} / ${actividad.aforo} plazas</div>` : `<div><i class="bi bi-people"> ${actividad.plazas_ocupadas} inscritos</div>`}
                                        </div>
                                        <div class="card-actividad-footer">
                                            <span class="card-actividad-precio">${(actividad.tiene_precio) ? actividad.precio+'€' : 'Gratis'}</span>
                                            <a class="btn btn-outline-actividad" href="${BASE_URL}index.php/actividad/${actividad.id_actividades}">Ver más</a>
                                        </div>
                                    </div>
                                </div>
                                `)
                            })


                            $('#modalCrearActividad').modal('hide');
                        }
                    }
                }
            });
        }

    })

    $(document).on('click', '.btn-editar-actividad', function(e){

        e.preventDefault();
        let idActividad = $(this).closest('.card-actividad').data('index');
        
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getDataActividad`,
            data: {idActividad: idActividad},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#modalEditarActividad #id-actividad').val(response.actividad.id_actividades);
                    $('#modalEditarActividad #nombre-actividad-editar').val(response.actividad.nombre);
                    $('#modalEditarActividad #descripcion-actividad-editar').val(response.actividad.descripcion);
                    $('#modalEditarActividad #fecha-actividad-editar').val(response.actividad.fecha_actividad);
                    $('#modalEditarActividad #hora-actividad-editar').val(response.actividad.hora_actividad);
                    $('#modalEditarActividad #fecha-limite-actividad-editar').val(response.actividad.fecha_limite);
                    $('#modalEditarActividad #hora-limite-actividad-editar').val(response.actividad.hora_limite);
                    (parseInt(response.actividad.tiene_aforo) === 1) ? $('.toggle-switch .aforo-editar').prop('checked', true) : $('.toggle-switch .aforo-editar').prop('checked', false); // <-- el ; aquí es la clave
                    (parseInt(response.actividad.tiene_aforo) === 1) ? $('#modalEditarActividad #aforo-actividad-editar').prop('readonly', false).css('color', '#000') : $('#modalEditarActividad #aforo-actividad-editar').prop('readonly', true).css('color', '#ccc');
                    
                    $('#modalEditarActividad #aforo-actividad-editar').val((parseInt(response.actividad.aforo) > 0) ? response.actividad.aforo : '');

                    (parseInt(response.actividad.tiene_precio) === 1) ? $('.toggle-switch .precio-editar').prop('checked', true) : $('.toggle-switch .precio-editar').prop('checked', false);
                    (parseInt(response.actividad.tiene_precio) === 1) ? $('#modalEditarActividad #precio-actividad-editar').prop('readonly', false).css('color', '#000') : $('#modalEditarActividad #precio-actividad-editar').prop('readonly', true).css('color', '#ccc');
                    
                    $('#modalEditarActividad #precio-actividad-editar').val((parseInt(response.actividad.precio) > 0) ? response.actividad.precio : '');

                    $('#modalEditarActividad #lugar-actividad-editar').val(response.actividad.lugar);
                    $('#modalEditarActividad #duracion-actividad-editar').val(response.actividad.duracion);

                    $('#modalEditarActividad #categoria-actividad-editar').empty();
                    response.tiposActividades.map(function(tipo){

                        $('#modalEditarActividad #categoria-actividad-editar').append($('<option>', {value: tipo.id_tipos_actividades, text: tipo.nombre}));

                    })
                    $('#modalEditarActividad #categoria-actividad-editar').val(response.actividad.tipo_actividad);

                    $('#estado-actividad-editar').empty();
                    const estados = ['activa', 'cancelada', 'finalizada', 'proximamente'];

                    estados.map(function(estado){
                        $('#estado-actividad-editar').append($('<option>', {value: estado, text: estado}));
                    })
                    $('#estado-actividad-editar').val(response.actividad.estado)

                    if(parseInt(response.actividad.nombre_usuario) === 1) $('#modalInformacionUsuarioActividad .nombre-usuario').prop('checked', true);
                    if(parseInt(response.actividad.apellidos_usuario) === 1) $('#modalInformacionUsuarioActividad .apellidos-usuario').prop('checked', true);
                    if(parseInt(response.actividad.fecha_nacimiento_usuario) === 1){ 
                        $('#modalInformacionUsuarioActividad .fecha-nacimiento-usuario').prop('checked', true);
                        $('#modalInformacionUsuarioActividad #edad-min-usuario').val(parseInt(response.actividad.edad_minima_usuario)).prop('disabled', false);
                        $('#modalInformacionUsuarioActividad label[for="edad-min-usuario"]').css('color', '#212529')
                    }
                    if(parseInt(response.actividad.dni_usuario) === 1) $('#modalInformacionUsuarioActividad .dni-nie-usuario').prop('checked', true);
                    if(parseInt(response.actividad.email_usuario) === 1) $('#modalInformacionUsuarioActividad .email-usuario').prop('checked', true);
                    if(parseInt(response.actividad.telefono_usuario) === 1) $('#modalInformacionUsuarioActividad .telefono-usuario').prop('checked', true);
                    if(parseInt(response.actividad.direccion_usuario) === 1) $('#modalInformacionUsuarioActividad .direccion-usuario').prop('checked', true);

                    $('#modalEditarActividad').modal('show');
                }
            }
        });
    })

    $('.toggle-switch input.precio-editar').on('change', function (event) {

        event.preventDefault();

        let isChecked = $(this).is(':checked'); // --> Comprobamos si esta seleccionado

        // En el caso de que esté seleccionado, borramos el atributo readonly para poder añadir un valor) y ponemos el color del texto del input en negro. Además le añadimos el foco
        if (isChecked) {
            $('#precio-actividad-editar').removeAttr('readonly').css('color', 'black').focus(); 
        }
        // Si no está seleccionado,  
        else {
           $('#precio-actividad-editar').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
        }
    })

    $('.toggle-switch input.aforo-editar').on('change', function (event) {

        event.preventDefault();

        let isChecked = $(this).is(':checked'); // --> Comprobamos si esta seleccionado

        // En el caso de que esté seleccionado, borramos el atributo readonly para poder añadir un valor) y ponemos el color del texto del input en negro. Además le añadimos el foco
        if (isChecked) {
            $('#aforo-actividad-editar').removeAttr('readonly').css('color', 'black').focus(); 
        }
        // Si no está seleccionado,  
        else {
           $('#aforo-actividad-editar').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
        }
    })

    $(document).on('click', '#btn-guardar-editar-actividad', function(e){

        e.preventDefault();
        let errores = [];

        let idActividad = $('#modalEditarActividad #id-actividad').val();
        let nombre = $('#nombre-actividad-editar').val();
        let categoria = $('#categoria-actividad-editar').val();
        let descripcion = $('#descripcion-actividad-editar').val();
        let fecha = $('#fecha-actividad-editar').val();
        let hora = $('#hora-actividad-editar').val();
        let fechaLimite = $('#fecha-limite-actividad-editar').val();
        let horaLimite = $('#hora-limite-actividad-editar').val();
        let tieneAforo = $('.toggle-switch .aforo-editar').is(':checked');
        let aforo = tieneAforo ? $('#aforo-actividad-editar').val() : null;
        let tienePrecio = $('.toggle-switch .precio-editar').is(':checked');
        let precio = tienePrecio ? $('#precio-actividad-editar').val() : null;
        let lugar = $('#lugar-actividad-editar').val();
        let duracion = $('#duracion-actividad-editar').val();
        let imagen = $('#modalEditarActividad .imagenes')[0].files[0];
        let estado = $('#estado-actividad-editar').val();

        let nombreUsuario = $('#modalInformacionUsuarioActividad .nombre-usuario').is(':checked');
        let apellidosUsuario = $('#modalInformacionUsuarioActividad .apellidos-usuario').is(':checked');
        let fechaNacimientoUsuario = $('#modalInformacionUsuarioActividad .fecha-nacimiento-usuario').is(':checked');
        let edadMinimaUsuario = fechaNacimientoUsuario ? $('#modalInformacionUsuarioActividad #edad-min-usuario').val() : null;
        let dniUsuario = $('#modalInformacionUsuarioActividad .dni-nie-usuario').is(':checked');
        let emailUsuario = $('#modalInformacionUsuarioActividad .email-usuario').is(':checked');
        let telefonoUsuario = $('#modalInformacionUsuarioActividad .telefono-usuario').is(':checked');
        let direccionUsuario = $('#modalInformacionUsuarioActividad .direccion-usuario').is(':checked');


        if(nombre === '') {
            errores.push({campo: 'nombre', mensaje: 'El nombre de la actividad no puede estar vacío'})
        }

        if(parseInt(categoria) === -1 ) {
            errores.push({campo: 'categoría', mensaje: "Debe seleccionar una categoría"})
        }

        if(descripcion === '') {
            errores.push({campo: 'descripción', mensaje: "La descripción de la actividad no puede estar vacío"})
        }

        if(fecha === '') {
            errores.push({campo: 'fecha', mensaje: "Debe seleccionar una fecha para la actividad"})
        }

        if(hora === '') {
            errores.push({campo: 'hora', mensaje: "Debe seleccionar una hora para la actividad"})
        }

        if(fechaLimite === '') {
            errores.push({campo: 'fecha límite', mensaje: "Debe seleccionar una fecha límite de inscripción"})
        }

        if(toDate(parseFechaES(fecha)) <= toDate(parseFechaES(fechaLimite))){
            errores.push({campo: 'fecha límite', mensaje: "La fecha límite debe ser menor que la fecha de la actividad"})
        }

        const hoy = new Date().toISOString().split('T')[0]; 
        if(toDate(parseFechaES(fecha)) <= toDate(parseFechaES(hoy))){
            errores.push({campo: 'fecha', mensaje: "No puede seleccionar una fecha pasada"})
        }

        if(toDate(parseFechaES(fechaLimite)) <= toDate(parseFechaES(hoy))){
            errores.push({campo: 'fecha límite', mensaje: "No puede seleccionar una fecha pasada"})
        }

        if(horaLimite === '') {
            errores.push({campo: 'hora límite', mensaje: "Debe seleccionar una hora límite de inscripción"})
        }

        if(tieneAforo &&  (aforo === '' || parseFloat(aforo) === 0)) {
            errores.push({campo: 'aforo', mensaje: "Debe seleccionar un aforo para la actividad"})
        }

        if(tienePrecio && (precio === '' || parseFloat(precio) === 0)) {
            errores.push({campo: 'precio', mensaje: "Debe seleccionar un precio para la actividad"})
        }

        if(lugar === '') {
            errores.push({campo: 'lugar', mensaje: "Debe introducir el lugar de la actividad"})
        }

        if(duracion === '') {
            errores.push({campo: 'duracion', mensaje: "Debe seleccionar la duración de la actividad"})
        }

        if(parseInt(estado) === -1 ) {
            errores.push({campo: 'estado', mensaje: "Debe seleccionar debe seleccionar un estado de los indicados"})
        }


        if(errores.length > 0) {

            $('#modalEditarActividad .alert-errores-editar-actividad .errores ul').empty()

            errores.map(e => {
                $('#modalEditarActividad .alert-errores-editar-actividad .errores ul').append(`<li>${e.mensaje}</li>`)
            })

            $('#modalEditarActividad .contenedor-alert-editar-actividad').removeClass('d-none');
            $('#modalEditarActividad .alert-errores-editar-actividad').show();
        }
        else {

            let formData = new FormData();
            formData.append('idActividad', idActividad);
            formData.append('nombre', nombre);
            formData.append('categoria', categoria);
            formData.append('descripcion', descripcion);
            formData.append('fecha', fecha);
            formData.append('hora', hora);
            formData.append('fechaLimite', fechaLimite);
            formData.append('horaLimite', horaLimite);
            formData.append('tieneAforo', tieneAforo);
            formData.append('aforo', aforo);
            formData.append('tienePrecio', tienePrecio);
            formData.append('precio', precio);
            formData.append('lugar', lugar);
            formData.append('duracion', duracion);
            formData.append('imagen', imagen);
            formData.append('estado', estado);
            formData.append('nombre_usuario', nombreUsuario);
            formData.append('apellidos_usuario', apellidosUsuario);
            formData.append('fecha_nacimiento_usuario', fechaNacimientoUsuario);
            formData.append('edad_minima_usuario', edadMinimaUsuario);
            formData.append('dni_usuario', dniUsuario);
            formData.append('email_usuario', emailUsuario);
            formData.append('telefono_usuario', telefonoUsuario);
            formData.append('direccion_usuario', direccionUsuario);

            $.ajax({
                type: "POST",
                url: `${BASE_URL}index.php/editarActividad`,
                data: formData,
                processData: false,
                contentType: false,
                dataType: "JSON",
                success: function (response) {
                    
                    if(response.success == true) {
                    
                        // response.actividades.map(function(actividad){
                        //     $('.actividades .grid-actividades').append(`
                        //     <div class="card-actividad" data-index="${actividad.id_actividades}">
                        //         <div class="card-actividad-img">
                        //             <img src="${BASE_URL}images/${actividad.imagen}" alt="${actividad.nombre}">
                        //             <span class="card-actividad-badge" style="background-color: #32cccc">${actividad.categoria_actividad}</span>

                        //             ${(parseInt($('#rol_usuario').val()) === 2) ? `
                        //                 <div class="dropdown card-actividad-admin-menu">
                        //                     <button class="btn btn-sm card-actividad-admin-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        //                         <i class="bi bi-three-dots-vertical"></i>
                        //                     </button>
                        //                     <ul class="dropdown-menu dropdown-menu-end">
                        //                         <li><a class="dropdown-item btn-editar-actividad" href="#" onclick=""><i class="bi bi-pencil me-2"></i>Editar</a></li>
                        //                         <li><a class="dropdown-item btn-inscritos-actividad" href="#" onclick="verInscritos"><i class="bi bi-people me-2"></i>Ver inscritos</a></li>
                        //                         <li><hr class="dropdown-divider"></li>
                        //                         <li><a class="dropdown-item text-danger btn-borrar-actividad" href="#" onclick=""><i class="bi bi-trash me-2"></i>Eliminar</a></li>
                        //                     </ul>
                        //                 </div>
                        //             ` : ''}
                        //         </div>
                        //         <div class="card-actividad-body">
                        //             <p class="card-actividad-titulo">${actividad.nombre}</p>
                        //             <p class="card-actividad-desc">${actividad.descripcion}</p>
                        //             <div class="card-actividad-meta">
                        //                 <div><i class="bi bi-calendar"></i> ${parseFechaES(actividad.fecha_actividad)}, ${actividad.hora_actividad}</div>
                        //                 <div><i class="bi bi-geo-alt"></i> ${actividad.lugar}</div>
                        //                 ${(parseInt(actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${actividad.plazas_ocupadas} / ${actividad.aforo} plazas</div>` : ''}
                        //             </div>
                        //             <div class="card-actividad-footer">
                        //                 <span class="card-actividad-precio">${(actividad.tiene_precio) ? actividad.precio+'€' : 'Gratis'}</span>
                        //                 <button class="btn btn-outline-primary">Ver más</button>
                        //             </div>
                        //         </div>
                        //     </div>
                        //     `)
                        // })

                        if(parseInt(response.actividad.nombre_usuario) === 1) $('#modalInformacionUsuarioActividad .nombre-usuario').prop('checked', true);
                        if(parseInt(response.actividad.apellidos_usuario) === 1) $('#modalInformacionUsuarioActividad .apellidos-usuario').prop('checked', true);
                        if(parseInt(response.actividad.fecha_nacimiento_usuario) === 1){ 
                            $('#modalInformacionUsuarioActividad .fecha-nacimiento-usuario').prop('checked', true);
                            $('#modalInformacionUsuarioActividad #edad-min-usuario').val(parseInt(response.actividad.edad_minima_usuario)).prop('disabled', false);
                            $('#modalInformacionUsuarioActividad label[for="edad-min-usuario"]').css('color', '#212529')
                        }
                        if(parseInt(response.actividad.dni_usuario) === 1) $('#modalInformacionUsuarioActividad .dni-nie-usuario').prop('checked', true);
                        if(parseInt(response.actividad.email_usuario) === 1) $('#modalInformacionUsuarioActividad .email-usuario').prop('checked', true);
                        if(parseInt(response.actividad.telefono_usuario) === 1) $('#modalInformacionUsuarioActividad .telefono-usuario').prop('checked', true);
                        if(parseInt(response.actividad.direccion_usuario) === 1) $('#modalInformacionUsuarioActividad .direccion-usuario').prop('checked', true);

                        $(`.grid-actividades .card-actividad[data-index="${response.actividad.id_actividades}"]`).replaceWith(
                            `
                                <div class="card-actividad" data-index="${response.actividad.id_actividades}">
                                    <div class="card-actividad-img">
                                        <img src="${BASE_URL}images/${response.actividad.imagen}" alt="${response.actividad.nombre}">
                                        <span class="card-actividad-badge" style="background-color: #32cccc">${response.actividad.categoria_actividad}</span>

                                        ${(parseInt($('#rol_usuario').val()) === 2) ? `
                                            <div class="dropdown card-actividad-admin-menu">
                                                <button class="btn btn-sm card-actividad-admin-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item btn-editar-actividad" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                                                    <li><a class="dropdown-item btn-inscritos-actividad" href="#"><i class="bi bi-people me-2"></i>Ver inscritos</a></li>
                                                    ${(response.actividad.estado !== 'finalizada') ? `
                                                            <li><hr class="dropdown-divider"></li>
                                                            ${(response.actividad.estado !== 'cancelada')
                                                                ? `<li><a class="dropdown-item btn-reactivar-actividad" href="#"><i class="bi bi-arrow-clockwise me-2"></i>Reactivar</a></li>`
                                                                : `<li><a class="dropdown-item text-danger btn-borrar-actividad" href="#"><i class="bi bi-x-lg me-2"></i>Cancelar</a></li>`
                                                            }
                                                        ` : ''
                                                    }
                                                    
                                                </ul>
                                            </div>
                                        ` : ''}
                                    </div>
                                    <div class="card-actividad-body">
                                        <p class="card-actividad-titulo">${response.actividad.nombre}</p>
                                        <p class="card-actividad-desc">${response.actividad.descripcion}</p>
                                        <div class="card-actividad-meta">
                                            <div><i class="bi bi-calendar"></i> ${parseFechaES(response.actividad.fecha_actividad)}, ${response.actividad.hora_actividad}</div>
                                            <div><i class="bi bi-geo-alt"></i> ${response.actividad.lugar}</div>
                                            ${(parseInt(response.actividad.tiene_aforo) === 1) 
    ? `<div><i class="bi bi-people"></i> ${response.actividad.plazas_ocupadas} / ${response.actividad.aforo} plazas</div>` 
    : `<div><i class="bi bi-people"></i> ${response.actividad.plazas_ocupadas} inscritos</div>`}
                                        </div>
                                        <div class="card-actividad-footer">
                                            <span class="card-actividad-precio">${(parseInt(response.actividad.tiene_precio) === 1) ? response.actividad.precio+'€' : 'Gratis'}</span>
                                            <a class="btn btn-outline-actividad" href="${BASE_URL}index.php/actividad/${response.actividad.id_actividades}">Ver más</a>
                                        </div>
                                    </div>
                                </div>
                            `
                        );

                        $('#modalEditarActividad').modal('hide');
                        
                    }
                }
            });
        }

    })

    $(document).on('click', '.btn-borrar-actividad', function(e){

        e.preventDefault();
        let idActividad = $(this).closest('.card-actividad').data('index');

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getDataActividad`,
            data: {idActividad: idActividad},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {
                    
                    $('#modalCancelarActividad #id-actividad').val(idActividad);
                    
                    const ocupadas = parseInt(response.actividad.plazas_ocupadas);
                    const tieneAforo = parseInt(response.actividad.tiene_aforo) === 1;
                    const tienePrecio = parseInt(response.actividad.tiene_precio) === 1;

                    $('#baja-nombre').text(response.actividad.nombre);
                    $('#baja-fecha').text(parseFechaES(response.actividad.fecha_actividad))
                    $('#baja-salida').text(formatearHora(response.actividad.hora_actividad))
                    $('#baja-duracion').text(formatearHora(response.actividad.duracion)+'h')
                    $('#baja-lugar').text(response.actividad.lugar)
                    $('#baja-inscritos').text(ocupadas + (tieneAforo ? '/' + response.actividad.aforo : ''));
                    $('#precio-datos-inscripcion').text('Precio: '+((tienePrecio)?response.actividad.precio+'€' : 'Gratis') + ' · ' + 'Inscripción hasta el ' + parseFechaES(response.actividad.fecha_limite) + ' a las ' + formatearHora(response.actividad.hora_limite));

                    $('#modalCancelarActividad').modal('show');
                }
            }
        });

    })

    $(document).on('click', '#btn-guardar-baja-actividad', function(e){

        e.preventDefault();
        let idActividad =  $('#modalCancelarActividad #id-actividad').val();

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/darBajaActividad`,
            data: {idActividad: idActividad},
            dataType: "JSON",
            success: function (response) {
                
                console.log(response)
                
                if(response.success == true) {

                    const estado = response.actividad.estado;
                    const estaCancelada = estado === 'cancelada';
                    const estaFinalizada = estado === 'finalizada';
                    const estaInactiva = estaCancelada || estaFinalizada;


                   $(`.grid-actividades .card-actividad[data-index="${response.actividad.id_actividades}"]`).replaceWith(
                        `
                            <div class="card-actividad" data-index="${response.actividad.id_actividades}">
                                <div class="card-actividad-img">
                                    <img src="${BASE_URL}images/${response.actividad.imagen}" alt="${response.actividad.nombre}" class="${estaInactiva ? 'grayscale-img' : ''}">
                                    <span class="card-actividad-badge" style="background-color: ${estaInactiva ? '#adb5bd' : '#32cccc'}">${response.actividad.categoria_actividad}</span>

                                    ${(parseInt($('#rol_usuario').val()) === 2) ? `
                                        <div class="dropdown card-actividad-admin-menu">
                                            <button class="btn btn-sm card-actividad-admin-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="bi bi-three-dots-vertical"></i>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end">
                                                <li><a class="dropdown-item btn-editar-actividad" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                                                <li><a class="dropdown-item btn-inscritos-actividad" href="#"><i class="bi bi-people me-2"></i>Ver inscritos</a></li>
                                                ${(!estaFinalizada) ? `
                                                        <li><hr class="dropdown-divider"></li>
                                                        ${estaCancelada
                                                            ? `<li><a class="dropdown-item btn-reactivar-actividad" href="#"><i class="bi bi-arrow-clockwise me-2"></i>Reactivar</a></li>`
                                                            : `<li><a class="dropdown-item text-danger btn-borrar-actividad" href="#"><i class="bi bi-x-lg me-2"></i>Cancelar</a></li>`
                                                        }
                                                    ` : ''
                                                }
                                                
                                            </ul>
                                        </div>
                                    ` : ''}
                                </div>
                                <div class="card-actividad-body">
                                    <p class="card-actividad-titulo">${response.actividad.nombre}</p>
                                    <p class="card-actividad-desc">${response.actividad.descripcion}</p>
                                    <div class="card-actividad-meta">
                                        <div><i class="bi bi-calendar"></i> ${parseFechaES(response.actividad.fecha_actividad)}, ${response.actividad.hora_actividad}</div>
                                        <div><i class="bi bi-geo-alt"></i> ${response.actividad.lugar}</div>
                                        ${(parseInt(response.actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${response.actividad.plazas_ocupadas} / ${response.actividad.aforo} plazas</div>` : `<div><i class="bi bi-people"></i> ${response.actividad.plazas_ocupadas} inscritos</div>`}
                                    </div>
                                    <div class="card-actividad-footer">
                                        <span class="card-actividad-precio">${(parseInt(response.actividad.tiene_precio) === 1) ? response.actividad.precio+'€' : 'Gratis'}</span>
                                        <a class="btn btn-outline-actividad" href="${BASE_URL}index.php/actividad/${response.actividad.id_actividades}" ${estaInactiva ? 'disabled' : ''}>${estaCancelada ? 'Cancelada' : estaFinalizada ? 'Finalizada' : 'Ver más'}</a>
                                    </div>
                                </div>
                            </div>
                        `
                    );
                    
                    $('#modalCancelarActividad').modal('hide');
                }
            },             
            error: function (xhr, status, error) {
                console.error('Error AJAX:', status, error);
                console.error('Respuesta cruda:', xhr.responseText);
            }
        });

    })

    $(document).on('click', '.btn-reactivar-actividad', function(e){

        e.preventDefault();
        let idActividad = $(this).closest('.card-actividad').data('index');

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/darAltaActividad`,
            data: {idActividad: idActividad},
            dataType: "JSON",
            success: function (response) {

                
                
                if(response.success == true) {

                    const estado = response.actividad.estado;
                    const estaCancelada = estado === 'cancelada';
                    const estaFinalizada = estado === 'finalizada';
                    const estaInactiva = estaCancelada || estaFinalizada;


                   $(`.grid-actividades .card-actividad[data-index="${response.actividad.id_actividades}"]`).replaceWith(
                        `
                            <div class="card-actividad" data-index="${response.actividad.id_actividades}">
                                <div class="card-actividad-img">
                                    <img src="${BASE_URL}images/${response.actividad.imagen}" alt="${response.actividad.nombre}" class="${estaInactiva ? 'grayscale-img' : ''}">
                                    <span class="card-actividad-badge" style="background-color: ${estaInactiva ? '#adb5bd' : '#32cccc'}">${response.actividad.categoria_actividad}</span>

                                    ${(parseInt($('#rol_usuario').val()) === 2) ? `
                                        <div class="dropdown card-actividad-admin-menu">
                                            <button class="btn btn-sm card-actividad-admin-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="bi bi-three-dots-vertical"></i>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end">
                                                <li><a class="dropdown-item btn-editar-actividad" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                                                <li><a class="dropdown-item btn-inscritos-actividad" href="#"><i class="bi bi-people me-2"></i>Ver inscritos</a></li>
                                                ${(!estaFinalizada) ? `
                                                        <li><hr class="dropdown-divider"></li>
                                                        ${estaCancelada
                                                            ? `<li><a class="dropdown-item btn-reactivar-actividad" href="#"><i class="bi bi-arrow-clockwise me-2"></i>Reactivar</a></li>`
                                                            : `<li><a class="dropdown-item text-danger btn-borrar-actividad" href="#"><i class="bi bi-x-lg me-2"></i>Cancelar</a></li>`
                                                        }
                                                    ` : ''
                                                }
                                                
                                            </ul>
                                        </div>
                                    ` : ''}
                                </div>
                                <div class="card-actividad-body">
                                    <p class="card-actividad-titulo">${response.actividad.nombre}</p>
                                    <p class="card-actividad-desc">${response.actividad.descripcion}</p>
                                    <div class="card-actividad-meta">
                                        <div><i class="bi bi-calendar"></i> ${parseFechaES(response.actividad.fecha_actividad)}, ${response.actividad.hora_actividad}</div>
                                        <div><i class="bi bi-geo-alt"></i> ${response.actividad.lugar}</div>
                                        ${(parseInt(response.actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${response.actividad.plazas_ocupadas} / ${response.actividad.aforo} plazas</div>` : `<div><i class="bi bi-people"></i> ${response.actividad.plazas_ocupadas} inscritos</div>`}
                                    </div>
                                    <div class="card-actividad-footer">
                                        <span class="card-actividad-precio">${(parseInt(response.actividad.tiene_precio) === 1) ? response.actividad.precio+'€' : 'Gratis'}</span>
                                        <a class="btn btn-outline-actividad" href="${BASE_URL}index.php/actividad/${response.actividad.id_actividades}" ${estaInactiva ? 'disabled' : ''}>${estaCancelada ? 'Cancelada' : estaFinalizada ? 'Finalizada' : 'Ver más'}</a>
                                    </div>
                                </div>
                            </div>
                        `
                    );
                }
            }, 
            error: function (xhr, status, error) {
                console.error('Error AJAX:', status, error);
                console.error('Respuesta cruda:', xhr.responseText);
            }
        });
    })

    $(document).on('click', '#btn-restar-plaza', function(e){
        
        e.preventDefault();

        let plazasSeleccionadas = parseInt($('#num-plazas').val());
        let numTotal = plazasSeleccionadas 
        let precio = $('#precio-actividad').val();

        let nombre     = $('.paginaActividad .informacion-adicional').data('nombre');
        let apellidos  = $('.paginaActividad .informacion-adicional').data('apellidos');
        let fecha      = $('.paginaActividad .informacion-adicional').data('fecha');
        let dni        = $('.paginaActividad .informacion-adicional').data('dni');
        let email      = $('.paginaActividad .informacion-adicional').data('email');
        let telefono   = $('.paginaActividad .informacion-adicional').data('telefono');
        let direccion  = $('.paginaActividad .informacion-adicional').data('direccion');
        let edad       = $('.paginaActividad .informacion-adicional').data('edad');
        

        if(plazasSeleccionadas > 1) {

            numTotal = parseInt(plazasSeleccionadas-1)
            $('#num-plazas').val(numTotal);

            $('.paginaActividad .informacion-adicional #contenedor-personas').empty()
            for (let i = 1; i <= numTotal; i++) {

                let articulo = crearInputsInfoAdicional(nombre, apellidos, fecha, edad, dni, email, telefono, direccion, i);
                $('.paginaActividad .informacion-adicional #contenedor-personas').append(articulo);
            }
        }

        if(precio !== '') {
            $('#precio-total-ver-actividad strong').text(numTotal*parseInt(precio)+'€')
        }
    })

    $(document).on('click', '#btn-sumar-plaza', function(e){
        
        e.preventDefault();

        let plazasSeleccionadas = parseInt($('#num-plazas').val());
        let aforo = $('#num-aforo-actividad').val();
        let numTotal = plazasSeleccionadas 
        let precio = $('#precio-actividad').val();

        let nombre     = $('.paginaActividad .informacion-adicional').data('nombre');
        let apellidos  = $('.paginaActividad .informacion-adicional').data('apellidos');
        let fecha      = $('.paginaActividad .informacion-adicional').data('fecha');
        let dni        = $('.paginaActividad .informacion-adicional').data('dni');
        let email      = $('.paginaActividad .informacion-adicional').data('email');
        let telefono   = $('.paginaActividad .informacion-adicional').data('telefono');
        let direccion  = $('.paginaActividad .informacion-adicional').data('direccion');
        let edad       = $('.paginaActividad .informacion-adicional').data('edad');
        
        
        if(aforo !== ''){

            if(plazasSeleccionadas < parseInt(aforo)) {

                numTotal = parseInt(plazasSeleccionadas+1)
                $('#num-plazas').val(numTotal);

                $('.paginaActividad .informacion-adicional #contenedor-personas').empty()
                for (let i = 1; i <= numTotal; i++) {

                    let articulo = crearInputsInfoAdicional(nombre, apellidos, fecha, edad, dni, email, telefono, direccion, i);
                    $('.paginaActividad .informacion-adicional #contenedor-personas').append(articulo);
                }
            }
        }
        else {
            numTotal = parseInt(plazasSeleccionadas+1)
            $('#num-plazas').val(numTotal);

            $('.paginaActividad .informacion-adicional #contenedor-personas').empty()
            for (let i = 1; i <= numTotal; i++) {

                let articulo = crearInputsInfoAdicional(nombre, apellidos, fecha, edad, dni, email, telefono, direccion, i);
                $('.paginaActividad .informacion-adicional #contenedor-personas').append(articulo);
            }
        }

        if(precio !== '') {
            $('#precio-total-ver-actividad strong').text(numTotal*parseInt(precio)+'€')
        }
    })

    $(document).on('input', '#num-plazas', function(e){

        e.preventDefault();
        let numeroReservas = parseInt($('#num-plazas').val());
        let aforo = $('#num-aforo-actividad').val();
        let precio = $('#precio-actividad').val();
        let usuario = $('#usuarios-reserva-actividad').val();

        let nombre     = $('.paginaActividad .informacion-adicional').data('nombre');
        let apellidos  = $('.paginaActividad .informacion-adicional').data('apellidos');
        let fecha      = $('.paginaActividad .informacion-adicional').data('fecha');
        let dni        = $('.paginaActividad .informacion-adicional').data('dni');
        let email      = $('.paginaActividad .informacion-adicional').data('email');
        let telefono   = $('.paginaActividad .informacion-adicional').data('telefono');
        let direccion  = $('.paginaActividad .informacion-adicional').data('direccion');
        let edad       = $('.paginaActividad .informacion-adicional').data('edad');
        
        let inputsVacios = 0;
        let inputsInfoAdicional = $('.paginaActividad .informacion-adicional #contenedor-personas input')

        inputsInfoAdicional.map(function(){

            let input = $(this);

            if (input.val() === '') {
                inputsVacios++;
                input.addClass('is-invalid');
            } else {
                input.removeClass('is-invalid');
            }
        })

        if(parseInt(numeroReservas) < 1 || isNaN(numeroReservas)) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(aforo !== '' && parseInt(numeroReservas) > parseInt(aforo) ) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(parseInt(usuario) === -1) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(inputsVacios > 0) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else {
            $('#btn-reservar-plaza-actividad').prop('disabled', false);

            $('.paginaActividad .informacion-adicional #contenedor-personas').empty()
            for (let i = 1; i <= numeroReservas; i++) {

                let articulo = crearInputsInfoAdicional(nombre, apellidos, fecha, edad, dni, email, telefono, direccion, i);
                $('.paginaActividad .informacion-adicional #contenedor-personas').append(articulo);
            }
            
            if(parseFloat(precio) > 0 && !isNaN(parseFloat(precio))){
                $('#precio-total-ver-actividad strong').text(numeroReservas*parseInt(precio)+'€')
            }
        }
    })

    $(document).on('input', '.paginaActividad .informacion-adicional #contenedor-personas input', function(e){

        e.preventDefault();
        let numeroReservas = parseInt($('#num-plazas').val());
        let aforo = $('#num-aforo-actividad').val();
        let precio = $('#precio-actividad').val();
        let usuario = $('#usuarios-reserva-actividad').val();

        let nombre     = $('.paginaActividad .informacion-adicional').data('nombre');
        let apellidos  = $('.paginaActividad .informacion-adicional').data('apellidos');
        let fecha      = $('.paginaActividad .informacion-adicional').data('fecha');
        let dni        = $('.paginaActividad .informacion-adicional').data('dni');
        let email      = $('.paginaActividad .informacion-adicional').data('email');
        let telefono   = $('.paginaActividad .informacion-adicional').data('telefono');
        let direccion  = $('.paginaActividad .informacion-adicional').data('direccion');
        let edad       = $('.paginaActividad .informacion-adicional').data('edad');
        
        let inputsVacios = 0;
        let inputsInfoAdicional = $('.paginaActividad .informacion-adicional #contenedor-personas input')

        inputsInfoAdicional.map(function(){

            let input = $(this);

            if (input.val() === '') {
                inputsVacios++;
                input.addClass('is-invalid');
            } else {
                input.removeClass('is-invalid');
            }
        })

        if(parseInt(numeroReservas) < 1 || isNaN(numeroReservas)) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(aforo !== '' && parseInt(numeroReservas) > parseInt(aforo) ) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(parseInt(usuario) === -1) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(inputsVacios > 0) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else {
            $('#btn-reservar-plaza-actividad').prop('disabled', false);

            
        }
    })

    $(document).on('change', '#usuarios-reserva-actividad', function(e){

        e.preventDefault();
        let usuario = $(this).val();
        let numeroReservas = parseInt($('#num-plazas').val());
        let aforo = $('#num-aforo-actividad').val();
        let precio = $('#precio-actividad').val();

        let nombre     = $('.paginaActividad .informacion-adicional').data('nombre');
        let apellidos  = $('.paginaActividad .informacion-adicional').data('apellidos');
        let fecha      = $('.paginaActividad .informacion-adicional').data('fecha');
        let dni        = $('.paginaActividad .informacion-adicional').data('dni');
        let email      = $('.paginaActividad .informacion-adicional').data('email');
        let telefono   = $('.paginaActividad .informacion-adicional').data('telefono');
        let direccion  = $('.paginaActividad .informacion-adicional').data('direccion');
        let edad       = $('.paginaActividad .informacion-adicional').data('edad');
        
        let inputsVacios = 0;
        let inputsInfoAdicional = $('.paginaActividad .informacion-adicional #contenedor-personas input')

        inputsInfoAdicional.map(function(){

            let input = $(this);

            if (input.val() === '') {
                inputsVacios++;
                input.addClass('is-invalid');
            } else {
                input.removeClass('is-invalid');
            }
        })

        if(parseInt(usuario) === -1) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(parseInt(numeroReservas) < 1 || isNaN(numeroReservas)) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(aforo !== '' && parseInt(numeroReservas) > parseInt(aforo) ) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(inputsVacios > 0) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else {
            $('#btn-reservar-plaza-actividad').prop('disabled', false);
            
            if(parseFloat(precio) > 0 && !isNaN(parseFloat(precio))){
                $('#precio-total-ver-actividad strong').text(numeroReservas*parseInt(precio)+'€')
            }
        }
    })

    $(document).on('click', '#btn-reservar-plaza-actividad', function(e){

        e.preventDefault();

        const regexDniNie = /^(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z])$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexTelefono = /^[6789]\d{8}$/;

        let numeroReservas = parseInt($('#num-plazas').val());
        let aforo = $('#num-aforo-actividad').val();
        let precioTotal = $('#precio-total-ver-actividad strong').text()
        let precio = $('#precio-actividad').val()
        let rolUsuario = $('#rol_usuario').val();
        let actividad = parseInt($('#id-actividad').val());
        let idUsuario = (parseInt(rolUsuario) === 2) ? parseInt($('#usuarios-reserva-actividad').val()) : parseInt($('#id_usuario').val())

        let errores = [];

        let inputsVacios = 0;
        let inputsInfoAdicional = $('.paginaActividad .informacion-adicional #contenedor-personas input')

        let nombre     = $('.paginaActividad .informacion-adicional').data('nombre');
        let apellidos  = $('.paginaActividad .informacion-adicional').data('apellidos');
        let fecha      = $('.paginaActividad .informacion-adicional').data('fecha');
        let dni        = $('.paginaActividad .informacion-adicional').data('dni');
        let email      = $('.paginaActividad .informacion-adicional').data('email');
        let telefono   = $('.paginaActividad .informacion-adicional').data('telefono');
        let direccion  = $('.paginaActividad .informacion-adicional').data('direccion');
        let edad       = $('.paginaActividad .informacion-adicional').data('edad');

        let personas = [];

        inputsInfoAdicional.map(function(){

            let input = $(this);

            if (input.val() === '') {
                inputsVacios++;
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

        if(numeroReservas < 1 || isNaN(numeroReservas)) {
            errores.push({campo: 'plazas', mensaje: 'Para reservar debe seleccionar al menos una plaza'})
        }

        if(!isNaN(parseInt(aforo)) && numeroReservas > parseInt(aforo)) {
            errores.push({campo: 'plazas', mensaje: `No puede superar el número máximo de plazas (${aforo} personas)`})
        }

        if((rolUsuario !== '' && parseInt(rolUsuario) === 2) && parseInt(idUsuario) === -1) {
            errores.push({campo: 'usuario', mensaje: 'Debe seleccionar a un usuario para la reserva'})
        }

        if(inputsVacios > 0) {
            errores.push({campo: 'información', mensaje: 'Debe rellenar toda la información solicitada'})
        }



        console.log(BASE_URL)

        if(errores.length === 0) {

            $('.paginaActividad .informacion-adicional #contenedor-personas article').map(function(){
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
                url: `${BASE_URL}index.php/reservaActividad`,
                data: {plazas: numeroReservas, usuario: idUsuario, actividad: actividad, personas: personas},
                dataType: "JSON",
                success: function (response) {
                    
                    if(response.success == false) {
                        errores.push({campo: 'plazas', mensaje: `Se ha superado el numero de plazas disponibles`})

                        $('.paginaActividad .alert-errores-reservar-actividad .errores ul').empty()

                        errores.map(e => {
                            $('.paginaActividad .alert-errores-reservar-actividad .errores ul').append(`<li>${e.mensaje}</li>`)
                        })

                        $('.paginaActividad .contenedor-alert-reserva-actividad').removeClass('d-none');
                        $('.paginaActividad .alert-errores-reservar-actividad').show();
                    }
                    else {
                        window.location.href = `${BASE_URL}index.php/descargarTicketActividad/${parseInt(response.pedido)}`;
                        $('.paginaActividad .contenedor-alert-reserva-actividad-2').removeClass('d-none');
                        $('.paginaActividad .alert-reserva-actividad-completada').show();
                        
                         $('.paginaActividad .informacion-adicional #contenedor-personas').empty()
                        
                        let articulo = crearInputsInfoAdicional(nombre, apellidos, fecha, edad, dni, email, telefono, direccion, 1);
                        $('.paginaActividad .informacion-adicional #contenedor-personas').append(articulo);
                        
                        setTimeout(function() {
                            $('.paginaActividad .contenedor-alert-reserva-actividad-2').addClass('d-none');
                            $('.paginaActividad .alert-reserva-actividad-completada').hide();
                        }, 3000);
                    }

                    $('#num-plazas').val(1)
                    $('#rol_usuario').val('-1')
                    $('#precio-total-ver-actividad strong').text((parseInt(response.actividad.tiene_precio) === 1) ? response.actividad.precio + "€" : 'Gratis')
                    if(parseInt(response.actividad.tiene_aforo) === 1) {
                        $('#num-aforo-actividad').val(parseInt(response.actividad.aforo) - parseInt(response.actividad.plazas_ocupadas));
                    }
                    $('.info-card.plazas .info-value').text(
                        response.actividad.plazas_ocupadas + ' ' + (parseInt(response.actividad.tiene_aforo) === 1 ? "/" + response.actividad.aforo : '')
                    );

                }
            });
        }else {
            
            $('.paginaActividad .alert-errores-reservar-actividad .errores ul').empty()

            errores.map(e => {
                $('.paginaActividad .alert-errores-reservar-actividad .errores ul').append(`<li>${e.mensaje}</li>`)
            })

            $('.paginaActividad .contenedor-alert-reserva-actividad').removeClass('d-none');
            $('.paginaActividad .alert-errores-reservar-actividad').show();

            setTimeout(function() {
                $('.paginaActividad .contenedor-alert-reserva-actividad').addClass('d-none');
                $('.paginaActividad .alert-errores-reservar-actividad').hide();
            }, 3000);
        }    
    })


    $(document).on('click', '.btn-inscritos-actividad', function(e){

        e.preventDefault();
        let actividad = $(this).closest('.card-actividad').data('index');

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/verInscritos`,
            data: {actividad: actividad},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#modalInscritosActividad table tbody').empty();

                    $('#modalInscritosActividad h5.modal-title span').text(response.actividad.nombre); 

                    let cont = 1;
                    response.inscritosActividad.map(function(inscrito){
                        $('#modalInscritosActividad table tbody').append(
                            `
                            <tr data-pedido='${inscrito.id_pedido}' data-actividad='${inscrito.id_actividad}' class="${(parseInt(inscrito.pagada) === 1) ? 'table-success' : '' }">
                                <td>${cont}</td>
                                <td>${inscrito.email}</td>
                                <td>${inscrito.telf}</td>
                                <td>${inscrito.plazas_reserva}</td>
                                
                                <td>${timestampAFechaES(inscrito.fecha_reserva)}</td>
                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-light rounded-circle dropdown-toggle-no-caret" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 32px; height: 32px; padding: 0; background-color: #ffffff00 !important">
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item ${(parseInt(inscrito.pagada) === 0 ? 'btn-pagar-inscrito' : 'btn-deshacer-pago-inscrito')}"  href="#" data-reserva="${inscrito.id_reserva_actividad}"><i class="${(parseInt(inscrito.pagada) === 0) ? 'bi bi-check2-square' : 'bi bi-x-square'}"></i> ${(parseInt(inscrito.pagada) === 0) ? 'Confirmar' : 'Deshacer confirmación'}</a></li>
                                            <li><a class="dropdown-item text-danger btn-anular-inscrito" href="#" data-reserva="${inscrito.id_reserva_actividad}"><i class="bi bi-trash3"></i> Anular</a></li>
                                            <li><a class="dropdown-item btn-editar-inscrito" href="#" data-reserva="${inscrito.id_reserva_actividad}"><i class="bi bi-pencil-square"></i> Editar</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            `
                        )

                        cont++;
                    })

                    $('#modalInscritosActividad').modal('show');
                }
            }
        });
    })

    $(document).on('click', '.btn-deshacer-pago-inscrito', function(e){

        e.preventDefault();
        let reserva = parseInt($(this).data('reserva'));
        let item = $(this); // <-- guardamos la referencia aquí

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/deshacerPagoActividad`,
            data: {reserva: reserva},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true){
                    $(`#modalInscritosActividad table tbody tr[data-reserva="${response.reserva.id_reserva_actividad}"]`).removeClass('table-success');
                    item
                        .removeClass('btn-deshacer-pago-inscrito')
                        .addClass('btn-pagar-inscrito')
                        .html(`<i class="bi bi-check2-square"></i> Confirmar`);
                }
            }
        });
    })

    $(document).on('click', '.btn-pagar-inscrito', function(e){

        e.preventDefault();
        let reserva = parseInt($(this).data('reserva'));
        let item = $(this); // <-- guardamos la referencia aquí

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/pagarActividad`,
            data: {reserva: reserva},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true){
                    $(`#modalInscritosActividad table tbody tr[data-reserva="${response.reserva.id_reserva_actividad}"]`).addClass('table-success');
                    item
                        .removeClass('btn-pagar-inscrito')
                        .addClass('btn-deshacer-pago-inscrito')
                        .html(`<i class="bi bi-x-square"></i> Deshacer confirmación`);
                }
            }
        });
    })

    $(document).on('click', '.btn-anular-inscrito', function(e){

        e.preventDefault();
        let pedido = parseInt($(this).closest('tr').data('pedido'))
        let actividad = parseInt($(this).closest('tr').data('actividad'))

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

                    $('#modalEliminarReservaActividad #id-reserva-eliminar').val(response.reservas[0]['id_reserva_actividad'])
                    $('#modalEliminarReservaActividad #nombre-actividad-eliminar-reserva').text(response.actividad[0].nombre);
                    $('#modalEliminarReservaActividad #fecha-eliminar-reserva').text(timestampAFechaES(response.reservas[0].fecha_reserva));
                    $('#modalEliminarReservaActividad #plazas-eliminar-reserva').text(response.reservas[0].plazas_reserva);

                    response.reservas.map(function(reserva, index){
                        
                        let cont = index + 1

                        article = crearInputsInfoAdicional(nombre, apellidos, fechaNacimiento, edadMinima, dni, email, telefono, direccion, cont, false, reserva["id_usuario"]);
                        $('#modalEliminarReservaActividad .contenedor-personas-anular-reserva').append(article);

                        if (nombre === 1) $('#nombre_' + cont).val(reserva['nombre_usuario']).prop('required', false).prop('readonly', true);
                        if (apellidos === 1) $('#apellidos_' + cont).val(reserva['apellidos_usuario']).prop('required', false).prop('readonly', true);
                        if (fechaNacimiento === 1) $('#fecha-nacimiento_' + cont).val(reserva['fecha_nacimiento_usuario']).prop('required', false).prop('readonly', true);
                        if (dni === 1) $('#dni_' + cont).val(reserva['dni_usuario']).prop('required', false).prop('readonly', true);
                        if (email === 1) $('#email_' + cont).val(reserva['email_usuario']).prop('required', false).prop('readonly', true);
                        if (telefono === 1) $('#telefono_' + cont).val(reserva['telefono_usuario']).prop('required', false).prop('readonly', true);
                        if (direccion === 1) $('#direccion_' + cont).val(reserva['direccion_usuario']).prop('required', false).prop('readonly', true);

                    })

                    $('#modalEliminarReservaActividad').attr('data-pedido', parseInt(response.pedido));
                    $('#modalEliminarReservaActividad').attr('data-actividad', parseInt(response.actividad['0']['id_actividades']));
                    $('#modalEliminarReservaActividad').modal('show');
                }
            }
        });

    })

    $(document).on('click', '#btn-guardar-eliminar-reserva-actividad', function(e){

        e.preventDefault();
        let pedido = $('#modalEliminarReservaActividad').data('pedido')
        let actividad = $('#modalEliminarReservaActividad').data('actividad');

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/eliminarReservaActividad`,
            data: {pedido: pedido, actividad: actividad},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true){

                    $(`#modalInscritosActividad table tbody tr[data-pedido="${pedido}"][data-actividad="${actividad}"]`).remove();
                    $(`.grid-actividades .card-actividad[data-index='${response.actividad}'] .card-actividad-meta`).children('div').eq(2).html((parseInt(response.data_actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${response.data_actividad.plazas_ocupadas} / ${response.data_actividad.aforo} plazas</div>` : `<div><i class="bi bi-people">${response.data_actividad.plazas_ocupadas} inscritos</div>`);
                    $('#modalEliminarReservaActividad').modal('hide');
                    $(`#modalInscritosActividad`).modal('hide');
                }
            }
        });
    })

    $(document).on('click', '.btn-editar-inscrito', function(e){

        e.preventDefault();
        // Cierra la edicion de cualquier otra fila que estuviera abierta

        let pedido = parseInt($(this).closest('tr').data('pedido'))
        let actividad = parseInt($(this).closest('tr').data('actividad'))

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

                    const fechaHoraLimite = crearFechaHora(response.actividad['0']['fecha_limite'], response.actividad['0']['hora_limite']);
                    const fechaHoraActividad = crearFechaHora(response.actividad['0']['fecha_actividad'], response.actividad['0']['hora_actividad']);
                    const ahora = new Date();

                    const limiteSuperado = fechaHoraLimite && fechaHoraLimite < ahora;
                    const actividadSuperada = fechaHoraActividad && fechaHoraActividad < ahora;

                    $('#modalEditarReservaAdmin .informacion-reserva h3').text(response.actividad['0']['nombre']);
                    $('#modalEditarReservaAdmin .informacion-reserva p.descripcion').text(response.actividad['0']['descripcion']);
                    $('#modalEditarReservaAdmin .informacion-reserva p.fecha-actividad').text(new Date(response.actividad['0']['fecha_actividad'] + 'T00:00:00').toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }));
                    $('#modalEditarReservaAdmin .informacion-reserva p.contador-plazas span.plazas-reserva').text(parseInt(response.reservas.length));
                    $('#modalEditarReservaAdmin .informacion-reserva p.contador-plazas span.plazas-libres').text((parseInt(response.actividad['0']['tiene_aforo']) === 1) ? '/' + parseInt(response.actividad['0']['aforo']) : ''); 

                    $('#modalEditarReservaAdmin .personas-editar-reserva').empty();
                    let article = ''
                    let cont
                    response.reservas.map(function(reserva, index){
                        
                        let cont = index + 1

                        article = crearInputsInfoAdicional(nombre, apellidos, fechaNacimiento, edadMinima, dni, email, telefono, direccion, cont, (!limiteSuperado && !actividadSuperada), reserva["id_usuario"]);
                        $('#modalEditarReservaAdmin .personas-editar-reserva').append(article);

                        if (nombre === 1) $('#nombre_' + cont).val(reserva['nombre_usuario']).prop('readonly', (limiteSuperado || actividadSuperada));
                        if (apellidos === 1) $('#apellidos_' + cont).val(reserva['apellidos_usuario']).prop('readonly', (limiteSuperado || actividadSuperada));
                        if (fechaNacimiento === 1) $('#fecha-nacimiento_' + cont).val(reserva['fecha_nacimiento_usuario']).prop('readonly', (limiteSuperado || actividadSuperada));
                        if (dni === 1) $('#dni_' + cont).val(reserva['dni_usuario']).prop('readonly', (limiteSuperado || actividadSuperada));
                        if (email === 1) $('#email_' + cont).val(reserva['email_usuario']).prop('readonly', (limiteSuperado || actividadSuperada));
                        if (telefono === 1) $('#telefono_' + cont).val(reserva['telefono_usuario']).prop('readonly', (limiteSuperado || actividadSuperada));
                        if (direccion === 1) $('#direccion_' + cont).val(reserva['direccion_usuario']).prop('readonly', (limiteSuperado || actividadSuperada));

                    })

                    if(limiteSuperado || actividadSuperada) {
                        $('#modalEditarReservaAdmin').find('.crear-persona-editar-reserva-actividad').prop('disabled', true);
                        $('#modalEditarReservaAdmin').find('#btn-guardar-cambios-reserva-actividad-admin').prop('disabled', true);
                    }
                    else {
                        $('#modalEditarReservaAdmin').find('.crear-persona-editar-reserva-actividad').prop('disabled', false);
                        $('#modalEditarReservaAdmin').find('#btn-guardar-cambios-reserva-actividad-admin').prop('disabled', false);
                    }

                    $('#modalEditarReservaAdmin').attr('data-pedido', parseInt(response.pedido));
                    $('#modalEditarReservaAdmin').attr('data-actividad', parseInt(response.actividad['0']['id_actividades']));
                    $('#modalEditarReservaAdmin').modal('show');
                }
            }
        });
    })


    $(document).on('click', '#modalEditarReservaAdmin .eliminar-persona-reserva-actividad', function(e){

        e.preventDefault();
        $(this).closest('article').remove();
        $('#modalEditarReservaAdmin .informacion-reserva p.contador-plazas span.plazas-reserva').text((parseInt($('#modalEditarReservaAdmin .informacion-reserva p.contador-plazas span.plazas-reserva').text())-1))

    })


    $(document).on('input', '#modalEditarReservaAdmin .personas-editar-reserva input', function(e){
        
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


    $(document).on('click', '#modalEditarReservaAdmin .crear-persona-editar-reserva-actividad', function(e){

        let idActividad = parseInt($('#modalEditarReservaAdmin').data('actividad'));

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
                    
                    $('#modalEditarReservaAdmin .alert-crear-persona-editar-actividad .errores ul').empty()

                    $('#modalEditarReservaAdmin .alert-crear-persona-editar-actividad .errores ul').append(`<li>No hay plazas suficientes</li>`)
                    

                    $('#modalEditarReservaAdmin .contenedor-alert-crear-persona-editar-actividad').removeClass('d-none');
                    $('#modalEditarReservaAdmin .alert-crear-persona-editar-actividad').show();

                    setTimeout(function() {
                        $('.paginaActividad .contenedor-alert-reserva-actividad').addClass('d-none');
                        $('.paginaActividad .alert-errores-reservar-actividad').hide();
                    }, 3000);
                }
                else {
                    let numPersona = parseInt($('#modalEditarReservaAdmin .personas-editar-reserva article').last().data('persona'));
                    let articulo = crearInputsInfoAdicional(nombre, apellidos, fechaNacimiento, edadMinima, dni, email, telefono, direccion, (numPersona + 1), true);
                    $('#modalEditarReservaAdmin .personas-editar-reserva').append(articulo)
                    $('#modalEditarReservaAdmin .informacion-reserva p.contador-plazas span.plazas-reserva').text((parseInt($('#modalEditarReservaAdmin .informacion-reserva p.contador-plazas span.plazas-reserva').text())+1))
                }
              }  
            }
        });

    })

    $(document).on('click', '#modalEditarReservaAdmin #btn-guardar-cambios-reserva-actividad-admin', function(e){

        e.preventDefault();

        let button = $(this)

        let errores = [];
        const regexDniNie = /^(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z])$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexTelefono = /^[6789]\d{8}$/;

        let personas = [];
        
        let cont = 0;
        $('#modalEditarReservaAdmin .personas-editar-reserva input').map(function(){
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

            $('#modalEditarReservaAdmin .personas-editar-reserva article').map(function(){
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
                data: {personas: personas, plazas: personas.length, pedido: parseInt($('#modalEditarReservaAdmin').data('pedido')), actividad: parseInt($('#modalEditarReservaAdmin').data('actividad'))},
                dataType: "JSON",
                success: function (response) {
                    if(response.success === true){
                        $('#modalEditarReservaAdmin').modal('hide');
                        if(button.data('place') === 'misReservas') {
                            window.location.reload();
                        }
                    }
                    else {
                        $('#modalEditarReservaAdmin .alert-crear-persona-editar-actividad .errores ul').empty()

                        $('#modalEditarReservaAdmin .alert-crear-persona-editar-actividad .errores ul').append(`<li>No hay plazas suficientes</li>`)
                        

                        $('#modalEditarReservaAdmin .contenedor-alert-crear-persona-editar-actividad').removeClass('d-none');
                        $('#modalEditarReservaAdmin .alert-crear-persona-editar-actividad').show();

                        setTimeout(function() {
                            $('.paginaActividad .contenedor-alert-reserva-actividad').addClass('d-none');
                            $('.paginaActividad .alert-errores-reservar-actividad').hide();
                        }, 3000);
                    }
                }
            });
        }
        else {

            $('#modalEditarReservaAdmin .alert-crear-persona-editar-actividad .errores ul').empty()

            errores.map(function(e){
                $('#modalEditarReservaAdmin .alert-crear-persona-editar-actividad .errores ul').append(`<li>${e.mensaje}</li>`)
            })
            

            $('#modalEditarReservaAdmin .contenedor-alert-crear-persona-editar-actividad').removeClass('d-none');
            $('#modalEditarReservaAdmin .alert-crear-persona-editar-actividad').show();

            setTimeout(function() {
                $('.paginaActividad .contenedor-alert-reserva-actividad').addClass('d-none');
                $('.paginaActividad .alert-errores-reservar-actividad').hide();
            }, 3000);
        }
        

    })

    // $(document).on('click', '.plaza-btn-menos', function(e){

    //     e.preventDefault()
    //     let valor = parseInt($(this).closest('div').find('input').val());
    //     let max = parseInt($(this).closest('div').find('input').attr('max'));
        
    //     if(valor > 1) {
    //         $(this).closest('div').find('input').val((valor - 1))
            
    //         if(valor < max){
    //             $(this).closest('tr').find('button.btn-aceptar-editar-reserva-actividad').prop('disabled', false);  
    //         }
    //     }

    // })

    // $(document).on('click', '.plaza-btn-mas', function(e){

    //     e.preventDefault()
        
    //     let valor = parseInt($(this).closest('div').find('input').val());
    //     let max = parseInt($(this).closest('div').find('input').attr('max'));


    //     if(valor < max || isNaN(max)) {
    //         $(this).closest('div').find('input').val((valor + 1))
            
    //         if(valor > -1) {
    //             $(this).closest('tr').find('button.btn-aceptar-editar-reserva-actividad').prop('disabled', false);  
    //         }
    //     }

    // })

    // $(document).on('input', '.input-plazas', function(e){

    //     e.preventDefault();
    //     let max = parseInt($(this).attr('max'));
    //     let min = parseInt($(this).attr('min'));
    //     let val = parseInt($(this).val());

    //     if(val > max || val < min) {
    //         $(this).closest('tr').find('button.btn-aceptar-editar-reserva-actividad').prop('disabled', true);
    //     }
    //     else {
    //       $(this).closest('tr').find('button.btn-aceptar-editar-reserva-actividad').prop('disabled', false);  
    //     }
    // })

    // $(document).on('click', '.btn-cancelar-editar-reserva-actividad', function(e){

    //     e.preventDefault();

    //     $(this).closest('tr').find('span.plazas-texto').removeClass('d-none');
    //     $(this).closest('tr').find('.plazas-stepper').addClass('d-none');
    //     $(this).closest('tr').find('.btn-acciones-editar').addClass('d-none');

    // })

    // $(document).on('click', '.btn-aceptar-editar-reserva-actividad', function(e){

    //     e.preventDefault()
    //     let valor = $(this).closest('tr').find('input').val()
    //     let reserva = $(this).closest('tr').data('reserva');
    //     let campo = $(this);

    //     $.ajax({
    //         type: "POST",
    //         url: `${BASE_URL}index.php/editarReservaActividad`,
    //         data: {plazas: valor, reserva: reserva},
    //         dataType: "JSON",
    //         success: function (response) {

    //             console.log(response)
                
    //             if(response.success == true){
                    
    //                 campo.closest('tr').find('span.plazas-texto').text(valor)
    //                 campo.closest('tr').find('span.plazas-texto').removeClass('d-none');
    //                 campo.closest('tr').find('.plazas-stepper').addClass('d-none');
    //                 campo.closest('tr').find('.btn-acciones-editar').addClass('d-none');

    //                 $(`.grid-actividades .card-actividad[data-index='${response.actividad.id_actividades}'] .card-actividad-meta`).children('div').eq(2).html((parseInt(response.actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${response.actividad.plazas_ocupadas} / ${response.actividad.aforo} plazas</div>` : `<div><i class="bi bi-people"></i>${response.actividad.plazas_ocupadas} inscritos</div>`);

    //             }
    //         },
    //         error: function (xhr, status, error) {
    //             console.error('Error AJAX:', status, error);
    //             console.error('Respuesta cruda:', xhr.responseText);
    //         }
    //     });
    // })

    $(document).on('click', '#modalCrearActividad .btn-info-usuario-actividad', function(e){

        e.preventDefault();
        $('#modalInformacionUsuarioActividad').modal('show')
    })


    $(document).on('change', '#modalInformacionUsuarioActividad .fecha-nacimiento-usuario', function(e){

        e.preventDefault();

        let valor = $(this).is(':checked');
        if(valor){
            $('#modalInformacionUsuarioActividad #edad-min-usuario').prop('disabled', false).focus();
            $('label[for="edad-min-usuario"]').css('color', '#212529');
        }
        else {
            $('#modalInformacionUsuarioActividad #edad-min-usuario').prop('disabled', true).val('')
            $('label[for="edad-min-usuario"]').css('color', '#ccc');
        }
    })

    $(document).on('click', '#modalInformacionUsuarioActividad #btn-guardar-informacion-necesita-usuario', function(e){
        
        e.preventDefault();

        let errores = [];

        let nombre = $('#modalInformacionUsuarioActividad .nombre-usuario').is(':checked');
        let apellidos = $('#modalInformacionUsuarioActividad .apellidos-usuario').is(':checked');
        let fechaNacimiento = $('#modalInformacionUsuarioActividad .fecha-nacimiento-usuario').is(':checked');
        let edadMinima = $(fechaNacimiento) ? $('#modalInformacionUsuarioActividad #edad-min-usuario').val() : null;
        let dni = $('#modalInformacionUsuarioActividad .dni-nie-usuario').is(':checked');
        let email = $('#modalInformacionUsuarioActividad .email-usuario').is(':checked');
        let telefono = $('#modalInformacionUsuarioActividad .telefono-usuario').is(':checked');
        let direccion = $('#modalInformacionUsuarioActividad .direccion-usuario').is(':checked');

        if(fechaNacimiento && edadMinima === '' || fechaNacimiento && parseInt(edadMinima) <= 0 ) {
            errores.push({ campo: 'Edad mínima', mensaje: 'La edad si selecciona el campo "Fecha de nacimiento", debe seleccionar una edad mínima superior a 0'})
        }

        
        if(errores.length > 0) {

            $('.contenedor-alert-informacion-usuario-actividad .errores ul').empty()

            errores.map(function(error) {
                $('.contenedor-alert-informacion-usuario-actividad .errores ul').append(`<li>${error.mensaje}</li>`)
            })     

            $('#modalInformacionUsuarioActividad .contenedor-alert-informacion-usuario-actividad').removeClass('d-none');
            $('#modalInformacionUsuarioActividad .alert-errores-informacion-usuario-actividad').show();
        }
        else {
            $('.contenedor-alert-informacion-usuario-actividad .errores ul').empty()
            $('#modalInformacionUsuarioActividad .contenedor-alert-informacion-usuario-actividad').addClass('d-none');
            $('#modalInformacionUsuarioActividad .alert-errores-informacion-usuario-actividad').hide();
            $('#modalInformacionUsuarioActividad').modal('hide');
        }
    })


    // $(document).on('click', '#modalInformacionUsuarioActividad .btn-cancelar-informacion-usuario', function(e){

    //     e.preventDefault();

    //     $('#modalInformacionUsuarioActividad .nombre-usuario').prop('checked', false);
    //     $('#modalInformacionUsuarioActividad .apellidos-usuario').prop('checked', false);
    //     $('#modalInformacionUsuarioActividad .fecha-nacimiento-usuario').prop('checked', false);
    //     $('#modalInformacionUsuarioActividad .dni-nie-usuario').prop('checked', false);
    //     $('#modalInformacionUsuarioActividad .email-usuario').prop('checked', false);
    //     $('#modalInformacionUsuarioActividad .telefono-usuario').prop('checked', false);
    //     $('#modalInformacionUsuarioActividad .direccion-usuario').prop('checked', false);

    //     $('#modalInformacionUsuarioActividad #edad-min-usuario').prop('disabled', true).val('');
    //     $('label[for="edad-min-usuario"]').css('color', '#ccc');

    // })

    $(document).on('click', '#modalEditarActividad .btn-info-usuario-actividad', function(e){

        e.preventDefault();
        $('#modalInformacionUsuarioActividad').modal('show')
    })


    function parseFechaES(str) {
        const [anio, mes, dia] = str.split('-');
        return `${dia}/${mes}/${anio}`;
    }

    function formatearHora(horaConSegundos) {
        if (!horaConSegundos) return '';
        return horaConSegundos.substring(0, 5); // "07:00:00" -> "07:00"
    }
    
    function toDate(fechaDDMMYYYY) {
        const [dia, mes, anio] = fechaDDMMYYYY.split('/');
        return new Date(anio, mes - 1, dia);
    }

 
    function timestampAFechaES(timestamp) {
        const [fecha, hora] = timestamp.split(' ');
        const [anio, mes, dia] = fecha.split('-');
    
        if (hora) {
            return `${dia}/${mes}/${anio} ${hora}`;
        }
        return `${dia}/${mes}/${anio}`;
    }

    function calcularFechaMaximaPorEdad(edadMinima) {
        const hoy = new Date();
        const fechaMax = new Date(hoy.getFullYear() - edadMinima, hoy.getMonth(), hoy.getDate());
        return fechaMax.toISOString().split('T')[0]; // formato YYYY-MM-DD
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

    function crearFechaHora(fecha, hora) {
        if (!fecha || !hora) return null;
        return new Date(`${fecha}T${hora}`);
    }
})

