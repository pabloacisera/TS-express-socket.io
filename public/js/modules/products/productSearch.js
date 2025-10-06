
// AGREGAR AL INICIO:
import { ProductTable } from './productTable.js';
// =============================================
// MÓDULO: BÚSQUEDA Y FILTRADO DE PRODUCTOS - PRODUCTSEARCH.JS
// =============================================
// Este módulo maneja toda la lógica de búsqueda, filtrado y visualización de productos
// desde el catálogo completo hacia la lista de resultados

export const ProductSearch = {
    /**
     * INICIALIZACIÓN DEL MÓDULO DE BÚSQUEDA
     * Configura todos los componentes necesarios para la funcionalidad de búsqueda
     */
    init() {
        this.initializeTableMessage();
        this.setupSearchEvents();
    },

    /**
     * MUESTRA MENSAJE INICIAL EN LA TABLA PRINCIPAL
     * Informa al usuario que debe iniciar una búsqueda para ver productos
     */
    initializeTableMessage() {
        const tbody = $('tbody');
        if (tbody.length > 0 && tbody.children().length === 0) {
            tbody.empty();
            const message = document.createElement('p');
            message.innerText = 'Inicie búsqueda de productos para poblar la tabla';
            tbody[0].append(message);
        }
    },

    /**
     * CONFIGURA EVENTOS DE BÚSQUEDA EN EL INPUT
     * Escucha los cambios en el campo de búsqueda y dispara la búsqueda en tiempo real
     */
    setupSearchEvents() {
        $(document).off('input', '#search-product-input').on('input', '#search-product-input', (e) => {
            const searchTerm = $(e.target).val().trim().toLowerCase();
            this.handleSearch(searchTerm);
        });
    },

    /**
     * MANEJA EL PROCESO COMPLETO DE BÚSQUEDA
     * @param {string} searchTerm - Término de búsqueda ingresado por el usuario
     *
     * Coordina: limpieza de mensajes → filtrado → visualización de resultados
     */
    handleSearch(searchTerm) {
        console.log('Buscando:', searchTerm);

        const tbody = $('tbody');
        this.clearInitialMessage(tbody, searchTerm);

        const productsFound = this.filterProducts(searchTerm);
        this.displaySearchResults(productsFound);
    },

    /**
     * FILTRA PRODUCTOS BASADO EN EL TÉRMINO DE BÚSQUEDA
     * @param {string} searchTerm - Término a buscar
     * @returns {Array} Lista de productos que coinciden con la búsqueda
     *
     * Busca coincidencias en: código, nombre y marca del producto
     * La búsqueda es case-insensitive y busca coincidencias parciales
     */
    filterProducts(searchTerm) {
        if (!searchTerm) return [];
        return window.ALL_PRODUCTS.filter(product =>
            (product.code && product.code.toLowerCase().includes(searchTerm)) ||
            (product.name && product.name.toLowerCase().includes(searchTerm)) ||
            (product.make && product.make.toLowerCase().includes(searchTerm))
        );
    },

    /**
     * LIMPIA MENSAJE INICIAL CUANDO EL USUARIO COMIENZA A BUSCAR
     * @param {jQuery} tbody - Elemento tbody de la tabla principal
     * @param {string} searchTerm - Término de búsqueda
     */
    clearInitialMessage(tbody, searchTerm) {
        if (searchTerm !== '' && tbody.find('p').length > 0) {
            tbody.empty();
        }
    },

    /**
     * MUESTRA LOS RESULTADOS DE BÚSQUEDA EN LA LISTA DESPLEGABLE
     * @param {Array} productsFound - Productos que coinciden con la búsqueda
     *
     * Crea elementos de lista interactivos para cada producto encontrado
     */
    displaySearchResults(productsFound) {
        const resultList = $('.result-list');
        resultList.empty();

        if (productsFound.length > 0) {
            productsFound.forEach(product => {
                const listItem = this.createProductListItem(product);
                resultList.append(listItem);
            });
            resultList.show();
        } else {
            resultList.append('<li class="no-results">No se encontraron productos</li>');
        }
    },

    /**
     * CREA UN ELEMENTO DE LISTA PARA UN PRODUCTO
     * @param {Object} product - Datos del producto a mostrar
     * @returns {jQuery} Elemento li con toda la información y controles del producto
     *
     * Cada item incluye: código, nombre, precio, controles de cantidad y checkbox de selección
     */
    createProductListItem(product) {
        const listItem = $(`
            <li class="product-item" data-product-id="${product.id}" tabindex="0">
                <span class="product-code">${product.code}</span>
                <span class="product-name">${product.name}</span>
                <span class="product-price">$${product.price}</span>
                <div class="quantity-controls">
                    <button class="qty-btn qty-decrease" tabindex="0">-</button>
                    <input type="number" class="quantity-input" value="1" min="1" tabindex="0">
                    <button class="qty-btn qty-increase" tabindex="0">+</button>
                </div>
                <input type="checkbox" class="add-checkbox" tabindex="0">
            </li>
        `);

        this.setupQuantityControls(listItem, product);
        return listItem;
    },

    /**
     * CONFIGURA LOS CONTROLES INTERACTIVOS DE UN PRODUCTO
     * @param {jQuery} listItem - Elemento li del producto
     * @param {Object} product - Datos del producto
     *
     * Agrega event listeners para: botones de cantidad, input de cantidad y checkbox
     */
    setupQuantityControls(listItem, product) {
        const qtyDecrease = listItem.find('.qty-decrease');
        const qtyIncrease = listItem.find('.qty-increase');
        const quantityInput = listItem.find('.quantity-input');
        const checkbox = listItem.find('.add-checkbox');

        // Evento para botón disminuir cantidad
        qtyDecrease.off('click').on('click', () => {
            this.adjustQuantity(quantityInput, -1);
            ProductTable.updateProductSelection(listItem, product, quantityInput, checkbox);
        });

        // Evento para botón aumentar cantidad
        qtyIncrease.off('click').on('click', () => {
            this.adjustQuantity(quantityInput, 1);
            ProductTable.updateProductSelection(listItem, product, quantityInput, checkbox);
        });

        // Evento para cambio manual en input de cantidad
        quantityInput.off('change').on('change', () => {
            this.validateQuantity(quantityInput);
            ProductTable.updateProductSelection(listItem, product, quantityInput, checkbox);
        });

        // Evento para cambio en checkbox de selección
        checkbox.off('change').on('change', () => {
            ProductTable.updateProductSelection(listItem, product, quantityInput, checkbox);
        });
    },

    /**
     * AJUSTA LA CANTIDAD EN EL INPUT
     * @param {jQuery} quantityInput - Elemento input de cantidad
     * @param {number} change - Cambio a aplicar (+1 para aumentar, -1 para disminuir)
     */
    adjustQuantity(quantityInput, change) {
        let currentValue = parseInt(quantityInput.val()) || 1;
        let newValue = currentValue + change;
        if (newValue < 1) newValue = 1;
        quantityInput.val(newValue);
        quantityInput.trigger('change');
    },

    /**
     * VALIDA QUE LA CANTIDAD SEA UN NÚMERO VÁLIDO
     * @param {jQuery} quantityInput - Elemento input de cantidad
     *
     * Asegura que la cantidad sea al menos 1 y un número válido
     */
    validateQuantity(quantityInput) {
        let value = parseInt(quantityInput.val());
        if (isNaN(value) || value < 1) {
            quantityInput.val(1);
        }
    }
};
