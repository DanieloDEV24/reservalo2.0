$(document).ready(() => {

    $(document).on('click', '#btnMisReservas', function(e){
        e.preventDefault();
        e.stopPropagation(); // Evita que el evento suba al dropdown
        
        $('.dropdown-menu').removeClass('show');
        $('.dropdown-toggle').removeClass('show');
    
       $.ajax({
        type: "GET",
        url: "../misReservas",
        dataType: "JSON",
        success: function (response) {
            if(response.success === true){

                // Limpiar lista de reservas antes de agregar nuevas
                $('#modalMisReservas .reservas-list').empty();

                let pedido;
                let reservasPorPedido = {};
                
                // Agrupar reservas por pedido
                response.reservas.forEach(reserva => {
                    if (!reservasPorPedido[reserva.id_pedido]) {
                        reservasPorPedido[reserva.id_pedido] = {
                            info: reserva,
                            dias: {}
                        };
                    }
                    
                    // Agrupar por fecha si es tipo_reserva == 0
                    if (reserva.tipo_reserva == 0) {
                        if (!reservasPorPedido[reserva.id_pedido].dias[reserva.fecha]) {
                            reservasPorPedido[reserva.id_pedido].dias[reserva.fecha] = [];
                        }
                        reservasPorPedido[reserva.id_pedido].dias[reserva.fecha].push({
                            hora_inicio: reserva.hora_inicio.slice(0,5),
                            hora_final: reserva.hora_final.slice(0,5)
                        });
                    }
                });

                // Generar HTML para cada pedido
                Object.keys(reservasPorPedido).forEach(idPedido => {
                    const pedidoData = reservasPorPedido[idPedido];
                    const reserva = pedidoData.info;
                    
                    // Calcular totales si es tipo_reserva == 0
                    let totalHoras = 0;
                    let totalDias = 0;
                    let diasHTML = '';
                    
                    if (reserva.tipo_reserva == 0) {
                        totalDias = Object.keys(pedidoData.dias).length;
                        
                        Object.keys(pedidoData.dias).forEach(fecha => {
                            const franjas = pedidoData.dias[fecha];
                            const horasDelDia = franjas.length;
                            totalHoras += horasDelDia;
                            
                            const fechaObj = new Date(fecha);
                            const dia = fechaObj.getDate();
                            const mes = fechaObj.toLocaleDateString('es-ES', { month: 'short' }).substring(0, 3).toUpperCase();
                            const nombreDia = fechaObj.toLocaleDateString('es-ES', { weekday: 'long' });
                            const fechaCompleta = formatearFecha(fecha);
                            
                            // Generar franjas horarias
                            let franjasHTML = franjas.map(franja => `
                                <div class="franja-horaria">
                                    <span class="franja-horaria-icon">⏰</span>
                                    <span>${franja.hora_inicio} - ${franja.hora_final}</span>
                                </div>
                            `).join('');
                            
                            diasHTML += `
                                <div class="dia-card">
                                    <div class="dia-header">
                                        <div class="dia-fecha-info">
                                            <div class="dia-fecha-icon">
                                                <div class="dia-fecha-icon-mes">${mes}</div>
                                                <div class="dia-fecha-icon-dia">${dia}</div>
                                            </div>
                                            <div class="dia-fecha-text">
                                                <div class="dia-fecha-completa">${capitalizar(nombreDia)}, ${fechaCompleta}</div>
                                                <div class="dia-nombre">Reserva</div>
                                            </div>
                                        </div>
                                        <div class="dia-horas-count">
                                            <span>⏰</span>
                                            <span>${horasDelDia} ${horasDelDia === 1 ? 'hora' : 'horas'}</span>
                                        </div>
                                    </div>
                                    <div class="dia-franjas">
                                        ${franjasHTML}
                                    </div>
                                </div>
                            `;
                        });
                    }

                    let div = $(`<div class="reserva-card">
                               
                               <div class="reserva-image-container" style="background-image: url('${response.baseUrl}images/${reserva.imagen1}')">
                               </div>

                               <div class="reserva-content">
                                  <div class="reserva-header">
                                      <div class="reserva-info">
                                          <h3 class="reserva-instalacion">${reserva.nombre_pista}</h3>
                                          <span class="reserva-tipo">${reserva.categoria}</span>
                                      </div>
                                  </div>

                                  <div class="reserva-detalles">
                                    ${(reserva.tipo_reserva == 1) ? `
                                    <div class="detalle-item">
                                       <div class="detalle-icon">📅</div>
                                       <div class="detalle-content">
                                          <div class="detalle-label">Fecha</div>
                                          <div class="detalle-value">${formatearFecha(response.reservas[0].fecha) + " → " + formatearFecha(response.reservas[response.reservas.length - 1].fecha)}</div>
                                        </div>
                                    </div>

                                    <div class="detalle-item">
                                       <div class="detalle-icon">🕐</div>
                                       <div class="detalle-content">
                                          <div class="detalle-label">Hora</div>
                                          <div class="detalle-value">La reserva es del día completo</div>
                                        </div>
                                    </div>
                                    ` : ''}
                                    
                                    ${(reserva.tipo_reserva == 0) ? `
                                    <div class="detalle-item">
                                       <div class="detalle-icon">📅</div>
                                       <div class="detalle-content">
                                          <div class="detalle-label">Período</div>
                                          <div class="detalle-value">${formatearFechaPeriodo(Object.keys(pedidoData.dias))}</div>
                                        </div>
                                    </div>
                                    ` : ''}

                                    <div class="detalle-item">
                                       <div class="detalle-icon">👥</div>
                                       <div class="detalle-content">
                                           <div class="detalle-label">Capacidad</div>
                                           <div class="detalle-value">${reserva.capacidad_pista} personas</div>
                                       </div>
                                    </div>

                                    <div class="detalle-item">
                                       <div class="detalle-icon">💰</div>
                                       <div class="detalle-content">
                                           <div class="detalle-label">Precio</div>
                                           <div class="detalle-value">${reserva.precio_pedido} €</div>
                                        </div>
                                    </div>
                                  </div>

                                  ${(reserva.tipo_reserva == 0) ? `
                                  <div class="dias-horarios-section">
                                      <div class="dias-horarios-header">
                                          <div class="dias-horarios-title">
                                              <div class="dias-horarios-title-icon">📆</div>
                                              <span>Días y Horarios</span>
                                          </div>
                                          <div class="total-horas-badge">
                                              <span>⏱️</span>
                                              <span>Total: ${totalHoras} ${totalHoras === 1 ? 'hora' : 'horas'} en ${totalDias} ${totalDias === 1 ? 'día' : 'días'}</span>
                                          </div>
                                      </div>

                                      <div class="dias-container">
                                          ${diasHTML}
                                      </div>
                                  </div>
                                  ` : ''}
                               </div>

                               <div class="reserva-actions">
                                    <button class="btn btn-danger btn-anular-reserva" data-pedido="${reserva.id_pedido}">Anular</button>
                                </div>
                            </div>`);

                        $('#modalMisReservas .reservas-list').append(div);
                });

                $('#modalMisReservas').modal('show');
            }
        }
       });
    });

    function formatearFecha(fechaStr) {
        const d = new Date(fechaStr);
        return d.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    function formatearFechaPeriodo(fechas) {
        if (fechas.length === 1) {
            return formatearFecha(fechas[0]);
        }
        // Ordenar fechas
        fechas.sort();
        const primera = formatearFecha(fechas[0]);
        const ultima = formatearFecha(fechas[fechas.length - 1]);
        return `${primera} → ${ultima}`;
    }

    function capitalizar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});