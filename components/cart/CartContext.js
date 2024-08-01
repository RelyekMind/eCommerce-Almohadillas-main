'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const querySnapshot = await getDocs(collection(db, "shoppingCart"));
      const cartItems = [];
      querySnapshot.forEach((doc) => {
        cartItems.push({ id: doc.id, ...doc.data() });
      });
      setCart(cartItems);
    };
    fetchCart();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product) => {
    const q = query(collection(db, "shoppingCart"), where("sku", "==", product.sku));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0];
      const existingProduct = docRef.data();

      const updatedCart = cart.map(item =>
        item.sku === product.sku ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      
      const productDoc = doc(db, "shoppingCart", docRef.id);
      await updateDoc(productDoc, {
        quantity: existingProduct.quantity + 1
      });
    } else {
      const docRef = await addDoc(collection(db, "shoppingCart"), { ...product, quantity: 1 });
      setCart((prevCart) => [...prevCart, { id: docRef.id, ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = async (product) => {
    const q = query(collection(db, "shoppingCart"), where("sku", "==", product.sku));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0];
      const existingProduct = docRef.data();

      if (existingProduct.quantity > 1) {
        const updatedCart = cart.map(item =>
          item.sku === product.sku ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
        
        const productDoc = doc(db, "shoppingCart", docRef.id);
        await updateDoc(productDoc, {
          quantity: existingProduct.quantity - 1
        });
      } else {
        await deleteDoc(doc(db, "shoppingCart", docRef.id));
        setCart((prevCart) => prevCart.filter((item) => item.sku !== product.sku));
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
