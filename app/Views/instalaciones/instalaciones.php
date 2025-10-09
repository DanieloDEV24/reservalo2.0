<div class="instalaciones">
    <?php foreach($instalaciones as $instalacion): ?>
        <?php $url = $baseUrl."images/".$instalacion["imagen1"];?>
        <div class="card-instalacion" data-index="<?=$instalacion["id_instalacion"]?>">
            <div class="card-image" style="background: url('<?=$url?>')"></div>
            <div class="category"> <?=$instalacion["categoria_name"]?> </div>
            <div class="heading"> <?=$instalacion["nombre"]?></div>
            <div class="button"><a href="" class="btn-primary-personal">Ir a instalación &nbsp;<i class="bi bi-arrow-right"></i></a></div>
        </div>
    <?php endforeach; ?>
</div>  
