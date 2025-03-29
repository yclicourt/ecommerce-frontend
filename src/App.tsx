import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductFormPage from "./pages/ProductFormPage";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products-create" element={<ProductFormPage />} />
        <Route path="/products/:id" element={<ProductFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
