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

        if(parseFechaES(fecha) <= parseFechaES(fechaLimite)){
            errores.push({campo: 'fecha límite', mensaje: "La fecha límite debe ser menor que la fecha de la actividad"})
        }

        const hoy = new Date().toISOString().split('T')[0]; 
        if(parseFechaES(fecha) <= parseFechaES(hoy)){
            errores.push({campo: 'fecha', mensaje: "No puede seleccionar una fecha pasada"})
        }

        if(parseFechaES(fechaLimite) <= parseFechaES(hoy)){
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
                                                    <li><a class="dropdown-item btn-editar-actividad" href="#" onclick=""><i class="bi bi-pencil me-2"></i>Editar</a></li>
                                                    <li><a class="dropdown-item btn-inscritos-actividad" href="#" onclick="verInscritos"><i class="bi bi-people me-2"></i>Ver inscritos</a></li>
                                                    <li><hr class="dropdown-divider"></li>
                                                    <li><a class="dropdown-item text-danger btn-borrar-actividad" href="#" onclick=""><i class="bi bi-x-lg me-2"></i></i>Cancelar</a></li>
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
                                            ${(parseInt(actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${actividad.plazas_ocupadas} / ${actividad.aforo} plazas</div>` : ''}
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

        if(parseFechaES(fecha) <= parseFechaES(fechaLimite)){
            errores.push({campo: 'fecha límite', mensaje: "La fecha límite debe ser menor que la fecha de la actividad"})
        }

        const hoy = new Date().toISOString().split('T')[0]; 
        if(parseFechaES(fecha) <= parseFechaES(hoy)){
            errores.push({campo: 'fecha', mensaje: "No puede seleccionar una fecha pasada"})
        }

        if(parseFechaES(fechaLimite) <= parseFechaES(hoy)){
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
                                            ${(parseInt(response.actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${response.actividad.plazas_ocupadas} / ${response.actividad.aforo} plazas</div>` : ''}
                                        </div>
                                        <div class="card-actividad-footer">
                                            <span class="card-actividad-precio">${(response.actividad.tiene_precio) ? response.actividad.precio+'€' : 'Gratis'}</span>
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

    $(document).on('click', '#btn-guardar-cancelar-actividad', function(e){

        e.preventDefault();
        let idActividad =  $('#modalCancelarActividad #id-actividad').val();

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/darBajaActividad`,
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
                                        ${(parseInt(response.actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${response.actividad.plazas_ocupadas} / ${response.actividad.aforo} plazas</div>` : ''}
                                    </div>
                                    <div class="card-actividad-footer">
                                        <span class="card-actividad-precio">${(response.actividad.tiene_precio) ? response.actividad.precio+'€' : 'Gratis'}</span>
                                        <a class="btn btn-outline-actividad" href="${BASE_URL}index.php/actividad/${response.actividad.id_actividades}" ${estaInactiva ? 'disabled' : ''}>${estaCancelada ? 'Cancelada' : estaFinalizada ? 'Finalizada' : 'Ver más'}</a>
                                    </div>
                                </div>
                            </div>
                        `
                    );
                    
                    $('#modalCancelarActividad').modal('hide');
                }
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
                                        ${(parseInt(response.actividad.tiene_aforo) === 1) ? `<div><i class="bi bi-people"></i> ${response.actividad.plazas_ocupadas} / ${response.actividad.aforo} plazas</div>` : ''}
                                    </div>
                                    <div class="card-actividad-footer">
                                        <span class="card-actividad-precio">${(response.actividad.tiene_precio) ? response.actividad.precio+'€' : 'Gratis'}</span>
                                        <a class="btn btn-outline-actividad" href="${BASE_URL}index.php/actividad/${response.actividad.id_actividades}" ${estaInactiva ? 'disabled' : ''}>${estaCancelada ? 'Cancelada' : estaFinalizada ? 'Finalizada' : 'Ver más'}</a>
                                    </div>
                                </div>
                            </div>
                        `
                    );
                }
            }
        });
    })

    $(document).on('click', '#btn-restar-plaza', function(e){
        
        e.preventDefault();

        let plazasSeleccionadas = parseInt($('#num-plazas').val());
        let numTotal = plazasSeleccionadas 
        let precio = $('#precio-actividad').val();

        if(plazasSeleccionadas > 1) {

            numTotal = parseInt(plazasSeleccionadas-1)
            $('#num-plazas').val(numTotal);
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
        
        if(aforo !== ''){

            if(plazasSeleccionadas < parseInt(aforo)) {

                numTotal = parseInt(plazasSeleccionadas+1)
                $('#num-plazas').val(numTotal);
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

        if(parseInt(numeroReservas) < 1 || isNaN(numeroReservas)) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(aforo !== '' && parseInt(numeroReservas) > parseInt(aforo) ) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(parseInt(usuario) === -1) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else {
            $('#btn-reservar-plaza-actividad').prop('disabled', false);
            
            if(parseFloat(precio) > 0 && !isNaN(parseFloat(precio))){
                $('#precio-total-ver-actividad strong').text(numeroReservas*parseInt(precio)+'€')
            }
        }
    })

    $(document).on('change', '#usuarios-reserva-actividad', function(e){

        e.preventDefault();
        let usuario = $(this).val();
        let numeroReservas = parseInt($('#num-plazas').val());
        let aforo = $('#num-aforo-actividad').val();
        let precio = $('#precio-actividad').val();

        if(parseInt(usuario) === -1) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(parseInt(numeroReservas) < 1 || isNaN(numeroReservas)) {
            $('#btn-reservar-plaza-actividad').prop('disabled', true);
        }
        else if(aforo !== '' && parseInt(numeroReservas) > parseInt(aforo) ) {
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
        let numeroReservas = parseInt($('#num-plazas').val());
        let idUsuario = parseInt($('#usuarios-reserva-actividad').val())
        let aforo = $('#num-aforo-actividad').val();
        let precioTotal = $('#precio-total-ver-actividad strong').text()
        let precio = $('#precio-actividad').val()
        let rolUsuario = $('#rol_usuario').val();
        let actividad = parseInt($('#id-actividad').val());

        let errores = [];

        if(numeroReservas < 1 || isNaN(numeroReservas)) {
            errores.push({campo: 'plazas', mensaje: 'Para reservar debe seleccionar al menos una plaza'})
        }

        if(!isNaN(parseInt(aforo)) && numeroReservas > parseInt(aforo)) {
            errores.push({campo: 'plazas', mensaje: `No puede superar el número máximo de plazas (${aforo} personas)`})
        }

        if((rolUsuario !== '' && parseInt(rolUsuario) === 2) && parseInt(idUsuario) === -1) {
            errores.push({campo: 'usuario', mensaje: 'Debe seleccionar a un usuario para la reserva'})
        }

        console.log(BASE_URL)

        if(errores.length === 0) {
            $.ajax({
                type: "POST",
                url: `${BASE_URL}index.php/reservaActividad`,
                data: {plazas: numeroReservas, usuario: idUsuario, actividad: actividad},
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
                        $('.paginaActividad .contenedor-alert-reserva-actividad-2').removeClass('d-none');
                        $('.paginaActividad .alert-reserva-actividad-completada').show();
                    }

                    $('#num-plazas').val(1)
                    $('#rol_usuario').val('-1')
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
        }
        
        
    })

    $(document).on('shown.bs.modal', '.modal', function () {
        const openModalsCount = $('.modal.show').length;
        const zIndexModal = 1050 + (10 * openModalsCount);

        $(this).css('z-index', zIndexModal);
        $('.modal-backdrop:not(.modal-stack)').css('z-index', zIndexModal - 5).addClass('modal-stack');
    });


    function parseFechaES(str) {
        const [anio, mes, dia] = str.split('-');
        return `${dia}/${mes}/${anio}`;
    }

    function formatearHora(horaConSegundos) {
        if (!horaConSegundos) return '';
        return horaConSegundos.substring(0, 5); // "07:00:00" -> "07:00"
    }
})

