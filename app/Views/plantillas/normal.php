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
    <nav>
      <a href="<?= base_url() ?>" class="menu__link"><i class="bi bi-house"></i> Home</a>
      <a href="<?=base_url()?>index.php/crudInstalaciones" class="menu__link"><i class="bi bi-tools"></i> Gestor Instalaciones</a>
      <a href="#" class="menu__link">Link</a>
      <a href="#" class="menu__link">Link</a>
    </nav>
    <div>
      <a href="<?=base_url()?>index.php/login" class="button">Iniciar Sesión</a>
    </div>
  </header>
   <?=$view?>
  <footer>
  </footer>
</body>

</html>