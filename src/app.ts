import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import  engine from "ejs-mate";

// importante: como ts-node compila en runtime no importa que el archivo original sea .ts
import { envs } from "./config/envOps.js";
import { renderRoutes } from "./routes/renderRoutes.js";

// obtener el puerto
const port: string | number = envs.api_port;

// obtener la ruta del root del proyecto
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
console.log( __dirname );

// instanciar la app
const app: Express = express( );
// crear y configurar servidor socket
const httpServer = createServer( app );
const io = new Server( httpServer, {
    cors: { origin: '*', methods: [ 'GET', 'POST', 'DELETE' ] }
} );

// configurar middlewares
app.use( express.json( ) );
app.use( "/assets", express.static( path.join( __dirname, "../public" ) ) );

// configurar ejs
app.engine( 'ejs', engine );
app.set('view engine', 'ejs');
app.set( 'views', path.join( __dirname, '../views' ) );

app.use("/", renderRoutes );

httpServer.listen( port, ()=> {
    console.log(`Server up in http://localhost:${ port }` );
} );



