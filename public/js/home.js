// /assets/js/home.js
import { loadTemplate } from "./helpers/loaderTemplates.js";
import { fillClientForm } from "./clientForm.js";

let container = $('#templates-content')

$(function () {
    // Inicializa la página cargando el template de cliente por defecto
    loadTemplate(container, '#add-client-temp');
    fillClientForm( );
    $('#add-client').addClass('select'); // Y establece el botón de cliente como activo

    // --- Click en "cargar cliente" ---
    $('#add-client').click(function () {

        // Colocar la clase .select
        $('.add-product').removeClass('select');
        $(this).addClass('select'); // Usamos $(this) para referirnos al botón clickeado

        // Cargar el template de cliente
        loadTemplate(container, '#add-client-temp');
        fillClientForm( );
    });


    // --- Click en "cargar producto" ---
    $('#add-product').click(function () {

        // Colocar la clase .select
        $('.add-client').removeClass('select');
        $(this).addClass('select');

        // Cargar el template de producto
        loadTemplate(container, '#add-product-temp');
        fillClientForm( );
    });

    // funcionalidad de busqueda
    $(document).on( 'click', '#search-client', function() {
        $( '#client-search-modal' ).fadeIn( 350 );
    });

    // TODO: función resetear formulario

});
