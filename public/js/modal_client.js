import { saveData } from "./helpers/sessionHelpers.js";

// Acceder directamente a la variable global definida en el script block
let clients = window.ALL_CLIENTS || [];

// cerrar el modal y limpiar campos
export function closeModalClient() {
    // 1. Limpia el input de búsqueda
    $('#modal-search-input').val("");

    // 2. Limpia el área de resultados y restaura el mensaje inicial
    $('#search-results-table').html('<p>Comienza a escribir para ver los resultados.</p>');

    // 3. Oculta el modal
    $('#client-search-modal').fadeOut(350);
}

// Función para renderizar los resultados en la tabla
const renderResults = (results, container) => {
    // 1. Limpia los resultados anteriores
    container.empty();

    if (results.length === 0) {
        container.append('<p>No se encontraron clientes con esos datos.</p>');
        return;
    }

    // 2. Crea la tabla o lista de resultados (ejemplo con una lista simple)
    const ul = $('<ul></ul>').addClass('client-results-list');

    results.forEach(client => {
        // Asume que cada cliente tiene 'id', 'name', 'cuit', 'email'
        const li = $(`<li>
            <input type="checkbox" class="client-select-check"/>
            <strong>${client.name}</strong>
            (CUIT: ${client.cuit})
            <small>${client.email}</small>
        </li>`);

        // buscar checkbox y escuchar el click
        li.find( '.client-select-check' ).on( 'click', function( ){

            saveData( 'clientSelected', client )

            setTimeout( ()=> {
                window.location.href = '/home';
            }, 2000 );

        } )

        // Opcional: añade un atributo de datos para identificar el cliente si es seleccionado
        li.data('client-id', client.id);
        ul.append(li);
    });

    container.append(ul);
};


$(function () {

    console.log('clientes cargados: ', clients);

    // Usamos .on('input') para una búsqueda flexible
    $('#modal-search-input').on('input', function () {

        let resultElement = $('#search-results-table');
        let searchTerm = $(this).val().trim();

        // Si el campo está vacío, limpiar y salir
        if (searchTerm.length === 0) {
            resultElement.html('<p>Comienza a escribir para ver los resultados.</p>');
            return;
        }

        // Convertir a minúsculas para una búsqueda sin distinción
        const lowerSearchTerm = searchTerm.toLowerCase();

        // Aplicar el filtro con la corrección y la lógica de inclusión
        let termFound = clients.filter(c => {
            // Convierte todos los campos a minúsculas antes de buscar
            const name = c.name ? c.name.toLowerCase() : '';
            const cuit = c.cuit ? c.cuit.toLowerCase() : '';
            const email = c.email ? c.email.toLowerCase() : '';

            // Usamos .includes() para ver si el término está contenido en el campo
            return name.includes(lowerSearchTerm) ||
                cuit.includes(lowerSearchTerm) || // CUIT a menudo es más estricto, pero includes funciona
                email.includes(lowerSearchTerm);
        });

        // Llamar a la función que renderiza los resultados
        renderResults(termFound, resultElement);
    });

    // cerrar modal
    $('.close-modal-btn').click(function () {

        closeModalClient( );
    });


})
