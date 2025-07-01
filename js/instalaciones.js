$(document).ready(() => {
    let errores = [];
    let alertBox;
    let pistas = [];
    let contadorAcordeon = 1;
    let imagenesNoPistas
    const item = $(`<div class="accordion-item" data-index="1">
    <h2 class="accordion-header">
      <button class="accordion-button nuevaPista collapsed d-flex justify-content-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        <div>Añadir Pista&nbsp;<i class="bi bi-plus-circle"></i></div>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div class="row gap-5">
          <div class="col">
            <label>Nombre:</label>
            <input type="text" name="nombrePista" class="form-control nombrePista" placeholder="Ej: Pista de padel nº 1">
          </div>
        </div>

        <div class="row gap-5 mt-3">
          <div class="col">
            <label>Capacidad de la Pista:</label>
            <input type="text" name="capacidadPista" class="form-control capacidadPista" placeholder="Ej: 4">
          </div>

          <div class="col">
            <label>Precio de la Pista:</label>
            <input type="text" name="precioPista" class="form-control precioPista" placeholder="Ej: 21">
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
  </div>`);

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

    $('.toggle-switch input.puedeCompleto').on('change', function () {
        let isChecked = $(this).is(':checked');

        if (isChecked) {
            $('#precioCompleto').removeAttr('readonly').css('color', 'black').focus();
            $('#capacidadCompleto').removeAttr('readonly').css('color', 'black').focus();

        } else {
            if (!$('.toggle-switch input.noPistas').is(':checked')) $('#precioCompleto').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
            if (!$('.toggle-switch input.noPistas').is(':checked')) $('#capacidadCompleto').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
        }
    });




    $('.toggle-switch input.noPistas').on('change', function () {
        let isChecked = $(this).is(':checked');
        let buttonFiles = $(`<div class="d-flex justify-content-start mt-4 mb-4">
          <div class="w-50" id="divButtonFilesNoPistas">
            Selecciona las imágenes de la pista (máx 4)
            <label class="btn btn-primary mt-1">
              Imagenes
              <input id="imgNoPistas" type="file" name="imagenes[]" multiple accept="image/*" hidden>
            </label>
          </div>
        </div>`)


        if (isChecked) {
            pistas = [];
            $('#accordionExample').empty()
            $('#precioCompleto').removeAttr('readonly').css('color', 'black').focus();
            $('#capacidadCompleto').removeAttr('readonly').css('color', 'black').focus();
            if ($('.toggle-switch input.puedeCompleto').is(':checked')) $('.toggle-switch input.puedeCompleto').prop('checked', false)
            $('.toggle-switch input.puedeCompleto').prop('disabled', true)
            $('#accordionExample').append(buttonFiles)

        } else {
            $('#accordionExample').empty();
            $('#accordionExample').append(item)
            if (!$('.toggle-switch input.puedeCompleto').is(':checked')) $('#precioCompleto').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
            if (!$('.toggle-switch input.puedeCompleto').is(':checked')) $('#capacidadCompleto').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
            $('.toggle-switch input.puedeCompleto').prop('disabled', false);

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

    $('#accordionExample').on('change', '#imgNoPistas', function (event) {
        const maxArchivos = 4;
        const archivos = this.files;

        if (archivos.length > maxArchivos) {
            alert('Solo puedes seleccionar un máximo de 4 imágenes.');
            this.value = '';
            return;
        }

        imagenesNoPistas = archivos
    });


    $(document).on('click', '.guardarPista', function () {
        errores = [];
        $('#modalNuevaInstalacion .alertModal').empty();

        let capacidadTotal = $('#capacidadCompleto').val();
        let puedeTotal = $('.toggle-switch input.puedeCompleto').is(':checked');

        const body = $(this).closest('.accordion-body');
        const nombrePista = body.find('.nombrePista').val();
        const capacidadPista = body.find('.capacidadPista').val();
        const precioPista = body.find('.precioPista').val();
        let imagenes;
        const nuevasImagenes = body.data('imagenesPista');

        if (nuevasImagenes && nuevasImagenes.length > 0) {
            imagenes = nuevasImagenes;
        } else {
            // Recuperar las imágenes anteriores si existen
            const id = parseInt($(this).closest('.accordion-item').data('index'));
            const pistaExistente = pistas.find(p => p.id === id);
            imagenes = pistaExistente ? pistaExistente.imagenes : [];
        }

        if (!nombrePista) {
            errores.push('Debes escribir un nombre para la pista');
            camposError(body.find('.nombrePista'))
        }
        else {
            campoSolucionado(body.find('.nombrePista'))
        }

        if (!capacidadPista || capacidadPista == 0 || !parseInt(capacidadPista)) {
            errores.push('Debes seleccionar una capacidad para la pista');
            camposError(body.find('.capacidadPista'))
        }
        else if (puedeTotal && (capacidadPista > capacidadTotal)) {
            errores.push('La capacidad de una pista no puede superar a la total de la instalación');
            camposError(body.find('.capacidadPista'))
        }
        else {
            campoSolucionado(body.find('.capacidadPista'))
        }

        if (precioPista === '' || isNaN(precioPista)) {
            errores.push('Debe seleccionar un precio para la pista');
            camposError(body.find('.precioPista'))
        }
        else {
            campoSolucionado(body.find('.precioPista'))
        }

        if (errores.length === 0) {
            const id = parseInt($(this).closest('.accordion-item').data('index'));

            // Buscar índice de la pista existente
            const index = pistas.findIndex(p => p.id === id);

            if (index !== -1) {
                // Si existe, modificarla
                pistas[index].nombrePista = nombrePista;
                pistas[index].capacidadPista = capacidadPista;
                pistas[index].precioPista = precioPista;
                pistas[index].imagenes = imagenes;
            } else {
                // Si no existe, crearla
                pistas.push({
                    id: id,
                    nombrePista: nombrePista,
                    capacidadPista: capacidadPista,
                    precioPista: precioPista,
                    imagenes: imagenes
                });
            }

            console.log(pistas)

            body.find('input').prop('readonly', true);
            $(this).attr('disabled', true);
            body.find('.imagenes').attr('disabled', true)
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


            if (body.find('.botonesPista .borrarPista').length === 0 && body.find('.botonesPista .editarPista').length === 0) {
                body.find('.botonesPista').append(`
        <div class="d-flex gap-3">
            <button class="btn btn-danger borrarPista">Borrar <i class="bi bi-x-circle"></i></button>
            <button class="btn btn-secondary editarPista">Editar <i class="bi bi-pencil-square"></i></button>
        </div>
    `);

                $('#accordionExample').append(nuevoAcordeon);
            }


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

    $('#accordionExample').on('click', '.editarPista', function () {
        let accordion = $(this).closest('.accordion-item')
        const index = parseInt(accordion.data('index'));

        pistas.forEach((pista) => {
            if (index === pista.id) {
                let inputNombre = accordion.find('.nombrePista')
                let inputCapacidad = accordion.find('.capacidadPista')
                let inputPrecio = accordion.find('.precioPista')

                inputNombre.prop('readonly', false)
                inputCapacidad.prop('readonly', false)
                inputPrecio.prop('readonly', false)
                inputNombre.focus();

                let botonGuardar = accordion.find('.guardarPista');
                botonGuardar.prop('disabled', false)

                let botonImg = accordion.find('.imagenes')
                botonImg.prop('disabled', false)
            }
        });
    });



    $('#guardarInstalacion').on('click', function () {
        $('#modalNuevaInstalacion .alertModal').empty();
        errores = [];

        let nombreInstalacion = $('#nombreInstalacion').val();
        let categoria = $('#categorias').val();
        let puedeCompleto = $('.toggle-switch input.puedeCompleto').is(':checked');
        let noPistas = $('.toggle-switch input.noPistas').is(':checked');
        let precioCompleto = $('#precioCompleto').val();
        let capacidadCompleto = $('#capacidadCompleto').val();
        let descripcion = $('#descripcion').val();
        let categoriaSecundaria = 0;



        $('#subcategorias input').each(function () {
            if ($(this).is(':checked')) {
                categoriaSecundaria = $(this).val();
            }
        });

        if (!nombreInstalacion) {
            errores.push('El campo "nombre" de la instalación no puede estar vacío');
            camposError($('#nombreInstalacion'))
        }
        else {
            campoSolucionado($('#nombreInstalacion'))
        }

        if (categoria == -1) {
            errores.push('Debe seleccionar una categoría principal');
            camposError($('#categorias'))
        }
        else {
            campoSolucionado($('#categorias'))
        }

        if (!descripcion) {
            errores.push('Debe añadir una descripcion');
            camposError($('#descripcion'))
        }
        else {
            campoSolucionado($('#descripcion'))
        }
        if ((puedeCompleto || noPistas) && (precioCompleto === '' || isNaN(precioCompleto))) {
            errores.push('Debe seleccionar un precio válido');
            camposError($('#precioCompleto'));
        } else {
            campoSolucionado($('#precioCompleto'));
        }


        if ((puedeCompleto || noPistas) && (capacidadCompleto === '' || isNaN(capacidadCompleto) || parseInt(capacidadCompleto) === 0)) {
            errores.push('Debe seleccionar una capacidad válida');
            camposError($('#capacidadCompleto'));
        }
        else {
            campoSolucionado($('#capacidadCompleto'));
        }

        if (errores.length === 0) {
            let formData = new FormData();
            formData.append('nombreInstalacion', nombreInstalacion);
            formData.append('categorias', categoria);
            formData.append('descripcion', descripcion);
            formData.append('puedeCompleto', puedeCompleto);
            formData.append('noPistas', noPistas)
            formData.append('precioCompleto', precioCompleto);
            formData.append('capacidadCompleto', capacidadCompleto);
            formData.append('catSecundaria', categoriaSecundaria);

            if (noPistas) {
                pistas = [];
                pistas.push(pista = {
                    id: 1,
                    nombrePista: `pista única ${nombreInstalacion}`,
                    capacidadPista: capacidadCompleto,
                    precioPista: precioCompleto,
                })

                if (imagenesNoPistas && imagenesNoPistas.length > 0) {
                    Array.from(imagenesNoPistas).forEach((img, i) => {
                        formData.append(`imagenes_pista_0[]`, img);
                    });
                }

                formData.append('pistas', JSON.stringify(pistas));
            }
            else {
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
            }



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


    function camposError(input) {
        input.addClass('input-error').removeClass('input-ok');
    }

    function campoSolucionado(input) {
        input.removeClass('input-error').addClass('input-ok');
    }
});
