<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reservalo 2.0</title>
  <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>CSS/home.css" media="screen" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

  <script src="<?= base_url() ?>js/jquery.js"></script>
  <script src="<?= base_url() ?>js/movimiento.js"></script>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

</head>

<body>
  <header class="headerHome">
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
    <div style="text-align: end; display: flex; justify-content: end">
      <?php
        $session = session();
        if ($session->has('usuario')) {
          // La sesión 'usuario' existe
          $usuario = $session->get('usuario');
          ?>
          <!-- <li class="nav-item">
            <a  class="nav-link" href=<?=site_url('/logout')?>><span>Cerrar Sesión</span><i class="bi bi-arrow-right"></i></a>
          </li> -->
          <li class="navbar-dropdown dropdown-user dropdown mainLi">
                  <a class=" dropdown-toggle hide-arrow d-flex align-items-center justify-content-end gap-2" href="javascript:void(0);" data-bs-toggle="dropdown" style="padding: 5%;">
                    <div class="d-flex align-items-center gap-2 p-0">
                      <i class="bi bi-person" style="font-size: 25px;"></i>
                      <span><?= $session->get('usuario')["nombre"];?></span>
                    </div>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end iconoAvatar" style="background-color: #111">
                    <li style="width: 100%" class="d-flex justify-content-center">
                      <a class="dropdown-item d-flex justify-content-center iconoAvatar" href="<?=site_url('/logout')?>">
                        <i class="bi bi-door-open me-2"></i>
                        <span class="align-middle">Cerrar Sesión</span>
                      </a>
                    </li>
                  </ul>
                </li>
          <?php
        }
        else 
        {
          // No existe la sesión 'usuario'
          ?>
            <a href="<?=base_url()?>index.php/login" class="button"><i class="bi bi-person"></i> Iniciar Sesión</a>
          <?php
        }
      ?>
    </div>
  </header>
   <?=$view?>
  <footer>
   
  </footer>
</body>

</html>