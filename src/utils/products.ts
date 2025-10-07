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
  // 💻 Apple
  {
    id: createId(),
    make: "Apple",
    code: createCodeProduct(),
    name: "MacBook Pro 14\" M3 Pro",
    description: "Laptop profesional con chip M3 Pro, 16GB RAM, 512GB SSD",
    price: 249999,
    owner: "Apple Inc.",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Apple",
    code: createCodeProduct(),
    name: "iPhone 15 Pro 128GB",
    description: "Smartphone con titanio, cámara 48MP, chip A17 Pro",
    price: 149999,
    owner: "Apple Inc.",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Apple",
    code: createCodeProduct(),
    name: "iPad Air 11\" M2",
    description: "Tablet con chip M2, 128GB, Wi-Fi + Cellular",
    price: 89999,
    owner: "Apple Inc.",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Apple",
    code: createCodeProduct(),
    name: "AirPods Pro 3ra generación",
    description: "Audífonos inalámbricos con cancelación activa de ruido",
    price: 34999,
    owner: "Apple Inc.",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Apple",
    code: createCodeProduct(),
    name: "Apple Watch Series 9 45mm",
    description: "Smartwatch con GPS, pantalla Always-On, aluminio",
    price: 52999,
    owner: "Apple Inc.",
    createdAt: getCreatedAt(),
  },

  // 🖥️ Dell Technologies
  {
    id: createId(),
    make: "Dell",
    code: createCodeProduct(),
    name: "XPS 13 Plus 9320",
    description: "Ultrabook 13.4\" 4K, Intel i7, 16GB RAM, 1TB SSD",
    price: 189999,
    owner: "Dell Technologies",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Dell",
    code: createCodeProduct(),
    name: "Alienware Aurora R15",
    description: "Gaming PC, RTX 4080, Intel i9, 32GB RAM, 2TB SSD",
    price: 359999,
    owner: "Dell Technologies",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Dell",
    code: createCodeProduct(),
    name: "UltraSharp U2723QE 27\"",
    description: "Monitor 4K USB-C Hub, IPS Black, calibrado de fábrica",
    price: 78999,
    owner: "Dell Technologies",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Dell",
    code: createCodeProduct(),
    name: "Precision 7670 Workstation",
    description: "Laptop workstation, Xeon, RTX A5000, 64GB RAM",
    price: 459999,
    owner: "Dell Technologies",
    createdAt: getCreatedAt(),
  },

  // 🎮 ASUS
  {
    id: createId(),
    make: "ASUS",
    code: createCodeProduct(),
    name: "ROG Strix Scar 18",
    description: "Gaming laptop 18\", RTX 4090, Intel i9, 64GB RAM",
    price: 429999,
    owner: "ASUS",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "ASUS",
    code: createCodeProduct(),
    name: "ROG Swift PG32UQX",
    description: "Monitor gaming 32\" 4K 144Hz, Mini-LED, G-Sync Ultimate",
    price: 159999,
    owner: "ASUS",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "ASUS",
    code: createCodeProduct(),
    name: "Zenbook Pro 14 Duo OLED",
    description: "Laptop dual-screen, RTX 4060, Intel i9, 32GB RAM",
    price: 229999,
    owner: "ASUS",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "ASUS",
    code: createCodeProduct(),
    name: "TUF Gaming GT302 ARGB",
    description: "Gabinete mid-tower, 4 fans ARGB, panel de vidrio templado",
    price: 18999,
    owner: "ASUS",
    createdAt: getCreatedAt(),
  },

  // 🖱️ Logitech
  {
    id: createId(),
    make: "Logitech",
    code: createCodeProduct(),
    name: "MX Master 3S Wireless",
    description: "Mouse ergonómico para productividad, 8000 DPI",
    price: 12999,
    owner: "Logitech",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Logitech",
    code: createCodeProduct(),
    name: "MX Keys Mechanical",
    description: "Teclado mecánico inalámbrico, retroiluminación inteligente",
    price: 18999,
    owner: "Logitech",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Logitech",
    code: createCodeProduct(),
    name: "G Pro X Superlight 2",
    description: "Mouse gaming inalámbrico, 63g, sensor HERO 2",
    price: 15999,
    owner: "Logitech",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Logitech",
    code: createCodeProduct(),
    name: "StreamCam Plus",
    description: "Cámara web 1080p 60fps, USB-C, para streaming",
    price: 21999,
    owner: "Logitech",
    createdAt: getCreatedAt(),
  },

  // 🔊 Audio Profesional
  {
    id: createId(),
    make: "Bose",
    code: createCodeProduct(),
    name: "QuietComfort Ultra Headphones",
    description: "Audífonos noise cancelling, audio espacial Immersive",
    price: 44999,
    owner: "Bose Corporation",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Sennheiser",
    code: createCodeProduct(),
    name: "HD 660S2",
    description: "Audífonos de diadema abiertos, alta fidelidad",
    price: 38999,
    owner: "Sennheiser",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Audio-Technica",
    code: createCodeProduct(),
    name: "AT2020USB+X",
    description: "Micrófono condensador USB, kit streaming completo",
    price: 24999,
    owner: "Audio-Technica",
    createdAt: getCreatedAt(),
  },

  // 🛠️ Componentes PC
  {
    id: createId(),
    make: "NVIDIA",
    code: createCodeProduct(),
    name: "GeForce RTX 4090 Founders Edition",
    description: "GPU 24GB GDDR6X, DLSS 3, ray tracing",
    price: 189999,
    owner: "NVIDIA",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "AMD",
    code: createCodeProduct(),
    name: "Ryzen 9 7950X3D",
    description: "Procesador 16-core, 32 threads, tecnología 3D V-Cache",
    price: 78999,
    owner: "AMD",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Corsair",
    code: createCodeProduct(),
    name: "Vengeance RGB DDR5 32GB 6000MHz",
    description: "Memoria RAM DDR5, iluminación RGB, Intel XMP 3.0",
    price: 15999,
    owner: "Corsair",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Samsung",
    code: createCodeProduct(),
    name: "990 Pro 2TB NVMe SSD",
    description: "SSD PCIe 4.0, velocidades hasta 7450MB/s",
    price: 28999,
    owner: "Samsung",
    createdAt: getCreatedAt(),
  },

  // 📱 Samsung
  {
    id: createId(),
    make: "Samsung",
    code: createCodeProduct(),
    name: "Galaxy S24 Ultra 512GB",
    description: "Smartphone con S Pen, cámara 200MP, Snapdragon 8 Gen 3",
    price: 139999,
    owner: "Samsung",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Samsung",
    code: createCodeProduct(),
    name: "Galaxy Tab S9 Ultra 16GB/1TB",
    description: "Tablet 14.6\" AMOLED, S Pen incluido, Snapdragon 8 Gen 2",
    price: 159999,
    owner: "Samsung",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Samsung",
    code: createCodeProduct(),
    name: "Odyssey Neo G9 49\"",
    description: "Monitor super ultrawide 5120x1440, 240Hz, Mini-LED",
    price: 199999,
    owner: "Samsung",
    createdAt: getCreatedAt(),
  },

  // 🔌 Accesorios y Periféricos
  {
    id: createId(),
    make: "Anker",
    code: createCodeProduct(),
    name: "Prime 67W GaN Charger",
    description: "Cargador compacto 67W, 3 puertos, tecnología GaN",
    price: 8999,
    owner: "Anker",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "HyperX",
    code: createCodeProduct(),
    name: "Cloud III Wireless",
    description: "Headset gaming inalámbrico, 120h batería, DTS Spatial",
    price: 19999,
    owner: "HP Inc.",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Razer",
    code: createCodeProduct(),
    name: "BlackWidow V4 Pro",
    description: "Teclado mecánico gaming, switches verdes, wrist rest magnético",
    price: 24999,
    owner: "Razer",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "SteelSeries",
    code: createCodeProduct(),
    name: "Aerox 5 Wireless",
    description: "Mouse gaming inalámbrico, 180h batería, 9 botones programables",
    price: 14999,
    owner: "SteelSeries",
    createdAt: getCreatedAt(),
  },

  // 💼 Workstation y Servidores
  {
    id: createId(),
    make: "HP",
    code: createCodeProduct(),
    name: "ZBook Studio G10",
    description: "Mobile workstation, Intel i9, RTX 5000 Ada, 64GB RAM",
    price: 389999,
    owner: "HP Inc.",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Lenovo",
    code: createCodeProduct(),
    name: "ThinkPad X1 Carbon Gen 11",
    description: "Laptop empresarial ultraligera, Intel i7, 32GB RAM",
    price: 219999,
    owner: "Lenovo",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Synology",
    code: createCodeProduct(),
    name: "DS1823xs+ 8-Bay NAS",
    description: "Servidor NAS empresarial, 8 bahías, AMD Ryzen V1500B",
    price: 189999,
    owner: "Synology",
    createdAt: getCreatedAt(),
  },

  // 🎥 Producción y Creatividad
  {
    id: createId(),
    make: "Canon",
    code: createCodeProduct(),
    name: "EOS R5 Mark II",
    description: "Cámara mirrorless 45MP, video 8K 60p, estabilización 8-stop",
    price: 459999,
    owner: "Canon",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Wacom",
    code: createCodeProduct(),
    name: "Cintiq Pro 27",
    description: "Tableta display 4K, 99% Adobe RGB, touch express keys",
    price: 129999,
    owner: "Wacom",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Elgato",
    code: createCodeProduct(),
    name: "Stream Deck +",
    description: "Controlador para streaming, 8 teclas LCD, 4 diales táctiles",
    price: 15999,
    owner: "Corsair",
    createdAt: getCreatedAt(),
  },

  // 🔋 Almacenamiento y Redes
  {
    id: createId(),
    make: "Western Digital",
    code: createCodeProduct(),
    name: "Black SN850X 4TB NVMe",
    description: "SSD gaming 4TB, PCIe 4.0, velocidades 7300MB/s",
    price: 58999,
    owner: "Western Digital",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "Seagate",
    code: createCodeProduct(),
    name: "FireCuda 540 4TB",
    description: "SSD PCIe 5.0, 10000MB/s, disipador de calor incluido",
    price: 78999,
    owner: "Seagate",
    createdAt: getCreatedAt(),
  },
  {
    id: createId(),
    make: "TP-Link",
    code: createCodeProduct(),
    name: "Archer AXE300",
    description: "Router Wi-Fi 6E tri-band, 16 streams, 10G puertos",
    price: 69999,
    owner: "TP-Link",
    createdAt: getCreatedAt(),
  }
];