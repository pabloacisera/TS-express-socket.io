import { showSpinner } from './helpers/spinner.js';

$(function() {
    // Escuchar clicks en los enlaces dentro de nav-list
    $(document).on('click', '.nav-list a', function(e) {
        e.preventDefault(); // Prevenir navegación inmediata

        const href = $(this).attr('href');
        console.log('Navegando a:', href);
        console.log('Items:', $('.nav-item'));

        // Aquí puedes agregar tu lógica (spinner, animaciones, etc.)
        showSpinner( 2500 );

        // Navegar después de un pequeño delay (si es necesario)
        setTimeout(() => {
            window.location.href = href;
        }, 100);
    });
});
