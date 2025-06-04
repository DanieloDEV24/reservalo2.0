<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;
use App\Models\loginModel;
use CodeIgniter\HTTP\ResponseInterface;

class Login extends BaseController
{
    /**
     * Funcion index(). Funcion en la que obtenemos los datos necesarios para mostrar la pagina
     * principal. 
     */
    public function login()
    {
        $loginModel = new loginModel(); 

        //Recogemos post
        $request = $this->request;
        $post    = $request->getPost();

        if(!empty($post))
        {
            $email    = $post["emailLogin"];
            $password = $post["passwordLogin"];

            // Buscamos el que exista el usuario
            $emailExistentes = $loginModel->existeEmail($email);

            $existeEmail = false;
            foreach($emailExistentes as $emailE)
            {
                if($emailE["email"] === $email) $existeEmail = true;
            }

            if($existeEmail)
            {
                $passwordBD = $loginModel->passwordEmail($email);
                if(sha1($password) === $passwordBD["password"])
                {
                    $salida = [
                        "mensaje" => "Inicio de sesión correcto", 
                        "succes"  => true, 
                        "type"    => "success"
                    ];

                    $datosUsuario = $loginModel->selectDatawithEmail($email);

                    $data = [
                        "nombre"     => $datosUsuario["nombre"],
                        "email"      => $datosUsuario["email"],
                        "rol"        => $datosUsuario["id_rol"],
                        "password"   => $datosUsuario["password"],
                        "id_usuario" => $datosUsuario["id_usuario"]
                    ];

                    $this->accesoUsuario($data);

                    return redirect()->to('/'); 

                }
                else 
                {
                    $salida = [
                        "mensaje" => "Contraseña incorrecta ", 
                        "succes"  => false, 
                        "type"    => "danger"
                    ];
                }
            }
            else 
            {
                $salida = [
                    "mensaje" => "Esa dirección de correo no existe", 
                    "succes"  => false, 
                    "type"    => "danger"
                ];
            }
        }

        if(isset($salida))
        {
            return view('login/loginPage', ["baseUrl" => base_url(), "salida" => $salida]);
        }
        else 
        {
            return view('login/loginPage', ["baseUrl" => base_url()]);
        }
    }

    public function registrarse()
    {

        // Modelo login
        $loginModel = new loginModel();

        //Recogemos post
        $request = $this->request;
        $post    = $request->getPost();

        if(!empty($post))
        {
            // Recojo los datos del formulario
            $nombre   = $post['nombreReg'];
            $email    = $post['emailReg'];
            $password = $post['passwordReg'];

            // Comprobamos los email existentes para no repetirse
            $emailExistentes = $loginModel->existeEmail($email);
            $existeEmail     = false;
            foreach($emailExistentes as $emailE)
            {
                if($emailE["email"] === $email) $existeEmail = true;
            }

            if($existeEmail)
            {
                $salida = [
                    "mensaje" => "Ese email ya esta en uso", 
                    "succes"  => false, 
                    "type"    => "danger"
                ];
            }
            else 
            {
                $idInsert = $loginModel->registrar($nombre, $email, $password);
                $usuario  = $loginModel->buscaUsuarioPorId($idInsert);

                $data = [
                    "nombre"     => $usuario["nombre"],
                    "email"      => $usuario["email"],
                    "rol"        => $usuario["id_rol"],
                    "password"   => $usuario["password"],
                    "id_usuario" => $idInsert
                ];

                $this->accesoUsuario($data);

                return redirect()->to('/');
            }
        }

        if(isset($salida))
        {
            return view('login/singInPage', ["baseUrl" => base_url(), "salida" => $salida]);
        }
        else 
        {
            return view('login/singInPage', ["baseUrl" => base_url()]);
        }
    }


    public function logout()
    {
        session()->remove('usuario');
        return redirect()->to('/');
    }

    public function forgotPassword()
    {
        // Modelo login
        $loginModel = new loginModel();

        //Recogemos post
        $request = $this->request;
        $post    = $request->getPost();

        if(!empty($post["formForgotPassword"]))
        {
            $emailRecuperacion = $post["emailPass"];

            // Comprobamos que el email este en nuestra base de datos
            $emailExistente = $loginModel->existeEmail($emailRecuperacion)["email"];
            
            if($emailRecuperacion === $emailExistente)
            {
                // Generamos el token
                $token   = bin2hex(random_bytes(50));                 // Generamos un token seguro
                $expires = date('Y-m-d H:i:s', strtotime('+1 hour')); // Expira en una hora

                // Guardamos los datos en la base de datos
                $data    = [
                    "token"      => $token, 
                    "date_token" => $expires
                ];

                $idEmail = $loginModel->buscarIdporEmail($emailRecuperacion);

                $loginModel->anadirToken($data, $idEmail);
            }
            else 
            {
                $salida = [
                    "mensaje" => "El email no esta registrado", 
                    "success" => false,
                    "type"    => "danger"
                ];
            }
        }

        if(isset($salida))
        {
            return view ('login/recuperarPassword', ["baseUrl" => base_url(), "salida" => $salida]);
        }
        else 
        {
            return view ('login/recuperarPassword', ["baseUrl" => base_url()]);
        }


    }
 

    private function accesoUsuario($data)
    {
        // Se obtiene la instancia de la sesión
        $session = session();

        $dataSesion = [
            "nombre"     => $data["nombre"],
            "email"      => $data["email"],
            "rol"        => $data["rol"],
            "id_usuario" => $data["id_usuario"]
        ];

        $session->set("usuario", $dataSesion);
       
    }
    
}
