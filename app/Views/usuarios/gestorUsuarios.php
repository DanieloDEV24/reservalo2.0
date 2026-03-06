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

<div class="pagina-gestor-usuarios">

    <div style="padding-left: 3%; padding-top: 1%; padding-bottom: .5%;">
        <h1 class="title-page">Gestor Usuarios</h1>
        <p class="description-page">Gestiona fácilmente todas los usuarios que pueden acceder a las instalaciones del municipio: crea, da de baja y organiza a todos los usuarios de forma rápida y sencilla.</p>
    </div>

      <div class="row d-flex justify-content-end align-items-center p-4 pb-0 pt-0">
        <div class="col-3 d-flex align-items-center gap-2 justify-content-end">
          <label for="">Baja </label>
            <label class="toggle-switch">
              <input type="checkbox" class="baja-usuario" id="baja-filtro-usuario">
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
            </label>
        </div>
        <div class="col-4">
          <div class="input-group">
            <span class="input-group-text" id="filtro-usuarios"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control p-2" placeholder="Introduzca el nombre, email o telf" aria-label="Introduzca el nombre, email o telf" aria-describedby="filtro-usuarios" id="input-filtro-usuarios">
          </div>
        </div>
      </div>

    <div class="divTable">
        <?php if (count($usuarios) > 0): ?>
            <table class="table table-hover" id="tabla-usuarios" > 
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telf</th>
                        <th scope="col">Ult. Mod</th>
                        <th scope="col">Accciones</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    <?php $cont = 0; ?>
                    <?php foreach($usuarios as $usuario): ?>
                        <?php if(intval($usuario["id_rol"]) === 1): ?>
                            <?php $cont++; ?>
                            <tr data-index="<?= $usuario["id_usuario"] ?>" class="<?= (intval($usuario["reservas_pasadas"]) >= 3) ? "table-warning" : "" ?> <?= (intval($usuario["usuario_baja"]) === 1) ? "table-danger" : "" ?>">
                            <td><?= $cont ?></td>
                            <td><?= $usuario["nombre"] ?></td>
                            <td><?= $usuario["email"] ?></td>
                            <td><?= $usuario["telf"] ?></td>
                            <td><?= ($usuario["token_date"] === null) ? "---" : date("d/m/Y H:i:s", strtotime($usuario["token_date"]));  ?></td>
                            <td>
                                <div class="dropdown" style="max-width: 200px;">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-three-dots-vertical"></i>
                                    </button>

                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item btn-borrar-usuario" href="">Borrar &nbsp;<i class="bi bi-trash3"></i></a></li>
                                        <li><a class="dropdown-item btn-ver-reservas" href="">Reservas <i class="bi bi-bookmark-check-fill"></i></a></li>
                                        <li><a class="dropdown-item btn-editar-usuario" href="">Editar <i class="bi bi-pencil-fill"></i></a></li>
                                        <li><a class="dropdown-item <?= (intval($usuario["usuario_baja"]) === 0 ) ? "btn-baja-usuario" : "btn-alta-usuario" ?>"  href=""><?= (intval($usuario["usuario_baja"]) === 0 ) ? "Dar de baja" : "Dar de alta" ?> <?= (intval($usuario["usuario_baja"]) === 0 ) ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-check-lg"></i>' ?></a></li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <?php if(intval($usuario["usuario_baja"]) === 1): ?>
                                    <i  class="bi bi-info-circle"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="Este usuario está de baja">
                                    </i>
                                <?php elseif(intval($usuario["reservas_pasadas"]) >= 3) : ?>
                                    <i class="bi bi-info-circle"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="Este usuario lleva ya 3 o más reservas sin asistir">
                                    </i>
                                <?php endif;  ?>
                            </td>
                            </tr>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>

</div>

<?= $modalBorrarUsuario ?>
<?= $modalReservasUsuario ?>
<?= $modalInfoUsuario ?>