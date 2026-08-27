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
        $modalInscritosActividad = view('actividades/modalInscritosActividad');
        $modalEditarReservaAdmin = view('actividades/modalEditarReservaAdmin');
        $modalEliminarReservaActividad = view('actividades/modalEliminarReservaActividad');
        $modalInformacionUsuarioActividad = view('actividades/modalInformacionUsuarioActividad');

        $modalAnularHoras = view('reservas/modalAnularHoras');
        $modalEditarReservaactividadUsuario = view('actividades/modalEditarReservaActividadUsuario');
        $modalEliminarReservaActividadUsuario = view('actividades/modalEliminarReservaActividadUsuario');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras, 'modalEditarReservaactividadUsuario' => $modalEditarReservaactividadUsuario, "modalEliminarReservaActividadUsuario" => $modalEliminarReservaActividadUsuario]);
        $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

        $view = view('actividades/actividades', ["actividades" => $actividades, "numeroTiposActividad" => $numero_tipos_actividad, "usuario" => $usuario, "modalCrearTipoActividad" => $modalCrearTipoActividad, "modalMenuTiposActividades" => $modalMenuTiposActividades, "modalEditarTipoActividad" => $modalEditarTipoActividad, "modalEliminarTipoActividad" => $modalEliminarTipoActividad, "modalCrearActividad" => $modalCrearActividad, "modalEditarActividad" => $modalEditarActividad, "modalCancelarActividad" => $modalCancelarActividad, "modalInscritosActividad" => $modalInscritosActividad, 'modalEliminarReservaActividad' => $modalEliminarReservaActividad, "modalInformacionUsuarioActividad" => $modalInformacionUsuarioActividad, "modalEditarReservaAdmin" => $modalEditarReservaAdmin, "baseUrl" => base_url()]);
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

            $nombre_usuario = filter_var($post["nombre_usuario"], FILTER_VALIDATE_BOOLEAN);
            $apellidos_usuario = filter_var($post["apellidos_usuario"], FILTER_VALIDATE_BOOLEAN);
            $fecha_nacimiento_usuario = filter_var($post["fecha_nacimiento_usuario"], FILTER_VALIDATE_BOOLEAN);
            $edad_minima_usuario = $post["edad_minima_usuario"];
            $dni_usuario = filter_var($post["dni_usuario"], FILTER_VALIDATE_BOOLEAN);
            $email_usuario =filter_var($post["email_usuario"], FILTER_VALIDATE_BOOLEAN);
            $telefono_usuario = filter_var($post["telefono_usuario"], FILTER_VALIDATE_BOOLEAN);
            $direccion_usuario = filter_var($post["direccion_usuario"], FILTER_VALIDATE_BOOLEAN);

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
                "nombre"                    => $nombre, 
                "fecha_actividad"           => $fecha_actividad, 
                "hora_actividad"            => $hora_actividad, 
                "fecha_lanzamiento"         => $fecha_lanzamiento, 
                "fecha_limite"              => $fecha_limite, 
                "hora_limite"               => $hora_limite, 
                "descripcion"               => $descripcion, 
                "tiene_aforo"               => $tiene_aforo, 
                "aforo"                     => $aforo, 
                "tiene_precio"              => $tiene_precio, 
                "precio"                    => $precio, 
                "estado"                    => $estado, 
                "lugar"                     => $lugar, 
                "imagen"                    => ($imagenGuardada === "") ? "predefinida-actividad" : $imagenGuardada, 
                "duracion"                  => $duracion, 
                "tipo_actividad"            => $tipo_actividad, 
                "plazas_ocupadas"           => $plazas_ocupadas,
                "nombre_usuario"            => $nombre_usuario ? 1 : 0,
                "apellidos_usuario"         => $apellidos_usuario ? 1 : 0,
                "fecha_nacimiento_usuario"  => $fecha_nacimiento_usuario ? 1 : 0,
                "edad_minima_usuario"       => $edad_minima_usuario,
                "dni_usuario"               => $dni_usuario ? 1 : 0,
                "email_usuario"             => $email_usuario ? 1 : 0,
                "telefono_usuario"          => $telefono_usuario ? 1 : 0,
                "direccion_usuario"         => $direccion_usuario ? 1 : 0,     

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

            $nombre_usuario = filter_var($post["nombre_usuario"], FILTER_VALIDATE_BOOLEAN);
            $apellidos_usuario = filter_var($post["apellidos_usuario"], FILTER_VALIDATE_BOOLEAN);
            $fecha_nacimiento_usuario = filter_var($post["fecha_nacimiento_usuario"], FILTER_VALIDATE_BOOLEAN);
            $edad_minima_usuario = ($fecha_nacimiento_usuario && $post["edad_minima_usuario"] !== "null") ? intval($post["edad_minima_usuario"]) : null;
            $dni_usuario = filter_var($post["dni_usuario"], FILTER_VALIDATE_BOOLEAN);
            $email_usuario = filter_var($post["email_usuario"], FILTER_VALIDATE_BOOLEAN);
            $telefono_usuario = filter_var($post["telefono_usuario"], FILTER_VALIDATE_BOOLEAN);
            $direccion_usuario = filter_var($post["direccion_usuario"], FILTER_VALIDATE_BOOLEAN);

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
                    "nombre"                   => $nombre, 
                    "fecha_actividad"          => $fecha_actividad, 
                    "hora_actividad"           => $hora_actividad, 
                    "fecha_lanzamiento"        => $fecha_lanzamiento, 
                    "fecha_limite"             => $fecha_limite, 
                    "hora_limite"              => $hora_limite, 
                    "descripcion"              => $descripcion, 
                    "tiene_aforo"              => $tiene_aforo, 
                    "aforo"                    => $aforo, 
                    "tiene_precio"             => $tiene_precio, 
                    "precio"                   => $precio, 
                    "estado"                   => $estado, 
                    "lugar"                    => $lugar, 
                    "imagen"                   => $imagenGuardada, 
                    "duracion"                 => $duracion, 
                    "tipo_actividad"           => $tipo_actividad, 
                    "nombre_usuario"           => $nombre_usuario ? 1 : 0,
                    "apellidos_usuario"        => $apellidos_usuario ? 1 : 0,
                    "fecha_nacimiento_usuario" => $fecha_nacimiento_usuario ? 1 : 0,
                    "edad_minima_usuario"      => $edad_minima_usuario,
                    "dni_usuario"              => $dni_usuario ? 1 : 0,
                    "email_usuario"            => $email_usuario ? 1 : 0,
                    "telefono_usuario"         => $telefono_usuario ? 1 : 0,
                    "direccion_usuario"        => $direccion_usuario ? 1 : 0,

                ];
            }
            else {

                $data_actividades = [
                    "nombre"                   => $nombre, 
                    "fecha_actividad"          => $fecha_actividad, 
                    "hora_actividad"           => $hora_actividad, 
                    "fecha_lanzamiento"        => $fecha_lanzamiento, 
                    "fecha_limite"             => $fecha_limite, 
                    "hora_limite"              => $hora_limite, 
                    "descripcion"              => $descripcion, 
                    "tiene_aforo"              => $tiene_aforo, 
                    "aforo"                    => $aforo, 
                    "tiene_precio"             => $tiene_precio, 
                    "precio"                   => $precio, 
                    "estado"                   => $estado, 
                    "lugar"                    => $lugar, 
                    "duracion"                 => $duracion, 
                    "tipo_actividad"           => $tipo_actividad, 
                    "nombre_usuario"           => $nombre_usuario ? 1 : 0,
                    "apellidos_usuario"        => $apellidos_usuario ? 1 : 0,
                    "fecha_nacimiento_usuario" => $fecha_nacimiento_usuario ? 1 : 0,
                    "edad_minima_usuario"      => $edad_minima_usuario,
                    "dni_usuario"              => $dni_usuario ? 1 : 0,
                    "email_usuario"            => $email_usuario ? 1 : 0,
                    "telefono_usuario"         => $telefono_usuario ? 1 : 0,
                    "direccion_usuario"        => $direccion_usuario ? 1 : 0,

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
        $reservasModel = new reservasModel();
        $loginModel = new loginModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_actividad = intval($post["idActividad"]);
            $baja_actividades = $actividadesModel->bajaActividad($id_actividad);
            $actividad = $actividadesModel->getDataActividad($id_actividad)[0];

            $usuarios_reserva = $actividadesModel->getUsuariosActividad($id_actividad);
            
            foreach($usuarios_reserva as $usuario) {
                
                $pedido = $reservasModel->getPedidoFromId(intval($actividadesModel->getReservaById(intval($usuario["id_reserva_actividad"]))[0]['id_pedido']))[0];
                $datos_usuario = $usuario;
                $datos_reserva = $actividadesModel->getFullReservasFromPedido(intval($actividadesModel->getReservaById(intval($usuario["id_reserva_actividad"]))[0]['id_pedido']));
                
                $datos_pdf = [
                    "nombre_usuario" => $datos_usuario["nombre"], 
                    "email_usuario"  => $datos_usuario["email"], 
                    "telf_usuario"   => $datos_usuario["telf"],
                    "fecha_pedido"   => $pedido['fecha_pedido'], 
                    "precio_pedido"  => $pedido['precio_pedido'], 
                    "numero_pedido"  => $pedido['num_pedido'], 
                    "reservas"       => $datos_reserva
                ];

                $this->enviarEmailActividadCancelada($datos_pdf, 'danielruizdeveloper@gmail.com', intval($pedido["id_pedido"]), $datos_reserva);
            }

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
        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_actividad = intval($post["idActividad"]);
            $alta_actividades = $actividadesModel->altaActividad($id_actividad);
            $actividad = $actividadesModel->getDataActividad($id_actividad)[0];
            
            $usuarios_reserva = $actividadesModel->getUsuariosActividad($id_actividad);

            foreach($usuarios_reserva as $usuario) {
                
                $pedido = $reservasModel->getPedidoFromId(intval($actividadesModel->getReservaById(intval($usuario["id_reserva_actividad"]))[0]['id_pedido']))[0];
                $datos_usuario = $usuario;
                $datos_reserva = $actividadesModel->getFullReservasFromPedido(intval($actividadesModel->getReservaById(intval($usuario["id_reserva_actividad"]))[0]['id_pedido']));
                
                $datos_pdf = [
                    "nombre_usuario" => $datos_usuario["nombre"], 
                    "email_usuario"  => $datos_usuario["email"], 
                    "telf_usuario"   => $datos_usuario["telf"],
                    "fecha_pedido"   => $pedido['fecha_pedido'], 
                    "precio_pedido"  => $pedido['precio_pedido'], 
                    "numero_pedido"  => $pedido['num_pedido'], 
                    "reservas"       => $datos_reserva
                ];

                $this->enviarEmailActividadAlta($datos_pdf, 'danielruizdeveloper@gmail.com', intval($pedido["id_pedido"]), $datos_reserva);
            }

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
            $modalEditarReservaactividadUsuario = view('actividades/modalEditarReservaActividadUsuario');
               $modalEliminarReservaActividadUsuario = view('actividades/modalEliminarReservaActividadUsuario');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras, 'modalEditarReservaactividadUsuario' => $modalEditarReservaactividadUsuario, "modalEliminarReservaActividadUsuario" => $modalEliminarReservaActividadUsuario]);
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

            $personas = $post["personas"];

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

            if(((intval($datos_actividad["tiene_aforo"]) === 1) && (intval($datos_actividad["plazas_ocupadas"]) + $num_plazas) <= (intval($datos_actividad["aforo"]))) || (intval($datos_actividad["tiene_aforo"]) === 0)) {
                
                $pedido = $reservasModel->hacerPedido([
                    "id_usuario"    => $usuario, 
                    "fecha_pedido"  => $fechaString,
                    "precio_pedido" => $precio_reserva, 
                    "num_pedido"    => $num_pedido
                ]);

                foreach($personas as $persona) {
                    
                    $actividadesModel->hacerReservaActividad([
                        "id_usuario" => $usuario, 
                        "id_actividad" => $actividad, 
                        "id_pedido" => $pedido, 
                        "plazas_reserva" => $num_plazas, 
                        "fecha_reserva" => $fechaString, 
                        "pagada" => 0, 
                        "precio_reserva" => $precio_reserva, 
                        "nombre_usuario" => ($persona["nombre"] === "") ? null : $persona["nombre"],
                        "apellidos_usuario" => ($persona["apellidos"] === "") ? null : $persona["apellidos"],
                        "dni_usuario" => ($persona["dni"] === "") ? null : $persona["dni"],
                        "fecha_nacimiento_usuario" => ($persona["fechaNacimiento"] === "") ? null : $persona["fechaNacimiento"],
                        "edad_minima_usuario" => ($persona["edadMinima"] === "") ? null : $persona["edadMinima"],
                        "email_usuario" => ($persona["email"] === "") ? null : $persona["email"],
                        "telefono_usuario" => ($persona["telefono"] === "") ? null : $persona["telefono"],
                        "direccion_usuario" => ($persona["direccion"] === "") ? null : $persona["direccion"],
                    ]);
                }

                $actividadesModel->actualizarPlazasActividad($actividad, $num_plazas, $datos_actividad["plazas_ocupadas"]);

                $actividad_actualizada = $actividadesModel->getDataActividad($actividad);

                echo json_encode([
                    "success" => true,
                    "message" => "La reserva se ha realizado correctamente",
                    "actividad" => $actividad_actualizada[0],
                    "pedido" => $pedido
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

    public function verInscritos() {

        $loginModel = new loginModel();
        $actividadesModel = new actividadesModel();
        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)) {

            $actividad = intval($post["actividad"]);
            $inscritos_actividad = $actividadesModel->getInscritosActividad($actividad);
            $data_actividad = $actividadesModel->getDataActividad($actividad)[0];

            if($inscritos_actividad) {
                
                echo json_encode([
                    "success" => true, 
                    "inscritosActividad" => $inscritos_actividad, 
                    "actividad" => $data_actividad
                ]);

                return;
            }
        }
    }

    public function pagarActividad() {

        $loginModel = new loginModel();
        $actividadesModel = new actividadesModel();
        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $reserva = intval($post["reserva"]);
            $actualizar_reserva = $actividadesModel->setPagada($reserva, ["pagada" => 1]);
            $reserva_actualizada = $actividadesModel->getReservaById($reserva)[0];

            if($actualizar_reserva){
                echo json_encode([
                    "success" => true, 
                    "reserva" => $reserva_actualizada
                ]); 
                return;
            }
        }
    }

    public function deshacerPagoActividad() {

        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $reserva = intval($post["reserva"]);
            $actualizar_reserva = $actividadesModel->setPagada($reserva, ["pagada" => 0]);
            $reserva_actualizada = $actividadesModel->getReservaById($reserva)[0];

            if($actualizar_reserva){
                echo json_encode([
                    "success" => true, 
                    "reserva" => $reserva_actualizada
                ]); 
                return;
            }
        }
    }


    public function getDataReserva() {

        $actividadesModel = new actividadesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $reserva = intval($post["reserva"]);
            $datos_reserva = $actividadesModel->getReservaById($reserva)[0];
            $actividad = $actividadesModel->getDataActividad(intval($datos_reserva["id_actividad"]))[0];

            if($datos_reserva){
                echo json_encode([
                    "success"   => true, 
                    "reserva"   => $datos_reserva, 
                    "actividad" => $actividad
                ]);
                return;
            }
        }
    }

    public function eliminarReservaActividad(){

        $actividadesModel = new actividadesModel();
        $loginModel = new loginModel();
        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $reserva = intval($post["reserva"]);
            $plazas = intval($actividadesModel->getReservaById($reserva)[0]['plazas_reserva']);
            $actividad = intval($actividadesModel->getReservaById($reserva)[0]['id_actividad']);
            $plazas_ocupadas = intval($actividadesModel->getDataActividad($actividad)[0]['plazas_ocupadas']);
            $pedido = $reservasModel->getPedidoFromId(intval($actividadesModel->getReservaById($reserva)[0]['id_pedido']))[0];
            $datos_usuario = $loginModel->buscaUsuarioPorId(intval($actividadesModel->getReservaById($reserva)[0]['id_usuario']));
            $datos_reserva = $actividadesModel->getFullReservasFromPedido(intval($actividadesModel->getReservaById($reserva)[0]['id_pedido']));

            $borrar_reserva = $actividadesModel->eliminarReservaActividad($reserva, $plazas, $actividad, $plazas_ocupadas);
            $reservasModel->anularPedido(intval($pedido["id_pedido"]));
            $data_actividad = $actividadesModel->getDataActividad($actividad)[0];


            $datos_pdf = [
                "nombre_usuario" => $datos_usuario["nombre"], 
                "email_usuario"  => $datos_usuario["email"], 
                "telf_usuario"   => $datos_usuario["telf"],
                "fecha_pedido"   => $pedido['fecha_pedido'], 
                "precio_pedido"  => $pedido['precio_pedido'], 
                "numero_pedido"  => $pedido['num_pedido'], 
                "reservas"       => $datos_reserva
            ];

            $this->enviarEmailAnularActividad($datos_pdf, 'danielruizdeveloper@gmail.com', intval($pedido["id_pedido"]), $datos_reserva);
            $this->enviarEmailAnularActividad2($datos_pdf, 'danielruizdeveloper@gmail.com', intval($pedido["id_pedido"]), $datos_reserva);

            if($borrar_reserva){
                echo json_encode([
                    "success" => true, 
                    "mensaje" => "La reserva de la actividad se ha eliminado correctamente", 
                    "actividad" => $actividad,
                    "data_actividad" => $data_actividad
                ]);
                return;
            }
        }
    }

    public function editarReservaActividad(){
        $actividadesModel = new actividadesModel();
        $loginModel = new loginModel();
        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        // {personas: personas, plazas: personas.length, pedido: parseInt($('#modalEditarReservaAdmin').data('pedido')), actividad: parseInt($('#modalEditarReservaAdmin').data('actividad'))}

        if(!empty($post)){
            $personas = $post["personas"];
            $plazas = intval($post["plazas"]);
            $pedido = intval($post["pedido"]);
            $actividad = intval($post["actividad"]);
            $usuario = $actividadesModel->getIdUsuarioPorActividadYPedido($actividad, $pedido);
            $fecha = new DateTime(); // fecha/hora actual como objeto
            $fechaString = $fecha->format('Y-m-d H:i:s');

            $datos_actividad = $actividadesModel->getDataActividad($actividad)[0];

            $precio_reserva = (intval($datos_actividad["tiene_precio"]) === 1 ? $plazas * floatval($datos_actividad['precio']) : 0);

            $fecha_hora_actual = date('Y-m-d H:i:s');
            $dt = new DateTime($fecha_hora_actual);

            $anio    = $dt->format('Y');
            $mes     = $dt->format('m');
            $dia     = $dt->format('d');
            $hora    = $dt->format('H');
            $minuto  = $dt->format('i');
            $segundo = $dt->format('s');

            $actividadesModel->borrarReservasPorActividadYPedido($actividad, $pedido);
            
            if(((intval($datos_actividad["tiene_aforo"]) === 1) && (intval($datos_actividad["plazas_ocupadas"]) + $plazas) <= (intval($datos_actividad["aforo"]))) || (intval($datos_actividad["tiene_aforo"]) === 0)) {
                
                foreach($personas as $persona) {
                    
                    $actividadesModel->hacerReservaActividad([
                        "id_usuario" => $usuario, 
                        "id_actividad" => $actividad, 
                        "id_pedido" => $pedido, 
                        "plazas_reserva" => $plazas, 
                        "fecha_reserva" => $fechaString, 
                        "pagada" => 0, 
                        "precio_reserva" => $precio_reserva, 
                        "nombre_usuario" => ($persona["nombre"] === "") ? null : $persona["nombre"],
                        "apellidos_usuario" => ($persona["apellidos"] === "") ? null : $persona["apellidos"],
                        "dni_usuario" => ($persona["dni"] === "") ? null : $persona["dni"],
                        "fecha_nacimiento_usuario" => ($persona["fechaNacimiento"] === "") ? null : $persona["fechaNacimiento"],
                        "edad_minima_usuario" => ($persona["edadMinima"] === "") ? null : $persona["edadMinima"],
                        "email_usuario" => ($persona["email"] === "") ? null : $persona["email"],
                        "telefono_usuario" => ($persona["telefono"] === "") ? null : $persona["telefono"],
                        "direccion_usuario" => ($persona["direccion"] === "") ? null : $persona["direccion"],
                    ]);
                }

                $actividadesModel->actualizarPlazasActividad($actividad, $plazas, $datos_actividad["plazas_ocupadas"]);
                $actividad_actualizada = $actividadesModel->getDataActividad($actividad);

                echo json_encode([
                    "success" => true,
                    "message" => "La reserva se ha realizado correctamente",
                    "actividad" => $actividad_actualizada[0],
                    "pedido" => $pedido
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

    public function editarReservaActividad2(){

        $actividadesModel = new actividadesModel();
        $loginModel = new loginModel();
        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)){
          
            $reserva = intval($post["reserva"]);
            $plazas = intval($post["plazas"]);

            $id_actividad = intval($actividadesModel->getReservaById($reserva)[0]['id_actividad']);
            
            $rol_usuario = intval($loginModel->buscaUsuarioPorId(intval($actividadesModel->getReservaById($reserva)[0]['id_usuario']))["id_rol"]);
            $numero_pedido = $reservasModel->getPedidoFromId(intval($actividadesModel->getReservaById($reserva)[0]['id_pedido']))[0]["num_pedido"];
            $plazas_ocupadas = intval($actividadesModel->getDataActividad($id_actividad)[0]['plazas_ocupadas']);
            $precio_actividad = (intval($actividadesModel->getDataActividad($id_actividad)[0]['tiene_precio']) === 1) ? floatval($actividadesModel->getDataActividad($id_actividad)[0]['precio']) : 0;

            if($actividadesModel->hayAforoDisponible($id_actividad, $plazas)) {

                 // Aquí función editar plazas de la reserva + plazas ocupadas de la actividad (tablas reservas_actividades y actividades)
                $plazas_reservadas = intval($actividadesModel->getReservaById($reserva)[0]['plazas_reserva']);
                $editar_reserva = $actividadesModel->editarReserva($reserva, $plazas, $plazas_ocupadas, $plazas_reservadas, $id_actividad, $precio_actividad);

                $reserva_datos = $actividadesModel->getReservaById($reserva)[0];

                $editar_pedido = $actividadesModel->editarPedido(intval($reserva_datos["id_pedido"]), floatval($reserva_datos["precio_reserva"]));

                $actividad = $actividadesModel->getDataActividad($id_actividad)[0];
                $data_reserva = $actividadesModel->getReservaById($reserva)[0];
                
                $this->enviarEmailEditarReserva($rol_usuario, 'danielruizdeveloper@gmail.com', $numero_pedido);

                if($editar_reserva) {
                    
                    echo json_encode([
                        "success" => true, 
                        "actividad" => $actividad, 
                        "reserva" => $data_reserva,
                    ]);

                    return;
                }
            }
            else {
                 echo json_encode([
                        "success" => false, 
                        "mensaje" => 'No hay plazas suficientes', 
                    ]);

                    return;
            }


        }
    }


    public function misReservasActividades(){

        $actividadesModel = new actividadesModel();
        $session = session();

        $id_usuario = intval($session->get('usuario')['id_usuario']);
        $reservas_completas = $actividadesModel->getReservasCompletas($id_usuario);

        echo json_encode([
            'success' => true, 
            'reservas' => $reservas_completas
        ]);

        return;
    }


    public function descargarTicketActividad(int $id_pedido) {
        $actividadesModel = new actividadesModel();
        $reservasModel = new reservasModel();
        $loginModel    = new loginModel();
        
        // Obtener datos del pedido
        $pedido = $reservasModel->getPedidoFromId($id_pedido)[0];
        
        if(!$pedido) {
            return redirect()->back()->with('error', 'Pedido no encontrado');
        }
        
        $datos_usuario = $loginModel->buscaUsuarioPorId($pedido['id_usuario']);
        $datos_reserva = $actividadesModel->getFullReservasFromPedido(intval($id_pedido));

        $datos_pdf = [
            "nombre_usuario" => $datos_usuario["nombre"], 
            "email_usuario"  => $datos_usuario["email"], 
            "telf_usuario"   => $datos_usuario["telf"],
            "fecha_pedido"   => $pedido['fecha_pedido'], 
            "precio_pedido"  => $pedido['precio_pedido'], 
            "numero_pedido"  => $pedido['num_pedido'], 
            "reservas"       => $datos_reserva
        ];

        $html = view('actividades/pdf_template_reserva', [
            "datos" => $datos_pdf, 
            "baseUrl" => base_url()
        ]);
        
        $pdfFilename = 'reserva-' . $pedido['num_pedido'] . '.pdf';
        
        // Asegurar que el directorio existe
        $uploadDir = rtrim(WRITEPATH, '/\\') . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        // Generar PDF
        $pdf = new Pdf();
        $pdf->writeHTML($html);
        
        // Guardar temporalmente con ruta normalizada
        $tempPath = $uploadDir . $pdfFilename;
        $pdf->output($tempPath, 'F');
        
        // VERIFICAR que el archivo se creó correctamente
        if (!file_exists($tempPath)) {
            log_message('error', '❌ No se pudo crear el PDF en: ' . $tempPath);
            return redirect()->back()->with('error', 'Error al generar el PDF');
        }
        
        // Enviar PDF al navegador
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="' . $pdfFilename . '"');
        header('Content-Length: ' . filesize($tempPath));
        readfile($tempPath);
        
        // Procesar email en segundo plano
        if (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
            $this->enviarEmailReservaActividad($datos_pdf, 'danielruizdeveloper@gmail.com', $tempPath, $pdfFilename, $id_pedido, $datos_reserva);
            $this->enviarEmailReservaActividad2($datos_pdf, 'danielruizdeveloper@gmail.com', $tempPath, $pdfFilename, $id_pedido, $datos_reserva);
        } else {
            $this->enviarEmailReservaActividad($datos_pdf, 'danielruizdeveloper@gmail.com', $tempPath, $pdfFilename, $id_pedido, $datos_reserva);
            $this->enviarEmailReservaActividad2($datos_pdf, 'danielruizdeveloper@gmail.com', $tempPath, $pdfFilename, $id_pedido, $datos_reserva);
        }
        
        exit;
    }

    public function obtenerPersonas() {
        $actividadesModel = new actividadesModel();
        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $pedido = intval($post["pedido"]);
            $actividad = intval($post["actividad"]);

            $total_reservas = $actividadesModel->getReservaByPedido($pedido);
            $data_actividad = $actividadesModel->getDataActividad($actividad);
            
            echo json_encode([
                'success' => true, 
                'reservas' => $total_reservas, 
                'actividad' => $data_actividad, 
                'pedido' => $pedido
            ]);

            return;

        }
    }

    private function enviarEmailReservaActividad($datos_pdf, $email, $tempPath, $pdfFilename, $id_pedido, $datos_reserva){
        try {
            // Leer el PDF
            $pdfContent = file_get_contents($tempPath);
            $pdfBase64 = base64_encode($pdfContent);
            
            // Cargar plantilla de email
            $htmlContent = view('plantillas/emailReservaActividad', [
                'datos_reserva' => $datos_pdf
            ]);
            
            // API Key de Resend
            $apiKey = env('RESEND_API_KEY');
            
            $curlData = [
                'from' => 'Ayuntamiento de Fuente de Piedra <noreply@resend.dev>',
                'to' => [$email],
                'subject' => '✅ Confirmación de Reserva #' . $datos_pdf['numero_pedido'],
                'html' => $htmlContent,
                'attachments' => [
                    [
                        'filename' => $pdfFilename,
                        'content' => $pdfBase64,
                    ]
                ]
            ];

            $ch = curl_init('https://api.resend.com/emails');
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            $response  = curl_exec($ch);
            $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200 || $httpCode === 202) {
                log_message('info', '✅ Email enviado a: ' . $email);
            } else {
                log_message('error', '❌ Error enviando email: ' . $response);
            }
            
        } catch (\Exception $e) {
            log_message('error', '❌ Error email: ' . $e->getMessage());
        }
        
    }

    private function enviarEmailReservaActividad2($datos_pdf, $email, $tempPath, $pdfFilename, $id_pedido, $datos_reserva){
        try {
            // Leer el PDF
            $pdfContent = file_get_contents($tempPath);
            $pdfBase64 = base64_encode($pdfContent);
            
            // Cargar plantilla de email
            $htmlContent = view('plantillas/emailReservaGestorActividad', [
                'datos_reserva' => $datos_pdf
            ]);
            
            // API Key de Resend
            $apiKey = env('RESEND_API_KEY');
            
            $curlData = [
                'from' => 'Ayuntamiento de Fuente de Piedra <noreply@resend.dev>',
                'to' => [$email],
                'subject' => '✅ Confirmación de Reserva #' . $datos_pdf['numero_pedido'],
                'html' => $htmlContent,
                'attachments' => [
                    [
                        'filename' => $pdfFilename,
                        'content' => $pdfBase64,
                    ]
                ]
            ];

            $ch = curl_init('https://api.resend.com/emails');
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            $response  = curl_exec($ch);
            $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200 || $httpCode === 202) {
                log_message('info', '✅ Email enviado a: ' . $email);
            } else {
                log_message('error', '❌ Error enviando email: ' . $response);
            }
            
        } catch (\Exception $e) {
            log_message('error', '❌ Error email: ' . $e->getMessage());
        }
        
    }

    private function enviarEmailAnularActividad($datos_pdf, $email, $id_pedido, $datos_reserva) {
        try {        
            // Cargar plantilla de email
            $htmlContent = view('plantillas/emailAnularReservaUsuarioActividad', [
                'datos_reserva' => $datos_pdf
            ]);
            
            // API Key de Resend
            $apiKey = env('RESEND_API_KEY');
            
            $curlData = [
                'from' => 'Ayuntamiento de Fuente de Piedra <noreply@resend.dev>',
                'to' => [$email],
                'subject' => '✅ RESERVA ANULADA #' . $datos_pdf['numero_pedido'],
                'html' => $htmlContent
            ];

            $ch = curl_init('https://api.resend.com/emails');
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            $response  = curl_exec($ch);
            $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200 || $httpCode === 202) {
                log_message('info', '✅ Email enviado a: ' . $email);
            } else {
                log_message('error', '❌ Error enviando email: ' . $response);
            }
            
        } catch (\Exception $e) {
            log_message('error', '❌ Error email: ' . $e->getMessage());
        }
        
        
        
    }

    private function enviarEmailAnularActividad2($datos_pdf, $email, $id_pedido, $datos_reserva) {
        try {        
            // Cargar plantilla de email
            $htmlContent = view('plantillas/emailAnularReservaGestorActividad', [
                'datos_reserva' => $datos_pdf
            ]);
            
            // API Key de Resend
            $apiKey = env('RESEND_API_KEY');
            
            $curlData = [
                'from' => 'Ayuntamiento de Fuente de Piedra <noreply@resend.dev>',
                'to' => [$email],
                'subject' => '✅ RESERVA ANULADA #' . $datos_pdf['numero_pedido'],
                'html' => $htmlContent
            ];

            $ch = curl_init('https://api.resend.com/emails');
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            $response  = curl_exec($ch);
            $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200 || $httpCode === 202) {
                log_message('info', '✅ Email enviado a: ' . $email);
            } else {
                log_message('error', '❌ Error enviando email: ' . $response);
            }
            
        } catch (\Exception $e) {
            log_message('error', '❌ Error email: ' . $e->getMessage());
        }
        
        
        
    }

    private function enviarEmailEditarReserva(int $rol, string $email, string $numero_pedido) {
        try {        
            // Cargar plantilla de email
            $htmlContent = view('plantillas/emailEditarReservaActividad', [
                'rol' => $rol
            ]);
            
            // API Key de Resend
            $apiKey = env('RESEND_API_KEY');
            
            $curlData = [
                'from' => 'Ayuntamiento de Fuente de Piedra <noreply@resend.dev>',
                'to' => [$email],
                'subject' => '✅ CAMBIO EN LA RESERVA #' . $numero_pedido,
                'html' => $htmlContent
            ];

            $ch = curl_init('https://api.resend.com/emails');
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            $response  = curl_exec($ch);
            $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200 || $httpCode === 202) {
                log_message('info', '✅ Email enviado a: ' . $email);
            } else {
                log_message('error', '❌ Error enviando email: ' . $response);
            }
            
        } catch (\Exception $e) {
            log_message('error', '❌ Error email: ' . $e->getMessage());
        }
        
        
        
    }

    private function enviarEmailActividadCancelada($datos_pdf, $email, $id_pedido, $datos_reserva) {
        try {        
            // Cargar plantilla de email
            $htmlContent = view('plantillas/emailActividadCancelada', [
                'datos_reserva' => $datos_pdf
            ]);
            
            // API Key de Resend
            $apiKey = env('RESEND_API_KEY');
            
            $curlData = [
                'from' => 'Ayuntamiento de Fuente de Piedra <noreply@resend.dev>',
                'to' => [$email],
                'subject' => '‼️ ACTIVIDAD CANCELADA ' . $datos_reserva[0]['nombre'],
                'html' => $htmlContent
            ];

            $ch = curl_init('https://api.resend.com/emails');
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            $response  = curl_exec($ch);
            $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200 || $httpCode === 202) {
                log_message('info', '✅ Email enviado a: ' . $email);
            } else {
                log_message('error', '❌ Error enviando email: ' . $response);
            }
            
        } catch (\Exception $e) {
            log_message('error', '❌ Error email: ' . $e->getMessage());
        }
        
        
        
    }

    private function enviarEmailActividadAlta($datos_pdf, $email, $id_pedido, $datos_reserva) {
        try {        
            // Cargar plantilla de email
            $htmlContent = view('plantillas/emailActividadAlta', [
                'datos_reserva' => $datos_pdf
            ]);
            
            // API Key de Resend
            $apiKey = env('RESEND_API_KEY');
            
            $curlData = [
                'from' => 'Ayuntamiento de Fuente de Piedra <noreply@resend.dev>',
                'to' => [$email],
                'subject' => '‼️ ACTIVIDAD DE ALTA ' . $datos_reserva[0]['nombre'],
                'html' => $htmlContent
            ];

            $ch = curl_init('https://api.resend.com/emails');
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            $response  = curl_exec($ch);
            $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200 || $httpCode === 202) {
                log_message('info', '✅ Email enviado a: ' . $email);
            } else {
                log_message('error', '❌ Error enviando email: ' . $response);
            }
            
        } catch (\Exception $e) {
            log_message('error', '❌ Error email: ' . $e->getMessage());
        }
        
        
        
    }
}
