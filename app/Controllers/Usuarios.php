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

class Usuarios extends BaseController
{
    public function gestorUsuarios() {

        $usuariosModel = new usuariosModel();

        $usuarios = $usuariosModel->getUsuarios();

        $assets = [
            "css" => [
                'css/instalaciones.css',
                'css/usuarios.css', 
                'css/style.css', 
                'css/responsive.css'
            ], 

            "js" => [
                "js/usuarios.js", 
                "js/movimiento.js"
            ]
        ];
        
        $modalBorrarUsuario = view('usuarios/modalBorrarUsuario');
        $modalReservasUsuario = view('usuarios/modalReservasUsuario');
        $modalInfoUsuario = view('usuarios/modalInfoUsuario');

        $view = view('usuarios/gestorUsuarios', ["usuarios" => $usuarios, "modalBorrarUsuario" => $modalBorrarUsuario, "modalReservasUsuario" => $modalReservasUsuario, "modalInfoUsuario" => $modalInfoUsuario]);
        return view('plantillas/normal', ["view" => $view, "assets" => $assets]);
    }

    public function getUsuario() {

        $usuariosModel    = new usuariosModel();
        $post  = $this->request->getPost();

        if(!empty($post)) {

            $id_usuario = intval($post["id_usuario"]);
            $usuario = (count($usuariosModel->getUsuarioById($id_usuario)) > 0 ?  $usuariosModel->getUsuarioById($id_usuario)[0] : []);

            echo json_encode([
                "success" => true,
                "usuario" => $usuario,
            ]);
            return;
        }
    }

    public function borrarUsuario() {

        $usuariosModel = new usuariosModel();
        $actividadModel = new actividadModel();
        $post  = $this->request->getPost();

        if(!empty($post)) {

            $actividad = $actividadModel->crearActividad([
                "tipo" => 5,
                "descripcion" => "Se ha eliminado el usuario ". session()->get('usuario')["email"], 
                "fecha" => date("Y-m-d H:i:s"), 
                "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);

            $id_usuario = intval($post["id_usuario"]);
            $usuariosModel->borrarUsuario($id_usuario);

            echo json_encode([
                "success" => true,
                "message" => "El usuario se ha borrado correctamente",
            ]);
            return;

        }   
    }

    public function getReservasUsuario() {

        $usuariosModel = new usuariosModel();
        $reservasModel = new reservasModel();
        $post  = $this->request->getPost();

        if(!empty($post)) {

            $id_usuario = intval($post["id_usuario"]);

            $reservas = $reservasModel->getTodasReservasByUsuario($id_usuario);
            $usuario  = $usuariosModel->getUsuarioById($id_usuario)[0];

            echo json_encode([
                "success"  => true,
                "reservas" => $reservas,
                "usuario"  => $usuario
            ]);
            return;
        }
    }

    public function editarUsuario() {

        $usuariosModel = new usuariosModel();
        $actividadModel = new actividadModel();
        $post  = $this->request->getPost();

        if(!empty($post)) {

            $id_usuario = intval($post["id_usuario"]);
            $nombre     = $post["nombre"];
            $email      = $post["email"];
            $telf       = $post["telf"];
            $password   = $post["password"];

            $data_usuario = [];

            $usuarios = $usuariosModel->getUsuarios();
            if(in_array($email, array_column($usuarios, 'email'))) {

                echo json_encode([
                "success" => false,
                "message" => "El email nuevo está en uso" 
            ]);
            return;
            }

            if($password === "") {
                
                $data_usuario = [
                    "id_usuario" => $id_usuario, 
                    "email"      => $email, 
                    "nombre"     => $nombre, 
                    "telf"       => $telf, 
                ];
            }
            else {

                $data_usuario = [
                    "id_usuario" => $id_usuario, 
                    "email"      => $email, 
                    "nombre"     => $nombre, 
                    "telf"       => $telf, 
                    "password"   => sha1($password)
                ];
            }


            $usuariosModel->modificarUsuario($data_usuario);
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 15,
                    "descripcion" => "Modificación del usuario ". session()->get('usuario')["email"], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);

            echo json_encode([
                "success" => true,
                "message" => "Usuario modificado correctamente", 
                "usuario" => $data_usuario
            ]);
            return;
        }
    }

    public function editarUsuarioPersonal() {

        $usuariosModel = new usuariosModel();
        $actividadModel = new actividadModel();
        $post  = $this->request->getPost();

        if(!empty($post)) {

            $id_usuario = intval($post["id_usuario"]);
            $nombre     = $post["nombre"];
            $email      = $post["email"];
            $telf       = $post["telf"];
            $password_vieja = $post["password_vieja"];
            $password_nueva = $post["password_nueva"];

            $data_usuario = [];

            $usuarios = $usuariosModel->getUsuarios();
            if(in_array($email, array_column($usuarios, 'email'))) {

                echo json_encode([
                "success" => false,
                "message" => "El email nuevo está en uso" 
                ]);
                return;
            }

            if($password_vieja === "" && $password_nueva === "") {
                
                $data_usuario = [
                    "id_usuario" => $id_usuario, 
                    "email"      => $email, 
                    "nombre"     => $nombre, 
                    "telf"       => $telf, 
                ];
            }
            else if($password_vieja !== "" && $password_nueva !== "") {

                if(sha1($password_vieja) === $usuariosModel->getPassword($id_usuario)["password"]){

                    $data_usuario = [
                    "id_usuario" => $id_usuario, 
                    "email"      => $email, 
                    "nombre"     => $nombre, 
                    "telf"       => $telf, 
                    "password"   => sha1($password_nueva)
                    ];
                }
                else {
                    
                    echo json_encode([
                    "success" => false,
                    "message" => "La contraseña actual introducida es incorrecta" 
                    ]);
                    return;
                }

                
            }
            else {
                return; 
            }


            $usuariosModel->modificarUsuario($data_usuario);
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 15,
                    "descripcion" => "Modificación del usuario ". session()->get('usuario')["email"], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);

            echo json_encode([
                "success" => true,
                "message" => "Usuario modificado correctamente" 
            ]);
            return;
        }
    }

    public function darBaja() {

        $usuariosModel = new usuariosModel();
        $actividadModel = new actividadModel();
        $post  = $this->request->getPost();

        if(!empty($post)) {
            
            $id_usuario = intval($post["id_usuario"]);
            $usuariosModel->setEstadoUsuario($id_usuario, 1);
            $num_reservas = intval($usuariosModel->getReservasPasadas($id_usuario));
            
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 20,
                    "descripcion" => "Baja del usuario ". session()->get('usuario')["email"], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);

            echo json_encode([
                "success" => true,
                "num_reservas" => $num_reservas,
                "message" => "Al usuario se le ha dado de baja de manera correcta" 
            ]);
            return;
        }
    }

    public function darAlta() {

        $usuariosModel = new usuariosModel();
        $actividadModel = new actividadModel();
        $post  = $this->request->getPost();

        if(!empty($post)) {
            
            $id_usuario = intval($post["id_usuario"]);
            $usuariosModel->setEstadoUsuario($id_usuario, 0);
            $num_reservas = intval($usuariosModel->getReservasPasadas($id_usuario));

            $actividad = $actividadModel->crearActividad([
                    "tipo" => 21,
                    "descripcion" => "Alta del usuario ". session()->get('usuario')["email"], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);

            echo json_encode([
                "success" => true,
                "num_reservas" => $num_reservas,
                "message" => "Al usuario se le ha dado de alta de manera correcta" 
            ]);
            return;
        } 
    }

    public function filtroUsuarios() {

        $usuariosModel = new usuariosModel();
        $post  = $this->request->getPost();

        if(!empty($post)) {

            $valor  = $post["valor"];
            $estado = filter_var($_POST['estado'], FILTER_VALIDATE_BOOLEAN);

            $resultado = $usuariosModel->filtradoUsuarios($valor, $estado);

            echo json_encode([
                "success" => true,
                "resultado" => $resultado,
                "message" => "Búsqueda realizada con exito" 
            ]);
            return;
        } 


    }

}
