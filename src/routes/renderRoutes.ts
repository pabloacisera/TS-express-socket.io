import { Router } from "express";
import { clients } from "../utils/clients.js";
import { products } from '../utils/products.js';

const r = Router();
let clientsJson = JSON.stringify(clients);
let productsJson = JSON.stringify(products);

r.get("/", (req, res) => {
    res.redirect("/home");
});

// Página principal del home (sin sección específica)
r.get("/home", (req, res) => {
    res.render("home", {
        title: "Home - principal",
        user: "GUEST",
        currentPage: "home",
        internalPage: null  // No hay página interna seleccionada
    });
});

r.get("/facturation", (req, res) => {
    res.render("facturation", {
        title: "Facturación",
        currentPage: "facturation"
    })
})

// Sub-rutas del home
r.get("/home/products", (req, res) => {
    res.render("products", {
        title: "Gestión de Productos",
        user: "GUEST",
        currentPage: "home",
        internalPage: "products",  // ← Página interna activa
        products: productsJson,
        clients: clientsJson
    });
});

r.get("/home/clients", (req, res) => {
    res.render("clients", {
        title: "Gestión de Clientes",
        user: "GUEST",
        currentPage: "home",
        internalPage: "clients",  // ← Página interna activa
        products: productsJson,
        clients: clientsJson
    });
});

r.get("/historial", (req, res) => {
    res.render("historial", {
        title: "Historial",
        user: "GUEST",
        currentPage: "historial"
    });
});

export { r as renderRoutes };
