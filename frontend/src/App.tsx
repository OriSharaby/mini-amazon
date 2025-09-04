import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import { useUser

 } from './hooks/useUser';
function App() {
  const [user] = useUser(); 

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin/add-product" element={<AddProductPage />} />
        <Route path="/cart/:id" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
