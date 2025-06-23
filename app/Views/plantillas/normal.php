<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reservalo 2.0</title>
  <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>CSS/home.css" media="screen" />
   <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>CSS/crudInstalaciones.css" media="screen" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

  <script src="<?= base_url() ?>js/jquery.js"></script>
  <script src="<?= base_url() ?>js/movimiento.js"></script>
   <script src="<?= base_url() ?>js/instalaciones.js"></script>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>


</head>

<body>
  <header class="headerPlantilla">
    <img src="<?= base_url() ?>images/Logo.png" alt="">
       <nav class="align-items-center">
      <a href="<?= base_url() ?>" class="menu__link"><i class="bi bi-house"></i> Home</a>
      

<div class="dropdown">
  <a class="dropdown-toggle menu__link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="bi bi-tools"></i> Gestores
  </a>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" style="color: #000;" type="button" href="<?=base_url()?>index.php/crudInstalaciones"><i class="bi bi-buildings"></i> Gestor Instalaciones</a></li>
    <li><a class="dropdown-item" style="color: #000;" type="button"><i class="bi bi-life-preserver"></i> Gestor categorias</a></li>
  </ul>
</div>
    </nav>
    <div>
      <a href="<?=base_url()?>index.php/login" class="button"><i class="bi bi-person"></i> Iniciar Sesión</a>
    </div>
  </header>
   <?=$view?>
  <footer>
  </footer>
</body>

</html>