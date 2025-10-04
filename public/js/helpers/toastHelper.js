/* * Módulo JavaScript Autocontenido para un componente Toast.
 * Exporta las funciones openToast() y closeToast().
 * Para usarlo, guárdalo como, por ejemplo, 'toast.js' y luego impórtalo:
 * import { openToast, closeToast } from './toast.js';
 */

// --- Estilos CSS para el Toast ---
const TOAST_CSS = `
    .custom-toast-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1050; /* Alto z-index para estar sobre otros elementos */
        display: flex;
        flex-direction: column-reverse; /* Nuevos toasts aparecen encima */
        gap: 10px;
        pointer-events: none; /* Permite clickar a través del contenedor si está vacío */
    }

    .custom-toast {
        background-color: #061729;
        color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        max-width: 350px;
        pointer-events: auto; /* Permite interacción con el toast */
        opacity: 0;
        transform: translateY(100%);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        cursor: pointer;
    }

    .custom-toast.show {
        opacity: 1;
        transform: translateY(0);
    }

    .custom-toast-header {
        font-weight: bold;
        font-size: 1.1em;
        margin-bottom: 5px;
        border-bottom: 1px solid #444;
        padding-bottom: 3px;
    }

    .custom-toast-message {
        font-size: 1em;
    }
`;

// Almacena los temporizadores para poder cancelarlos
const toastTimers = new Map();
let toastContainer = null; // Inicializado al final del script

/**
 * Inyecta el CSS y crea el contenedor principal si no existen.
 */
function initializeToastSystem() {
    // 1. Inyectar el CSS en el <head>
    if (!document.querySelector('style[data-toast-style]')) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.setAttribute('data-toast-style', 'true');
        style.innerHTML = TOAST_CSS;
        document.head.appendChild(style);
    }

    // 2. Crear el Contenedor en el <body> si no existe
    toastContainer = document.getElementById('customToastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'customToastContainer';
        toastContainer.className = 'custom-toast-container';
        document.body.appendChild(toastContainer);
    }
}

/**
 * Muestra un nuevo toast en la esquina inferior derecha.
 * @param {string} header - El título del toast.
 * @param {string} message - El contenido del mensaje.
 * @param {number} [timer=3000] - Tiempo en milisegundos para que se oculte automáticamente.
 * @returns {string} El ID único del toast creado.
 */
export function openToast(header, message, timer = 3000) {
    if (!toastContainer) {
        initializeToastSystem();
    }

    // 1. Crear el elemento Toast
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    const toastId = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    toast.setAttribute('data-toast-id', toastId);

    // 2. Insertar el contenido HTML
    toast.innerHTML = `
        <div class="custom-toast-header">${header}</div>
        <div class="custom-toast-message">${message}</div>
    `;

    // 3. Añadirlo al contenedor (prepend para que aparezca encima)
    toastContainer.prepend(toast);

    // 4. Mostrar el Toast con animación
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // 5. Configurar el temporizador para ocultar el toast
    if (timer > 0) {
        const timeout = setTimeout(() => {
            closeToast(toastId);
        }, timer);

        toastTimers.set(toastId, timeout);
    }

    // 6. Cerrar al hacer clic
    toast.addEventListener('click', () => {
        closeToast(toastId);
    });

    return toastId;
}

/**
 * Oculta y elimina un toast específico.
 * @param {string} toastId - El ID único del toast a cerrar.
 */
export function closeToast(toastId) {
    const toast = document.querySelector(`.custom-toast[data-toast-id="${toastId}"]`);

    if (toast) {
        // 1. Cancelar el temporizador
        if (toastTimers.has(toastId)) {
            clearTimeout(toastTimers.get(toastId));
            toastTimers.delete(toastId);
        }

        // 2. Iniciar la animación de salida
        toast.classList.remove('show');

        // 3. Eliminar el elemento del DOM al terminar la transición
        toast.addEventListener('transitionend', function handler() {
            if (!toast.classList.contains('show')) {
                toast.remove();
                toast.removeEventListener('transitionend', handler);
            }
        });
    }
}

// Inicializa el sistema tan pronto como el módulo se carga.
initializeToastSystem();
