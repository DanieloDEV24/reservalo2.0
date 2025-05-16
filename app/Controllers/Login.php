<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;
use App\Models\loginModel;

class Login extends BaseController
{
    /**
     * Funcion index(). Funcion en la que obtenemos los datos necesarios para mostrar la pagina
     * principal. 
     */
    public function login()
    {

        return view('login/loginPage', ["baseUrl" => base_url()]);
    }

    public function registrarse(): string
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
                if($emailE === $email) $existeEmail = true;
            }

            if($existeEmail)
            {
                $salida = [
                    "mensaje" => "Ese email ya esta en uso", 
                    "succes"  => false
                ];
            }
            // else if($email === "")
            // {
            //     $salida = [
            //         "mensaje" => "Debe introducir una dirección de correo", 
            //         "succes"  => false
            //     ];
            // }
            // else if($password === "")
            // {
            //     $salida = [
            //         "mensaje" => "Debe introducir una contraseña", 
            //         "succes"  => false
            //     ];
            // }
            else 
            {
                $loginModel->registrar($nombre, $email, $password);
                $data = [
                    "nombre"   => $nombre,
                    "email"    => $email,
                    "password" => $password
                ];

                $this->accesoUsuario($data);

                return redirect()->to('/');
            }

            return view('login/singInPage', ["baseUrl" => base_url(), "salida" => $salida]);
        }

        return view('login/singInPage', ["baseUrl" => base_url()]);
    }

    private function accesoUsuario($data)
    {
        // Se obtiene la instancia de la sesión
        $session = session();

        $dataSesion = [
            "nombre" => $data["nombre"],
            "email"=> $data["email"],
            "rol" => $data["rol"],
            "id_usuario" => $data["id_usuario"]
        ];

        $session->set("usuario", $dataSesion);
       
    }
    
}
