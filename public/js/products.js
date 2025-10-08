import { getData, saveData } from './helpers/sessionHelpers.js';
import { initModal } from './acceptModal.js';
import { openToast } from './helpers/toastHelper.js'

function populateTable(data, target) {
    // Mostrar mensaje de carga con animación
    target.html('<tr><td colspan="5" class="loading"><div class="spinner">⏳</div>Cargando datos...</td></tr>');

    // Agregar clase para animación de entrada
    target.parent().addClass('loading-state');

    setTimeout(() => {
        // Animación de salida del mensaje de carga
        target.fadeOut(300, function () {
            target.empty().show();

            // Validar datos
            if (!data || !data.products || data.products.length === 0) {
                target.html('<tr><td colspan="5" class="no-data">No hay productos seleccionados</td></tr>');
                // ACTUALIZAR EL TOTAL A CERO CUANDO NO HAY PRODUCTOS
                let totalSpan = $('.total-amount');
                totalSpan.text('$ 0');
                target.parent().removeClass('loading-state');
                return;
            }

            // Renderizar productos
            data.products.forEach((product, index) => {
                let row = $(`
                    <tr data-product-id="${product.id}" style="opacity: 0;">
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

                // Animación de entrada escalonada
                setTimeout(() => {
                    row.animate({ opacity: 1 }, 400);
                }, index * 100);
            });

            let totalSpan = $('.total-amount');
            totalSpan.text(`$ ${data.total}`)

            target.parent().removeClass('loading-state');
        });
    }, 1200);
}

export function verifyProductsExist(key) {
    let data = getData(key);

    if (!data || !data.products || data.products.length < 1) {
        return false;
    }

    return true;
}

export function continueStepClient(path) {
    // verificar si existen datos antes de continuar
    const exists = verifyProductsExist('selectedProducts');
    if (!exists) {
        openToast('Restricción', 'No se han cargado productos áun. Intenteló nuevamente.', 2800);
        return;
    }


    window.location.href = path
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

        openToast('Éxito', 'Producto eliminado correctamente', 1800);
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
        tableBody.html('<tr><td colspan="5" class="no-data" style="color:grey;">Debe buscar y seleccionar productos</td></tr>');
        // ACTUALIZAR EL TOTAL A CERO EN LA CARGA INICIAL
        $('.total-amount').text('$ 0');
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

                        // SIEMPRE LLAMAR A populateTable PARA ACTUALIZAR INTERFAZ COMPLETA
                        populateTable(updatedData, tableBody);
                    }
                }
            }
        );
    });

    /**
     *  EVENTO CONTINUAR
     */

    $('.btn.btn-continue').on('click', function () {
        continueStepClient('/facturation/clients');
    })

    /**
     * EVENTO LIMPIAR TODOS LOS PRODUCTOS
     */
    $('.btn-clear').on('click', function () {
        initModal(
            'Confirmar Limpieza',
            '¿Estás seguro que deseas eliminar todos los productos?',
            function (confirmed) {
                if (confirmed) {
                    // Crear estructura vacía
                    const emptyData = {
                        products: [],
                        total: 0,
                        timestamp: new Date().toISOString()
                    };

                    saveData('selectedProducts', emptyData);

                    // Actualizar interfaz
                    tableBody.html('<tr><td colspan="5" class="no-data">No hay productos seleccionados</td></tr>');
                    $('.total-amount').text('$ 0');

                    openToast('Éxito', 'Todos los productos han sido eliminados', 1800);
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