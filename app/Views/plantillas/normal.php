<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reservalo 2.0</title>
  <!-- <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>css/home.css" media="screen" />
  <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>css/instalaciones.css" media="screen" />
  <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>css/crudInstalaciones.css" media="screen" /> -->
   <link rel="icon" href="<?php echo base_url();?>images/logo-reservalo.png" type="image/png">
  <?php if(isset($assets['css']) && is_array($assets['css'])): ?>
    <?php foreach($assets['css'] as $archivo_css): ?>
      <link rel="stylesheet" type="text/css" href="<?= base_url($archivo_css) ?>" media="screen" />
    <?php endforeach; ?>
  <?php endif; ?>


  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

  <script src="<?= base_url() ?>js/jquery.js"></script>
    <script src="<?= base_url() ?>js/plantilla.js"></script>
  
  <!-- <script src="<?= base_url() ?>js/movimiento.js"></script>
  <script src="<?= base_url() ?>js/instalaciones.js"></script> -->

  <?php if(isset($assets['js']) && is_array($assets['js'])): ?>
    <?php foreach($assets['js'] as $archivo_js): ?>
      <script src="<?= base_url($archivo_js) ?>"></script>
    <?php endforeach; ?>
  <?php endif; ?>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>


</head>

<body>
  <header class="headerPlantilla">
    <img src="<?= base_url() ?>images/logo-reservalo.png" alt="">
       <nav class="align-items-center">
      <a href="<?= base_url() ?>" class="menu__link"> Home</a>
      <a href="<?=base_url()?>index.php/instalaciones" class="menu__link"> Instalaciones</a>
      

<div class="dropdown">
  <a class="dropdown-toggle menu__link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
     Gestores
  </a>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" style="color: #000;" type="button" href="<?=base_url()?>index.php/crudInstalaciones"> Gestor Instalaciones</a></li>
    <li><a class="dropdown-item" style="color: #000;" type="button"> Gestor categorias</a></li>
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
                  <a class="btn-primary-personal dropdown-toggle hide-arrow d-flex align-items-center justify-content-end gap-2" href="javascript:void(0);" data-bs-toggle="dropdown" style="padding: 5%;">
                      <i class="bi bi-person" style="font-size: 25px;"></i>
                      <span><?= $session->get('usuario')["nombre"];?></span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end iconoAvatar" style="background-color: #111">
                    <li style="width: 100%" class="d-flex justify-content-center">
                      <a class="dropdown-item d-flex justify-content-center iconoAvatar" href="<?=site_url('/logout')?>">
                        <i class="bi bi-door-open me-2"></i>
                        <span class="align-middle">Cerrar Sesión</span>
                      </a>
                    </li>

                    <li style="width: 100%" class="d-flex justify-content-center">
                      <a class="dropdown-item d-flex justify-content-center iconoAvatar" id="btnMisReservas" href="#">
                        <i class="bi bi-calendar-check me-2"></i>
                        <span class="align-middle">Mis Reservas</span>
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
            <a href="<?=base_url()?>index.php/login" class="btn-primary-personal"><i class="bi bi-person"></i> Iniciar Sesión</a>
          <?php
        }
      ?>
    </div>
  </header>
   <?=$view?>
  <footer>

    <div class="principal-footer">

      <div class="logo-titulo">
        <img src="<?= base_url() ?>images/logo-reservalo.png" alt="">
        <h1>Reservalo</h1>
      </div>

      <p>Plataforma digital que permite a la ciudadanía reservar fácilmente instalaciones deportivas y espacios municipales. Ofrece información actualizada, gestión de reservas y pagos en línea, facilitando un acceso más ágil, transparente y participativo a los servicios públicos.</p>

      <div class="redes-sociales">
        <a href=""> <i class="bi bi-instagram"></i></a>
        <a href=""><i class="bi bi-facebook"></i></a>
        <a href=""><i class="bi bi-envelope"></i></a>
      </div>       

    </div>



    <div class="info">

      <div class="columna-plataforma">

        <div class="titulo-plataforma">
          <i class="bi bi-phone"></i>
          <h3>Nuestra Plataforma</h3>
        </div>

        <a href="">Inicio</a>

        <a href="">Instalaciones</a>

        <a href="">Gestor de Instalaciones</a>

        <a href="">Gestor de Categorías</a>

      </div>


      <div class="columna-soporte">

        <div class="titulo-soporte">
          <i class="bi bi-megaphone"></i>
          <h3>Soporte</h3>
        </div>

        <a href="">Manual de Usuario</a>
        
        <a href="">Contacto soporte</a>

        <a href=""></a>

        <a href=""></a>

      </div>


      <div class="columna-contacto" style="width: 35%;">

        <div class="titulo-contacto">
          <i class="bi bi-person-circle"></i>
          <h3>Contacto</h3>
        </div>

        <div style="margin-bottom: .5em;">
          <i class="bi bi-telephone-fill"></i>
          <a href="">952 73 50 16</a>
        </div>

        <div style="margin-bottom: .5em;">
          <i class="bi bi-envelope"></i>
          <a href="">info@fuentedepiedra.es</a>
        </div>

        <div style="margin-bottom: .5em;">
          <i class="bi bi-geo-alt-fill"></i>
          <a href="">C. Ancha, 9, Fuente de Piedra, Málaga, 29520</a>
        </div>

        <div style="margin-bottom: .5em;">
          <i class="bi bi-clock"></i>
          <a href="">Lunes - Viernes: 07:30h - 14:00h</a>
        </div>

      </div>

    </div>
    <div class="footer-bottom">
        <p>© 2025 ReservaMunicipal. Todos los derechos reservados.</p>
        <div class="footer-legal">
            <a href="#privacidad">Política de privacidad</a>
            <a href="#terminos">Términos y condiciones</a>
            <a href="#cookies">Cookies</a>
            <a href="#legal">Aviso legal</a>
        </div>
      </div>
  </footer> 
</body>

</html>

<?= $modalMisReservas ?>