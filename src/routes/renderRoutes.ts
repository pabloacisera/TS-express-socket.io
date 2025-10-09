import { Router } from "express";
import { clients } from "../utils/clients.js";
import { products } from '../utils/products.js';

const r = Router();
let clientsJson = JSON.stringify(clients);
let productsJson = JSON.stringify(products);

r.get("/", (req, res) => {
    res.redirect("/home");
});

r.get("/home", (req, res) => {
    res.render("home", {
        title: "Home - principal",
        user: "GUEST",
        currentPage: "home",
        internalPage: null 
    });
});

r.get("/facturation", (req, res) => {
    res.redirect("/facturation/products")
})

r.get("/facturation/products", (req, res) => {
    res.render("products", {
        title: "Gestión de Productos",
        user: "GUEST",
        currentPage: "home",
        internalPage: "products",
        products: productsJson,
    });
});

r.get("/facturation/clients", (req, res) => {
    res.render("clients", {
        title: "Gestión de Clientes",
        user: "GUEST",
        currentPage: "home",
        internalPage: "clients",
        clients: clientsJson
    });
});

r.get("/facturation/pay", (req, res) => {
    res.render("pay", {
        title: "Gestión de Pago",
        user: "GUEST",
        currentPage: "home",
        internalPage: "pay", 
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
