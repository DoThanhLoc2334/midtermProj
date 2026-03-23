import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;