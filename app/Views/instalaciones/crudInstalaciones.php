<script>
  document.addEventListener('DOMContentLoaded', function() {

    // Función para inicializar tooltips en un nodo específico
    function initTooltip(el) {
      if (!el._tooltip) { // Evita duplicar tooltips
        el._tooltip = new bootstrap.Tooltip(el, {
          customClass: 'custom-tooltip'
        });
      }
    }

    // Inicializamos los tooltips existentes
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(initTooltip);

    // Creamos dinámicamente el estilo
    const style = document.createElement('style');
    style.innerHTML = `
    .custom-tooltip {
      --bs-tooltip-bg: #32cccd;   
      --bs-tooltip-color: #ffffff; 
      --bs-tooltip-opacity: 1;     
      --bs-tooltip-border-radius: 5px; 
    }
  `;
    document.head.appendChild(style);

    // Observador para detectar elementos nuevos dinámicamente
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Si es un elemento
            // Si el nodo agregado tiene tooltip, inicializarlo
            if (node.matches('[data-bs-toggle="tooltip"]')) {
              initTooltip(node);
            }
            // Además buscar dentro de su subtree
            node.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(initTooltip);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
</script>

<?php
  if(count($instalaciones)!== 0){
?>
  <div style="padding-left: 3%; padding-top: 1%; padding-bottom: .5%;">
    <h1 class="title-page">Gestor Instalaciones</h1>
    <p class="description-page">Gestiona fácilmente todas las instalaciones municipales: crea, edita y organiza tus espacios de forma rápida y sencilla.</p>
  </div>
  
  

<div class="accordion filtrado" id="accordionFiltro" style="padding: 2%;">
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
            <label for="filtradoNombre" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="filtradoNombre">
          </div>

          <div class="col-4">
            <label for="filtradoCategoria" class="form-label">Categoría:</label>
            <select class="form-control" id="filtradoCategoria" name="filtradoCategoria">
                <option value="-1">Seleccione un deporte</option>
               <?php foreach($categorias as $categoria): ?>
                <option value="<?=$categoria["id_categoria"]?>"><?=$categoria["nombre"]?></option>
               <?php endforeach; ?>
            </select>
          </div>

          <div class="col-4">
            <label for="filtradoNoPistas" class="form-label">¿Tiene Pistas?:</label>
            
            <div class="checkbox-wrapper-4 hayPistas">
              <input class="inp-cbx" id="siPistas" type="checkbox">
              <label class="cbx" for="siPistas"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>Sí</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>

              <input class="inp-cbx" id="noPistas" type="checkbox">
              <label class="cbx" for="noPistas"><span>
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
            <label for="filtradoPuedeCompleta" class="form-label">¿Puede hacerse una reserva completa?:</label>
            
            <div class="checkbox-wrapper-4 reservaCompleta">
              <input class="inp-cbx" id="siCompleta" type="checkbox">
              <label class="cbx" for="siCompleta"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>Sí</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>

              <input class="inp-cbx" id="noCompleta" type="checkbox">
              <label class="cbx" for="noCompleta"><span>
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
            <label for="filtradoTieneLuz" class="form-label">¿Tiene iluminación?:</label>
            
            <div class="checkbox-wrapper-4 iluminacion">
              <input class="inp-cbx" id="siLuz" type="checkbox">
              <label class="cbx" for="siLuz"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>Sí</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>

              <input class="inp-cbx" id="noLuz" type="checkbox">
              <label class="cbx" for="noLuz"><span>
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
            <label for="filtradoTieneMaterial" class="form-label">¿Se puede prestar material?:</label>
            
            <div class="checkbox-wrapper-4 material">
              <input class="inp-cbx" id="siMaterial" type="checkbox">
              <label class="cbx" for="siMaterial"><span>
              <svg width="20px" height="20px">
                
              </svg></span><span>Sí</span></label>
              <svg class="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>

              <input class="inp-cbx" id="noMaterial" type="checkbox">
              <label class="cbx" for="noMaterial"><span>
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
          <button class="btn-primary-personal" style="width: 17%;" id="btnFiltrarGestorInstalaciones">Filtrar <i class="bi bi-filter"></i></button>
          <button class="btn-secondary-personal" style="width: 17%" id="btnBorrarFiltrosGestorInstalaciones">Borrar filtros <i class="bi bi-trash3"></i></button>
        </div>

        <div class="d-flex justify-content-start w-100" id="filtrosGestor">

        </div>

      </div>
    </div>
  </div>
</div>


<?php
    }
?>

<div class="divTable">
  <?php
    if(count($instalaciones)=== 0){
  ?>
    <div class="empty-state">
            <div class="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            </div>

            <h2>Comienza a gestionar tus instalaciones</h2>
            <p>Aún no has creado ninguna instalación. Crea tu primera instalación para empezar a recibir reservas y gestionar el uso de tus espacios.</p>

            <div class="cta-box">
                <h3>¿Qué puedes hacer con el gestor?</h3>
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span>Crear y editar instalaciones</span>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span>Gestionar horarios y reservas</span>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span>Configurar categorías y precios</span>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span>Ver estadísticas de uso</span>
                    </div>
                </div>
                <div class="d-flex justify-content-center w-100">
                  <button class="btn-primary-personal" id="crear" style="width: 65%;">
                    Crear primera instalación
                    <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
                </div>
            </div>
  <?php
  }
  else 
  {
  ?>
    <div style="position: relative; min-height: 70px;" class="contenedor-loader">

     <div id="loadertablaInstalaciones" class="loader" style="display: none;"></div>

      <table class="table table-hover" id="tablaInstalaciones" >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Categoria Principal</th>
          <th scope="col">Categoria Secundaria</th>
          <th scope="col">Acciones</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <?php
        $cont = 0;
        foreach ($instalaciones as $instalacion) {
          $cont++;
        ?>
          <tr data-index="<?= $instalacion["id_instalacion"] ?>" <?= ($instalacion["estado"] == 1) ? 'class="table-danger"' : '' ?>>
            <td><?= $cont ?></td>
            <td><?= $instalacion["nombre"] ?></td>
            <td><?= $instalacion["categoria_name"] ?></td>
            <td><?= ($instalacion["categoria_opcional1"] === null) ? "----" : $instalacion["categoria_opc_name"] ?></td>
            <td>


              <div class="dropdown" style="max-width: 200px;">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item btnVerInstalacion" href="">Ver &nbsp;<i class="bi bi-eye"></i></a></li>
                  <li><a class="dropdown-item btnEditarInstalacion" href="">Editar &nbsp;<i class="bi bi-pencil-square"></i></a></li>
                  <li><a class="dropdown-item btnBorrarInstalacion" href="#">Borrar &nbsp;<i class="bi bi-trash3"></i></a></li>
                  <?php
                  if ($instalacion["estado"] == 0) {
                  ?>
                    <li><a class="dropdown-item btnDarBaja" href="#">Dar de Baja &nbsp;<i class="bi bi-x-lg"></i></a></li>
                  <?php
                  } else {
                  ?>
                    <li><a class="dropdown-item btnDarAlta" href="#">Dar de Alta &nbsp;<i class="bi bi-check-lg"></i></a></li>
                  <?php
                  }
                  ?>
                   <li><a class="dropdown-item btnGenerarHorario" href="<?=base_url()?>index.php/horario/<?=$instalacion["id_instalacion"]?>">Generar horario&nbsp;<i class="bi bi-calendar-week"></i>  </a></li>
                </ul>
              </div>


            </td>
            <td>
              <div class="d-flex justify-content-between align-items-center w-100">
                <?php
                if ($instalacion["estado"] == 1) {
                ?>
                  <i class="bi bi-info-circle"
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="Esta instalación está dada de baja"></i>
                <?php
                }
                ?>
                <div id="loader<?= $instalacion["id_instalacion"] ?>" class="loader2" style="display: none;"></div>
              </div>
            </td>
          </tr>
        <?php
        }
        ?>
      </tbody>
  </table>
  </div>
  <a href="#" id="crear" class="btn-primary-personal" style="margin-left: 0; width: 20%">Nueva <i class="bi bi-plus-circle"></i></a>
  <?php
  }
  ?>
    </div>
</div>

  

<?= $nuevaInstalacion ?>
<?= $verInstalacion ?>
<?= $editarInstalacion ?>
<?= $modalBorrarPista ?>
<?= $modalBajaInstalacion ?>
<?= $borrarInstalacion ?>