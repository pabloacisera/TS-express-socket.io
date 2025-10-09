import { getData, saveData, deleteData } from './helpers/sessionHelpers.js';

$(function () {
    let inputClientValue = $('#clientSearchTerm');
    let result = $('.client-result-search');
    let dataClients = JSON.parse(document.getElementById('client-data').textContent);

    function findTerm(term) {
        return dataClients.filter(t =>
            t.name.toLowerCase().includes(term) ||
            t.cuit.toLowerCase().includes(term) ||
            t.email.toLowerCase().includes(term)
        );
    }

    function displayResults(data) {
        result.empty();

        if (data.length === 0) {
            return;
        }

        let ul = $('<ul></ul>');

        data.forEach(d => {
            ul.append(`
            <li class="selected-container" data-client-id="${d.id}">
                <div class="info">
                    (${d.cuit}) ${d.name} - ${d.email} 
                </div>
                <div class="select-action">
                    <button type="button" class="add-client-btn">add</button>
                </div>
            </li>
        `);
        })

        result.append(ul);
    }

    // Evento delegado FUERA de displayResults (solo una vez)
    result.on('click', '.add-client-btn', function () {
        let clientId = $(this).closest('.selected-container').data('client-id');

        // Obtener datos completos del cliente
        let clientData = dataClients.find(c => c.id === clientId);
        console.log('Datos completos:', clientData);

        if(!getData('selectedClients')) {
            saveData('selectedClients', clientData);
        } else {
            deleteData('selectedClients')
            saveData('selectedClients', clientData);
        }
        
        result.empty();
        inputClientValue.val("")

        // cerrar modal
        window.location.reload();
    });

    inputClientValue.on('input', function () {
        let term = $(this).val().trim().toLowerCase();

        // Si está vacío, limpiar resultados y salir
        if (term === '') {
            result.empty();
            return;
        }

        let found = findTerm(term);
        displayResults(found);
    });
});