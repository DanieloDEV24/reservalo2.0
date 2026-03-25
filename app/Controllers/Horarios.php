<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;
use App\Models\horariosModel;
use App\Models\actividadModel;
use DateTime;

class Horarios extends BaseController
{


    public function horario(?int $id_instalacion = null){

        if ($id_instalacion !== null) {

            $id = intval($id_instalacion);

            $instalacionesModel = new instalacionesModel();
            $horariosModel      = new horariosModel();

            $horarios = $horariosModel->comprobarHorariosLegend($id);

            $instalacion = $instalacionesModel->getInstalacion($id)[0];

            $modalEditar = view('horarios/modalEditarHorario');
            $modalBorrar = view('horarios/modalBorrarHorario');
            $modalHorarioExistente = view('horarios/modalHorarioExistente');
            $modalCambioHorario = view('horarios/modalCambioHorario');

            $assets = [
                "css" => [
                    'css/horarios.css',
                    'css/style.css', 
                    'css/responsive.css'
                ],

                "js" => [
                    'js/horarios.js'
                ]
            ];

            $modalAnularHoras = view('reservas/modalAnularHoras');
            $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras]);
            $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

            $view = view('horarios/horarios', ["instalacion" => $instalacion, "id_instalacion" => $id_instalacion, "horarios" => $horarios, "modalEditar" => $modalEditar, "modalBorrar" => $modalBorrar, "modalHorarioExistente" => $modalHorarioExistente, "modalCambioHorario" => $modalCambioHorario]);
            return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets, "modalMisReservas" => $modalMisReservas, "modalInformacionPersonal" => $modalInformacionPersonal]);
        }
    }

    public function comprobarHorariosAno() {
        $post = $this->request->getPost();
        $horariosModel = new horariosModel();

        if (!empty($post)) {

            $year = intval($post["year"]);
            $instalacion = intval($post["instalacion"]);

            $horarios = $horariosModel->comprobarHorariosAno($year, $instalacion);

            echo json_encode([
                "horarios" => $horarios
            ]);
            exit;
        }
    }

    public function crearHorario(){

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();
        $actividadModel = new actividadModel();
        $session = session();

        if (!empty($post)) {

            $data = $post["data"];
            $id_instalacion = intval($data["instalacion"]);

            $horarios_existentes = $horariosModel->getHorarioFromFechas(((intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date('Y') . '-01-01' : $data["fecha_inicio"]), ((intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? (date("Y")) . '-12-31' : $data["fecha_fin"]), $id_instalacion);

            if (intval($data["horario_especial"]) === 0 && count($horarios_existentes) > 0) {

                echo json_encode([
                    "success" => false,
                    "mensaje" => "Ya existe un horario dentro del rango seleccionado",
                    "infoHorario" => $horarios_existentes
                ]);
                exit;
            }

            $data_tipo_horario = [];
            $horario = 0;
            if (intval($data["horario_especial"]) === 1 && count($horarios_existentes) > 0) {
                $data_tipo_horario = [
                    "nombre" => $data["nombre"],
                    "descripcion" => $data["descripcion"],
                    "color" => $data["color"],
                    "fecha_inicio" => (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date('Y') . '-01-01' : $data["fecha_inicio"],
                    "fecha_fin" => (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date("Y") . '-12-31' : $data["fecha_fin"],
                    "es_especial" => intval($data["horario_especial"]),
                    "sin_fecha" => intval($data["sin_fecha"])
                ];

                $horario   = $horariosModel->crearHorario($data_tipo_horario);
                $actividad = $actividadModel->crearActividad([
                    "tipo" => 10,
                    "descripcion" => "Creación del horario ". $data_tipo_horario["nombre"], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
                ]);

                if(intval($data["sin_fecha"]) === 0){
                    foreach ($horarios_existentes as $horario_e) {

                        if (intval($horario_e["es_especial"]) === 0) {

                            $fechaInicioBase = new DateTime($horario_e["fecha_inicio"]);
                            $fechaInicioExcepcion = new DateTime($data_tipo_horario["fecha_inicio"]);
                            $fechaFinBase = new DateTime($horario_e["fecha_fin"]);
                            $fechaFinExcepcion = new DateTime($data_tipo_horario["fecha_fin"]);

                            $data_excepcion  = [
                                "id_tipo_horario_base" => intval($horario_e["id_tipo_horario"]),
                                "id_tipo_horario_excepcion" => intval($horario),
                                "fecha_inicio" => ($fechaInicioBase > $fechaInicioExcepcion) ? $fechaInicioBase->format("Y-m-d") : $fechaInicioExcepcion->format("Y-m-d"),
                                "fecha_fin" => ($fechaFinBase < $fechaFinExcepcion) ? $fechaFinBase->format("Y-m-d") : $fechaFinExcepcion->format("Y-m-d")
                            ];

                            $horariosModel->crearExcepcion($data_excepcion);
                        }
                }
                }

            } else {
                // Creamos el data que irá con la creación de los horarios
                $data_tipo_horario = [
                    "nombre" => $data["nombre"],
                    "descripcion" => $data["descripcion"],
                    "color" => $data["color"],
                    "fecha_inicio" => (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date('Y') . '-01-01' : $data["fecha_inicio"],
                    "fecha_fin" => (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? (date("Y") + 1) . '-12-31' : $data["fecha_fin"],
                    "es_especial" => intval($data["horario_especial"]),
                    "sin_fecha" => intval($data["sin_fecha"])
                ];

                // Creamos el horario
                $horario = $horariosModel->crearHorario($data_tipo_horario);
            }


            $data_tipo_horario["id_tipo_horario"] = $horario;

            // Ahora creamos las franjas horarias
            // Obtenemos el horario 
            $horarios = $data["horarios"];
            if (isset($horarios["lunes"])) {
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
            } else {

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

                for ($i = 1; $i <= 7; $i++) {

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

    public function comprobarHorarios(){

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();

        if (!empty($post)) {
            $id = intval($post["instalacion"]);
            $year = $post["year"];
            $horarios = ($year !== "") ? $horariosModel->comprobarHorariosAno(intval($year), $id) : $horariosModel->comprobarHorariosLegend($id);
            $excepciones = $horariosModel->comprobarExcepciones($id);

            echo json_encode([
                "horarios" => $horarios, 
                "excepciones" => $excepciones
            ]);
            exit;
        }
    }

    public function getHorario(){

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();

        if (!empty($post)) {

            $id_horario = intval($post["id"]);
            $horario = $horariosModel->getHorario($id_horario)[0];
            $franjas = $horariosModel->getFranjaByIdHorario($id_horario);
            $excepciones = $horariosModel->hayExcepcionBase($id_horario);

            if ($horario) {
                echo json_encode([
                    "succes"  => true,
                    "message" => "Se ha localizado el horario con éxito",
                    "horario" => $horario,
                    "franjas" => $franjas,
                    "excepciones" => $excepciones
                ]);
            } else {
                echo json_encode([
                    "succes"  => false,
                    "message" => "Se ha producido un error",
                ]);
            }
        }
    }
    
    public function menuHorario() {
        
        $post = $this->request->getPost();
        $horariosModel = new horariosModel();


        if (!empty($post)) {
            $year = $post['year'];
            $instalacion = intval($post["instalacion"]);
            $horarios = $horariosModel->comprobarHorariosSidebar($instalacion, $year);
            
            echo json_encode([
                "succes" => true, 
                "horarios" => $horarios 
            ]);
        }


    }

    public function editarHorario(){

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();
        $actividadModel = new actividadModel();
        $session = session();


        if (!empty($post)) {

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
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 12,
                    "descripcion" => "Modificación del horario ". $data_tipo_horario["nombre"], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
            ]);

            $horarios = $data["horarios"];

            // Obtenemos el horario de la bbdd para ver las franjas horarias y ver si hay que borrarlas o no
            $horario_bbdd = $horariosModel->getHorario($data_tipo_horario["id_tipo_horario"])[0];
            $unico_bbdd = $horariosModel->getFranjaByIdHorario(intval($horario_bbdd["id_tipo_horario"]))[0];
            $franjas_bbdd = $horariosModel->getFranjaByIdHorario(intval($data_tipo_horario["id_tipo_horario"]));

            foreach ($franjas_bbdd as $franja) {
                $horariosModel->borrarFranjaDia(intval($franja["id_franja_horaria"]));
                $horariosModel->borrarFranjaHoraria(intval($franja["id_franja_horaria"]));
            }

            if (intval($data["franja_unica"]) === 0) {

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
            } else {

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

                for ($i = 1; $i <= 7; $i++) {

                    $data_franja_dia = [

                        "id_franja_horaria" => $franja_horaria,
                        "id_dia_semana" => $i
                    ];

                    $horariosModel->crearFranjaDia($data_franja_dia);
                }
            }


            $hay_excepcion_base      = $horariosModel->hayExcepcionBase(intval($data_tipo_horario["id_tipo_horario"]));
            $hay_excepcion_excepcion = $horariosModel->hayExcepcionExcepcion(intval($data_tipo_horario["id_tipo_horario"]));

            if (count($hay_excepcion_base) > 0) {

                foreach ($hay_excepcion_base as $excepcion) {

                    // Obtenemos la info del horario que hace la excepción, ya que vamos a modificar los datos del horario base
                    $horario_excepcion = $horariosModel->getHorario(intval($excepcion["id_tipo_horario_excepcion"]));
                    $horario_base = $horariosModel->getHorario(intval($excepcion["id_tipo_horario_base"]));

                    $fechaInicioBase = new DateTime($horario_base["fecha_inicio"]);
                    $fechaInicioExcepcion = new DateTime($horario_excepcion["fecha_inicio"]);
                    $fechaFinBase = new DateTime($horario_base["fecha_fin"]);
                    $fechaFinExcepcion = new DateTime($horario_excepcion["fecha_fin"]);

                    $data_excepcion  = [
                        "id_excepciones_horario" => intval($excepcion["id_excepciones_horario"]),
                        "id_tipo_horario_base" => intval($excepcion["id_tipo_horario_base"]),
                        "id_tipo_horario_excepcion" => intval($excepcion["id_tipo_horario_excepcion"]),
                        "fecha_inicio" => ($fechaInicioBase > $fechaInicioExcepcion) ? $fechaInicioBase->format("Y-m-d") : $fechaInicioExcepcion->format("Y-m-d"),
                        "fecha_fin" => ($fechaFinBase < $fechaFinExcepcion) ? $fechaFinBase->format("Y-m-d") : $fechaFinExcepcion->format("Y-m-d")
                    ];

                    $horariosModel->editarExcepcion($data_excepcion);
                }
            } else if (count($hay_excepcion_excepcion) > 0) {

                foreach ($hay_excepcion_base as $excepcion) {

                    // Obtenemos la info del horario que hace la excepción, ya que vamos a modificar los datos del horario base
                    $horario_excepcion = $horariosModel->getHorario(intval($excepcion["id_tipo_horario_excepcion"]));
                    $horario_base = $horariosModel->getHorario(intval($excepcion["id_tipo_horario_base"]));

                    $fechaInicioBase = new DateTime($horario_base["fecha_inicio"]);
                    $fechaInicioExcepcion = new DateTime($horario_excepcion["fecha_inicio"]);
                    $fechaFinBase = new DateTime($horario_base["fecha_fin"]);
                    $fechaFinExcepcion = new DateTime($horario_excepcion["fecha_fin"]);

                    $data_excepcion  = [
                        "id_excepciones_horario" => intval($excepcion["id_excepciones_horario"]),
                        "id_tipo_horario_base" => intval($excepcion["id_tipo_horario_base"]),
                        "id_tipo_horario_excepcion" => intval($excepcion["id_tipo_horario_excepcion"]),
                        "fecha_inicio" => ($fechaInicioBase > $fechaInicioExcepcion) ? $fechaInicioBase->format("Y-m-d") : $fechaInicioExcepcion->format("Y-m-d"),
                        "fecha_fin" => ($fechaFinBase < $fechaFinExcepcion) ? $fechaFinBase->format("Y-m-d") : $fechaFinExcepcion->format("Y-m-d")
                    ];

                    $horariosModel->editarExcepcion($data_excepcion);
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

    public function borrarHorario(){

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();
        $actividadModel = new actividadModel(); 
        $session = session();

        if (!empty($post)) {

            $id_horario = $post["id"];

            $franjas_bbdd = $horariosModel->getFranjaByIdHorario(intval($id_horario));

            foreach ($franjas_bbdd as $franja) {
                $horariosModel->borrarFranjaDia(intval($franja["id_franja_horaria"]));
                $horariosModel->borrarFranjaHoraria(intval($franja["id_franja_horaria"]));
            }

            $horariosModel->borrarExcepcion($id_horario);

            $nombre_horario = $horariosModel->getHorario($id_horario)[0]["nombre"];

            $horariosModel->borrarHorario(intval($id_horario));

            $actividad = $actividadModel->crearActividad([
                    "tipo" => 11,
                    "descripcion" => "Modificación del horario ". $nombre_horario, 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
            ]);
            

            echo json_encode([
                "success" => true,
                "mensaje" => "Se ha borrado el horario correctamente"
            ]);
        }
    }

    public function getHorariosChange() {
    
        $post = $this->request->getPost();
        $horariosModel = new horariosModel();

        if (!empty($post)) {

            $year = intval($post["year"]);

            $horariosModel = new horariosModel();
            $horarios = $horariosModel->getHorariosChange($year);

            echo json_encode(
                [
                    "horarios" => $horarios
                ]
            );
            exit;
        }
    }

    public function cambiarHorariosSeleccionados() {

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();
        $actividadModel = new actividadModel();
        $session = session();

        if (!empty($post)) {

            $cambios = $post["cambios"];

            foreach ($cambios as $cambio) {

                if(isset($cambio["excepcion"]) && filter_var($cambio["excepcion"], FILTER_VALIDATE_BOOLEAN) === true) {
                    $horariosModel->borrarExcepcionFechaSola($cambio["fecha"]);
                }
                else {
                    $horariosModel->cambiarHorariosSeleccionados($cambio);
                    $actividad = $actividadModel->crearActividad([
                        "tipo" => 14,
                        "descripcion" => "Cambio de horarios", 
                        "fecha" => date("Y-m-d H:i:s"), 
                        "id_usuario" => $session->get('usuario')["id_usuario"]
                    ]);
                }
            }

            echo json_encode([
                "success" => true,
                "mensaje" => "Se han cambiado los horarios seleccionados correctamente"
            ]);
            exit;
        }
    }

    public function getHorariosChangeException() {

        $post = $this->request->getPost();
        $horariosModel = new horariosModel();

        if (!empty($post)) {

            $data  = $post["data"];
            $fecha = $data["fecha"];
            $horario_excepcion = $data["horario-excepcion"];

            $excepcion = $horariosModel->getHorariosChangeException($fecha)[0];
            $horario_excepcion_data = $horariosModel->getHorario($horario_excepcion)[0];

            echo json_encode([
                "success" => true,
                "excepcion" => $excepcion,
                "horario_excepcion" => $horario_excepcion_data
            ]);
            exit;
        }
    }

    /***********************************************************************************************************************************
     *******************************************************  FUNCIONES DE AYUDA  *******************************************************
     ***********************************************************************************************************************************/

    private function obtenerFranjasHorarias(array $dias) {

        $franjas = [];

        foreach ($dias as $key => $value) {

            if (count($franjas) === 0) {
                $franjas[][$key] = $value;
            } else {
                $existe = false;
                foreach ($franjas as $clave => $franja) {


                    foreach ($franja as $calve_franja => $valor_franja) {

                        if (
                            $valor_franja["manana"]["inicio"] === $value["manana"]["inicio"] && $valor_franja["manana"]["fin"] === $value["manana"]["fin"] &&
                            $valor_franja["tarde"]["inicio"] === $value["tarde"]["inicio"] && $valor_franja["tarde"]["fin"] === $value["tarde"]["fin"]
                        ) {
                            $franjas[$clave][$key] = $value;
                            $existe = true;
                        }
                    }
                }
                if ($existe === false) {

                    $franjas[$clave + 1][$key] = $value;
                }
            }
        }

        return $franjas;
    }

    private function obtenerNumeroDia(string $dia){

        $DIAS_SEMANA = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

        $index = array_search($dia, $DIAS_SEMANA);

        return ($index + 1);
    }

    // private function crearHoras () {

    //     $
    // }
}
