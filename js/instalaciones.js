$(document).ready(() => {
    let archivos;
    let errores = [];
    let alert;

    $('#crear').click(() => {
        $('#modalNuevaInstalacion').modal('show');
    });

    $('#categorias').on('change', function () {
        $('#subcategorias').empty();
        let catPrincipal = $(this).val();

        $('#categorias option').each(function () {
            const val = $(this).val();
            const text = $(this).text();

            if (val != catPrincipal && catPrincipal != -1 && val != -1) {
                const input = $(`<input value="${val}" name="subcategoria" id="sub-${val}" type="radio">`);
                const label = $(`<label for="sub-${val}">${text}</label>`);
                $('#subcategorias').append(input, label);
            }
        });
    });

    $('.toggle-switch input').on('change', function () {
        const isChecked = $(this).is(':checked');

        if (isChecked) {
            $('#precioCompleto').removeAttr('readonly');
            $('#precioCompleto').val();
            $('#precioCompleto').css('color', 'black');
            $('#precioCompleto').focus();
        } else {
            $('#precioCompleto').attr('readonly', 'readonly');
            $('#precioCompleto').val(0.0);
            $('#precioCompleto').css('color', '#ccc');
        }
    });

    let pistas = [];
    let pista  = {};
    let contadorAcordeon = 1;
    let contError

    $(document).on('click', '.guardarPista', function () {

        contError = 0;

        let body = $(this).closest('.accordion-body');

        let nombrePista = body.find('.nombrePista').val();
        let capacidadPista = body.find('.capacidadPista').val();
        let precioPista = body.find('.precioPista').val();

        if (nombrePista === "")
        {
            errores.push({ type: "danger", return: 'Debe seleccionar un deporte' });
            contError++;
        }

        if (capacidadPista === "" || capacidadPista == 0)
        {
            errores.push({ type: "danger", return: 'Debe seleccionar un deporte' });
            contError++;
        }
        
        if (precioPista === "")
        {
            errores.push({ type: "danger", return: 'Debe seleccionar un deporte' });
            contError++;
        }

        if(contError === 0)
        {
            pista = {
                nombrePista: nombrePista, 
                capacidadPista: capacidadPista,
                precioPista: precioPista
            }

            pistas.push(pista)
        

        // ✅ Desactivar inputs
        body.find('input').prop('readonly', true);

        // ✅ Desactivar botones internos
        body.find('.guardarPista, .vaciarPista').prop('disabled', true);

        // ✅ Desactivar el botón de encabezado para que no colapse/expanda
        let headerButton = $(this).closest('.accordion-item').find('.accordion-button');
        headerButton.addClass('disabled').attr('disabled', true);

        // ✅ Crear nuevo acordeón limpio
        contadorAcordeon++;
        let nuevoId = 'collapse' + contadorAcordeon;

        let nuevoAcordeon = `
        <div class="accordion-item mt-3">
            <h2 class="accordion-header">
                <button class="accordion-button nuevaPista collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${nuevoId}" aria-expanded="true" aria-controls="${nuevoId}">
                    Añadir Pista &nbsp; <i class="bi bi-plus-circle"></i>
                </button>
            </h2>
            <div id="${nuevoId}" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <div class="row gap-5">
                        <div class="col">
                            <label>Nombre:</label>
                            <input type="text" class="form-control nombrePista" placeholder="Ej: Pista de padel nº 1">
                        </div>
                    </div>

                    <div class="row gap-5 mt-3">
                        <div class="col">
                            <label>Capacidad de la Pista:</label>
                            <input type="text" class="form-control capacidadPista" placeholder="Ej: 4">
                        </div>
                        <div class="col">
                            <label>Precio de la Pista:</label>
                            <input type="text" class="form-control precioPista" placeholder="Ej: 21">
                        </div>
                    </div>

                    <div class="d-flex gap-2 mt-3 justify-content-end">
                        <button class="btn btn-secondary vaciarPista">Vaciar</button>
                        <button class="btn btn-primary guardarPista">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        $('#accordionExample').append(nuevoAcordeon);
        }
        else 
        {
            let elementosLista = "";
            errores.forEach(error => {
                elementosLista += `<li>${error.return}</li>`;
            });

            alert = $(`
                <div class="alert alert-danger mb-0" role="alert" style="margin-bottom:0%">
                    <ul class="mb-0">${elementosLista}</ul>
                </div>
            `);

            $('#modalNuevaInstalacion .alertModal').prepend(alert);
        }
    });

    $('#guardarInstalacion').on('click', function () {
        $('#modalNuevaInstalacion .alertModal').empty();
        errores = [];

        let nombreInstalacion = $('#nombreInstalacion').val();
        let categoria = $('#categorias').val();
        let puedeCompleto = $('.toggle-switch input').is(':checked');
        let precioCompleto = $('#precioCompleto').val();
        let descripcion = $('#descripcion').val();

        if (nombreInstalacion === "") {
            errores.push({ type: "danger", return: 'El campo "nombre" no puede estar vacío' });
        }

        if (categoria == -1) {
            errores.push({ type: "danger", return: 'Debe seleccionar un deporte' });
        }

        if (descripcion === "") {
            errores.push({ type: "danger", return: 'Debe añadir una descripcion' });
        }

        
        if (errores.length === 0) {
            let formData = new FormData();
            formData.append('nombreInstalacion', nombreInstalacion);
            formData.append('categorias', categoria);
            formData.append('puedeCompleto', puedeCompleto);
            formData.append('precioCompleto', precioCompleto);
            formData.append('pistas', pistas);

            // console.log(formData); // Aquí deberías hacer tu envío AJAX
            console.log(formData);
        } else {
            let elementosLista = "";
            errores.forEach(error => {
                elementosLista += `<li>${error.return}</li>`;
            });

            alert = $(`
                <div class="alert alert-danger mb-0" role="alert" style="margin-bottom:0%">
                    <ul class="mb-0">${elementosLista}</ul>
                </div>
            `);
        }

        $('#modalNuevaInstalacion .alertModal').prepend(alert);
    });
});
