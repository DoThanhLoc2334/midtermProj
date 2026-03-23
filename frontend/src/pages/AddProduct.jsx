import { useState } from "react";
import { createProduct } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await createProduct(form);
    navigate("/");
  };

  return (
    <div>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
      <input placeholder="Category" onChange={e => setForm({...form, category: e.target.value})}/>
      <input placeholder="Price" type="number" onChange={e => setForm({...form, price: +e.target.value})}/>
      <input placeholder="Image" onChange={e => setForm({...form, image: e.target.value})}/>
      <input placeholder="Stock" type="number" onChange={e => setForm({...form, stock: +e.target.value})}/>

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}