/* 
 * Módulo JavaScript Autocontenido para un componente Toast mejorado.
 * Exporta las funciones openToast() y closeToast().
 * Para usarlo, guárdalo como, por ejemplo, 'toast.js' y luego impórtalo:
 * import { openToast, closeToast } from './toast.js';
 */

// --- Estilos CSS mejorados para el Toast ---
const TOAST_CSS = `
    .custom-toast-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1050;
        display: flex;
        flex-direction: column-reverse;
        gap: 12px;
        pointer-events: none;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .custom-toast {
        background-color: #ffffff;
        color: #1a1a1a;
        padding: 0;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
        max-width: 380px;
        min-width: 300px;
        pointer-events: auto;
        opacity: 0;
        transform: translateX(100%) scale(0.95);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        cursor: pointer;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.05);
        position: relative;
    }

    .custom-toast::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background-color: #6b7280;
    }

    .custom-toast.info::before {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }

    .custom-toast.restriccion::before,
    .custom-toast.restricción::before {
        background: linear-gradient(135deg, #f59e0b, #d97706);
    }

    .custom-toast.error::before {
        background: linear-gradient(135deg, #ef4444, #dc2626);
    }

    .custom-toast.exito::before,
    .custom-toast.éxito::before {
        background: linear-gradient(135deg, #10b981, #059669);
    }

    .custom-toast.show {
        opacity: 1;
        transform: translateX(0) scale(1);
    }

    .custom-toast.hiding {
        opacity: 0;
        transform: translateX(100%) scale(0.95);
    }

    .custom-toast:hover {
        transform: translateX(0) scale(1.02);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .custom-toast.hiding:hover {
        transform: translateX(100%) scale(0.95);
    }

    .custom-toast-content {
        padding: 16px 20px 16px 24px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }

    .custom-toast-icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        margin-top: 2px;
    }

    .custom-toast-body {
        flex: 1;
        min-width: 0;
    }

    .custom-toast-header {
        font-weight: 600;
        font-size: 14px;
        line-height: 1.4;
        margin-bottom: 4px;
        color: #111827;
        letter-spacing: -0.01em;
    }

    .custom-toast-message {
        font-size: 14px;
        line-height: 1.5;
        color: #374151;
        font-weight: 400;
    }

    .custom-toast-close {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        border: none;
        background: none;
        color: #9ca3af;
        cursor: pointer;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        transition: all 0.2s ease;
        margin-top: 1px;
    }

    .custom-toast-close:hover {
        background-color: rgba(0, 0, 0, 0.05);
        color: #6b7280;
    }

    .custom-toast-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background-color: rgba(0, 0, 0, 0.1);
        transform-origin: left;
        transform: scaleX(1);
        transition: transform linear;
    }

    /* Efectos de color para los diferentes tipos */
    .custom-toast.info {
        border-left-color: #3b82f6;
    }

    .custom-toast.restriccion,
    .custom-toast.restricción {
        border-left-color: #f59e0b;
    }

    .custom-toast.error {
        border-left-color: #ef4444;
    }

    .custom-toast.exito,
    .custom-toast.éxito {
        border-left-color: #10b981;
    }

    /* Animación de entrada mejorada */
    @keyframes toastSlideIn {
        from {
            opacity: 0;
            transform: translateX(100%) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
    }

    /* Responsive */
    @media (max-width: 640px) {
        .custom-toast-container {
            bottom: 16px;
            right: 16px;
            left: 16px;
        }
        
        .custom-toast {
            max-width: none;
            min-width: auto;
        }
    }
`;

// Almacena los temporizadores para poder cancelarlos
const toastTimers = new Map();
const progressTimers = new Map();
let toastContainer = null;

/**
 * Inyecta el CSS y crea el contenedor principal si no existen.
 */
function initializeToastSystem() {
    if (!document.querySelector('style[data-toast-style]')) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.setAttribute('data-toast-style', 'true');
        style.innerHTML = TOAST_CSS;
        document.head.appendChild(style);
    }

    toastContainer = document.getElementById('customToastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'customToastContainer';
        toastContainer.className = 'custom-toast-container';
        document.body.appendChild(toastContainer);
    }
}

/**
 * Obtiene el icono SVG correspondiente al tipo de toast
 */
function getToastIcon(type) {
    const icons = {
        info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>`,
        restriccion: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="10" y1="15" x2="10" y2="9"></line>
                <line x1="14" y1="15" x2="14" y2="9"></line>
              </svg>`,
        error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>`,
        exito: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>`,
        default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>`
    };

    return icons[type] || icons.default;
}

/**
 * Normaliza el tipo de toast basado en el header
 */
function getToastType(header) {
    const headerLower = header.toLowerCase();
    
    if (headerLower.includes('info') || headerLower.includes('información')) {
        return 'info';
    } else if (headerLower.includes('restriccion') || headerLower.includes('restricción') || headerLower.includes('advertencia') || headerLower.includes('warning')) {
        return 'restriccion';
    } else if (headerLower.includes('error') || headerLower.includes('fallo') || headerLower.includes('problema')) {
        return 'error';
    } else if (headerLower.includes('exito') || headerLower.includes('éxito') || headerLower.includes('completado') || headerLower.includes('correcto')) {
        return 'exito';
    }
    
    return 'default';
}

/**
 * Muestra un nuevo toast en la esquina inferior derecha.
 * @param {string} header - El título del toast.
 * @param {string} message - El contenido del mensaje.
 * @param {number} [timer=4000] - Tiempo en milisegundos para que se oculte automáticamente.
 * @returns {string} El ID único del toast creado.
 */
export function openToast(header, message, timer = 4000) {
    if (!toastContainer) {
        initializeToastSystem();
    }

    const toastType = getToastType(header);
    const toast = document.createElement('div');
    toast.className = `custom-toast ${toastType}`;
    const toastId = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    toast.setAttribute('data-toast-id', toastId);

    // Insertar el contenido HTML mejorado
    toast.innerHTML = `
        <div class="custom-toast-content">
            <div class="custom-toast-icon">
                ${getToastIcon(toastType)}
            </div>
            <div class="custom-toast-body">
                <div class="custom-toast-header">${header}</div>
                <div class="custom-toast-message">${message}</div>
            </div>
            <button class="custom-toast-close" aria-label="Cerrar notificación">
                ×
            </button>
        </div>
        ${timer > 0 ? '<div class="custom-toast-progress"></div>' : ''}
    `;

    toastContainer.prepend(toast);

    // Mostrar el Toast con animación
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Configurar el temporizador y la barra de progreso
    if (timer > 0) {
        const progressBar = toast.querySelector('.custom-toast-progress');
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.transition = `transform ${timer}ms linear`;
                progressBar.style.transform = 'scaleX(0)';
            }, 50);
        }

        const timeout = setTimeout(() => {
            closeToast(toastId);
        }, timer);

        toastTimers.set(toastId, timeout);
    }

    // Configurar eventos
    const closeBtn = toast.querySelector('.custom-toast-close');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeToast(toastId);
    });

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
        // Cancelar temporizadores
        if (toastTimers.has(toastId)) {
            clearTimeout(toastTimers.get(toastId));
            toastTimers.delete(toastId);
        }

        if (progressTimers.has(toastId)) {
            clearTimeout(progressTimers.get(toastId));
            progressTimers.delete(toastId);
        }

        // Iniciar animación de salida
        toast.classList.add('hiding');
        toast.classList.remove('show');

        // Eliminar el elemento después de la animación
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 400);
    }
}

// Inicializa el sistema al cargar el módulo
initializeToastSystem();