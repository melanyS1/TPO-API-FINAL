export const products = [
  {
    id: "1",
    name: "Notebook Gamer X15",
    price: 999.99,
    stock: 7,
    image: "/assets/notebook.jpg",
    description: "Intel i7, 16GB RAM, RTX 4060, SSD 1TB."
  },
  {
    id: "2",
    name: "Auriculares Inalámbricos Pro",
    price: 129.9,
    stock: 0,
    image: "/assets/headphones.jpg",
    description: "Cancelación de ruido activa, 30h batería."
  }
];

export const getProductById = (id) => products.find(p => p.id === id);
