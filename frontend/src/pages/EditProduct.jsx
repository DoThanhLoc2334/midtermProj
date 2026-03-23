import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, updateProduct } from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id).then(res => setForm(res.data));
  }, []);

  const handleSubmit = async () => {
    await updateProduct(id, form);
    navigate("/");
  };

  return (
    <div>
      <input value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})}/>
      <input value={form.category || ""} onChange={e => setForm({...form, category: e.target.value})}/>
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
}