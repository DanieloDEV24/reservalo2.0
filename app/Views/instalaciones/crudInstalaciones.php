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
            <p>Aún no has creado ninguna instalación. Crea tu primera instalación deportiva para empezar a recibir reservas y gestionar el uso de tus espacios.</p>

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
  <h1 style="margin-bottom: 3%;">Gestor Instalaciones</h1>
    <table class="table table-hover" id="tablaInstalaciones">
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