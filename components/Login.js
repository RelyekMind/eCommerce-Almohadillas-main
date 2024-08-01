import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase'; // Ajusta la ruta según tu estructura
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isRegister ? 'Registro' : 'Login'}</h1>
      <input
        type="email"
        placeholder="Email"
        className="p-2 border rounded mb-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="p-2 border rounded mb-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded w-full">
        {isRegister ? 'Registrarse' : 'Login'}
      </button>
      <p
        onClick={() => setIsRegister(!isRegister)}
        className="mt-4 text-blue-500 cursor-pointer"
      >
        {isRegister ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
      </p>
    </div>
  );
};

export default Login;
