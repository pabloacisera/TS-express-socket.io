import { Router } from "express";
import { clients } from "../utils/clients.js";

const r = Router( );

r.get( "/" , ( req, res ) => {
    res.redirect( "/home" );
} );

r.get( "/home", ( req, res ) =>  {

    // serializar los datos antes de enviar
    let clientsJson = JSON.stringify( clients );

    res.render( "home", {
        title: "Home",
        user: " GUEST",
        currentPage: "home",  // ← Agregar esto
        clients: clientsJson || []
    } );
})

r.get( "/historial", ( req, res )=> {
    res.render( "historial", {
        title: "historial",
        user: " Guest",
        currentPage: "historial"  // ← Agregar esto
    });
});

export { r as renderRoutes };
