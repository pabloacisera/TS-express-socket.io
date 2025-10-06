import { ProductTable } from './productTable.js';
// AGREGAR AL INICIO:
import { openToast } from '../../helpers/toastHelper.js';
import { saveData, getData, deleteData } from '../../helpers/sessionHelpers.js';
// =============================================
// MÓDULO: PERSISTENCIA EN SESSION STORAGE - PRODUCTSESSION.JS
// =============================================
// Este módulo maneja el almacenamiento y recuperación de productos seleccionados
// en el sessionStorage del navegador, permitiendo que los datos persistan
// incluso al recargar la página

export const ProductSession = {
    // CLAVES PARA IDENTIFICAR LOS DATOS EN SESSION STORAGE
    SESSION_KEYS: {
        SELECTED_PRODUCTS: 'selected_products'  // Almacena el array de productos seleccionados
    },

    /**
     * GUARDA LOS PRODUCTOS SELECCIONADOS EN SESSION STORAGE
     *
     * Esta función se ejecuta automáticamente cada vez que cambia la selección
     * de productos, asegurando que los datos siempre estén sincronizados
     */
    saveSelectedProducts() {
        try {
            // Usa la función saveData del helper para guardar en sessionStorage
            saveData(this.SESSION_KEYS.SELECTED_PRODUCTS, window.SELECTED_PRODUCTS);
            console.log('Productos guardados en session:', window.SELECTED_PRODUCTS);
        } catch (error) {
            console.error('Error guardando productos en session:', error);
            openToast('Error', 'No se pudieron guardar los productos seleccionados', 1800);
        }
    },

    /**
     * CARGA LOS PRODUCTOS SELECCIONADOS DESDE SESSION STORAGE
     * @returns {boolean} true si se cargaron productos, false si no había datos
     *
     * Esta función se ejecuta al inicializar el template de productos
     * Recupera cualquier selección previa del usuario
     */
    loadSelectedProducts() {
        try {
            // Obtener datos del sessionStorage usando el helper
            const savedProducts = getData(this.SESSION_KEYS.SELECTED_PRODUCTS);

            if (savedProducts && Array.isArray(savedProducts)) {
                // Restaurar los productos en el array global
                window.SELECTED_PRODUCTS = savedProducts;
                console.log('Productos cargados desde session:', window.SELECTED_PRODUCTS);

                // Actualizar la tabla visual con los productos recuperados
                ProductTable.updateProductsTable();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error cargando productos desde session:', error);
            return false;
        }
    },

    /**
     * ELIMINA TODOS LOS PRODUCTOS SELECCIONADOS DEL SESSION STORAGE
     *
     * Limpia completamente la selección tanto del array global como del almacenamiento
     */
    clearSelectedProducts() {
        try {
            // Eliminar del sessionStorage
            deleteData(this.SESSION_KEYS.SELECTED_PRODUCTS);

            // Limpiar el array global
            window.SELECTED_PRODUCTS = [];

            console.log('Productos eliminados de session');
        } catch (error) {
            console.error('Error eliminando productos de session:', error);
            openToast('Error', 'No se pudieron eliminar los productos', 1800);
        }
    }
};
