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
        $instalacionesTodas = $instalacionesModel->getInstalaciones(null);
        $categorias = $categoriasModel->getCategoriasConInstalacion();

        $view = view('home/home', ["baseUrl" => base_url(), "instalacionesCarrousel" => $instalacionesCarrousel, "categorias" => $categorias, "instalacionesTodas" => $instalacionesTodas]);
        
        $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');
        $modalAnularHoras = view('reservas/modalAnularHoras');
        $modalEditarReservaActividadUsuario = view('actividades/modalEditarReservaActividadUsuario');
        $modalEliminarReservaActividadUsuario = view('actividades/modalEliminarReservaActividadUsuario');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras, 'modalEditarReservaActividadUsuario' => $modalEditarReservaActividadUsuario, "modalEliminarReservaActividadUsuario" => $modalEliminarReservaActividadUsuario]);

       //Devolvemos la vista
        return view('index', ["view" => $view, "baseUrl" => base_url(), "modalInformacionPersonal" => $modalInformacionPersonal, "modalMisReservas" => $modalMisReservas]);
    }


    public function getInstalacionesCategoriaHome() {

        $instalacionesModel = new instalacionesModel();
        $categoriasModel = new categoriasModel();

        $post = $this->request->getPost();

        if(!empty($post)){

            $categoria = intval($post["categoria"]);
            $reserva_completa = filter_var($_POST['reserva_completa'], FILTER_VALIDATE_BOOLEAN);
            $filter = [];

            if ($categoria !== -1) $filter["categoria"] = $categoria;
            if ($reserva_completa) $filter["puede_completo"] = $reserva_completa;

            if(count($filter) === 0) $filter = null;

            $instalacionesTodas = $instalacionesModel->getInstalaciones($filter);

            echo json_encode([
                "success" => true,
                "instalaciones" => $instalacionesTodas
            ]);
            exit;
        }
    }
}
