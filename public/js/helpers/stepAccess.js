import { hasData } from './sessionHelpers.js';
import { openToast } from './toastHelper.js'

export function verifyKeyExist(key) {
    // Usar hasData que ya verifica existencia y contenido
    return hasData(key);
}

export function continueStepClient(key, path) {
    // verificar si existen datos antes de continuar
    const exists = verifyKeyExist(key);
    if (!exists) {
        openToast('Restricción', 'Este paso se encuentra bloqueado porque no se han completado los pasos anteriores. Intenteló nuevamente.', 2800);
        return;
    }


    window.location.href = path
}
