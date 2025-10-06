// Importar la función de inicialización
import { initProductTemplate } from './modules/productTemplateManager.js';

// =============================================
// ARCHIVO PRINCIPAL - HOME.JS
// =============================================
// Este es el archivo principal que coordina toda la aplicación
// Se encarga de la inicialización global y gestión de templates

// Estado global de la aplicación - almacena todos los productos seleccionados por el usuario
window.SELECTED_PRODUCTS = [];

/**
 * CLONA Y CARGA UN TEMPLATE EN EL CONTENEDOR ESPECIFICADO
 * @param {string} template - Selector del template a clonar (ej: '#add-product-temp')
 * @param {string} container - Selector del contenedor donde insertar el template
 *
 * Esta función es el punto de entrada para cambiar entre diferentes vistas de la aplicación
 * (clientes, productos, etc.) eliminando el template anterior y cargando el nuevo
 */
function cloneTemplate(template, container) {
    // Limpiar el contenedor para eliminar cualquier template anterior
    $(container).empty();

    // Obtener el HTML del template y clonarlo
    let clone = $(template).html();
    $(container).append(clone);

    // Si el template cargado es el de productos, inicializar su funcionalidad específica
    if (template === '#add-product-temp') {
        initProductTemplate();
    }
}

/**
 * INICIALIZACIÓN DE LA APLICACIÓN CUANDO EL DOCUMENTO ESTÁ LISTO
 * Configura los event listeners principales para cambiar entre secciones
 */
$(function () {
    // Evento para cargar el template de gestión de clientes
    $(document).on('click', '#add-client', function () {
        cloneTemplate('#add-client-temp', '#templates-content');
    });

    // Evento para cargar el template de gestión de productos
    $(document).on('click', '#add-product', function () {
        cloneTemplate('#add-product-temp', '#templates-content');
    });
});
