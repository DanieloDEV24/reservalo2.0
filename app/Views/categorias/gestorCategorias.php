<div aria-live="polite" aria-atomic="true">

    <div class="d-flex justify-content-center d-none contenedor-alert-editar-categoria-success pt-2">
        <div class="alert alert-success alert-dismissible fade show alert-editar-categoria-hecha w-100 m-0" role="status">
          <i class="bi bi-bookmark-check-fill fs-5" aria-hidden="true"></i>
          <span>Se ha editado la categoria <strong>correctamente</strong></span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar aviso"></button>
        </div>
    </div>

    <div class="d-flex justify-content-center d-none contenedor-alert-borrar-categoria-success pt-2">
        <div class="alert alert-success alert-dismissible fade show alert-borrar-categoria-hecha w-100 m-0" role="status">
          <i class="bi bi-bookmark-check-fill fs-5" aria-hidden="true"></i>
          <span>Se ha borrado la categoria <strong>correctamente</strong></span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar aviso"></button>
        </div>
    </div>

    <div class="d-flex justify-content-center d-none contenedor-alert-crear-categoria-success pt-2">
        <div class="alert alert-success alert-dismissible fade show alert-crear-categoria-hecha w-100 m-0" role="status">
          <i class="bi bi-bookmark-check-fill fs-5" aria-hidden="true"></i>
          <span>Se ha creado la categoria <strong>correctamente</strong></span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar aviso"></button>
        </div>
    </div>

</div>

<section class="pagina-gestor-categorias" aria-labelledby="titulo-gestor-categorias">

    <header class="header-categorias">
        <h1 class="title-page" id="titulo-gestor-categorias">Gestor Categorías</h1>
        <p class="description-page">Crea, edita y elimina fácilmente las categorías para las instalaciones del municipio</p>
    </header>

    <div class="divTable">
        <?php if (isset($categorias) && count($categorias) > 0): ?>
            <table class="table table-hover" id="tabla-categorias" style="vertical-align: middle;">
                <caption class="visually-hidden">Listado de categorías de instalaciones municipales</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Instalaciones</th>
                        <th scope="col"><span class="visually-hidden">Acciones</span></th>
                    </tr>
                </thead>
                <tbody>

                    <?php $cont = 0; ?>
                    <?php foreach($categorias as $categoria): ?>
                            <?php $cont++; ?>
                            <?php $tieneInstalaciones = intval($categoria["total_instalaciones"]) > 0; ?>
                            <tr data-index="<?= $categoria["id_categoria"] ?>">
                            <th scope="row" style="width: 10%;"><?= $cont ?></th>
                            <td class="celda-nombre-categoria" style="width: 40%;"><?= $categoria["nombre"] ?></td>
                            <td style="width: 40%;">
                              <p class="m-0"><?= $categoria["total_instalaciones"]." instalaciones"?></p>
                              <p class="desglosamiento m-0">
                                <span class="visually-hidden">Desglose: </span><?= $categoria["instalaciones_principal"]." principal"?> · <?= $categoria["instalaciones_secundaria"]." secundaria"?>
                              </p>
                            </td>
                            <td>
                              <div class="btn-gestor-categorias" role="group" aria-label="Acciones para la categoría <?= $categoria["nombre"] ?>">
                                <button type="button" class="btn btn-crud-categorias btn-editar-categoria" title="Editar categoría" aria-label="Editar categoría <?= $categoria["nombre"] ?>"><i class="bi bi-pencil-square" aria-hidden="true"></i></button>
                                <button type="button" class="btn btn-crud-categorias btn-borrar-categoria" title="<?= $tieneInstalaciones ? "La categoría no se puede borrar porque está asociada a una instalación" : "Borrar categoría" ?>" aria-label="<?= $tieneInstalaciones ? "La categoría ".$categoria["nombre"]." no se puede borrar porque está asociada a una instalación" : "Borrar categoría ".$categoria["nombre"] ?>" <?= $tieneInstalaciones ? "disabled aria-disabled=\"true\"" : "" ?> ><i class="bi bi-trash3" aria-hidden="true"></i></button>
                              </div>
                            </td>
                            </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p class="text-center py-4">No hay categorías creadas todavía.</p>
        <?php endif; ?>
    </div>

    <div class="div-btn-gestor-categorias">
      <button type="button" id="btn-nueva-categoria" class="btn-primary-personal" style="margin-left: 0; width: 20%">Nueva categoría <i class="bi bi-plus-circle" aria-hidden="true"></i></button>
    </div>
</section>

<?= (isset($modalBorrarUsuario)) ? $modalBorrarUsuario : '' ?>
<?= (isset($modalReservasUsuario)) ? $modalReservasUsuario : '' ?>
<?= (isset($modalInfoUsuario)) ? $modalInfoUsuario : '' ?>
<?= (isset($modalEditarCategoria)) ? $modalEditarCategoria : '' ?>
<?= (isset($modalBorrarCategoria)) ? $modalBorrarCategoria : '' ?>
<?= (isset($modalCrearCategoria)) ? $modalCrearCategoria : '' ?>