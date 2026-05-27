<?php
function tiempoTranscurrido($fecha){
    $ahora = new DateTime();
    $fecha = new DateTime($fecha);
    $diff = $ahora->getTimestamp() - $fecha->getTimestamp();

    if ($diff < 60) return $diff . 's';
    if ($diff < 3600) return floor($diff/60) . ' min';
    if ($diff < 86400) return floor($diff/3600) . ' horas';
    if ($diff < 2592000) return floor($diff/86400) . ' días';
    if ($diff < 31536000) return floor($diff/2592000) . ' meses';
    
    return floor($diff/31536000) . 'a';
}