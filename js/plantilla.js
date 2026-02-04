$(document).ready(() => {

    $(document).on('click', '#btnMisReservas', function(e){
        e.preventDefault();
        e.stopPropagation(); // Evita que el evento suba al dropdownn
        
        $('.dropdown-menu').removeClass('show');
        $('.dropdown-toggle').removeClass('show');
    
       $.ajax({
        type: "GET",
        url: "../misReservas",
        dataType: "JSON",
        success: function (response) {
            if(response.success === true){

                let pedido
                response.reservas.map(reserva => {

                    if (pedido !== reserva.id_pedido) {

                        pedido = reserva.id_pedido;

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

                                        <div class="detalle-item">
                                           <div class="detalle-icon">📅</div>
                                           <div class="detalle-content">
                                              <div class="detalle-label">Fecha</div>
                                              <div class="detalle-value">${(parseInt(reserva.tipo_reserva) === 1) ? fornatearFecha(response.reservas[0].fecha) + " → " + fornatearFecha(response.reservas[response.reservas.length - 1].fecha) : fornatearFecha(reserva.fecha) }</div>
                                            </div>
                                        </div>

                                        <div class="detalle-item">
                                           <div class="detalle-icon">🕐</div>
                                           <div class="detalle-content">
                                              <div class="detalle-label">Fecha</div>
                                              <div class="detalle-value">${(parseInt(reserva.tipo_reserva) === 1) ? fornatearFecha(response.reservas[0].fecha) + " → " + fornatearFecha(response.reservas[response.reservas.length - 1].fecha) : fornatearFecha(reserva.fecha) }</div>
                                            </div>
                                        </div>

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
                                   </div>

                                   <div class="reserva-actions">
                                        <button class="btn btn-secondary">Ver Detalles</button>
                                        <button class="btn btn-primary">Modificar</button>
                                        <button class="btn btn-danger">Cancelar</button>
                                    </div>
                                </div>`);

                            $('#modalMisReservas .reservas-list').append(div);
                    }
                })

                $('#modalMisReservas').modal('show');
            }
        }
       });
    })


    function fornatearFecha(fechaStr) {
        const d = new Date(fechaStr);
            return d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
})