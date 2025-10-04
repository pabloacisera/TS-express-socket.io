// Archivo clientForm.js
import { getData, deleteData } from './helpers/sessionHelpers.js';

// ** 1. Función para llenar los inputs **
function fillClientForm() {
    // Intentar obtener y parsear los datos
    let dataClientsSaved = getData('clientSelected');

    if (!dataClientsSaved) {
        console.log('No hay datos de cliente guardados en sesión.');
        return;
    }

    try {
        const data = JSON.parse(dataClientsSaved);

        console.log('Cliente en sesión (para llenar): ', data);

        // Iterar sobre las claves del objeto de datos (name, cuit, address, etc.)
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                // Selecciona el input dentro del formulario #client-form
                // cuyo atributo 'name' coincida con la clave
                const selector = `#client-form input[name="${key}"]`;

                // Rellena el input con el valor correspondiente
                $(selector).val(data[key]);
            }
        }

    } catch (e) {
        console.error("Error al parsear datos de sesión al intentar llenar el formulario: ", e);
    }
}


// ** 2. Manejo de Submit (Delegación - ¡Muy Importante!) **
// Usamos delegación para manejar el formulario DINÁMICO
$(function() {
    $( document ).on( 'submit', '#client-form', function( event ) {
        event.preventDefault( );
        alert('Formulario de cliente enviado');
        // Tu lógica de envío de datos
    });


    // resetar formulario
    $( document ).on( 'click', '.btn-reset-warning', function( ) {
        deleteData( 'clientSelected' );

        window.location.href= '/home';
    });
});


// ** 3. Exportar la función para ser llamada **
export { fillClientForm };
