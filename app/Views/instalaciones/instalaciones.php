<div class="instalaciones">
    <?php
    if(!empty($instalaciones))
    {
    ?>
    <h1 class="title-page">Instalaciones</h1>
    <p class="description-page">Explora nuestras instalaciones y reserva tu espacio</p>

    <div class="accordion filtrado" id="accordionFiltroInstalaciones" style="padding: 2% 0%;">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <i class="bi bi-filter"></i>&nbsp;Filtrar
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFiltro">
      <div class="accordion-body">
        <div class="row">

          <div class="col-4">
            <label for="filtradoNombreInstalaciones" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="filtradoNombreInstalaciones">
          </div>

          <div class="col-4">
            <label for="filtradoCategoriaInstalaciones" class="form-label">Categoría:</label>
            <select class="form-control" id="filtradoCategoriaInstalaciones" name="filtradoCategoriaInstalaciones">
                <option value="-1">Seleccione un deporte</option>
               <?php foreach($categorias as $categoria): ?>
                <option value="<?=$categoria["id_categoria"]?>"><?=$categoria["nombre"]?></option>
               <?php endforeach; ?>
            </select>
          </div>

          <div class="col-4">
            <label for="filtradoNoPistasInstalaciones" class="form-label">¿Tiene Pistas?:</label>
            
            <div class="checkbox-wrapper-4 hayPistasInstalaciones">
              <input class="inp-cbx" id="siPistasInstalaciones" type="checkbox">
              <label class="cbx" for="siPistasInstalaciones"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>Sí</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>

              <input class="inp-cbx" id="noPistasInstalaciones" type="checkbox">
              <label class="cbx" for="noPistasInstalaciones"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>No</span></label>
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
            <label for="filtradoPuedeCompletaInstalaciones" class="form-label">¿Puede hacerse una reserva completa?:</label>
            
            <div class="checkbox-wrapper-4 reservaCompletaInstalaciones">
              <input class="inp-cbx" id="siCompletaInstalaciones" type="checkbox">
              <label class="cbx" for="siCompletaInstalaciones"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>Sí</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>

              <input class="inp-cbx" id="noCompletaInstalaciones" type="checkbox">
              <label class="cbx" for="noCompletaInstalaciones"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>No</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </div>

          </div>

          <div class="col-4">
            <label for="filtradoTieneLuzInstalaciones" class="form-label">¿Tiene iluminación?:</label>
            
            <div class="checkbox-wrapper-4 iluminacionInstalaciones">
              <input class="inp-cbx" id="siLuzInstalaciones" type="checkbox">
              <label class="cbx" for="siLuzInstalaciones"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>Sí</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>

              <input class="inp-cbx" id="noLuzInstalaciones" type="checkbox">
              <label class="cbx" for="noLuzInstalaciones"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>No</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </div>

          </div>


          <div class="col-4">
            <label for="filtradoTieneMaterialInstalaciones" class="form-label">¿Se puede prestar material?:</label>
            
            <div class="checkbox-wrapper-4 materialInstalaciones">
              <input class="inp-cbx" id="siMaterialInstalaciones" type="checkbox">
              <label class="cbx" for="siMaterialInstalaciones"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>Sí</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>

              <input class="inp-cbx" id="noMaterialInstalaciones" type="checkbox">
              <label class="cbx" for="noMaterialInstalaciones"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>No</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </div>

          </div>


        </div>

        <div class="d-flex gap-2 mt-5 justify-content-end botonesPista">
          <button class="btn-primary-personal" style="width: 17%;" id="btnFiltrarInstalaciones">Filtrar <i class="bi bi-filter"></i></button>
          <button class="btn-secondary-personal" style="width: 17%" id="btnBorrarFiltrosInstalaciones">Borrar filtros <i class="bi bi-trash3"></i></button>
        </div>

        <div class="d-flex justify-content-start w-100" id="filtrosInstalaciones">

        </div>

      </div>
    </div>
  </div>
</div>
    
<div style="position: relative; min-height: 70px;" class="contenedor-loader2">

     <div id="loaderInstalaciones" class="loader" style="display: none;"></div>
        <div class="instalaciones-resumen">
        <div class="div-numero-instalaciones">
            <h1><?=$numInstalaciones?></h1>
            <p>Instalaciones</p>
        </div>

    <?php foreach($instalacionesCategorias as $instalacionCat): ?>
        <div class="div-numero-instalaciones">
            <h1><?=$instalacionCat["num_instalaciones"]?></h1>
            <p><?=$instalacionCat["nombre"]?></p>
        </div>
    <?php endforeach; ?>
        
    </div>
    <div class="instalaciones-container" id="contenedor-instalaciones">
    <?php foreach($instalaciones as $instalacion): ?>
        <?php $url = $baseUrl."images/".$instalacion["imagen1"];?>
        <div class="card-instalacion" data-index="<?=$instalacion["id_instalacion"]?>">
            <div class="card-image" style="background: url('<?=$url?>')"></div>
            <div class="category"> <?=$instalacion["categoria_name"]?> </div>
            <div class="heading"> <?=$instalacion["nombre"]?></div>
            <div class="opciones">
                <?= ($instalacion["iluminacion"] == 1) ? "<span>Iluminacion</span>" : "" ?>
                <?= ($instalacion["puede_completo"] == 1) ? "<span>Reserva completa</span>" : "" ?>
                <?= ($instalacion["no_pistas"] == 1) ? "<span>No tiene pistas</span>" : "" ?>
                <?= ($instalacion["material"] == 1) ? "<span>Material</span>" : "" ?>
            </div>
            <div class="button"><a href="" class="btn-primary-personal">Ir a instalación &nbsp;<i class="bi bi-arrow-right"></i></a></div>
            <span class="estado <?=($instalacion["estado"] == 0) ? "disponible" : "no-disponible" ?>"><?=($instalacion["estado"] == 0) ? "disponible" : "no disponible" ?></span>
        </div>
    <?php endforeach; ?>
    </div>
</div>
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
