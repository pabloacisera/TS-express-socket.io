import { ProductSession } from './productSession.js';
import { openToast } from '../../helpers/toastHelper.js';
// =============================================
// MÓDULO: GESTIÓN DE LA TABLA DE PRODUCTOS - PRODUCTTABLE.JS
// =============================================
// Este módulo maneja la tabla principal donde se muestran los productos seleccionados
// Incluye: actualización de tabla, cálculos de totales, y gestión de eventos de la tabla

export const ProductTable = {
    /**
     * INICIALIZACIÓN DEL MÓDULO DE TABLA
     * Configura la tabla y todos sus eventos interactivos
     */
    init() {
        this.initializeTable();
        this.setupTableEvents();
    },

    /**
     * INICIALIZACIÓN INICIAL DE LA TABLA
     * Carga y muestra los productos existentes en la tabla
     */
    initializeTable() {
        this.updateProductsTable();
    },

    /**
     * CONFIGURA TODOS LOS EVENTOS DE LA TABLA
     * - Botones "Quitar" individuales
     * - Botón "Limpiar" para eliminar todos los productos
     * - Botón "Continuar" para procesar la factura
     */
    setupTableEvents() {
        // Evento para quitar productos individuales
        $(document).off('click', '.btn-remove-from-table').on('click', '.btn-remove-from-table', (e) => {
            const index = $(e.target).data('index');
            this.removeProductFromTable(index);
        });

        // Evento para limpiar todos los productos
        $(document).off('click', '#btn-limpiar').on('click', '#btn-limpiar', () => {
            this.clearAllSelectedProducts();
        });

        // Evento para continuar con la facturación
        $(document).off('click', '#btn-facturar').on('click', '#btn-facturar', () => {
            this.proceedToInvoice();
        });
    },

    /**
     * ACTUALIZA LA SELECCIÓN DE UN PRODUCTO (AGREGAR/REMOVER/ACTUALIZAR)
     * @param {jQuery} listItem - Elemento li del producto en la lista de búsqueda
     * @param {Object} product - Datos del producto
     * @param {jQuery} quantityInput - Input de cantidad del producto
     * @param {jQuery} checkbox - Checkbox de selección del producto
     *
     * Esta función es el núcleo de la gestión de productos seleccionados:
     * - Calcula subtotal (precio × cantidad)
     * - Agrega/actualiza/elimina del array global
     * - Actualiza la persistencia y la tabla visual
     */
    updateProductSelection(listItem, product, quantityInput, checkbox) {
        const quantity = parseInt(quantityInput.val()) || 1;
        const isSelected = checkbox.is(':checked');
        const subtotal = product.price * quantity;

        // Crear objeto completo del producto seleccionado
        const selectedProduct = {
            ...product,
            quantity: quantity,
            subtotal: subtotal,
            selected: isSelected
        };

        // Buscar si el producto ya está seleccionado
        const existingIndex = window.SELECTED_PRODUCTS.findIndex(p => p.id === product.id);

        if (isSelected) {
            // PRODUCTO SELECCIONADO - Agregar o actualizar
            if (existingIndex === -1) {
                window.SELECTED_PRODUCTS.push(selectedProduct);
            } else {
                window.SELECTED_PRODUCTS[existingIndex] = selectedProduct;
            }
            listItem.addClass('product-selected');
        } else {
            // PRODUCTO DESELECCIONADO - Remover si existe
            if (existingIndex !== -1) {
                window.SELECTED_PRODUCTS.splice(existingIndex, 1);
            }
            listItem.removeClass('product-selected');
        }

        // Persistir cambios y actualizar interfaz
        ProductSession.saveSelectedProducts();
        this.updateProductsTable();
        console.log('Productos seleccionados:', window.SELECTED_PRODUCTS);
    },

    /**
     * ACTUALIZA COMPLETAMENTE LA TABLA DE PRODUCTOS SELECCIONADOS
     * - Limpia la tabla existente
     * - Pobla con los productos actuales del array global
     * - Calcula y muestra el total general
     * - Muestra/oculta el footer según sea necesario
     */
    updateProductsTable() {
        const tbody = $('.table-result tbody');
        tbody.empty();

        // Si no hay productos, mostrar mensaje y ocultar footer
        if (window.SELECTED_PRODUCTS.length === 0) {
            this.showEmptyTableMessage(tbody);
            this.hideTableFooter();
            return;
        }

        // Calcular total general y poblar tabla
        let grandTotal = 0;
        window.SELECTED_PRODUCTS.forEach((product, index) => {
            const tableRow = this.createProductTableRow(product, index);
            tbody.append(tableRow);
            grandTotal += product.subtotal;
        });

        // Actualizar footer con total y mostrarlo
        this.updateTableFooter(grandTotal);
        this.showTableFooter();
    },

    /**
     * CREA UNA FILA DE TABLA PARA UN PRODUCTO SELECCIONADO
     * @param {Object} product - Producto a mostrar
     * @param {number} index - Índice en el array para referencia del botón quitar
     * @returns {jQuery} Fila de tabla completa con todos los datos y acciones
     */
    createProductTableRow(product, index) {
        return $(`
            <tr class="selected-product-row" data-product-id="${product.id}">
                <td class="product-code">${product.code}</td>
                <td class="product-name">${product.name}</td>
                <td class="product-price">$${product.price}</td>
                <td class="product-quantity">${product.quantity}</td>
                <td class="product-subtotal">$${product.subtotal}</td>
                <td class="product-actions">
                    <button class="btn-remove-from-table" data-index="${index}" tabindex="0">
                        Quitar
                    </button>
                </td>
            </tr>
        `);
    },

    /**
     * ELIMINA UN PRODUCTO ESPECÍFICO DE LA TABLA
     * @param {number} index - Índice del producto a eliminar
     *
     * Remueve el producto del array global, actualiza persistencia y tabla,
     * y sincroniza el estado del checkbox en la lista de búsqueda
     */
    removeProductFromTable(index) {
        if (index >= 0 && index < window.SELECTED_PRODUCTS.length) {
            const removedProduct = window.SELECTED_PRODUCTS[index];

            // Remover del array global
            window.SELECTED_PRODUCTS.splice(index, 1);

            // Persistir cambios y actualizar interfaz
            ProductSession.saveSelectedProducts();
            this.updateProductsTable();

            // Sincronizar checkbox en lista de búsqueda
            this.updateSearchListCheckbox(removedProduct.id, false);

            console.log('Producto eliminado:', removedProduct);
            openToast('Éxito', 'Producto eliminado de la selección', 1500);
        }
    },

    /**
     * LIMPIA TODOS LOS PRODUCTOS SELECCIONADOS
     * - Vacía el array global
     * - Limpia la persistencia
     * - Sincroniza todos los checkboxes de la lista de búsqueda
     * - Actualiza la tabla visual
     */
    clearAllSelectedProducts() {
        if (window.SELECTED_PRODUCTS.length === 0) {
            openToast('Info', 'No hay productos para limpiar', 1500);
            return;
        }

        // Deseleccionar todos los checkboxes en la lista de búsqueda
        window.SELECTED_PRODUCTS.forEach(product => {
            this.updateSearchListCheckbox(product.id, false);
        });

        // Limpiar array y persistencia
        ProductSession.clearSelectedProducts();
        this.updateProductsTable();

        openToast('Éxito', 'Todos los productos han sido eliminados', 1500);
    },

    /**
     * SINCRONIZA EL ESTADO DEL CHECKBOX EN LA LISTA DE BÚSQUEDA
     * @param {string} productId - ID del producto a actualizar
     * @param {boolean} isChecked - Estado deseado del checkbox
     *
     * Cuando un producto se agrega/elimina de la tabla, esta función asegura
     * que el checkbox en la lista de búsqueda refleje el estado correcto
     */
    updateSearchListCheckbox(productId, isChecked) {
        const listItem = $(`.product-item[data-product-id="${productId}"]`);
        if (listItem.length > 0) {
            const checkbox = listItem.find('.add-checkbox');
            checkbox.prop('checked', isChecked);
            if (isChecked) {
                listItem.addClass('product-selected');
            } else {
                listItem.removeClass('product-selected');
            }
        }
    },

    /**
     * MUESTRA MENSAJE DE TABLA VACÍA
     * @param {jQuery} tbody - Elemento tbody donde mostrar el mensaje
     */
    showEmptyTableMessage(tbody) {
        tbody.append(`
            <tr class="empty-table-message">
                <td colspan="6" style="text-align: center; padding: 2rem; color: #666;">
                    No hay productos seleccionados. Use la búsqueda para agregar productos.
                </td>
            </tr>
        `);
    },

    /**
     * ACTUALIZA EL FOOTER DE LA TABLA CON EL TOTAL GENERAL
     * @param {number} grandTotal - Total calculado de todos los productos
     */
    updateTableFooter(grandTotal) {
        const tfoot = $('.table-result tfoot');
        tfoot.html(`
            <tr class="total-row">
                <td colspan="4" class="total-label">TOTAL GENERAL</td>
                <td class="total-value">$${grandTotal}</td>
                <td></td>
            </tr>
        `);
    },

    /**
     * MUESTRA EL FOOTER DE LA TABLA (cuando hay productos)
     */
    showTableFooter() {
        $('.table-result tfoot').show();
    },

    /**
     * OCULTA EL FOOTER DE LA TABLA (cuando no hay productos)
     */
    hideTableFooter() {
        $('.table-result tfoot').hide();
    },

    /**
     * PROCESA LA FACTURACIÓN - VALIDA Y CONTINÚA AL SIGUIENTE PASO
     * - Valida que haya al menos un producto seleccionado
     * - Calcula el monto total
     * - Prepara los datos para el siguiente paso del proceso
     */
    proceedToInvoice() {
        if (window.SELECTED_PRODUCTS.length === 0) {
            openToast('Error', 'Debe seleccionar al menos un producto para continuar', 2000);
            return;
        }

        // Calcular total general
        const totalAmount = window.SELECTED_PRODUCTS.reduce((sum, product) => sum + product.subtotal, 0);

        console.log('Procesando factura con:', {
            productCount: window.SELECTED_PRODUCTS.length,
            totalAmount: totalAmount
        });

        openToast('Éxito', `Factura procesada - ${window.SELECTED_PRODUCTS.length} productos - Total: $${totalAmount}`, 2000);

        // AQUÍ IRÍA LA LÓGICA PARA AVANZAR AL SIGUIENTE PASO DEL PROCESO
        // Por ejemplo: redirectToInvoiceStep() o showInvoiceForm()
    }
};
