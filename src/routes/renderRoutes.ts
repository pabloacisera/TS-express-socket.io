import { Router } from "express";

const r = Router( );

r.get( "/" , ( req, res ) => {
    res.redirect( "/home" );
} );

r.get( "/home", ( req, res ) =>  {
    res.render( "home", {
        title: "Home",
        user: " GUEST",
        currentPage: "home"  // ← Agregar esto
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
