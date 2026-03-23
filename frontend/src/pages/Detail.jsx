import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../services/api";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id).then(res => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;
  if (!product) return <p style={{ color: "red" }}>Product not found</p>;

  return (
    <div style={{
      background: "#0f172a",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      color: "white"
    }}>
      <div style={{
        background: "#1e293b",
        borderRadius: "10px",
        padding: "30px",
        maxWidth: "500px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        textAlign: "center"
      }}>
        <h1 style={{ marginTop: 0 }}>{product.name}</h1>
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        />
        <p><b>Price:</b> ${product.price}</p>
        <p><b>Category:</b> {product.category}</p>
        <p><b>Stock:</b> {product.stock}</p>
        
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#38bdf8",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}