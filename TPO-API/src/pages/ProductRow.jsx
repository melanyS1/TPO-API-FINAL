import useGetProducts from "../hooks/useGetProducts";
import { Link } from "react-router-dom";

export default function ProductRow() {
  const products = useGetProducts();

  return (
    <div style={{ marginTop: 48 }}>
      <h2 style={{ fontSize: 22, marginBottom: 24 }}>Vistos frecuentemente por los clientes</h2>
      <div style={{
        display: "flex",
        gap: 32,
        overflowX: "auto",
        paddingBottom: 16
      }}>
        {products.map(prod => (
          <div key={prod.id} style={{
            minWidth: 220,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px #0001",
            padding: 16,
            textAlign: "center"
          }}>
            <img src={prod.image} alt={prod.name} style={{ width: "100%", maxWidth: 180, borderRadius: 6 }} />
            <div style={{ fontWeight: 600, margin: "12px 0 8px", fontSize: 16 }}>{prod.name}</div>
            <div style={{ color: "#b12704", fontWeight: 700, fontSize: 18 }}>${prod.price.toFixed(2)}</div>
            <div style={{ color: "#555", fontSize: 14, marginBottom: 8 }}>{prod.description.slice(0, 50)}...</div>
            <Link
              to={`../${prod.id}`}
              relative="path"
              style={{
                display: "inline-block",
                background: "#ffd814",
                color: "#222",
                fontWeight: 700,
                padding: "8px 16px",
                border: 0,
                borderRadius: 6,
                fontSize: 15,
                cursor: "pointer",
                marginTop: 8,
                textDecoration: "none"
              }}
            >
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}