import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/');
    } catch (error) {
      console.error('Authentication error', error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-16 text-center">{isRegister ? 'Registro' : 'Acceder'}</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-6">
            <label className="block mb-2 text-lg">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border rounded w-full text-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-lg">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border rounded w-full text-lg"
              required
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <button type="submit" className="p-3 bg-blue-500 text-white rounded text-lg">
              {isRegister ? 'Registrarse' : 'Iniciar sesión'}
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="p-3 text-blue-500 rounded text-lg"
            >
              {isRegister ? 'Ya tengo una cuenta' : 'Crear una cuenta'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
