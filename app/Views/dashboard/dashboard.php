<div class="pagina-dashboard">

    <h1 class="title-page">Estadística</h1>
    <p class="description-page">Comprueba el uso de cada instalación, las categorías más usadas y los registros realizados en la web</p>
    <br>
    <div class="grid-dashboard">
        <div class="div-dashboard grafico-reservas">
            <h3 style="margin-bottom: 5%;">Reservas por mes</h3>
            <div class="chart-container">          <!-- 👈 añade este wrapper -->
                <canvas id="grafico-reservas"></canvas>
            </div>
        </div>

        <div class="div-dashboard grafico-donut">
            <h3 style="margin-bottom: 5%;">Reservas por mes</h3>
            <div class="chart-container">
                <canvas id="chartDonut"></canvas>
            </div>
        </div>

        <div class="div-dashboard tabla-reservas">
            <h3 style="margin-bottom: 5%;">Reservas por instalaciones</h3>
            <table class="table">
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

                    <?php foreach($reservas as $key => $reserva): ?>
                        <tr>
                           <td><?= $key + 1 ?></td>
                           <td title="<?= $reserva["nombre"] ?></td>"><?= $reserva["nombre"] ?></td>
                           <td><?= $reserva["categoria"] ?></td>
                           <td style="width: 20%;"><?= (intval($reserva["estado"]) === 0) ? "<span class='span-estado estado-activa'>Activa</span>" : "<span class='span-estado estado-baja'>Baja</span>" ?></td>
                           <td><?= $reserva["reservas"] ?></td> 
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <div class="div-dashboard tabla-actividad-reciente">
            <div class="d-flex align-items-center justify-content-between mb-4">
                <h3>Actividad reciente</h3>
                <i class="bi bi-three-dots-vertical" title="Ver toda actividad"></i>
            </div>
            <?php $cont = 0; ?>
            <?php foreach($actividades as $actividad): ?>
                <?php $cont++ ?>
                <?php if($cont <= 5) : ?>
                    <div class="actividad-reciente">
                        <div class="informacion-actividad">
                            <div class="d-flex align-items-center gap-2">
                                <div class="leyenda-actividad" style="background-color: <?= $actividad["color"] ?>;"></div>
                                <p class="descripcion"><?= $actividad["descripcion"] ?></p>
                            </div>
                            <p class="fecha"><?= tiempoTranscurrido($actividad["fecha"]) ?></p>
                        </div>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>

    </div>

</div>

<?= $modalBorrarUsuario ?>
<?= $modalReservasUsuario ?>
<?= $modalInfoUsuario ?>
<?= $modalActividadReciente ?>