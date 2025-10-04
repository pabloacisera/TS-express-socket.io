// /assets/js/home.js

// Función para cargar el contenido de un template
export function loadTemplate(templateId) {
    // 1. Limpia el contenedor actual
    $('#templates-content').empty();

    // 2. Selecciona el elemento <template> usando su ID
    const templateElement = $(templateId);

    // 3. Clona el contenido real (el DOM dentro del template)
    const templateContent = templateElement.get(0).content;
    const clonedContent = $(templateContent).clone();

    // 4. Agrega el contenido clonado al contenedor
    $('#templates-content').append(clonedContent);
}


$(function () {
    // Inicializa la página cargando el template de cliente por defecto
    loadTemplate('#add-client-temp');
    $('#add-client').addClass('select'); // Y establece el botón de cliente como activo

    // --- Click en "cargar cliente" ---
    $('#add-client').click(function () {

        // Colocar la clase .select
        $('.add-product').removeClass('select');
        $(this).addClass('select'); // Usamos $(this) para referirnos al botón clickeado

        // Cargar el template de cliente
        loadTemplate('#add-client-temp');
    });


    // --- Click en "cargar producto" ---
    $('#add-product').click(function () {

        // Colocar la clase .select
        $('.add-client').removeClass('select');
        $(this).addClass('select');

        // Cargar el template de producto
        loadTemplate('#add-product-temp');
    });

    // funcionalidad de busqueda
    $(document).on( 'click', '#search-client', function() {
        $( '#client-search-modal' ).fadeIn( 350 );
    });

});
