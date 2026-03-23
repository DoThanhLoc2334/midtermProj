import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

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