<html>
<div class="home">
  <div class="textoPortada">
    <h1>Reserva tu espacio, disfruta el deporte — instalaciones municipales a tu alcance.</h1>
    <a href="" class="btn-primary-personal">Instalaciones</a>
  </div>

  <div class="contenedor-busq">
    <div class="mainDivBusqueda w-100">
      <div class="barraBusqueda">
        <div class="contenedor-categorias-busqueda">
          <label for="">Categoria:</label>
          <select id="categorias-home">
            <option value="-1" selected>Seleccione una categoría</option>
            <?php foreach($categorias as $categoria) : ?>
              <option value="<?= $categoria["id_categoria"] ?>"><?= $categoria["nombre"] ?></option>
            <?php endforeach ; ?>
          </select>
        </div>

        <div class="contenedor-instalaciones-busqueda">
          <label for="">Instalacion:</label>
          <select name="" id="todas-instalaciones-home">
            <option value="-1" selected>Seleccione una instalación</option>
              <?php foreach($instalacionesTodas as $inst) : ?>
                <option value="<?= $inst["id_instalacion"] ?>"><?= $inst["nombre"] ?></option>
              <?php endforeach ; ?>
          </select>
        </div>

        <div class="contenedor-reservas-completas-busqueda">
          <label for="">Reserva completa:</label>
          <label class="toggle-switch">
              <input type="checkbox" class="iluminacion" id="reserva-completa-home">
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
          </label>
        </div>

        <div class="contenedor-btn-busqueda">
          <a href="" class="btn-primary-personal" id="busqueda-home">
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
      <div class="texto-dato-gif">
        <h2>+10</h2>
        <p>Instalaciones</p>
      </div>
    </div>

    <div class="dato-gif">
      <img src="<?= base_url() ?>/images/GIF/categoria.gif" class="" alt="...">
      <div class="texto-dato-gif">
        <h2>+5</h2>
        <p>Categorías distintas</p>
      </div>
    </div>

    <div class="dato-gif">
      <img src="<?= base_url() ?>/images/GIF/agregar-usuario.gif" class="" alt="...">
      <div class="texto-dato-gif">
        <h2>+30</h2>
        <p>Usuarios registrados</p>
      </div>
    </div>

    <div class="dato-gif">
      <img src="<?= base_url() ?>/images/GIF/reloj.gif" class="" alt="...">
      <div class="texto-dato-gif">
        <h2>24h</h2>
        <p>Sistema de reservas</p>
      </div>
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
    $url = base_url()."images/".$instalacion["imagen1"];
  ?>
    <div class="card-instalacion" data-index="<?=$instalacion["id_instalacion"]?>">
        <div class="card-image" style="background: url('<?=$url?>')"></div>
        <div class="category"> <?=$instalacion["categoria_name"]?> </div>
        <div class="heading"> <?=$instalacion["nombre"]?></div>
        <div class="opciones">
            <?= ($instalacion["iluminacion"] == 1) ? "<span>Iluminacion</span>" : "" ?>
            <?= ($instalacion["puede_completo"] == 1) ? "<span>Reserva completa</span>" : "" ?>
            <?= ($instalacion["no_pistas"] == 1) ? "<span>No tiene pistas</span>" : "" ?>
            <?= ($instalacion["material"] == 1) ? "<span>Material</span>" : "" ?>
        </div>
        <div class="button"><a href="<?=base_url()."index.php/instalacion/".$instalacion["id_instalacion"]?>" class="btn-primary-personal">Ir a instalación &nbsp;<i class="bi bi-arrow-right"></i></a></div>
        <span class="estado <?=($instalacion["estado"] == 0) ? "disponible" : "no-disponible" ?>"><?=($instalacion["estado"] == 0) ? "disponible" : "no disponible" ?></span>
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