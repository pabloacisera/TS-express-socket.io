import { getData, saveData } from './helpers/sessionHelpers.js';
import { initModal } from './acceptModal.js';
import { openToast } from './helpers/toastHelper.js'

function populateTable(data, target) {
    target.empty();

    // Validar antes de iterar
    if (!data || !data.products || data.products.length === 0) {
        target.html('<tr><td colspan="5" class="no-data">No hay productos seleccionados</td></tr>');
        return;
    }

    data.products.forEach(product => {
        let row = $(`
            <tr data-product-id="${product.id}">
              <td>${product.code}</td>
              <td>${product.name}</td>
              <td>${product.quantity}</td>
              <td>$${product.subtotal}</td>
              <td>
                <button type="button" class="btn-eliminate-product">eliminar</button>
              </td>
            </tr>
        `);
        target.append(row);
    });
}

export const deleteProductById = (key, productId) => {
    try {
        let data = getData(key);

        if (!data || !data.products) {
            openToast('Error', 'No se encontraron datos para eliminar', 1800);
            return false;
        }

        const productIndex = data.products.findIndex(product => product.id == productId);

        if (productIndex === -1) {
            openToast('Error', 'Producto no encontrado', 1800);
            return false;
        }

        data.products.splice(productIndex, 1);
        data.total = data.products.reduce((sum, product) => sum + product.subtotal, 0);
        saveData(key, data);

        openToast('Evento', 'Producto eliminado correctamente', 1800);
        return true;

    } catch (error) {
        openToast('Error', 'No se ha podido eliminar el producto', 1800);
        return false;
    }
}

$(function () {
    let inputSearch = $('#searchTerm');
    let modalOverlay = $('.products-modal-overlay');
    let closeModal = $('.products-header-modal');
    let searchInput = $('#productSearchTerm');
    let searchResult = $('.result-search');
    let tableBody = $('.table-body');
    let productsSelected = getData('selectedProducts');

    console.log('Modal overlay encontrado:', modalOverlay.length);
    console.log('Close modal encontrado:', closeModal.length);
    console.log('Input search encontrado:', inputSearch.length);

    // Cargar tabla inicial (sin return que bloquee el resto)
    if (
        !productsSelected || 
        !productsSelected.products || 
        productsSelected.products.length === 0
    ) {
        tableBody.html('<tr><td colspan="5" class="no-data">Debe buscar y seleccionar productos</td></tr>');
    } else {
        populateTable(productsSelected, tableBody);
    }

    /**
     * EVENTO CLICK - ABRIR MODAL
     */
    inputSearch.on('click', function () {
        console.log('Click en input detectado'); // DEBUG
        modalOverlay.addClass('active');
        console.log('Clase active agregada:', modalOverlay.hasClass('active')); // DEBUG
    });

    /**
     * EVENTO ELIMINAR PRODUCTO
     */
    $('.table-body').on('click', '.btn-eliminate-product', function () {
        const productId = $(this).closest('tr').data('product-id');
        const productName = $(this).closest('tr').find('td:nth-child(2)').text();

        initModal(
            'Confirmar Eliminacion',
            `Estas seguro que deseas eliminar el producto ${productName}`,
            function (confirmed) {
                if (confirmed) {
                    if (deleteProductById('selectedProducts', productId)) {
                        const updatedData = getData('selectedProducts');
                        
                        if (!updatedData || !updatedData.products || updatedData.products.length === 0) {
                            tableBody.html('<tr><td colspan="5" class="no-data">No hay productos seleccionados</td></tr>');
                        } else {
                            populateTable(updatedData, tableBody);
                        }
                    }
                }
            }
        );
    });

    /**
     * EVENTO CERRAR MODAL
     */
    closeModal.on('click', function () {
        console.log('Cerrando modal'); // DEBUG
        searchInput.val('');
        searchResult.empty();
        modalOverlay.removeClass('active');
    });
});