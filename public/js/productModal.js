import { saveData } from './helpers/sessionHelpers.js';
import { openToast } from "./helpers/toastHelper.js";

// Agregar al inicio de productModal.js
let selectedProductsState = new Map(); // Guardar estado de selección

function createList(container, data) {
    container.empty();
    
    if (data.length === 0) {
        container.html('<p class="no-results">No se encontraron productos</p>');
        return;
    }
    
    let list = $('<ul class="product-list"></ul>');
    
    data.forEach(product => {
        // Verificar si el producto ya estaba seleccionado
        const wasSelected = selectedProductsState.has(product.id);
        const savedQuantity = selectedProductsState.get(product.id) || 1;
        
        let item = $(`
            <li class="product-item" data-product-id="${product.id}">
                <div class="section-info">
                    <strong>[${product.code}]</strong> - ${product.name}: $${product.price}
                </div>
                <div class="section-selectors">
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease">-</button>
                        <input type="number" class="quantity-input" value="${savedQuantity}" min="1" max="99">
                        <button class="quantity-btn increase">+</button>
                    </div>
                    <input type="checkbox" class="checkbox-selector" ${wasSelected ? 'checked' : ''}>
                </div>
            </li>
        `);

        // Eventos para los botones de cantidad
        item.find('.decrease').on('click', function(e) {
            e.stopPropagation();
            let input = $(this).siblings('.quantity-input');
            let value = parseInt(input.val());
            if (value > 1) {
                input.val(value - 1);
                updateSelectionState(product.id, value - 1, true);
            }
        });
        
        item.find('.increase').on('click', function(e) {
            e.stopPropagation();
            let input = $(this).siblings('.quantity-input');
            let value = parseInt(input.val());
            if (value < 99) {
                input.val(value + 1);
                updateSelectionState(product.id, value + 1, true);
            }
        });
        
        // Validación del input
        item.find('.quantity-input').on('change', function() {
            let value = parseInt($(this).val());
            if (isNaN(value) || value < 1) {
                $(this).val(1);
                value = 1;
            } else if (value > 99) {
                $(this).val(99);
                value = 99;
            }
            updateSelectionState(product.id, value, true);
        });

        // Evento para checkbox
        item.find('.checkbox-selector').on('change', function() {
            const isChecked = $(this).is(':checked');
            const quantity = parseInt(item.find('.quantity-input').val());
            updateSelectionState(product.id, quantity, isChecked);
        });
        
        list.append(item);
    });
    
    container.append(list);
}

function updateSelectionCounter() {
    const count = selectedProductsState.size;
    // Agregar un contador en el modal
    $('.selection-counter').remove();
    if (count > 0) {
        $('.save-data').prepend(`<span class="selection-counter">(${count} seleccionados)</span>`);
    }
}

// Función para manejar el estado de selección
function updateSelectionState(productId, quantity, isSelected) {
    if (isSelected) {
        selectedProductsState.set(productId, quantity);
    } else {
        selectedProductsState.delete(productId);
    }
    updateSelectionCounter();
}

// Modificar getSelectedProducts para usar el estado
function getSelectedProducts() {
    let selectedProducts = [];
    const productsData = JSON.parse(document.getElementById('products-data').textContent);
    
    selectedProductsState.forEach((quantity, productId) => {
        const originalProduct = productsData.find(p => p.id == productId);
        if (originalProduct) {
            const subtotal = originalProduct.price * quantity;
            selectedProducts.push({
                ...originalProduct,
                quantity: quantity,
                subtotal: subtotal
            });
        }
    });
    
    return selectedProducts;
}

// 2. Calcular total
function calculateTotal(selectedProducts) {
    return selectedProducts.reduce((total, product) => total + product.subtotal, 0);
}

// Función para limpiar el modal
function cleanModal() {
    $('#productSearchTerm').val('');
    $('.result-search').empty();
}

// 3. Guardar datos y cerrar modal
function saveSelectedProducts() {
    // 1. Verificar checks
    const selectedProducts = getSelectedProducts();
    
    if (selectedProducts.length === 0) {
        openToast('Aviso', 'No ha seleccionado productos aún', 1700);
        return;
    }
    
    // 4. Calcular total
    const total = calculateTotal(selectedProducts);
    
    // 5. Preparar datos para guardar
    const dataToSave = {
        products: selectedProducts,
        total: total,
        timestamp: new Date().toISOString()
    };
    
    // 6. Guardar en sessionStorage
    saveData('selectedProducts', dataToSave);

    // 7. mostra aviso de exito
    openToast('Éxito', `Productos guardados: ${selectedProducts.length} - Total: $${total}`, 1800);
    
    // 8. Limpiar modal
    cleanModal();
    
    // 9. Cerrar modal
    $('.products-modal-overlay').removeClass('active');
    
    console.log('Datos guardados:', dataToSave);

     // Limpiar el estado después de guardar
    selectedProductsState.clear();
    updateSelectionCounter(); // ← AQUÍ

    setTimeout(() => {
        window.location.reload();
    }, 500);
}

// Configurar botón grabar
function setupSaveButton() {
    $('.save-data button').on('click', saveSelectedProducts);
}

// Inicialización
$(function() {
    let searchInput = $('#productSearchTerm');
    let productsData = JSON.parse(document.getElementById('products-data').textContent);
    let searchResult = $('.result-search');

    // Configurar botón de guardar
    setupSaveButton();

    // Inicializar contador
    updateSelectionCounter();

    // Evento de búsqueda
    searchInput.on('input', function() {
        let searchTerm = searchInput.val().toLowerCase().trim();
        
        let termFound = productsData.filter(product => {
            return product.code.toString().toLowerCase().includes(searchTerm) ||
                   product.name.toLowerCase().includes(searchTerm) ||
                   product.price.toString().toLowerCase().includes(searchTerm);
        });
        
        createList(searchResult, termFound);
    });
});