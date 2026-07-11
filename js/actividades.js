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

    })


    $(document).on('shown.bs.modal', '.modal', function () {
        const openModalsCount = $('.modal.show').length;
        const zIndexModal = 1050 + (10 * openModalsCount);

        $(this).css('z-index', zIndexModal);
        $('.modal-backdrop:not(.modal-stack)').css('z-index', zIndexModal - 5).addClass('modal-stack');
    });


    function parseFechaES(str) {
        const [dia, mes, anio] = str.split('/');
        return new Date(`${anio}-${mes}-${dia}`);
    }
})

