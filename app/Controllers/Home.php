<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;

class Home extends BaseController
{
    /**
     * Funcion index(). Funcion en la que obtenemos los datos necesarios para mostrar la pagina
     * principal. 
     */
    public function index(): string
    {

       //Devolvemos la vista
        return view('index', ["baseUrl" => base_url()]);
    }
}
