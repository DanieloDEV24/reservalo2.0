<div class="d-flex justify-content-center d-none contenedor-alert-editar-categoria-success pt-2">
    <div class="alert alert-success alert-dismissible fade show alert-editar-categoria-hecha w-100 m-0" role="alert">

      <i class="bi bi-bookmark-check-fill fs-5"></i>

      <span>Se ha editado la categoria <strong>correctamente</strong></span>

      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

    </div>
</div>

<div class="d-flex justify-content-center d-none contenedor-alert-borrar-categoria-success pt-2">
    <div class="alert alert-success alert-dismissible fade show alert-borrar-categoria-hecha w-100 m-0" role="alert">

      <i class="bi bi-bookmark-check-fill fs-5"></i>

      <span>Se ha borrado la categoria <strong>correctamente</strong></span>

      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

    </div>
</div>

<div class="d-flex justify-content-center d-none contenedor-alert-crear-categoria-success pt-2">
    <div class="alert alert-success alert-dismissible fade show alert-crear-categoria-hecha w-100 m-0" role="alert">

      <i class="bi bi-bookmark-check-fill fs-5"></i>

      <span>Se ha creado la categoria <strong>correctamente</strong></span>

      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

    </div>
</div>

<div class="pagina-gestor-categorias">

    <div style="padding-left: 3%; padding-top: 1%; padding-bottom: .5%;">
        <h1 class="title-page">Gestor Categorias</h1>
        <p class="description-page">Crea, edita y elimina facilmente las categorías para las instalaciones del municipio</p>
    </div>

      <!-- <div class="row d-flex justify-content-end align-items-center p-4 pb-0 pt-0">
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
      </div> -->

    <div class="divTable">
        <?php if (count($categorias) > 0): ?>
            <table class="table table-hover" id="tabla-categorias" style="vertical-align: middle;"> 
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Instalaciones</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    <?php $cont = 0; ?>
                    <?php foreach($categorias as $categoria): ?>
                            <?php $cont++; ?>
                            <tr data-index="<?= $categoria["id_categoria"] ?>">
                            <td style="width: 10%;"><?= $cont ?></td>
                            <td style="width: 40%;"><?= $categoria["nombre"] ?></td>
                            <td style="width: 40%;">
                              <div><?= $categoria["total_instalaciones"]." instalaciones"?></div>
                              <div class="desglosamiento"><?= $categoria["instalaciones_principal"]." instalaciones"?> · <?= $categoria["instalaciones_secundaria"]." instalaciones"?></div>
                            </td>
                            <td>
                              <div class="btn-gestor-categorias">
                                <button type="button" class="btn btn-crud-categorias btn-editar-categoria" title="Editar categoría"><i class="bi bi-pencil-square"></i></button>
                                <button type="button" class="btn btn-crud-categorias btn-borrar-categoria" title="<?= (intval($categoria["total_instalaciones"]) > 0) ? "La categoría no se puede borrar porque está asociada a una instalación" : "Borrar categoría" ?>" <?= (intval($categoria["total_instalaciones"]) > 0) ? "disabled" : "" ?> ><i class="bi bi-trash3"></i></button>
                              </div>
                            </td>
                            </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>

    <div class="div-btn-gestor-categorias">
      <a href="#" id="btn-nueva-categoria" class="btn-primary-personal" style="margin-left: 0; width: 20%">Nueva categoría <i class="bi bi-plus-circle"></i></a>
    </div>
</div>

<?= $modalBorrarUsuario ?>
<?= $modalReservasUsuario ?>
<?= $modalInfoUsuario ?>
<?= $modalEditarCategoria ?>
<?= $modalBorrarCategoria ?>
<?= $modalCrearCategoria ?>