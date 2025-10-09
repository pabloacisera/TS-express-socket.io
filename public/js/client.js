import { getData, hasData } from './helpers/sessionHelpers.js';
import { verifyKeyExist } from './helpers/stepAccess.js';

// Verificar si NO existen productos (redirigir a productos)
if (!verifyKeyExist('selectedProducts')) {
    window.location.href = '/facturation/products';
}

$(function () {
    // 1. Elementos del DOM con los nuevos selectores específicos de CLIENTES
    const clientSearchInput = $('#clientSearchTermInput'); // Nuevo ID
    const clientModalOverlay = $('.client-modal-overlay'); // Clase del modal de clientes
    const clientCloseModal = $('.client-header-modal'); // Clase para el botón de cerrar del modal de clientes
    let clientsData = getData('selectedClients');

    if(hasData('selectedClients')) {
        $('#name').val(clientsData.name),
        $('#cuit').val(clientsData.cuit),
        $('#address').val(clientsData.address),
        $('#city').val(clientsData.city),
        $('#email').val(clientsData.email),
        $('#phone').val(clientsData.phone)
    } 

    // Verifica que existan los elementos (Opcional, pero buena práctica)
    if (clientSearchInput.length === 0 || clientModalOverlay.length === 0) {
        console.error('Elementos del modal de cliente no encontrados.');
        return;
    }

    /**
     * EVENTO CLICK - ABRIR MODAL DE CLIENTES
     */
    clientSearchInput.on('click', function () {
        console.log('Click en input de CLIENTES detectado'); // Ahora debería salir de client.js
        clientModalOverlay.addClass('active');
        // Opcional: enfocar el input de búsqueda dentro del modal
        $('#clientSearchTerm').focus();
    });

    /**
     * EVENTO CERRAR MODAL DE CLIENTES
     */
    clientCloseModal.on('click', function () {
        console.log('Cerrando modal de clientes');
        clientModalOverlay.removeClass('active');
        // Limpiar búsqueda si es necesario
        $('#clientSearchTerm').val(''); 
        $('.client-result-search').empty();
    });
});