<section class="home" aria-labelledby="hero-heading">
    <div class="textoPortada">
      <h1 id="hero-heading">Reserva tu espacio, disfruta el deporte — <span>instalaciones municipales a tu alcance.</span></h1>
      <a href="<?= base_url() ?>index.php/instalaciones" class="btn-primary-personal">Instalaciones</a>
    </div>

    <div class="contenedor-busq">
      <div class="mainDivBusqueda w-100">
        <form class="barraBusqueda" role="search" aria-label="Buscar instalaciones deportivas" onsubmit="return false;">

          <div class="contenedor-categorias-busqueda">
            <label for="categorias-home">Categoria:</label>
            <select id="categorias-home" name="categoria">
              <option value="-1" selected>Seleccione una</option>
              <?php if (isset($categorias) && count($categorias) > 0): ?>
                <?php foreach ($categorias as $categoria): ?>
                  <option value="<?= $categoria["id_categoria"] ?>"><?= $categoria["nombre"] ?></option>
                <?php endforeach; ?>
              <?php endif; ?>
            </select>
          </div>

          <div class="contenedor-instalaciones-busqueda">
            <label for="todas-instalaciones-home">Instalacion:</label>
            <select id="todas-instalaciones-home" name="instalacion">
              <option value="-1" selected>Seleccione una</option>
              <?php if (isset($instalacionesTodas) && count($instalacionesTodas) > 0): ?>
                <?php foreach ($instalacionesTodas as $instalacion): ?>
                  <option value="<?= $instalacion["id_instalacion"] ?>"><?= $instalacion["nombre"] ?></option>
                <?php endforeach; ?>
              <?php endif; ?>
            </select>
          </div>

          <div class="contenedor-reservas-completas-busqueda">
            <label for="reserva-completa-home">Reserva completa:</label>
            <label class="toggle-switch">
              <input type="checkbox" class="iluminacion" id="reserva-completa-home">
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
            </label>
          </div>

          <div class="contenedor-btn-busqueda">
            <button type="button" class="btn-primary-personal" id="busqueda-home" aria-label="Buscar">
              <i class="bi bi-search" aria-hidden="true"></i>
            </button>
          </div>

        </form>
      </div>
    </div>
  </section>

  <section class="contenedor-datos-gif" aria-label="Datos de la plataforma">

    <div class="datos-gif-parrafo">
      <p style="text-align: center;">Un sistema único que facilita la gestión municipal de instalaciones y permite a los ciudadanos reservarlas de forma rápida y sencilla.</p>
    </div>

    <div class="datos-gif">
      <figure class="dato-gif" style="margin:0;">
        <img src="<?= base_url() ?>images/GIF/estadio.gif" alt="" aria-hidden="true" loading="lazy">
        <figcaption class="texto-dato-gif">
          <h2>+10</h2>
          <p>Instalaciones</p>
        </figcaption>
      </figure>

      <figure class="dato-gif" style="margin:0;">
        <img src="<?= base_url() ?>images/GIF/categoria.gif" alt="" aria-hidden="true" loading="lazy">
        <figcaption class="texto-dato-gif">
          <h2>+5</h2>
          <p>Categorías distintas</p>
        </figcaption>
      </figure>

      <figure class="dato-gif" style="margin:0;">
        <img src="<?= base_url() ?>images/GIF/agregar-usuario.gif" alt="" aria-hidden="true" loading="lazy">
        <figcaption class="texto-dato-gif">
          <h2>+30</h2>
          <p>Usuarios registrados</p>
        </figcaption>
      </figure>

      <figure class="dato-gif" style="margin:0;">
        <img src="<?= base_url() ?>images/GIF/reloj.gif" alt="" aria-hidden="true" loading="lazy">
        <figcaption class="texto-dato-gif">
          <h2>24h</h2>
          <p>Sistema de reservas</p>
        </figcaption>
      </figure>
    </div>

  </section>

  <section class="content containerComoFunciona" aria-labelledby="como-funciona-heading">
    <div class="comoFunciona">
      <h1 id="como-funciona-heading">—¿Cómo funciona?</h1>
      <ol>
        <li>Elige tu deporte</li>
        <li>Busca tu instalación</li>
        <li>Reserva en segundos</li>
      </ol>
      <p><em>"El deporte más cerca que nunca"</em></p>
    </div>

    <div class="divImagenes">
      <img src="<?= base_url() ?>images/ImageComoFunciona4.jpg" alt="Persona practicando deporte en una instalación municipal">
      <img src="<?= base_url() ?>images/ImageComoFunciona2.jpg" alt="Vecinos disfrutando de una instalación deportiva">
      <img src="<?= base_url() ?>images/ImageComoFunciona1.jpg" alt="" style="display: none;">
    </div>
  </section>

  <section class="contenedor-top-instalaciones" aria-label="Instalaciones destacadas">

    <div id="instalacionesCarousel" class="carousel slide">
      <div class="carousel-inner" id="carousel-inner-instalaciones">

        <?php if (isset($instalacionesCarrousel) && count($instalacionesCarrousel) > 0): ?>
        <?php foreach ($instalacionesCarrousel as $instalacion):
          $url = base_url() . "images/" . $instalacion["imagen1"];
        ?>

          <div class="card-instalacion" data-index="<?= $instalacion["id_instalacion"] ?>">
            <div class="card-image" style="background-image:url('<?= $url ?>')" role="img" aria-label="Imagen de <?= $instalacion["nombre"] ?>"></div>

            <p class="category" style="margin:0;"><?= $instalacion["categoria_name"] ?></p>
            <h3 class="heading" style="margin:0;"><?= $instalacion["nombre"] ?></h3>

            <div class="opciones" role="list">
              <?= ($instalacion["iluminacion"] == 1) ? '<span role="listitem">Iluminacion</span>' : "" ?>
              <?= ($instalacion["puede_completo"] == 1) ? '<span role="listitem">Reserva completa</span>' : "" ?>
              <?= ($instalacion["no_pistas"] == 1) ? '<span role="listitem">No tiene pistas</span>' : "" ?>
              <?= ($instalacion["material"] == 1) ? '<span role="listitem">Material</span>' : "" ?>
            </div>

            <div class="button">
              <a href="<?= "index.php/instalacion/" . $instalacion["id_instalacion"] ?>" class="btn-primary-personal" aria-label="Ir a la instalación <?= $instalacion["nombre"] ?>">
                Ir a instalación <i class="bi bi-arrow-right" aria-hidden="true"></i>
              </a>
            </div>

            <span class="estado <?= ($instalacion["estado"] == 0) ? "disponible" : "no-disponible" ?>" role="status">
              <?= ($instalacion["estado"] == 0) ? "disponible" : "no disponible" ?>
            </span>
          </div>

        <?php endforeach; ?>
        <?php endif; ?>

      </div>

      <div class="carousel-indicators" id="carousel-indicators-instalaciones"></div>

      <button class="carousel-control-prev btn-prev-top-instalaciones" type="button" data-bs-target="#instalacionesCarousel" data-bs-slide="prev" aria-label="Instalación anterior">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>

      <button class="carousel-control-next btn-next-top-instalaciones" type="button" data-bs-target="#instalacionesCarousel" data-bs-slide="next" aria-label="Siguiente instalación">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>

    </div>

    <div class="contenedor-btn-ver-instalaciones">
      <a href="<?= base_url() ?>instalaciones" class="btn-primary-personal">Ver instalaciones <span aria-hidden="true">→</span></a>
    </div>

  </section>