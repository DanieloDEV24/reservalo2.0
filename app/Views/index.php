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
  <header>
    <img src="<?= base_url() ?>images/Logo.png" alt="">
    <nav>
      <a href="#">Link</a>
      <a href="#">Link</a>
      <a href="#">Link</a>
      <a href="#">Link</a>
    </nav>
    <div>
      <a href="" class="button">Iniciar Sesión</a>
    </div>
  </header>
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
  <div class="deportes">
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
            <div class="card" style="width: 30rem;">
              <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Card 1</h5>
                <p class="card-text">Contenido de la tarjeta 1.</p>
              </div>
            </div>
            <div class="card" style="width: 30rem;">
              <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Card 2</h5>
                <p class="card-text">Contenido de la tarjeta 2.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="carousel-item">
          <div class="d-flex justify-content-center gap-3">
            <div class="card" style="width: 30rem;">
              <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Card 3</h5>
                <p class="card-text">Contenido de la tarjeta 3.</p>
              </div>
            </div>
            <div class="card" style="width: 30rem;">
              <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Card 4</h5>
                <p class="card-text">Contenido de la tarjeta 4.</p>
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
  <footer>
    
  </footer>
</body>

</html>