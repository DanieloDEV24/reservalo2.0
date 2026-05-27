<?php
helper('url');
try {
    $session = session();
} catch (\Throwable $e) {
    $session = null;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Error del servidor — Reservas Municipales</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="<?php echo base_url(); ?>css/style.css">
  <link rel="stylesheet" href="<?php echo base_url(); ?>css/responsive.css">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css">

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --teal: #2dcfb3;
      --teal-dark: #1aab93;
      --teal-light: #e1f8f4;
      --navy: #1e2d3d;
      --gray-bg: #f0f2f5;
      --gray-mid: #8a9bb0;
      --white: #ffffff;
      --border: #e2e8f0;
      --text-secondary: #5a6e85;
    }

    body {
      font-family: 'Nunito', sans-serif;
      background: var(--gray-bg);
      color: var(--navy);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem 2rem;
    }

    .error-card {
      background: var(--white);
      border-radius: 24px;
      border: 1px solid var(--border);
      width: 100%;
      max-width: 680px;
      padding: 3.5rem 3rem;
      text-align: center;
      animation: floatUp 0.55s cubic-bezier(.22,.68,0,1.2) both;
    }

    /* ── ILLUSTRATION ── */
    .illustration {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      gap: 0;
      animation: floatUp 0.5s 0.1s cubic-bezier(.22,.68,0,1.2) both;
    }

    .num-main {
      font-size: 8rem;
      font-weight: 800;
      color: var(--navy);
      line-height: 1;
      letter-spacing: -4px;
    }

    .num-accent {
      font-size: 8rem;
      font-weight: 800;
      color: #32cccc;
      line-height: 1;
      letter-spacing: -4px;
    }

    /* ── BADGE ── */
    .badge-error {
      display: inline-block;
      background: #fef3f2;
      color: #c0392b;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 4px 14px;
      border-radius: 50px;
      margin-bottom: 1.2rem;
      border: 1px solid #fcd5d1;
    }

    h1.error-title {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--navy);
      margin-bottom: 0.75rem;
      line-height: 1.25;
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.6;
      margin: 0 auto 2.2rem;
    }

    /* ── ACTIONS ── */
    .actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 2.5rem;
    }

    .btn-primary-err {
      background: var(--teal);
      color: var(--white);
      border: none;
      padding: 0.75rem 1.8rem;
      border-radius: 50px;
      font-family: 'Nunito', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s, transform 0.15s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary-err:hover {
      background: var(--teal-dark);
      color: var(--white);
      transform: translateY(-1px);
    }

    .btn-secondary-err {
      background: transparent;
      color: var(--navy);
      border: 1.5px solid var(--border);
      padding: 0.75rem 1.8rem;
      border-radius: 50px;
      font-family: 'Nunito', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: border-color 0.2s, color 0.2s, transform 0.15s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-secondary-err:hover {
      border-color: var(--teal);
      color: var(--teal);
      transform: translateY(-1px);
    }

    /* ── QUICK LINKS ── */
    .divider {
      border: none;
      border-top: 1px solid var(--border);
      margin-bottom: 1.8rem;
    }

    .quick-label {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--gray-mid);
      margin-bottom: 1rem;
    }

    .quick-links {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .quick-link {
      display: flex;
      align-items: center;
      gap: 7px;
      background: var(--gray-bg);
      color: var(--navy);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 50px;
      border: 1px solid var(--border);
      transition: background 0.2s, border-color 0.2s;
    }

    .quick-link:hover {
      background: var(--teal-light);
      border-color: var(--teal);
      color: var(--teal-dark);
    }

    .quick-link svg {
      width: 15px;
      height: 15px;
      flex-shrink: 0;
    }

    /* ── ANIMATION ── */
    @keyframes floatUp {
      0%   { opacity: 0; transform: translateY(24px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 480px) {
      .error-card { padding: 2.5rem 1.5rem; }
      .num-main, .num-accent { font-size: 5rem; }
      h1.error-title { font-size: 1.35rem; }
    }
  </style>
</head>
<body>

  <!-- NAVBAR -->
  <header class="headerPlantilla">
    <img src="<?= base_url() ?>images/logo-reservalo.png" alt="">
    <nav class="align-items-center nav-grande">
      <a href="<?= base_url() ?>" class="menu__link">Home</a>
      <a href="<?= base_url() ?>index.php/instalaciones" class="menu__link">Instalaciones</a>

      <?php if ($session && $session->has('usuario') && intval($session->get('usuario')['rol']) === 2): ?>
      <div class="dropdown">
        <a class="dropdown-toggle menu__link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Gestores
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" style="color: #000;" href="<?= base_url() ?>index.php/crudInstalaciones">Gestor Instalaciones</a></li>
          <li><a class="dropdown-item" style="color: #000;" href="<?= base_url() ?>index.php/gestorCategorias">Gestor Categorias</a></li>
          <li><a class="dropdown-item" style="color: #000;" href="<?= base_url() ?>index.php/crudReservas">Gestor Reservas</a></li>
          <li><a class="dropdown-item" style="color: #000;" href="<?= base_url() ?>index.php/gestorUsuarios">Gestor Usuarios</a></li>
        </ul>
      </div>
      <a href="<?= base_url() ?>index.php/dashboard" class="menu__link">Estadística</a>
      <?php endif; ?>
    </nav>

    <div class="div-contacto-menu-movil">
      <div style="text-align: end; display: flex; justify-content: end"
           class="inicio-sesion <?= ($session && $session->has('usuario')) ? 'sesion-iniciada' : 'sesion-no-iniciada' ?>"
           id="menu-usuario"
           data-rol="<?= ($session && $session->has('usuario')) ? $session->get('usuario')['rol'] : '' ?>"
           data-index="<?= ($session && $session->has('usuario')) ? $session->get('usuario')['id_usuario'] : '' ?>">

        <?php if ($session && $session->has('usuario')):
          $usuario = $session->get('usuario'); ?>
          <li class="navbar-dropdown dropdown-user dropdown mainLi">
            <a class="btn-primary-personal dropdown-toggle hide-arrow d-flex align-items-center justify-content-end gap-2"
               href="javascript:void(0);" data-bs-toggle="dropdown" style="padding: 3%;">
              <i class="bi bi-person" style="font-size: 25px;"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end iconoAvatar" style="background-color: #111">
              <li style="width: 100%" class="d-flex justify-content-start">
                <a class="dropdown-item d-flex justify-content-start iconoAvatar" href="<?= site_url('/logout') ?>">
                  <i class="bi bi-door-open me-2"></i>
                  <span class="align-middle">Cerrar Sesión</span>
                </a>
              </li>
              <?php if (intval($session->get('usuario')['rol']) === 1): ?>
                <li style="width: 100%" class="d-flex justify-content-start drop-mis-reservas">
                  <a class="dropdown-item d-flex justify-content-start iconoAvatar" id="btnMisReservas" href="#">
                    <i class="bi bi-calendar-check me-2"></i>
                    <span class="align-middle">Mis Reservas</span>
                  </a>
                </li>
                <li style="width: 100%" class="d-flex justify-content-start drop-mi-perfil">
                  <a class="dropdown-item d-flex justify-content-start iconoAvatar" id="btnMiPerfil" href="#"
                     data-index="<?= intval($session->get('usuario')['id_usuario']) ?>">
                    <i class="bi bi-person-fill"></i>
                    <span class="align-middle">Mi perfil</span>
                  </a>
                </li>
              <?php endif; ?>
            </ul>
          </li>
        <?php else: ?>
          <a href="<?= base_url() ?>index.php/login" class="btn-primary-personal">
            <i class="bi bi-person"></i> Iniciar Sesión
          </a>
        <?php endif; ?>
      </div>

      <label class="menu-movil" style="display: none;">
        <input class="inp" checked="" type="checkbox" />
        <div class="bar">
          <span class="top bar-list"></span>
          <span class="middle bar-list"></span>
          <span class="bottom bar-list"></span>
        </div>
        <section class="menu-container">
          <div class="menu-list"><i class="bi bi-house"></i><a href="<?= base_url() ?>">Home</a></div>
          <div class="menu-list"><i class="bi bi-buildings"></i><a href="<?= base_url() ?>index.php/instalaciones">Instalaciones</a></div>
          <?php if ($session && $session->has('usuario') && intval($session->get('usuario')['rol']) === 2): ?>
            <div class="menu-list"><i class="bi bi-building-gear"></i><a href="<?= base_url() ?>index.php/crudInstalaciones">Gestor instalaciones</a></div>
            <div class="menu-list"><i class="bi bi-tag"></i><a href="<?= base_url() ?>index.php/gestorCategorias">Gestor categorías</a></div>
            <div class="menu-list"><i class="bi bi-bookmark-check"></i><a href="<?= base_url() ?>index.php/crudReservas">Gestor reservas</a></div>
            <div class="menu-list"><i class="bi bi-people"></i><a href="<?= base_url() ?>index.php/gestorUsuarios">Gestor usuarios</a></div>
            <div class="menu-list"><i class="bi bi-graph-down"></i><a href="<?= base_url() ?>index.php/dashboard">Estadísticas</a></div>
          <?php elseif ($session && $session->has('usuario') && intval($session->get('usuario')['rol']) === 1): ?>
            <div class="menu-list"><i class="bi bi-person"></i><a href="#" id="btnMisReservas">Mis Reservas</a></div>
            <div class="menu-list"><i class="bi bi-person-fill"></i><a href="#" id="btnMiPerfil">Mi Perfil</a></div>
          <?php endif; ?>
        </section>
      </label>
    </div>
  </header>

  <!-- MAIN CONTENT -->
  <main>
    <div class="error-card">

      <div class="illustration">
        <span class="num-main">Upss</span>
        <span class="num-accent">...</span>
      </div>

      <div class="badge-error" style="margin-top: 5% !important; margin-bottom: 5% !important;">
        <i class="bi bi-exclamation-triangle-fill me-1"></i>
        Error interno del servidor
      </div>

      <h1 class="error-title">El servicio no está disponible en este momento</h1>
      <p class="subtitle">
        Ha ocurrido un error inesperado en nuestro sistema.<br>
        Por favor, inténtelo de nuevo más tarde o póngase en contacto con nosotros.<br>
        No tardaremos en solucionarlos, disculpe las molestias
      </p>

      <div class="actions">
        <a href="<?= base_url() ?>" class="btn-primary-err">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Ir al inicio
        </a>
        <a href="javascript:history.back()" class="btn-secondary-err">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver atrás
        </a>
      </div>

      <hr class="divider">
      <p class="quick-label">Ir directamente a</p>
      <div class="quick-links">
        <a href="<?= base_url() ?>index.php/instalaciones" class="quick-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
          </svg>
          Instalaciones
        </a>
        <?php if ($session && $session->has('usuario') && intval($session->get('usuario')['rol']) === 2): ?>
        <a href="<?= base_url() ?>index.php/crudReservas" class="quick-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          Gestor reservas
        </a>
        <?php endif; ?>
        <a href="mailto:info@fuentedepiedra.es" class="quick-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          Contacto
        </a>
      </div>

    </div>
  </main>

  <!-- FOOTER -->
  <footer>
    <div class="principal-footer">
      <div class="logo-titulo">
        <img src="<?= base_url() ?>images/logo-reservalo.png" alt="">
        <h1>Reservalo</h1>
      </div>
      <p>Plataforma digital que permite a la ciudadanía reservar fácilmente instalaciones deportivas y espacios municipales. Ofrece información actualizada, gestión de reservas y pagos en línea, facilitando un acceso más ágil, transparente y participativo a los servicios públicos.</p>
      <div class="redes-sociales">
        <a href=""><i class="bi bi-instagram"></i></a>
        <a href=""><i class="bi bi-facebook"></i></a>
        <a href=""><i class="bi bi-envelope"></i></a>
      </div>
    </div>

    <div class="info">
      <div class="columna-plataforma">
        <div class="titulo-plataforma"><i class="bi bi-phone"></i><h3>Nuestra Plataforma</h3></div>
        <a href="">Inicio</a>
        <a href="">Instalaciones</a>
        <a href="">Gestor de Instalaciones</a>
        <a href="">Gestor de Categorías</a>
      </div>
      <div class="columna-soporte">
        <div class="titulo-soporte"><i class="bi bi-megaphone"></i><h3>Soporte</h3></div>
        <a href="">Manual de Usuario</a>
        <a href="">Contacto soporte</a>
      </div>
      <div class="columna-contacto" style="width: 35%;">
        <div class="titulo-contacto"><i class="bi bi-person-circle"></i><h3>Contacto</h3></div>
        <div style="margin-bottom: .5em;"><i class="bi bi-telephone-fill"></i><a href="">952 73 50 16</a></div>
        <div style="margin-bottom: .5em;"><i class="bi bi-envelope"></i><a href="">info@fuentedepiedra.es</a></div>
        <div style="margin-bottom: .5em;"><i class="bi bi-geo-alt-fill"></i><a href="">C. Ancha, 9, Fuente de Piedra, Málaga, 29520</a></div>
        <div style="margin-bottom: .5em;"><i class="bi bi-clock"></i><a href="">Lunes - Viernes: 07:30h - 14:00h</a></div>
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