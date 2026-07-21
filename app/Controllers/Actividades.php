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
        $modalEditarActividad = view('actividades/modalEditarActividad');
        $modalCancelarActividad = view('actividades/modalCancelarActividad');

        $modalAnularHoras = view('reservas/modalAnularHoras');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras]);
        $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

        $view = view('actividades/actividades', ["actividades" => $actividades, "numeroTiposActividad" => $numero_tipos_actividad, "usuario" => $usuario, "modalCrearTipoActividad" => $modalCrearTipoActividad, "modalMenuTiposActividades" => $modalMenuTiposActividades, "modalEditarTipoActividad" => $modalEditarTipoActividad, "modalEliminarTipoActividad" => $modalEliminarTipoActividad, "modalCrearActividad" => $modalCrearActividad, "modalEditarActividad" => $modalEditarActividad, "modalCancelarActividad" => $modalCancelarActividad, "baseUrl" => base_url()]);
        return view('plantillas/normal', ["view" => $view, "assets" => $assets, "modalMisReservas" => $modalMisReservas, "modalInformacionPersonal" => $modalInformacionPersonal]);
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


    public function crearActividad() {

        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $nombre = $post["nombre"];
            $tipo_actividad = intval($post["categoria"]);
            $descripcion = $post["descripcion"];
            $fecha_actividad = $post["fecha"];
            $hora_actividad = $post["hora"];
            $fecha_lanzamiento = date('Y-m-d H:i:s');
            $fecha_limite = $post["fechaLimite"]; 
            $hora_limite = $post["horaLimite"];
            $tiene_aforo = filter_var($post["tieneAforo"], FILTER_VALIDATE_BOOLEAN);
            $aforo = ($tiene_aforo) ? intval($post["aforo"]) : null;
            $tiene_precio = filter_var($post["tienePrecio"], FILTER_VALIDATE_BOOLEAN);
            $precio = ($tiene_precio) ? floatval($post["precio"]) : null;
            $estado = 'activa';
            $lugar = $post["lugar"];
            $duracion = $post["duracion"];
            $plazas_ocupadas = 0;

            $rutaDestino = FCPATH . 'images/';
            if (!is_dir($rutaDestino)) {
                mkdir($rutaDestino, 0755, true);
            }
            
            $imagenGuardada = "";

            if(isset($_FILES['imagen'])) {
                
                $imagen = $this->request->getFile('imagen');

                if ($imagen !== null && $imagen->isValid() && !$imagen->hasMoved()) {
                    $nombreArchivo = basename($imagen->getClientName());
                    $rutaFinal = $rutaDestino . $nombreArchivo;

                    // Eliminar si ya existe para sobrescribir
                    if (file_exists($rutaFinal)) {
                        unlink($rutaFinal);
                    }

                    // Mover imagen al destino
                    $imagen->move($rutaDestino, $nombreArchivo);

                    // Guardar ruta relativa para la base de datos
                    $imagenGuardada = $nombreArchivo;
                }
            }

            $data_actividades = [
                "nombre"            => $nombre, 
                "fecha_actividad"   => $fecha_actividad, 
                "hora_actividad"    => $hora_actividad, 
                "fecha_lanzamiento" => $fecha_lanzamiento, 
                "fecha_limite"      => $fecha_limite, 
                "hora_limite"       => $hora_limite, 
                "descripcion"       => $descripcion, 
                "tiene_aforo"       => $tiene_aforo, 
                "aforo"             => $aforo, 
                "tiene_precio"      => $tiene_precio, 
                "precio"            => $precio, 
                "estado"            => $estado, 
                "lugar"             => $lugar, 
                "imagen"            => ($imagenGuardada === "") ? "predefinida-actividad" : $imagenGuardada, 
                "duracion"          => $duracion, 
                "tipo_actividad"    => $tipo_actividad, 
                "plazas_ocupadas"   => $plazas_ocupadas        

            ];

            $crear_actividad = $actividadesModel->crearActividad($data_actividades);
            $actividades = $actividadesModel->getActividades();

            if($crear_actividad) {
                
                echo json_encode([
                    "success" => true,
                    "message" => "La actividad se ha creado correctamente",
                    "actividades" => $actividades
                ]);
                return;
            }
        }
    }

    public function getDataActividad() {

        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)) {

            $id_actividad = intval($post["idActividad"]);
            $actividad = $actividadesModel->getDataActividad($id_actividad)[0];

            $tipos_actividades = $actividadesModel->getTiposActividadesConTotal();

            if($actividad){
                echo json_encode([
                    "success" => true,
                    "message" => "La actividad se ha creado correctamente",
                    "actividad" => $actividad,
                    "tiposActividades" => $tipos_actividades
                ]);
                return;
            }
        }
    }

    public function editarActividad(){

        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_actividad = intval($post["idActividad"]);
            $nombre = $post["nombre"];
            $tipo_actividad = intval($post["categoria"]);
            $descripcion = $post["descripcion"];
            $fecha_actividad = $post["fecha"];
            $hora_actividad = $post["hora"];
            $fecha_lanzamiento = date('Y-m-d H:i:s');
            $fecha_limite = $post["fechaLimite"]; 
            $hora_limite = $post["horaLimite"];
            $tiene_aforo = filter_var($post["tieneAforo"], FILTER_VALIDATE_BOOLEAN);
            $aforo = ($tiene_aforo) ? intval($post["aforo"]) : null;
            $tiene_precio = filter_var($post["tienePrecio"], FILTER_VALIDATE_BOOLEAN);
            $precio = ($tiene_precio) ? floatval($post["precio"]) : null;
            $estado = $post['estado'];
            $lugar = $post["lugar"];
            $duracion = $post["duracion"];

            $rutaDestino = FCPATH . 'images/';
            if (!is_dir($rutaDestino)) {
                mkdir($rutaDestino, 0755, true);
            }
            
            $imagenGuardada = "";

            if(isset($_FILES['imagen'])) {
                
                $imagen = $this->request->getFile('imagen');

                if ($imagen !== null && $imagen->isValid() && !$imagen->hasMoved()) {
                    $nombreArchivo = basename($imagen->getClientName());
                    $rutaFinal = $rutaDestino . $nombreArchivo;

                    // Eliminar si ya existe para sobrescribir
                    if (file_exists($rutaFinal)) {
                        unlink($rutaFinal);
                    }

                    // Mover imagen al destino
                    $imagen->move($rutaDestino, $nombreArchivo);

                    // Guardar ruta relativa para la base de datos
                    $imagenGuardada = $nombreArchivo;
                }
            }


            if($imagenGuardada !== "") {
                
                $data_actividades = [
                    "nombre"            => $nombre, 
                    "fecha_actividad"   => $fecha_actividad, 
                    "hora_actividad"    => $hora_actividad, 
                    "fecha_lanzamiento" => $fecha_lanzamiento, 
                    "fecha_limite"      => $fecha_limite, 
                    "hora_limite"       => $hora_limite, 
                    "descripcion"       => $descripcion, 
                    "tiene_aforo"       => $tiene_aforo, 
                    "aforo"             => $aforo, 
                    "tiene_precio"      => $tiene_precio, 
                    "precio"            => $precio, 
                    "estado"            => $estado, 
                    "lugar"             => $lugar, 
                    "imagen"            => $imagenGuardada, 
                    "duracion"          => $duracion, 
                    "tipo_actividad"    => $tipo_actividad, 
                          

                ];
            }
            else {

                $data_actividades = [
                    "nombre"            => $nombre, 
                    "fecha_actividad"   => $fecha_actividad, 
                    "hora_actividad"    => $hora_actividad, 
                    "fecha_lanzamiento" => $fecha_lanzamiento, 
                    "fecha_limite"      => $fecha_limite, 
                    "hora_limite"       => $hora_limite, 
                    "descripcion"       => $descripcion, 
                    "tiene_aforo"       => $tiene_aforo, 
                    "aforo"             => $aforo, 
                    "tiene_precio"      => $tiene_precio, 
                    "precio"            => $precio, 
                    "estado"            => $estado, 
                    "lugar"             => $lugar, 
                    "duracion"          => $duracion, 
                    "tipo_actividad"    => $tipo_actividad, 
                           

                ];
            }

            $editar_actividad = $actividadesModel->editarActividad($id_actividad, $data_actividades);
            $actividad = $actividadesModel->getDataActividad($id_actividad)[0];

            if($editar_actividad) {
                
                echo json_encode([
                    "success" => true,
                    "message" => "La actividad se ha editado correctamente",
                    "actividad" => $actividad
                ]);
                return;
            }
            
        }
    }

    public function darBajaActividad(){

        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_actividad = intval($post["idActividad"]);
            $baja_actividades = $actividadesModel->bajaActividad($id_actividad);
            $actividad = $actividadesModel->getDataActividad($id_actividad)[0];

            if($baja_actividades) {

                 
                echo json_encode([
                    "success" => true,
                    "message" => "La actividad se ha dado de baja correctamente",
                    "actividad" => $actividad
                ]);
                return;
            }
        }
    }

    public function darAltaActividad(){

        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_actividad = intval($post["idActividad"]);
            $alta_actividades = $actividadesModel->altaActividad($id_actividad);
            $actividad = $actividadesModel->getDataActividad($id_actividad)[0];

            if($alta_actividades) {

                 
                echo json_encode([
                    "success" => true,
                    "message" => "La actividad se ha dado de baja correctamente",
                    "actividad" => $actividad
                ]);
                return;
            }
        }
    }


    public function actividad(?int $actividad = null) {

        $loginModel = new loginModel();
        $actividadesModel = new actividadesModel();

        if($actividad !== null) {

            $id_actividad = intval($actividad);
            $actividad = $actividadesModel->getDataActividad($id_actividad)[0];

            $usuario = $loginModel->buscaUsuarioPorId(session()->get('usuario')["id_usuario"]);
            $usuarios = $loginModel->getUsuarios();

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

            $modalAnularHoras = view('reservas/modalAnularHoras');
            $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras]);
            $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

            $view = view('actividades/actividad', ["actividad" => $actividad, "usuario" => $usuario, 'usuarios'=>$usuarios, "baseUrl" => base_url()]);
            return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets, "modalMisReservas" => $modalMisReservas, "modalInformacionPersonal" => $modalInformacionPersonal]);
        }
    }


    public function reservaActividad() {

        $loginModel = new loginModel();
        $actividadesModel = new actividadesModel();
        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)) {

            $fecha = new DateTime(); // fecha/hora actual como objeto
            $fechaString = $fecha->format('Y-m-d H:i:s');

            $usuario = intval($post["usuario"]);
            $actividad = intval($post["actividad"]);
            $num_plazas = intval($post["plazas"]);

            $datos_actividad = $actividadesModel->getDataActividad($actividad)[0];

            $precio_reserva = (intval($datos_actividad["tiene_precio"]) === 1 ? $num_plazas*floatval($datos_actividad['precio']) : 0);

            $fecha_hora_actual = date('Y-m-d H:i:s');
            $dt = new DateTime($fecha_hora_actual);

            $anio    = $dt->format('Y');
            $mes     = $dt->format('m');
            $dia     = $dt->format('d');
            $hora    = $dt->format('H');
            $minuto  = $dt->format('i');
            $segundo = $dt->format('s');

            $contador_pedido = count($reservasModel->pedidosFromDate($fecha_hora_actual)) + 1;
            $contador_formateado = str_pad($contador_pedido, 3, '0', STR_PAD_LEFT);
            $num_pedido = $anio.$mes.$dia."-".$hora.$minuto.$segundo."-".$contador_formateado;

            if((intval($datos_actividad["tiene_aforo"]) === 1) && (intval($datos_actividad["plazas_ocupadas"]) + $num_plazas) <= (intval($datos_actividad["aforo"])) ) {
                
                $pedido = $reservasModel->hacerPedido([
                    "id_usuario"    => $usuario, 
                    "fecha_pedido"  => $fechaString,
                    "precio_pedido" => $precio_reserva, 
                    "num_pedido"    => $num_pedido
                ]);

                $actividadesModel->hacerReservaActividad([
                    "id_usuario" => $usuario, 
                    "id_actividad" => $actividad, 
                    "id_pedido" => $pedido, 
                    "plazas_reserva" => $num_plazas, 
                    "fecha_reserva" => $fechaString, 
                    "pagada" => 0, 
                    "precio_reserva" => $precio_reserva, 
                    "confirmada" => 0
                ], intval($datos_actividad["plazas_ocupadas"]));

                $actividad_actualizada = $actividadesModel->getDataActividad($actividad);

                echo json_encode([
                    "success" => true,
                    "message" => "La reserva se ha realizado correctamente",
                    "actividad" => $actividad_actualizada[0]
                ]);

                return;
            }
            else {

                $actividad_actualizada = $actividadesModel->getDataActividad($actividad);

                echo json_encode([
                    "success" => false,
                    "message" => "El numero de plazas es superior al que se puede seleccionar", 
                    "actividad" => $actividad_actualizada[0]
                ]);

                return;
            }

            

        }
    }
}
