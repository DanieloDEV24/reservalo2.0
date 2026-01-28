<?php
namespace App\Libraries;

use Twilio\Rest\Client;
use DateTime;

class SmsService
{
    protected $client;
    protected $fromNumber;
    
    public function __construct()
    {
        $sid = getenv('TWILIO_SID');
        $token = getenv('TWILIO_AUTH_TOKEN');
        $this->fromNumber = getenv('TWILIO_PHONE_NUMBER');
        
        if ($sid && $token) {
            try {
                $this->client = new Client($sid, $token);
            } catch (\Exception $e) {
                log_message('error', 'Error inicializando Twilio: ' . $e->getMessage());
            }
        }
    }
    
    public function enviarSms($to, $mensaje)
    {
        if (!$this->client) {
            return ['success' => false, 'error' => 'Twilio no configurado'];
        }
        
        try {
            // Normalizar el teléfono
            $to = $this->normalizarTelefono($to);
            
            $message = $this->client->messages->create(
                $to,
                [
                    'from' => $this->fromNumber,
                    'body' => $mensaje
                ]
            );
            
            return [
                'success' => true,
                'sid' => $message->sid
            ];
        } catch (\Exception $e) {
            log_message('error', 'Error enviando SMS: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    public function notificarConfirmacionReserva($reserva)
    {
        $clientePhone = $reserva['telf_usuario'];
        
        $mensaje = "✅ Reserva confirmada #" . $reserva['numero_pedido'] . "\n\n";
        $mensaje .= "📍 Instalación: " . $reserva['reservas'][0]["nombre"] . "\n";
        $mensaje .= "📅 Fechas: \n";
        foreach($reserva["reservas"] as $fecha) {
            $fechaDateTime = DateTime::createFromFormat('Y-m-d', $fecha["fecha_reserva"]);
            $mensaje .= "-" . $fechaDateTime->format('d/m/Y')." : ". $fecha["hora_inicio"] . " - " . $fecha["hora_final"] ."\n";
        }
        $mensaje .= "💰 Total: " . number_format($reserva['precio_pedido'], 2) . "€\n\n";
        $mensaje .= "¡Gracias por tu reserva!";
        
        return $this->enviarSms($clientePhone, $mensaje);
    }
    
    private function normalizarTelefono($telefono)
    {
        // Quitar espacios, guiones y paréntesis
        $telefono = preg_replace('/[\s\-\(\)]/', '', $telefono);
        
        // Si no empieza con +, agregar +34 (España)
        if (!str_starts_with($telefono, '+')) {
            // Si empieza con 34, agregar solo el +
            if (str_starts_with($telefono, '34')) {
                $telefono = '+' . $telefono;
            } else {
                // Agregar +34
                $telefono = '+34' . $telefono;
            }
        }
        
        return $telefono;
    }
}