/**
 * Muestra un spinner sobre el viewport con un overlay difuminado
 * @param {number} duration - Tiempo en milisegundos que permanecerá visible el spinner
 */
export function showSpinner(duration) {
  // Crear el overlay (fondo difuminado)
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 9998;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // Crear el contenedor del spinner
  const spinnerContainer = document.createElement('div');
  spinnerContainer.style.cssText = `
    position: relative;
    z-index: 9999;
  `;

  // Crear el spinner
  const spinner = document.createElement('div');
  spinner.style.cssText = `
    width: 60px;
    height: 60px;
    border: 6px solid rgb(211, 132, 75);
    border-top-color: #6d452eff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  `;

  // Agregar la animación CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  // Ensamblar la estructura
  document.head.appendChild(style);
  spinnerContainer.appendChild(spinner);
  overlay.appendChild(spinnerContainer);
  document.body.appendChild(overlay);

  // Remover el spinner después del tiempo especificado
  setTimeout(() => {
    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.opacity = '0';

    setTimeout(() => {
      document.body.removeChild(overlay);
      document.head.removeChild(style);
    }, 300);
  }, duration);
}

// Ejemplo de uso:
// showSpinner(3000); // Muestra el spinner por 3 segundos
