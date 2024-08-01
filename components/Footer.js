import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#041531] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold mb-4">NEXOCOMP</h2>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com">
              <img src="/img/instagram.png" alt="Instagram" className="w-8 h-8"/>
            </a>
            <a href="https://www.tiktok.com">
              <img src="/img/tiktok.png" alt="TikTok" className="w-8 h-8"/>
            </a>
            <a href="https://www.whatsapp.com">
              <img src="/img/whatsapp.png" alt="WhatsApp" className="w-8 h-8"/>
            </a>
            <a href="mailto:contacto@nexocomp.cl">
              <img src="/img/email.png" alt="Email" className="w-8 h-8"/>
            </a>
          </div>
        </div>
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">SERVICIOS</h2>
          <ul className="space-y-2">
            <li>Venta de Almohadillas Impresora Epson  L120
            L210 L355 L375 L380 L455 </li>
            <li>Venta de Almohadillas Impresora Epson L5190 L3210 L3250 L5290</li>
            <li>Venta de Almohadillas Impresora Epson L4150 L4160
            L6160 L6168 L6170</li>
            <li>Venta de Almohadillas Impresora Epson L800
            L805</li>

            
          </ul>
        </div>
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">LINKS</h2>
          <ul className="space-y-2">
            <li>Acerca de Nosotros</li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">CONTACTO</h2>
          <ul className="space-y-2">
            <li>Teléfono: +56 9 71364000</li>
            <li>Mail: contacto@nexocomp.cl</li>
            <li>Dirección: 14 de Febrero 2534 Oficina 303, Antofagasta</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center mt-8 border-t border-gray-700 pt-4">
        <p>Diseñado por NEXOCOMP® soluciones informáticas.</p>
        <p>Copyright © 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
