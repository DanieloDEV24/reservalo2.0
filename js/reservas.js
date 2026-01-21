$(document).ready(() => {
    $(document).on('click', '.btn-panel-reservas', function(e) {
        e.preventDefault();

        // Obtenemos el id de la pista de la que queremos hacer la reserva
        const pistaId = $(this).closest('.card-pista').data('pista-id');
        $('#pistaId').val(pistaId);

        let fechaFormateada = new Date().toISOString().split('T')[0];

        $.ajax({
            type: "POST",
            url: "../getInfoPistasReserva",
            data: { pistaId: pistaId, "fecha": fechaFormateada},
            dataType: "json",
            success: function (response) {
                if(response.success === true) {
                    
                    $("#nombre-pista").text(response.infoPista.nombre);
                    $("#capacidad-pista").text(response.infoPista.capacidad + " personas");
                    $("#img1-pista").attr("src", response.infoPista.imagen1);
                    $("#img2-pista").attr("src", response.infoPista.imagen2);
                    $("#img3-pista").attr("src", response.infoPista.imagen3);
                    $("#img4-pista").attr("src", response.infoPista.imagen4);

                    

                }
            }
        });

        $('#modalReservaPista').modal('show');

    })
})