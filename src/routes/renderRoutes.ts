import { Router } from "express";
import { clients } from "../utils/clients.js";
import { products } from '../utils/products.js';

const r = Router( );

r.get( "/" , ( req, res ) => {
    res.redirect( "/home" );
} );

r.get( "/home", ( req, res ) =>  {

    // serializar los datos antes de enviar
    let clientsJson = JSON.stringify( clients );
    let productsJson = JSON.stringify( products );

    res.render( "home", {
        title: "Home",
        user: " GUEST",
        currentPage: "home",  // ← Agregar esto
        clients: clientsJson || [],
        products: productsJson || []
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
