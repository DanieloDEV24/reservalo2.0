<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>CSS/style.css" media="screen" />
  <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>CSS/menu.css" media="screen" />
  <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>CSS/reservas.css" media="screen" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src=<?=base_url()."js/jquery.js"?>></script>
  <script src=<?= base_url() . "/js/main.js" ?>></script>
  <script src=<?= base_url() . "/js/reserva.js" ?>></script>
  <script src=<?= base_url() . "/js/menuAndroid.js" ?>></script>
  <script src="https://cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js"></script>
  <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/infinity.js"></script>

        <script>
            $(function(){
              new PureCounter();  
            })
        </script>
  <title>Reservalo</title>
</head>

<body>
  <header class="index">
    <div class="logo">
      <img src="<?php echo base_url(); ?>/images/logo.png" alt="">
    </div>
    <div class="menu">
    <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
    <label class="hamburger mostrarBotonMenu navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <input type="checkbox" id="checkMenu">
        <svg viewBox="0 0 32 32">
          <path class="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22">
          </path>
          <path class="line" d="M7 16 27 16"></path>
        </svg>
      </label>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="<?php echo base_url();?>">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="<?=site_url('/instalaciones')?>">Instalaciones</a>
        </li>
        <?php
if (session()->has('usuario')  && session()->get('usuario')['role'] == 2) {
?>
<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Gestores
          </a>
          <ul class="dropdown-menu" style="background-color: #18191A;">
            <li><a class="dropdown-item" href="<?= site_url('/crudInstalaciones') ?>">Gest. Instalaciones</a></li>
            <li><a class="dropdown-item" href="<?= site_url('/crudMantenimientos') ?>">Gest. Mantenimientos</a>
            <li><a class="dropdown-item" href="<?= site_url('/crudCategorias') ?>">Gest. Categorias</a>
          </ul>
        </li>
  <li class="nav-item">
    <a class="nav-link" href="<?= site_url('reservasAdmin') ?>">Reservas por Hacer</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="<?= site_url('dashboard') ?>">DashBoard</a>
  </li>
<?php
}
?>

        <?php if(session()->has('usuario')) { ?>
          <!-- <li class="nav-item">
            <a  class="nav-link" href=<?=site_url('/logout')?>><span>Cerrar Sesión</span><i class="bi bi-arrow-right"></i></a>
          </li> -->
          <li class="nav-item navbar-dropdown dropdown-user dropdown">
                  <a class="nav-link dropdown-toggle hide-arrow d-flex align-items-center justify-content-center p-0 iconoAvatar" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div class="avatar avatar-online d-flex align-items-center p-0">
                      <img src="<?= base_url() ?>images/hombre.png" alt="" class="w-px-40 h-auto rounded-circle" style="width: 50px">
                    </div>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end iconoAvatar" style="background-color: #111">
                    <li style="width: 85%" class="d-flex justify-content-center">
                      <a class="dropdown-item iconoAvatar" href="#">
                        <div class="d-flex align-items-center">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar avatar-online">
                              <img src="<?= base_url() ?>images/hombre.png" alt="" class="w-px-40 h-auto rounded-circle" style="width: 50px">
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <span class="fw-semibold d-block"><?= session()->get('usuario')['nombre'] ?></span>
                            <small class="text-muted">
                            </small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li style="width: 85%" class="d-flex justify-content-center">
                      <a class="dropdown-item d-flex justify-content-center iconoAvatar" href="<?= site_url("infoUsuario") ?>">
                        <i class="bi bi-person me-2"></i>
                        <span class="align-middle">Mi Cuenta</span>
                      </a>
                    </li>
                    <li style="width: 85%" class="d-flex justify-content-center">
                      <a class="dropdown-item d-flex justify-content-center iconoAvatar" id="enlaceMisReservasHome" href="#">
                      <i class="bi bi-calendar-check"></i>
                        <span class="align-middle">Mis Reservas</span>
                      </a>
                    </li>
                    <li style="width: 85%" class="d-flex justify-content-center">
                      <a class="dropdown-item d-flex justify-content-center iconoAvatar" href="<?=site_url('/logout')?>">
                        <i class="bi bi-door-open me-2"></i>
                        <span class="align-middle">Cerrar Sesión</span>
                      </a>
                    </li>
                  </ul>
                </li>
        <?php } else { ?>
          <li class="nav-item">
            <a class="nav-link" href=<?=site_url('/login')?>>Iniciar Sesión</a>
          </li>
        <?php } ?>
      </ul>
    </div>
  </div>
    </nav>
  </div>


    <div class="infoIndex">
      <h1>Ahora Es Más Fácil Reservar <span>Las Instalaciones</span></h1>
      <a href=<?= site_url('/instalaciones') ?> class="botonInstalaciones" style="margin-left: 10%;">Instalaciones</a>
    </div>
  </header>
  <main>
    <div data-aos="fade-right" class="info-carrusel" >
      <div class="carrusel">
          <img src="<?=base_url()?>images/portada.jpg" alt="">
      </div>
      <div data-aos="fade-left" class="texto">
        <h2>¿Qúe hacemos?</h2>
        <p>Con nuestra aplicación intentamos ayudar a las poblaciones a fomentar su actividad cultural, deportiva... entre otras, de manera que nunca se pierda la esencia del lugar</p>
      </div>
    </div>


    <div data-aos="fade-left" class="info-carrusel" >

      <div data-aos="fade-right" class="texto">
        <h3>¿Cómo lo hacemos?</h3>
        <p>Lo hacemos gracias a nuestra aplicación Resérvalo!!. Aplicación web con la que cualquiero puede acceder a cualquier instalacción del municipio en cualquier momento, teniendo la información de cada instalación, además de la posibilidad de reservarla en el alcance de su mano</p>
        <p>Por otro lado, también ayuda al municipio en cuestión con nuestra parde de administrador, en la que el usuario administrador puede controlar cada de una de las instalaciones, con sus debidos horarios y debidas reservas</p>
      </div>

      <div class="carrusel">
          <img src="<?=base_url()?>images/portada2.png" alt="" >
      </div>
    </div>

    
    <!-- <div class="categorias">
      <h1>
        Categorias
      </h1>
      <div data-aos="zoom-in">
        <a href="<?=site_url("/instalaciones?categoria=1")?>"><h1>Deportivas</h1></a>
      </div>
      <div data-aos="zoom-in">
      <a href="<?=site_url("/instalaciones?categoria=2")?>"><h1>Culturales</h1></a>
      </div>
      <div data-aos="zoom-in">
      <a href="<?=site_url("/instalaciones?categoria=3")?>"><h1>Ocio</h1></a>
      </div>
      <div data-aos="zoom-in">
      <a href="<?=site_url("/instalaciones?categoria=4")?>"><h1>Otras</h1></a>
      </div>
    </div>  -->
    <div class="numeros">
      <h1>Instalaciones</h1>
      
      <?php
        if($numeroInstalaciones > 0)
        {
          ?>
          <div>
          <h1 data-purecounter-start="0" data-purecounter-end="<?= $numeroInstalaciones?>" data-purecounter-duration="0.5" class="purecounter"></h1>
          <p>Instalaciones</p>
          </div>
          <?php
        }

        if(count($instalacionesCategoria) > 0) 
        {
          foreach($instalacionesCategoria as $key => $value){
            ?>
              <div>
                <h1 data-purecounter-start="0" data-purecounter-end="<?= $value['numInstalaciones']?>" data-purecounter-duration="0.5" class="purecounter"></h1>
                <p><?php echo $value['nombre']?></p>
              </div>
            <?php
          }
        }
      ?>
      <div class="irInstalaciones">
      <a class="botonInstalaciones" href="<?=site_url('/instalaciones')?>">Instalaciones</a>
      </div>
    </div>
    <br><br>
  </main>
  <footer>
    <div class="opcionesMenuFooter">
      <a href="<?php echo base_url();?>">Home</a>
    </div>

    <div class="nombre-logos">
      <img src="<?php echo base_url(); ?>/images/logoNegro.png" alt="">
      <hr>
      <div class="iconos">
        <a href="#"><img src="<?php echo base_url(); ?>/images/instagram.png" alt=""></a>
        <a href="#"><img src="<?php echo base_url(); ?>/images/facebook.png" alt=""></a>
        <a href="#"><img src="<?php echo base_url(); ?>/images/twitter.png" alt=""></a>
        <a href="#"><img src="<?php echo base_url(); ?>/images/youtube.png" alt=""></a>
      </div>
    </div>
    <div class="opcionesCookies">
      <a href="mailto:reservalo356@gmail.com">Contacta con nosotros</a>
    </div>
  </footer>
  <input type="hidden" id="baseUrl" value="<?=$baseUrl?>">
</body>


<!-- Modal de reservas -->
<div class="modal fade" id="modalMisReservas">
  <div class="modal-dialog modal-dialog-centered contenedor modal-lg">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h3 class="modal-title">Mis Reservas</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background-color:white"></button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body modelo">
          <div>
            
          </div>
      </div>

    </div>
  </div>
</div>


<!-- Modal de confirmacion de borrar Reserva  -->
<div class="modal fade" id="modalBorrarReserva">
  <div class="modal-dialog modal-dialog-centered contenedor modal-lg">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h3 class="modal-title">Borrar Reserva</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background-color:white"></button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body modelo ">
        <h4 id="tituloBorrar" style="text-align: center">¿Está seguro que quiere borrar la reserva?</h4>
        
            <div class="d-flex justify-content-center botonesForm gap-5">
                <button id="btnBorrarReservaHome" class="botonInstalaciones">Borrar</button>
                <button id="cancelarBorrarReserva" class="botonInstalaciones">Cancelar</button>
            </div>
       

      </div>
    </div>
  </div>
</div>

</html>