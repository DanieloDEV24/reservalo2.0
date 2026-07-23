<style>
.plazas-input {
    width: 60px;
    height: 40px;
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    color: #1a1a1a;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fff;
    outline: none;
    -moz-appearance: textfield;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.plazas-input::-webkit-inner-spin-button,
.plazas-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.plazas-input:focus {
    border-color: #32cccc;
    box-shadow: 0 0 0 3px rgba(50, 204, 204, 0.15);
}

.plazas-input:disabled {
    background: #f5f5f5;
    color: #999;
}
</style>

<div class="modal fade" id="modalEditarReservaActividadUsuario" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditarTitulo">Editar reserva</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <label class="form-label">Plazas reservadas</label>
        <div class="d-flex align-items-center gap-3">
          <button type="button" class="btn btn-outline-secondary" id="btnMenosPlazas">−</button>
          <input id="numPlazas" type="number" class="plazas-input"/>
          <button type="button" class="btn btn-outline-secondary" id="btnMasPlazas">+</button>
        </div>
        <input type="hidden" name="" id="id-reserva-actividad">
        <small class="text-muted" id="plazasInfo"></small>
        <div class="mt-3">
            <input type="hidden" name="" id="precio-actividad">
          <strong>Total: <span id="totalPrecio"></span>€</strong>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" id="btnGuardarPlazas">Guardar cambios</button>
      </div>
    </div>
  </div>
</div>