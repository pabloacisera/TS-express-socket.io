// modal_confirm.js - Modal de confirmación autocontenido
// Uso: import { showConfirmModal } from './modal_confirm.js';
//      const result = await showConfirmModal("¿Desea continuar?");

// Inyectar estilos CSS
const modalStyles = `
<style id="modal-confirm-styles">
/* Estilos del Modal de Confirmación */
.confirm-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.confirm-modal-overlay.show {
    display: flex;
    opacity: 1;
}

.confirm-modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.confirm-modal-overlay.show .confirm-modal-content {
    transform: scale(1);
}

.confirm-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
    padding-bottom: 10px;
}

.confirm-modal-header h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
}

.confirm-close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    transition: color 0.2s;
    padding: 0;
    line-height: 1;
}

.confirm-close-btn:hover {
    color: #333;
}

.confirm-modal-body {
    padding: 20px 0;
}

.confirm-modal-message {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
    text-align: center;
}

.confirm-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.confirm-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
}

.confirm-btn-no {
    background-color: #f5f5f5;
    color: #666;
    border: 1px solid #ddd;
}

.confirm-btn-no:hover {
    background-color: #e8e8e8;
    color: #333;
}

.confirm-btn-yes {
    background-color: rgb(24, 45, 116);
    color: white;
}

.confirm-btn-yes:hover {
    background-color: rgb(20, 38, 98);
}

/* Media Queries - Tablets */
@media (max-width: 768px) {
    .confirm-modal-content {
        width: 92%;
        max-width: 480px;
        padding: 18px;
    }

    .confirm-modal-header h3 {
        font-size: 1.1rem;
    }

    .confirm-close-btn {
        font-size: 1.4rem;
    }

    .confirm-modal-message {
        font-size: 0.95rem;
    }

    .confirm-btn {
        padding: 9px 18px;
        font-size: 0.9rem;
    }
}

/* Media Queries - Móviles */
@media (max-width: 640px) {
    .confirm-modal-content {
        width: 95%;
        max-width: none;
        padding: 16px;
    }

    .confirm-modal-header {
        margin-bottom: 12px;
        padding-bottom: 8px;
    }

    .confirm-modal-header h3 {
        font-size: 1rem;
    }

    .confirm-close-btn {
        font-size: 1.3rem;
    }

    .confirm-modal-body {
        padding: 15px 0;
    }

    .confirm-modal-message {
        font-size: 0.9rem;
    }

    .confirm-modal-footer {
        gap: 8px;
        margin-top: 15px;
    }

    .confirm-btn {
        padding: 8px 16px;
        font-size: 0.85rem;
    }
}

/* Media Queries - Móviles pequeños */
@media (max-width: 480px) {
    .confirm-modal-overlay {
        padding: 10px;
        align-items: flex-start;
        padding-top: 80px;
    }

    .confirm-modal-content {
        width: 100%;
        padding: 14px;
        border-radius: 6px;
    }

    .confirm-modal-header {
        margin-bottom: 10px;
        padding-bottom: 8px;
    }

    .confirm-modal-header h3 {
        font-size: 0.95rem;
    }

    .confirm-close-btn {
        font-size: 1.2rem;
    }

    .confirm-modal-body {
        padding: 12px 0;
    }

    .confirm-modal-message {
        font-size: 0.85rem;
    }

    .confirm-modal-footer {
        flex-direction: column-reverse;
        gap: 8px;
        margin-top: 12px;
    }

    .confirm-btn {
        width: 100%;
        padding: 10px;
        font-size: 0.9rem;
    }
}

/* Media Queries - Móviles muy pequeños */
@media (max-width: 360px) {
    .confirm-modal-overlay {
        padding: 5px;
        padding-top: 60px;
    }

    .confirm-modal-content {
        padding: 12px;
    }

    .confirm-modal-header h3 {
        font-size: 0.9rem;
    }

    .confirm-close-btn {
        font-size: 1.1rem;
    }

    .confirm-modal-message {
        font-size: 0.8rem;
    }

    .confirm-btn {
        padding: 9px;
        font-size: 0.85rem;
    }
}
</style>
`;

// Inyectar HTML del modal
const modalHTML = `
<div id="confirm-modal-overlay" class="confirm-modal-overlay">
    <div class="confirm-modal-content">
        <div class="confirm-modal-header">
            <h3>Confirmación</h3>
            <button class="confirm-close-btn" id="confirm-close-btn">&times;</button>
        </div>

        <div class="confirm-modal-body">
            <p class="confirm-modal-message" id="confirm-modal-message"></p>
        </div>

        <div class="confirm-modal-footer">
            <button class="confirm-btn confirm-btn-no" id="confirm-btn-no">No</button>
            <button class="confirm-btn confirm-btn-yes" id="confirm-btn-yes">Sí</button>
        </div>
    </div>
</div>
`;

// Variable para guardar el resolver de la promesa
let confirmResolver = null;

// Función para inicializar el modal (se ejecuta automáticamente)
function initConfirmModal() {
    // Verificar si ya existe
    if (document.getElementById('modal-confirm-styles')) {
        return;
    }

    // Inyectar CSS
    document.head.insertAdjacentHTML('beforeend', modalStyles);

    // Inyectar HTML
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Obtener elementos
    const overlay = document.getElementById('confirm-modal-overlay');
    const closeBtn = document.getElementById('confirm-close-btn');
    const btnNo = document.getElementById('confirm-btn-no');
    const btnYes = document.getElementById('confirm-btn-yes');

    // Event listeners
    closeBtn.addEventListener('click', () => closeModal(false));
    btnNo.addEventListener('click', () => closeModal(false));
    btnYes.addEventListener('click', () => closeModal(true));

    // Cerrar al hacer clic fuera del modal
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(false);
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('show')) {
            closeModal(false);
        }
    });
}

// Función para cerrar el modal
function closeModal(result) {
    const overlay = document.getElementById('confirm-modal-overlay');
    overlay.classList.remove('show');

    // Resolver la promesa con el resultado
    if (confirmResolver) {
        confirmResolver(result);
        confirmResolver = null;
    }
}

// Función principal para mostrar el modal
export function showConfirmModal(message) {
    // Inicializar si no existe
    initConfirmModal();

    return new Promise((resolve) => {
        confirmResolver = resolve;

        // Actualizar el mensaje
        const messageElement = document.getElementById('confirm-modal-message');
        messageElement.textContent = message;

        // Mostrar el modal
        const overlay = document.getElementById('confirm-modal-overlay');
        overlay.classList.add('show');

        // Enfocar el botón "Sí" para accesibilidad
        setTimeout(() => {
            document.getElementById('confirm-btn-yes').focus();
        }, 100);
    });
}

// Alias para compatibilidad con el nombre que mencionaste
export function selectOption(message) {
    return showConfirmModal(message);
}

// Inicializar automáticamente cuando se carga el módulo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfirmModal);
} else {
    initConfirmModal();
}

// Exportación por defecto
export default { showConfirmModal, selectOption };
