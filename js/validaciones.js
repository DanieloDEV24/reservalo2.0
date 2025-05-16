$(document).ready(() => {
    $('#singInForm').on('submit', function(e){
        let email      = $('#emailReg').val().trim()
        let password   = $('#passwordReg').val().trim()
        let nombre     = $('#nombreReg').val().trim()
        let salida     = {}
        let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        let errores    = []

        if(nombre === "")
        {
            salida = {
                type   : "danger",
                mensaje: "Debe introducir su nombre"
            }
            errores.push(salida)
        }
        else if(email === "")
        {
            salida = {
                type   : "danger",
                mensaje: "Debe introducir una dirección de email"
            }
            errores.push(salida)
        }
        else if(password === "")
        {
            salida = {
                type   : "danger",
                mensaje: "Debe introducir una contraseña"
            }

            errores.push(salida)
        }
        else if(!regexEmail.test(email))
        {
            salida = {
                type   : "danger",
                mensaje: "Debe introducir una dirección de correo válida"
            }

            errores.push(salida)
        }

        if(errores.length > 0)
        {
            e.preventDefault();
            console.log(errores)
            $('#mensaje').empty()
            $('#mensaje').append(`<div style="width:auto" class="alert alert-${errores[0].type}" role="alert">${errores[0].mensaje}</div>`)
        }
    })
})