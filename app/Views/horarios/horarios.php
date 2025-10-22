<div class="horario">
    <div class="titulo-horario">
        <h1 class="title-page">Horario <?= $instalacion["nombre"] ?></h1>
        <p class="description-page">Configura los horarios para la instalacion <?= $instalacion["nombre"] ?> para cada temporada del año.</p>
    </div>

    <div class="ano-horario">

        <div class="div-ano">
            <button>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <span id="anoActual">2025</span>
            <button>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>

            <div class="legend">
                <div class="legend-item">
                    <div class="legend-color color-selected"></div>
                    <span>Seleccionado</span>
                </div>

                <div class="legend-item">
                    <div class="legend-color color-cerrado"></div>
                    <span>Cerrado</span>
                </div>
            </div>
       

    </div>
</div>