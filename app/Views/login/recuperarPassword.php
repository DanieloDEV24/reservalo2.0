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

    <div id="mensaje3" style="width: 100%; padding: 1%; padding-bottom: 0%; display: flex; justify-content: center;">
    <?php
            if(isset($salida))
            {
                ?>
                    <div style="width:auto" class="alert alert-<?=$salida["type"]?>" role="alert"><?=$salida["mensaje"]?></div>
                <?php
            }
        ?>
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
            <h4 class="mb-1">Recuperar Contraseña</h4>
            <p class="mb-6">Introduzca los datos solicitados</p>

            <form id="emailPasswordForm" class="mb-6" action="" method="post" name="formForgotPassword">

                <div class="passwordEmail">
                    <label for="emailPass" class="form-label">Correo electrónico</label>
                    <input type="text" class="form-control" id="emailPass" name="emailPass" autofocus="">
                </div>
                <br>
                <div>
                    <button class="btn btn-primary d-grid w-100" type="submit">Enviar correo</button>
                </div>
            </form>
    <br>
            
        </div>

    </div>
</body>

</html>