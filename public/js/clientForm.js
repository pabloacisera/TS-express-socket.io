// Archivo clientForm.js
import { getData, deleteData, saveData } from './helpers/sessionHelpers.js';
import { showConfirmModal } from './helpers/selectOption.js';
import { loadTemplate } from './helpers/loaderTemplates.js';

let formClientdata = []
let formProductData = []

// ** 1. Función para llenar los inputs **
function fillClientForm() {
    let dataClientsSaved = getData('clientSelected');

    if (!dataClientsSaved) {
        console.log('No hay datos de cliente guardados en sesión.');
        return;
    }

    try {
        const data = JSON.parse(dataClientsSaved);
        console.log('Cliente en sesión (para llenar): ', data);

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const selector = `#client-form input[name="${key}"]`;
                $(selector).val(data[key]);
            }
        }
    } catch (e) {
        console.error("Error al parsear datos de sesión al intentar llenar el formulario: ", e);
    }
}

// ** 2. Manejo de Submit **
$(function() {
    let container = $('#templates-content'); // Cambio aquí: # en lugar de .

    $(document).on('submit', '#client-form', async function(event) {
        event.preventDefault();

        // Capturar los valores del formulario
        const formData = {
            name: $('#name').val(),
            cuit: $('#cuit').val(),
            address: $('#address').val(),
            phone: $('#phone').val(),
            email: $('#email').val()
        };

        console.log('Datos capturados del formulario:', formData);

        // Verificar si hay datos válidos (al menos nombre o cuit)
        if (!formData.name && !formData.cuit) {
            const continuar = await showConfirmModal("No se ha ingresado ningún dato de cliente. ¿Desea continuar de todas formas?");

            if (!continuar) {
                return; // No hacer nada, quedarse en el formulario
            }
        } else {
            // Guardar los datos si hay algo ingresado
            formClientdata.push(formData);
            saveData('clientSelected', JSON.stringify(formData));
            console.log('Cliente guardado:', formData);
        }

        // Cargar el siguiente template (productos)
        $('.add-client').removeClass('select');

        loadTemplate(container, '#add-product-temp'); // Cambio aquí: sin el punto extra
        $('.add-product').addClass('select');
    });

    // Resetear formulario
    $(document).on('click', '.btn-reset-warning', function() {
        deleteData('clientSelected');
        formClientdata = []; // Limpiar también el array
        window.location.href = '/home';
    });
});

// ** 3. Exportar la función **
export { fillClientForm };
