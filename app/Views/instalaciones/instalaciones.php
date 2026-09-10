<section class="instalaciones">
    <?php
    if(!empty($instalaciones))
    {
    ?>
    <h1 class="title-page">Instalaciones</h1>
    <p class="description-page">Explora nuestras instalaciones y reserva tu espacio</p>

    <section class="accordion filtrado" id="accordionFiltroInstalaciones" style="padding: 2% 0%;" aria-label="Filtrar instalaciones">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <i class="bi bi-filter" aria-hidden="true"></i>&nbsp;Filtrar
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFiltroInstalaciones">
          <div class="accordion-body">
            <form onsubmit="return false;">
              <div class="row">

                <div class="col-4">
                  <label for="filtradoNombreInstalaciones" class="form-label">Nombre:</label>
                  <input type="text" class="form-control" id="filtradoNombreInstalaciones">
                </div>

                <div class="col-4">
                  <label for="filtradoCategoriaInstalaciones" class="form-label">Categoría:</label>
                  <select class="form-control" id="filtradoCategoriaInstalaciones" name="filtradoCategoriaInstalaciones">
                      <option value="-1">Seleccione un deporte</option>
                      <?php if(isset($categorias) && count($categorias) > 0): ?>
                        <?php foreach($categorias as $categoria): ?>
                          <option value="<?=$categoria["id_categoria"]?>"><?=$categoria["nombre"]?></option>
                        <?php endforeach; ?>
                      <?php endif; ?>
                  </select>
                </div>

                <div class="col-4">
                  <span class="form-label" id="labelPistasInstalaciones">¿Tiene Pistas?:</span>

                  <div class="checkbox-wrapper-4 hayPistasInstalaciones" role="group" aria-labelledby="labelPistasInstalaciones">
                    <input class="inp-cbx" id="siPistasInstalaciones" type="checkbox">
                    <label class="cbx" for="siPistasInstalaciones"><span>
                    <svg width="20px" height="20px" aria-hidden="true"></svg></span><span>Sí</span></label>
                    <svg class="inline-svg">
                      <symbol id="check-4" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>

                    <input class="inp-cbx" id="noPistasInstalaciones" type="checkbox">
                    <label class="cbx" for="noPistasInstalaciones"><span>
                    <svg width="20px" height="20px" aria-hidden="true"></svg></span><span>No</span></label>
                    <svg class="inline-svg">
                      <symbol id="check-4" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>
                  </div>

                </div>


              </div>

              <br>

              <div class="row">
                <div class="col-4">
                  <span class="form-label" id="labelCompletaInstalaciones">¿Puede hacerse una reserva completa?:</span>

                  <div class="checkbox-wrapper-4 reservaCompletaInstalaciones" role="group" aria-labelledby="labelCompletaInstalaciones">
                    <input class="inp-cbx" id="siCompletaInstalaciones" type="checkbox">
                    <label class="cbx" for="siCompletaInstalaciones"><span>
                    <svg width="20px" height="20px" aria-hidden="true"></svg></span><span>Sí</span></label>
                    <svg class="inline-svg">
                      <symbol id="check-4" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>

                    <input class="inp-cbx" id="noCompletaInstalaciones" type="checkbox">
                    <label class="cbx" for="noCompletaInstalaciones"><span>
                    <svg width="20px" height="20px" aria-hidden="true"></svg></span><span>No</span></label>
                    <svg class="inline-svg">
                      <symbol id="check-4" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>
                  </div>

                </div>

                <div class="col-4">
                  <span class="form-label" id="labelLuzInstalaciones">¿Tiene iluminación?:</span>

                  <div class="checkbox-wrapper-4 iluminacionInstalaciones" role="group" aria-labelledby="labelLuzInstalaciones">
                    <input class="inp-cbx" id="siLuzInstalaciones" type="checkbox">
                    <label class="cbx" for="siLuzInstalaciones"><span>
                    <svg width="20px" height="20px" aria-hidden="true"></svg></span><span>Sí</span></label>
                    <svg class="inline-svg">
                      <symbol id="check-4" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>

                    <input class="inp-cbx" id="noLuzInstalaciones" type="checkbox">
                    <label class="cbx" for="noLuzInstalaciones"><span>
                    <svg width="20px" height="20px" aria-hidden="true"></svg></span><span>No</span></label>
                    <svg class="inline-svg">
                      <symbol id="check-4" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>
                  </div>

                </div>


                <div class="col-4">
                  <span class="form-label" id="labelMaterialInstalaciones">¿Se puede prestar material?:</span>

                  <div class="checkbox-wrapper-4 materialInstalaciones" role="group" aria-labelledby="labelMaterialInstalaciones">
                    <input class="inp-cbx" id="siMaterialInstalaciones" type="checkbox">
                    <label class="cbx" for="siMaterialInstalaciones"><span>
                    <svg width="20px" height="20px" aria-hidden="true"></svg></span><span>Sí</span></label>
                    <svg class="inline-svg">
                      <symbol id="check-4" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>

                    <input class="inp-cbx" id="noMaterialInstalaciones" type="checkbox">
                    <label class="cbx" for="noMaterialInstalaciones"><span>
                    <svg width="20px" height="20px" aria-hidden="true"></svg></span><span>No</span></label>
                    <svg class="inline-svg">
                      <symbol id="check-4" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>
                  </div>

                </div>


              </div>

              <div class="d-flex gap-2 mt-5 justify-content-end botonesPista">
                <button type="button" class="btn-primary-personal" style="width: 17%;" id="btnFiltrarInstalaciones">Filtrar <i class="bi bi-filter" aria-hidden="true"></i></button>
                <button type="button" class="btn-secondary-personal" style="width: 17%" id="btnBorrarFiltrosInstalaciones">Borrar filtros <i class="bi bi-trash3" aria-hidden="true"></i></button>
              </div>

              <div class="d-flex justify-content-start w-100" id="filtrosInstalaciones" role="list" aria-label="Filtros activos">

              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
    
<div style="position: relative; min-height: 70px;" class="contenedor-loader2">

     <div id="loaderInstalaciones" class="loader" style="display: none;" aria-hidden="true"></div>
        <div class="instalaciones-resumen">
        <div class="div-numero-instalaciones">
            <h2><?=isset($numInstalaciones) ? $numInstalaciones : ''?></h2>
            <p>Instalaciones</p>
        </div>

        <?php if(isset($instalacionesCategorias) && count($instalacionesCategorias) > 0): ?>
          <?php foreach($instalacionesCategorias as $instalacionCat): ?>
              <div class="div-numero-instalaciones">
                  <h2><?=$instalacionCat["num_instalaciones"]?></h2>
                  <p><?=$instalacionCat["nombre"]?></p>
              </div>
          <?php endforeach; ?>
        <?php endif; ?>
        
    </div>
    <section class="instalaciones-container" id="contenedor-instalaciones" aria-label="Listado de instalaciones">
    <?php foreach($instalaciones as $instalacion): ?>
        <?php $url = "/reservalo2.0/images/".$instalacion["imagen1"];?>
        <article class="card-instalacion" data-index="<?=$instalacion["id_instalacion"]?>">
            <div class="card-image" style="background: url('<?=$url?>')" role="img" aria-label="Imagen de <?=$instalacion["nombre"]?>"></div>
            <p class="category" style="margin:0;"> <?=$instalacion["categoria_name"]?> </p>
            <h3 class="heading" style="margin:0;"> <?=$instalacion["nombre"]?></h3>
            <div class="opciones" role="list">
                <?= ($instalacion["iluminacion"] == 1) ? '<span role="listitem">Iluminacion</span>' : "" ?>
                <?= ($instalacion["puede_completo"] == 1) ? '<span role="listitem">Reserva completa</span>' : "" ?>
                <?= ($instalacion["no_pistas"] == 1) ? '<span role="listitem">No tiene pistas</span>' : "" ?>
                <?= ($instalacion["material"] == 1) ? '<span role="listitem">Material</span>' : "" ?>
            </div>
            <div class="button"><a href="<?="/reservalo2.0/index.php/instalacion/".$instalacion["id_instalacion"]?>" class="btn-primary-personal">Ir a instalación &nbsp;<i class="bi bi-arrow-right" aria-hidden="true"></i></a></div>
            <span class="estado <?=($instalacion["estado"] == 0) ? "disponible" : "no-disponible" ?>" role="status"><?=($instalacion["estado"] == 0) ? "disponible" : "no disponible" ?></span>
        </article>
    <?php endforeach; ?>
    </section>
</div>
    <?php
    } 
    else
    {
    ?>
    <div class="main-content">
        <div class="empty-state">
            <div class="icon-container" aria-hidden="true">
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
                <button type="button" class="btn-primary-personal" onclick="window.location.reload()" >
                    <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reintentar
                </button>
                <button type="button" class="btn-secondary-personal" style="width: 45%;">
                    <i class="bi bi-trash2" aria-hidden="true"></i> Limpiar filtros
                </button>
            </div>
        </div>
    </div>
    <?php
    }
    ?>
</section>
<script>
    $(document).ready(function() {
        const urlParams = new URLSearchParams(window.location.search);
        const paramCategoria   = urlParams.get('categoria');
        const paramInstalacion = urlParams.get('instalacion');
        const paramReserva     = urlParams.get('reservaCompleta');

        if (paramCategoria || paramInstalacion || paramReserva) {

            if (paramCategoria)   $('#filtradoCategoriaInstalaciones').val(paramCategoria);
            if (paramInstalacion) $('#filtradoNombreInstalaciones').val(paramInstalacion);
            if (paramReserva)     $('#siCompletaInstalaciones').prop('checked', true);

            // Abrimos el accordion para que el usuario vea los filtros aplicados
            $('#collapseOne').addClass('show');
            $('#accordionFiltroInstalaciones .accordion-button').removeClass('collapsed');

            $('#btnFiltrarInstalaciones').trigger('click');
        }
    });
</script>