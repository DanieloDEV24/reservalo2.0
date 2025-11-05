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
            $horariosModel      = new horariosModel();

            $horarios = $horariosModel->comprobarHorarios();
            
            $instalacion = $instalacionesModel->getInstalacion($id)[0];

            $modalEditar = view('horarios/modalEditarHorario');

            $assets = [
                "css" => [
                    'css/horarios.css', 
                    'css/style.css'
                ], 

                "js" => [
                    'js/horarios.js'
                ]
            ];
            
            $view = view('horarios/horarios', ["instalacion" => $instalacion, "id_instalacion"=>$id_instalacion, "horarios" => $horarios, "modalEditar" => $modalEditar]);
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
            $horario = $horariosModel->crearHorario($data_tipo_horario);

            // Ahora creamos las franjas horarias
            // Obtenemos el horario 
            $horarios = $data["horarios"];
            if(isset($horarios["lunes"])) {
                $franjas = $this->obtenerFranjasHorarias($horarios);
                
                foreach ($franjas as $franja) {
                    $primerElemento = reset($franja);
                    $data_franja = [
                        "id_tipo_horario" => $horario,
                        "id_instalacion" => $id_instalacion, 
                        "hora_inicio_manana" => $primerElemento["manana"]["inicio"],
                        "hora_fin_manana" => $primerElemento["manana"]["fin"], 
                        "hora_inicio_tarde" => $primerElemento["tarde"]["inicio"], 
                        "hora_fin_tarde" => $primerElemento["tarde"]["fin"], 
                        "franja_unica" => 0
                    ];

                    $franja_horaria = $horariosModel->crearFranjaHoraria($data_franja);
                    
                    foreach ($franja as $key => $value) {
                        $index = $this->obtenerNumeroDia($key);
                        $data_franja_dia = [
                            "id_franja_horaria" => $franja_horaria,
                            "id_dia_semana" => $index
                        ];

                        $horariosModel->crearFranjaDia($data_franja_dia);
                    }

                }
            }
            else {
               
                $data_franja = [
                    "id_tipo_horario" => $horario,
                    "id_instalacion" => $id_instalacion, 
                    "hora_inicio_manana" => $data["horarios"]["manana"]["inicio"],
                    "hora_fin_manana" => $data["horarios"]["manana"]["fin"], 
                    "hora_inicio_tarde" => $data["horarios"]["tarde"]["inicio"], 
                    "hora_fin_tarde" => $data["horarios"]["tarde"]["fin"], 
                    "franja_unica" => 1
                ];

                $franja_horaria = $horariosModel->crearFranjaHoraria($data_franja);
                
                for ($i=1; $i <=7 ; $i++) { 
                    
                    $data_franja_dia = [
                        
                        "id_franja_horaria" => $franja_horaria,
                        "id_dia_semana" => $i
                    ];

                    $horariosModel->crearFranjaDia($data_franja_dia);
                }
            }

           
            echo json_encode([
                "success" => true,
                "mensaje" => "Se ha creado el horario correctamente",
                "infoHorario" => $data_tipo_horario
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


    public function getHorario(){

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();

        if(!empty($post)){

            $id_horario = intval($post["id"]);
            $horario = $horariosModel->getHorario($id_horario)[0];
            $franjas = $horariosModel->getFranjaByIdHorario($id_horario);

           if($horario){
                echo json_encode([
                    "succes"  => true, 
                    "message" => "Se ha localizado el horario con éxito", 
                    "horario" => $horario,
                    "franjas" => $franjas
                ]);
           }
           else {
                echo json_encode([
                    "succes"  => false, 
                    "message" => "Se ha producido un error", 
                ]);
           }
        }
    }


    public function editarHorario(){

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();

        $DIAS_SEMANA = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

        if(!empty($post)){

            $data = $post["data"];
            $data_tipo_horario = [
                "id_tipo_horario" => $data["id_tipo_horario"],
                "nombre" => $data["nombre"],
                "descripcion" => $data["descripcion"],
                "color" => $data["color"],
                "fecha_inicio" => $data["fecha_inicio"],
                "fecha_fin" => $data["fecha_fin"]
            ];

            $horariosModel->actualizarHorario($data_tipo_horario, $data_tipo_horario["id_tipo_horario"]);

            $horarios = $data["horarios"];
            
            // Obtenemos el horario de la bbdd para ver las franjas horarias y ver si hay que borrarlas o no
            $horario_bbdd = $horariosModel->getHorario($data_tipo_horario["id_tipo_horario"])[0];
            $unico_bbdd = $horariosModel->getFranjaByIdHorario(intval($horario_bbdd["id_tipo_horario"]))[0];

            if(intval($unico_bbdd["franja_unica"]) !== intval($data["franja_unica"])){
                
                $franjas_bbdd = $horariosModel->getFranjaByIdHorario(intval($data_tipo_horario["id_tipo_horario"]));
                
                foreach ($franjas_bbdd as $franja) {
                    $horariosModel->borrarFranjaDia(intval($franja["id_franja_horaria"]));
                    $horariosModel->borrarFranjaHoraria(intval($franja["id_franja_horaria"]));
                }

                if(intval($data["franja_unica"]) === 1){
                    
                    $franjas = $this->obtenerFranjasHorarias($horarios);
                    foreach ($franjas as $franja) {
                        $primerElemento = reset($franja);
                        $data_franja = [
                            "id_tipo_horario" => $data["id_tipo_horario"],
                            "id_instalacion" => $data["instalacion"], 
                            "hora_inicio_manana" => $primerElemento["manana"]["inicio"],
                            "hora_fin_manana" => $primerElemento["manana"]["fin"], 
                            "hora_inicio_tarde" => $primerElemento["tarde"]["inicio"], 
                            "hora_fin_tarde" => $primerElemento["tarde"]["fin"], 
                            "franja_unica" => $data["franja_unica"]
                        ];

                        $franja_horaria = $horariosModel->crearFranjaHoraria($data_franja);
                        
                        foreach ($franja as $key => $value) {
                            $index = $this->obtenerNumeroDia($key);
                            $data_franja_dia = [
                                "id_franja_horaria" => $franja_horaria,
                                "id_dia_semana" => $index
                            ];

                            $horariosModel->crearFranjaDia($data_franja_dia);
                        }

                    }

                }
                else {

                    $data_franja = [
                        "id_tipo_horario" => $data["id_tipo_horario"],
                        "id_instalacion" => $data["instalacion"], 
                        "hora_inicio_manana" => $data["horarios"]["manana"]["inicio"],
                        "hora_fin_manana" => $data["horarios"]["manana"]["fin"], 
                        "hora_inicio_tarde" => $data["horarios"]["tarde"]["inicio"], 
                        "hora_fin_tarde" => $data["horarios"]["tarde"]["fin"], 
                        "franja_unica" => $data["franja_unica"]
                    ];

                    $franja_horaria = $horariosModel->crearFranjaHoraria($data_franja);
                    
                    for ($i=1; $i <=7 ; $i++) { 
                        
                        $data_franja_dia = [
                            
                            "id_franja_horaria" => $franja_horaria,
                            "id_dia_semana" => $i
                        ];

                        $horariosModel->crearFranjaDia($data_franja_dia);
                    }
                }
            }
            else {
                
                if(intval($data["franja_unica"]) === 0){
                    

                    $diasHorario = $data["horarios"];

                    foreach ($diasHorario as $key => $value) {
                        
                        $index_dia = $this->obtenerNumeroDia($key);
                        $data_franja = [
                            "id_tipo_horario" => $data["id_tipo_horario"],
                            "id_instalacion" => $data["instalacion"], 
                            "hora_inicio_manana" => $value["manana"]["inicio"],
                            "hora_fin_manana" => $value["manana"]["fin"],
                            "hora_inicio_tarde" => $value["tarde"]["inicio"],
                            "hora_fin_tarde" => $value["tarde"]["fin"],
                            "franja_unica" => $data["franja_unica"]
                        ];

                        $horariosModel->updateFranjaHoraria($data_franja, $data["id_tipo_horario"], $index_dia);
                    }
                }
            }

            echo json_encode([
                "success" => true,
                "mensaje" => "Se ha actualizado el horario correctamente",
                "infoHorario" => $data_tipo_horario
            ]);
            exit;   
        }   
    }


    /***********************************************************************************************************************************
    *******************************************************  FUNCIONES DE AYUDA  *******************************************************
    ***********************************************************************************************************************************/

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
