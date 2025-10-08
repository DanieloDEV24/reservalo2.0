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
        $cont++
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
</div>

<?= $nuevaInstalacion ?>
<?= $verInstalacion ?>
<?= $editarInstalacion ?>
<?= $modalBorrarPista ?>
<?= $modalBajaInstalacion ?>
<?= $borrarInstalacion ?>