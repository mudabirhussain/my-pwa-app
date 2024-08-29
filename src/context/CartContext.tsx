import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductRequest } from "../types/type";

interface CartContextType {
  cart: ProductRequest[];
  addToCart: (product: ProductRequest) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  handleHostedCheckout: () => Promise<void>;  // New function added
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ProductRequest[]>([]);

  const addToCart = (product: ProductRequest) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.productId === product.productId);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.productId === product.productId ? { ...p, productQuantity: p.productQuantity + product.productQuantity } : p
        );
      } else {
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleHostedCheckout = async () => {
    const cartRequest = {
      productRequest: cart.map(item => ({
        productId: item.productId,
        productQuantity: item.productQuantity,
      })),
      customerDTO: {
        customerId: "1",  // Example customer ID, replace with actual data
        customerName: "John Doe",  // Example name, replace with actual data
        customerEmail: "john.doe@example.com",  // Example email, replace with actual data
      },
      currencyEnum: "USD",
      total: cart.reduce((acc, product) => acc + product.productQuantity * product.productPrice, 0),
      mode: "STRIPE",
    };

    const stripeCheckoutUrl = `${import.meta.env.VITE_RELIFE_BACKEND_URL}/payment/stripe/checkout/hosted`;

    try {
      const response = await fetch(stripeCheckoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate checkout");
      }

      const url = await response.text();
      window.location.href = url; // Redirect to Stripe hosted checkout
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, handleHostedCheckout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};