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



    /***********************************************************************************************************************************
    ********************************************************  CREAR INSTALACIÓN  *******************************************************
    ***********************************************************************************************************************************/

    // Click en el btn de crear instalación nueva
    $('#crear').click(() => {
        $('#modalNuevaInstalacion').modal('show');
    });



    // Evento en el que cuando se cambia de categoría principal, automáticamente aparezcan como categorías secundarias las otras categorías no seleccionadas
    $('#categorias').on('change', function () {
        $('#subcategorias').empty(); // --> vaciamos el contenedor de categorias secundarias
        let catPrincipal = $(this).val(); // --> obtenemos el valor de la categoría principal

        // Recorremos las categorías del select (los options), para guardar su texto y valor
        $('#categorias option').each(function () {
            const val = $(this).val(); // --> obtenemos el valor del option
            const text = $(this).text(); // --> obtenemos el texto del option

            // Comprobamos que haya una categoría principal seleccionada y creamos las categorías secundarias sin seleccionar esta
            if (val != catPrincipal && catPrincipal != -1 && val != -1) {
                // Creación del nuevo nodo con la categoría secundaria
                const input = $(`<input value="${val}" name="subcategoria" id="sub-${val}" type="checkbox">`);
                const label = $(`<label for="sub-${val}">${text}</label>`);
                $('#subcategorias').append(input, label); // --> la añadimos al div de las categorías secundarias
            }
        });
    });




    // Evento en el que controlamos el switch que muestra si se puede hacer una reserva completa de la instalación. Se comprueba al cambiar el estado del switch.
    $('.toggle-switch input.puedeCompleto').on('change', function () {
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
    $('.toggle-switch input.noPistas').on('change', function () {
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
    $(document).on('click', '.guardarPista', function () {

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
        if (!capacidadPista || capacidadPista == 0 || !parseInt(capacidadPista)) {
            errores.push('Debes seleccionar una capacidad para la pista'); // --> Guardamos el error en el array de errores
            camposError(body.find('.capacidadPista')) // --> Marcamos el campo como erróneo
        }

        // Comprobamos que esté marcado el switch del que se pueda hacer una reserva completa y la capacidad pista sea menor que la capacidad completa
        else if (puedeTotal && (capacidadPista > capacidadTotal)) {
            errores.push('La capacidad de una pista no puede superar a la total de la instalación'); // --> Guardamos el error en el array de errores
            camposError(body.find('.capacidadPista')) // --> Marcamos el campo como erróneo
        }
        else {
            campoSolucionado(body.find('.capacidadPista')) // --> Marcamos el campo como correcto
        }

        // Comprobamos que el campo de precio no este vacío
        if (precioPista === '' || isNaN(precioPista)) {
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
    $('#accordionExample').on('click', '.borrarPista', function () {
        const index = parseInt($(this).closest('.accordion-item').data('index')); // --> Buscamos el id de la pista que queremos borrar
        pistas = pistas.filter(p => p.id !== index); // --> Filtramos los datos que no tengan ese id
        $(this).closest('.accordion-item').remove(); // --> Borramos también el accordion
    });




    // Evento en el que controlamos la edición de las pistas
    $('#accordionExample').on('click', '.editarPista', function () {
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
    $('#guardarInstalacion').on('click', function () {
        $('#modalNuevaInstalacion .alertModal').empty(); // --> Vaciamos el campo de las notificaciones de error
        errores = []; // --> Array donde irán guardados los errores

        let nombreInstalacion = $('#nombreInstalacion').val(); // --> Obtenemos el nombre 
        let categoria = $('#categorias').val(); // --> Obtenemos la categoría 
        let puedeCompleto = $('.toggle-switch input.puedeCompleto').is(':checked'); // --> Obtenemos el estado del switch que indica si se puede hacer la reserva completa de la instalación
        let noPistas = $('.toggle-switch input.noPistas').is(':checked'); // --> Obtenemos el estado del switch que indica si la instalación no tiene pistas
        let precioCompleto = $('#precioCompleto').val(); // --> Obtenemos el precio de la reserva completa
        let capacidadCompleto = $('#capacidadCompleto').val(); // --> Obtenemos la capacidad completa de la instalación
        let descripcion = $('#descripcion').val(); // --> Obtenemos la descripción de la instalación
        let categoriaSecundaria = 0; // --> variable donde guardamos la categoría secundaria


        // Evento donde controlamos la selección de la categoría secundaria. Lo que hacemos es recorrer los inputs con las categorías secundarias
        $('#subcategorias input').each(function () {
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

        // Comprobamos que si esta seleccionada la opción de reserva completa o instalación sin pistas, haya un precio de la instalación completa
        if ((puedeCompleto || noPistas) && (precioCompleto === '' || isNaN(precioCompleto))) {
            errores.push('Debe seleccionar un precio válido'); // --> Guardamos la el mensaje de error en el array de errores
            camposError($('#precioCompleto')); // --> Mostramos el campo como erróneo
        } else {
            campoSolucionado($('#precioCompleto')); // --> Mostramos el campo como correcto
        }


        // Comporbamos que si esta seleccionada la opción de reserva completa o instalación sin pistas, haya una capacidad indicada para la reserva de la instalación completa 
        if ((puedeCompleto || noPistas) && (capacidadCompleto === '' || isNaN(capacidadCompleto) || parseInt(capacidadCompleto) === 0)) {
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
            formData.append('puedeCompleto', puedeCompleto); // --> Añadimos el estado del switch que muestra si se puede hacer una reserva completa de la instalación al formData
            formData.append('noPistas', noPistas) // --> Añadimos el estado del switch que muestra si no se puede crear pistas en la instalación al formData
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

                // Guardamos las pistas en el formData
                formData.append('pistas', JSON.stringify(pistasSinImagenes));
            }


            // Petición Ajax al back en la que enviamos los datos para crear la instalación y guardarlas en la base de datos
            $.ajax({
                url: 'nuevaInstalacion', // --> URL a la que enviamos la petición
                type: 'POST',
                data: formData,
                processData: false, // Importante para enviar FormData
                contentType: false, // Importante para enviar FormData
                success: function (response) {

                    let data = JSON.parse(response); // --> Respuesta de la petición. La pasamos a un objeto con JSON.parse()
                    let instalaciones = data.instalaciones; // --> Obtenemos las instalaciones que tenemos creadas
                    let tabla = $('#tabaInstalaciones tbody'); // --> Obetenemos la tabla del crud de las instalaciones
                    tabla.empty(); // --> La vaciamos

                    // Recorremos las instalaciones para hacer un efecto de refresco inmediato, con los nuevos datos
                    instalaciones.forEach((instalacion, index) => {

                        // Comprobamos que haya una categoría secundaria (num | null), para poner el texto en la tabla (nombre | ----)
                        let categoriaSecundaria = instalacion.categoria_opc_name ? instalacion.categoria_opc_name : '----';

                        // Creamos por cada instalación una fila
                        tabla.append(`
                            <tr data-index="${instalacion.id_instalacion}">
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
                    <li><a class="dropdown-item" href="#">Editar &nbsp;<i class="bi bi-pencil-square"></i></a></li>
                    <li><a class="dropdown-item" href="#">Borrar &nbsp;<i class="bi bi-trash3"></i></a></li>
                    <li><a class="dropdown-item" href="#">Dar de Baja &nbsp;<i class="bi bi-x-lg        "></i></a></li>
                </ul>
                </div>


          </td>
                            </tr>`);
                    });

                    // Cerramos el modal de crear una nueva instalación
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
    $('#tabaInstalaciones tbody').on('click', '.btnVerInstalacion', function (e) {
        e.preventDefault();

        // Obtenemos el id de la instalación del atributo data-index del tr de la tabla
        let index = $(this).closest('tr').data('index');

        // Reaclizamos una petición ajax al back para obtener la información de la instalación con el id anteriormente guardado
        $.ajax({
            url: 'verInstalacion', // --> URL donde hacemos la petición
            method: 'POST',
            data: { id: index },
            dataType: 'json',
            success: function (response) {

                // Ponemos la imagen de la instalación en el "header" del modal
                $('#imagenVerInstalacion').css('background-image', `url(${base_url}images/${response.pistas[0].imagen1})`);

                // Mostramos los datos
                $('#nombreVerInstalacion').text(response.instalacion[0].nombre + '.'); // --> Mostramos el nombre
                $('#categoriaPrincipalVerInstalacion').text(response.instalacion[0].categoria_name) // --> Mostramos la categoría
                $('#categoriaSecundariaVerInstalacion').text(response.instalacion[0].categoria_opc_name ?? ' '); // --> Mostramos la categoría secundaria
                $('#descripcionVerInstalacion').text(response.instalacion[0].descripcion); // --> Mostramos la descripción de la instalación

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
                                            <img src="${base_url}images/${pista["imagen1"]}" alt="Imagen 1 de ${pista["nombre_pista"]}" class="img-grande">
                                            <img src="${base_url}images/${pista["imagen2"]}" alt="Imagen 2 de ${pista["nombre_pista"]}" class="img-pequena">
                                            <img src="${base_url}images/${pista["imagen3"]}" alt="Imagen 3 de ${pista["nombre_pista"]}" class="img-pequena">
                                            <img src="${base_url}images/${pista["imagen4"]}" alt="Imagen 4 de ${pista["nombre_pista"]}" class="img-pequena">
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
    $('#tabaInstalaciones tbody').on('click', '.btnEditarInstalacion', function (e) {
        e.preventDefault();

        // Obetenemos el id de la instalación
        let index = $(this).closest('tr').data('index');

        // Añadimos el id al modal 
        $('#modalEditarInstalacion').data('index', index);

        // Hacemos una petición ajax al back para obtener los datos de esa instalación
        $.ajax({
            url: 'editarInstalacion', // --> URL a la que se hace la petición
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

                        // La añadimos al div
                        $('#subcategoriasEditar').append(input, label);
                    }
                })

                // Evento en el que controlamos el cambio de categoría principal para que se vayan cambiado las posibles categorías secuandarias de forma dinámica
                $('#categoriasEditar').on('change', function () {

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

                            // Lo añadimos al div
                            $('#subcategoriasEditar').append(input, label);
                        }
                    });
                });

                let noPistasChecked = (parseInt(response.instalacion[0].no_pistas) === 1) ? "checked" : ""; // --> Comprobamos si está marcado el switch que nos indica que no se pueden crear pistas para esa instalación
                let puedeCompletoChecked = (parseInt(response.instalacion[0].puede_completo) === 1) ? "checked" : ""; // --> Comprobamos si está marcado el switch que nos indica que se puede hacer una reserva completa en la instalación

                $('#noPistasEditar').prop('checked', noPistasChecked); // --> Lo reflejamos en el switch
                estadoInicial = noPistasChecked
                $('#puedeCompletoEditar').prop('checked', puedeCompletoChecked); // --> Lo reflejamos en el switch

                $('#capacidadCompletoEditar').val(response.instalacion[0].capacidad_completo) // --> Añadimos el valor de la capacidad total de la instalación
                $('#precioCompletoEditar').val(response.instalacion[0].precio_completo) // --> Añadimos el valor del precio total de la instalación
                $('#descripcionEditar').val(response.instalacion[0].descripcion) // --> Añadimos el valor de la descripción de la instalación 

                let pistas = response.pistas // --> Obtenemos las pistas

                // Recorremos las pistas
                if (!noPistasChecked) {
                    pistas.map((pista) => {

                        // Por cada pista creamos un accordion con sus datos
                        let acordion = `
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
                                <label>Nombre:</label>
                                <input type="text" class="form-control nombrePistaEditar" placeholder="Ej: Pista de padel nº 1" value="${pista.nombre_pista}">
                            </div>
                        </div>
                        <div class="row gap-5 mt-3">
                            <div class="col">
                                <label>Capacidad de la Pista:</label>
                                <input type="text" class="form-control capacidadPistaEditar" placeholder="Ej: 4" value="${pista.capacidad_pista}">
                            </div>
                            <div class="col">
                                <label>Precio de la Pista:</label>
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
                                <label>Nombre:</label>
                                <input type="text" class="form-control nombrePista" placeholder="Ej: Pista de padel nº 1">
                            </div>
                        </div>
                        <div class="row gap-5 mt-3">
                            <div class="col">
                                <label>Capacidad de la Pista:</label>
                                <input type="text" class="form-control capacidadPista" placeholder="Ej: 4" >
                            </div>
                            <div class="col">
                                <label>Precio de la Pista:</label>
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
    $(document).on('input', '#accordionEditarPistas input', function () {

        let $accordionItem = $(this).closest('.accordion-item'); // --> Obtenemos el accordion en el que se encuentra el campo que está siendo editado
        let idPista = parseInt($(this).closest('.accordion-item').data('index')); // --> Obtenemos el id de la pista

        // Petición ajax en la que obtenemos los datos de la pista
        $.ajax({
            url: 'infoPista', // --> URL donde hacemos la petición
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
    $(document).on('click', '.guardarPistaEditar', function () {

        let $accordionItem = $(this).closest('.accordion-item'); // --> Obtenemos el accordion en el que se encuentra el campo que está siendo editado

        let idPista = parseInt($(this).closest('.accordion-item').data('index')); // --> Obtenemos el id de la pista

        // Obtenemos los valores
        let nombre = $accordionItem.find('.nombrePistaEditar').val(); // --> nombre nuevo de la pista
        let capacidad = $accordionItem.find('.capacidadPistaEditar').val(); // --> capacidad nueva de la pista
        let precio = $accordionItem.find('.precioPistaEditar').val(); // --> precio nuevo de la pista
        // let imagenes  = $(this).closest('.accordion-body').data('imagenesPistaEditar') --> ver mas tarde con un panel aparte como el gestor de la web del Ayuntamiento de Fuente de Piedra

        // Realizamos una petición ajax al back, donde enviamos la información nueva de las pistas
        $.ajax({
            type: "POST",
            url: "editarPista", // --> url a la que hacemos la petición
            data: {
                id: idPista,
                data: { nombre_pista: nombre, capacidad_pista: capacidad, precio_pista: precio }
            },
            success: function (response) {

                // Como hemos editado la pista, deshabilitamos de nuevo el btn de guardar pista
                $accordionItem.find('.guardarPistaEditar').prop('disabled', true)
            }
        });

    })


    let datosPistas = [] // --> Variable donde irán los datos de las pistas hasta que guarde la edición

    // Evento que controla el estado del switch de manera que en el caso de no poder pistas se eleminen los accordions con las pistas, pero guardandolos en un array hasta que guardemos la instalación
    $('#noPistasEditar').on('change', function () {

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
            url: "getNewIndexPista",
            data: "",
            dataType: 'json',
            beforeSend: function () {
                // Mostrar loader
                $("#loader").show();

                // Obtenemos los btns de los accordions
                let headerBtn = $('#accordionEditarPistas .accordion-header .accordion-button');

                // Le ponemos ese color gris para dar efecto carga
                headerBtn.css("color", "#ccc", "important")
            },
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
                                                    <label>Nombre:</label>
                                                    <input type="text" class="form-control nombrePistaEditar" placeholder="Ej: Pista de padel nº 1" value="${pista.nombre}">
                                                </div>
                                            </div>
                                            <div class="row gap-5 mt-3">
                                                <div class="col">
                                                    <label>Capacidad de la Pista:</label>
                                                    <input type="text" class="form-control capacidadPistaEditar" placeholder="Ej: 4" value="${pista.capacidad}">
                                                </div>
                                                <div class="col">
                                                    <label>Precio de la Pista:</label>
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
                                            <label>Nombre:</label>
                                            <input type="text" class="form-control nombrePista" placeholder="Ej: Pista de padel nº 1">
                                        </div>
                                    </div>
                                    <div class="row gap-5 mt-3">
                                        <div class="col">
                                            <label>Capacidad de la Pista:</label>
                                            <input type="text" class="form-control capacidadPista" placeholder="Ej: 4" >
                                        </div>
                                        <div class="col">
                                            <label>Precio de la Pista:</label>
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
            complete: function () {

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
    $('#puedeCompletoEditar').on('change', function () {

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
    $(document).on('click', '.borrarPistaEditar', function () {

        let idPista = parseInt($(this).closest('.accordion-item').data('index')); // --> Obtenemos el id de la pista
        $('#modalBorraPista').data('index', idPista) // --> Guardamos el id de la pista en el data-index del modal de borrar la pista 

        // Petición ajax al back con la que obtenemos la información sobre la pista
        $.ajax({
            type: "POST",
            url: "infoPista", // --> URL donde va destinada la peticion
            data: { id: idPista },
            dataType: "json",
            success: function (response) {
                let pista = response.pista[0]; // --> Obtenemos las pistas

                // Actualizamos el texto
                $('#modalBorraPista .pregunta-borrado h2').text(
                    `¿Desea eliminar la instalación ${pista.nombre_pista}?`
                );

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
    $(document).on('click', '.aceptarBorrarEditar', function () {

        // Obtenemos el id de la pista que queremos eliminar
        let id = parseInt($('#modalBorraPista').data('index'));

        // Hago una petición ajax al back para eliminar la pista de la base de datos
        $.ajax({
            type: "POST",
            url: "borrarPista", // --> URL a donde va la petición
            data: { id: id },
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


        let btnGuardar = $(this).closest('.accordion-body').find('.guardarPistaEditar');
        if(archivos.length > 0)
        {
            btnGuardar.prop('disabled', false);
        }
        else
        {
            btnGuardar.prop('disabled', true);
        }
    });



    // Evento en el que guardamos una pista nueva en el modal de editar instalación. Esta funcionalidad nos permite añadir una pista nueva a una instalación ya creada
    $(document).on('click', '.guardarPistaNuevaEditar', function () {

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
            url: "crearPista", // --> URL a donde enviaremos la petición
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
                                                    <label>Nombre:</label>
                                                    <input type="text" class="form-control nombrePistaEditar" placeholder="Ej: Pista de padel nº 1" value="${nombre}">
                                                </div>
                                            </div>
                                            <div class="row gap-5 mt-3">
                                                <div class="col">
                                                    <label>Capacidad de la Pista:</label>
                                                    <input type="text" class="form-control capacidadPistaEditar" placeholder="Ej: 4" value="${capacidad}">
                                                </div>
                                                <div class="col">
                                                    <label>Precio de la Pista:</label>
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


    $(document).on('click', '#guardarInstalacionEditar', function () {

        let errores = [];
        $('#modalEditarInstalacion .alertModal').empty();

        // Variables principales
        const id = $('#modalEditarInstalacion').data('index');
        const nombre = $('#nombreInstalacionEditar').val().trim();
        const categoria = parseInt($('#categoriasEditar').val());
        let categoriaSecundaria = 0;
        const noPistas = $('#noPistasEditar').is(':checked');
        const puedeCompleta = $('#puedeCompletoEditar').is(':checked');
        const capacidadCompleta = $('#capacidadCompletoEditar').val();
        const precioCompleto = $('#precioCompletoEditar').val();
        const descripcion = $('#descripcionEditar').val().trim();

        // Obtener categoría secundaria
        $('#subcategoriasEditar input:checked').each(function () {
            categoriaSecundaria = $(this).val();
        });

        // Validaciones básicas
        if (!nombre) errores.push('El nombre no puede estar vacío');
        if (isNaN(categoria) || categoria === -1) errores.push('Debes seleccionar una categoría');
        if (!descripcion) errores.push('La descripción no puede estar vacía');

        // Validaciones de capacidad y precio
        if ((puedeCompleta || noPistas) && (isNaN(precioCompleto) || precioCompleto <= 0)) {
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
        formData.append('noPistas', noPistas);
        formData.append('puedeCompleta', puedeCompleta);
        formData.append('capacidadCompleta', capacidadCompleta);
        formData.append('precioCompleto', precioCompleto);
        formData.append('descripcion', descripcion);

        if (imagenesNoPistasEditar) {
            for (let i = 0; i < imagenesNoPistasEditar.length; i++) {
                formData.append('imagenesEditarNoPista[]', imagenesNoPistasEditar[i]);
            }
        }

        // Petición AJAX
        $.ajax({
            type: "POST",
            url: "editarInstalacionBD",
            data: formData,
            contentType: false,
            processData: false,
            dataType: "json",
            beforeSend: function () {
                $("#loader").show();
            },
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
});
