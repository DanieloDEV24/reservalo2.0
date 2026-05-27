<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;
use App\Models\horariosModel;
use App\Models\actividadModel;
use DateTime;

class Permisos extends BaseController
{


    public function politicaPrivacidad (){

            $assets = [
                "css" => [
                    'css/permisos.css',
                    'css/style.css',
                    'css/instalaciones.css', 
                    'css/responsive.css'
                ],

                "js" => []
            ];

            $modalAnularHoras = view('reservas/modalAnularHoras');
            $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras]);
            $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

            $view = view('permisos/politicasPrivacidad', []);
            return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets, "modalMisReservas" => $modalMisReservas, "modalInformacionPersonal" => $modalInformacionPersonal]);
    }

    public function cookies (){

        $assets = [
            "css" => [
                'css/permisos.css',
                'css/style.css',
                'css/instalaciones.css', 
                'css/responsive.css'
            ],

            "js" => []
        ];

        $modalAnularHoras = view('reservas/modalAnularHoras');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras]);
        $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

        $view = view('permisos/cookies', []);
        return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets, "modalMisReservas" => $modalMisReservas, "modalInformacionPersonal" => $modalInformacionPersonal]);
    }


    public function avisoLegal (){

        $assets = [
            "css" => [
                'css/permisos.css',
                'css/style.css',
                'css/instalaciones.css', 
                'css/responsive.css'
            ],

            "js" => []
        ];

        $modalAnularHoras = view('reservas/modalAnularHoras');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras]);
        $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

        $view = view('permisos/avisoLegal', []);
        return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets, "modalMisReservas" => $modalMisReservas, "modalInformacionPersonal" => $modalInformacionPersonal]);
    }
    
}
