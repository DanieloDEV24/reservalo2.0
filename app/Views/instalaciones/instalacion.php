<div class="paginaInstalacion">
    <div class="infoInstalacion">
        <div class="categoriasInstalacion">
            <span class="categoria-principal"><?=$instalacion["categoria_name"]?></span>
            <?=($instalacion["categoria_opc_name"] !== null) ? '<span class="categoria-secundaria">'.$instalacion["categoria_opc_name"].'</span>' : ''?>
        </div>
        <h1 class="title-page"><?=$instalacion["nombre"]?></h1>
        <p class="description-page"><?=$instalacion["descripcion"]?></p>
        
        <div class="info-grid">

            <div class="info-card">
                <div class="info-label">Hay pistas</div>
                <div class="info-value"><?=($instalacion["no_pistas"] == 1)? "No disponible" : "Sí disponible"?></div>
            </div>

            <div class="info-card">
                <div class="info-label">Reserva completa</div>
                <div class="info-value"><?=($instalacion["no_pistas"] == 1)? "No disponible" : "Sí disponible"?></div>
            </div>

            <div class="info-card">
                <div class="info-label">Iluminación</div>
                <div class="info-value"><?=($instalacion["no_pistas"] == 1)? "No disponible" : "Sí disponible"?></div>
            </div>

            <div class="info-card">
                <div class="info-label">Material</div>
                <div class="info-value"><?=($instalacion["no_pistas"] == 1)? "No disponible" : "Sí disponible"?></div>
            </div>

        </div>
    </div>    

    <div class="pistasInstalacion">
        <h2 class="title-page">Pistas</h1>
        <div class="container-pistas-instalacion">
            <?php foreach($pistas as $pista) : ?>
                <div class="card-instalacion" data-index="<?=$pista["id_pista"]?>">
                    <div class="card-image" style="background: url('<?=base_url()."images/".$pista["imagen1"]?>')"></div>
                    <div class="category"> <?=$instalacion["nombre"]?> </div>
                    <div class="heading"> <?=$pista["nombre_pista"]?></div>
                    <span id="comunity"><i class="bi bi-people"></i>&nbsp;<?=$pista["capacidad_pista"]?>&nbsp;personas</span>
                    <div class="button">
                        <a href="" class="btn-primary-personal">Hacer reserva &nbsp;<i class="bi bi-arrow-right"></i></a>
                        <div class="precio-pista"><span><?=$pista["precio_pista"]?></span><i class="bi bi-currency-euro"></i>/hora</div>
                    </div>
                    <!-- Aqui debo poner la parte del estado -->
                </div>
            <?php endforeach; ?>
        </div>
    </div>

</div>