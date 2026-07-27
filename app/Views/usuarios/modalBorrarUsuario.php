<div class="modal fade" tabindex="-1" id="modalBorrarUsuario" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" data-usuario="">

  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
    <div class="modal-content">
      <!-- Header -->
      <div class="modal-header border-bottom">
        <h5 class="modal-title">Borrar Usuario <i class="bi bi-trash3"></i></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Body -->
      <div class="modal-body" style="padding: 5%;" data-index="">
        
        <h3 class="title-borrar-usuario" style="margin-bottom: 2%;">¿Desea eliminar a este usuario?</h3>

        <div class="contenedor-datos-usuario">
          <div class="info-personal-usuario">
            <div class="logo-usuario">

            </div>
            <div class="info-usuario">
              <p class="nombre-usuario"></p>
              <p class="email-telf-usuario"></p>
              <p class="email-telf-usuario-movil" style="display: none;"></p>
            </div>
          </div>

          <div class="info-registro-usuario">
              <table>
                <tr>
                  <td>Fecha de registro: </td>
                  <td class="fecha-registro-usuario"></td>
                </tr>

                <tr>
                  <td>Nº de reservas: </td>
                  <td class="numero-reservas-usuario"></td>
                </tr>

                <tr>
                  <td>Último acceso: </td>
                  <td class="ultimo-acceso-usuario"></td>
                </tr>
              </table>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer border-top">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Cancelar <i class="bi bi-x-lg"></i>
        </button>
        <button type="submit" class="btn btn-danger" id="btn-confirmar-eliminar-usuario">
          Borrar Usuario <i class="bi bi-trash3"></i>
        </button>
      </div>

    </div>
  </div>
</div>

