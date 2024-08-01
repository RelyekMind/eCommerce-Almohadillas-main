'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Fuse from 'fuse.js';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProducts(products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const fuse = new Fuse(allProducts, {
      keys: ['title'],
      threshold: 0.3,
    });

    const results = fuse.search(searchTerm).map(({ item }) => item);
    setSearchResults(results);
  }, [searchTerm, allProducts]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">NEXOCOMP</h1>
        <div className="relative w-full max-w-xl mx-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="p-2 border rounded w-full text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="absolute bg-white border rounded mt-2 w-full">
              {searchResults.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} passHref legacyBehavior>
                  <a className="block p-2 hover:bg-gray-200">
                    <div className="flex items-center">
                      <img src={product.mainImage} alt={product.title} className="w-10 h-10 object-cover" />
                      <div className="ml-2">
                        <p className="text-sm font-medium text-black">{product.title}</p>
                        <p className="text-sm text-gray-600">{`$${product.price}`}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center">
          {user ? (
            <>
              <Link href="/account" passHref legacyBehavior>
                <a className="p-2 border rounded text-black">Mi cuenta</a>
              </Link>
              <button onClick={handleLogout} className="ml-4 p-2 border rounded text-red-500">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link href="/login" passHref legacyBehavior>
              <a className="p-2 border rounded text-black">Iniciar sesión</a>
            </Link>
          )}
          <button className="flex items-center ml-4 p-2 border rounded text-black">
            <span className="mr-2 text-black">$137.980</span>
            <img src="/img/carrito.png" alt="Carrito de compras" className="w-6 h-6" />
          </button>
        </div>
      </div>
      <nav className="bg-gray-200 p-2 mt-2">
        <div className="container mx-auto flex justify-between space-x-4">
          <Link href="/" passHref legacyBehavior>
            <a className="text-lg text-black">Inicio</a>
          </Link>
          <Link href="/products" passHref legacyBehavior>
            <a className="text-lg text-black">Productos</a>
          </Link>
          <Link href="/contact" passHref legacyBehavior>
            <a className="text-lg text-black">Contacto</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
