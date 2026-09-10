<div class="d-flex justify-content-center d-none contenedor-alert-instalacion pt-2">
    <div class="alert alert-danger alert-dismissible fade show alert-instalacion-no-disponible w-40 d-flex align-items-center justify-content-center gap-2 m-0" role="alert">
      <i class="bi bi-exclamation-triangle fs-5" aria-hidden="true"></i>
      <p class="mb-0"><strong>Ups!!</strong>&nbsp;Esta instalación no está disponible en estos momentos</p>
    </div>
</div>

<div class="d-flex justify-content-center d-none contenedor-alert-errores pt-2">
    <div class="alert alert-danger alert-dismissible fade show alert-error-reserva w-40 d-flex align-items-center justify-content-center gap-2 m-0" role="alert">
      <i class="bi bi-exclamation-triangle fs-5" aria-hidden="true"></i>
      <p class="mb-0"><strong>Ups!!</strong>&nbsp;Se ha producido un error interno</p>
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</div>

<div class="d-flex justify-content-center d-none contenedor-alert-reservas-success pt-2">
    <div class="alert alert-success alert-dismissible fade show alert-reserva-hecha w-100 m-0" role="alert">
      <i class="bi bi-bookmark-check-fill fs-5" aria-hidden="true"></i>
      <span>Se ha realizado la reserva <strong>correctamente</strong></span>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</div>

<section class="paginaInstalacion">
    <section class="infoInstalacion">
        <div class="categoriasInstalacion">
            <span class="categoria-principal"><?=isset($instalacion["categoria_name"]) ? $instalacion["categoria_name"] : ''?></span>
            <?=isset($instalacion["categoria_opc_name"]) && $instalacion["categoria_opc_name"] !== null ? '<span class="categoria-secundaria">'.$instalacion["categoria_opc_name"].'</span>' : ''?>
        </div>
        <h1 class="title-page"><?=isset($instalacion["nombre"]) ? $instalacion["nombre"] : ''?></h1>
        <p class="description-page"><?=isset($instalacion["descripcion"]) ? $instalacion["descripcion"] : ''?></p>

        <div class="info-grid">

            <div class="info-card">
                <div class="info-label">Hay pistas</div>
                <div class="info-value"><?=isset($instalacion["no_pistas"]) ? ($instalacion["no_pistas"] == 1 ? "No disponible" : "Sí disponible") : ''?></div>
            </div>

            <div class="info-card">
                <div class="info-label">Reserva completa</div>
                <div class="info-value"><?=isset($instalacion["puede_completo"]) ? ($instalacion["puede_completo"] == 0 ? "No disponible" : "Sí disponible") : ''?></div>
            </div>

            <div class="info-card">
                <div class="info-label">Iluminación</div>
                <div class="info-value"><?=isset($instalacion["iluminacion"]) ? ($instalacion["iluminacion"] == 0 ? "No disponible" : "Sí disponible") : ''?></div>
            </div>

            <div class="info-card">
                <div class="info-label">Material</div>
                <div class="info-value"><?=isset($instalacion["material"]) ? ($instalacion["material"] == 0 ? "No disponible" : "Sí disponible") : ''?></div>
            </div>

        </div>
    </section>

    <section class="pistasInstalacion" aria-label="Pistas de la instalación">
        <h2 class="title-page">Pistas</h2>
        <div class="container-pistas-instalacion">
            <?php if(isset($pistas) && count($pistas) > 0): ?>
            <?php foreach($pistas as $pista) : ?>
                <article class="card-instalacion" data-index="<?=$pista["id_pista"]?>" data-sinHorario="<?=(isset($instalacion["tipo_reserva"]) && intval($instalacion["tipo_reserva"]) === 1) ? 1 : 0 ?>" data-completa="<?=$pista["completa"]?>">
                    <div class="card-image" style="background: url('<?=base_url()."images/".$pista["imagen1"]?>')" role="img" aria-label="Imagen de <?= isset($pista["nombre_pista"]) ? $pista["nombre_pista"] : '' ?>"></div>
                    <p class="category" style="margin:0;"> <?= isset($instalacion["nombre"]) ? $instalacion["nombre"] : '' ?> </p>
                    <h3 class="heading" style="margin:0;"> <?= isset($pista["nombre_pista"]) ? $pista["nombre_pista"] : '' ?> </h3>
                    <span id="comunity"><i class="bi bi-people" aria-hidden="true"></i>&nbsp;<?= isset($pista["capacidad_pista"]) ? $pista["capacidad_pista"] : '' ?>&nbsp;personas</span>
                    <div class="button">
                        <button type="button" class="btn-primary-personal btn-panel-reservas <?=  (isset($usuario["usuario_baja"]) && intval($usuario["usuario_baja"]) === 1) ? "btn-primary-personal-disabled" : ""?>">Hacer reserva &nbsp;<i class="bi bi-arrow-right" aria-hidden="true"></i></button>
                        <div class="precio-pista"><span><?= isset($pista["precio_pista"]) ? $pista["precio_pista"] : '' ?></span><i class="bi bi-currency-euro" aria-hidden="true"></i>/<?= (isset($instalacion["tipo_reserva"]) && intval($instalacion["tipo_reserva"]) === 1) ? "dia" : "hora" ?></div>
                    </div>
                    <!-- Aqui debo poner la parte del estado -->
                </article>
            <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </section>

</section>

<?=isset($modalReservaPista) ? $modalReservaPista : ''?>