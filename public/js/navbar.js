$(function() {
    // Solo para dar feedback visual inmediato al hacer click
    // El estado persistente lo maneja el backend con currentPage

    $('.nav-list .nav-item').click(function(e) {
        // Feedback visual inmediato
        $('.nav-list .nav-item').removeClass('active');
        $(this).addClass('active');

        console.log('Navegando a:', $(this).text());

        // La navegación real la hace el enlace <a>
        // No necesitamos prevenir el comportamiento por defecto
    });
});
