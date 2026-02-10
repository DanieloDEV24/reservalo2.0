// Mini Calendar Implementation
let currentDate = new Date(2026, 1, 10); // Febrero 10, 2026
let selectedDate = new Date(2026, 1, 10);
let currentMonth = 1; // Febrero (0-indexed)
let currentYear = 2026;

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// Días con reservas (ejemplo)
const daysWithReservations = [5, 8, 10, 12, 15, 18, 20, 22, 25];

$(document).ready(function () {
    const $calendarTrigger = $('#calendarTrigger');
    const $miniCalendar = $('#miniCalendar');
    const $calendarDays = $('#calendarDays');
    const $calendarMonth = $('#calendarMonth');
    const $selectedDateSpan = $('#selectedDate');
    const $prevMonthBtn = $('#prevMonth');
    const $nextMonthBtn = $('#nextMonth');

    // Toggle calendar
    $calendarTrigger.on('click', function (e) {
        e.stopPropagation();
        $miniCalendar.toggleClass('show');
        $calendarTrigger.toggleClass('active');
    });

    // Close calendar when clicking outside
    $(document).on('click', function (e) {
        if (!$miniCalendar.is(e.target) && $miniCalendar.has(e.target).length === 0 &&
            !$calendarTrigger.is(e.target) && $calendarTrigger.has(e.target).length === 0) {
            $miniCalendar.removeClass('show');
            $calendarTrigger.removeClass('active');
        }
    });

    // Prevent calendar from closing when clicking inside it
    $miniCalendar.on('click', function (e) {
        e.stopPropagation();
    });

    // Navigation
    $prevMonthBtn.on('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    $nextMonthBtn.on('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    function renderCalendar() {
        $calendarDays.empty();
        $calendarMonth.text(`${monthNames[currentMonth]} ${currentYear}`);

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const prevLastDay = new Date(currentYear, currentMonth, 0);

        const firstDayWeekday = firstDay.getDay() === 0 ? 7 : firstDay.getDay(); // Monday = 1
        const lastDayDate = lastDay.getDate();
        const prevLastDayDate = prevLastDay.getDate();
        const today = new Date();

        // Previous month days
        for (let i = firstDayWeekday - 1; i > 0; i--) {
            const $dayBtn = $('<button>')
                .addClass('calendar-day other-month disabled')
                .text(prevLastDayDate - i + 1);
            $calendarDays.append($dayBtn);
        }

        // Current month days
        for (let day = 1; day <= lastDayDate; day++) {
            const $dayBtn = $('<button>')
                .addClass('calendar-day')
                .text(day);

            // Today
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                $dayBtn.addClass('today');
            }

            // Selected
            if (day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()) {
                $dayBtn.addClass('selected');
            }

            // Days with reservations
            if (currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()) {
                if (daysWithReservations.includes(day)) {
                    $dayBtn.addClass('has-reservations');
                }
            }

            // Click handler
            $dayBtn.on('click', function () {
                selectDate(day);
            });

            $calendarDays.append($dayBtn);
        }

        // Next month days to complete the grid
        const totalCells = $calendarDays.children().length;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 1; i <= remainingCells; i++) {
            const $dayBtn = $('<button>')
                .addClass('calendar-day other-month disabled')
                .text(i);
            $calendarDays.append($dayBtn);
        }
    }

    function selectDate(day) {
        selectedDate = new Date(currentYear, currentMonth, day);

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        $selectedDateSpan.text(selectedDate.toLocaleDateString('es-ES', options));

        renderCalendar();

        $miniCalendar.removeClass('show');
        $calendarTrigger.removeClass('active');

        console.log('Fecha seleccionada:', selectedDate);
        // Aquí cargarías reservas de la nueva fecha
    }

    // Initial render
    renderCalendar();

    // Filter tabs
    $('.filter-tab').on('click', function () {
        $('.filter-tab').removeClass('active');
        $(this).addClass('active');
        console.log('Filtro seleccionado:', $(this).text());
    });

    // Action buttons
    $('.action-btn.edit').on('click', function () {
        alert('Editar reserva');
    });

    $('.action-btn.delete').on('click', function () {
        if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
            alert('Reserva cancelada');
        }
    });

    $('.action-btn.check').on('click', function () {
        alert('Asistencia marcada');
    });
});
