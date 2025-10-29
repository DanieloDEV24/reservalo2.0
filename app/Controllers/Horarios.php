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
            // $horario = $horariosModel->crearHorario($data_tipo_horario);

            // Ahora creamos las franjas horarias
            // Obtenemos el horario 
            $horarios = $data["horarios"];
            if(isset($horarios["lunes"])) {
                $franjas = $this->obtenerFranjasHorarias($horarios);
            }
            else {

            }
        }
    }


    private function obtenerFranjasHorarias (array $dias) {

        $franjas = [];

        foreach ($dias as $key => $value) {
            
            if(count($franjas) === 0) {
                $franjas[][$key] = $value;
            }
            else {
                foreach($franjas as $clave => $franja){
                    
                    foreach($franja as $calve_franja => $valor_franja){
                        if($valor_franja["manana"]["inicio"] === $value["manana"]["inicio"] && $valor_franja["manana"]["fin"] === $value["manana"]["fin"] &&
                           $valor_franja["tarde"]["inicio"] === $value["tarde"]["inicio"] && $valor_franja["tarde"]["fin"] === $value["tarde"]["fin"]){
                            $franjas[$clave][$key] = $value;
                           }
                           else{
                            $franjas[$clave + 1][$key] = $value;
                           }
                    }
                }
            }
            
        }

        return $franjas;
    }

}
