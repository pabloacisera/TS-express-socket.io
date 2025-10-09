import { openToast } from './toastHelper.js';

export const saveData = (key, data) => {
    try {
        // convertir a string
        let dataJson = JSON.stringify(data);

        // guardar en session
        sessionStorage.setItem(key, dataJson);

    } catch (error) {
        openToast( 'Error', 'No se ha podido seleccionar el cliente. Inténtelo de nuevo.', 1800 );
    }
}

// recuperar y parsear datos
export const getData = ( key ) => {

    try {
        // obtener el json
        let data = sessionStorage.getItem( key );

        if( !data ) {
            return null;
        }

        // convertimos el json a object
        let objectData = JSON.parse( data );

        return objectData;
    } catch (error) {
        openToast( 'Error', 'No se ha podido seleccionar el cliente. Inténtelo de nuevo.', 1800 );
    }
}

export const deleteData = ( key ) => {
    try {
        sessionStorage.removeItem( key );
    } catch (error) {
        openToast( 'Error', 'No se ha podido eliminar el registro temporal del cliente', 1800 );
    }
}

export const hasData = (key, propertyPath = null) => {
    const data = getData(key);
    
    // Si no existe la key, false
    if (!data) return false;
    
    // Si no hay propertyPath, verificar que data tenga contenido
    if (!propertyPath) {
        // Verificar si es objeto vacío o array vacío
        if (Array.isArray(data)) {
            return data.length > 0;
        }
        if (typeof data === 'object') {
            return Object.keys(data).length > 0;
        }
        // Para valores primitivos (string, number, boolean)
        return data !== '' && data !== null && data !== undefined;
    }
    
    // Verificar propiedad anidada
    const properties = propertyPath.split('.');
    let current = data;
    
    for (let prop of properties) {
        if (!current || !current.hasOwnProperty(prop)) {
            return false;
        }
        current = current[prop];
    }
    
    // Verificar que el valor final tenga datos
    if (Array.isArray(current)) {
        return current.length > 0;
    }
    if (typeof current === 'object' && current !== null) {
        return Object.keys(current).length > 0;
    }
    
    return current !== '' && current !== null && current !== undefined;
};