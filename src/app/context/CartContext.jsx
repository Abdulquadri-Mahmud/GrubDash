"use client";

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setSelectedFood(null);
  };

  return (
    <CartContext.Provider value={{ cart, selectedFood, setSelectedFood, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
