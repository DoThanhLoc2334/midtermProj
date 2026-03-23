import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // loading
  if (loading) return <p>Loading...</p>;

  // error
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/add">Add Product</Link>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px"
            }}
          >
            {/* IMAGE */}
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: "120px", objectFit: "cover" }}
            />

            <h3>{p.name}</h3>
            <p><b>Price:</b> {p.price}$</p>
            <p><b>Category:</b> {p.category}</p>
            <p><b>Stock:</b> {p.stock}</p>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link to={`/product/${p.id}`}>Detail</Link>
              <Link to={`/edit/${p.id}`}>Edit</Link>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}