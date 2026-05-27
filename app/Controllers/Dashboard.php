<?php

namespace App\Controllers;

use App\Models\actividadModel;
use App\Models\categoriasModel;
use App\Models\reservasModel;

class Dashboard extends BaseController
{

    public function dashboard() {

        helper('functions');

        $reservasModel = new reservasModel();
        $actividadesModel = new actividadModel();

        $assets = [
          
            "css" => [
                'css/instalaciones.css',
                'css/dashboard.css',
                'css/style.css', 
                'css/responsive.css'
            ], 

            "js" => [
                "js/dashboard.js",
                "js/movimiento.js"
            ]
        ];

        $reservas = $reservasModel->getAllReservas();
        $actividades = $actividadesModel->getAllActividades();

        $modalBorrarUsuario = view('usuarios/modalBorrarUsuario');
        $modalReservasUsuario = view('usuarios/modalReservasUsuario');
        $modalInfoUsuario = view('usuarios/modalInfoUsuario');

        $modalActividadReciente = view('dashboard/modalActividadReciente', ["actividades" => $actividades]);

        $view = view('dashboard/dashboard', ["modalBorrarUsuario" => $modalBorrarUsuario, "modalReservasUsuario" => $modalReservasUsuario, "modalInfoUsuario" => $modalInfoUsuario, "reservas" => $reservas, "actividades" => $actividades, "modalActividadReciente" => $modalActividadReciente]);
        return view('plantillas/normal', ["view" => $view, "assets" => $assets]);
    }

    public function reservasMes(){

        $reservasModel = new reservasModel();
        
        $reservas = $reservasModel->getReservasMes();

        echo json_encode([
            "success" => true, 
            "reservas" => $reservas
        ]); 
        return; 

    }

    public function reservasCategoria(){

        $reservasModel = new reservasModel();
        $categoriasModel = new categoriasModel();
        
        // $reservas = $reservasModel->getReservasCategoria();
        $categorias = array_column($categoriasModel->getCategorias(), 'nombre');
        $reservas = array_column($reservasModel->getReservasCategorias(), 'reservas');

        echo json_encode([
            "success" => true, 
            "categorias" => $categorias,
            "reservas"   => $reservas
        ]); 
        return; 

    }
}
