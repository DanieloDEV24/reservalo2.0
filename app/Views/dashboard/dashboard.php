<section class="pagina-dashboard" aria-labelledby="titulo-dashboard">

    <h1 class="title-page" id="titulo-dashboard">Estadística</h1>
    <p class="description-page">Comprueba el uso de cada instalación, las categorías más usadas y los registros realizados en la web</p>

    <div class="grid-dashboard">

        <article class="div-dashboard grafico-reservas" aria-labelledby="titulo-grafico-reservas">
            <h2 class="h3-dashboard" id="titulo-grafico-reservas" style="margin-bottom: 5%;">Reservas por mes</h2>
            <div class="chart-container">
                <canvas id="grafico-reservas" role="img" aria-label="Gráfico de barras: número de reservas por mes">
                    Tu navegador no puede mostrar este gráfico. Contacta con el Ayuntamiento si necesitas estos datos en otro formato.
                </canvas>
            </div>
        </article>

        <article class="div-dashboard grafico-donut" aria-labelledby="titulo-grafico-donut">
            <h2 class="h3-dashboard" id="titulo-grafico-donut" style="margin-bottom: 5%;">Reservas por categoría</h2>
            <div class="chart-container">
                <canvas id="chartDonut" role="img" aria-label="Gráfico circular: distribución de reservas por categoría">
                    Tu navegador no puede mostrar este gráfico. Contacta con el Ayuntamiento si necesitas estos datos en otro formato.
                </canvas>
            </div>
        </article>

        <article class="div-dashboard tabla-reservas" aria-labelledby="titulo-tabla-reservas">
            <h2 class="h3-dashboard" id="titulo-tabla-reservas" style="margin-bottom: 5%;">Reservas por instalaciones</h2>
            <table class="table">
                <caption class="visually-hidden">Listado de instalaciones con su categoría, estado y número de reservas</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Reservas</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (isset($reservas) && count($reservas) > 0): ?>
                        <?php foreach($reservas as $key => $reserva): ?>
                            <?php $activa = intval($reserva["estado"]) === 0; ?>
                            <tr>
                            <th scope="row"><?= $key + 1 ?></th>
                            <td title="<?= $reserva["nombre"] ?>"><?= $reserva["nombre"] ?></td>
                            <td><?= $reserva["categoria"] ?></td>
                            <td style="width: 20%;">
                                <span class="span-estado <?= $activa ? "estado-activa" : "estado-baja" ?>"><?= $activa ? "Activa" : "Baja" ?></span>
                            </td>
                            <td><?= $reserva["reservas"] ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="5" class="text-center">No hay reservas registradas todavía.</td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </article>

        <article class="div-dashboard tabla-actividad-reciente" aria-labelledby="titulo-actividad-reciente">
            <div class="d-flex align-items-center justify-content-between mb-4">
                <h2 class="h3-dashboard" id="titulo-actividad-reciente">Actividad reciente</h2>
                <button type="button" class="btn-icono-actividad" aria-label="Ver toda la actividad">
                    <i class="bi bi-three-dots-vertical" aria-hidden="true"></i>
                </button>
            </div>

            <?php $cont = 0; ?>
            <?php if (isset($actividades) && count($actividades) > 0): ?>
                <ul class="lista-actividad-reciente">
                    <?php foreach($actividades as $actividad): ?>
                        <?php $cont++ ?>
                        <?php if($cont <= 5): ?>
                            <li class="actividad-reciente">
                                <div class="informacion-actividad">
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="leyenda-actividad" aria-hidden="true" style="background-color: <?= $actividad["color"] ?>;"></span>
                                        <p class="descripcion"><?= $actividad["descripcion"] ?></p>
                                    </div>
                                    <p class="fecha">
                                        <time datetime="<?= date('c', strtotime($actividad["fecha"])) ?>"><?= tiempoTranscurrido($actividad["fecha"]) ?></time>
                                    </p>
                                </div>
                            </li>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </ul>
            <?php else: ?>
                <p class="text-center py-3">No hay actividad reciente.</p>
            <?php endif; ?>
        </article>

    </div>

</section>

<?= (isset($modalBorrarUsuario)) ? $modalBorrarUsuario : '' ?>
<?= (isset($modalReservasUsuario)) ? $modalReservasUsuario : '' ?>
<?= (isset($modalInfoUsuario)) ? $modalInfoUsuario : '' ?>
<?= (isset($modalActividadReciente)) ? $modalActividadReciente : '' ?>