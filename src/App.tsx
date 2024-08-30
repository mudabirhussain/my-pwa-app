import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatPage from './pages/ChatPage';
import ImageGenerationPage from './pages/ImageGenerationPage';
import TranscriptionPage from './pages/TranscriptionPage';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/image-generation" element={<ImageGenerationPage />} />
        <Route path="/transcription" element={<TranscriptionPage />} />
        </Routes>
      <Footer />
    </CartProvider>
  );
};

export default App;