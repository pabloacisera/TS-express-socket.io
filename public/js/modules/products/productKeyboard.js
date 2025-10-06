// =============================================
// MÓDULO: NAVEGACIÓN POR TECLADO - PRODUCTKEYBOARD.JS
// =============================================
// Este módulo habilita la navegación completa por teclado en la interfaz de productos
// Mejora la accesibilidad y productividad permitiendo el uso sin mouse

export const ProductKeyboard = {
    /**
     * INICIALIZACIÓN DEL MÓDULO DE TECLADO
     * Configura los event listeners para las teclas
     */
    init() {
        this.setupKeyboardEvents();
    },

    /**
     * CONFIGURA LOS EVENTOS DE TECLADO GLOBALES
     * Escucha eventos keydown en todo el documento
     */
    setupKeyboardEvents() {
        $(document).off('keydown').on('keydown', (event) => {
            this.handleKeyboardEvents(event);
        });
    },

    /**
     * MANEJA TODOS LOS EVENTOS DE TECLADO
     * @param {KeyboardEvent} event - Evento de teclado
     *
     * Gestiona las siguientes teclas:
     * - Escape: Limpia búsqueda y enfoca input
     * - Flechas: Navega entre resultados
     * - Espacio: Selecciona/deselecciona productos
     */
    handleKeyboardEvents(event) {
        const key = event.key;

        switch (key) {
            case 'Escape':
                // ESC - Limpia búsqueda actual y restaura foco
                this.handleEscapeKey();
                break;

            case 'ArrowUp':
                // FLECHA ARRIBA - Navega al producto anterior
                event.preventDefault();
                this.navigateResults(-1);
                break;

            case 'ArrowDown':
                // FLECHA ABAJO - Navega al producto siguiente
                event.preventDefault();
                this.navigateResults(1);
                break;

            case ' ':
            case 'Spacebar':
                // ESPACIO - Alterna selección del producto actual
                event.preventDefault();
                this.handleSpaceKey(event);
                break;
        }
    },

    /**
     * MANEJA LA TECLA ESCAPE - LIMPIA BÚSQUEDA ACTUAL
     *
     * Acciones:
     * 1. Limpia el texto del input de búsqueda
     * 2. Oculta y limpia la lista de resultados
     * 3. Devuelve el foco al input de búsqueda
     */
    handleEscapeKey() {
        const searchInput = $('#search-product-input');
        const resultList = $('.result-list');

        // Limpiar búsqueda actual
        searchInput.val('');
        resultList.hide().empty();

        // Restaurar foco para nueva búsqueda
        searchInput.focus();

        console.log('Búsqueda cancelada - lista limpiada');
    },

    /**
     * NAVEGA ENTRE LOS RESULTADOS DE BÚSQUEDA CON FLECHAS
     * @param {number} direction - Dirección de navegación (-1: arriba, 1: abajo)
     *
     * Implementa navegación circular: al llegar al final, vuelve al inicio
     */
    navigateResults(direction) {
        const resultList = $('.result-list');
        const items = resultList.find('.product-item');
        const currentItem = $('.product-item:focus');

        if (items.length === 0) return;

        let nextIndex;

        if (currentItem.length === 0) {
            // Si no hay foco actual, empezar desde el primero o último
            nextIndex = direction > 0 ? 0 : items.length - 1;
        } else {
            // Calcular siguiente índice basado en posición actual
            const currentIndex = items.index(currentItem);
            nextIndex = currentIndex + direction;

            // Navegación circular
            if (nextIndex >= items.length) nextIndex = 0;
            if (nextIndex < 0) nextIndex = items.length - 1;
        }

        // Aplicar foco al siguiente elemento
        $(items[nextIndex]).focus();
    },

    /**
     * MANEJA LA BARRA ESPACIADORA - SELECCIONA/DESELECCIONA PRODUCTOS
     * @param {KeyboardEvent} event - Evento de teclado
     *
     * Funciona en dos contextos:
     * 1. Cuando el foco está directamente en un checkbox
     * 2. Cuando el foco está en un item de producto completo
     */
    handleSpaceKey(event) {
        const focusedElement = $(document.activeElement);

        // Si el foco está directamente en un checkbox, alternarlo
        if (focusedElement.hasClass('add-checkbox')) {
            focusedElement.prop('checked', !focusedElement.prop('checked'));
            focusedElement.trigger('change');
        }

        // Si el foco está en un item de producto, alternar su checkbox
        if (focusedElement.hasClass('product-item')) {
            const checkbox = focusedElement.find('.add-checkbox');
            checkbox.prop('checked', !checkbox.prop('checked'));
            checkbox.trigger('change');
        }
    }
};
