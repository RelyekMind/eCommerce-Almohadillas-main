'use client';

import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartProvider } from '../components/cart/CartContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
