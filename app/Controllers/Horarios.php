<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;
use App\Models\horariosModel;
use App\Models\actividadModel;
use DateTime;

class Horarios extends BaseController
{


    public function horario(?string $id_instalacion = null){

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
            $modalSinFechaHorario = view('horarios/modalSinFechaHorario');

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

            $view = view('horarios/horarios', ["instalacion" => $instalacion, "id_instalacion" => $id_instalacion, "horarios" => $horarios, "modalEditar" => $modalEditar, "modalBorrar" => $modalBorrar, "modalHorarioExistente" => $modalHorarioExistente, "modalCambioHorario" => $modalCambioHorario, "modalSinFechaHorario" => $modalSinFechaHorario]);
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
        $otrasInstalaciones = json_decode($this->request->getPost('data')['otrasInstalaciones'], true) ?? [];

        $horarios_existentes = $horariosModel->getHorarioFromFechas(
            (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date('Y') . '-01-01' : $data["fecha_inicio"],
            (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date("Y") . '-12-31' : $data["fecha_fin"],
            $id_instalacion
        );

        $otros_horarios_existentes = [];
        foreach ($otrasInstalaciones as $otraInstalacion) {
            $elem_otro_horario= $horariosModel->getHorarioFromFechas(
                (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date('Y') . '-01-01' : $data["fecha_inicio"],
                (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date("Y") . '-12-31' : $data["fecha_fin"],
                intval($otraInstalacion["id"])
            );

            if(count($elem_otro_horario) > 0) {
                $otros_horarios_existentes[] = $elem_otro_horario;  
            }
        }

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
                "nombre"       => $data["nombre"],
                "descripcion"  => $data["descripcion"],
                "color"        => $data["color"],
                "fecha_inicio" => (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date('Y') . '-01-01' : $data["fecha_inicio"],
                "fecha_fin"    => (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date("Y") . '-12-31' : $data["fecha_fin"],
                "es_especial"  => intval($data["horario_especial"]),
                "sin_fecha"    => intval($data["sin_fecha"])
            ];

            $horario = $horariosModel->crearHorario($data_tipo_horario);
            $actividadModel->crearActividad([
                "tipo"        => 10,
                "descripcion" => "Creación del horario " . $data_tipo_horario["nombre"],
                "fecha"       => date("Y-m-d H:i:s"),
                "id_usuario"  => $session->get('usuario')["id_usuario"]
            ]);

            if (intval($data["sin_fecha"]) === 0) {
                foreach ($horarios_existentes as $horario_e) {
                    
                    if (intval($horario_e["es_especial"]) === 0) {
                        $fechaInicioBase       = new DateTime($horario_e["fecha_inicio"]);
                        $fechaInicioExcepcion  = new DateTime($data_tipo_horario["fecha_inicio"]);
                        $fechaFinBase          = new DateTime($horario_e["fecha_fin"]);
                        $fechaFinExcepcion     = new DateTime($data_tipo_horario["fecha_fin"]);

                        $horariosModel->crearExcepcion([
                            "id_tipo_horario_base"      => intval($horario_e["id_tipo_horario"]),
                            "id_tipo_horario_excepcion" => intval($horario),
                            "id_instalacion"            => $id_instalacion, 
                            "fecha_inicio"              => ($fechaInicioBase > $fechaInicioExcepcion) ? $fechaInicioBase->format("Y-m-d") : $fechaInicioExcepcion->format("Y-m-d"),
                            "fecha_fin"                 => ($fechaFinBase < $fechaFinExcepcion) ? $fechaFinBase->format("Y-m-d") : $fechaFinExcepcion->format("Y-m-d")
                        ]);
                    }
                }

                foreach ($otros_horarios_existentes as $otro_horario) {
                    
                    foreach($otro_horario as $otr) {
                        if (intval($otr["es_especial"]) === 0) {
                        $fechaInicioBase       = new DateTime($otr["fecha_inicio"]);
                        $fechaInicioExcepcion  = new DateTime($data_tipo_horario["fecha_inicio"]);
                        $fechaFinBase          = new DateTime($otr["fecha_fin"]);
                        $fechaFinExcepcion     = new DateTime($data_tipo_horario["fecha_fin"]);

                        $horariosModel->crearExcepcion([
                            "id_tipo_horario_base"      => intval($otr["id_tipo_horario"]),
                            "id_tipo_horario_excepcion" => intval($horario),
                            "id_instalacion"            => $otr["id_instalacion"], 
                            "fecha_inicio"              => ($fechaInicioBase > $fechaInicioExcepcion) ? $fechaInicioBase->format("Y-m-d") : $fechaInicioExcepcion->format("Y-m-d"),
                            "fecha_fin"                 => ($fechaFinBase < $fechaFinExcepcion) ? $fechaFinBase->format("Y-m-d") : $fechaFinExcepcion->format("Y-m-d")
                        ]);
                    }
                    }
                } 
            }

        } else {

            $data_tipo_horario = [
                "nombre"       => $data["nombre"],
                "descripcion"  => $data["descripcion"],
                "color"        => $data["color"],
                "fecha_inicio" => (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date('Y') . '-01-01' : $data["fecha_inicio"],
                "fecha_fin"    => (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? (date("Y") + 1) . '-12-31' : $data["fecha_fin"],
                "es_especial"  => intval($data["horario_especial"]),
                "sin_fecha"    => intval($data["sin_fecha"])
            ];

            $horario = $horariosModel->crearHorario($data_tipo_horario);
        }

        $data_tipo_horario["id_tipo_horario"] = $horario;

        // Franjas para la instalación principal
        $this->crearFranjasParaInstalacion($horariosModel, $horario, $id_instalacion, $data["horarios"]);

        $horarios_no_valen = [];

        $otros_horarios_existentes = [];
        // Franjas para las otras instalaciones (mismo horario, mismo $data["horarios"])
        foreach ($otrasInstalaciones as $otraInstalacion) {

            $otros_horarios_existentes = $horariosModel->getHorarioFromFechas(
                (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date('Y') . '-01-01' : $data["fecha_inicio"],
                (intval($data["horario_especial"]) === 1 && intval($data["sin_fecha"]) === 1) ? date("Y") . '-12-31' : $data["fecha_fin"],
                intval($otraInstalacion["id"])
            );

            if (intval($data["horario_especial"]) === 0 && count($otros_horarios_existentes) > 0) {
                $horarios_no_valen[] = ["instalacion" => $otraInstalacion, "infoHorario" => $otros_horarios_existentes, "infoHorarioBueno" => $data_tipo_horario];
            }

            if(!empty($horarios_no_valen)) {
                echo json_encode([
                    "success" => false,
                    "mensaje" => "Ya existe un horario dentro del rango seleccionado",
                    "infoHorarioOtros" => $horarios_no_valen, 
                ]);
                exit;
            }

            $this->crearFranjasParaInstalacion($horariosModel, $horario, intval($otraInstalacion["id"]), $data["horarios"]);
            
        }

        echo json_encode([
            "success"     => true,
            "mensaje"     => "Se ha creado el horario correctamente",
            "infoHorario" => $data_tipo_horario
        ]);
        exit;
    }
}

private function crearFranjasParaInstalacion(horariosModel $horariosModel, int $horario, int $id_instalacion, array $horarios): void
{
    if (isset($horarios["lunes"])) {

        $franjas = $this->obtenerFranjasHorarias($horarios);

        foreach ($franjas as $franja) {
            $primerElemento = reset($franja);
            $franja_horaria = $horariosModel->crearFranjaHoraria([
                "id_tipo_horario"    => $horario,
                "id_instalacion"     => $id_instalacion,
                "hora_inicio_manana" => $primerElemento["manana"]["inicio"],
                "hora_fin_manana"    => $primerElemento["manana"]["fin"],
                "hora_inicio_tarde"  => $primerElemento["tarde"]["inicio"],
                "hora_fin_tarde"     => $primerElemento["tarde"]["fin"],
                "franja_unica"       => 0
            ]);

            foreach ($franja as $key => $value) {
                $horariosModel->crearFranjaDia([
                    "id_franja_horaria" => $franja_horaria,
                    "id_dia_semana"     => $this->obtenerNumeroDia($key)
                ]);
            }
        }

    } else {

        $franja_horaria = $horariosModel->crearFranjaHoraria([
            "id_tipo_horario"    => $horario,
            "id_instalacion"     => $id_instalacion,
            "hora_inicio_manana" => $horarios["manana"]["inicio"],
            "hora_fin_manana"    => $horarios["manana"]["fin"],
            "hora_inicio_tarde"  => $horarios["tarde"]["inicio"],
            "hora_fin_tarde"     => $horarios["tarde"]["fin"],
            "franja_unica"       => 1
        ]);

        for ($i = 1; $i <= 7; $i++) {
            $horariosModel->crearFranjaDia([
                "id_franja_horaria" => $franja_horaria,
                "id_dia_semana"     => $i
            ]);
        }
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
            $instalacion = intval($post["instalacion"]);
            $horario = $horariosModel->getHorario($id_horario)[0];
            $franjas = $horariosModel->getFranjaByIdHorario($id_horario, $instalacion);
            $excepciones = $horariosModel->hayExcepcionBase($id_horario, $instalacion);

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
            $otrasInstalaciones = $otrasInstalaciones = json_decode($this->request->getPost('data')['otrasInstalaciones'], true) ?? [];

            $instalacion = intval($data["instalacion"]);

            $data_tipo_horario = [
                "id_tipo_horario" => $data["id_tipo_horario"],
                "nombre"          => $data["nombre"],
                "descripcion"     => $data["descripcion"],
                "color"           => $data["color"],
                "fecha_inicio"    => $data["fecha_inicio"],
                "fecha_fin"       => $data["fecha_fin"]
            ];

            $horariosModel->actualizarHorario($data_tipo_horario, $data_tipo_horario["id_tipo_horario"]);
            $actividadModel->crearActividad([
                "tipo"        => 12,
                "descripcion" => "Modificación del horario " . $data_tipo_horario["nombre"],
                "fecha"       => date("Y-m-d H:i:s"),
                "id_usuario"  => $session->get('usuario')["id_usuario"]
            ]);

            // --- Instalación principal ---
            $this->editarFranjasParaInstalacion($horariosModel, $data, intval($data["instalacion"]));

            // --- Otras instalaciones ---
            foreach ($otrasInstalaciones as $otraInstalacion) {
                $this->editarFranjasParaInstalacion($horariosModel, $data, intval($otraInstalacion["id"]));
            }

            // --- Excepciones ---
            $hay_excepcion_base      = $horariosModel->hayExcepcionBase(intval($data_tipo_horario["id_tipo_horario"]), $instalacion);
            $hay_excepcion_excepcion = $horariosModel->hayExcepcionExcepcion(intval($data_tipo_horario["id_tipo_horario"]), $instalacion);

            $excepciones = count($hay_excepcion_base) > 0 
                ? $hay_excepcion_base 
                : (count($hay_excepcion_excepcion) > 0 ? $hay_excepcion_excepcion : []);

            foreach ($excepciones as $excepcion) {

                $horario_excepcion = $horariosModel->getHorario(intval($excepcion["id_tipo_horario_excepcion"]))[0];
                $horario_base      = $horariosModel->getHorario(intval($excepcion["id_tipo_horario"]))[0];

                $fechaInicioBase      = new DateTime($horario_base["fecha_inicio"]);
                $fechaInicioExcepcion = new DateTime($horario_excepcion["fecha_inicio"]);
                $fechaFinBase         = new DateTime($horario_base["fecha_fin"]);
                $fechaFinExcepcion    = new DateTime($horario_excepcion["fecha_fin"]);

                $horariosModel->editarExcepcion([
                    "id_excepciones_horario"    => intval($excepcion["id_excepciones_horario"]),
                    "id_tipo_horario_base"      => intval($excepcion["id_tipo_horario"]),
                    "id_tipo_horario_excepcion" => intval($excepcion["id_tipo_horario_excepcion"]),
                    "id_instalacion"            =>  $instalacion,   
                    "fecha_inicio"              => ($fechaInicioBase > $fechaInicioExcepcion) ? $fechaInicioBase->format("Y-m-d") : $fechaInicioExcepcion->format("Y-m-d"),
                    "fecha_fin"                 => ($fechaFinBase < $fechaFinExcepcion) ? $fechaFinBase->format("Y-m-d") : $fechaFinExcepcion->format("Y-m-d")
                ]);
            }

            echo json_encode([
                "success"     => true,
                "mensaje"     => "Se ha actualizado el horario correctamente",
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
            $instalacion = intval($post["instalacion"]);
            $otrasInstalaciones = json_decode($this->request->getPost('otrasInstalaciones'), true) ?? [];

            $franjas_bbdd = $horariosModel->getFranjaByIdHorario(intval($id_horario), $instalacion);

            foreach ($franjas_bbdd as $franja) {
                $horariosModel->borrarFranjaDia(intval($franja["id_franja_horaria"]));
                $horariosModel->borrarFranjaHoraria(intval($franja["id_franja_horaria"]));
            }
            $horariosModel->borrarExcepcion($id_horario, $instalacion);

            // $horariosModel->borrarExcepcion($id_horario);

            $nombre_horario = $horariosModel->getHorario($id_horario)[0]["nombre"];

            // $horariosModel->borrarHorario(intval($id_horario));

            $instalacionesConHorario = $horariosModel->getInstalacionesByHorario($id_horario);
            $ids1 = array_column($instalacionesConHorario, 'id_instalacion');
            $ids2 = array_column($otrasInstalaciones, 'id');
            $diff = array_diff($ids1, $ids2);

            foreach($otrasInstalaciones as $otraInstalacion){
                $franjas_bbdd_otras = $horariosModel->getFranjaByIdHorario(intval($id_horario), intval($otraInstalacion["id"]));
                
                foreach ($franjas_bbdd_otras as $franja_otra) {
                    $horariosModel->borrarFranjaDia(intval($franja_otra["id_franja_horaria"]));
                    $horariosModel->borrarFranjaHoraria(intval($franja_otra["id_franja_horaria"]));
                }

                $horariosModel->borrarExcepcion(intval($id_horario), intval($otraInstalacion["id"]));
            }

            if(empty($diff)){
                $horariosModel->borrarHorario(intval($id_horario));
            }


            $actividad = $actividadModel->crearActividad([
                    "tipo" => 11,
                    "descripcion" => "Borrado del horario ". $nombre_horario, 
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
            $instalacion = intval($post["instalacion"]);

            $horariosModel = new horariosModel();
            $horarios = $horariosModel->getHorariosChange($year, $instalacion);

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
            $otrasInstalaciones = json_decode($this->request->getPost('otrasInstalaciones'), true) ?? [];

            foreach ($cambios as $cambio) {

                if(isset($cambio["excepcion"]) && filter_var($cambio["excepcion"], FILTER_VALIDATE_BOOLEAN) === true) {
                    $obj_sin_fecha = $horariosModel->comprobarSinFechaExcepcion($cambio["fecha"], intval($cambio["idInstalacion"]), intval($cambio["horarioAntiguo"]));
                    $sin_fecha = (intval($obj_sin_fecha[0]["sin_fecha"]) === 1) ? true : false;

                    if($sin_fecha){
                        
                        $horariosModel->borrarExcepcionFechaSola($cambio["fecha"], intval($cambio["idInstalacion"]), intval($cambio["horarioAntiguo"]));
                        foreach($otrasInstalaciones as $otraInstalacion) {
                            $horariosModel->borrarExcepcionFechaSola($cambio["fecha"], intval($otraInstalacion["id"]), intval($cambio["horarioAntiguo"]));
                        }

                        // $excepcion_a_buscar = $horariosModel->getExcepcion(intval($cambio["horarioAntiguo"]), intval($cambio["horarioNuevo"]), intval($cambio["idInstalacion"]))[0];
                        // $fecha_inicio = $excepcion_a_buscar["fecha_inicio"];
                        // $fecha_final = $excepcion_a_buscar["fecha_fin"];
                        // $fecha_cambio = \DateTime::createFromFormat('d/m/Y', $cambio["fecha"])->format('Y-m-d');

                        // $fecha_inicio_excepecion = "";
                        // $fecha_final_excepcion = "";

                        // if($fecha_inicio === $fecha_cambio){
                        //     $fecha_inicio_excepecion = \DateTime::createFromFormat('Y-m-d', $fecha_inicio)->modify('+1 day')->format('Y-m-d');
                        //     $fecha_final_excepcion   = $fecha_final;
                        //     $horariosModel->crearExcepcion([
                        //         "id_tipo_horario_base" => intval($cambio["horarioNuevo"]), 
                        //         "id_tipo_horario_excepcion" => intval($cambio["horarioAntiguo"]), 
                        //         "id_instalacion" => intval($cambio["idInstalacion"]), 
                        //         "fecha_inicio" => $fecha_inicio_excepecion, 
                        //         "fecha_fin" => $fecha_final_excepcion
                        //     ]);
                            
                        // }
                        // else if ($fecha_final === $fecha_cambio) {
                        //     $fecha_inicio_excepecion = $fecha_inicio;
                        //     $fecha_final_excepcion   = \DateTime::createFromFormat('Y-m-d', $fecha_final)->modify('-1 day')->format('Y-m-d');
                        //     $horariosModel->crearExcepcion([
                        //         "id_tipo_horario_base" => intval($cambio["horarioNuevo"]), 
                        //         "id_tipo_horario_excepcion" => intval($cambio["horarioAntiguo"]), 
                        //         "id_instalacion" => intval($cambio["idInstalacion"]), 
                        //         "fecha_inicio" => $fecha_inicio_excepecion, 
                        //         "fecha_fin" => $fecha_final_excepcion
                        //     ]);
                        // }
                        // else {
                        //     $horariosModel->crearExcepcion([
                        //         "id_tipo_horario_base" => intval($cambio["horarioNuevo"]), 
                        //         "id_tipo_horario_excepcion" => intval($cambio["horarioAntiguo"]), 
                        //         "id_instalacion" => intval($cambio["idInstalacion"]), 
                        //         "fecha_inicio" => $fecha_inicio, 
                        //         "fecha_fin" => \DateTime::createFromFormat('Y-m-d', $fecha_cambio)->modify('-1 day')->format('Y-m-d')
                        //     ]);

                        //     $horariosModel->crearExcepcion([
                        //         "id_tipo_horario_base" => intval($cambio["horarioNuevo"]), 
                        //         "id_tipo_horario_excepcion" => intval($cambio["horarioAntiguo"]), 
                        //         "id_instalacion" => intval($cambio["idInstalacion"]), 
                        //         "fecha_inicio" => \DateTime::createFromFormat('Y-m-d', $fecha_cambio)->modify('+1 day')->format('Y-m-d'), 
                        //         "fecha_fin" => $fecha_final
                        //     ]);
                        // }

                        // $horariosModel->borrarExcepcionFechaSola($cambio["fecha"], intval($cambio["idInstalacion"]), intval($cambio["horarioAntiguo"]));
                    }
                    
                }
                else {
                    $horariosModel->cambiarHorariosSeleccionados($cambio);
                    foreach($otrasInstalaciones as $otraInstalacion) {
                        $horario_base = $horariosModel->getHorarioBase(intval($otraInstalacion["id"]), $cambio["fecha"]);
                        if(isset($horario_base[0])){
                            $nueva_data = [
                                "excepcion" => $cambio["excepcion"],
                                "idInstalacion" => intval($otraInstalacion["id"]),
                                "fecha" => $cambio["fecha"],
                                "horarioAntiguo" => $horario_base[0]["id_tipo_horario"],
                                "horarioNuevo" => $cambio["horarioNuevo"]
                            ];
                            $horariosModel->cambiarHorariosSeleccionados($nueva_data);
                        }
                        
                    }
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
            $instalacion = intval($data["instalacion"]);
            $horario_excepcion = $data["horario-excepcion"];

            $excepcion = $horariosModel->getHorariosChangeException($fecha, $instalacion)[0];
            $horario_excepcion_data = $horariosModel->getHorario($horario_excepcion)[0];

            echo json_encode([
                "success" => true,
                "excepcion" => $excepcion,
                "horario_excepcion" => $horario_excepcion_data
            ]);
            exit;
        }
    }

    public function obtenerInstalacionesHorarios() {
        $instalacionesModel = new instalacionesModel();
        $instalaciones = $instalacionesModel->getInstalaciones(null);
        echo json_encode([
            "success" => true,
            "instalaciones" => $instalaciones
        ]);
        exit;
    }

    public function obtenerInstalacionesConEseHorario() {
        $horarioModel = new horariosModel();
        $post = $this->request->getPost();

        if(!empty($post)) {
            $horario = intval($post["horario"]);
            $instalaciones = $horarioModel->getInstalacionesByHorario($horario);

            if(!empty($instalaciones)) {
                echo json_encode([
                    "success" => true,
                    "hayInstalaciones" => true,
                    "instalaciones" => $instalaciones
                ]);
                exit;
            }
            else {
                echo json_encode([
                    "success" => true,
                    "hayInstalaciones" => false,
                ]);
                exit;
            }
        }
    }

    public function obtenerInstalacionesConEsosHorarios() {
        $horarioModel = new horariosModel();
        $post = $this->request->getPost();

        if(!empty($post)) {
            $horarios = $post["horarios"];
            $instalaciones = [];

            foreach($horarios as $horario) {
                $instalaciones[] = $horarioModel->getInstalacionesByHorario(intval($horario));
            }
            

            if(!empty($instalaciones)) {
                echo json_encode([
                    "success" => true,
                    "hayInstalaciones" => true,
                    "instalaciones" => $instalaciones
                ]);
                exit;
            }
            else {
                echo json_encode([
                    "success" => true,
                    "hayInstalaciones" => false,
                ]);
                exit;
            }
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

    private function editarFranjasParaInstalacion($horariosModel, array $data, int $id_instalacion): void
    {
        // Borramos solo las franjas de este horario + esta instalación
        $franjas_bbdd = $horariosModel->getFranjasByIdHorarioEInstalacion(intval($data["id_tipo_horario"]), $id_instalacion);

        foreach ($franjas_bbdd as $franja) {
            $horariosModel->borrarFranjaDia(intval($franja["id_franja_horaria"]));
            $horariosModel->borrarFranjaHoraria(intval($franja["id_franja_horaria"]));
        }

        // Recreamos las franjas
        if (intval($data["franja_unica"]) === 0) {

            $franjas = $this->obtenerFranjasHorarias($data["horarios"]);

            foreach ($franjas as $franja) {
                $primerElemento = reset($franja);
                $franja_horaria = $horariosModel->crearFranjaHoraria([
                    "id_tipo_horario"    => $data["id_tipo_horario"],
                    "id_instalacion"     => $id_instalacion,
                    "hora_inicio_manana" => $primerElemento["manana"]["inicio"],
                    "hora_fin_manana"    => $primerElemento["manana"]["fin"],
                    "hora_inicio_tarde"  => $primerElemento["tarde"]["inicio"],
                    "hora_fin_tarde"     => $primerElemento["tarde"]["fin"],
                    "franja_unica"       => $data["franja_unica"]
                ]);

                foreach ($franja as $key => $value) {
                    $horariosModel->crearFranjaDia([
                        "id_franja_horaria" => $franja_horaria,
                        "id_dia_semana"     => $this->obtenerNumeroDia($key)
                    ]);
                }
            }

        } else {

            $franja_horaria = $horariosModel->crearFranjaHoraria([
                "id_tipo_horario"    => $data["id_tipo_horario"],
                "id_instalacion"     => $id_instalacion,
                "hora_inicio_manana" => $data["horarios"]["manana"]["inicio"],
                "hora_fin_manana"    => $data["horarios"]["manana"]["fin"],
                "hora_inicio_tarde"  => $data["horarios"]["tarde"]["inicio"],
                "hora_fin_tarde"     => $data["horarios"]["tarde"]["fin"],
                "franja_unica"       => $data["franja_unica"]
            ]);

            for ($i = 1; $i <= 7; $i++) {
                $horariosModel->crearFranjaDia([
                    "id_franja_horaria" => $franja_horaria,
                    "id_dia_semana"     => $i
                ]);
            }
        }
    }

    // private function crearHoras () {

    //     $
    // }
}
