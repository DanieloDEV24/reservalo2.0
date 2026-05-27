<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;
use App\Models\horariosModel;
use App\Models\actividadModel;
use DateTime;

class Contacto extends BaseController
{


    public function contacto (){

       

            $assets = [
                "css" => [
                    'css/contacto.css',
                    'css/style.css',
                    'css/instalaciones.css', 
                    'css/responsive.css'
                ],

                "js" => []
            ];

            $modalAnularHoras = view('reservas/modalAnularHoras');
            $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras]);
            $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

            $view = view('contacto/contacto', []);
            return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets, "modalMisReservas" => $modalMisReservas, "modalInformacionPersonal" => $modalInformacionPersonal]);
    }

    
}
