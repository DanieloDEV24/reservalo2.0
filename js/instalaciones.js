$(document).ready(() => {
    let errores = [];
    let alertBox;
    let pistas = [];
    let contadorAcordeon = 1;

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
            $('#precioCompleto').removeAttr('readonly').css('color', 'black').focus();
        } else {
            $('#precioCompleto').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
        }
    });

    $('#accordionExample').on('change', '.imagenes', function (event) {
        const maxArchivos = 4;
        const archivos = this.files;

        if (archivos.length > maxArchivos) {
            alert('Solo puedes seleccionar un máximo de 4 imágenes.');
            this.value = '';
            return;
        }

        const body = $(this).closest('.accordion-body');
        body.data('imagenesPista', archivos);
    });

    $(document).on('click', '.guardarPista', function () {
        errores = [];
        $('#modalNuevaInstalacion .alertModal').empty();

        const body = $(this).closest('.accordion-body');
        const nombrePista = body.find('.nombrePista').val();
        const capacidadPista = body.find('.capacidadPista').val();
        const precioPista = body.find('.precioPista').val();
        const imagenes = body.data('imagenesPista') || [];

        if (!nombrePista) errores.push('Debes escribir un nombre');
        if (!capacidadPista || capacidadPista == 0 || !parseInt(capacidadPista)) errores.push('Debes seleccionar una capacidad');
        if (!precioPista || !parseFloat(precioPista)) errores.push('Debe seleccionar un precio');

        if (errores.length === 0) {
            pistas.push({
                id: contadorAcordeon,
                nombrePista,
                capacidadPista,
                precioPista,
                imagenes
            });

            body.find('input').prop('readonly', true);
            $(this).attr('disabled', true);
            $(this).closest('.accordion-item').find('.accordion-button').addClass('disabled').attr('disabled', true);

            let nuevoId = 'collapse' + (++contadorAcordeon);
            let nuevoAcordeon = `
            <div class="accordion-item mt-3" data-index="${contadorAcordeon}">
                <h2 class="accordion-header">
                    <button class="accordion-button nuevaPista collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${nuevoId}" aria-expanded="true" aria-controls="${nuevoId}">
                        <div>Añadir Pista&nbsp;<i class="bi bi-plus-circle"></i></div>
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
                        <div class="d-flex justify-content-start mt-4">
                            <div class="w-50">
                                Selecciona las imágenes de la pista (máx 4)
                                <label class="btn btn-primary mt-1">
                                    Imagenes
                                    <input class="imagenes" type="file" name="imagenes[]" multiple accept="image/*" hidden>
                                </label>
                            </div>
                        </div>
                        <div class="d-flex gap-2 mt-3 justify-content-end botonesPista">
                            <button class="btn btn-primary guardarPista">Guardar <i class="bi bi-check-lg"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;

            body.find('.botonesPista').append(`<div class="d-flex gap-3">
                <button class="btn btn-danger borrarPista">Borrar <i class="bi bi-x-circle"></i></button>
                <button class="btn btn-secondary editarPista">Editar <i class="bi bi-pencil-square"></i></button>
            </div>`);

            $('#accordionExample').append(nuevoAcordeon);
        } else {
            let elementosLista = errores.map(e => `<li>${e}</li>`).join('');
            alertBox = $(`<div class="alert alert-danger mb-0" role="alert"><ul class="mb-0">${elementosLista}</ul></div>`);
            $('#modalNuevaInstalacion .alertModal').prepend(alertBox);
        }
    });

    $('#accordionExample').on('click', '.borrarPista', function () {
        const index = parseInt($(this).closest('.accordion-item').data('index'));
        pistas = pistas.filter(p => p.id !== index);
        $(this).closest('.accordion-item').remove();
    });

    $('#guardarInstalacion').on('click', function () {
        $('#modalNuevaInstalacion .alertModal').empty();
        errores = [];

        let nombreInstalacion = $('#nombreInstalacion').val();
        let categoria = $('#categorias').val();
        let puedeCompleto = $('.toggle-switch input').is(':checked');
        let precioCompleto = $('#precioCompleto').val();
        let descripcion = $('#descripcion').val();
        let categoriaSecundaria = 0;

  $('#subcategorias input').each(function () {
    if ($(this).is(':checked')) {
        categoriaSecundaria = $(this).val();
    }
});

        if (!nombreInstalacion) errores.push('El campo "nombre" no puede estar vacío');
        if (categoria == -1) errores.push('Debe seleccionar un deporte');
        if (!descripcion) errores.push('Debe añadir una descripcion');
        if (puedeCompleto && (!precioCompleto || !parseFloat(precioCompleto))) errores.push('Debe seleccionar un precio válido');

        if (errores.length === 0) {
            let formData = new FormData();
            formData.append('nombreInstalacion', nombreInstalacion);
            formData.append('categorias', categoria);
            formData.append('descripcion', descripcion);
            formData.append('puedeCompleto', puedeCompleto);
            formData.append('precioCompleto', precioCompleto);
            formData.append('catSecundaria', categoriaSecundaria);

            const pistasSinImagenes = pistas.map((pista, index) => {
                if (pista.imagenes && pista.imagenes.length > 0) {
                    Array.from(pista.imagenes).forEach((img, i) => {
                        formData.append(`imagenes_pista_${index}[]`, img);
                    });
                }
                return {
                    id: pista.id,
                    nombrePista: pista.nombrePista,
                    capacidadPista: pista.capacidadPista,
                    precioPista: pista.precioPista
                };
            });

            formData.append('pistas', JSON.stringify(pistasSinImagenes));

            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            $.ajax({
    url: 'nuevaInstalacion', // <-- Cambia esto por la URL correcta
    type: 'POST',
    data: formData,
    processData: false, // Importante para enviar FormData
    contentType: false, // Importante para enviar FormData
    success: function (response) {
        $('#modalNuevaInstalacion').modal('hide');
    },
    error: function (xhr, status, error) {
        console.error('Error al guardar instalación');
        console.error(xhr.responseText);

        // Mostrar mensaje de error
        let mensajeError = xhr.responseJSON?.mensaje || "Error inesperado";
        let alerta = `<div class="alert alert-danger mb-0" role="alert">${mensajeError}</div>`;
        $('#modalNuevaInstalacion .alertModal').prepend(alerta);
    }
});

        } else {
            let elementosLista = errores.map(e => `<li>${e}</li>`).join('');
            alertBox = $(`<div class="alert alert-danger mb-0" role="alert"><ul class="mb-0">${elementosLista}</ul></div>`);
            $('#modalNuevaInstalacion .alertModal').prepend(alertBox);
        }
    });
});
