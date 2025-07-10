<div class="divTable">
  <h1 style="margin-bottom: 3%;">Gestor Instalaciones</h1>

  <table class="table table-hover" id="tabaInstalaciones">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Categoria Principal</th>
        <th scope="col">Categoria Secundaria</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <?php
      $cont = 0;
      foreach ($instalaciones as $instalacion) {
        $cont++
      ?>
        <tr data-index="<?= $instalacion["id_instalacion"] ?>">
          <td><?= $cont ?></td>
          <td><?= $instalacion["nombre"] ?></td>
          <td><?= $instalacion["categoria"] ?></td>
          <td><?=($instalacion["categoria_opcional1"] === null)? "----" : $instalacion["categoria_opcional1"]?></td>
          <td>


            <div class="dropdown" style="max-width: 200px;">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item btnVerInstalacion" href="">Ver &nbsp;<i class="bi bi-eye"></i></a></li>
                <li><a class="dropdown-item" href="#">Editar &nbsp;<i class="bi bi-pencil-square"></i></a></li>
                <li><a class="dropdown-item" href="#">Borrar &nbsp;<i class="bi bi-trash3"></i></a></li>
                <li><a class="dropdown-item" href="#">Dar de Baja &nbsp;<i class="bi bi-x-lg        "></i></a></li>
              </ul>
            </div>


          </td>
        </tr>
      <?php
      }
      ?>
    </tbody>
  </table>
  <a href="#" id="crear" class="button" style="margin-left: 0;">Nueva <i class="bi bi-plus-circle"></i></a>
</div>

<?=$nuevaInstalacion?>
<?=$verInstalacion?>