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
                        $(`#tabla-categorias tbody tr[data-index="${idCategoria}"] td:eq(1)`).text(response.categoria.nombre)

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

                    let cont = 0;
                    $(`#tabla-categorias tbody tr`).each(function(tr){

                        cont++

                        tr.eq(0).text(cont)
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

                    let tr = $(`<tr data-index="${response.categoria.id_categoria}">
                                    <td style="width: 10%;">${parseInt($('#tabla-categorias tbody tr').length + 1)}</td>
                                    <td style="width: 40%;">${response.categoria.nombre}</td>
                                    <td style="width: 40%;">
                                        <div>${response.categoria.total_instalaciones+" instalaciones"}</div>
                                        <div class="desglosamiento">${response.categoria.instalaciones_principal+" principal"} · ${response.categoria.instalaciones_secundaria+" secundaria"}</div>
                                    </td>
                                    <td>
                                        <div class="btn-gestor-categorias">
                                            <button type="button" class="btn btn-crud-categorias btn-editar-categoria" title="Editar categoría"><i class="bi bi-pencil-square"></i></button>
                                            <button type="button" class="btn btn-crud-categorias btn-borrar-categoria" title="${ (parseInt(response.categoria.total_instalaciones) > 0) ? "La categoría no se puede borrar porque está asociada a una instalación" : "Borrar categoría" }" ${ (parseInt(response.categoria.total_instalaciones) > 0) ? "disabled" : "" } ><i class="bi bi-trash3"></i></button>
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
