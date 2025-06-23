<html>
     <div class="home">
    <div class="textoPortada">
      <h1>Reserva tu espacio, disfruta el deporte — instalaciones municipales a tu alcance.</h1>
      <a href="" class="button">Instalaciones</a>
    </div>

    <div>
      <div class="mainDivBusqueda w-100">
        <div class="barraBusqueda row">
          <div class="col">
            <label for="">Deporte</label>
            <select>
              <option value="-1" selected>Seleccionde Deporte</option>
            </select>
          </div>

          <div class="col">
            <label for="">Fecha</label>
            <input type="date">
          </div>

          <div class="col">
            <label for="">Hora</label>
            <input type="time">
          </div>
        </div>
        <a href="" class="button">
          Buscar <i class="bi bi-search"></i>
        </a>
      </div>
    </div>
  </div>

  <div class="content">

    <div class="comoFunciona">
      <h1>—¿Cómo funciona?</h1>
      <ol>
        <li>Elige tu deporte</li>
        <li>Busca tu instalación</li>
        <li>Reserva en segundos</li>
      </ol>
      <p><em>"El deporte más cerca que nunca"</em></p><br>
      <a href="" class="button" style="margin-left: 0; margin-top: 0">Instalaciones</a>
    </div>

    <div class="divImagenes">
      <img src="<?= base_url() ?>images/ImageComoFunciona4.jpg" alt="">
      <img src="<?= base_url() ?>images/ImageComoFunciona2.jpg" alt="">
      <!-- <img src="<?= base_url() ?>images/ImageComoFunciona3.jpg" alt="" > -->
    </div>
  </div>
  <div class="categorias">
    <span id="futbol">
      <h1>Fútbol</h1>
    </span>
    <span id="baloncesto">
      <h1>Baloncesto</h1>
    </span>
    <span id="voley">
      <h1>Voley</h1>
    </span>
    <span id="padel">
      <h1>Padel</h1>
    </span>
  </div>

  <div class="carruselTopReservas">
    <div id="cardCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">

        <!-- Slide 1 -->
        <div class="carousel-item active">
          <div class="d-flex justify-content-center gap-3">
            <div class="card" style="width: 40rem;">
              <img src="<?=base_url()?>/images/PistaPadel.jpg" class="card-img-top" alt="..." style="height: 250px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">Pista de Padel</h5>
                <p class="card-text">Pista de pádel de moqueta azul y paredes de vidrio</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="carousel-item">
          <div class="d-flex justify-content-center gap-3">
            <div class="card" style="width: 40rem;">
              <img src="<?=base_url()?>/images/PistaFutsal.jpg" class="card-img-top" alt="..." style="height: 250px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">Pistas de Fútbol Sala</h5>
                <p class="card-text">Pistas de fútbol sala interior</p>
              </div>
            </div>
          </div>
        </div>

          <div class="carousel-item">
          <div class="d-flex justify-content-center gap-3">
            <div class="card" style="width: 40rem;">
              <img src="<?=base_url()?>/images/CampoFutbol.jpg" class="card-img-top" alt="..." style="height: 250px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">Campo de Fútbol</h5>
                <p class="card-text">Campo de fútbol de césped artificial </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Controles -->
      <button class="carousel-control-prev" type="button" data-bs-target="#cardCarousel" data-bs-slide="prev" style="color: #000;">
        <span class="carousel-control-prev-icon" style="color: #000;"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#cardCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>
</html>