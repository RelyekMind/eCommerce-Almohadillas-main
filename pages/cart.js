import React from 'react';
import { useCart } from '../components/cart/CartContext';
import Link from 'next/link';

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const incrementQuantity = (product) => {
    addToCart(product);
  };

  const decrementQuantity = (product) => {
    removeFromCart(product);
  };

  const totalCartPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <div>
          <p>El carrito está vacío.</p>
          <Link href="/products" passHref legacyBehavior>
            <a className="mt-4 p-2 bg-blue-500 text-white rounded block text-center">Seguir comprando</a>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <ul className="space-y-4">
            {cart.map((product) => (
              <li key={product.sku} className="flex justify-between items-center p-4 border rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <img src={product.mainImage} alt={product.title} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <p className="font-bold">{product.title}</p>
                    <p>Precio: ${product.price ? product.price.toLocaleString('es-CL') : 'N/A'}</p>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => decrementQuantity(product)} className="p-2 bg-gray-300 rounded">-</button>
                      <span>{product.quantity}</span>
                      <button onClick={() => incrementQuantity(product)} className="p-2 bg-gray-300 rounded">+</button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p>Total: ${product.price ? (product.price * product.quantity).toLocaleString('es-CL') : 'N/A'}</p>
                  <button onClick={() => removeFromCart(product)} className="p-2 bg-red-500 text-white rounded mt-2">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 border-t mt-4">
            <h2 className="text-lg font-bold text-right">Total del Carrito: ${totalCartPrice.toLocaleString('es-CL')}</h2>
          </div>
          <div className="flex space-x-4">
            <Link href="/products" passHref legacyBehavior>
              <a className="mt-4 p-2 bg-blue-500 text-white rounded block text-center">Seguir comprando</a>
            </Link>
            <Link href="/checkout" passHref legacyBehavior>
              <a className="mt-4 p-2 bg-purple-500 text-white rounded block text-center">
                Ir a pagar - ${totalCartPrice.toLocaleString('es-CL')}
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
