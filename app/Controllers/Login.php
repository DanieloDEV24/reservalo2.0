<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;
use App\Models\loginModel;
use CodeIgniter\HTTP\ResponseInterface;
use IntlDateFormatter;
use DateTime;

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
        $loginModel = new loginModel();
        $request    = $this->request;
        $post       = $request->getPost();

        if (!empty($post)) {
            $emailRecuperacion = $post["emailPass"];
            $emailExistente    = $loginModel->existeEmail($emailRecuperacion);

            $existe = false;
            foreach ($emailExistente as $value) {
                if ($value["email"] === $emailRecuperacion) $existe = true;
            }

            if ($existe) {
                // Token de recuperación
                $token   = bin2hex(random_bytes(50));
                $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

                $data = [
                    "token"      => $token,
                    "token_date" => $expires
                ];

                $idEmail = intval($loginModel->buscarIdporEmail($emailRecuperacion)["id_usuario"]);

                // Guardar el token (puedes descomentar si está funcionando bien)
                $loginModel->anadirToken($data, $idEmail);

                // 🔁 URL personalizada de recuperación
                $urlRecuperacion = base_url("/index.php/resetPass?token=$token");

                $locale = 'es_ES'; // o 'es_ES.UTF-8'
$date = new DateTime();

// Formato similar a: "martes 11 de junio, 2025"
$formatter = new IntlDateFormatter(
    $locale,
    IntlDateFormatter::FULL,
    IntlDateFormatter::NONE,
    'Europe/Madrid', // Ajusta según tu zona horaria
    IntlDateFormatter::GREGORIAN,
    "EEEE d 'de' MMMM, yyyy"
);

$fecha_formateada = $formatter->format($date);

                $htmlContent = view('plantillas/emailRecuPass', ["baseUrl" => base_url(), "url" => $urlRecuperacion, "fecha_hoy" => $fecha_formateada]);

                // Envío con cURL a Resend
                $apiKey = 're_EoU5q6Mw_Hz3ECMQADDxHKz3o3opLeS6e'; // ⚠️ Sustituye esto por tu API key real de Resend

                $curlData = [
                    'from' => 'Ayuntamiento de Humilladero <noreply@resend.dev>',
                    'to' => ['danielruizdeveloper@gmail.com'],
                    'subject' => 'Cambiar Contraseña',
                    'html' => $htmlContent,
                ];

                $ch = curl_init('https://api.resend.com/emails');
                curl_setopt($ch, CURLOPT_HTTPHEADER, [
                    'Authorization: Bearer ' . $apiKey,
                    'Content-Type: application/json',
                ]);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlData , JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

                $response  = curl_exec($ch);
                $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                $curlError = curl_error($ch);
                curl_close($ch);

                if ($httpCode === 200 || $httpCode === 202) {
                    $salida = [
                        "mensaje" => "Se ha enviado al correo el enlace de recuperación",
                        "success" => true,
                        "type"    => "success"
                    ];
                } else {
                    $salida = [
                        "mensaje" => "Error al enviar correo: $curlError. Respuesta: $response",
                        "success" => false,
                        "type"    => "danger"
                    ];
                }
            } else {
                $salida = [
                    "mensaje" => "El email no está registrado",
                    "success" => false,
                    "type"    => "danger"
                ];
            }
        }

        if(isset($salida))
        {
            return view('login/recuperarPassword', [
                "baseUrl" => base_url(),
                "salida"  => $salida
            ]);
        }
        else 
        {
            return view('login/recuperarPassword', [
                "baseUrl" => base_url()
            ]);
        }
    }

    public function resetPass()
    {
        $request     = $this->request;
        $token       = $request->getGet('token');
        $modeloLogin = new loginModel();

        // Busco un usuario con ese token
        $usuario      = $modeloLogin->buscarPorToken($token);
        $fecha_token  = new DateTime($usuario['token_date']);
        $fecha_actual = new DateTime();
        $diferencia   = $fecha_actual->getTimestamp() - $fecha_token->getTimestamp();

        if($diferencia >= 0)
        {
            $salida = [
                "mensaje" => "Ha expirado el plazo de 1h",
                "success" => false,
                "type"    => "danger"
            ];

            return view('login/recuperarPassword', [
                "baseUrl" => base_url(),
                "salida"  => $salida
            ]);
        }
        else 
        {
            
            return redirect()->to('/resetPassForm/'.$usuario["id_usuario"]); 
        }


    }

    public function resetPassForm($user = null)
    {
        $modeloLogin = new loginModel();
        $request     = $this->request;
        $post        = $request->getPost();

        if(!empty($post))
        {
            $newPass   = $post["newPassReset"];
            $repetPass = $post["repetPassReset"];
            
            if($newPass !== $repetPass)
            {
                $salida = [
                    "mensaje" => "Las contraseñas no coinciden",
                    "success" => false,
                    "type"    => "danger"
                ];
            }
            else 
            {
                $passwordEncrypt = sha1($newPass);

                // Cambiamos la contraseña y nos vamos al inicio
                $modeloLogin->cambioPass($passwordEncrypt, $user);
                
                return redirect()->to('/'); 
            }
        }

        if(isset($salida))
        {
             return view('login/resetPass', ["baseUrl" => base_url(), "salida" => $salida]);
        }
        else 
        {
             return view('login/resetPass', ["baseUrl" => base_url()]);
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


