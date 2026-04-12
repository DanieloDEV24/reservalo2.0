$(document).ready(function () {

    $(document).on('change', '#categorias-home', function(){

        let categoria = $('#categorias-home').val();
        let reservaCompleta = $('#reserva-completa-home').is(':checked');
        console.log(categoria)

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getInstalacionesCategoriaHome`,
            data: {categoria: categoria, reserva_completa: reservaCompleta},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#todas-instalaciones-home').empty();
                    
                    $('#todas-instalaciones-home').append($(`<option value="-1">Seleccione una</option>`))
                    response.instalaciones.map(function(i) {
                        $('#todas-instalaciones-home').append($(`<option value="${i.id_instalacion}">${i.nombre}</option>`))
                    })
                }
            }
        });
    })

    $(document).on('change', '#reserva-completa-home', function(){

        let categoria = $('#categorias-home').val();
        let reservaCompleta = $('#reserva-completa-home').is(':checked');
        console.log(categoria)

        $.ajax({
            type: "POST",
            url: `${BASE_URL}index.php/getInstalacionesCategoriaHome`,
            data: {categoria: categoria, reserva_completa: reservaCompleta},
            dataType: "JSON",
            success: function (response) {
                
                if(response.success == true) {

                    $('#todas-instalaciones-home').empty();
                    
                    $('#todas-instalaciones-home').append($(`<option value="-1">Seleccione una</option>`))
                    response.instalaciones.map(function(i) {
                        $('#todas-instalaciones-home').append($(`<option value="${i.id_instalacion}">${i.nombre}</option>`))
                    })
                }
            }
        });
    })

    $(document).on('click', '#busqueda-home', function(e){
        
        e.preventDefault();

        let instalacion = parseInt($('#todas-instalaciones-home').val());
        let categoria = parseInt($('#categorias-home').val());
        let reservaCompleta = $('#reserva-completa-home').is(':checked') ? 1 : 0;

        console.log($('#todas-instalaciones-home').find('option:selected').text())

        let params = new URLSearchParams();
        if (categoria !== -1)   params.set('categoria', categoria);
        if (instalacion !== -1) params.set('instalacion', $('#todas-instalaciones-home').find('option:selected').text());
        if (reservaCompleta)    params.set('reservaCompleta', reservaCompleta);

        window.location.href = `${BASE_URL}index.php/instalaciones?${params.toString()}`;
    })


    function construirCarousel() {

    const inner = document.getElementById("carousel-inner-instalaciones");

    // guardar cards originales
    const cards = Array.from(inner.querySelectorAll(".card-instalacion"));

    const indicators = document.getElementById("carousel-indicators-instalaciones");

    // limpiar carousel
    inner.innerHTML = "";

    // 👇 BREAKPOINT
    let cardsPorSlide
    if (window.innerWidth <= 969) {
        cardsPorSlide = 1;
    } 
    else if (window.innerWidth < 1350) {
        cardsPorSlide = 2;
    } 
    else {
        cardsPorSlide = 3;
    }

    let slideIndex = 0;
    indicators.innerHTML = ""; // limpiar indicadores
    for (let i = 0; i < cards.length; i += cardsPorSlide) {

        // slide
        let carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item";
        if (i === 0) carouselItem.classList.add("active");

        let wrapper = document.createElement("div");
        wrapper.className = "top-instalaciones d-flex justify-content-center gap-4";

        cards.slice(i, i + cardsPorSlide).forEach(card => {
            wrapper.appendChild(card);
        });

        carouselItem.appendChild(wrapper);
        inner.appendChild(carouselItem);

        // ✅ crear puntito
        let button = document.createElement("button");
        button.type = "button";
        button.setAttribute("data-bs-target", "#instalacionesCarousel");
        button.setAttribute("data-bs-slide-to", slideIndex);

        if (slideIndex === 0) {
            button.classList.add("active");
            button.setAttribute("aria-current", "true");
        }

        indicators.appendChild(button);

        slideIndex++;
    }
}

// construir al cargar
window.addEventListener("load", construirCarousel);

// reconstruir al cambiar tamaño
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(construirCarousel, 300);
});
})