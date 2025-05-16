<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservalo 2.0</title>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>CSS/home.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>CSS/login.css" media="screen" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

    <script src="<?= base_url() ?>js/jquery.js"></script>
    <script src="<?= base_url() ?>js/movimiento.js"></script>
    <script src="<?= base_url() ?>js/login.js"></script>
    <script src="<?= base_url() ?>js/validaciones.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

</head>

<body class="d-flex justify-content-center align-items-center flex-wrap bodyLogin">

    <div id="mensaje" style="width: 100%; padding: 1%; padding-bottom: 0%; display: flex; justify-content: center;">

    </div>
    
    <div class="login">

        <div class="card-body">
            <!-- Logo -->
            <div class="app-brand justify-content-center">
                <a href="/sneat-html-django-admin-template-free/" class="app-brand-link gap-2 d-flex justify-content-center">
                    <img src="<?=base_url()?>/images/Logo.png" alt="" style="width: 60%;">
                </a>
            </div>
            <!-- /Logo -->
            <h4 class="mb-1">Registrate</h4>
            <p class="mb-6">Introduzca los datos solicitados</p>

            <form id="singInForm" class="mb-6" action="" method="post">
                <input type="hidden" name="csrfmiddlewaretoken" value="sAH2uGhYD8U3bjDwPpS5SsEXDjRGqyVyGLY41A4VpjK7ea6Kthv1mkRK0HJL6JV7">

                <div class=" loginEmail">
                    <label for="nombreReg" class="form-label">Correo electrónico</label>
                    <input type="text" class="form-control" id="nombreReg" name="nombreReg" placeholder="Ej: Rigoberto..." autofocus="">
                </div>
                <br>

                <div class=" loginEmail">
                    <label for="emailReg" class="form-label">Correo electrónico</label>
                    <input type="text" class="form-control" id="emailReg" name="emailReg" placeholder="Ej: email@ejemplo.com" autofocus="">
                </div>
                <br>
                <div class=" form-password-toggle">
                    <label class="form-label" for="passwordReg">Contraseña</label>
                    <div class="input-group input-group-merge loginPassword">
                        <input type="password" id="passwordReg" class="form-control" name="passwordReg" placeholder="············" aria-describedby="password">
                        <span class="input-group-text cursor-pointer botonVer" style="background-color: transparent; border: none"><i class="bi bi-eye"></i></span>
                    </div>
                </div>
                <br>
            
                <br>
                <div>
                    <button class="btn btn-primary d-grid w-100" type="submit">Registrarse</button>
                </div>
            </form>
    <br>
            <p class="text-center">
                <span>¿Ya tienes cuenta?</span>
                <a href="<?=base_url()?>index.php/login">
                    <span>Iniciar Sesión</span>
                </a>
            </p>
        </div>

    </div>
</body>

</html>