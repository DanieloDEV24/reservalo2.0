<?php

namespace App\Controllers;

use App\Models\instalacionesModel;
use App\Models\reservasModel;

class Reservas extends BaseController
{

    public function getInfoPistasReserva() {
        $instalacionesModel = new instalacionesModel();
        $reservasModel = new reservasModel();
        $post  = $this->request->getPost();

       if(!empty($post)){
         $id_pista = intval($post["pistaId"]);
        $fecha = $post["fecha"];

        // Obtenemos la informacion de la pista
        $infoPista = $reservasModel->getInfoPista($id_pista, $fecha);

        echo json_encode([
            "success" => true,
            "infoPista" => $infoPista
        ]);
       }
    }

}
