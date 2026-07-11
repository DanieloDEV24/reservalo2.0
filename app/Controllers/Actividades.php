<?php

namespace App\Controllers;

use App\Models\instalacionesModel;
use App\Models\reservasModel;
use App\Models\loginModel;
use App\Models\usuariosModel;
use DateTime;
use App\Libraries\Pdf;
use App\Libraries\SmsService;
use App\Models\actividadModel;
use App\Models\actividadesModel;

class Actividades extends BaseController
{
    public function actividades() {

        $actividadesModel = new actividadesModel();
        $usuariosModel = new usuariosModel();
        $session = session();

        $actividades = $actividadesModel->getActividades();
        $numero_tipos_actividad = count($actividadesModel->getTiposActividades());
        $tipos_actividades = $actividadesModel->getTiposActividades();
        $usuario = null;
        if ($session->get('usuario')) {
            $usuario = $usuariosModel->getUsuarioById(intval($session->get('usuario')['id_usuario']))[0];
        }


        $assets = [
            "css" => [
                'css/instalaciones.css',
                'css/actividades.css', 
                'css/style.css', 
                'css/responsive.css'
            ], 

            "js" => [
                "js/actividades.js", 
                "js/movimiento.js"
            ]
        ];

        $modalCrearTipoActividad = view('actividades/modalCrearTipoActividad');
        $modalMenuTiposActividades = view('actividades/modalMenuTiposActividades');
        $modalEditarTipoActividad = view('actividades/modalEditarTipoActividad');
        $modalEliminarTipoActividad = view('actividades/modalEliminarTipoActividad');

        $modalCrearActividad = view('actividades/modalCrearActividad', ["tipos_actividades" => $tipos_actividades]);

        $view = view('actividades/actividades', ["actividades" => $actividades, "numeroTiposActividad" => $numero_tipos_actividad, "usuario" => $usuario, "modalCrearTipoActividad" => $modalCrearTipoActividad, "modalMenuTiposActividades" => $modalMenuTiposActividades, "modalEditarTipoActividad" => $modalEditarTipoActividad, "modalEliminarTipoActividad" => $modalEliminarTipoActividad, "modalCrearActividad" => $modalCrearActividad]);
        return view('plantillas/normal', ["view" => $view, "assets" => $assets]);
    }


    public function crearTipoActividad() {
        
        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)){
            
            $nombre = trim($post["nombre"]);
            $crear_tipo_actividad = $actividadesModel->crearTipoActividad($nombre);
            $tipos_actividades = $actividadesModel->getTiposActividadesConTotal();
            $numero_tipos_actividad = count($actividadesModel->getTiposActividades());

            if($crear_tipo_actividad){

                echo json_encode([
                    "success" => true, 
                    "message" => "Categoría creada correctamente",
                    "numeroTiposActividad" => $numero_tipos_actividad,
                    "tiposActividad" => $tipos_actividades
                ]);
            }
        }
    }


    public function getMenuTiposActividades() {
        
        $actividadesModel = new actividadesModel();
        $tipos_actividades = $actividadesModel->getTiposActividadesConTotal();

        echo json_encode([
            "success" => true,
            "tiposActividad" => $tipos_actividades
        ]);
        return;
    }


    public function getTipoActividad() {

        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_tipos_actividades = intval($post["id_tipo_actividad"]);
            $tipo_actividad = $actividadesModel->getTipoActividad($id_tipos_actividades);

            if(!empty($tipo_actividad)){

                echo json_encode([
                    "success" => true,
                    "tipoActividad" => $tipo_actividad[0]
                ]);
                return;
            }
        }
    }


    public function editarTipoActividad() {

        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_tipo_actividad = intval($post["id_tipo_actividad"]);
            $nombre = trim($post["nombre"]);

            $editar_tipo_actividad = $actividadesModel->editarTipoActividad($id_tipo_actividad, $nombre);
            $tiposActividad  = $actividadesModel->getTiposActividadesConTotal();

            if($editar_tipo_actividad){

                echo json_encode([
                    "success" => true,
                    "message" => "Categoría editada correctamente",
                    "tiposActividad" => $tiposActividad
                ]);
                return;
            }

        }
    }

    public function eliminarTipoActividad() {

        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_tipo_actividad = intval($post["id_tipo_actividad"]);

            $eliminar_tipo_actividad = $actividadesModel->eliminarTipoActividad($id_tipo_actividad);
            $tiposActividad  = $actividadesModel->getTiposActividadesConTotal();

            if($eliminar_tipo_actividad){

                echo json_encode([
                    "success" => true,
                    "message" => "Categoría eliminada correctamente",
                    "tiposActividad" => $tiposActividad
                ]);
                return;
            }

        }
    }

}
