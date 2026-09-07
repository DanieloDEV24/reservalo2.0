<section class="pagina-contacto" aria-labelledby="titulo-contacto">
    <h1 class="title-page" id="titulo-contacto">Contacto</h1>
    <p class="description-page" style="margin-bottom: 3% !important;">Estamos aquí para ayudarte con cualquier consulta sobre las instalaciones, su reserva...</p>

    <div class="grid-contacto">
        <article class="contacto-informacion" aria-labelledby="titulo-info-contacto">
            <div class="contenedor-contacto-header">
                <i class="bi bi-clock" aria-hidden="true"></i>
                <h2 id="titulo-info-contacto">Información de contacto</h2>
            </div>

            <address class="contenedor-tipo-informacion">
                <div class="telefono-contacto">
                    <div class="icono-contacto">
                        <i class="bi bi-telephone" aria-hidden="true"></i>
                    </div>
                    <div class="informacion-telefono">
                        <p class="etiqueta-contacto">TELÉFONO</p>
                        <p><a style="color: #32cccc; text-decoration: none" href="tel:952735016">952 73 50 16</a></p>
                    </div>
                </div>

                <hr>

                <div class="email-contacto">
                    <div class="icono-contacto">
                        <i class="bi bi-envelope-at" aria-hidden="true"></i>
                    </div>
                    <div class="informacion-email">
                        <p class="etiqueta-contacto">CORREO ELECTRÓNICO</p>
                        <p><a href="mailto:info@fuentedepiedra.es">info@fuentedepiedra.es</a></p>
                    </div>
                </div>

                <hr>

                <div class="ubicacion-contacto">
                    <div class="icono-contacto">
                        <i class="bi bi-geo-alt" aria-hidden="true"></i>
                    </div>
                    <div class="informacion-ubicacion">
                        <p class="etiqueta-contacto">DIRECCIÓN</p>
                        <p>C. Ancha, 9, Fuente de Piedra, Málaga, 29520</p>
                    </div>
                </div>
            </address>
        </article>

        <article class="contacto-horario" aria-labelledby="titulo-horario-contacto">
            <div class="contenedor-contacto-header">
                <i class="bi bi-calendar" aria-hidden="true"></i>
                <h2 id="titulo-horario-contacto">Horario de atención</h2>
            </div>

            <table class="info-contacto-horario">
                <caption class="visually-hidden">Horario semanal de atención al público</caption>
                <thead>
                    <tr>
                        <th scope="col" class="visually-hidden">Día</th>
                        <th scope="col" class="visually-hidden">Horario</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        $dias = [
                            1 => ['Lunes', '07:30 - 14:00'],
                            2 => ['Martes', '07:30 - 14:00'],
                            3 => ['Miércoles', '07:30 - 14:00'],
                            4 => ['Jueves', '07:30 - 14:00'],
                            5 => ['Viernes', '07:30 - 14:00'],
                            6 => ['Sábado', 'Cerrado'],
                            7 => ['Domingo', 'Cerrado'],
                        ];
                        $hoy = intval(date('N'));
                    ?>
                    <?php foreach ($dias as $n => [$nombreDia, $horario]): ?>
                        <tr class="<?= ($hoy === $n) ? "horario-contacto-hoy" : "" ?>" <?= ($hoy === $n) ? 'aria-current="date"' : '' ?>>
                            <th scope="row"><?= $nombreDia ?></th>
                            <td><?= $horario ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </article>

        <article class="contacto-mensaje" aria-labelledby="titulo-mapa-contacto">
            <div class="contenedor-contacto-header">
                <i class="bi bi-geo-alt" aria-hidden="true"></i>
                <h2 id="titulo-mapa-contacto">Mapa</h2>
            </div>

            <div class="embed-map-fixed">
                <iframe
                    style="width: 100%; border-radius: 10px; border:0;"
                    title="Mapa de ubicación del Ayuntamiento de Fuente de Piedra"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3180.730342554653!2d-4.732310289809506!3d37.13532997203732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7298b60aa05919%3A0x66cb28cc8d14fdc0!2sAyuntamiento%20de%20Fuente%20de%20Piedra!5e0!3m2!1ses!2ses!4v1777717839674!5m2!1ses!2ses"
                    width="600" height="450"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </article>
    </div>
</section>