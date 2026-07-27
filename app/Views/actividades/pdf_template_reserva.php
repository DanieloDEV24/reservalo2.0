<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: helvetica, arial, sans-serif;
            color: #333;
            font-size: 11px;
            line-height: 1.5;
        }
        
.logos-header {
    width: 100%;
    margin-bottom: 30px;
    min-height: 80px;
}

.logo-izquierdo {
    float: left;
    height: 70px;
    width: auto;
    margin: 0;
}

.logo-derecho {
    float: right;
    height: 70px;
    width: auto;
    margin: 0;
}
        .header-main {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            margin-bottom: 30px;
            border-radius: 10px;
        }
        
        .header-main h1 {
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .numero-reserva {
            background-color: rgba(255,255,255,0.2);
            padding: 10px 20px;
            display: inline-block;
            border-radius: 25px;
            margin-top: 10px;
            font-size: 18px;
        }
        
        .instalacion-imagen {
            width: 100%;
            height: 300px;            /* ajusta según tu diseño */
            background-size: cover;   /* 👈 el famoso cover */
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 12px;      /* opcional, queda fino */
            margin-bottom: 30px;
        }

    
        
        .seccion {
            margin-bottom: 25px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .seccion-header {
            background-color: #f8f9fa;
            padding: 15px 20px;
            border-bottom: 3px solid #667eea;
        }
        
        .seccion-header h2 {
            font-size: 20px;
            color: #667eea;
            margin: 0;
        }
        
        .seccion-body {
            padding: 20px;
        }
        
        table.info-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        table.info-table tr {
            border-bottom: 1px solid #f0f0f0;
        }
        
        table.info-table tr:last-child {
            border-bottom: none;
        }
        
        table.info-table td {
            padding: 12px 8px;
        }
        
        table.info-table td.label {
            font-weight: bold;
            color: #666;
            width: 35%;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        table.info-table td.value {
            color: #333;
            font-size: 15px;
        }
        
        .horario-item {
            display: table;
            width: 100%;
            margin-bottom: 12px;
        }
        
        .horario-item .fecha {
            display: table-cell;  
            background-color: #667eea;
            color: white;
            padding: 6px 10px;
            border-radius: 8px 8px 0px 0px;
            text-align: center;
            width: 120px;
            font-weight: bold;
            vertical-align: middle;
            font-size: 16px;
        }
        
        .horario-item .hora {
            display: table-cell;
            background-color: #e8ecff;
            color: #667eea;
            padding: 15px;
            border-radius: 0px 8px 8px 8px;
            font-weight: bold;
            font-size: 16px;
            vertical-align: middle;
            padding-left: 20px;
        }
        
        .hora small {
            font-size: 13px;
            color: #666;
            font-weight: normal;
            display: block;
            margin-top: 5px;
        }
        
        .pedido-resumen {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-top: 15px;
        }
        
        .pedido-item {
            padding: 12px 0;
            border-bottom: 1px dashed #ddd;
        }
        
        .pedido-item:last-child {
            border-bottom: none;
        }
        
        .pedido-item table {
            width: 100%;
        }
        
        .pedido-item .concepto {
            text-align: left;
        }
        
        .pedido-item .cantidad {
            width: 80px;
            text-align: center;
            color: #666;
        }
        
        .pedido-item .precio {
            width: 100px;
            text-align: right;
            font-weight: bold;
        }
        
        .total-pedido {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
            margin-top: 20px;
        }
        
        .total-pedido .label-total {
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .total-pedido .monto-total {
            font-size: 36px;
            font-weight: bold;
        }
        
        .estado-badge {
            display: inline-block;
            padding: 6px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .estado-confirmada {
            background-color: #d4edda;
            color: #155724;
        }
        
        .estado-pendiente {
            background-color: #fff3cd;
            color: #856404;
        }
        
        .estado-cancelada {
            background-color: #f8d7da;
            color: #721c24;
        }
        
        .info-destacada {
            background-color: #fff3cd;
            border-left: 5px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        .info-destacada p {
            margin: 8px 0;
            color: #856404;
            font-size: 14px;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #999;
            font-size: 13px;
        }
        
        .footer p {
            margin: 8px 0;
        }
    </style>
</head>
<body>

<div class="logos-header">
    <img src="<?= esc('/reservalo2.0/images/logoFuenteDePiedraGrande.png') ?>" 
         alt="Escudo de Fuente de Piedra" 
         class="logo-izquierdo">
    <img src="<?= esc('/reservalo2.0/images/logo-reservalo-largo.png') ?>" 
         alt="Logo de la app reservalo" 
         class="logo-derecho">
    <div style="clear: both;"></div>
</div>
    <!-- Header Principal -->
    <div class="header-main">
        <h1>Confirmación de Reserva</h1>
        <div class="numero-reserva">Reserva #<?= $datos['numero_pedido'] ?></div>
    </div>
    
    <!-- Imagen de la Instalación -->
<div class="instalacion-imagen"
     style="background-image: url('<?= esc($baseUrl . 'images/' . $datos['reservas'][0]['imagen']) ?>');">
</div>
    
    <!-- Datos del Cliente -->
    <div class="seccion">
        <div class="seccion-header">
            <h2>Datos del Cliente</h2>
        </div>
        <div class="seccion-body">
            <table class="info-table">
                <tr>
                    <td class="label">Nombre</td>
                    <td class="value"><?= $datos['nombre_usuario'] ?></td>
                </tr>
                <tr>
                    <td class="label">Email</td>
                    <td class="value"><?= $datos['email_usuario'] ?></td>
                </tr>
                <tr>
                    <td class="label">Teléfono</td>
                    <td class="value"><?= $datos['telf_usuario'] ?></td>
                </tr>
            </table>
        </div>
    </div>
    
    <!-- Datos de la Instalación -->
    <div class="seccion">
        <div class="seccion-header">
            <h2>Datos de la Actividad</h2>
        </div>
        <div class="seccion-body">
            <table class="info-table">
                <tr>
                    <td class="label">Actividad</td>
                    <td class="value"><strong><?= $datos["reservas"][0]["nombre"] ?></strong></td>
                </tr>
                <tr>
                    <td class="label">Lugar</td>
                    <td class="value"><?= $datos["reservas"][0]["lugar"] ?></td>
                </tr>
                <tr>
                    <td class="label">Fecha de la actividad</td>
                    <td class="value"><?= date('d/m/Y', strtotime($datos["reservas"][0]["fecha_actividad"])) ?></td>
                </tr>
                <tr>
                    <td class="label">Hora actividad</td>
                    <td class="value"><?= substr($datos["reservas"][0]["hora_actividad"], 0, 5) ?></td>
                </tr>
                <tr>
                    <td class="label">Duración de la actividad</td>
                    <td class="value"><?= substr($datos["reservas"][0]["duracion"], 0, 5) ?></td>
                </tr>
                
                <?php if (!empty($datos["reservas"][0]["descripcion"])): ?>
                <tr>
                    <td class="label">Descripción</td>
                    <td class="value"><?= $datos["reservas"][0]["descripcion"] ?></td>
                </tr>
                <?php endif; ?>
            </table>
        </div>
    </div>

    
    <!-- Resumen del Pedido -->
    <div class="seccion">
        <div class="seccion-header">
            <h2>Resumen del Pedido</h2>
        </div>
        <div class="seccion-body">
            <table class="info-table" style="margin-bottom: 15px;">
                <tr>
                    <td class="label">Fecha de reserva</td>
                    <td class="value"><?= date('d/m/Y H:i:s', strtotime($datos["fecha_pedido"])); ?></td>
                </tr>
                <tr>
                    <td class="label">Plazas seleccionadas</td>
                    <td class="value"><?= ($datos["reservas"][0]["plazas_reserva"]); ?></td>
                </tr>
                <tr>
                    <td class="label">Método de pago</td>
                    <td class="value">Pago en efectivo en la instalación o Ayuntamiento</td>
                </tr>
            </table>
            
            <div class="pedido-resumen">
         
                    <div class="pedido-item">
                        <table>
                            <tr>
                                <td class="concepto">Inscripción a la actividad: <strong><?= $datos["reservas"][0]["nombre"] ?></strong></td>
                                <td class="cantidad">x<?= intval($datos["reservas"][0]["plazas_reserva"]) ?></td>
                                <td class="precio"><?= number_format($datos['reservas'][0]["precio"], 2) ?>€</td>
                            </tr>
                        </table>
            </div>
            
            <div class="total-pedido">
                <div class="label-total">TOTAL A PAGAR</div>
                <div class="monto-total"><?= number_format($datos['reservas'][0]["precio_reserva"], 2) ?>€</div>
            </div>
        </div>
    </div>
    
    <!-- Información adicional -->
    <div class="info-destacada">
       
        <p><strong>Condiciones:</strong> Les rogamos que si desean cancelar la inscripción a la actividad lo hagan de unas 12 a 24h de antelación para poder suplir dicha reserva. Gracias</p>
        
    </div>
    
    
    <!-- Footer -->
    <div class="footer">
        <p><strong>¡Gracias por tu reserva!</strong></p>
        <p>Documento generado el <?= date('d/m/Y H:i:s', strtotime($datos["fecha_pedido"])); ?></p>
        <p>Para cualquier consulta, contacta con nosotros</p>
        <p>
                Tel: 952 73 50 16 | 
                Email: info@fuentedepiedra.es | 
                Dirección: C/ Ancha, 9. 29520. Fuente de Piedra
                
        </p>
      
        <p style="margin-top: 10px; font-size: 11px;">www.reservalo.com</p>

    </div>
</body>
</html>