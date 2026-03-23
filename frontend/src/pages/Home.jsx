import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const delay = setTimeout(() => {
    loadData();
  }, 500);

  return () => clearTimeout(delay);
}, [search, category]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getProducts({
        search: search || undefined,
        category: category || undefined
      });
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadData();
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", padding: "30px", color: "white",  }}>
      
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Product List
      </h1>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "20px"
      }}>
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "none",
            width: "200px"
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "none"
          }}
        >
          <option value="">All </option>
          <option value="Laptop">Laptop</option>
          <option value="Phone">Phone</option>
        </select>

        <Link to="/add" style={{
          background: "#22c55e",
          padding: "8px 12px",
          borderRadius: "5px",
          color: "white",
          textDecoration: "none"
        }}>
          Add Product
        </Link>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {products.map((p) => (
          <div key={p.id} style={{
            background: "#1e293b",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}>
            
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            <h3 style={{ marginTop: "10px" }}>{p.name}</h3>

            <p><b>Price:</b> ${p.price}</p>
            <p><b>Category:</b> {p.category}</p>
            <p><b>Stock:</b> {p.stock}</p>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px"
            }}>
              <Link to={`/product/${p.id}`} style={{ color: "#38bdf8" }}>
                Detail
              </Link>
              <Link to={`/edit/${p.id}`} style={{ color: "#facc15" }}>
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p.id)}
                style={{
                  background: "#ef4444",
                  border: "none",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}    