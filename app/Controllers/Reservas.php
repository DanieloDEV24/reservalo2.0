<?php

namespace App\Controllers;

use App\Models\instalacionesModel;
use App\Models\reservasModel;
use App\Models\loginModel;
use DateTime;
use App\Libraries\Pdf;
use App\Libraries\SmsService;

class Reservas extends BaseController
{

    public function getInfoPistasReserva() {
        $instalacionesModel = new instalacionesModel();
        $reservasModel = new reservasModel();
        $post  = $this->request->getPost();

       if(!empty($post)){

            $id_pista = intval($post["pistaId"]);
            $fecha = $post["fecha"];

            // Obtenemos la informacion de la pista
            $infoPista = $reservasModel->getInfoPista($id_pista, $fecha);


            if(empty($infoPista)){
                $data = $instalacionesModel->getPistasById($id_pista);
                
                echo json_encode([
                    "success" => true,
                    "hayHorarios" => false,
                    "infoPista" => $data,
                    "baseUrl" => base_url()
                ]);
                return;
            }

            $reservasPista = $reservasModel->reservasById($id_pista, $fecha);

            echo json_encode([
                "success" => true,
                "hayHorarios" => true,
                "infoPista" => $infoPista,
                "reservas" => $reservasPista,
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
    $reservasModel = new reservasModel();
    $loginModel    = new loginModel();
    $post  = $this->request->getPost();

    if(!empty($post)){

        $datos  = $post["datos"];
        $precio = $post["precio"];
        $fecha_hora_actual = date('Y-m-d H:i:s');

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

        foreach($datos as $dato) {
                
            $data = [
                "id_pista"      => $dato["pista"], 
                "fecha"         => $dato["fecha"], 
                "hora_inicio"   => $dato["hora"],
                "hora_final"    => $dato["horaFin"], 
                "fecha_reserva" => $fecha_hora_actual,
                "id_usuario"    => $id_usuario, 
                "id_pedido"     => $id_pedido
            ];

            $reserva = $reservasModel->hacerReserva($data);
        }
        
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

    $html = view('reservas/pdf_template', ["datos" => $datos_pdf, "baseUrl"=> base_url()]);
    
    $pdf = new Pdf();
    $pdf->writeHTML($html);

            try {
            $smsService = new SmsService();
            $resultado = $smsService->notificarConfirmacionReserva($datos_pdf);
            
            if ($resultado['success']) {
                log_message('info', '✅ SMS enviado correctamente a: ' . $data['reserva']['cliente_telefono']);
                log_message('info', 'SID del mensaje: ' . $resultado['sid']);
            } else {
                log_message('error', '❌ Error enviando SMS: ' . $resultado['error']);
            }
        } catch (\Exception $e) {
            log_message('error', '❌ Excepción al enviar SMS: ' . $e->getMessage());
        }
        
    
    // Generar al vuelo y forzar descarga (NO se guarda en servidor)
    $pdf->output('reserva-'.$pedido['num_pedido'].'.pdf', 'D');
    }
}
