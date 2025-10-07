import { v4 as uuidv4 } from "uuid";

function createCodeProduct() {
  let id = uuidv4();
  let code = id.slice(0, 8);
  return code;
}

function getCreatedAt(): string {
  return new Date().toISOString();
}

function createId() {
  const id = uuidv4();
  return id;
}

type Product = {
  id: string;
  make: string;
  code: string;
  name: string;
  description: string;
  price: number;
  owner: string;
  createdAt: string;
};

export let products: Product[] = [
  // 🧴 Unilever
  {
    id: createId(),
    make: "Ala",
    code: createCodeProduct(),
    name: "Detergente líquido Ala original 3L",
    description: "Detergente para ropa con fragancia fresca, eficaz en agua fría.",
    price: 1950,
    owner: "Unilever",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Vim",
    code: createCodeProduct(),
    name: "Limpiador desinfectante Vim limón 900ml",
    description: "Elimina el 99,9% de bacterias, ideal para pisos y superficies.",
    price: 890,
    owner: "Unilever",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Cif",
    code: createCodeProduct(),
    name: "Cif crema multiuso 500ml",
    description: "Limpieza profunda sin dañar las superficies.",
    price: 1150,
    owner: "Unilever",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Rexona",
    code: createCodeProduct(),
    name: "Desodorante Rexona mujer 150ml",
    description: "Protección por 48 horas contra el sudor y mal olor.",
    price: 2100,
    owner: "Unilever",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Sedal",
    code: createCodeProduct(),
    name: "Shampoo Sedal Ceramidas 340ml",
    description: "Fortalece el cabello desde la raíz.",
    price: 1700,
    owner: "Unilever",
    createdAt: getCreatedAt(),
  },

  // 🧼 Procter & Gamble
  {
    id: createId(),
    make: "Ariel",
    code: createCodeProduct(),
    name: "Jabón en polvo Ariel regular 800g",
    description: "Rendimiento superior en ropa blanca y de color.",
    price: 1650,
    owner: "Procter & Gamble",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Head & Shoulders",
    code: createCodeProduct(),
    name: "Shampoo anticaspa mentolado 375ml",
    description: "Proporciona frescura y combate la caspa desde el primer uso.",
    price: 2200,
    owner: "Procter & Gamble",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Gillette",
    code: createCodeProduct(),
    name: "Máquina de afeitar Gillette Mach3",
    description: "3 hojas de precisión para un afeitado más al ras.",
    price: 3400,
    owner: "Procter & Gamble",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Pantene",
    code: createCodeProduct(),
    name: "Acondicionador Pantene Pro-V 200ml",
    description: "Hidrata y fortalece el cabello dejándolo suave.",
    price: 1850,
    owner: "Procter & Gamble",
    createdAt: getCreatedAt(),
  },

  // 🍫 Nestlé
  {
    id: createId(),
    make: "Nestlé",
    code: createCodeProduct(),
    name: "Leche condensada Nestlé 395g",
    description: "Ideal para postres y preparaciones dulces.",
    price: 1100,
    owner: "Nestlé",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Nescafé",
    code: createCodeProduct(),
    name: "Café instantáneo Nescafé Dolca 170g",
    description: "Sabor intenso y aroma inconfundible.",
    price: 3450,
    owner: "Nestlé",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Milo",
    code: createCodeProduct(),
    name: "Bebida chocolatada Milo 400g",
    description: "Aporta energía y vitaminas, ideal para niños.",
    price: 1890,
    owner: "Nestlé",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Nesquik",
    code: createCodeProduct(),
    name: "Cacao instantáneo Nesquik 300g",
    description: "Cacao en polvo con vitaminas para leche o agua.",
    price: 1750,
    owner: "Nestlé",
    createdAt: getCreatedAt(),
  },

  // 🧃 Coca-Cola Company
  {
    id: createId(),
    make: "Coca-Cola",
    code: createCodeProduct(),
    name: "Coca-Cola 1.5L",
    description: "Gaseosa original con sabor único.",
    price: 1500,
    owner: "The Coca-Cola Company",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Fanta",
    code: createCodeProduct(),
    name: "Fanta naranja 1.5L",
    description: "Refresco sabor naranja con gas.",
    price: 1450,
    owner: "The Coca-Cola Company",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Sprite",
    code: createCodeProduct(),
    name: "Sprite 1.5L",
    description: "Gaseosa sabor lima-limón sin cafeína.",
    price: 1450,
    owner: "The Coca-Cola Company",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Aquarius",
    code: createCodeProduct(),
    name: "Bebida Aquarius sabor pomelo 500ml",
    description: "Bebida hidratante baja en sodio.",
    price: 1150,
    owner: "The Coca-Cola Company",
    createdAt: getCreatedAt(),
  },

  // 🍺 Cervecería Quilmes
  {
    id: createId(),
    make: "Quilmes",
    code: createCodeProduct(),
    name: "Cerveza Quilmes Cristal 1L",
    description: "Cerveza argentina, suave y refrescante.",
    price: 2300,
    owner: "Cervecería y Maltería Quilmes",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Stella Artois",
    code: createCodeProduct(),
    name: "Cerveza Stella Artois 473ml",
    description: "Cerveza premium de sabor balanceado.",
    price: 1900,
    owner: "Cervecería y Maltería Quilmes",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Andes Origen",
    code: createCodeProduct(),
    name: "Cerveza Andes Roja 473ml",
    description: "Cerveza artesanal con notas caramelizadas.",
    price: 1800,
    owner: "Cervecería y Maltería Quilmes",
    createdAt: getCreatedAt(),
  },

  // 🧀 Lácteos
  {
    id: createId(),
    make: "La Serenísima",
    code: createCodeProduct(),
    name: "Leche entera La Serenísima 1L",
    description: "Leche fluida entera pasteurizada.",
    price: 1250,
    owner: "Mastellone Hnos.",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Ser",
    code: createCodeProduct(),
    name: "Yogur bebible Ser frutilla 1L",
    description: "Yogur descremado con probióticos sabor frutilla.",
    price: 1550,
    owner: "Mastellone Hnos.",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "CasanCrem",
    code: createCodeProduct(),
    name: "Queso crema CasanCrem 290g",
    description: "Queso untable cremoso bajo en grasas.",
    price: 1250,
    owner: "Mastellone Hnos.",
    createdAt: getCreatedAt(),
  },

  // 🥫 Molinos Río de la Plata
  {
    id: createId(),
    make: "Lucchetti",
    code: createCodeProduct(),
    name: "Fideos Lucchetti tirabuzón 500g",
    description: "Pasta de trigo candeal seleccionada.",
    price: 980,
    owner: "Molinos Río de la Plata",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Matarazzo",
    code: createCodeProduct(),
    name: "Fideos Matarazzo tallarín 500g",
    description: "Pasta seca tradicional italiana.",
    price: 950,
    owner: "Molinos Río de la Plata",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Granja del Sol",
    code: createCodeProduct(),
    name: "Milanesas de soja 4u",
    description: "Milanesas vegetales congeladas listas para cocinar.",
    price: 1850,
    owner: "Molinos Río de la Plata",
    createdAt: getCreatedAt(),
  },

  // 🧁 Bimbo
  {
    id: createId(),
    make: "Bimbo",
    code: createCodeProduct(),
    name: "Pan lactal blanco Bimbo 600g",
    description: "Pan tierno y esponjoso, ideal para sandwiches.",
    price: 1750,
    owner: "Grupo Bimbo",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Bimbo Artesano",
    code: createCodeProduct(),
    name: "Pan Artesano 500g",
    description: "Pan artesanal con corteza dorada y suave miga.",
    price: 1950,
    owner: "Grupo Bimbo",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Bimbo",
    code: createCodeProduct(),
    name: "Medialunas dulces 6u",
    description: "Medialunas esponjosas con sabor manteca.",
    price: 1650,
    owner: "Grupo Bimbo",
    createdAt: getCreatedAt(),
  },

  // 🧃 Danone
  {
    id: createId(),
    make: "Villavicencio",
    code: createCodeProduct(),
    name: "Agua mineral natural 2L",
    description: "Agua pura de manantial, baja en sodio.",
    price: 1050,
    owner: "Danone",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Cepita",
    code: createCodeProduct(),
    name: "Jugo de naranja Cepita 1L",
    description: "Jugo 100% exprimido sin conservantes.",
    price: 1300,
    owner: "Danone",
    createdAt: getCreatedAt(),
  },

  // 🐶 Mars Petcare
  {
    id: createId(),
    make: "Pedigree",
    code: createCodeProduct(),
    name: "Alimento para perro adulto 3kg",
    description: "Nutrición completa con pollo y arroz.",
    price: 4200,
    owner: "Mars Petcare",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Whiskas",
    code: createCodeProduct(),
    name: "Alimento para gato adulto sabor carne 1.5kg",
    description: "Croquetas crujientes por fuera y suaves por dentro.",
    price: 3200,
    owner: "Mars Petcare",
    createdAt: getCreatedAt(),
  },

  // 🍪 Arcor
  {
    id: createId(),
    make: "Bagley",
    code: createCodeProduct(),
    name: "Galletitas Sonrisas 90g",
    description: "Rellenas sabor frutilla, clásicas para toda la familia.",
    price: 780,
    owner: "Arcor",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Opera",
    code: createCodeProduct(),
    name: "Galletitas Opera chocolate 118g",
    description: "Bañadas en chocolate con relleno cremoso.",
    price: 950,
    owner: "Arcor",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Bon o Bon",
    code: createCodeProduct(),
    name: "Bombones Bon o Bon caja 15u",
    description: "Bombones de dulce de leche cubiertos con chocolate.",
    price: 3500,
    owner: "Arcor",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Tita",
    code: createCodeProduct(),
    name: "Tita 38g",
    description: "Alfajor de galleta con relleno de limón y baño de chocolate.",
    price: 450,
    owner: "Arcor",
    createdAt: getCreatedAt(),
  },

  // 🧂 AGD
  {
    id: createId(),
    make: "Natura",
    code: createCodeProduct(),
    name: "Aceite de girasol Natura 1.5L",
    description: "Aceite puro de girasol ideal para cocinar.",
    price: 2400,
    owner: "AGD Alimentos",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Mayoliva",
    code: createCodeProduct(),
    name: "Mayonesa Mayoliva 475g",
    description: "Mayonesa con aceite de oliva, sabor suave.",
    price: 2100,
    owner: "AGD Alimentos",
    createdAt: getCreatedAt(),
  },

  // 🧃 Energizantes y snacks (varios)
  {
    id: createId(),
    make: "Red Bull",
    code: createCodeProduct(),
    name: "Bebida energizante Red Bull 250ml",
    description: "Energía instantánea para cuerpo y mente.",
    price: 2100,
    owner: "Red Bull GmbH",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Monster",
    code: createCodeProduct(),
    name: "Energizante Monster Green 473ml",
    description: "Bebida energética sabor original con cafeína.",
    price: 2300,
    owner: "Monster Energy Company",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Lays",
    code: createCodeProduct(),
    name: "Papas fritas clásicas 90g",
    description: "Crujientes y saladas, el snack ideal.",
    price: 1200,
    owner: "PepsiCo",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Doritos",
    code: createCodeProduct(),
    name: "Doritos nacho 90g",
    description: "Triángulos de maíz sabor intenso a queso.",
    price: 1250,
    owner: "PepsiCo",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Cheetos",
    code: createCodeProduct(),
    name: "Cheetos queso 90g",
    description: "Palitos de maíz inflado sabor queso.",
    price: 1150,
    owner: "PepsiCo",
    createdAt: getCreatedAt(),
  },
];
