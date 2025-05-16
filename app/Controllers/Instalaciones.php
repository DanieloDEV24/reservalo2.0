<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;

class Instalaciones extends BaseController
{
    /**
     * Funcion index(). Funcion en la que obtenemos los datos necesarios para mostrar la pagina
     * principal. 
     */
    public function instalaciones(): string
    {

        return view('index', ["baseUrl" => base_url()]);
    }

    public function crudInstalaciones(): string
    {
        $nuevaPista = view('instalaciones/modalNuevaInstalacion', ["baseUrl" => base_url()]);
        $view = view('instalaciones/crudInstalaciones', ["nuevaPista" => $nuevaPista, "baseUrl" => base_url()]);
       

        return view('plantillas/normal', ["view"=>$view, "baseUrl" => base_url()]);
    }
}
