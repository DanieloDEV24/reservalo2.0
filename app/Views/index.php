<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reservalo 2.0</title>

  <link rel="icon" href="<?= base_url() ?>images/logo-reservalo.png" type="image/png">

  <link rel="stylesheet" type="text/css" href="<?= base_url() ?>css/style.css" />
  <link rel="stylesheet" type="text/css" href="<?= base_url() ?>css/home.css" />
  <link rel="stylesheet" type="text/css" href="<?= base_url() ?>css/instalaciones.css" />
  <link rel="stylesheet" type="text/css" href="<?= base_url() ?>css/responsive.css" />
  <link rel="stylesheet" type="text/css" href="<?= base_url() ?>css/loader.css" />
  <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>css/splash.css" media="screen" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

  <script>
    const BASE_URL = "<?= base_url() ?>";
  </script>

  <script src="<?= base_url() ?>js/jquery.js"></script>
  <script src="<?= base_url() ?>js/movimiento.js"></script>
  <script src="<?= base_url() ?>js/plantilla.js"></script>
  <script src="<?= base_url() ?>js/home.js"></script>
  <script src="<?= base_url() ?>js/loader.js"></script>
  <script src="<?= base_url() ?>js/splash.js"></script>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

  <!-- CSS -->
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css" rel="stylesheet" />

  <!-- JS (después de jQuery) -->
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

</head>

<body>

    <div id="splash">
      <img src="<?= base_url() ?>images/logo-reservalo.png" alt="Reservalo" class="splash-logo">
      <div class="progress-track">
        <div class="progress-fill"></div>
      </div>
    </div>

  <header class="headerHome">
    <img src="<?= base_url() ?>images/logo-reservalo.png" alt="">
    <nav class="align-items-center nav-grande">
      <a href="<?= base_url() ?>" class="menu__link"> Home</a>
      <a href="<?= base_url() ?>index.php/instalaciones" class="menu__link"> Instalaciones</a>
      <a href="<?= base_url() ?>index.php/actividades" class="menu__link"> Actividades</a>


      <?php $session = session(); ?>
      <?php if ($session->has('usuario') && intval($session->get('usuario')['rol']) === 2): ?>
        <div class="dropdown">
          <a class="dropdown-toggle menu__link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Gestores
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" style="color: #000;" type="button" href="<?= base_url() ?>index.php/crudInstalaciones"> Gestor Instalaciones</a></li>
            <li><a class="dropdown-item" style="color: #000;" type="button" href="<?= base_url() ?>index.php/gestorCategorias"> Gestor Categorias</a></li>
            <li><a class="dropdown-item" style="color: #000;" type="button" href="<?= base_url() ?>index.php/crudReservas"> Gestor Reservas</a></li>
            <li><a class="dropdown-item" style="color: #000;" type="button" href="<?= base_url() ?>index.php/gestorUsuarios"> Gestor Usuarios</a></li>
          </ul>
        </div>
        <a href="<?= base_url() ?>index.php/dashboard" class="menu__link"> Estadística</a>
      <?php endif; ?>
      <a href="<?= base_url() ?>index.php/contacto" class="menu__link"> Contacto</a>
    </nav>

    <div class="div-contacto-menu-movil">
      <div style="text-align: end; display: flex; justify-content: end" class="inicio-sesion <?= ($session->has('usuario')) ? "sesion-iniciada" : "sesion-no-iniciada" ?>" id="menu-usuario" data-rol="<?= $session->has('usuario') ? $session->get('usuario')['rol'] : '' ?>" data-index="<?= $session->has('usuario') ? $session->get('usuario')['id_usuario'] : '' ?>">
        <?php
        if ($session->has('usuario')) {
          // La sesión 'usuario' existe
          $usuario = $session->get('usuario');
        ?>
          <!-- <li class="nav-item">
            <a  class="nav-link" href=<?= site_url('/logout') ?>><span>Cerrar Sesión</span><i class="bi bi-arrow-right"></i></a>
          </li> -->
          <li class="navbar-dropdown dropdown-user dropdown mainLi">
            <a class="btn-primary-personal dropdown-toggle hide-arrow d-flex align-items-center justify-content-end gap-2" href="javascript:void(0);" data-bs-toggle="dropdown" style="padding: 3%;">
              <i class="bi bi-person" style="font-size: 25px;"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end iconoAvatar" style="background-color: #111">
              <li style="width: 100%" class="d-flex justify-content-start">
                <a class="dropdown-item d-flex justify-content-start iconoAvatar" href="<?= site_url('/logout') ?>">
                  <i class="bi bi-door-open me-2"></i>
                  <span class="align-middle">Cerrar Sesión</span>
                </a>
              </li>

              <?php if ($session->has('usuario') && intval($session->get('usuario')['rol']) === 1): ?>
                <li style="width: 100%" class="d-flex justify-content-start drop-mis-reservas">
                  <a class="dropdown-item d-flex justify-content-start iconoAvatar" id="btnMisReservas" href="#">
                    <i class="bi bi-calendar-check me-2"></i>
                    <span class="align-middle">Mis Reservas</span>
                  </a>
                </li>

                <li style="width: 100%" class="d-flex justify-content-start drop-mi-perfil">
                  <a class="dropdown-item d-flex justify-content-start iconoAvatar" id="btnMiPerfil" href="#" data-index="<?= intval($session->get('usuario')["id_usuario"]) ?>">
                    <i class="bi bi-person-fill"></i>
                    <span class="align-middle">Mi perfil</span>
                  </a>
                </li>
              <?php endif; ?>
            </ul>

          </li>
        <?php
        } else {
          // No existe la sesión 'usuario'
        ?>
          <a href="<?= base_url() ?>index.php/login" class="btn-primary-personal"><i class="bi bi-person"></i> Iniciar Sesión</a>
        <?php
        }
        ?>
      </div>

      <label class="menu-movil" style="display: none;">
        <input class="inp" checked="" type="checkbox" />
        <div class="bar">
          <span class="top bar-list"></span>
          <span class="middle bar-list"></span>
          <span class="bottom bar-list"></span>
        </div>
        <section class="menu-container">
          <div class="menu-list">
            <i class="bi bi-house"></i>
            <a href="<?= base_url() ?>">Home</a>
          </div>
          <div class="menu-list">
            <i class="bi bi-buildings"></i>
            <a href="<?= base_url() ?>index.php/instalaciones">Instalaciones</a>
          </div>

          <div class="menu-list">
            <i class="bi bi-buildings"></i>
            <a href="<?= base_url() ?>index.php/actividades">Actividades</a>
          </div>

          <?php if ($session->has('usuario') && intval($session->get('usuario')['rol']) === 2): ?>

            <div class="menu-list">
              <i class="bi bi-building-gear"></i>
              <a href="<?= base_url() ?>index.php/crudInstalaciones" style="--i: 1">Gestor instalaciones</a>
            </div>

            <div class="menu-list">
              <i class="bi bi-tag"></i>
              <a href="<?= base_url() ?>index.php/gestorCategorias" style="--i: 2">Gestor categorías</a>
            </div>

            <div class="menu-list">
              <i class="bi bi-bookmark-check"></i>
              <a href="<?= base_url() ?>index.php/crudReservas" style="--i: 3">Gestor reservas</a>
            </div>

            <div class="menu-list">
              <i class="bi bi-people"></i>
              <a href="<?= base_url() ?>index.php/gestorUsuarios" style="--i: 4">Gestor usuarios</a>
            </div>

            <div class="menu-list">
              <i class="bi bi-graph-down"></i>
              <a href="<?= base_url() ?>index.php/dashboard" style="--i: 5">Estadísticas</a>
            </div>
          <?php elseif ($session->has('usuario') && intval($session->get('usuario')['rol']) === 1):  ?>
            <div class="menu-list">
              <i class="bi bi-person"></i>
              <a href="#" style="--i: 4" id="btnMisReservas">Mis Reservas</a>
            </div>

            <div class="menu-list">
              <i class="bi bi-person-fill"></i>
              <a href="#" style="--i: 4" id="btnMiPerfil">Mi Perfil</a>
            </div>
          <?php endif; ?>

            <div class="menu-list">
              <i class="bi bi-envelope"></i>
              <a style="--i: 4" href="<?= base_url() ?>index.php/contacto">Contacto</a>
            </div>
        </section>
      </label>
    </div>

  </header>
  <?= $view ?>
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

        <a href="<?= base_url() ?>">Inicio</a>

        <a href="<?= base_url() ?>index.php/instalaciones">Instalaciones</a>

        <a href="<?= base_url() ?>index.php/actividades">Actividades</a>

        <a href="<?= base_url() ?>index.php/contacto">Contacto</a>

      </div>


      <div class="columna-soporte">

        <div class="titulo-soporte">
          <i class="bi bi-megaphone"></i>
          <h3>Soporte</h3>
        </div>

        <a href="">Manual de Usuario</a>

        <a href="">Contacto soporte</a>

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
      <p>© 2026 Reservalo. Todos los derechos reservados.</p>
      <div class="footer-legal">
        <a href="<?= base_url() ?>index.php/politicasPrivacidad">Política de privacidad</a>
        <a href="<?= base_url() ?>index.php/cookies">Cookies</a>
        <a href="<?= base_url() ?>index.php/avisoLegal">Aviso legal</a>
      </div>
    </div>
  </footer>

  <div id="ajax-loader-overlay">
    <div class="loader-col">
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="loader-text">Cargando...</div>
    </div>
  </div>

</body>

<?= isset($modalInformacionPersonal) ? $modalInformacionPersonal : '' ?>
<?= isset($modalMisReservas) ? $modalMisReservas : '' ?>
<?= isset($modalEditarReservaActividadUsuario) ? $modalEditarReservaActividadUsuario : '' ?>
<?= isset ($modalEliminarReservaActividadUsuario) ? $modalEliminarReservaActividadUsuario : '' ?>


</html>