// Función para cargar el contenido de un template (CORREGIDA)
export function loadTemplate(containerElement, templateId) {
    // 1. Convertir el containerElement a un objeto jQuery.
    // Esto es crucial si se pasa un selector string (Ej: '#templates-content').
    const $container = $(containerElement);

    // 2. Limpia el contenedor actual
    $container.empty(); // <-- ¡Ahora sí funciona!

    // 3. Selecciona el elemento <template> usando su ID
    const templateElement = $(templateId);

    // 4. Clona el contenido real (el DOM dentro del template)
    // Usamos .get(0).content para acceder al contenido nativo del <template>
    const templateContent = templateElement.get(0).content;
    const clonedContent = $(templateContent).clone();

    // 5. Agrega el contenido clonado al contenedor
    $container.append(clonedContent); // <-- ¡Ahora sí funciona!
}
