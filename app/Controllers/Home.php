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
        $categoriasModel = new categoriasModel();

        $instalacionesCarrousel = $instalacionesModel->getInstalacionesHome();
        $categorias = $categoriasModel->getCategoriasConInstalacion();

        $view = view('home/home', ["baseUrl" => base_url(), "instalacionesCarrousel" => $instalacionesCarrousel, "categorias" => $categorias]);
        
        $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');
        $modalAnularHoras = view('reservas/modalAnularHoras');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras]);

       //Devolvemos la vista
        return view('index', ["view" => $view, "baseUrl" => base_url(), "modalInformacionPersonal" => $modalInformacionPersonal, "modalMisReservas" => $modalMisReservas]);
    }
}
