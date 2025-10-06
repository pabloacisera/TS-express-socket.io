// AGREGAR AL INICIO:
import { ProductSearch } from './products/productSearch.js';
import { ProductTable } from './products/productTable.js';
import { ProductKeyboard } from './products/productKeyboard.js';
import { ProductSession } from './products/productSession.js';

// =============================================
// MÓDULO: GESTIÓN DE TEMPLATES - TEMPLATEMANAGER.JS
// =============================================
// Este módulo coordina la inicialización de todos los componentes del template de productos
// Es el "director de orquesta" que asegura que todos los módulos se inicialicen correctamente

/**
 * FUNCIÓN PRINCIPAL DE INICIALIZACIÓN DEL TEMPLATE DE PRODUCTOS
 *
 * Esta función se ejecuta cuando el usuario selecciona la opción "Agregar Producto"
 * Coordina la inicialización de todos los subsistemas necesarios para el funcionamiento
 * completo del módulo de productos
 */
export function initProductTemplate() {
    console.log('Inicializando template de productos...');

    // 1. INICIALIZAR SISTEMA DE BÚSQUEDA - Permite buscar productos en el catálogo
    ProductSearch.init();

    // 2. INICIALIZAR SISTEMA DE TABLA - Gestiona la tabla de productos seleccionados
    ProductTable.init();

    // 3. INICIALIZAR SISTEMA DE TECLADO - Habilita navegación con teclado
    ProductKeyboard.init();

    // 4. CARGAR DATOS PERSISTENTES - Recupera productos previamente seleccionados
    ProductSession.loadSelectedProducts();
}
