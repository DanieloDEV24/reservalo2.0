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
            margin-bottom: 30px;
            text-align: center;
        }
        
        .instalacion-imagen img {
            width: 100%;
            max-height: 300px;
            object-fit: cover;
            border-radius: 10px;
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
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            width: 120px;
            font-weight: bold;
            vertical-align: middle;
        }
        
        .horario-item .hora {
            display: table-cell;
            background-color: #e8ecff;
            color: #667eea;
            padding: 15px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            vertical-align: middle;
            padding-left: 20px;
        }
        
        .hora small {
            font-size: 12px;
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
    <!-- Header Principal -->
    <div class="header-main">
        <h1>Confirmación de Reserva</h1>
        <div class="numero-reserva">Reserva #<?= $datos['numero_pedido'] ?></div>
    </div>
    
    <!-- Imagen de la Instalación -->
    <div class="instalacion-imagen">
        <?php if (!empty($datos['reservas'][0]['imagen1'])): ?>
            <img src="<?=$baseUrl?>images/<?= $datos['reservas'][0]['imagen1'] ?>" alt="Imagen de la instalación">
        <?php else: ?>
            <div style="background-color: #e0e0e0; height: 250px; text-align: center; padding-top: 110px; border-radius: 10px;">
                <p style="color: #999; font-size: 16px;">Imagen no disponible</p>
            </div>
        <?php endif; ?>
    </div>
    
    <!-- Datos del Cliente -->
    <div class="seccion">
        <div class="seccion-header">
            <h2>👤 Datos del Cliente</h2>
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
            <h2>🏢 Datos de la Instalación</h2>
        </div>
        <div class="seccion-body">
            <table class="info-table">
                <tr>
                    <td class="label">Instalación</td>
                    <td class="value"><strong><?= $datos["reservas"][0]["nombre"] ?></strong></td>
                </tr>
                <tr>
                    <td class="label">Direccion</td>
                    <td class="value"><?= $datos["reservas"][0]["direccion"] ?></td>
                </tr>
                <tr>
                    <td class="label">Pista</td>
                    <td class="value"><?= $datos["reservas"][0]["nombre_pista"] ?></td>
                </tr>
                <tr>
                    <td class="label">Capacidad</td>
                    <td class="value"><?= $datos["reservas"][0]["capacidad_pista"] ?> personas</td>
                </tr>
                <tr>
                    <td class="label">Material</td>
                    <td class="value"><?= ($datos["reservas"][0]["material"]) ? '✅' : '❌' ?></td>
                </tr>
                <tr>
                    <td class="label">Capacidad</td>
                    <td class="value"><?= ($datos["reservas"][0]["iluminacion"]) ? '✅' : '❌' ?></td>
                </tr>
                <?php if (!empty($reserva['instalacion_descripcion'])): ?>
                <tr>
                    <td class="label">Descripción</td>
                    <td class="value"><?= $reserva['instalacion_descripcion'] ?></td>
                </tr>
                <?php endif; ?>
            </table>
        </div>
    </div>
    
    <!-- Horarios Reservados -->
    <div class="seccion">
        <div class="seccion-header">
            <h2>🕐 Horarios Reservados</h2>
        </div>
        <div class="seccion-body">
            <?php foreach ($datos["reservas"] as $horario): ?>
            <div class="horario-item">
                <div class="fecha">
                    <?= date('d/m/Y', strtotime($horario['fecha_reserva'])) ?><br>
                    <span style="font-size: 12px; font-weight: normal;">
                        <?= strftime('%A', strtotime($horario['fecha_reserva'])) ?>
                    </span>
                </div>
                <div class="hora">
                    <?= $horario['hora_inicio'] ?> - <?= $horario['hora_final'] ?>
                    <small>Duración: 1h</small>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
    
    <!-- Resumen del Pedido -->
    <div class="seccion">
        <div class="seccion-header">
            <h2>🧾 Resumen del Pedido</h2>
        </div>
        <div class="seccion-body">
            <table class="info-table" style="margin-bottom: 15px;">
                <tr>
                    <td class="label">Fecha de reserva</td>
                    <td class="value"><?= date('d/m/Y H:i', strtotime($reserva['fecha_creacion'])) ?></td>
                </tr>
                <tr>
                    <td class="label">Método de pago</td>
                    <td class="value"><?= $reserva['metodo_pago'] ?></td>
                </tr>
            </table>
            
            <div class="pedido-resumen">
                <?php foreach ($reserva['conceptos'] as $concepto): ?>
                <div class="pedido-item">
                    <table>
                        <tr>
                            <td class="concepto"><?= $concepto['descripcion'] ?></td>
                            <td class="cantidad">x<?= $concepto['cantidad'] ?></td>
                            <td class="precio"><?= number_format($concepto['precio'], 2) ?>€</td>
                        </tr>
                    </table>
                </div>
                <?php endforeach; ?>
                
                <?php if (!empty($reserva['descuento']) && $reserva['descuento'] > 0): ?>
                <div class="pedido-item" style="color: #28a745;">
                    <table>
                        <tr>
                            <td class="concepto">Descuento aplicado</td>
                            <td class="cantidad"></td>
                            <td class="precio">-<?= number_format($reserva['descuento'], 2) ?>€</td>
                        </tr>
                    </table>
                </div>
                <?php endif; ?>
                
                <div class="pedido-item" style="font-size: 14px; color: #666; border-top: 2px solid #ddd; padding-top: 12px; margin-top: 8px;">
                    <table>
                        <tr>
                            <td class="concepto">Subtotal</td>
                            <td class="cantidad"></td>
                            <td class="precio"><?= number_format($reserva['subtotal'], 2) ?>€</td>
                        </tr>
                    </table>
                </div>
                
                <?php if (!empty($reserva['iva']) && $reserva['iva'] > 0): ?>
                <div class="pedido-item" style="font-size: 13px; color: #666;">
                    <table>
                        <tr>
                            <td class="concepto">IVA (<?= $reserva['porcentaje_iva'] ?>%)</td>
                            <td class="cantidad"></td>
                            <td class="precio"><?= number_format($reserva['iva'], 2) ?>€</td>
                        </tr>
                    </table>
                </div>
                <?php endif; ?>
            </div>
            
            <div class="total-pedido">
                <div class="label-total">TOTAL A PAGAR</div>
                <div class="monto-total"><?= number_format($reserva['total'], 2) ?>€</div>
            </div>
        </div>
    </div>
    
    <!-- Información adicional -->
    <?php if (!empty($reserva['notas']) || !empty($reserva['condiciones'])): ?>
    <div class="info-destacada">
        <?php if (!empty($reserva['notas'])): ?>
        <p><strong>📌 Notas importantes:</strong> <?= $reserva['notas'] ?></p>
        <?php endif; ?>
        <?php if (!empty($reserva['condiciones'])): ?>
        <p><strong>📋 Condiciones:</strong> <?= $reserva['condiciones'] ?></p>
        <?php endif; ?>
    </div>
    <?php endif; ?>
    
    <!-- Footer -->
    <div class="footer">
        <p><strong>¡Gracias por tu reserva!</strong></p>
        <p>Documento generado el <?= date('d/m/Y H:i:s') ?></p>
        <p>Para cualquier consulta, contacta con nosotros</p>
        <?php if (!empty($reserva['empresa_telefono']) || !empty($reserva['empresa_email'])): ?>
        <p>
            <?php if (!empty($reserva['empresa_telefono'])): ?>
                Tel: <?= $reserva['empresa_telefono'] ?>
            <?php endif; ?>
            <?php if (!empty($reserva['empresa_email'])): ?>
                <?php if (!empty($reserva['empresa_telefono'])): ?> | <?php endif; ?>
                Email: <?= $reserva['empresa_email'] ?>
            <?php endif; ?>
        </p>
        <?php endif; ?>
        <?php if (!empty($reserva['empresa_web'])): ?>
        <p style="margin-top: 10px; font-size: 11px;"><?= $reserva['empresa_web'] ?></p>
        <?php endif; ?>
    </div>
</body>
</html>