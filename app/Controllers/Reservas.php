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

        if(empty($infoPista)){
            $data = $instalacionesModel->getPistasById($id_pista);
            
            echo json_encode([
                "success" => true,
                "hayHorarios" => false,
                "infoPista" => $data,
                "baseUrl" => base_url()
            ]);
            return;
        }

        echo json_encode([
            "success" => true,
            "hayHorarios" => true,
            "infoPista" => $infoPista,
            "baseUrl" => base_url()
        ]);
        return;
       }
    }


    public function comprobarReservas() {

        $reservasModel = new reservasModel();
        $post  = $this->request->getPost();

        if(!empty($post)){

            $id_pista = intval($post["pista"]);
            $fecha    = $post["fecha"]; 
            $hora     = $post["hora"];

            $hay_reservas  = $reservasModel->hayReserva($id_pista, $fecha, $hora);
            $reservas_bool = (count($hay_reservas) === 0) ? false : true;

            echo json_encode([
                "success" => true, 
                "hayReserva" => $reservas_bool
            ]); 
            exit;
        }
    }

    public function hacerReserva() {
        
        date_default_timezone_set('Europe/Madrid');
        $reservasModel = new reservasModel();
        $post  = $this->request->getPost();

        if(!empty($post)){

            $fecha = $post["fecha"];
            $horaInicio = $post["horaInicio"];
            $horaFin = $post["horaFin"];
            $fecha_hora_actual = date('Y-m-d H:i:s');
            
        }
    }
}
