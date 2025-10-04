// Define la estructura de un objeto Cliente
export type Client = {
    name: string;
    cuit: string;
    address: string;
    phone: string;
    email: string;
    createdAt: Date;
}

// Función auxiliar para obtener la fecha de creación
function getCreatedAt(): Date {
    return new Date();
}

// Array con al menos 10 clientes de prueba
export let clients: Client[] = [
    {
        name: 'Pablo Cisera',
        cuit: '20329089895',
        address: 'Calle s/n Nº 2034',
        phone: '3482278591',
        email: 'pabloacisera2021@gmail.com',
        createdAt: getCreatedAt()
    },
    {
        name: 'Ana García S.A.',
        cuit: '30710254873',
        address: 'Av. Belgrano 1500, Buenos Aires',
        phone: '1145678901',
        email: 'ana.garcia@anagarcisa.com.ar',
        createdAt: getCreatedAt()
    },
    {
        name: 'Carlos Ruiz',
        cuit: '20159876541',
        address: 'Ruta 12 Km 54, Córdoba',
        phone: '3512345678',
        email: 'carlos.ruiz@hotmail.com',
        createdAt: getCreatedAt()
    },
    {
        name: 'Estela Maris Ferretería',
        cuit: '33604987120',
        address: 'Independencia 75, Mendoza',
        phone: '2618765432',
        email: 'ventas@estelaferreteria.com',
        createdAt: getCreatedAt()
    },
    {
        name: 'Daniel López',
        cuit: '27223344558',
        address: 'Los Robles 900, San Juan',
        phone: '2641122334',
        email: 'danilopez@gmail.com',
        createdAt: getCreatedAt()
    },
    {
        name: 'Marta Pérez Estudio Jurídico',
        cuit: '30556677881',
        address: 'Libertador 101, CABA',
        phone: '1198765432',
        email: 'estudio@martaperez.com.ar',
        createdAt: getCreatedAt()
    },
    {
        name: 'Federico Gómez',
        cuit: '23389012347',
        address: 'Barrio Norte Casa 4, Tucumán',
        phone: '3815432109',
        email: 'fgomez@outlook.com',
        createdAt: getCreatedAt()
    },
    {
        name: 'Insumos Patagónicos SRL',
        cuit: '34998877665',
        address: 'Calle del Puerto s/n, Ushuaia',
        phone: '2901765432',
        email: 'contacto@insumospatagonia.com',
        createdAt: getCreatedAt()
    },
    {
        name: 'Juan Alberto Vidal',
        cuit: '20101010101',
        address: 'Rivadavia 3050, Rosario',
        phone: '3415566778',
        email: 'javidal@hotmail.com',
        createdAt: getCreatedAt()
    },
    {
        name: 'Tecnología Integral LTDA',
        cuit: '33509080706',
        address: 'Parque Industrial Lote 5, Salta',
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

