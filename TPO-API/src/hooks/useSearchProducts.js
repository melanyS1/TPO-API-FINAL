import { useState, useEffect } from "react";

function useSearchProducts() {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [productsFound, setProductsFound] = useState([]);

    useEffect(() => {
        // Cargar productos desde la API
        fetch("http://localhost:3001/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setProductsFound(data);
            });
    }, []);

    const handleQueryChange = (valor) => {
        setQuery(valor);
        const found = products.filter((product) =>
            product.name.toLowerCase().includes(valor.toLowerCase())
        );
        setProductsFound(found);
    };

    return { query, productsFound, handleQueryChange };
}

export default useSearchProducts;

