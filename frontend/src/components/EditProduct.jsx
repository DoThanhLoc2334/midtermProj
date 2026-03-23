import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, updateProduct } from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    stock: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    getProduct(id).then(res => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // validate
    if (!form.name || !form.category || !form.price || !form.image) {
      setError("Please fill all fields");
      return;
    }

    if (isNaN(form.price) || isNaN(form.stock)) {
      setError("Price & Stock must be numbers");
      return;
    }

    await updateProduct(id, form);
    navigate("/");
  };

  return (
    <div style={{
      background: "#0f172a",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div style={{
        background: "#1e293b",
        padding: "30px",
        borderRadius: "10px",
        width: "350px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        color: "white"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Edit Product
        </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* NAME */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          style={inputStyle}
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Category</option>
          <option value="Laptop">Laptop</option>
          <option value="Phone">Phone</option>
        </select>

        {/* PRICE */}
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          style={inputStyle}
        />

        {/* IMAGE */}
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          style={inputStyle}
        />

        {/* STOCK */}
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          style={inputStyle}
        />

        {/* PREVIEW IMAGE */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "10px"
            }}
          />
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "10px",
            background: "#22c55e",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Update Product
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "none"
};