document.addEventListener('DOMContentLoaded', function () {

  $.ajax({
    type: 'GET',
    url: `${BASE_URL}index.php/reservasMes`,
    dataType: "JSON",
    success: function (response) {

      if (response.success) {
        new Chart(document.getElementById('grafico-reservas'), {
          type: 'bar',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
              label: 'Reservas',
              data: response.reservas,
              backgroundColor: '#2DD4BF'
            }]
          },
          options: {
            animations: {
              x: {
                duration: 800,
                easing: 'easeOutQuart'
              },
              y: {
                duration: 800
              }
            },
            transitions: {
              hide: {
                animations: {
                  x: {
                    to: 0,
                    duration: 500
                  },
                  y: {
                    to: 0,
                    duration: 500
                  }
                }
              }
            }
          }
        });

      }
    }
  });

  $.ajax({
    type: "GET",
    url: `${BASE_URL}index.php/reservasCategoria`,
    dataType: "JSON",
    success: function (response) {

      if (response.success) {
        new Chart(document.getElementById('chartDonut'), {
          type: 'doughnut',
          data: {
            labels: response.categorias,
            datasets: [{ data: response.reservas, backgroundColor: getColors(response.reservas.length), borderWidth: 0, hoverOffset: 6 }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#64748b',
                  font: { size: 12 },
                  padding: 16
                }
              }
            },

            cutout: '68%',

            animation: {
              animateRotate: true,
              animateScale: true,
              duration: 1200
            }
          }
        });
      }
    }
  });

  $(document).on('click', '.tabla-actividad-reciente i', function () {

    $('#modalActividadReciente').modal('show');

  })

  function getColors(n) {
    return Array.from({ length: n }, (_, i) => {
      const hue = Math.round(170 + ((190 - 170) / Math.max(n - 1, 1)) * i);
      const saturation = Math.round(60 + ((80 - 60) / Math.max(n - 1, 1)) * i);
      const lightness = Math.round(50 - (20 / Math.max(n - 1, 1)) * i); // de más claro a más oscuro
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });
  }

});

