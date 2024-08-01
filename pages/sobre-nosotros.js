'use client';

import React from 'react';
import Header from '../components/Header';  // Asegúrate de ajustar la ruta según tu estructura de carpetas
import Footer from '../components/Footer';  // Asegúrate de ajustar la ruta según tu estructura de carpetas

const AboutUs = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">NOSOTROS</h1>
          <p className="text-lg">
            ¡Bienvenido a Almohadillas Epson Chile! Nos dedicamos a ofrecerte las mejores almohadillas de impresoras Epson en el mercado, asegurando que tu equipo funcione de manera óptima y prolongue su vida útil. Nuestro compromiso es proporcionarte productos de alta calidad y un servicio excepcional.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Nuestra misión</h2>
          <p className="text-lg">
            En Almohadillas Epson Chile, nuestra misión es proporcionar a nuestros clientes soluciones confiables y de alta calidad para el mantenimiento de sus impresoras Epson. Nos esforzamos por ofrecer productos que aseguren un rendimiento superior y una mayor durabilidad de tus equipos.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Nuestra visión</h2>
          <p className="text-lg">
            Ser la empresa líder en Chile en la venta de almohadillas para impresoras Epson, reconocida por nuestra calidad, confiabilidad y excelencia en el servicio al cliente.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Nuestros valores</h2>
          <ul className="list-disc list-inside text-lg">
            <li>Calidad</li>
            <li>Confiabilidad</li>
            <li>Servicio al Cliente</li>
            <li>Innovación</li>
            <li>Compromiso</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
