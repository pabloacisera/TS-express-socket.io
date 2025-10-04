import { openToast } from './toastHelper.js';

export const saveData = (key, data) => {
    try {
        // convertir a string
        let dataJson = JSON.stringify(data);

        // guardar en session
        sessionStorage.setItem(key, dataJson);

        //alert('Cliente almacenado redirigiendo')
        openToast( 'Aviso', 'Cliente seleccionado. Actualizando formulario...', 1800 );

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

        return data;
    } catch (error) {
        openToast( 'Error', 'No se ha podido seleccionar el cliente. Inténtelo de nuevo.', 1800 );
    }
}
