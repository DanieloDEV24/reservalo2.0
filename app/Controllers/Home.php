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

        $instalacionesModel = new instalacionesModel();

        $instalacionesCarrousel = $instalacionesModel->getInstalacionesHome();

        $view = view('home/home', ["baseUrl" => base_url(), "instalacionesCarrousel" => $instalacionesCarrousel]);

       //Devolvemos la vista
        return view('index', ["view" => $view, "baseUrl" => base_url()]);
    }
}
