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

            $reservasPista = $reservasModel->reservasById($id_pista, $fecha);

            echo json_encode([
                "success" => true,
                "hayHorarios" => true,
                "infoPista" => $infoPista,
                "reservas" => $reservasPista,
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

            $datos  = $post["datos"];
            $precio = $post["precio"];
            $fecha_hora_actual = date('Y-m-d H:i:s');

            $session = session();
            if($session->has('usuario')){
                $usuario    = $session->get('usuario');
                $id_usuario = $usuario["id_usuario"];
            }
            else {
                $id_usuario = null;
            }

            if($id_usuario === null)
            {
                echo json_encode([
                    "success" => false, 
                    "mensaje" => "Ha habido un error en la reserva de la pista"
                ]);
                exit;
            }
            else {
            

                $id_pedido = $reservasModel->hacerPedido([
                    "id_usuario"    => $id_usuario, 
                    "fecha_pedido"  => $fecha_hora_actual, 
                    "precio_pedido" => $precio
                ]);

                // Aqui obtener los datos de la reserva
                foreach($datos as $dato) {
                        
                    $data = [
                        "id_pista"      => $dato["pista"], 
                        "fecha"         => $dato["fecha"], 
                        "hora_inicio"   => $dato["hora"],
                        "hora_final"    => $dato["horaFin"], 
                        "fecha_reserva" => $fecha_hora_actual,
                        "id_usuario"    => $id_usuario, 
                        "id_pedido"     => $id_pedido
                    ];

                    $reserva = $reservasModel->hacerReserva($data);
                }

                echo json_encode([
                    "success" => true, 
                    "mensaje" => "La reserva se ha hecho de manera satisfactoria"
                ]);
                exit;
            } 

        }
    }
}
