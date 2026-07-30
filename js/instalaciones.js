/*****************************************************************************************************************************************
****************************************************  CRUD DE LAS INSTALACIONES ********************************************************** 
******************************************************************************************************************************************/
/*****************************************************************************************************************************************
 * En este archivo, le daremos funcionalidad al crud del gestor de las instalaciones, donde podremos hacer las siguientes funciones: 
 * Crear       --> Creación de instalaciónes y pistas
 * Editar      --> Edición de las instalaciones y pistas ya creadas
 * Borrar      --> Borrado de las instalaciones y pistas ya creadas. Es un borrado total, lo que nosotros llamamos un borrado físico
 * Dar de baja --> Dar de baja a una instalación o pista de manera que no se pueda usar y los usuarios lo vean. A esto lo llamamos un borrado * lógico
 ********************************************************************************************************************************************/


$(document).ready(() => {
    let errores = [];
    let alertBox;
    let pistas = [];
    let contadorAcordeon = 1;
    let imagenesNoPistas
    let estadoInicial // --> Estado inicial del switch de no pistas
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
            <label>Nombre: <span class="campo-obligatorio">*</span></label>
            <input type="text" name="nombrePista" class="form-control nombrePista" placeholder="Ej: Pista de padel nº 1">
          </div>
        </div>

        <div class="row gap-5 mt-3">
          <div class="col">
            <label>Capacidad de la Pista: <span class="campo-obligatorio">*</span></label>
            <input type="text" name="capacidadPista" class="form-control capacidadPista" placeholder="Ej: 4">
          </div>

          <div class="col">
            <label>Precio de la Pista: <span class="campo-obligatorio">*</span></label>
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



    /***********************************************************************************************************************************
    ********************************************************  CREAR INSTALACIÓN  *******************************************************
    ***********************************************************************************************************************************/

    // Click en el btn de crear instalación nueva
    $('#crear').click(() => {
        $('#modalNuevaInstalacion').modal('show');
    });



    // Evento en el que cuando se cambia de categoría principal, automáticamente aparezcan como categorías secundarias las otras categorías no seleccionadas
    $('#categorias').on('change', function (event) {

        event.preventDefault();

        $('#subcategorias').empty(); // --> vaciamos el contenedor de categorias secundarias
        let catPrincipal = $(this).val(); // --> obtenemos el valor de la categoría principal

        // Recorremos las categorías del select (los options), para guardar su texto y valor
        $('#categorias option').each(function (event) {
            const val = $(this).val(); // --> obtenemos el valor del option
            const text = $(this).text(); // --> obtenemos el texto del option

            // Comprobamos que haya una categoría principal seleccionada y creamos las categorías secundarias sin seleccionar esta
            if (val != catPrincipal && catPrincipal != -1 && val != -1) {
                // Creación del nuevo nodo con la categoría secundaria
                const input = $(`<input value="${val}" name="subcategoria" id="sub-${val}" type="checkbox">`);
                const label = $(`<label for="sub-${val}">${text}</label>`);

                // Evento para desmarcar los otros checkboxes
                input.on('change', function () {
                    if ($(this).is(':checked')) {
                        $('#subcategorias input[type="checkbox"]').not(this).prop('checked', false);
                    }
                });

                $('#subcategorias').append(input, label);
            }
        });
    });




    // Evento en el que controlamos el switch que muestra si se puede hacer una reserva completa de la instalación. Se comprueba al cambiar el estado del switch.
    $('.toggle-switch input.puedeCompleto').on('change', function (event) {

        event.preventDefault();

        let isChecked = $(this).is(':checked'); // --> Comprobamos si esta seleccionado

        // En el caso de que esté seleccionado, borramos el atributo readonly para poder añadir un valor) y ponemos el color del texto del input en negro. Además le añadimos el foco
        if (isChecked) {
            $('#precioCompleto').removeAttr('readonly').css('color', 'black').focus(); // --> Ya podemos editar el valor del input del precio en caso de hacer una reserva completa
            $('#capacidadCompleto').removeAttr('readonly').css('color', 'black').focus(); // --> Ya podemos editar el valor del input de la  capacidad en caso de hacer una reserva completa
        }
        // Si no está seleccionado,  
        else {
            if (!$('.toggle-switch input.noPistas').is(':checked')) $('#precioCompleto').attr('readonly', 'readonly').val(0.0).css('color', '#ccc'); // --> comprobamos si esta seleccionado el input de solo completo (no se puede pistas), para hacer lo mismo que con el precio de la reserva completa
            if (!$('.toggle-switch input.noPistas').is(':checked')) $('#capacidadCompleto').attr('readonly', 'readonly').val(0.0).css('color', '#ccc'); // --> comprobamos si esta seleccionado el input de solo completo (no se puede pistas), para hacer lo mismo que con la capacidad de la reserva completa
        }
    });




    // Evento en el que controlamos el switch que muestra que solo se puede hacer una reserva completa, es decir, no se pueden crear pistas. Se comprueba al cambiar el estado del switch.
    $('.toggle-switch input.noPistas').on('change', function (event) {

        event.preventDefault();

        let isChecked = $(this).is(':checked'); // --> comprobamos si está seleccionado

        // Creamos un btn general para añadir las imágenes, ya que las imágenes se añaden por pistas
        let buttonFiles = $(`<div class="d-flex justify-content-start mt-4 mb-4">
          <div class="w-50" id="divButtonFilesNoPistas">
            Selecciona las imágenes de la pista (máx 4)
            <label class="btn btn-primary mt-1">
              Imagenes
              <input id="imgNoPistas" type="file" name="imagenes[]" multiple accept="image/*" hidden>
            </label>
          </div>
        </div>`)

        // Si esta seleccionado, quitamos los accordión de pistas, ponemos editables los campos de precio y capacidad completa, y añadimos el btn de añadir imagenes
        if (isChecked) {
            pistas = [];
            $('#accordionExample').empty()
            $('#precioCompleto').removeAttr('readonly').css('color', 'black').focus();
            $('#capacidadCompleto').removeAttr('readonly').css('color', 'black').focus();
            if ($('.toggle-switch input.puedeCompleto').is(':checked')) $('.toggle-switch input.puedeCompleto').prop('checked', false)
            $('.toggle-switch input.puedeCompleto').prop('disabled', true)
            $('#accordionExample').append(buttonFiles)

        }
        // En el caso contrario, dejamos los campos de precio completo y capacidad completa para no poder editarlos y añadimos el accordín para poder añadir una pista
        else {
            $('#accordionExample').empty();
            $('#accordionExample').append(item)
            if (!$('.toggle-switch input.puedeCompleto').is(':checked')) $('#precioCompleto').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
            if (!$('.toggle-switch input.puedeCompleto').is(':checked')) $('#capacidadCompleto').attr('readonly', 'readonly').val(0.0).css('color', '#ccc');
            $('.toggle-switch input.puedeCompleto').prop('disabled', false);

        }
    });
    



    // Evento en el que controlamos la subida de imágenes. Controlamos cada vez que vayamos a subir o editar los archivos.
    $('#accordionExample').on('change', '.imagenes', function (event) {

        event.preventDefault();

        const maxArchivos = 4; // --> Número máximo de imágenes que podemos subir. En este caso 4
        const archivos = this.files; // --> Archivos que hemos subido

        // Comprobamos que no se supere el número máximo de archivos establecido
        if (archivos.length > maxArchivos) {
            alert('Solo puedes seleccionar un máximo de 4 imágenes.');
            this.value = '';
            return;
        }

        // Guardamos las imágenes
        const body = $(this).closest('.accordion-body');
        body.data('imagenesPista', archivos);
    });




    // Evento en el que controlamos la subida de imágenes de instalaciones sin pistas. Controlamos cada vez que vayamos a subir o editar los archivos.
    $('#accordionExample').on('change', '#imgNoPistas', function (event) {

        event.preventDefault();

        const maxArchivos = 4;
        const archivos = this.files;

        if (archivos.length > maxArchivos) {
            alert('Solo puedes seleccionar un máximo de 4 imágenes.');
            this.value = '';
            return;
        }

        imagenesNoPistas = archivos
    });




    // Evento en el que controlamos cuando guardamos una pista. Se realiza este evento al pulsar el btn 
    $(document).on('click', '.guardarPista', function (event) {

        event.preventDefault();

        errores = []; // --> Array donde guardaremos los errores a la hora de la creación de pistas
        $('#modalNuevaInstalacion .alertModal').empty();

        let capacidadTotal = $('#capacidadCompleto').val(); // --> valor de la capacidad total para la instalación 
        let puedeTotal = $('.toggle-switch input.puedeCompleto').is(':checked'); // --> comprobamos el estado del switch que indica si puede hacerse una reserva completa o no

        const body = $(this).closest('.accordion-body'); // --> cuerpo del acordion de la pista
        const nombrePista = body.find('.nombrePista').val(); // --> valor del nombre de la pista
        const capacidadPista = body.find('.capacidadPista').val(); // --> valor de la capacidad de la pista
        const precioPista = body.find('.precioPista').val(); // --> valor del precio de la pista
        let imagenes;
        const nuevasImagenes = body.data('imagenesPista'); // --> Obtención de las imágenes

        // Si hay imágenes las guardamos
        if (nuevasImagenes && nuevasImagenes.length > 0) {
            imagenes = nuevasImagenes;
        }
        // Si no existen imágenes, recuperamos las anteriores 
        else {
            // Recuperar las imágenes anteriores si existen
            const id = parseInt($(this).closest('.accordion-item').data('index'));
            const pistaExistente = pistas.find(p => p.id === id);
            imagenes = pistaExistente ? pistaExistente.imagenes : [];
        }

        // Comprobamos que existan el nombre. Si no existe guardamos un error
        if (!nombrePista) {
            errores.push('Debes escribir un nombre para la pista'); // --> Guardamos el error en el array de errores
            camposError(body.find('.nombrePista')) // --> Marcamos el campo como erróneo
        }
        else {
            campoSolucionado(body.find('.nombrePista')) // --> Marcamos el campo como correcto
        }

        // Comprobamos que existan la capacidad de la pista o no sea 0 o sea un número. Si falla alguno de estos aspectos guardamos un error
        if (!capacidadPista || parseInt(capacidadPista) === 0 || !parseInt(capacidadPista)) {
            errores.push('Debes seleccionar una capacidad para la pista'); // --> Guardamos el error en el array de errores
            camposError(body.find('.capacidadPista')) // --> Marcamos el campo como erróneo
        }

        // Comprobamos que esté marcado el switch del que se pueda hacer una reserva completa y la capacidad pista sea menor que la capacidad completa
        else if (puedeTotal && (parseInt(capacidadPista) > parseInt(capacidadTotal) || parseInt(capacidadPista) <= 0)) {
            errores.push('La capacidad de una pista no puede superar a la total de la instalación y debe ser superior a 0'); // --> Guardamos el error en el array de errores
            camposError(body.find('.capacidadPista')) // --> Marcamos el campo como erróneo
        }
        else {
            campoSolucionado(body.find('.capacidadPista')) // --> Marcamos el campo como correcto
        }

        // Comprobamos que el campo de precio no este vacío
        if (precioPista === '' || isNaN(precioPista) || parseFloat(precioPista) < 0) {
            errores.push('Debe seleccionar un precio para la pista'); // --> Guardamos el error en el array de errores
            camposError(body.find('.precioPista')) // --> Marcamos el campo como erróneo
        }
        else {
            campoSolucionado(body.find('.precioPista')) // --> Marcamos el campo como correcto
        }

        // Si el array de errores está vacío, es decir no hay errores, procedemos a guardar la pista 
        if (errores.length === 0) {

            const id = parseInt($(this).closest('.accordion-item').data('index')); // --> Cogemos el id de la instalación a la que pertenece 
            // la pista

            const index = pistas.findIndex(p => p.id === id);  // --> Buscamos índice de la pista existente. 
            // --> Nos devolverá: --> -1: no existe la pista
            //                    --> número de la pista

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

            // Ponemos los campos del accordion de la pista para no poder editarlos
            body.find('input').prop('readonly', true);
            $(this).attr('disabled', true);
            body.find('.imagenes').attr('disabled', true)
            $(this).closest('.accordion-item').find('.accordion-button').addClass('disabled').attr('disabled', true);

            let nuevoId = 'collapse' + (++contadorAcordeon); // --> Nuevo id del accordion nuevo de la nueva pista

            // Accordion nuevo que se va a añadir cuando creamos una pista
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
                                <label>Nombre: <span class="campo-obligatorio">*</span></label>
                                <input type="text" class="form-control nombrePista" placeholder="Ej: Pista de padel nº 1">
                            </div>
                        </div>
                        <div class="row gap-5 mt-3">
                            <div class="col">
                                <label>Capacidad de la Pista: <span class="campo-obligatorio">*</span></label>
                                <input type="text" class="form-control capacidadPista" placeholder="Ej: 4">
                            </div>
                            <div class="col">
                                <label>Precio de la Pista: <span class="campo-obligatorio">*</span></label>
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

            // Btns con las distintas funciones de las pistas: --> Crear
            // --> Editar
            // --> Borrar
            if (body.find('.botonesPista .borrarPista').length === 0 && body.find('.botonesPista .editarPista').length === 0) {
                body.find('.botonesPista').append(`
        <div class="d-flex gap-3">
            <button class="btn btn-danger borrarPista">Borrar <i class="bi bi-x-circle"></i></button>
            <button class="btn btn-secondary editarPista">Editar <i class="bi bi-pencil-square"></i></button>
        </div>
    `);

                $('#accordionExample').append(nuevoAcordeon); // --> Cuando este listo, añadimos el accordion al div
            }


        }

        // Si ha habido errores, mostramos una alerta con los mensajes de errores
        else {
            let elementosLista = errores.map(e => `<li>${e}</li>`).join('');
            alertBox = $(`<div class="alert alert-danger mb-0" role="alert"><ul class="mb-0">${elementosLista}</ul></div>`);
            $('#modalNuevaInstalacion .alertModal').prepend(alertBox);
        }
    });




    // Evento en el que se controla el borrado de las pistas
    $('#accordionExample').on('click', '.borrarPista', function (event) {

        event.preventDefault();

        const index = parseInt($(this).closest('.accordion-item').data('index')); // --> Buscamos el id de la pista que queremos borrar
        pistas = pistas.filter(p => p.id !== index); // --> Filtramos los datos que no tengan ese id
        $(this).closest('.accordion-item').remove(); // --> Borramos también el accordion
    });




    // Evento en el que controlamos la edición de las pistas
    $('#accordionExample').on('click', '.editarPista', function (event) {

        event.preventDefault();

        let accordion = $(this).closest('.accordion-item') // --> Obtenemos el accordion de la pista en concreto
        const index = parseInt(accordion.data('index'));   // --> Obtenemos el id de la pista 

        // Recorremos las pistas 
        pistas.forEach((pista) => {

            // Buscamos la pista a editar por el id
            if (index === pista.id) {
                let inputNombre = accordion.find('.nombrePista') // --> Buscamos el nombre
                let inputCapacidad = accordion.find('.capacidadPista') // --> Buscamos la capacidad
                let inputPrecio = accordion.find('.precioPista') // --> Buscamos el precio

                // Hacemos que se puedan editar los campos de la pista
                inputNombre.prop('readonly', false)
                inputCapacidad.prop('readonly', false)
                inputPrecio.prop('readonly', false)
                inputNombre.focus();

                // Hacemos que podamos guardar la pista editada
                let botonGuardar = accordion.find('.guardarPista');
                botonGuardar.prop('disabled', false)

                // Hacemos que podamos guardar las imágenes
                let botonImg = accordion.find('.imagenes')
                botonImg.prop('disabled', false)
            }
        });
    });





    // Evento en el que guardamos la instalación entera con sus pistas
    $('#guardarInstalacion').on('click', function (event) {

        event.preventDefault();

        $('#modalNuevaInstalacion .alertModal').empty(); // --> Vaciamos el campo de las notificaciones de error
        errores = []; // --> Array donde irán guardados los errores

        let nombreInstalacion = $('#nombreInstalacion').val(); // --> Obtenemos el nombre 
        let categoria = $('#categorias').val(); // --> Obtenemos la categoría 
        let puedeCompleto = $('.toggle-switch input.puedeCompleto').is(':checked'); // --> Obtenemos el estado del switch que indica si se puede hacer la reserva completa de la instalación
        let noPistas = $('.toggle-switch input.noPistas').is(':checked'); // --> Obtenemos el estado del switch que indica si la instalación no tiene pistas
        let iluminacion = $('.toggle-switch input.iluminacion').is(':checked')
        let material = $('.toggle-switch input.material').is(':checked')
        let precioCompleto = $('#precioCompleto').val(); // --> Obtenemos el precio de la reserva completa
        let capacidadCompleto = $('#capacidadCompleto').val(); // --> Obtenemos la capacidad completa de la instalación
        let descripcion = $('#descripcion').val(); // --> Obtenemos la descripción de la instalación
        let direccion = $('#direccionInstalacion').val()
        let categoriaSecundaria = 0; // --> variable donde guardamos la categoría secundaria
        let sinHorario = $('.toggle-switch input.sinHorario').is(':checked')


        // Evento donde controlamos la selección de la categoría secundaria. Lo que hacemos es recorrer los inputs con las categorías secundarias
        $('#subcategorias input').each(function (event) {

            // Comprobamos que esté seleccionada
            if ($(this).is(':checked')) {
                categoriaSecundaria = $(this).val(); // --> Obtenemos el valor de la categoría seleccionada
            }
        });

        // Comprobamos que se haya escrito el nombre de la instalación
        if (!nombreInstalacion) {
            errores.push('El campo "nombre" de la instalación no puede estar vacío'); // --> Guardamos el mensaje de error en el array de errores
            camposError($('#nombreInstalacion')) // --> Mostramos el campo como erróneo
        }
        else {
            campoSolucionado($('#nombreInstalacion')) // --> Mostramos el campo como correcto
        }

        // Comprobamos que se haya seleccionado una categoría
        if (categoria == -1) {
            errores.push('Debe seleccionar una categoría principal'); // --> Añadimos el mensaje de error al array de errores
            camposError($('#categorias')) // --> Marcamos el campo como erróneo
        }
        else {
            campoSolucionado($('#categorias')) // --> Marcamos el campo como 
        }

        // Comprobamos que haya escrita una descripción
        if (!descripcion) {
            errores.push('Debe añadir una descripcion'); // --> Guardamos el mensaje de error en el array de errores
            camposError($('#descripcion')) // --> Marcamos el campo como erróneo
        }
        else {
            campoSolucionado($('#descripcion')) // --> Marcamos el campo como correcto
        }


        if (!direccion) {
            errores.push('Debe añadir una direccion'); // --> Guardamos el mensaje de error en el array de errores
            camposError($('#direccionInstalacion')) // --> Marcamos el campo como erróneo
        }
        else {
            campoSolucionado($('#direccionInstalacion')) // --> Marcamos el campo como correcto
        }


        // Comprobamos que si esta seleccionada la opción de reserva completa o instalación sin pistas, haya un precio de la instalación completa
        if ((puedeCompleto || noPistas) && (precioCompleto === '' || isNaN(precioCompleto) || parseFloat(precioCompleto) < 0 )) {
            errores.push('Debe seleccionar un precio válido'); // --> Guardamos la el mensaje de error en el array de errores
            camposError($('#precioCompleto')); // --> Mostramos el campo como erróneo
        } else {
            campoSolucionado($('#precioCompleto')); // --> Mostramos el campo como correcto
        }


        // Comporbamos que si esta seleccionada la opción de reserva completa o instalación sin pistas, haya una capacidad indicada para la reserva de la instalación completa 
        if ((puedeCompleto || noPistas) && (capacidadCompleto === '' || isNaN(capacidadCompleto) || parseInt(capacidadCompleto) <= 0)) {
            errores.push('Debe seleccionar una capacidad válida'); // --> Guardamos el mensaje de error en el array de errores
            camposError($('#capacidadCompleto')); // --> Mostramos el campo como erróneo
        }
        else {
            campoSolucionado($('#capacidadCompleto')); // --> Mostramos el campo como correcto
        }

        // Comprobamos que si no esta seleccionada la opción de instalación sin pistas, es decir, si hay pista; haya pistas creadas
        if (!noPistas && pistas.length === 0) {
            errores.push('Debe añadir al menos una pista a la instalación o seleccionar la opción de "es solo completa"'); // --> Guardamos el mensaje de error en el array de errores
        }

        // Comprobamos que el array de errore esté vacío, es decir, no haya errores
        if (errores.length === 0) {
            let formData = new FormData(); // --> Creamos el formData, donde irá la información guardada
            formData.append('nombreInstalacion', nombreInstalacion); // --> Añadimos el nombre de la instalación al formData
            formData.append('categorias', categoria); // --> Añadimos la categoría de la instalación al formData
            formData.append('descripcion', descripcion); // --> Añadimos la descripción de la instalación al formData
            formData.append('direccion', direccion);
            formData.append('puedeCompleto', puedeCompleto); // --> Añadimos el estado del switch que muestra si se puede hacer una reserva completa de la instalación al formData
            formData.append('noPistas', noPistas) // --> Añadimos el estado del switch que muestra si no se puede crear pistas en la instalación al formData
            formData.append('iluminacion', iluminacion)
            formData.append('material', material)
            formData.append('sinHorario', sinHorario)
            formData.append('precioCompleto', precioCompleto); // --> Añadimos el precio completo al formData
            formData.append('capacidadCompleto', capacidadCompleto); // --> Añadimos la capacidad completa al formData
            formData.append('catSecundaria', categoriaSecundaria); // --> Añadimos la categoría opcional al formData

            // Ahora añadimos las pistas. Para ello primero comprobamos si hay o no, viendo el estado del switch que marca si se puede o no crear pistas para la instalación
            if (noPistas) {
                pistas = []; // --> Array donde irán las pistas

                //Añadimos una pista única simulando una instalación sin pistas 
                pistas.push(pista = {
                    id: 1,
                    nombrePista: `pista única ${nombreInstalacion}`,
                    capacidadPista: capacidadCompleto,
                    precioPista: precioCompleto,
                })

                // Guardamos las imágenes de la instalación
                if (imagenesNoPistas && imagenesNoPistas.length > 0) {
                    Array.from(imagenesNoPistas).forEach((img, i) => {
                        formData.append(`imagenes_pista_1[]`, img);
                    });
                }

                // Guardamos la pista en el formData
                formData.append('pistas', JSON.stringify(pistas));
            }
            // En el caso de que si haya pistas
            else {

                // Recorremos las pistas, sin tener en cuenta las imágenes de cada una
                const pistasSinImagenes = pistas.map((pista, index) => {

                    // Comprobamos que de la pista haya imágenes
                    if (pista.imagenes && pista.imagenes.length > 0) {

                        // En el caso de que sí haya, las recorremos y la guardamos
                        Array.from(pista.imagenes).forEach((img, i) => {
                            formData.append(`imagenes_pista_${pista.id}[]`, img);
                        });
                    }

                    // Devolvemos la pista
                    return {
                        id: pista.id,
                        nombrePista: pista.nombrePista,
                        capacidadPista: pista.capacidadPista,
                        precioPista: pista.precioPista
                    };
                });

                if (puedeCompleto) {
                    // Calculamos la capacidad y precio total sumando todas las pistas
                    const capacidadTotal = parseInt(capacidadCompleto);
                    const precioTotal = parseFloat(precioCompleto)
                    
                    pistasSinImagenes.push({
                        id: 'completo',
                        nombrePista: `Instalación ${nombreInstalacion} completa`,
                        capacidadPista: capacidadTotal,
                        precioPista: precioTotal
                    });
                }

                // Guardamos las pistas en el formData
                formData.append('pistas', JSON.stringify(pistasSinImagenes));
            }


            // Petición Ajax al back en la que enviamos los datos para crear la instalación y guardarlas en la base de datos
            $.ajax({
                url: `${BASE_URL}index.php/nuevaInstalacion`, // --> URL a la que enviamos la petición
                type: 'POST',
                data: formData,
                processData: false, // Importante para enviar FormData
                contentType: false, // Importante para enviar FormData
                success: function (response) {

                    let data = JSON.parse(response); // --> Respuesta de la petición. La pasamos a un objeto con JSON.parse()
                    let instalaciones = data.instalaciones; // --> Obtenemos las instalaciones que tenemos creadas
                    let tabla = $('#tablaInstalaciones tbody'); // --> Obetenemos la tabla del crud de las instalaciones
                    let body = $('.divTable')
                    
                    if ($('#tablaInstalaciones').length === 0) {
                    // Crear la tabla completa
                    const tablaHTML = `
                    <div style="position: relative; min-height: 70px;" class="contenedor-loader">
                        <table class="table table-hover" id="tablaInstalaciones">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Categoria Principal</th>
                                <th scope="col">Categoria Secundaria</th>
                                <th scope="col">Acciones</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <a href="#" id="crear" class="btn-primary-personal" style="margin-left: 0; width: 20%">Nueva <i class="bi bi-plus-circle"></i></a>
                        `;

                        body.empty()
                        body.append(tablaHTML)
                        tabla = $('#tablaInstalaciones tbody');
                    }

                    tabla.empty(); // --> La vaciamos

                    // Recorremos las instalaciones para hacer un efecto de refresco inmediato, con los nuevos datos
                    instalaciones.forEach((instalacion, index) => {

                        // Comprobamos que haya una categoría secundaria (num | null), para poner el texto en la tabla (nombre | ----)
                        let categoriaSecundaria = instalacion.categoria_opc_name ? instalacion.categoria_opc_name : '----';

                        
                        // Creamos por cada instalación una fila
                        tabla.append(`
                            <tr data-index="${instalacion.id_instalacion}" class="${(parseInt(instalacion.estado) === 1) ? "table-danger" : ""}">
                                <td>${index + 1}</td>
                                <td>${instalacion.nombre}</td>
                                <td>${instalacion.categoria_name}</td>
                                <td>${categoriaSecundaria}</td>
                                <td>


                <div class="dropdown" style="max-width: 200px;">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item btnVerInstalacion" href="#">Ver &nbsp;<i class="bi bi-eye"></i></a></li>
                    <li><a class="dropdown-item btnEditarInstalacion" href="#">Editar &nbsp;<i class="bi bi-pencil-square"></i></a></li>
                    <li><a class="dropdown-item btnBorrarInstalacion" href="#">Borrar &nbsp;<i class="bi bi-trash3"></i></a></li>
                    <li><a class="dropdown-item btnDarBaja" href="#">Dar de Baja &nbsp;<i class="bi bi-x-lg        "></i></a></li>
                    ${parseInt(instalacion.tipo_reserva) === 0
  ? `
    <li>
      <a class="dropdown-item btnGenerarHorario"
         href="${BASE_URL}index.php/horario/${instalacion.id_instalacion}">
        Generar horario&nbsp;<i class="bi bi-calendar-week"></i>
      </a>
    </li>
  `
  : ''
}
                </ul>
                </div>


          </td>
          <td>
          ${(parseInt(instalacion.estado) === 1) ? `<i class="bi bi-info-circle"
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="Esta instalación está dada de baja"></i>
                    
                    <div id="loader${instalacion.id_instalacion}" class="loader2" style="display: none;"></div>` : ''}
          </td>
                            </tr>`);





                    
                        // LIMPIAMOS EL MODAL
                        $('#nombreInstalacion').val('');
                        $('#categorias').val(-1);
                        $('#direccionInstalacion').val('');
                        $('#capacidadCompleto').val('0.0');
                        $('#precioCompleto').val('0.0');
                        $('#descripcion').val('');

                        // Switches (dentro de #modalNuevaInstalacion para no tocar los del modal de editar)
                        $('#modalNuevaInstalacion .toggle-switch input.iluminacion').prop('checked', false);
                        $('#modalNuevaInstalacion .toggle-switch input.material').prop('checked', false);
                        $('#modalNuevaInstalacion .toggle-switch input.noPistas').prop('checked', false);
                        $('#modalNuevaInstalacion .toggle-switch input.puedeCompleto').prop('checked', false);
                        $('#modalNuevaInstalacion .toggle-switch input.sinHorario').prop('checked', false);

                        // Subcategorías: se generan dinámicamente, así que las vaciamos directamente
                        $('#subcategorias').empty();

                        // Accordion de pistas: lo dejamos como estaba al cargar la página
                        $('#accordionExample').empty().append(`
                            <div class="accordion-item" data-index="1">
                                <h2 class="accordion-header">
                                    <button class="accordion-button nuevaPista collapsed d-flex justify-content-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <div>Añadir Pista&nbsp;<i class="bi bi-plus-circle"></i></div>
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="row gap-5">
                                            <div class="col">
                                                <label>Nombre: <span class="campo-obligatorio">*</span></label>
                                                <input type="text" name="nombrePista" class="form-control nombrePista" placeholder="Ej: Pista de padel nº 1">
                                            </div>
                                        </div>
                                        <div class="row gap-5 mt-3">
                                            <div class="col">
                                                <label>Capacidad de la Pista: <span class="campo-obligatorio">*</span></label>
                                                <input type="text" name="capacidadPista" class="form-control capacidadPista" placeholder="Ej: 4">
                                            </div>
                                            <div class="col">
                                                <label>Precio de la Pista: <span class="campo-obligatorio">*</span></label>
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
                            </div>
                        `);

                        // Array global de pistas e imágenes de "sin pistas"
                        pistas = [];
                        imagenesNoPistas = null;

                        // Clases de error/éxito
                        $('#modalNuevaInstalacion .form-control').removeClass('is-invalid is-valid');

                        // Alertas de error
                        $('#modalNuevaInstalacion .alertModal').empty();
                    });

                    // Cerramos el modal de crear una nueva instalación
                    $('#modalNuevaInstalacion').modal('hide');

                    window.animarFilasGestor();
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

        }

        // Si no se ha podido crear la instalación mostramos el mensaje de error
        else {

            // Recorremos el array de errores y lo mostramos en un alert
            let elementosLista = errores.map(e => `<li>${e}</li>`).join('');
            alertBox = $(`<div class="alert alert-danger mb-0" role="alert"><ul class="mb-0">${elementosLista}</ul></div>`);
            $('#modalNuevaInstalacion .alertModal').prepend(alertBox);
        }
    });




    // Evento en el que controlamos la opción de ver instalación. Nos sale la información de la instalación de una manera más técnica, no como le saldría al usuario para verla.
    $('#tablaInstalaciones tbody').on('click', '.btnVerInstalacion', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Obtenemos el id de la instalación del atributo data-index del tr de la tabla
        let index = $(this).closest('tr').data('index');

        // Reaclizamos una petición ajax al back para obtener la información de la instalación con el id anteriormente guardado
        $.ajax({
            url: `${BASE_URL}index.php/verInstalacion`, // --> URL donde hacemos la petición
            method: 'POST',
            data: { id: index },
            dataType: 'json',
            success: function (response) {

                // Ponemos la imagen de la instalación en el "header" del modal
                $('#imagenVerInstalacion').css('background-image', `url(/reservalo2.0/images/${response.pistas[0].imagen1})`);

                console.log(response)

                // Mostramos los datos
                $('#nombreVerInstalacion').text(response.instalacion[0].nombre + '.'); // --> Mostramos el nombre
                $('#categoriaPrincipalVerInstalacion').text(response.instalacion[0].categoria_name) // --> Mostramos la categoría
                $('#categoriaSecundariaVerInstalacion').text(response.instalacion[0].categoria_opc_name ?? ' '); // --> Mostramos la categoría secundaria
                $('#descripcionVerInstalacion').text(response.instalacion[0].descripcion); // --> Mostramos la descripción de la instalación
                $('#direccionVerInstalacion').text(response.instalacion[0].direccion);
                // Comprobamos si se puede hacer una reserva de la instalación completa
                if (parseInt(response.instalacion[0].puede_completo) === 1) {
                    $('#capacidadCompletaVerInstalacion').text(response.instalacion[0].capacidad_completo) // --> Si es el caso ponemos la capacidad de la reserva completa
                    $('#precioCompletoVerInstalacion').text(response.instalacion[0].precio_completo) // --> Si es el caso ponemos el precio de la reserva completa
                }
                // En el caso de no poderse, pero no poder tampoco crear pistas
                else if (parseInt(response.instalacion[0].no_pistas) === 1) {
                    $('#capacidadCompletaVerInstalacion').text(response.instalacion[0].capacidad_completo) // --> Si es el caso ponemos la capacidad de la reserva completa
                    $('#precioCompletoVerInstalacion').text(response.instalacion[0].precio_completo) // --> Si es el caso ponemos el precio de la reserva completa
                }
                // Por el contrario ponemos "----"
                else {
                    $('#capacidadCompletaVerInstalacion').text('----')
                    $('#precioCompletoVerInstalacion').text('----')
                }

                $('#iluminacionVerInstalacion').text((parseInt(response.instalacion[0].iluminacion) === 1)?"Sí":"No")
                $('#materialVerInstalacion').text((parseInt(response.instalacion[0].material) === 1)?"Sí":"No")

                // Antes de nada vaciamos el div contenedor de los accordión con las pistas
                $('#accordionPistas').empty();

                // Recorremos las pistas
                response.pistas.map((pista, index) => {

                    // Por cada pista creamos un accordion
                    let node = $(`
                                <div class="accordion-item" data-index="${pista["id_pista"]}">
                                    <h2 class="accordion-header">
                                    <button 
                                        class="accordion-button nuevaPista collapsed d-flex justify-content-start" 
                                        type="button" 
                                        data-bs-toggle="collapse" 
                                        data-bs-target="#collapse-${pista["id_pista"]}" 
                                        aria-expanded="false" 
                                        aria-controls="collapse-${pista["id_pista"]}">
                                        <div>${pista["nombre_pista"]}</div>
                                    </button>
                                    </h2>
                                    <div id="collapse-${pista["id_pista"]}" 
                                        class="accordion-collapse collapse" 
                                        data-bs-parent="#accordionPistas">
                                    <div class="accordion-body">
                                        <div class="galeria-imagenes-pistas">
                                            

                                            <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
        <img src="${BASE_URL}images/${pista["imagen1"]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${BASE_URL}images/${pista["imagen2"]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${BASE_URL}images/${pista["imagen3"]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${BASE_URL}images/${pista["imagen4"]}" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
                                        </div>

                                        <div class="row gap-3 mt-3">
                                        <div class="col">
                                            <div class="row capacidad-pista-ver-instalacion">
                                                <div class="col-8"><label>Capacidad de la Pista:</label></div>
                                                <div class="col-4"><p>${pista["capacidad_pista"]}</p></div>
                                            </div>
                                        </div>

                                        <div class="col precio-pista-ver-instalacion">
                                            <div class="row">
                                                <div class="col"><label>Precio de la Pista:</label></div>
                                                <div class="col"><p>${pista["precio_pista"]}</p></div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                    `);

                    // Guardamos el accordion
                    $('#accordionPistas').append(node);
                })

                // Enseñamos el modal
                $('#modalVerInstalacion').modal('show');
            },
            error: function (xhr, status, error) {
                // Mostrar mensaje legible al usuario
                alert("⚠️ No se pudo cargar la instalación. Intenta nuevamente más tarde.");

                // Registrar en consola para el desarrollador
                console.error("Error AJAX:");
                console.error("Estado:", status);
                console.error("Código HTTP:", xhr.status);
                console.error("Mensaje:", error);
                console.error("Respuesta del servidor:", xhr.responseText);
            }
        });

    })

    /***********************************************************************************************************************************
    *******************************************************  EDITAR INSTALACIÓN  *******************************************************
    ***********************************************************************************************************************************/

    // Evento en el que manejamos la edición de una instalación
    $('#tablaInstalaciones tbody').on('click', '.btnEditarInstalacion', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Obetenemos el id de la instalación
        let index = $(this).closest('tr').data('index');

        // Añadimos el id al modal 
        $('#modalEditarInstalacion').data('index', index);

        // Hacemos una petición ajax al back para obtener los datos de esa instalación
        $.ajax({
            url: `${BASE_URL}index.php/editarInstalacion`, // --> URL a la que se hace la petición
            method: 'POST',
            data: { id: index },
            dataType: 'json',
            success: function (response) {

                // Vaciamos el div con los accordion
                $('#accordionEditarPistas').empty()

                // Obtenemos los datos y los añadimos a los inputs
                $('#nombreInstalacionEditar').val(response.instalacion[0].nombre) // --> Valor del nombre de la instalación
                $('#categoriasEditar').val(response.instalacion[0].categoria_principal) // --> Valor de la categoría principal de la instalación
                let categorias = response.categorias

                // Vaciamos el div de las categorías secundarias 
                $('#subcategoriasEditar').empty();

                // Recorremos las categorías 
                categorias.map((categoria) => {

                    // Comprobamos que el id de la categoría no sea el mismo que el valor de la categoría principal de manera que solo se muestren en le div de categorias secundarias, las no seleccionadas como principal
                    if (categoria.id_categoria !== response.instalacion[0].categoria_principal) {

                        // Creamos los elementos de las categorías secundarias
                        const input = $(`<input value="${categoria.id_categoria}" name="subcategoriaEditar" id="sub-${categoria.id_categoria}" type="checkbox" ${(response.instalacion[0].categoria_principal && response.instalacion[0].categoria_opcional1 === categoria.id_categoria) ? "checked" : ""}>`);
                        const label = $(`<label for="sub-${categoria.id_categoria}">${categoria.nombre}</label>`);

                        input.on('change', function () {
                            if ($(this).is(':checked')) {
                                $('#subcategoriasEditar input[type="checkbox"]').not(this).prop('checked', false);
                            }
                        });

                        // La añadimos al div
                        $('#subcategoriasEditar').append(input, label);
                    }
                })

                // Evento en el que controlamos el cambio de categoría principal para que se vayan cambiado las posibles categorías secuandarias de forma dinámica
                $('#categoriasEditar').on('change', function (event) {

                    event.preventDefault();

                    // Vaciamos el div de las categorias secundarias
                    $('#subcategoriasEditar').empty();

                    // Obtenemos la categoría principal
                    let catPrincipal = $(this).val();

                    // Obtenemos las opciones del select y la recorremos 
                    $('#categoriasEditar option').each(function () {

                        const val = $(this).val(); // --> Guardamos el valor del option, es decir, de la categoría
                        const text = $(this).text(); // --> Guardamos el texto del option, es decir, de la categoria

                        // Si el valor no es el mismo que el de la categoría principal y hay una categoria principal seleccionada (catPrincipal !== -1). Creamos el elemento
                        if (val != catPrincipal && catPrincipal != -1 && val != -1) {
                            const input = $(`<input value="${val}" name="subcategoriaEditar" id="sub-${val}" type="checkbox">`);
                            const label = $(`<label for="sub-${val}">${text}</label>`);

                            input.on('change', function () {
                                if ($(this).is(':checked')) {
                                    $('#subcategoriasEditar input[type="checkbox"]').not(this).prop('checked', false);
                                }
                            });

                            // Lo añadimos al div
                            $('#subcategoriasEditar').append(input, label);
                        }
                    });
                });

                let iluminacionChecked = (parseInt(response.instalacion[0].iluminacion) === 1) ? "checked" : "";
                let materialChecked = (parseInt(response.instalacion[0].material) === 1) ? "checked" : "";
                let noPistasChecked = (parseInt(response.instalacion[0].no_pistas) === 1) ? "checked" : ""; // --> Comprobamos si está marcado el switch que nos indica que no se pueden crear pistas para esa instalación
                let puedeCompletoChecked = (parseInt(response.instalacion[0].puede_completo) === 1) ? "checked" : ""; // --> Comprobamos si está marcado el switch que nos indica que se puede hacer una reserva completa en la instalación
                let sinHorarioChecked = (parseInt(response.instalacion[0].tipo_reserva) === 1) ? "checked" : ""; // --> 

                $('#noPistasEditar').prop('checked', noPistasChecked); // --> Lo reflejamos en el switch
                estadoInicial = noPistasChecked
                $('#puedeCompletoEditar').prop('checked', puedeCompletoChecked); // --> Lo reflejamos en el switch

                $('#iluminacionEditar').prop('checked', iluminacionChecked);
                $('#materialEditar').prop('checked', materialChecked);

                $('#sinHorarioEditar').prop('checked', sinHorarioChecked);

                $('#capacidadCompletoEditar').val(response.instalacion[0].capacidad_completo) // --> Añadimos el valor de la capacidad total de la instalación
                $('#precioCompletoEditar').val(response.instalacion[0].precio_completo) // --> Añadimos el valor del precio total de la instalación
                $('#descripcionEditar').val(response.instalacion[0].descripcion) // --> Añadimos el valor de la descripción de la instalación 
                $('#direccionEditar').val(response.instalacion[0].direccion)

                let pistas = response.pistas // --> Obtenemos las pistas

                // Recorremos las pistas
                if (!noPistasChecked) {
                    pistas.map((pista) => {
                        let acordion = ''
                        if (parseInt(pista.completa) === 0) {
                              // Por cada pista creamos un accordion con sus datos
                        acordion = `
                    <div class="accordion-item mt-3 accordionEditarPista" data-index="${pista.id_pista}">
                <h2 class="accordion-header">
                    <button class="accordion-button nuevaPista collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${pista.id_pista}" aria-expanded="true" aria-controls="${pista.id_pista}">
                        <div>${pista.nombre_pista}&nbsp;<i class="bi bi-pencil-square"></i></div>
                    </button>
                </h2>
                <div id="${pista.id_pista}" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <div class="row gap-5">
                            <div class="col">
                                <label>Nombre: <span class="campo-obligatorio">*</span></label>
                                <input type="text" class="form-control nombrePistaEditar" placeholder="Ej: Pista de padel nº 1" value="${pista.nombre_pista}">
                            </div>
                        </div>
                        <div class="row gap-5 mt-3">
                            <div class="col">
                                <label>Capacidad de la Pista: <span class="campo-obligatorio">*</span></label>
                                <input type="text" class="form-control capacidadPistaEditar" placeholder="Ej: 4" value="${pista.capacidad_pista}">
                            </div>
                            <div class="col">
                                <label>Precio de la Pista: <span class="campo-obligatorio">*</span></label>
                                <input type="text" class="form-control precioPistaEditar" placeholder="Ej: 21" value="${pista.precio_pista}">
                            </div>
                        </div>
                        <div class="d-flex justify-content-start mt-4">
                            <div class="w-50">
                                Selecciona las imágenes de la pista (máx 4)
                                <label class="btn btn-primary mt-1">
                                    Imagenes
                                    <input class="imagenesEditar" type="file" name="imagenesEditar[]" multiple accept="image/*" hidden>
                                </label>
                            </div>
                        </div>
                        <div class="d-flex gap-2 mt-3 justify-content-end botonesPista">
                            <button class="btn btn-danger borrarPistaEditar">Borrar <i class="bi bi-x-lg"></i></button>
                            <button class="btn btn-primary guardarPistaEditar" disabled >Guardar <i class="bi bi-check-lg"></i></button>
                        </div>
                    </div>
                </div>
            </div>
                    `
                        }

                      
                        // Los añadimos al modal
                        $('#accordionEditarPistas').append(acordion)
                    })
                }
                else {
                    $('#accordionEditarPistas').append(`<div class="w-50">
                                                        Selecciona las imágenes de la pista (máx 4)
                                                        <label class="btn btn-primary mt-1">
                                                            Imagenes
                                                            <input class="imagenesEditarNoPistas" type="file" name="imagenesEditar[]" multiple accept="image/*" hidden>
                                                        </label>
                                                    </div>`)
                }

                // Añadimos un accordion para poder crear una nueva pista
                let nuevoId = parseInt(pistas[(pistas.length - 1)].id_pista) + 1
                let accordionNuevo = `
                    <div class="accordion-item mt-3 accordionNuevaPista" data-index="${nuevoId}">
                <h2 class="accordion-header">
                    <button class="accordion-button nuevaPista collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${nuevoId}" aria-expanded="true" aria-controls="${nuevoId}">
                        <div>Añadir Pista&nbsp;<i class="bi bi-plus-circle"></i></div>
                    </button>
                </h2>
                <div id="${nuevoId}" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <div class="row gap-5">
                            <div class="col">
                                <label>Nombre: <span class="campo-obligatorio">*</span></label>
                                <input type="text" class="form-control nombrePista" placeholder="Ej: Pista de padel nº 1">
                            </div>
                        </div>
                        <div class="row gap-5 mt-3">
                            <div class="col">
                                <label>Capacidad de la Pista: <span class="campo-obligatorio">*</span></label>
                                <input type="text" class="form-control capacidadPista" placeholder="Ej: 4" >
                            </div>
                            <div class="col">
                                <label>Precio de la Pista: <span class="campo-obligatorio">*</span></label>
                                <input type="text" class="form-control precioPista" placeholder="Ej: 21" >
                            </div>
                        </div>
                        <div class="d-flex justify-content-start mt-4">
                            <div class="w-50">
                                Selecciona las imágenes de la pista (máx 4)
                                <label class="btn btn-primary mt-1">
                                    Imagenes
                                    <input class="imagenesEditarNuevaPista" type="file" name="imagenesEditarNueva[]" multiple accept="image/*" hidden>
                                </label>
                            </div>
                        </div>
                        <div class="d-flex gap-2 mt-3 justify-content-end botonesPista">
                            <button class="btn btn-danger borrarPista">Borrar <i class="bi bi-x-lg"></i></button>
                            <button class="btn btn-primary guardarPistaNuevaEditar">Guardar <i class="bi bi-check-lg"></i></button>
                        </div>
                    </div>
                </div>
            </div>
                    `

                // Lo añadimos solo en el caso de que no este seleccionado la opción de solo completo, sin pistas
                if (parseInt(response.instalacion[0].no_pistas) === 0) {
                    $('#accordionEditarPistas').append(accordionNuevo);
                }

                $('#modalEditarInstalacion').modal('show');
            },
            error: function (xhr, status, error) {
                // Mostrar mensaje legible al usuario
                alert("⚠️ No se pudo cargar la instalación. Intenta nuevamente más tarde.");

                // Registrar en consola para el desarrollador
                console.error("Error AJAX:");
                console.error("Estado:", status);
                console.error("Código HTTP:", xhr.status);
                console.error("Mensaje:", error);
                console.error("Respuesta del servidor:", xhr.responseText);
            }
        })

    })




    // Evento en el que mientras escribimos en cualquier campo del accordion, comprobamos si ha habido algún cambio en la información de la pista que queremos editar. En el caso de que si lo haya y no este vacío el campo. estará habilitado el btn de guardar pista, mientras tanto no lo estará
    $(document).on('input', '#accordionEditarPistas input', function (event) {

        event.preventDefault();

        // 🚫 Si el input es de tipo file (imagenesEditar), salimos del evento
        if ($(this).attr('type') === 'file') return;

        let $accordionItem = $(this).closest('.accordion-item'); // --> Obtenemos el accordion en el que se encuentra el campo que está siendo editado
        let idPista = parseInt($(this).closest('.accordion-item').data('index')); // --> Obtenemos el id de la pista

        // Petición ajax en la que obtenemos los datos de la pista
        $.ajax({
            url: `${BASE_URL}index.php/infoPista`, // --> URL donde hacemos la petición
            method: 'POST',
            data: { id: idPista },
            dataType: 'json',
            success: function (response) {
                let pista = response.pista // --> obtenemos las pistas del response, ya que el response
                // tiene la siguiente estructura. response: --> succes: bool
                //                                          --> pista: object    

                // Ahora obtenemos la información
                let nombrePista = pista[0].nombre_pista // --> nombre de la pista
                let capacidadPista = pista[0].capacidad_pista // --> capacidad de la pista
                let precioPista = pista[0].precio_pista // --> precio de la pista 

                // Obetenemos los valores de los input
                let nombrePistaNuevo = $accordionItem.find('.nombrePistaEditar').val() // --> valor nuevo del nombre de la pista
                let capacidadPistaNuevo = $accordionItem.find('.capacidadPistaEditar').val() // --> valor nuevo de la capacidad de la pista
                let precioPistaNuevo = $accordionItem.find('.precioPistaEditar').val() // --> valor nuevo del precio de la pista

                // Comprobamos que el valor nuevo del nombre sea distinto al que teníamos ya guardado y que no esté vacío
                if (nombrePista !== nombrePistaNuevo && nombrePistaNuevo !== '') {
                    $accordionItem.find('.guardarPistaEditar').prop('disabled', false) // --> Habilitamos el btn de guardar pista
                }
                // Comprobamos que el valor nuevo de la capacidad sea distinta a la que teníamos ya guarada y que no esté vacía
                else if (capacidadPista !== capacidadPistaNuevo && capacidadPistaNuevo !== '') {
                    $accordionItem.find('.guardarPistaEditar').prop('disabled', false) // --> Habilitamos el btn de guardar pista
                }
                // Comprobamos que el valor nuevo del precio sea distinta a la que teníamos ya guardada y que no esté vacía
                else if (precioPista !== precioPistaNuevo && precioPistaNuevo !== '') {
                    $accordionItem.find('.guardarPistaEditar').prop('disabled', false) // --> Habilitamos el btn de guardar pista
                }
                // En el caso de que no haya cambio o el elemento esté vacío, deshabilitamos el btn
                else {
                    $accordionItem.find('.guardarPistaEditar').prop('disabled', true) // --> Deshabilitamos el btn
                }
            }
        })

    })




    // Evento en el que controlamos el guardado de las pistas que hayamos editado. 
    // Evento: Guardar pista editada (nombre, capacidad, precio e imágenes)
    $(document).on('click', '.guardarPistaEditar', function (event) {

        event.preventDefault();
        let errores = [];

        let $accordionItem = $(this).closest('.accordion-item');
        let idPista = parseInt($accordionItem.data('index'));

        // Obtenemos los valores
        let nombre = $accordionItem.find('.nombrePistaEditar').val();
        let capacidad = $accordionItem.find('.capacidadPistaEditar').val();
        let precio = $accordionItem.find('.precioPistaEditar').val();

        if(nombre === '' || !nombre) errores.push('Debe seleccionar un nombre válido');
        if(capacidad === '' || !capacidad || parseInt(capacidad) <= 0) errores.push('Debe seleccionar una capacidad válida (mayor que 0)'); 
        if(parseFloat(precio) < 0) errores.push('Debe seleccionar un precio válido'); 

        if (errores.length > 0) {
            const listaErrores = errores.map(e => `<li>${e}</li>`).join('');
            const alertBox = $(`
                <div class="alert alert-danger mb-0" role="alert">
                    <ul class="mb-0">${listaErrores}</ul>
                </div>
            `);

            $('#modalEditarInstalacion .alertModal').empty().append(alertBox);
            return;
        }

        // Obtenemos las imágenes guardadas en el data del body
        let body = $accordionItem.find('.accordion-body');
        let archivos = body.data('imagenesEditar');

        // Creamos el objeto FormData para enviar tanto texto como archivos
        let formData = new FormData();
        formData.append('id', idPista);
        formData.append('nombre_pista', nombre);
        formData.append('capacidad_pista', capacidad);
        formData.append('precio_pista', precio);

        // Añadimos las imágenes seleccionadas
        if (archivos && archivos.length > 0) {
            for (let i = 0; i < archivos.length; i++) {
                formData.append('imagenes[]', archivos[i]);
            }
        }

        // Petición AJAX al backend
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/editarPista`, // <-- tu endpoint en el backend
            data: formData,
            processData: false, // <-- importante para que jQuery no lo procese
            contentType: false, // <-- importante para enviar correctamente los archivos
            success: function (response) {
                // Deshabilitamos el botón de guardar después de guardar los datos
                $accordionItem.find('.guardarPistaEditar').prop('disabled', true);

                // (Opcional) limpiar input de imágenes si quieres
                $accordionItem.find('.imagenesEditar').val('');

                alert('Pista guardada correctamente.');
            },
            error: function (event) {
                alert('Error al guardar la pista.');
            }
        });

    });



    let datosPistas = [] // --> Variable donde irán los datos de las pistas hasta que guarde la edición

    // Evento que controla el estado del switch de manera que en el caso de no poder pistas se eleminen los accordions con las pistas, pero guardandolos en un array hasta que guardemos la instalación
    $('#noPistasEditar').on('change', function (event) {

        event.preventDefault();

        // Comprobamos el estado del switch que nos dice si solo se permite la reserva completa (no hay pistas) o se puede reservar por pista
        let checked = $(this).is(':checked');

        console.log(checked, estadoInicial);

        // Comprobamos que no este seleccionado ni el no pistas no el puede hacerse reserva solo completa para deshabilitar los campos de precio y capacidad completa
        if (!checked && !$('#modalEditarInstalacion #puedeCompletoEditar').is(':checked')) {
            $('#modalEditarInstalacion #capacidadCompletoEditar').prop('readonly', true); // --> Hacemos que el campo de la capacidad completa solo se pueda leer
            $('#modalEditarInstalacion #capacidadCompletoEditar').css('color', '#ccc'); // --> Hacemos que el campo de la capacidad completa sea de color #ccc para dar sensación de no editable

            $('#modalEditarInstalacion #precioCompletoEditar').prop('readonly', true); // --> Hacemos que el campo del precio completa solo se pueda leer
            $('#modalEditarInstalacion #precioCompletoEditar').css('color', '#ccc'); // --> Hacemos que el campo del precio completa sea de color #ccc para dar sensación de no editable
        }
        else {
            $('#modalEditarInstalacion #capacidadCompletoEditar').prop('readonly', false); // --> Hacemos que el campo de la capacidad completa se pueda editar
            $('#modalEditarInstalacion #capacidadCompletoEditar').css('color', '#000'); // --> Hacemos que el campo de la capacidad completa tenga el color #000 dando la sensación de que ya es editable

            $('#modalEditarInstalacion #precioCompletoEditar').prop('readonly', false); // --> Hacemos que el campo del precio completo se pueda editar
            $('#modalEditarInstalacion #precioCompletoEditar').css('color', '#000'); // --> Hacemos que el campo del precio completo tenga el color #000 dando la sensación de que ya es editable
        }

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getNewIndexPista`,
            data: "",
            dataType: 'json',
            // beforeSend: function (event) {
            //     // Mostrar loader
            //     $("#loader").show();

            //     // Obtenemos los btns de los accordions
            //     let headerBtn = $('#accordionEditarPistas .accordion-header .accordion-button');

            //     // Le ponemos ese color gris para dar efecto carga
            //     headerBtn.css("color", "#ccc", "important")
            // },
            success: function (response) {

                // Obetenemos el nuevo id de la pista, que es el que añadiremos al accordion como data-index
                let pistas = response.pistas;
                let nuevoId = parseInt(pistas[(pistas.length - 1)].id_pista) + 1 // --> Obtenemos el nuevo ínidce de la pista nueva

                // Guardamos la informaxción en el array por si le damos al check sin querer
                // Para ello recorremos los accordion ya creados
                $('#accordionEditarPistas .accordionEditarPista').each(function (index, element) {

                    let elemento = $(element) // --> elemento de cada accordion
                    let idPista = elemento.data('index') // --> id de cada pista obtenido del accordion con el atributo "data-index"
                    let nombre = elemento.find('.nombrePistaEditar').val() // --> nombre de cada pista obtenido del accordion 
                    let capacidad = elemento.find('.capacidadPistaEditar').val() // --> capacidad de cada pista obtenida del accordion
                    let precio = elemento.find('.precioPistaEditar').val() // --> precio de cada pista obtenida de cada accordion


                    // Comprobamos si existe
                    let existente = datosPistas.find(p => p.id === idPista);

                    // Si existe remplazamos los datos
                    if (existente) {
                        datosPistas[index] = {
                            id: idPista,
                            nombre: nombre,
                            capacidad: capacidad,
                            precio: precio
                        }
                    }
                    // En el caso de que no exista lo añadimos
                    else {
                        datosPistas.push({
                            id: idPista,
                            nombre: nombre,
                            capacidad: capacidad,
                            precio: precio
                        })
                    }

                })

                // Comprobamos el estado del switch que nos dice si se puede hacer solo reserva completa (no hay pistas), o se puede hacer una reserva parcial
                if (checked) {

                    $('#accordionEditarPistas').empty() // --> Vaciamos el contenedor de los accordion

                    $('#accordionEditarPistas').append(`<div class="w-50">
                                                        Selecciona las imágenes de la pista (máx 4)
                                                        <label class="btn btn-primary mt-1">
                                                            Imagenes
                                                            <input class="imagenesEditarNoPistas" type="file" name="imagenesEditarNoPista[]" multiple accept="image/*" hidden>
                                                        </label>
                                                    </div>`)

                }
                else {

                    // Si está desactivado el switch, volvemos a dibujar las pistas guardadas en datosPistas
                    $('#accordionEditarPistas').empty(); // --> Vaciamos el contenedor de los accordion para evitar duplicados

                    if (!estadoInicial) {
                        // Si hay datos, es decir, el array no esta vacía lo recorremos y creamos los accordion
                        if (datosPistas.length !== 0) {

                            // Recorremos el array con los datos de las pistas
                            datosPistas.map((pista) => {

                                // Creamos el accordion
                                let acordion = `
                                <div class="accordion-item mt-3 accordionEditarPista" data-index="${pista.id}">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button nuevaPista collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${pista.id}" aria-expanded="true" aria-controls="${pista.id}">
                                            <div>${pista.nombre}&nbsp;<i class="bi bi-pencil-square"></i></div>
                                        </button>
                                    </h2>
                                    <div id="${pista.id}" class="accordion-collapse collapse">
                                        <div class="accordion-body">
                                            <div class="row gap-5">
                                                <div class="col">
                                                    <label>Nombre: <span class="campo-obligatorio">*</span></label>
                                                    <input type="text" class="form-control nombrePistaEditar" placeholder="Ej: Pista de padel nº 1" value="${pista.nombre}">
                                                </div>
                                            </div>
                                            <div class="row gap-5 mt-3">
                                                <div class="col">
                                                    <label>Capacidad de la Pista: <span class="campo-obligatorio">*</span></label>
                                                    <input type="text" class="form-control capacidadPistaEditar" placeholder="Ej: 4" value="${pista.capacidad}">
                                                </div>
                                                <div class="col">
                                                    <label>Precio de la Pista: <span class="campo-obligatorio">*</span></label>
                                                    <input type="text" class="form-control precioPistaEditar" placeholder="Ej: 21" value="${pista.precio}">
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-start mt-4">
                                                <div class="w-50">
                                                    Selecciona las imágenes de la pista (máx 4)
                                                    <label class="btn btn-primary mt-1">
                                                        Imagenes
                                                        <input class="imagenesEditar" type="file" name="imagenesEditar[]" multiple accept="image/*" hidden>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-2 mt-3 justify-content-end botonesPista">
                                                <button class="btn btn-danger borrarPistaEditar">Borrar <i class="bi bi-x-lg"></i></button>
                                                <button class="btn btn-primary guardarPistaEditar" disabled >Guardar <i class="bi bi-check-lg"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
                                // Los añadimos al modal
                                $('#accordionEditarPistas').append(acordion)
                            })
                        }
                    }

                    // Creamos el accordion de nueva pista para darnos la posibilidad de crear una nueva pista
                    let accordionNuevo = `
                        <div class="accordion-item mt-3 accordionNuevaPista" data-index="${nuevoId}">
                            <h2 class="accordion-header">
                                <button class="accordion-button nuevaPista collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${nuevoId}" aria-expanded="true" aria-controls="${nuevoId}">
                                    <div>Añadir Pista&nbsp;<i class="bi bi-plus-circle"></i></div>
                                </button>
                            </h2>
                            <div id="${nuevoId}" class="accordion-collapse collapse">
                                <div class="accordion-body">
                                    <div class="row gap-5">
                                        <div class="col">
                                            <label>Nombre: <span class="campo-obligatorio">*</span></label>
                                            <input type="text" class="form-control nombrePista" placeholder="Ej: Pista de padel nº 1">
                                        </div>
                                    </div>
                                    <div class="row gap-5 mt-3">
                                        <div class="col">
                                            <label>Capacidad de la Pista: <span class="campo-obligatorio">*</span></label>
                                            <input type="text" class="form-control capacidadPista" placeholder="Ej: 4" >
                                        </div>
                                        <div class="col">
                                            <label>Precio de la Pista: <span class="campo-obligatorio">*</span></label>
                                            <input type="text" class="form-control precioPista" placeholder="Ej: 21" >
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
                                        <button class="btn btn-danger borrarPista">Borrar <i class="bi bi-x-lg"></i></button>
                                        <button class="btn btn-primary guardarPistaNuevaEditar">Guardar <i class="bi bi-check-lg"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `

                    // Lo añadimos al contenedor de los accordions 
                    $('#accordionEditarPistas').append(accordionNuevo);
                }
            },
            complete: function (event) {

                // Obtenemos los btns de los accordions
                let headerBtn = $('#accordionEditarPistas .accordion-header .accordion-button');

                // Como ya ha cargado le ponemos el color negro
                headerBtn.css("color", "#000", "important")

                // Ocultar loader siempre, éxito o error
                $("#loader").hide();
            }
        });

    });


    // Evento que controla el switch que nos indica si se puede hacer una reserva completa o no. En el caso de que si habilita los campos de precio completo y capacidad completa
    $('#puedeCompletoEditar').on('change', function (event) {

        event.preventDefault();

        // Comprobamos el estado del switch que nos dice si se puede hacer una reserva completa
        let checked = $(this).is(':checked');

        // Comprobamos que no este seleccionado ni el no pistas no el puede hacerse reserva solo completa para deshabilitar los campos de precio y capacidad completa
        if (!checked && !$('#modalEditarInstalacion #noPistasEditar').is(':checked')) {
            $('#modalEditarInstalacion #capacidadCompletoEditar').prop('readonly', true); // --> Hacemos que el campo de la capacidad completa solo se pueda leer
            $('#modalEditarInstalacion #capacidadCompletoEditar').css('color', '#ccc'); // --> Hacemos que el campo de la capacidad completa sea de color #ccc para dar sensación de no editable

            $('#modalEditarInstalacion #precioCompletoEditar').prop('readonly', true); // --> Hacemos que el campo del precio completa solo se pueda leer
            $('#modalEditarInstalacion #precioCompletoEditar').css('color', '#ccc'); // --> Hacemos que el campo del precio completa sea de color #ccc para dar sensación de no editable


        }
        else {
            $('#modalEditarInstalacion #capacidadCompletoEditar').prop('readonly', false); // --> Hacemos que el campo de la capacidad completa se pueda editar
            $('#modalEditarInstalacion #capacidadCompletoEditar').css('color', '#000'); // --> Hacemos que el campo de la capacidad completa tenga el color #000 dando la sensación de que ya es editable

            $('#modalEditarInstalacion #precioCompletoEditar').prop('readonly', false); // --> Hacemos que el campo del precio completo se pueda editar
            $('#modalEditarInstalacion #precioCompletoEditar').css('color', '#000'); // --> Hacemos que el campo del precio completo tenga el color #000 dando la sensación de que ya es editable
        }

    })




    // Evento que cuando pulsamos el btn de borrar una pista, lanzamos una un mensaje para que el usuario se asegure de que quiere elminar la pista
    $(document).on('click', '.borrarPistaEditar', function (event) {

        event.preventDefault();

        let idPista = parseInt($(this).closest('.accordion-item').data('index')); // --> Obtenemos el id de la pista
        $('#modalBorraPista').data('index', idPista) // --> Guardamos el id de la pista en el data-index del modal de borrar la pista 

        // Petición ajax al back con la que obtenemos la información sobre la pista
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/infoPista`, // --> URL donde va destinada la peticion
            data: { id: idPista },
            dataType: "json",
            success: function (response) {
                let pista = response.pista[0]; // --> Obtenemos las pistas

                // Actualizamos el texto
                $('#modalBorraPista .pregunta-borrado h2').text(
                    `¿Desea eliminar la instalación ${pista.nombre_pista}?`
                );

                if(parseInt(pista.reservas) > 0 ) {
                    let nodoReserva1 = $(`<p>Esta pista tiene las siguientes reservas asociadas. El borrado de la pista significará el borrado de las reservas</p>`)
                    let nodoReservas = $(`  
                                            <div>
                                                <div class="numero-reservas-pista">
                                                    <span>Nº RESERVAS</span>
                                                    <h2>${pista.reservas}</h2>
                                                </div>

                                                <div class="proxima-reserva-pista">
                                                    <span>PRÓX RESERVA</span>
                                                    <h2>${(pista.proxima_reserva) !== null ? formatearFecha(pista.proxima_reserva) : "---"}</h2>
                                                </div>

                                            </div>`
                                        )

                    $('#modalBorraPista .reservas-pista').empty();
                    $('#modalBorraPista .reservas-pista').append(nodoReserva1)
                    $('#modalBorraPista .reservas-pista').append(nodoReservas)

                    $('#modalBorraPista .reservas-pista').data('reservas', 1)
                }
                else {
                    $('#modalBorraPista .reservas-pista').empty();
                    $('#modalBorraPista .reservas-pista').data('reservas', 0)
                }

                // Guardamos la posición actual del scroll del modal de fondo para que el modal se abra en esa posicion
                let scrollTop = $('#modalEditarInstalacion .modal-dialog').scrollTop();

                // Inicializamos el modal de borrado. Para poder abrir dos a la vez lo abrimos por la API de bootstrap
                let modalBorra = new bootstrap.Modal(document.getElementById('modalBorraPista'), {
                    backdrop: true
                });

                // Ajustamos z-index y mostramos
                let modalBorraEl = document.getElementById('modalBorraPista');
                modalBorraEl.style.zIndex = 1060;
                modalBorra.show();

                // Ajustamos el scroll para abrir donde estabas en el modal de fondo
                modalBorraEl.querySelector('.modal-dialog').scrollTop = scrollTop;

                // Ajustamos backdrop
                $('.modal-backdrop').last().addClass('nested');
            }
        });
    });




    // Evento en el que borramos la pista al aceptar el mensaje. Además se borrará el accordión de la pista
    $(document).on('click', '.aceptarBorrarEditar', function (event) {

        event.preventDefault();

        // Obtenemos el id de la pista que queremos eliminar
        let id = parseInt($('#modalBorraPista').data('index'));
        let reservas = parseInt($('#modalBorraPista .reservas-pista').data('reservas'))

        // Hago una petición ajax al back para eliminar la pista de la base de datos
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/borrarPista`, // --> URL a donde va la petición
            data: { id: id, reservas: reservas },
            dataType: "json",
            success: function (response) {

                let accordion = $(`#modalEditarInstalacion #accordionEditarPistas .accordion-item[data-index="${id}"]`) // --> Obtenemos el accordion de la pista
                accordion.remove() // --> Borramos el accordion
                // Cerramos el modal de borrar pistas 
                let modal = bootstrap.Modal.getInstance(document.getElementById('modalBorraPista'));
                modal.hide();

            }
        });
    })



    // Evento en el que controlamos la subida de imágenes. Controlamos cada vez que vayamos a subir o editar los archivos.
    $('#accordionEditarPistas').on('change', '.imagenesEditarNuevaPista', function (event) {

        event.preventDefault();

        const maxArchivos = 4; // --> Número máximo de imágenes que podemos subir. En este caso 4
        const archivos = this.files; // --> Archivos que hemos subido

        // Comprobamos que no se supere el número máximo de archivos establecido
        if (archivos.length > maxArchivos) {
            alert('Solo puedes seleccionar un máximo de 4 imágenes.');
            this.value = '';
            return;
        }

        // Guardamos las imágenes
        const body = $(this).closest('.accordion-body');
        body.data('imagenesPistaEditarNueva', archivos);
    });


    // Evento en el que controlamos la subida de imágenes. Controlamos cada vez que vayamos a subir o editar los archivos.
    $('#accordionEditarPistas').on('change', '.imagenesEditar', function (event) {

        event.preventDefault();

        const maxArchivos = 4; // --> Número máximo de imágenes que podemos subir. En este caso 4
        const archivos = this.files; // --> Archivos que hemos subido

        // Comprobamos que no se supere el número máximo de archivos establecido
        if (archivos.length > maxArchivos) {
            alert('Solo puedes seleccionar un máximo de 4 imágenes.');
            this.value = '';
            return;
        }


        // Guardamos las imágenes
        const body = $(this).closest('.accordion-body');
        body.data('imagenesEditar', archivos);


        let btnGuardar = $(this).closest('.accordion-item').find('.guardarPistaEditar');
        if (archivos.length > 0) {
            btnGuardar.prop('disabled', false);
        }
    });



    // Evento en el que guardamos una pista nueva en el modal de editar instalación. Esta funcionalidad nos permite añadir una pista nueva a una instalación ya creada
    $(document).on('click', '.guardarPistaNuevaEditar', function (event) {

        event.preventDefault();

        // Obtenemos el accordion
        let accordionPistaNueva = $(this).closest('.accordionNuevaPista')

        // Obtenemos los datos de la nueva pista
        let nombre = $(this).closest('.accordionNuevaPista').find('.nombrePista').val() // --> nombre de la pista
        let capacidad = $(this).closest('.accordionNuevaPista').find('.capacidadPista').val() // --> capacidad de la pista
        let precio = $(this).closest('.accordionNuevaPista').find('.precioPista').val() // --> precio de la pista
        let archivos = $(this).closest('.accordion-body').find('.imagenesEditarNuevaPista')[0].files;


        // Obtenemos el id de la instalación
        let idInstalacion = $(this).closest('#modalEditarInstalacion').data('index')

        // Creamos el formData
        let formData = new FormData()

        formData.append('nombre_pista', nombre)
        formData.append('capacidad_pista', capacidad)
        formData.append('precio_pista', precio)
        formData.append('id_instalacion', idInstalacion)

        for (let i = 0; i < archivos.length; i++) {
            formData.append('imagenes[]', archivos[i]);
        }

        // Hacemos la petición ajax al back para enviar los datos de la pista a crear
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/crearPista`, // --> URL a donde enviaremos la petición
            data: formData,
            processData: false, // Importante para enviar FormData
            contentType: false, // Importante para enviar FormData
            dataType: 'json',
            success: function (response) {

                // Si todo ha ido bien creamos un accordion con los nuevos datos

                // Obtenemos el id de la nueva pista
                let id = parseInt(response.id_pista)

                // Creamos un nuevo accordion
                let acordion = `
                                <div class="accordion-item mt-3 accordionEditarPista" data-index="${id}">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button nuevaPista collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="true" aria-controls="${id}">
                                            <div>${nombre}&nbsp;<i class="bi bi-pencil-square"></i></div>
                                        </button>
                                    </h2>
                                    <div id="${id}" class="accordion-collapse collapse">
                                        <div class="accordion-body">
                                            <div class="row gap-5">
                                                <div class="col">
                                                    <label>Nombre: <span class="campo-obligatorio">*</span></label>
                                                    <input type="text" class="form-control nombrePistaEditar" placeholder="Ej: Pista de padel nº 1" value="${nombre}">
                                                </div>
                                            </div>
                                            <div class="row gap-5 mt-3">
                                                <div class="col">
                                                    <label>Capacidad de la Pista: <span class="campo-obligatorio">*</span></label>
                                                    <input type="text" class="form-control capacidadPistaEditar" placeholder="Ej: 4" value="${capacidad}">
                                                </div>
                                                <div class="col">
                                                    <label>Precio de la Pista: <span class="campo-obligatorio">*</span></label>
                                                    <input type="text" class="form-control precioPistaEditar" placeholder="Ej: 21" value="${precio}">
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-start mt-4">
                                                <div class="w-50">
                                                    Selecciona las imágenes de la pista (máx 4)
                                                    <label class="btn btn-primary mt-1">
                                                        Imagenes
                                                        <input class="imagenesEditar" type="file" name="imagenesEditar[]" multiple accept="image/*" hidden>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-2 mt-3 justify-content-end botonesPista">
                                                <button class="btn btn-danger borrarPistaEditar">Borrar <i class="bi bi-x-lg"></i></button>
                                                <button class="btn btn-primary guardarPistaEditar" disabled >Guardar <i class="bi bi-check-lg"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `

                // Lo añadimos delante del accordion de nueva pista
                accordionPistaNueva.before(acordion);

                // Vacimamos los campos del accordion de la pista nueva
                accordionPistaNueva.find('.nombrePista').val(''); // --> Vaciamos el campo de nombre
                accordionPistaNueva.find('.capacidadPista').val('') // --> Vaciamos el campo de capacidad
                accordionPistaNueva.find('.precioPista').val('') // --> Vaciamos el campo de precio

                // Cerramos el accordion de la pista nueva
                accordionPistaNueva.collapse('hide')

            }
        });


    });

    // Evento en el que controlamos el guardado de la instalación editada. Cuando hacemos click al btn de editar instalación, obtenemos los valores de los campos y los enviamos al backend. Antes de mandarlos al backend hacemos una serie de comprobaciones para ver si la información es correcta
    $(document).on('click', '#guardarInstalacionEditar', function (event) {

        event.preventDefault();

        let errores = []; // --> Array donde guardaremos los errores que vayamos encontrando
        $('#modalEditarInstalacion .alertModal').empty(); // --> Vaciamos el contenedor de alertas

        // Variables principales
        const id = $('#modalEditarInstalacion').data('index');
        const nombre = $('#nombreInstalacionEditar').val().trim();
        const categoria = parseInt($('#categoriasEditar').val());
        let categoriaSecundaria = 0;
        const iluminacionEditar = $('#iluminacionEditar').is(':checked');
        const materialEditar = $('#materialEditar').is(':checked');
        const noPistas = $('#noPistasEditar').is(':checked');
        const puedeCompleta = $('#puedeCompletoEditar').is(':checked');
        const sinHorario = $('#sinHorarioEditar').is(':checked');
        const capacidadCompleta = $('#capacidadCompletoEditar').val();
        const precioCompleto = $('#precioCompletoEditar').val();
        const descripcion = $('#descripcionEditar').val().trim();
        const direccion = $('#direccionEditar').val();

        // Obtener categoría secundaria
        $('#subcategoriasEditar input:checked').each(function (event) {

            categoriaSecundaria = $(this).val();
        });

        // Validaciones básicas
        if (!nombre) errores.push('El nombre no puede estar vacío');
        if (isNaN(categoria) || categoria === -1) errores.push('Debes seleccionar una categoría');
        if (!descripcion) errores.push('La descripción no puede estar vacía');
        if (!direccion) errores.push('La direccion no puede estar vacía');

        // Validaciones de capacidad y precio
        if ((puedeCompleta || noPistas) && (isNaN(parseInt(precioCompleto)) || precioCompleto < 0)) {
            errores.push("Debes introducir un precio válido");
        }

        if ((puedeCompleta || noPistas) && (isNaN(capacidadCompleta) || capacidadCompleta <= 0)) {
            errores.push("Debes introducir una capacidad válida");
        }

        // Comprobamos número de pistas
        const numPistas = $('#accordionEditarPistas .accordionEditarPista').length;
        if (numPistas === 0 && !noPistas) {
            errores.push("Si no ha seleccionado la opción de 'No tiene pistas', debe crear al menos una pista");
        }

        // Imágenes (solo si noPistas está activado, pero no obligatorias)
        let imagenesNoPistasEditar = null;
        if (noPistas) {
            const inputImagenes = $('#accordionEditarPistas .imagenesEditarNoPistas');
            if (inputImagenes.length > 0 && inputImagenes[0].files.length > 0) {
                imagenesNoPistasEditar = inputImagenes[0].files;
            }
        }

        // Mostrar errores si los hay
        if (errores.length > 0) {
            const listaErrores = errores.map(e => `<li>${e}</li>`).join('');
            const alertBox = $(`
            <div class="alert alert-danger mb-0" role="alert">
                <ul class="mb-0">${listaErrores}</ul>
            </div>
        `);
            $('#modalEditarInstalacion .alertModal').prepend(alertBox);
            return;
        }

        // ---- Si no hay errores ----
        const formData = new FormData();
        formData.append('id', id);
        formData.append('nombre', nombre);
        formData.append('categoria', categoria);
        formData.append('categoriaSec', categoriaSecundaria);
        formData.append('iluminacion', iluminacionEditar);
        formData.append('material', materialEditar);
        formData.append('noPistas', noPistas);
        formData.append('puedeCompleta', puedeCompleta);
        formData.append('noPistas', noPistas);
        formData.append('puedeCompleta', puedeCompleta);
        formData.append('sinHorario', sinHorario);
        formData.append('capacidadCompleta', capacidadCompleta);
        formData.append('precioCompleto', precioCompleto);
        formData.append('descripcion', descripcion);
        formData.append('direccion', direccion);

        if (imagenesNoPistasEditar) {
            for (let i = 0; i < imagenesNoPistasEditar.length; i++) {
                formData.append('imagenesEditarNoPista[]', imagenesNoPistasEditar[i]);
            }
        }

        // Petición AJAX al backend para guardar los datos de la instalación editada
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/editarInstalacionBD`,
            data: formData,
            contentType: false,
            processData: false,
            dataType: "json",
            // beforeSend: function (event) {
            //     $("#loader").show();
            // },
            success: function (response) {
                $("#loader").hide();
                $('#modalEditarInstalacion').modal('hide');
            },
            error: function (xhr, status, error) {
                $("#loader").hide();
                console.error("Error al guardar la instalación:", error);
                const alertBox = $(`
                <div class="alert alert-danger mb-0" role="alert">
                    <ul class="mb-0"><li>Ha ocurrido un error al guardar la instalación. Intente nuevamente.</li></ul>
                </div>
            `);
                $('#modalEditarInstalacion .alertModal').prepend(alertBox);
            }
        });
    });


    /***********************************************************************************************************************************
    ***********************************************************  DAR DE BAJA  **********************************************************
    ***********************************************************************************************************************************/

    // Evento que controla el btn de dar de baja una instalación. Lo que hacemos es un "borrado lógico", es decir, cambiar el estado a inactivo. Lo que hace este eneto es abrir el modal de confirmación y mostrar el nombre de la instalación a dar de baja
    $(document).on('click', '.btnDarBaja', function (event) {

        event.preventDefault();

        let index = $(this).closest('tr').data('index'); // --> Obtenemos el id de la instalación a dar de baja

        // Petición ajax al back para obtener el nombre de la instalación y mostrarlo en el modal
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/mensajeDarBajaInstalacion`, // --> URL donde va destinada la petición
            data: { id: index },
            dataType: "json",
            success: function (response) {

                // Ponemos el texto del modal
                $('#modalBajaInstalacion h2').text("¿Está seguro que quiere dar de baja la instalación: " + response.instalacion[0].nombre + "?");
                // Guardamos el índice en el modal para usarlo después
                $('#modalBajaInstalacion').data('index', index);

                // Mostramos el modal
                $('#modalBajaInstalacion').modal('show');
            }
        });
    })

    // Evento que controla el btn de aceptar la baja de una instalación. Aquí es donde hacemos la petición ajax al backend para cambiar el estado de la instalación a inactivo  
    $(document).on('click', '.aceptarBajaInstalacion', function (event) {

        event.preventDefault();

        // Petición ajax al back para dar de baja la instalación
        let index = $('#modalBajaInstalacion').data('index');
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/darBajaInstalacion`, // --> URL donde va destinada la petición
            data: { id: index },
            dataType: "json",
            success: function (response) {

                // Cambiamos el color de la fila a rojo para indicar que está dada de baja
                $(`#tablaInstalaciones tr[data-index="${index}"]`).addClass('table-danger');

                // Añadimos el icono de información en la última columna
                $(`#tablaInstalaciones tr[data-index="${index}"] td:last`).append(
                    `
                    <div class="d-flex justify-content-between align-items-center w-100">
                        <i class="bi bi-info-circle"
                        data-bs-toggle="tooltip" data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="Esta instalación está dada de baja"></i>
                        <div id="loader${index}>" class="loader2" style="display: none"></div>
                    </div>
                    `
                )

                // Cambiamos el btn de dar de baja por el de dar de alta
                $(`tr[data-index="${index}"] .btnDarBaja`).addClass('btnDarAlta').removeClass('btnDarBaja').html('Dar de alta <i class="bi bi-check-lg"></i>');

                // Cerramos el modal
                $('#modalBajaInstalacion').modal('hide');
            }
        });
    })

    // Evento que controla el btn de dar de alta una instalación. Aquí es donde hacemos la petición ajax al backend para cambiar el estado de la instalación a activo
    $(document).on('click', '.btnDarAlta', function (event) {

        event.preventDefault();

        let index = $(this).closest('tr').data('index'); // --> Obtenemos el id de la instalación a dar de alta

        // Petición ajax al back para dar de alta la instalación
        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/darAlta`, // --> URL donde va destinada la petición
            data: { id: index },
            dataType: "json",
            // beforeSend: function (event) {

            //     // Activamos el loader
            //     $(`#loader${index}`).show();
            // },
            success: function (response) {

                // Quitamos el loader
                $(`#loader${index}`).hide();

                // Cambiamos el color de la fila a normal para indicar que está dada de alta
                $(`tr[data-index="${index}"]`).removeClass('table-danger');

                // Quitamos el icono de información de la última columna
                $(`tr[data-index="${index}"] td:last i`).remove();

                // Cambiamos el btn de dar de alta por el de dar de baja
                $(`tr[data-index="${index}"] .btnDarAlta`).addClass('btnDarBaja').removeClass('btnDarAlta').html('Dar de baja <i class="bi bi-x-lg"></i>');
            },
            complete: function (event) {

                // Ocultar loader siempre, éxito o error
                $(`#loader${index}`).hide();
            }
        });
    });


    /***********************************************************************************************************************************
    *******************************************************  BORRAR INSTALACIÓN  *******************************************************
    ***********************************************************************************************************************************/

    // Evento que controla el btn de borrar una instalación. Lo que hace este eneto es abrir el modal de confirmación y mostrar el nombre de la instalación a borrar, además de sus datos y pistas
    $(document).on('click', '.btnBorrarInstalacion', function (event) {

        event.preventDefault();

        $('#accordionBorrarPistas').empty()

        let index = $(this).closest('tr').data('index'); // --> Obtenemos el id de la instalación a borrar 
        $('#modalBorrarInstalacion').data('index', index) // --> Guardamos el id de la instalación en el data-index del modal de borrar la instalación

        console.log(index);

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/mensajeBorrarInstalacion`,
            data: { id: index },
            dataType: "json",
            success: function (response) {

                // Ponemos el texto del modal
                $('#modalBorrarInstalacion h5 span').text(response.instalacion[0].nombre);
                $('#nombreInstalacionBorrar').val(response.instalacion[0].nombre).prop('readonly', true);
                $('#categoriasBorrar').val(response.instalacion[0].categoria_name).prop('readonly', true);
                $('#categoriaSecundariaBorrar').val((response.instalacion[0].categoria_secundaria_name) ? response.instalacion[0].categoria_secundaria_name : 'No hay ninguna categoría secundaria seleccionada').prop('readonly', true);
                $('#noPistasBorrar').prop('checked', response.instalacion[0].no_pistas == 1).prop('disabled', true);
                $('#puedeCompletoBorrar').prop('checked', response.instalacion[0].puede_completo == 1).prop('disabled', true);
                $('#capacidadCompletoBorrar').val(response.instalacion[0].capacidad_completo).prop('readonly', true);
                $('#precioCompletoBorrar').val(response.instalacion[0].precio_completo).prop('readonly', true);
                $('#descripcionBorrar').val(response.instalacion[0].descripcion).prop('readonly', true);
                $('#direccionBorrar').val(response.instalacion[0].direccion).prop('readonly', true);

                $('#modalBorrarInstalacion').data('index', response.instalacion[0].id_instalacion);

                // Ahora obtenemos las pistas de la instalación y las mostramos 
                let pistas = response.pistas; // --> Obtenemos las pistas

                pistas.map(pista => {

                    let accordion = '';

                    if(parseInt(pista.completa) === 0){
                                            accordion = `
                     <div class="accordion-item" data-index="${pista["id_pista"]}">
                                    <h2 class="accordion-header">
                                    <button 
                                        class="accordion-button nuevaPista collapsed d-flex justify-content-start" 
                                        type="button" 
                                        data-bs-toggle="collapse" 
                                        data-bs-target="#collapse-${pista["id_pista"]}" 
                                        aria-expanded="false" 
                                        aria-controls="collapse-${pista["id_pista"]}">
                                        <div>${pista["nombre_pista"]}</div>
                                    </button>
                                    </h2>
                                    <div id="collapse-${pista["id_pista"]}" 
                                        class="accordion-collapse collapse" 
                                        data-bs-parent="#accordionPistas">
                                    <div class="accordion-body">
                                                                                <div class="galeria-imagenes-pistas">
                                            

                                            <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
        <img src="${BASE_URL}images/${pista["imagen1"]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${BASE_URL}images/${pista["imagen2"]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${BASE_URL}images/${pista["imagen3"]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${BASE_URL}images/${pista["imagen4"]}" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
                                        </div>

                                        <div class="row gap-5 mt-3">
                                        <div class="col">
                                            <div class="row">
                                                <div class="col-7"><label>Capacidad de la Pista:</label></div>
                                                <div class="col-5"><p>${pista["capacidad_pista"]}</p></div>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="row">
                                                <div class="col"><label>Precio de la Pista:</label></div>
                                                <div class="col"><p>${pista["precio_pista"]}</p></div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                    `;
                    }


                    $('#accordionBorrarPistas').append(accordion);
                })



                $('#modalBorrarInstalacion').modal('show');
            }
        });


    });


    // Evento que controla el btn de aceptar el borrado de una instalación. Aquí es donde hacemos la petición ajax al backend para borrar la instalación de la base de datos
    $(document).on('click', '#aceptarBorrarInstalacion', function () {

        let index = $('#modalBorrarInstalacion').data('index'); // --> Obtenemos el id de la instalación a borrar

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/borrarInstalacion`, // --> URL donde va destinada la petición
            data: { id: index },
            dataType: "json",
            success: function (response) {

                $('#modalBorrarInstalacion').modal('hide');

                // Cambiamos el color de la fila a rojo para indicar que está dada de baja
                $(`tr[data-index="${index}"]`).remove()

                window.animarFilasGestor();
            }
        })
    });


    /***********************************************************************************************************************************
    **************************************************** FILTRADO CRUD INSTALACIONES  **************************************************
    ***********************************************************************************************************************************/
    
    // Función que desmarca y marca el checkbox del material dependiendo de la opción seleccionada, simulando el comportamiento de un input radio
    $(document).on('change', '.material input', function(){

        if ($(this).is(':checked')) {
            // Desmarca todos los demás checkboxes dentro del mismo grupo .material
            $('.material input').not(this).prop('checked', false);
        }
    })

    // Función que desmarca y marca el checkbox de la iluminacion dependiendo de la opción seleccionada, simulando el comportamiento de un input radio
    $(document).on('change', '.iluminacion input', function(){

        if ($(this).is(':checked')) {
            // Desmarca todos los demás checkboxes dentro del mismo grupo .iluminacion
            $('.iluminacion input').not(this).prop('checked', false);
        }
    })


    // Función que desmarca y marca el checkbox de la reserva completa dependiendo de la opción seleccionada, simulando el comportamiento de un input radio
    $(document).on('change', '.reservaCompleta input', function(){

        if ($(this).is(':checked')) {
            // Desmarca todos los demás checkboxes dentro del mismo grupo .reservaCompleta
            $('.reservaCompleta input').not(this).prop('checked', false);
        }
    })


    // Función que desmarca y marca el checkbox de las pistas dependiendo de la opción seleccionada, simulando el comportamiento de un input radio
    $(document).on('change', '.hayPistas input', function(){

        if ($(this).is(':checked')) {
            // Desmarca todos los demás checkboxes dentro del mismo grupo .hayPistas
            $('.hayPistas input').not(this).prop('checked', false);
        }
    })

    let filter = {};  
    $(document).on('click', '#btnFiltrarGestorInstalaciones', function(){
    
    if(filter === null) filter = {}

    let nombre = $('#filtradoNombre').val();
    if(nombre !== "") filter["nombre"] = nombre;

    let categoria = $('#filtradoCategoria').val();
    let categoriaNombre = $('#filtradoCategoria option:selected').text();
    if(parseInt(categoria) !== -1) filter["categoria"] = categoria;

    let hayPistas = null;
    if($('#siPistas').is(':checked')) hayPistas = 0;
    if($('#noPistas').is(':checked')) hayPistas = 1;
    if(hayPistas !== null) filter["no_pistas"] = hayPistas;

    let puedeCompleto = null;
    if($('#siCompleta').is(':checked')) puedeCompleto = 1;
    if($('#noCompleta').is(':checked')) puedeCompleto = 0;
    if(puedeCompleto !== null) filter["puede_completo"] = puedeCompleto;

    let iluminacion = null;
    if($('#siLuz').is(':checked')) iluminacion = 1;
    if($('#noLuz').is(':checked')) iluminacion = 0;
    if(iluminacion !== null) filter["iluminacion"] = iluminacion;

    let material = null;
    if($('#siMaterial').is(':checked')) material = 1;
    if($('#noMaterial').is(':checked')) material = 0;
    if(material !== null) filter["material"] = material;

    
    if(Object.keys(filter).length === 0)
    {
        filter = null;
    }
    else 
    {
        $('#filtrosGestor').empty()
        for(key in filter)
        {
            if (filter.hasOwnProperty(key)) { // recomendable para no iterar propiedades heredadas
                let campo = "";
                let valor = ""
                if(key === "puede_completo")
                {
                    campo = "completo";

                    if(filter[key] === 0)
                        valor = "No"
                    else 
                        valor = "Sí"
                }
                else if((key === "iluminacion")||(key === "material"))
                {
                    if(filter[key] == 0)
                        valor = "No"
                    else 
                        valor = "Sí"

                    campo = key;
                }
                else if(key === "no_pistas")
                {
                    campo = "pistas";
                    if(filter[key] == 0)
                        valor = "Sí"
                    else 
                        valor = "No"
                }
                else if(key === "categoria")
                {
                    valor = categoriaNombre;
                    campo = key;
                }
                else{
                    campo = key;
                    valor = filter[key]
                } 


                let div = $(`<div class="filtroSeleccionado" data-index="${key}"><i class="bi bi-filter"></i> <a>${campo}: ${valor}</a> <button><i class="bi bi-x"></i></button></div>`)
                $('#filtrosGestor').append(div);
            }
    }   
    }


    $.ajax({
        type: "POST",
        url: `${BASE_URL}index.php/crudInstalaciones`,
        data: { filter: filter },
        dataType: "json",
        // beforeSend: function(){
        //     $('#loadertablaInstalaciones').show()
        //     $('#tablaInstalaciones').addClass('tablaCargando')
        // },
        success: function (response) {
            let tbody = $('#tablaInstalaciones tbody');
            tbody.empty();

            let instalaciones = response.instalaciones;
            let cont = 1;

            instalaciones.forEach(instalacion => {

                let estadoClass = (instalacion.estado == 1) ? 'class="table-danger"' : '';

                let tr = $(`
                    <tr data-index="${instalacion.id_instalacion}" ${estadoClass}>
                        <td>${cont++}</td>
                        <td>${instalacion.nombre}</td>
                        <td>${instalacion.categoria_name}</td>
                        <td>${(instalacion.categoria_opcional1 === null) ? '----' : instalacion.categoria_opc_name}</td>
                        <td>
                            <div class="dropdown" style="max-width: 200px;">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item btnVerInstalacion" href="#">Ver &nbsp;<i class="bi bi-eye"></i></a></li>
                                    <li><a class="dropdown-item btnEditarInstalacion" href="#">Editar &nbsp;<i class="bi bi-pencil-square"></i></a></li>
                                    <li><a class="dropdown-item btnBorrarInstalacion" href="#">Borrar &nbsp;<i class="bi bi-trash3"></i></a></li>
                                    ${
                                        (instalacion.estado == 0)
                                        ? `<li><a class="dropdown-item btnDarBaja" href="#">Dar de Baja &nbsp;<i class="bi bi-x-lg"></i></a></li>`
                                        : `<li><a class="dropdown-item btnDarAlta" href="#">Dar de Alta &nbsp;<i class="bi bi-check-lg"></i></a></li>`
                                    }
                                </ul>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex justify-content-between align-items-center w-100">
                                ${
                                    (instalacion.estado == 1)
                                    ? `<i class="bi bi-info-circle"
                                          data-bs-toggle="tooltip" data-bs-placement="top"
                                          data-bs-custom-class="custom-tooltip"
                                          data-bs-title="Esta instalación está dada de baja"></i>`
                                    : ''
                                }
                                <div id="loader${instalacion.id_instalacion}" class="loader2" style="display: none;"></div>
                            </div>
                        </td>
                    </tr>
                `);

                tbody.append(tr);
            });

            // Reinicializar tooltips de Bootstrap (si se usan)
            $('[data-bs-toggle="tooltip"]').tooltip();

            $('#loadertablaInstalaciones').hide()
            $('#tablaInstalaciones').removeClass('tablaCargando')
        },
        complete: function(){
            $('#loadertablaInstalaciones').hide()
            $('#tablaInstalaciones').removeClass('tablaCargando')
        },
        error: function() {
            console.error("Error al obtener las instalaciones.");
            $('#loadertablaInstalaciones').hide()
            $('#tablaInstalaciones').removeClass('tablaCargando')
        }
        });
    });


    $(document).on('click', '.filtroSeleccionado button', function(){

        let index = $(this).closest('.filtroSeleccionado').data('index');

        if(index === "nombre")
        {
            $('#filtradoNombre').val('');
            delete filter.nombre;
        }
        else if(index === "categoria")
        {
            $('#filtradoCategoria').val(-1);
            delete filter.categoria
        }
        else if(index === "no_pistas")
        {
           $('#siPistas').prop('checked', false)
           $('#noPistas').prop('checked', false)
           delete filter.no_pistas
        }
        else if(index === "puede_completo")
        {
            $('#siCompleta').prop('checked', false)
            $('#noCompleta').prop('checked', false)
            delete filter.puede_completo
        }
        else if(index === "iluminacion")
        {
            $('#siLuz').prop('checked', false)
            $('#noLuz').prop('checked', false)
            delete filter.iluminacion
        }
        else if(index === "material")
        {
            $('#siMaterial').prop('checked', false)
            $('#noMaterial').prop('checked', false)
            delete filter.material
        }

        if(Object.keys(filter).length === 0) filter = null

        $(this).closest('.filtroSeleccionado').remove();

        $.ajax({
        type: "POST",
        url: `${BASE_URL}index.php/crudInstalaciones`,
        data: { filter: filter },
        dataType: "json",
        // beforeSend: function(){
        //     $('#loadertablaInstalaciones').show()
        //     $('#tablaInstalaciones').addClass('tablaCargando')
        // },
        success: function (response) {
            let tbody = $('#tablaInstalaciones tbody');
            tbody.empty();

            let instalaciones = response.instalaciones;
            let cont = 1;

            instalaciones.forEach(instalacion => {

                let estadoClass = (instalacion.estado == 1) ? 'class="table-danger"' : '';

                let tr = $(`
                    <tr data-index="${instalacion.id_instalacion}" ${estadoClass}>
                        <td>${cont++}</td>
                        <td>${instalacion.nombre}</td>
                        <td>${instalacion.categoria_name}</td>
                        <td>${(instalacion.categoria_opcional1 === null) ? '----' : instalacion.categoria_opc_name}</td>
                        <td>
                            <div class="dropdown" style="max-width: 200px;">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item btnVerInstalacion" href="#">Ver &nbsp;<i class="bi bi-eye"></i></a></li>
                                    <li><a class="dropdown-item btnEditarInstalacion" href="#">Editar &nbsp;<i class="bi bi-pencil-square"></i></a></li>
                                    <li><a class="dropdown-item btnBorrarInstalacion" href="#">Borrar &nbsp;<i class="bi bi-trash3"></i></a></li>
                                    ${
                                        (instalacion.estado == 0)
                                        ? `<li><a class="dropdown-item btnDarBaja" href="#">Dar de Baja &nbsp;<i class="bi bi-x-lg"></i></a></li>`
                                        : `<li><a class="dropdown-item btnDarAlta" href="#">Dar de Alta &nbsp;<i class="bi bi-check-lg"></i></a></li>`
                                    }
                                </ul>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex justify-content-between align-items-center w-100">
                                ${
                                    (instalacion.estado == 1)
                                    ? `<i class="bi bi-info-circle"
                                          data-bs-toggle="tooltip" data-bs-placement="top"
                                          data-bs-custom-class="custom-tooltip"
                                          data-bs-title="Esta instalación está dada de baja"></i>`
                                    : ''
                                }
                                <div id="loader${instalacion.id_instalacion}" class="loader2" style="display: none;"></div>
                            </div>
                        </td>
                    </tr>
                `);

                tbody.append(tr);
            });

            // Reinicializar tooltips de Bootstrap (si se usan)
            $('[data-bs-toggle="tooltip"]').tooltip();

            $('#loadertablaInstalaciones').hide()
            $('#tablaInstalaciones').removeClass('tablaCargando')
        },
        complete: function(){
            $('#loadertablaInstalaciones').hide()
            $('#tablaInstalaciones').removeClass('tablaCargando')
        },
        error: function() {
            console.error("Error al obtener las instalaciones.");
            $('#loadertablaInstalaciones').hide()
            $('#tablaInstalaciones').removeClass('tablaCargando')
        }
        });

    })


    $(document).on('click', '#btnBorrarFiltrosGestorInstalaciones', function(){

        $('#filtradoNombre').val('');
        $('#filtradoCategoria').val(-1);
        $('#siPistas').prop('checked', false)
        $('#noPistas').prop('checked', false)
        $('#siCompleta').prop('checked', false)
        $('#noCompleta').prop('checked', false)
        $('#siLuz').prop('checked', false)
        $('#noLuz').prop('checked', false)
        $('#siMaterial').prop('checked', false)
        $('#noMaterial').prop('checked', false)


        $('#filtrosGestor').empty();

        $.ajax({
        type: "POST",
        url: `${BASE_URL}index.php/crudInstalaciones`,
        data: { filter: null },
        dataType: "json",
        // beforeSend: function(){
        //     $('#loadertablaInstalaciones').show()
        //     $('#tablaInstalaciones').addClass('tablaCargando')
        // },
        success: function (response) {
            let tbody = $('#tablaInstalaciones tbody');
            tbody.empty();

            let instalaciones = response.instalaciones;
            let cont = 1;

            instalaciones.forEach(instalacion => {

                let estadoClass = (instalacion.estado == 1) ? 'class="table-danger"' : '';

                let tr = $(`
                    <tr data-index="${instalacion.id_instalacion}" ${estadoClass}>
                        <td>${cont++}</td>
                        <td>${instalacion.nombre}</td>
                        <td>${instalacion.categoria_name}</td>
                        <td>${(instalacion.categoria_opcional1 === null) ? '----' : instalacion.categoria_opc_name}</td>
                        <td>
                            <div class="dropdown" style="max-width: 200px;">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item btnVerInstalacion" href="#">Ver &nbsp;<i class="bi bi-eye"></i></a></li>
                                    <li><a class="dropdown-item btnEditarInstalacion" href="#">Editar &nbsp;<i class="bi bi-pencil-square"></i></a></li>
                                    <li><a class="dropdown-item btnBorrarInstalacion" href="#">Borrar &nbsp;<i class="bi bi-trash3"></i></a></li>
                                    ${
                                        (instalacion.estado == 0)
                                        ? `<li><a class="dropdown-item btnDarBaja" href="#">Dar de Baja &nbsp;<i class="bi bi-x-lg"></i></a></li>`
                                        : `<li><a class="dropdown-item btnDarAlta" href="#">Dar de Alta &nbsp;<i class="bi bi-check-lg"></i></a></li>`
                                    }
                                </ul>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex justify-content-between align-items-center w-100">
                                ${
                                    (instalacion.estado == 1)
                                    ? `<i class="bi bi-info-circle"
                                          data-bs-toggle="tooltip" data-bs-placement="top"
                                          data-bs-custom-class="custom-tooltip"
                                          data-bs-title="Esta instalación está dada de baja"></i>`
                                    : ''
                                }
                                <div id="loader${instalacion.id_instalacion}" class="loader2" style="display: none;"></div>
                            </div>
                        </td>
                    </tr>
                `);

                tbody.append(tr);
            });

            // Reinicializar tooltips de Bootstrap (si se usan)
            $('[data-bs-toggle="tooltip"]').tooltip();
            $('#loadertablaInstalaciones').hide()
            $('#tablaInstalaciones').removeClass('tablaCargando')
        },
        complete: function(){
            $('#loadertablaInstalaciones').hide()
            $('#tablaInstalaciones').removeClass('tablaCargando')
        },
        error: function() {
            console.error("Error al obtener las instalaciones.");
            $('#loadertablaInstalaciones').hide()
            $('#tablaInstalaciones').removeClass('tablaCargando')
        }
        });
    })


    $(document).on('click', '.filtroSeleccionado', function(){

        let index = $(this).data('index');

        if(index === "nombre") $('#filtradoNombre').focus();
        if(index === "categoria") $('#filtradoCategoria').focus();
        
        if(index === "no_pistas")
        {
           if($('#siPistas').is(':checked')) $('#siPistas').focus();
           if($('#noPistas').is(':checked')) $('#noPistas').focus();
        }

        if(index === "puede_completo")
        {
            if($('#siCompleta').is(':checked')) $('#siCompleta').focus();
            if($('#noCompleta').is(':checked')) $('#noCompleta').focus();
        }

        if(index === "iluminacion")
        {
            if($('#siLuz').is(':checked')) $('#siLuz').focus();
            if($('#noLuz').is(':checked')) $('#noLuz').focus();
        }

        if(index === "material")
        {
            if($('#siMaterial').is(':checked')) $('#siMaterial').focus();
            if($('#noMaterial').is(':checked')) $('#noMaterial').focus();
        }
    })


    /***********************************************************************************************************************************
    ***************************************************** FILTRADO INSTALACIONES  ******************************************************
    ***********************************************************************************************************************************/
    
    // Función que desmarca y marca el checkbox del material dependiendo de la opción seleccionada, simulando el comportamiento de un input radio
    $(document).on('change', '.materialInstalaciones input', function(){

        if ($(this).is(':checked')) {
            // Desmarca todos los demás checkboxes dentro del mismo grupo .material
            $('.materialInstalaciones input').not(this).prop('checked', false);
        }
    })

    // Función que desmarca y marca el checkbox de la iluminacion dependiendo de la opción seleccionada, simulando el comportamiento de un input radio
    $(document).on('change', '.iluminacionInstalaciones input', function(){

        if ($(this).is(':checked')) {
            // Desmarca todos los demás checkboxes dentro del mismo grupo .iluminacion
            $('.iluminacionInstalaciones input').not(this).prop('checked', false);
        }
    })


    // Función que desmarca y marca el checkbox de la reserva completa dependiendo de la opción seleccionada, simulando el comportamiento de un input radio
    $(document).on('change', '.reservaCompletaInstalaciones input', function(){

        if ($(this).is(':checked')) {
            // Desmarca todos los demás checkboxes dentro del mismo grupo .reservaCompleta
            $('.reservaCompletaInstalaciones input').not(this).prop('checked', false);
        }
    })


    // Función que desmarca y marca el checkbox de las pistas dependiendo de la opción seleccionada, simulando el comportamiento de un input radio
    $(document).on('change', '.hayPistasInstalaciones input', function(){

        if ($(this).is(':checked')) {
            // Desmarca todos los demás checkboxes dentro del mismo grupo .hayPistas
            $('.hayPistasInstalaciones input').not(this).prop('checked', false);
        }
    })

    let filterInstalaciones = {};  
    $(document).on('click', '#btnFiltrarInstalaciones', function(){
    
    if(filterInstalaciones === null) filterInstalaciones = {}

    let nombre = $('#filtradoNombreInstalaciones').val();
    if(nombre !== "") filterInstalaciones["nombre"] = nombre;
    else if(filterInstalaciones.hasOwnProperty("nombre")) delete filterInstalaciones["nombre"]

    let categoria = $('#filtradoCategoriaInstalaciones').val();
    let categoriaNombre = $('#filtradoCategoriaInstalaciones option:selected').text();
    if(parseInt(categoria) !== -1) filterInstalaciones["categoria"] = categoria;
    else if(filterInstalaciones.hasOwnProperty("categoria")) delete filterInstalaciones["categoria"]

    let hayPistas = null;
    if($('#siPistasInstalaciones').is(':checked')) hayPistas = 0;
    if($('#noPistasInstalaciones').is(':checked')) hayPistas = 1;
    if(hayPistas !== null) filterInstalaciones["no_pistas"] = hayPistas;
    else if(filterInstalaciones.hasOwnProperty("no_pistas")) delete filterInstalaciones["no_pistas"]

    let puedeCompleto = null;
    if($('#siCompletaInstalaciones').is(':checked')) puedeCompleto = 1;
    if($('#noCompletaInstalaciones').is(':checked')) puedeCompleto = 0;
    if(puedeCompleto !== null) filterInstalaciones["puede_completo"] = puedeCompleto;
    else if(filterInstalaciones.hasOwnProperty("puede_completo")) delete filterInstalaciones["puede_completo"]

    let iluminacion = null;
    if($('#siLuzInstalaciones').is(':checked')) iluminacion = 1;
    if($('#noLuzInstalaciones').is(':checked')) iluminacion = 0;
    if(iluminacion !== null) filterInstalaciones["iluminacion"] = iluminacion;
    else if(filterInstalaciones.hasOwnProperty("iluminacion")) delete filterInstalaciones["iluminacion"]
    

    let material = null;
    if($('#siMaterialInstalaciones').is(':checked')) material = 1;
    if($('#noMaterialInstalaciones').is(':checked')) material = 0;
    if(material !== null) filterInstalaciones["material"] = material;
    else if(filterInstalaciones.hasOwnProperty("material")) delete filterInstalaciones["material"]

    
    if(Object.keys(filterInstalaciones).length === 0)
    {
        filterInstalaciones = null;
    }
    else 
    {
        $('#filtrosInstalaciones').empty()
        for(key in filterInstalaciones)
        {
            if (filterInstalaciones.hasOwnProperty(key)) { // recomendable para no iterar propiedades heredadas
                let campo = "";
                let valor = ""
                if(key === "puede_completo")
                {
                    campo = "completo";

                    if(filterInstalaciones[key] === 0)
                        valor = "No"
                    else 
                        valor = "Sí"
                }
                else if((key === "iluminacion")||(key === "material"))
                {
                    if(filterInstalaciones[key] == 0)
                        valor = "No"
                    else 
                        valor = "Sí"

                    campo = key;
                }
                else if(key === "no_pistas")
                {
                    campo = "pistas";
                    if(filterInstalaciones[key] == 0)
                        valor = "Sí"
                    else 
                        valor = "No"
                }
                else if(key === "categoria")
                {
                    valor = categoriaNombre;
                    campo = key;
                }
                else{
                    campo = key;
                    valor = filterInstalaciones[key]
                } 


                let div = $(`<div class="filtroSeleccionadoInstalaciones" data-index="${key}"><i class="bi bi-filter"></i> <a>${campo}: ${valor}</a> <button><i class="bi bi-x"></i></button></div>`)
                $('#filtrosInstalaciones').append(div);
            }
    }   
    }


    $.ajax({
    type: "POST",
    url: `${BASE_URL}index.php/instalaciones`,
    data: { filterInstalaciones: filterInstalaciones },
    dataType: "json",
    // beforeSend: function(){
    //     $('#loaderInstalaciones').show();
    //     $('#contenedor-instalaciones .card-instalacion').addClass('card-cargando');
    // },
    success: function (response) {
        let body = $('#contenedor-instalaciones');
        body.empty();
        
        // Verificar si hay instalaciones
        if (response.instalaciones && response.instalaciones.length > 0) {
            response.instalaciones.forEach(instalacion => {
                let card = $(`
                    <div class="card-instalacion" data-index="${instalacion.id_instalacion}">
                        <div class="card-image" style="background: url('images/${instalacion.imagen1}'); background-size: cover; background-position: center;"></div>
                        <div class="category">${instalacion.categoria_name}</div>
                        <div class="heading">${instalacion.nombre}</div>
                        <div class="opciones">
                            ${instalacion.iluminacion == 1 ? '<span>Iluminación</span>' : ''}
                            ${instalacion.puede_completo == 1 ? '<span>Reserva completa</span>' : ''}
                            ${instalacion.no_pistas == 1 ? '<span>No tiene pistas</span>' : ''}
                            ${instalacion.material == 1 ? '<span>Material</span>' : ''}
                        </div>
                        <div class="button">
                            <a href="${BASE_URL}index.php/instalacion/${instalacion.id_instalacion}" class="btn-primary-personal">
                                Ir a instalación &nbsp;<i class="bi bi-arrow-right"></i>
                            </a>
                        </div>
                        <span class="estado ${instalacion.estado == 0 ? 'disponible' : 'no-disponible'}">
                            ${instalacion.estado == 0 ? 'disponible' : 'no disponible'}
                        </span>
                    </div>
                `);
                body.append(card);
            });
        } else {
            // Mostrar mensaje de "sin resultados"
            body.html(`
                <div class="empty-state" style="grid-column: 1 / -1; max-width: none; width: 100%">
                    <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h2>No hay instalaciones disponibles</h2>
                    <p>En este momento no tenemos instalaciones que coincidan con tu búsqueda. Prueba a ajustar los filtros o vuelve más tarde.</p>

                    <div class="d-flex justify-content-center w-100"> 
                        <div class="suggestions" style="width: 70%">
                            <h3>Te sugerimos:</h3>
                            <ul>
                                <li>Modificar los filtros de búsqueda</li>
                                <li>Explorar otras categorías</li>
                                <li>Revisar la disponibilidad en otras fechas</li>
                                <li>Contactar con el administrador para más información</li>
                            </ul>
                        </div>
                    </div>

                    <div class="button-group">
                        <button class="btn-primary-personal" onclick="window.location.reload()">
                            <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reintentar
                        </button>
                        <button class="btn-secondary-personal" style="width: 20%;" id="btnBorrarFiltrosGestorInstalaciones">
                            <i class="bi bi-trash2"></i> Limpiar filtros
                        </button>
                    </div>
                </div>
            `);
        }
        
        $('#loaderInstalaciones').hide();
        $('#contenedor-instalaciones .card-instalacion').removeClass('card-cargando');
    },
    complete: function(){
        $('#loaderInstalaciones').hide();
        $('#contenedor-instalaciones .card-instalacion').removeClass('card-cargando');
    },
    error: function(xhr, status, error) {
        console.error("Error al obtener las instalaciones:", error);
        
        let body = $('#contenedor-instalaciones');
        body.html(`
            <div class="empty-state error-state" style="grid-column: 1 / -1; max-width: none; width: 100%">
                <div class="icon-container">
                    <i class="bi bi-exclamation-triangle" style="font-size: 3rem; color: #dc3545;"></i>
                </div>
                <h2>Error al cargar instalaciones</h2>
                <p>Ha ocurrido un error al intentar cargar las instalaciones. Por favor, inténtalo de nuevo.</p>
                <button class="btn-primary-personal" onclick="window.location.reload()">
                    <i class="bi bi-arrow-clockwise"></i> Reintentar
                </button>
            </div>
        `);
        
        $('#loaderInstalaciones').hide();
        $('#contenedor-instalaciones .card-instalacion').removeClass('card-cargando');
    }
});
    });


    $(document).on('click', '.filtroSeleccionadoInstalaciones button', function(){

        let index = $(this).closest('.filtroSeleccionadoInstalaciones').data('index');

        if(index === "nombre")
        {
            $('#filtradoNombreInstalaciones').val('');
            delete filterInstalaciones.nombre;
        }
        else if(index === "categoria")
        {
            $('#filtradoCategoriaInstalaciones').val(-1);
            delete filterInstalaciones.categoria
        }
        else if(index === "no_pistas")
        {
           $('#siPistasInstalaciones').prop('checked', false)
           $('#noPistasInstalaciones').prop('checked', false)
           delete filterInstalaciones.no_pistas
        }
        else if(index === "puede_completo")
        {
            $('#siCompletaInstalaciones').prop('checked', false)
            $('#noCompletaInstalaciones').prop('checked', false)
            delete filterInstalaciones.puede_completo
        }
        else if(index === "iluminacion")
        {
            $('#siLuzInstalaciones').prop('checked', false)
            $('#noLuzInstalaciones').prop('checked', false)
            delete filterInstalaciones.iluminacion
        }
        else if(index === "material")
        {
            $('#siMaterialInstalaciones').prop('checked', false)
            $('#noMaterialInstalaciones').prop('checked', false)
            delete filterInstalaciones.material
        }

        if(Object.keys(filterInstalaciones).length === 0) filterInstalaciones = null

        $(this).closest('.filtroSeleccionadoInstalaciones').remove();

        $.ajax({
        type: "POST",
        url: `${BASE_URL}index.php/instalaciones`,
        data: { filterInstalaciones: filterInstalaciones },
        dataType: "json",
        // beforeSend: function(){
        //     $('#loaderInstalaciones').show()
        //     $('#contenedor-instalaciones .card-instalacion').addClass('card-cargando');
        // },
            success: function (response) {
        let body = $('#contenedor-instalaciones');
        body.empty();
        
        // Verificar si hay instalaciones
        if (response.instalaciones && response.instalaciones.length > 0) {
            response.instalaciones.forEach(instalacion => {
                let card = $(`
                    <div class="card-instalacion" data-index="${instalacion.id_instalacion}">
                        <div class="card-image" style="background: url('images/${instalacion.imagen1}'); background-size: cover; background-position: center;"></div>
                        <div class="category">${instalacion.categoria_name}</div>
                        <div class="heading">${instalacion.nombre}</div>
                        <div class="opciones">
                            ${instalacion.iluminacion == 1 ? '<span>Iluminación</span>' : ''}
                            ${instalacion.puede_completo == 1 ? '<span>Reserva completa</span>' : ''}
                            ${instalacion.no_pistas == 1 ? '<span>No tiene pistas</span>' : ''}
                            ${instalacion.material == 1 ? '<span>Material</span>' : ''}
                        </div>
                        <div class="button">
                            <a href="${BASE_URL}index.php/instalacion/${instalacion.id_instalacion}" class="btn-primary-personal">
                                Ir a instalación &nbsp;<i class="bi bi-arrow-right"></i>
                            </a>
                        </div>
                        <span class="estado ${instalacion.estado == 0 ? 'disponible' : 'no-disponible'}">
                            ${instalacion.estado == 0 ? 'disponible' : 'no disponible'}
                        </span>
                    </div>
                `);
                body.append(card);
            });
        } else {
            // Mostrar mensaje de "sin resultados"
            body.html(`
                <div class="empty-state" style="grid-column: 1 / -1; max-width: none; width: 100%">
                    <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h2>No hay instalaciones disponibles</h2>
                    <p>En este momento no tenemos instalaciones que coincidan con tu búsqueda. Prueba a ajustar los filtros o vuelve más tarde.</p>

                    <div class="d-flex justify-content-center w-100"> 
                        <div class="suggestions" style="width: 70%">
                            <h3>Te sugerimos:</h3>
                            <ul>
                                <li>Modificar los filtros de búsqueda</li>
                                <li>Explorar otras categorías</li>
                                <li>Revisar la disponibilidad en otras fechas</li>
                                <li>Contactar con el administrador para más información</li>
                            </ul>
                        </div>
                    </div>

                    <div class="button-group">
                        <button class="btn-primary-personal" onclick="window.location.reload()">
                            <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reintentar
                        </button>
                        <button class="btn-secondary-personal" style="width: 20%;" id="btnBorrarFiltrosGestorInstalaciones">
                            <i class="bi bi-trash2"></i> Limpiar filtros
                        </button>
                    </div>
                </div>
            `);
        }
        
        $('#loaderInstalaciones').hide();
        $('#contenedor-instalaciones .card-instalacion').removeClass('card-cargando');
    },
    complete: function(){
        $('#loaderInstalaciones').hide();
        $('#contenedor-instalaciones .card-instalacion').removeClass('card-cargando');
    },
    error: function(xhr, status, error) {
        console.error("Error al obtener las instalaciones:", error);
        
        let body = $('#contenedor-instalaciones');
        body.html(`
            <div class="empty-state error-state" style="grid-column: 1 / -1; max-width: none; width: 100%">
                <div class="icon-container">
                    <i class="bi bi-exclamation-triangle" style="font-size: 3rem; color: #dc3545;"></i>
                </div>
                <h2>Error al cargar instalaciones</h2>
                <p>Ha ocurrido un error al intentar cargar las instalaciones. Por favor, inténtalo de nuevo.</p>
                <button class="btn-primary-personal" onclick="window.location.reload()">
                    <i class="bi bi-arrow-clockwise"></i> Reintentar
                </button>
            </div>
        `);
        
        $('#loaderInstalaciones').hide();
        $('#contenedor-instalaciones .card-instalacion').removeClass('card-cargando');
    }
        });

    })


    $(document).on('click', '#btnBorrarFiltrosInstalaciones', function(){

        $('#filtradoNombreInstalaciones').val('');
        $('#filtradoCategoriaInstalaciones').val(-1);
        $('#siPistasInstalaciones').prop('checked', false)
        $('#noPistasInstalaciones').prop('checked', false)
        $('#siCompletaInstalaciones').prop('checked', false)
        $('#noCompletaInstalaciones').prop('checked', false)
        $('#siLuzInstalaciones').prop('checked', false)
        $('#noLuzInstalaciones').prop('checked', false)
        $('#siMaterialInstalaciones').prop('checked', false)
        $('#noMaterialInstalaciones').prop('checked', false)


        $('#filtrosInstalaciones').empty();

        $.ajax({
        type: "POST",
        url: `${BASE_URL}index.php/instalaciones`,
        data: { filterInstalaciones: null },
        dataType: "json",
        beforeSend: function(){
            $('#loaderInstalaciones').show()
            $('#contenedor-instalaciones .card-instalacion').addClass('card-cargando');
        },
        success: function (response) {
            let body = $('#contenedor-instalaciones');
            body.empty();

            let instalaciones = response.instalaciones;

            instalaciones.forEach(instalacion => {

                let card = $(`
                    <div class="card-instalacion" data-index="${instalacion.id_instalacion}">
                        <div class="card-image" style="background: url('images/${instalacion.imagen1}'); background-size: cover; background-position: center;"></div>
                        <div class="category">${instalacion.categoria_name}</div>
                        <div class="heading">${instalacion.nombre}</div>
                        <div class="opciones">
                            ${instalacion.iluminacion == 1 ? '<span>Iluminación</span>' : ''}
                            ${instalacion.puede_completo == 1 ? '<span>Reserva completa</span>' : ''}
                            ${instalacion.no_pistas == 1 ? '<span>No tiene pistas</span>' : ''}
                            ${instalacion.material == 1 ? '<span>Material</span>' : ''}
                        </div>
                        <div class="button">
                            <a href="<?= base_url() ?>index.php/instalacion/${instalacion.id_instalacion}" class="btn-primary-personal">
                                Ir a instalación &nbsp;<i class="bi bi-arrow-right"></i>
                            </a>
                        </div>
                        <span class="estado ${instalacion.estado == 0 ? 'disponible' : 'no-disponible'}">
                            ${instalacion.estado == 0 ? 'disponible' : 'no disponible'}
                        </span>
                    </div>
                `);

                body.append(card);
            });

            // Reinicializar tooltips de Bootstrap (si se usan)
            $('#loaderInstalaciones').hide()
            $('#contenedor-instalaciones .card-instalacion').removeClass('card-cargando');
        },
        complete: function(){
            $('#loaderInstalaciones').hide()
            $('#contenedor-instalaciones .card-instalacion').removeClass('card-cargando');
        },
        error: function() {
            console.error("Error al obtener las instalaciones.");
            $('#loaderInstalaciones').hide()
            $('#contenedor-instalaciones .card-instalacion').removeClass('card-cargando');
        }
        });
    })


    $(document).on('click', '.filtroSeleccionadoInstalaciones', function(){

        let index = $(this).data('index');

        if(index === "nombre") $('#filtradoNombreInstalaciones').focus();
        if(index === "categoria") $('#filtradoCategoriaInstalaciones').focus();
        
        if(index === "no_pistas")
        {
           if($('#siPistas').is(':checked')) $('#siPistasInstalaciones').focus();
           if($('#noPistas').is(':checked')) $('#noPistasInstalaciones').focus();
        }

        if(index === "puede_completo")
        {
            if($('#siCompleta').is(':checked')) $('#siCompletaInstalaciones').focus();
            if($('#noCompleta').is(':checked')) $('#noCompletaInstalaciones').focus();
        }

        if(index === "iluminacion")
        {
            if($('#siLuz').is(':checked')) $('#siLuzInstalaciones').focus();
            if($('#noLuz').is(':checked')) $('#noLuzInstalaciones').focus();
        }

        if(index === "material")
        {
            if($('#siMaterial').is(':checked')) $('#siMaterialInstalaciones').focus();
            if($('#noMaterial').is(':checked')) $('#noMaterialInstalaciones').focus();
        }
    })


    /***********************************************************************************************************************************
    *******************************************************  FUNCIONES DE AYUDA  *******************************************************
    ***********************************************************************************************************************************/

    /**
     * camposError() --> Función que al estar mal el campo, le añade la clase "input-error" y borra la clase "input-ok" mostrando de esta manera que en ese campo hay un error
     * @param {HTMLInputElement} input 
     */
    function camposError(input) {
        input.addClass('input-error').removeClass('input-ok');
    }

    /**
     * campoSolucionado() --> Función que al estar bien el campo, le añade la clase "input-ok" y borra la clase "input-error" mostrando de esta manera que ese campo es correcto
     * @param {HTMLInputElement} input 
     */
    
    function campoSolucionado(input) {
        input.removeClass('input-error').addClass('input-ok');
    }

    function formatearFecha(fecha) {
        if (!fecha) return '---';
        const [year, month, day] = fecha.split('-');
        return `${day}/${month}/${year}`;
    }   

    gsap.registerPlugin(ScrollTrigger);

    window.animarFilasGestor = () => {
    gsap.fromTo("#tablaInstalaciones tbody tr",
      { opacity: 0, x: -15 },
      {
        opacity: 1,
        x: 0,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "transform"
      }
    );
  };
});
