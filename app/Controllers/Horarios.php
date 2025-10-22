<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;

class Horarios extends BaseController
{



    public function horario(?int $id_instalacion = null){

       if($id_instalacion !== null){

            $id = intval($id_instalacion);
            
            $instalacionesModel = new instalacionesModel();
            
            $instalacion = $instalacionesModel->getInstalacion($id)[0];

            $assets = [
                "css" => [
                    'css/horarios.css', 
                    'css/style.css'
                ], 

                "js" => [
                    'js/horarios.js'
                ]
            ];
            
            $view = view('horarios/horarios', ["instalacion" => $instalacion]);
            return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets]);
        }

    }
}
