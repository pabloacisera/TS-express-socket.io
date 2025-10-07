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