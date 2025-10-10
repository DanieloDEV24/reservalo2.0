<div class="instalaciones">
    <?php
    if(!empty($instalaciones))
    {
    ?>
    <?php foreach($instalaciones as $instalacion): ?>
        <?php $url = $baseUrl."images/".$instalacion["imagen1"];?>
        <div class="card-instalacion" data-index="<?=$instalacion["id_instalacion"]?>">
            <div class="card-image" style="background: url('<?=$url?>')"></div>
            <div class="category"> <?=$instalacion["categoria_name"]?> </div>
            <div class="heading"> <?=$instalacion["nombre"]?></div>
            <div class="button"><a href="" class="btn-primary-personal">Ir a instalación &nbsp;<i class="bi bi-arrow-right"></i></a></div>
        </div>
    <?php endforeach; ?>
    <?php
    } 
    else
    {
    ?>
    <main class="main-content">
        <div class="empty-state">
            <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <h2>No hay instalaciones disponibles</h2>
            <p>En este momento no tenemos instalaciones que coincidan con tu búsqueda. Prueba a ajustar los filtros o vuelve más tarde.</p>

            <div class="suggestions">
                <h3>Te sugerimos:</h3>
                <ul>
                    <li>Modificar los filtros de búsqueda</li>
                    <li>Explorar otras categorías</li>
                    <li>Revisar la disponibilidad en otras fechas</li>
                    <li>Contactar con el administrador para más información</li>
                </ul>
            </div>

            <div class="button-group">
                <button class="btn-primary-personal" onclick="window.location.reload()" >
                    <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reintentar
                </button>
                <button class="btn-secondary-personal" style="width: 45%;">
                    <i class="bi bi-trash2"></i> Limpiar filtros
                </button>
            </div>
        </div>
    </main>
    <?php
    }
    ?>
</div>  
