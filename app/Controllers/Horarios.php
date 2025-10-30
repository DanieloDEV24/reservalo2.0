<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;
use App\Models\horariosModel;

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
            
            $view = view('horarios/horarios', ["instalacion" => $instalacion, "id_instalacion"=>$id_instalacion]);
            return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets]);
        }

    }


    public function crearHorario(){

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();

         if(!empty($post)){
            
            $data = $post["data"];
            $id_instalacion = $data["instalacion"];

            // Creamos el data que irá con la creación de los horarios
            $data_tipo_horario = [
                "nombre" => $data["nombre"], 
                "descripcion" => $data["descripcion"],
                "color" => $data["color"],
                "fecha_inicio" => $data["fecha_inicio"], 
                "fecha_fin" => $data["fecha_fin"]
            ];

            

            // Creamos el horario
            //$horario = $horariosModel->crearHorario($data_tipo_horario);

            // Ahora creamos las franjas horarias
            // Obtenemos el horario 
            $horarios = $data["horarios"];
            // if(isset($horarios["lunes"])) {
            //     $franjas = $this->obtenerFranjasHorarias($horarios);
                
            //     foreach ($franjas as $franja) {
            //         $primerElemento = reset($franja);
            //         $data_franja = [
            //             "id_tipo_horario" => $horario,
            //             "id_instalacion" => $id_instalacion, 
            //             "hora_inicio_manana" => $primerElemento["manana"]["inicio"],
            //             "hora_fin_manana" => $primerElemento["manana"]["fin"], 
            //             "hora_inicio_tarde" => $primerElemento["tarde"]["inicio"], 
            //             "hora_fin_tarde" => $primerElemento["tarde"]["fin"], 
            //         ];

            //         $franja_horaria = $horariosModel->crearFranjaHoraria($data_franja);
                    
            //         foreach ($franja as $key => $value) {
            //             $index = $this->obtenerNumeroDia($key);
            //             $data_franja_dia = [
            //                 "id_franja_horaria" => $franja_horaria,
            //                 "id_dia_semana" => $index
            //             ];
            //         }

                    

            //     }
            // }
            // else {
            //     $franjas = "hola";
            // }

           
            echo json_encode([
                "success" => true,
                "mensaje" => "Se ha creado el horario correctamente"
            ]);
            exit;
        }
    }


    public function comprobarHorarios() {

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();

        if(!empty($post)){

            $horarios = $horariosModel->comprobarHorarios();

            echo json_encode([
                "horarios" => $horarios
            ]);
        }
    }


    private function obtenerFranjasHorarias (array $dias) {

        $franjas = [];

        foreach ($dias as $key => $value) {
            
            if(count($franjas) === 0) {
                $franjas[][$key] = $value;
            }
            else {
                $existe = false;
                foreach($franjas as $clave => $franja){
                    

                    foreach($franja as $calve_franja => $valor_franja){
                        
                        if($valor_franja["manana"]["inicio"] === $value["manana"]["inicio"] && $valor_franja["manana"]["fin"] === $value["manana"]["fin"] &&
                           $valor_franja["tarde"]["inicio"] === $value["tarde"]["inicio"] && $valor_franja["tarde"]["fin"] === $value["tarde"]["fin"]){
                            $franjas[$clave][$key] = $value;
                            $existe = true;
                        }
                    }
                    
                }
                if($existe === false) {
                        
                        $franjas[$clave + 1][$key] = $value;
                }

            }
            
        }

        return $franjas;
    }


    private function obtenerNumeroDia(string $dia) {
        
        $DIAS_SEMANA = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

        $index = array_search($dia, $DIAS_SEMANA);

        return ($index + 1);
        
    }

}
