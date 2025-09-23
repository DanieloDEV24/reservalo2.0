<html>
<div class="home">
  <div class="textoPortada">
    <h1>Reserva tu espacio, disfruta el deporte — instalaciones municipales a tu alcance.</h1>
    <a href="" class="btn-primary-personal">Instalaciones</a>
  </div>

  <div class="contenedor-busq">
    <div class="mainDivBusqueda w-100">
      <div class="barraBusqueda row">
        <div class="col-4">
          <label for="">Deporte</label>
          <select>
            <option value="-1" selected>Seleccionde Deporte</option>
          </select>
        </div>

        <div class="col-4">
          <label for="">Fecha</label>
          <input type="date">
        </div>

        <div class="col-3">
          <label for="">Hora</label>
          <input type="time">
        </div>

        <div class="contenedor-btn-busqueda col-1">
          <a href="" class="btn-primary-personal">
            <i class="bi bi-search"></i>
          </a>
        </div>
      </div>

    </div>
  </div>
</div>

<div class="contenedor-datos-gif">

  <div class="datos-gif-parrafo">
    <p style="text-align: center;">Un sistema único que facilita la gestión municipal de instalaciones y permite a los ciudadanos reservarlas de forma rápida y sencilla.</p>
  </div>

  <div class="datos-gif">
    <div class="dato-gif">
      <img src="<?= base_url() ?>/images/GIF/estadio.gif" class="" alt="...">
      <h2>+1500</h2>
      <p>Instalaciones</p>
    </div>

    <div class="dato-gif">
      <img src="<?= base_url() ?>/images/GIF/categoria.gif" class="" alt="...">
      <h2>+5</h2>
      <p>Categorías distintas</p>
    </div>

    <div class="dato-gif">
      <img src="<?= base_url() ?>/images/GIF/agregar-usuario.gif" class="" alt="...">
      <h2>+3000</h2>
      <p>Usuarios registrados</p>
    </div>

    <div class="dato-gif">
      <img src="<?= base_url() ?>/images/GIF/reloj.gif" class="" alt="...">
      <h2>24h</h2>
      <p>Sistema de reservas</p>
    </div>
  </div>

</div>

<div class="content containerComoFunciona">
  <div class="comoFunciona">
    <h1>—¿Cómo funciona?</h1>
    <ol>
      <li>Elige tu deporte</li>
      <li>Busca tu instalación</li>
      <li>Reserva en segundos</li>
    </ol>
    <p><em>"El deporte más cerca que nunca"</em></p><br>
    <a href="" class="btn-primary-personal" style="margin-left: 0; margin-top: 0">Instalaciones</a>
  </div>

  <div class="divImagenes">
    <img src="<?= base_url() ?>images/ImageComoFunciona4.jpg" alt="">
    <img src="<?= base_url() ?>images/ImageComoFunciona2.jpg" alt="">
    <!-- <img src="<?= base_url() ?>images/ImageComoFunciona3.jpg" alt="" > -->
  </div>
</div>
<div class="contenedor-top-instalaciones">
  <div class="top-instalaciones">
  <?php
  foreach ($instalacionesCarrousel as $instalacion) {
  ?>
    <!-- From Uiverse.io by Yaya12085 -->
    <div class="card">
      <div class="image"><img src="<?= base_url() ?>images/<?= $instalacion["imagen2"] ?>"></div>
      <div class="content-card-instalaciones-top">
        <a href="#">
          <span class="title">
            <?= $instalacion["nombre_pista"] ?>
          </span>
        </a>

        <p class="desc">
          <?= $instalacion["descripcion"] ?>
        </p>

        <a class="btn-primary-personal" href="#">
          Ver pista
          <span aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </div>
  <?php
  }
  ?>
</div>
<div class="contenedor-btn-ver-instalaciones">
  <a href="#" class="btn-primary-personal">Ver instalaciones <span aria-hidden="true">
            →
          </span></a>
</div>
</div>

</html>