$(document).ready(function () {

    $(document).on('click', '.btn-editar-categoria', function(){

        let idCategoria = parseInt($(this).closest('tr').data('index'));
        
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getCategoria`,
            data: {id_categoria: idCategoria},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#modalEditarCategoria #nombre-categoria').val(response.categoria.nombre);
                    $('#modalEditarCategoria').data('categoria', response.categoria.id_categoria);
                    $('#modalEditarCategoria').modal('show');
    
                }
            }
        });
    })

    $(document).on('click', '#btn-guardar-editar-categoria', function(){

        let errores = [];

        let idCategoria = $('#modalEditarCategoria').data('categoria')
        let nombre = $('#modalEditarCategoria #nombre-categoria').val();

        if(nombre === "") {
            errores.push({campo: "nombre", mensaje: "El nombre no puede estar vacío"})
        }    

        if(errores.length === 0) {

            $.ajax({
                type: "POST",
                url: `${BASE_URL}index.php/editarCategorias`,
                data: {id_categoria: idCategoria, nombre: nombre},
                dataType: "JSON",
                success: function (response) {
                    
                    if(response.success == true) {

                        $('#modalEditarCategoria').modal('hide');
                        $('.contenedor-alert-editar-categoria-success').removeClass('d-none')
                        $('.contenedor-alert-editar-categoria-success .alert-editar-categoria-hecha').show()

                        // CAMBIO 1: apuntamos por clase (.celda-nombre-categoria), no por posición,
                        // así no depende del orden/número de columnas de la tabla
                        $(`#tabla-categorias tbody tr[data-index="${idCategoria}"] .celda-nombre-categoria`).text(response.categoria.nombre)

                        setTimeout(() => {
                            $('.contenedor-alert-editar-categoria-success').hide();
                            $('.contenedor-alert-editar-categoria-success .alert-editar-categoria-hecha').addClass('d-none');
                        }, 3000); // 3 segundos
                    }
                }
            });
        }
        else {
            
            $('#modalEditarCategoria .alert-errores-editar-categoria .errores ul').empty()

            errores.map(e => {
                $('#modalEditarCategoria .alert-errores-editar-categoria .errores ul').append(`<li>${e.message}</li>`)
            })

            $('#modalEditarCategoria .contenedor-alert-editar-categoria').removeClass('d-none');
            $('#modalEditarCategoria .alert-errores-editar-categoria').show();
        }
    })

    $(document).on('click', '.btn-borrar-categoria', function(){

        let idCategoria = parseInt($(this).closest('tr').data('index'));

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getCategoria`,
            data: {id_categoria: idCategoria},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#modalBorrarCategoria').data('categoria', idCategoria);
                    $('#modalBorrarCategoria #nombre-categoria-borrar').text(response.categoria.nombre);
                    $('#modalBorrarCategoria').modal('show');

                }
            }
        });
    })

    $(document).on('click', '#btn-confirmar-borrar-categoria', function(){

        let idCategoria = $('#modalBorrarCategoria').data('categoria')

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/borrarCategoria`,
            data: {id_categoria: idCategoria},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#modalBorrarCategoria').modal('hide');
                    $('.contenedor-alert-borrar-categoria-success').removeClass('d-none')
                    $('.contenedor-alert-borrar-categoria-success .alert-editar-categoria-hecha').show()
                    $(`#tabla-categorias tbody tr[data-index="${idCategoria}"]`).remove()

                    // CAMBIO 2: el callback de .each() recibe (índice, elemento), no el <tr> directamente.
                    // Además el número va en el <th>, no en un <td>.
                    let cont = 0;
                    $(`#tabla-categorias tbody tr`).each(function(){
                        cont++;
                        $(this).find('th').text(cont);
                    })

                    setTimeout(() => {
                        $('.contenedor-alert-borrar-categoria-success').hide();
                        $('.contenedor-alert-borrar-categoria-success .alert-editar-categoria-hecha').addClass('d-none');
                    }, 3000); // 3 segundos
                }
            }
        });
    })

    $(document).on('click', '#btn-nueva-categoria', function(e){

        e.preventDefault();

        $('#modalCrearCategoria').modal('show');
    })

    $(document).on('click', '#btn-guardar-crear-categoria', function(e){

        e.preventDefault();

        let errores = []
        let nombre = $('#nombre-categoria-crear').val();

        if(nombre === "") {
            errores.push({campo: "nombre", mensaje: "El nombre de la categoría no puede estar vacío"});
        }

        if(errores.length === 0) {

            $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/crearCategoria`,
            data: {nombre: nombre},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    // CAMBIO 3: fila coherente con el HTML renderizado por PHP
                    // (th para el número, <p> de desglose, aria-label y aria-disabled en el botón borrar)
                    let tieneInstalaciones = parseInt(response.categoria.total_instalaciones) > 0;

                    let tr = $(`<tr data-index="${response.categoria.id_categoria}">
                                    <th scope="row" style="width: 10%;">${parseInt($('#tabla-categorias tbody tr').length + 1)}</th>
                                    <td class="celda-nombre-categoria" style="width: 40%;">${response.categoria.nombre}</td>
                                    <td style="width: 40%;">
                                        <p class="m-0">${response.categoria.total_instalaciones} instalaciones</p>
                                        <p class="desglosamiento m-0">
                                          <span class="visually-hidden">Desglose: </span>${response.categoria.instalaciones_principal} principal · ${response.categoria.instalaciones_secundaria} secundaria
                                        </p>
                                    </td>
                                    <td>
                                        <div class="btn-gestor-categorias" role="group" aria-label="Acciones para la categoría ${response.categoria.nombre}">
                                            <button type="button" class="btn btn-crud-categorias btn-editar-categoria" title="Editar categoría" aria-label="Editar categoría ${response.categoria.nombre}"><i class="bi bi-pencil-square" aria-hidden="true"></i></button>
                                            <button type="button" class="btn btn-crud-categorias btn-borrar-categoria" title="${tieneInstalaciones ? "La categoría no se puede borrar porque está asociada a una instalación" : "Borrar categoría"}" aria-label="${tieneInstalaciones ? "La categoría "+response.categoria.nombre+" no se puede borrar porque está asociada a una instalación" : "Borrar categoría "+response.categoria.nombre}" ${tieneInstalaciones ? 'disabled aria-disabled="true"' : ''}><i class="bi bi-trash3" aria-hidden="true"></i></button>
                                        </div>
                                    </td>
                                </tr>`)

                    $(`#tabla-categorias tbody`).append(tr)

                    $('#modalCrearCategoria').modal('hide')
                    $('.contenedor-alert-crear-categoria-success').removeClass('d-none')
                    $('.contenedor-alert-crear-categoria-success .alert-editar-categoria-hecha').show()

                    setTimeout(() => {
                        $('.contenedor-alert-crear-categoria-success').hide();
                        $('.contenedor-alert-crear-categoria-success .alert-crear-categoria-hecha').addClass('d-none');
                    }, 3000); // 3 segundos

                }
            }
        });
        }
        else {

            $('#modalCrearCategoria .alert-errores-crear-categoria .errores ul').empty()

            errores.map(e => {
                $('#modalCrearCategoria .alert-errores-crear-categoria .errores ul').append(`<li>${e.mensaje}</li>`)
            })

            $('#modalCrearCategoria .contenedor-alert-crear-categoria').removeClass('d-none');
            $('#modalCrearCategoria .alert-errores-crear-categoria').show();
        }
        
    })
})