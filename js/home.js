$(document).ready(function () {

    $(document).on('change', '#categorias-home', function(){

        let categoria = $('#categorias-home').val();
        let reservaCompleta = $('#reserva-completa-home').is(':checked');
        console.log(categoria)

        $.ajax({
            type: "POST",
            url: `/reservalo2.0/index.php/getInstalacionesCategoriaHome`,
            data: {categoria: categoria, reserva_completa: reservaCompleta},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#todas-instalaciones-home').empty();
                    
                    $('#todas-instalaciones-home').append($(`<option value="-1">Seleccione una instalación</option>`))
                    response.instalaciones.map(function(i) {
                        $('#todas-instalaciones-home').append($(`<option value="${i.id_instalacion}">${i.nombre}</option>`))
                    })
                }
            }
        });
    })

    $(document).on('change', '#reserva-completa-home', function(){

        let categoria = $('#categorias-home').val();
        let reservaCompleta = $('#reserva-completa-home').is(':checked');
        console.log(categoria)

        $.ajax({
            type: "POST",
            url: `/reservalo2.0/index.php/getInstalacionesCategoriaHome`,
            data: {categoria: categoria, reserva_completa: reservaCompleta},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#todas-instalaciones-home').empty();
                    
                    $('#todas-instalaciones-home').append($(`<option value="-1">Seleccione una instalación</option>`))
                    response.instalaciones.map(function(i) {
                        $('#todas-instalaciones-home').append($(`<option value="${i.id_instalacion}">${i.nombre}</option>`))
                    })
                }
            }
        });
    })

    $(document).on('click', '#busqueda-home', function(e){
        
        e.preventDefault();

        let instalacion = parseInt($('#todas-instalaciones-home').val());
        let categoria = parseInt($('#categorias-home').val());
        let reservaCompleta = $('#reserva-completa-home').is(':checked') ? 1 : 0;

        console.log($('#todas-instalaciones-home').find('option:selected').text())

        let params = new URLSearchParams();
        if (categoria !== -1)   params.set('categoria', categoria);
        if (instalacion !== -1) params.set('instalacion', $('#todas-instalaciones-home').find('option:selected').text());
        if (reservaCompleta)    params.set('reservaCompleta', reservaCompleta);

        window.location.href = `/reservalo2.0/index.php/instalaciones?${params.toString()}`;
    })
})