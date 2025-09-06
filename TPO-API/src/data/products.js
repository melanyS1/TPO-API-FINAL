const products = [
  {
    id: "1",
    name: "Mini Proyector Elephas",
    price: 41.96,
    stock: 7,
    description: "2020 Mini Proyector de Película, 5000 LUX Full HD 1080P, compatible con USB/HDMI/VGA/Computadora/Portátil/iPhone/TV Stick/Tarjeta TF.",
    image: "https://m.media-amazon.com/images/I/51CnRBSVnrL._AC_SL1500_.jpg",
    seller: {
      sellerId: 101,
      sellerName: "ElectroMundo"
    }
  },
  {
    id: "2",
    name: "Proyector portátil YG300",
    price: 48.42,
    stock: 12,
    description: "Mini proyector de 7500 lúmenes para películas al aire libre, hasta 170 pulgadas.",
    image: "https://sistema.langtecnologia.com.ar/img/qloud/2572/8140_1.jpg",
    seller: {
      sellerId: 102,
      sellerName: "Ana Torres"
    }
  },
  {
    id: "3",
    name: "Proyector WiFi Bluetooth 5.1",
    price: 65.99,
    stock: 5,
    description: "Proyector portátil con soporte 4K, altavoz base de sonido, compatible con HDMI y USB.",
    image: "https://m.media-amazon.com/images/I/51AQ01HrQPL._AC_SL1200_.jpg",
    seller: {
      sellerId: 103,
      sellerName: "ProyecShop"
    }
  },
  {
    id: "4",
    name: "Proyector Cine para Exteriores",
    price: 139.99,
    stock: 8,
    description: "Proyector de cine portátil nativo 1080P, 15000 lúmenes, compatible con TV Stick.",
    image: "https://www.el-pentagono.com.ar/mods/html/fil/Model/Product/1106/650dbf706e72c-proyector.png.webp",
    seller: {
      sellerId: 104,
      sellerName: "María López"
    }
  },
  {
    id: "5",
    name: "Proyector ViewSonic PA503S",
    price: 299.99,
    stock: 4,
    description: "Proyector ViewSonic PA503S 3600 lúmenes HDMI VGA.",
    image: "https://www.iggual.com//images/product/large/IGG319208,grid_Mesadetrabajo1_17212998717_1.webp",
    seller: {
      sellerId: 105,
      sellerName: "TecnoStore"
    }
  }
];

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export default products;