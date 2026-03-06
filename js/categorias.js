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
})