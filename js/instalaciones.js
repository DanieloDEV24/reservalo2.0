$(document).ready(() => {
    let archivos; // Declaramos fuera para que esté accesible
    let errores = [];

    $('#crear').click(() => {
        $('#modalNuevaInstalacion').modal('show');
    });

    // ✅ Escucha el cambio de archivos desde el principio
    $('#imagenesInstalacion').on('change', function () {
        archivos = this.files;

        if (archivos.length > 4) {
            alert('Solo puedes seleccionar hasta 4 imágenes.');
            $(this).val(''); // Limpiamos el input
            archivos = null; // Opcional: limpiar la variable también
        }
    });

    $('#guardarInstalacion').on('click', function () {

        $('#modalNuevaInstalacion .alertModal').empty()
        errores = [];

        let nombreInstalacion = $('#nombreInstalacion').val();
        let deporte = $('#deporteInstalacion').val();
        let descripcion = $('#descripcionInstalacion').val();
        let precio = $('#precioInstalacion').val();
        let capacidad = $('#capacidadInstalacion').val();
        let elementoSalidaCorrecta

        console.log(nombreInstalacion, deporte, descripcion, archivos);

        if (nombreInstalacion === "") {
            let elementoSalida = {
                type: "danger",
                return: 'El campo "nombre" no puede estar vacío'
            }

            errores.push(elementoSalida)
        }
        if (deporte == -1) {
            let elementoSalida = {
                type: "danger",
                return: 'Debe seleccionar un deporte'
            }

            errores.push(elementoSalida)
        }
        if (descripcion === "") {
            let elementoSalida = {
                type: "danger",
                return: 'El campo "descripción" no puede estar vacío'
            }

            errores.push(elementoSalida)
        }
        if (!archivos|| archivos.length === 0 ) {
            let elementoSalida = {
                type: "danger",
                return: 'Debes seleccionar una foto'
            }

            errores.push(elementoSalida)
        }

        if (precio === "") {
            let elementoSalida = {
                type: "danger",
                return: 'Debes seleccionar un precio'
            }

            errores.push(elementoSalida)
        }

        if (capacidad === "") {
            let elementoSalida = {
                type: "danger",
                return: 'Debes seleccionar una capacidad'
            }

            errores.push(elementoSalida)
        }


        if(errores.length === 0) {
            elementoSalidaCorrecta = {
                type: "success",
                return: 'Instalación creada correctamente'
            }
        }

        let alert
        if (errores.length === 0) {
            // alert = $(`<div class="alert alert-${elementoSalidaCorrecta.type} mb-o" role="alert" style="margin-bottom:0%">
            //             ${elementoSalidaCorrecta.return}
            //            </div>`)

            console.log(precio, capacidad)
            let formData = new FormData();
            formData.append('nombreInstalacion', nombreInstalacion);
            formData.append('deporte', deporte);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);
            formData.append('capacidad', capacidad);

            for (let i = 0; i < archivos.length; i++) {
                formData.append('imagenes[]', archivos[i]);
            }

            $.ajax({
                url   : "nuevaInstalacion",
                method: "POST", 
                data  : formData, 
                processData: false,
                contentType: false, 
                success: function(response)
                {
                     $('#modalNuevaInstalacion').modal('hide');
                },
                error: function(e)
                {
                    console.error(e)
                } 
            })
        }
        else {
            let elementosLista = ""
            errores.map((error) => {
                elementosLista = elementosLista + `<li>${error.return}</li>`
            })

            alert = $(`<div class="alert alert-danger mb-0" role="alert" "margin-bottom:0%">
                            <ul class="mb-0">
                                ${elementosLista}
                            </ul>
                        </div>`)
        }

        $('#modalNuevaInstalacion .alertModal').prepend(alert)  

    });


});
