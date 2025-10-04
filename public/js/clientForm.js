// Archivo clientForm.js

$(function() {

    // si existen datos en la session cargarlos


    $( '#client-form' ).on( 'submit', function( event ) {
        event.preventDefault( );
        alert('submit')
    })
});
