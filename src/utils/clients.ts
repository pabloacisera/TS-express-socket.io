import { v4 as uuidv4 } from "uuid";

// Define la estructura de un objeto Cliente
export type Client = {
    id: string;
    name: string;
    cuit: string;
    address: string;
    city: string; // ← AGREGADO
    phone: string;
    email: string;
    createdAt: Date;
}

// Función auxiliar para obtener la fecha de creación
function getCreatedAt(): Date {
    return new Date();
}

function createId() {
    const id = uuidv4();
    return id;
}

// Array con al menos 10 clientes de prueba
export let clients: Client[] = [
    {
        id: createId(),
        name: 'Pablo Cisera',
        cuit: '20329089895',
        address: 'Calle s/n Nº 2034',
        city: 'Reconquista', // ← AGREGADO
        phone: '3482278591',
        email: 'pabloacisera2021@gmail.com',
        createdAt: getCreatedAt()
    },
    {
        id: createId(),
        name: 'Ana García S.A.',
        cuit: '30710254873',
        address: 'Av. Belgrano 1500',
        city: 'Buenos Aires', // ← AGREGADO
        phone: '1145678901',
        email: 'ana.garcia@anagarcisa.com.ar',
        createdAt: getCreatedAt()
    },
    {
        id: createId(),
        name: 'Carlos Ruiz',
        cuit: '20159876541',
        address: 'Ruta 12 Km 54',
        city: 'Córdoba', // ← AGREGADO
        phone: '3512345678',
        email: 'carlos.ruiz@hotmail.com',
        createdAt: getCreatedAt()
    },
    {
        id: createId(),
        name: 'Estela Maris Ferretería',
        cuit: '33604987120',
        address: 'Independencia 75',
        city: 'Mendoza', // ← AGREGADO
        phone: '2618765432',
        email: 'ventas@estelaferreteria.com',
        createdAt: getCreatedAt()
    },
    {
        id: createId(),
        name: 'Daniel López',
        cuit: '27223344558',
        address: 'Los Robles 900',
        city: 'San Juan', // ← AGREGADO
        phone: '2641122334',
        email: 'danilopez@gmail.com',
        createdAt: getCreatedAt()
    },
    {
        id: createId(),
        name: 'Marta Pérez Estudio Jurídico',
        cuit: '30556677881',
        address: 'Libertador 101',
        city: 'CABA', // ← AGREGADO
        phone: '1198765432',
        email: 'estudio@martaperez.com.ar',
        createdAt: getCreatedAt()
    },
    {
        id: createId(),
        name: 'Federico Gómez',
        cuit: '23389012347',
        address: 'Barrio Norte Casa 4',
        city: 'Tucumán', // ← AGREGADO
        phone: '3815432109',
        email: 'fgomez@outlook.com',
        createdAt: getCreatedAt()
    },
    {
        id: createId(),
        name: 'Insumos Patagónicos SRL',
        cuit: '34998877665',
        address: 'Calle del Puerto s/n',
        city: 'Ushuaia', // ← AGREGADO
        phone: '2901765432',
        email: 'contacto@insumospatagonia.com',
        createdAt: getCreatedAt()
    },
    {
        id: createId(),
        name: 'Juan Alberto Vidal',
        cuit: '20101010101',
        address: 'Rivadavia 3050',
        city: 'Rosario', // ← AGREGADO
        phone: '3415566778',
        email: 'javidal@hotmail.com',
        createdAt: getCreatedAt()
    },
    {
        id: createId(),
        name: 'Tecnología Integral LTDA',
        cuit: '33509080706',
        address: 'Parque Industrial Lote 5',
        city: 'Salta', // ← AGREGADO
        phone: '3871122334',
        email: 'admin@tecnologiaintegral.com',
        createdAt: getCreatedAt()
    },
];

// Opcional: Función para agregar un cliente si se utiliza en algún endpoint
export function addClient(newClient: Omit<Client, 'createdAt'>): Client {
    const client: Client = {
        ...newClient,
        createdAt: getCreatedAt()
    };
    clients.push(client);
    return client;
}