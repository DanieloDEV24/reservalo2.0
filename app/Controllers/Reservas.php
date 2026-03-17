<?php

namespace App\Controllers;

use App\Models\horariosModel;
use App\Models\instalacionesModel;
use App\Models\reservasModel;
use App\Models\loginModel;
use DateTime;
use App\Libraries\Pdf;
use App\Libraries\SmsService;
use App\Models\actividadModel;

class Reservas extends BaseController
{

    public function getInfoPistasReserva() {
        $instalacionesModel = new instalacionesModel();
        $reservasModel = new reservasModel();
        $loginModel = new loginModel();
        $horariosModel = new horariosModel();
        $post  = $this->request->getPost();

        if(!empty($post)){

            $id_pista = intval($post["pistaId"]);
            $fecha = $post["fecha"];
            $rolUsuario = intval($post["rol"]);
            $tipo_reserva = intval($post["tipo_reserva"]);


            $infoPista = [];
            
            // Obtenemos la informacion de la pista
            $infoPista = $reservasModel->getInfoPista($id_pista, $fecha);
            
            $hay_horarios = $horariosModel->getHorariosFromPista($id_pista);

            if(count($hay_horarios) === 0 && $tipo_reserva === 0) {
                
                echo json_encode([
                    "success" => false,
                ]);
                return;
            }

            if($tipo_reserva === 1) {
                $reservasAllPista = $reservasModel->getAllReservasById($id_pista);
            }
            else {
                $reservasAllPista = [];
            }

            $reservasPista = $reservasModel->reservasById($id_pista, $fecha);

            $usuarios = [];
            if($rolUsuario === 2) {
                $usuarios = $loginModel->getUsuarios();
            }

            echo json_encode([
                "success" => true,
                "hayHorarios" => true,
                "infoPista" => $infoPista,
                "reservas" => $reservasPista,
                "usuarios" => $usuarios,
                "allReservas" => $reservasAllPista,
                "baseUrl" => base_url()
            ]);
            return;
       }
    }

    public function comprobarReservas() {

        $reservasModel = new reservasModel();
        $post  = $this->request->getPost();

        if(!empty($post)){

            $id_pista = intval($post["pista"]);
            $fecha    = $post["fecha"]; 
            $hora     = $post["hora"];

            $hay_reservas  = $reservasModel->hayReserva($id_pista, $fecha, $hora);
            $reservas_bool = (count($hay_reservas) === 0) ? false : true;

            echo json_encode([
                "success" => true, 
                "hayReserva" => $reservas_bool
            ]); 
            exit;
        }
    }

    public function hacerReserva() {

        date_default_timezone_set('Europe/Madrid');
        $reservasModel  = new reservasModel();
        $loginModel     = new loginModel();
        $actividadModel = new actividadModel();
        $instalacionesModel = new instalacionesModel();
        $post  = $this->request->getPost();

        if(!empty($post)){

            $datos          = $post["datos"];
            $precio         = $post["precio"];
            $precio_reserva = floatval($post["precio_reserva"]);
            $tipo_reserva = intval($post["tipo_reserva"]);
            $fecha_hora_actual = date('Y-m-d H:i:s');

            $session = session();
            if($session->has('usuario')){
                $usuario    = $session->get('usuario');
                $id_usuario = 0;

                if(intval($usuario["rol"]) === 1){
                    $id_usuario = $usuario["id_usuario"];
                }
                else {
                    $id_usuario = intval($post["id_usuario"]);
                }
            }
            else {
                $id_usuario = null;
            }

            if($id_usuario === null)
            {
                return $this->response->setJSON([
                    "success" => false, 
                    "mensaje" => "Ha habido un error en la reserva de la pista"
                ]);
            }

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

            $id_pedido = $reservasModel->hacerPedido([
                "id_usuario"    => $id_usuario, 
                "fecha_pedido"  => $fecha_hora_actual, 
                "precio_pedido" => $precio, 
                "num_pedido"    => $num_pedido
            ]);

            $nombre_pista = "";
            if($tipo_reserva === 0){
                foreach($datos as $dato) {
                    
                    $data = [
                        "id_pista"       => $dato["pista"], 
                        "fecha"          => $dato["fecha"], 
                        "hora_inicio"    => $dato["hora"],
                        "hora_final"     => $dato["horaFin"], 
                        "fecha_reserva"  => $fecha_hora_actual,
                        "id_usuario"     => $id_usuario, 
                        "id_pedido"      => $id_pedido, 
                        "pagadas"        => 0, 
                        "precio_reserva" => $precio_reserva
                    ];

                    $nombre_pista = $instalacionesModel->getPistasById(intval($dato["pista"]))[0]["nombre_pista"];

                    $reserva = $reservasModel->hacerReserva($data);
                }
            }
            else {
                $fecha_inicio = new DateTime($datos[0]["fecha_inicio"]); 
                $fecha_final  = new DateTime($datos[1]["fecha_fin"]);

                while($fecha_inicio <= $fecha_final){

                    $data = [
                            "id_pista"       => $datos[2]["pista"], 
                            "fecha"          => $fecha_inicio->format('Y-m-d'), 
                            "hora_inicio"    => "00:00:00",
                            "hora_final"     => "23:59:59", 
                            "fecha_reserva"  => $fecha_hora_actual,
                            "id_usuario"     => $id_usuario, 
                            "id_pedido"      => $id_pedido, 
                            "pagadas"        => 0, 
                            "precio_reserva" => $precio_reserva
                    ];

                    $nombre_pista = $instalacionesModel->getPistasById(intval($datos[2]["pista"]))[0]["nombre_pista"];

                    $reserva = $reservasModel->hacerReserva($data);

                    $fecha_inicio->modify('+1 day');
                }
            }

            $actividad = $actividadModel->crearActividad([
                    "tipo" => 1,
                    "descripcion" => "Reserva de la pista ". $nombre_pista, 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);
            
            // Devolver solo JSON, SIN generar PDF aquí
            return $this->response->setJSON([
                "success" => true, 
                "mensaje" => "La reserva se ha hecho de manera satisfactoria",
                "id_pedido" => $id_pedido
            ]);
        }
    }

    // Método separado SOLO para generar y descargar el PDF
    public function descargarTicket(int $id_pedido) {
        $reservasModel = new reservasModel();
        $loginModel    = new loginModel();
        
        // Obtener datos del pedido
        $pedido = $reservasModel->getPedidoFromId($id_pedido)[0];
        
        if(!$pedido) {
            return redirect()->back()->with('error', 'Pedido no encontrado');
        }
        
        $datos_usuario = $loginModel->buscaUsuarioPorId($pedido['id_usuario']);
        $datos_reserva = $reservasModel->getFullReservasFromPedido(intval($id_pedido));

        $datos_pdf = [
            "nombre_usuario" => $datos_usuario["nombre"], 
            "email_usuario"  => $datos_usuario["email"], 
            "telf_usuario"   => $datos_usuario["telf"],
            "fecha_pedido"   => $pedido['fecha_pedido'], 
            "precio_pedido"  => $pedido['precio_pedido'], 
            "numero_pedido"  => $pedido['num_pedido'], 
            "reservas"       => $datos_reserva
        ];

        $html = view('reservas/pdf_template', [
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
            $this->enviarEmailYSMS($datos_pdf, $datos_usuario, $tempPath, $pdfFilename, $id_pedido, $datos_reserva);
        } else {
            $this->enviarEmailYSMS($datos_pdf, $datos_usuario, $tempPath, $pdfFilename, $id_pedido, $datos_reserva);
        }
        
        exit;
    }

    public function misReservas() {
        
        $reservasModel = new reservasModel();
        $session = session();

        if($session->has('usuario')){
            $usuario    = $session->get('usuario');
            $id_usuario = $usuario["id_usuario"];
        }
        else {
            $id_usuario = null;
        }

        if($id_usuario === null)
        {
            echo json_encode([
                "success" => false, 
                "mensaje" => "No has iniciado sesión"
            ]);
            return;
        }

        $mis_reservas = $reservasModel->getReservasByUsuario($id_usuario);

        echo json_encode([
            "success" => true, 
            "reservas" => $mis_reservas, 
            "baseUrl" => base_url()
        ]);
        return;
    }

    public function anularHora() {
        
        $reservasModel = new reservasModel();
        $actividadModel = new actividadModel();
        $instalacionesModel = new instalacionesModel();
        $post = $this->request->getPost();

        if(!empty($post)){
            
            $datos = $post["datos"];

            foreach($datos as $dato) {

                $anularReserva = $reservasModel->anularReservaByHourAndDate($dato["fecha"], $dato["hora"], $dato["pedido"]);
                $num_pedidos   = $reservasModel->numReservasFromPedido($dato["pedido"]);

                if($num_pedidos === 0){
                    $reservasModel->anularPedido($dato["pedido"]);
                }
            }

            $id_pista = intval($reservasModel->getReservasByPedido($datos[0])[0]["id_pedido"]);
            $nombre_pista = $instalacionesModel->getPistasById($id_pista)[0]["nombre_pista"];

            $actividad = $actividadModel->crearActividad([
                    "tipo" => 2,
                    "descripcion" => "Anulación de una reserva de la pista ". $nombre_pista, 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);
            
            echo json_encode([
                "success" => true, 
                "mensaje" => "La hora ha sido anulada correctamente"
            ]);
            return;
            
        }

    }

    public function anularReservaEspecial() {
        
        $reservasModel = new reservasModel();
        $actividadModel = new actividadModel();
        $instalacionesModel = new instalacionesModel();
        $post = $this->request->getPost();

        if(!empty($post)){
            
            $id_pedido = intval($post["idPedido"]);

            $anularReservas = $reservasModel->anularReservasByPedido($id_pedido);
            $anularPedido   = $reservasModel->anularPedido($id_pedido);

            $id_pista = intval($reservasModel->getReservasByPedido($id_pedido)[0]["id_pista"]);
            $nombre_pista = $instalacionesModel->getPistasById($id_pista)[0]["nombre_pista"];

            $actividad = $actividadModel->crearActividad([
                    "tipo" => 2,
                    "descripcion" => "Anulación de una reserva de la pista ". $nombre_pista, 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);
            
            echo json_encode([
                "success" => true, 
                "mensaje" => "La reserva ha sido anulada correctamente"
            ]);
            return;
        }
    }

    public function crudReservas() {

        $reservasModel = new reservasModel();

        $assets = [
                    "css" => [
                        'css/instalaciones.css', 
                        'css/reservas.css',
                        'css/style.css', 
                        'css/crudReservas.css'
                    ], 

                    "js" => [ 
                        'js/reservas.js', 
                        'js/crudReservas.js'
                    ]
        ];

        $fecha_hoy = date("Y-m-d");

        $reservas = $reservasModel->getReservasByFecha($fecha_hoy);

        $modalAnularReserva = view('reservas/modalAnularAdmin');
        $modalAnularHoras = view('reservas/modalAnularHoras');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras]);
        $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

        $view = view('reservas/reservas', ["reservas" => $reservas, "modalAnularReserva"=>$modalAnularReserva]);
        return view("plantillas/normal", ["view" => $view, "assets" => $assets, "modalInformacionPersonal" => $modalInformacionPersonal, "modalMisReservas" => $modalMisReservas]);
    }

    public function getFechasReservas() {

        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $mes  = intval($post["mes"]);
            $year = intval($post["year"]);

            $fechas_reservas = $reservasModel->getReservasByMonthAndYear($mes, $year);

            echo json_encode([
                "success" => true, 
                "fechasReservas" => $fechas_reservas
            ]);
            return;
        }
    }

    public function getReservasByDate() {

        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $fecha    = $post["fecha"];
            $reservas = $reservasModel->getReservasByFecha($fecha);

            echo json_encode([
                "success" => true, 
                "reservas" => $reservas
            ]);
            return;
        }

    }

    public function anularReservasById() {
        
        $reservasModel = new reservasModel();
        $actividadModel = new actividadModel(); 
        $instalacionesModel = new instalacionesModel();
        $post = $this->request->getPost();

        if(!empty($post)){
            
            $id_reserva = intval($post["idReserva"]);
            $id_pedido  = intval($post["idPedido"]);

            $fecha = $reservasModel->getDateReserva($id_reserva)[0]["fecha"];
            $id_usuario = intval($reservasModel->getUsuarioReserva($id_reserva)[0]["id_usuario"]);
            $borrar_pago = $reservasModel->deshacerPago($id_reserva);
            $anularReserva = $reservasModel->anularReservaById($id_reserva);
            $num_pedidos   = $reservasModel->numReservasFromPedido($id_pedido);
            $cont_reservas = count($reservasModel->getReservasByDate($fecha));
            $cont_reservas_pagadas = count($reservasModel->getReservasPagadasByDate($fecha));
            $cont_reservas_no_pagadas = count($reservasModel->getReservasNoPagadasByDate($fecha));
            $todas_reservas = $reservasModel->getTodasReservasByUsuario($id_usuario);

            if($num_pedidos === 0){
                $reservasModel->anularPedido($id_pedido);
            }

            $id_pista = intval($reservasModel->getReservasByPedido($id_pedido)[0]["id_pista"]);
            $nombre_pista = $instalacionesModel->getPistasById($id_pista)[0]["nombre_pista"];

            $actividad = $actividadModel->crearActividad([
                    "tipo" => 2,
                    "descripcion" => "Anulación de una reserva de la pista ". $nombre_pista, 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);
            
            echo json_encode([
                "success" => true, 
                "mensaje" => "La hora ha sido anulada correctamente",
                "num_reservas" => $cont_reservas,
                "num_reservas_pagadas" => $cont_reservas_pagadas, 
                "num_reservas_no_pagadas" => $cont_reservas_no_pagadas, 
                "todas_reservas" => $todas_reservas
            ]);
            return;
            
        }

    }

    public function getInfoReserva(){

        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_reserva = intval($post["idReserva"]);
            
            $reserva = $reservasModel->getReservaById($id_reserva); 
            echo json_encode([
                "success" => true, 
                "reserva" => $reserva,
                "mensaje" => "La hora ha sido anulada correctamente"
            ]);
            return;
        }
    }

    public function checkIn() {

        $reservasModel = new reservasModel();
        $actividadModel = new actividadModel(); 
        $instalacionesModel = new instalacionesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_reserva = intval($post["idReserva"]);
            
            $reserva = $reservasModel->getReservaById($id_reserva);
            $reservasModel->setPagadas($id_reserva, 1);

            $data = [
                "id_reserva"          => $id_reserva,
                "precio_reserva"      => floatval($reserva[0]["precio_reserva"]),
                "resto_precio_pedido" => (floatval($reserva[0]["precio_pedido"]) - floatval($reserva[0]["precio_reserva"])), 
                "fecha_pago"          => date("Y-m-d H:i:s")
            ];

            $pago = $reservasModel->hacerPago($data);

            $id_pista = intval($reservasModel->getReservaById($id_reserva))[0]["id_pista"];
            $nombre_pista = $instalacionesModel->getPistasById($id_pista)[0]["nombre_pista"];

            $actividad = $actividadModel->crearActividad([
                    "tipo" => 3,
                    "descripcion" => "Confirmación de la reserva ". $nombre_pista, 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);

            $cont_reservas_pagadas = count($reservasModel->getReservasPagadasByDate($reserva[0]["fecha"]));
            $cont_reservas_no_pagadas = count($reservasModel->getReservasNoPagadasByDate($reserva[0]["fecha"]));

            echo json_encode([
                "success" => true, 
                "mensaje" => "Check-In realizado", 
                "num_reservas_pagadas" => $cont_reservas_pagadas, 
                "num_reservas_no_pagadas" => $cont_reservas_no_pagadas
            ]);
            return;
        }

    }

    public function deshacerCheckIn(){

        $reservasModel = new reservasModel();
        $actividadModel = new actividadModel(); 
        $instalacionesModel = new instalacionesModel();
        $post = $this->request->getPost();

        if(!empty($post)){

            $id_reserva = intval($post["idReserva"]);

            $reservasModel->setPagadas($id_reserva, 0);
            $reservasModel->deshacerPago($id_reserva);

            $id_pista = intval($reservasModel->getReservaById($id_reserva))[0]["id_pista"];
            $nombre_pista = $instalacionesModel->getPistasById($id_pista)[0]["nombre_pista"];

            $actividad = $actividadModel->crearActividad([
                    "tipo" => 24,
                    "descripcion" => "Anulación del CheckIn de la reserva de la pista ". $nombre_pista, 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);


            $reserva = $reservasModel->getReservaById($id_reserva);
            $cont_reservas_pagadas = count($reservasModel->getReservasPagadasByDate($reserva[0]["fecha"]));
            $cont_reservas_no_pagadas = count($reservasModel->getReservasNoPagadasByDate($reserva[0]["fecha"]));

            echo json_encode([
                "success" => true, 
                "mensaje" => "Check-In deshecho", 
                "num_reservas_pagadas" => $cont_reservas_pagadas, 
                "num_reservas_no_pagadas" => $cont_reservas_no_pagadas
            ]);
            return;

        }
    }

    public function getReservasByPedido() {

        $reservasModel = new reservasModel();
        $post = $this->request->getPost();

        if(!empty($post)) {

            $id_pedido = intval($post["id_pedido"]);
            $reservas  = $reservasModel->getReservasByPedido($id_pedido);

            echo json_encode([
                "success"  => true, 
                "reservas" => $reservas 
            ]); 
            return; 
        }

    }

    public function borrarReservasDia() {

        $reservasModel = new reservasModel();
        $actividadModel = new actividadModel(); 
        $instalacionesModel = new instalacionesModel();
        $post = $this->request->getPost();

        if(!empty($post)) {

            $data = $post["data"];
            
            $id_pista = intval($reservasModel->getReservaById(intval($data[0]["id_pedido"])))[0]["id_pista"];
            $nombre_pista = $instalacionesModel->getPistasById($id_pista)[0]["nombre_pista"];

            $actividad = $actividadModel->crearActividad([
                    "tipo" => 2,
                    "descripcion" => "Cancelación de una reserva de la pista ". $nombre_pista, 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => session()->get('usuario')["id_usuario"]
            ]);


            foreach($data as $dia){

                $reservasModel->anularReservaById(intval($dia["id_reserva"]));
            }
            
            $reservas = $reservasModel->getReservasByPedido(intval($data[0]["id_pedido"]));
            if(count($reservas) === 0) {
                $reservasModel->anularPedido(intval($data[0]["id_pedido"]));
            }

            echo json_encode([
                "success"  => true,
                "message"  => "Los días de las reservas se han anulado correctamente",
                "reservas" => $reservas
            ]);
            return;
        }
    }

    private function enviarEmailYSMS($datos_pdf, $datos_usuario, $tempPath, $pdfFilename, $id_pedido, $datos_reserva) {
        try {
            // Leer el PDF
            $pdfContent = file_get_contents($tempPath);
            $pdfBase64 = base64_encode($pdfContent);
            
            // Cargar plantilla de email
            $htmlContent = view('plantillas/emailReserva', [
                'datos_reserva' => $datos_pdf
            ]);
            
            // API Key de Resend
            $apiKey = 're_EoU5q6Mw_Hz3ECMQADDxHKz3o3opLeS6e';
            
            $curlData = [
                'from' => 'Ayuntamiento de Fuente de Piedra <noreply@resend.dev>',
                'to' => [$datos_usuario['email']],
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
                log_message('info', '✅ Email enviado a: ' . $datos_usuario['email']);
            } else {
                log_message('error', '❌ Error enviando email: ' . $response);
            }
            
        } catch (\Exception $e) {
            log_message('error', '❌ Error email: ' . $e->getMessage());
        }
        
        
        // Eliminar archivo temporal
        if (file_exists($tempPath)) {
            unlink($tempPath);
        }
    }
}
