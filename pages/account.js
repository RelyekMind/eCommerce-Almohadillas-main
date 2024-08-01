// pages/account.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Account = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user orders from Firestore
        const q = query(collection(db, 'orders'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(fetchedOrders);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (!user) return null;

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Mi cuenta</h1>
        <div className="flex space-x-4">
          <div className="w-1/4">
            <ul className="space-y-2">
              <li className="p-2 border rounded bg-pink-500 text-white">Pedidos</li>
              <li className="p-2 border rounded bg-purple-500 text-white">Direcciones</li>
              <li className="p-2 border rounded bg-purple-500 text-white">Detalles de la cuenta</li>
            </ul>
          </div>
          <div className="w-3/4">
            <h2 className="text-2xl font-semibold mb-4">Pedidos</h2>
            {orders.length === 0 ? (
              <div>
                <p className="mb-4">No se ha hecho ningún pedido todavía.</p>
                <Link href="/products">
                  <span className="text-white bg-purple-500 px-4 py-2 rounded cursor-pointer">Explorar los productos</span>
                </Link>
              </div>
            ) : (
              <ul>
                {orders.map(order => (
                  <li key={order.id} className="p-4 border rounded mb-2">
                    <p>Pedido ID: {order.id}</p>
                    <p>Fecha: {order.date}</p>
                    <p>Total: {order.total}</p>
                    {/* Add more order details as needed */}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={handleLogout} className="mt-4 p-2 border rounded bg-red-500 text-white">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
