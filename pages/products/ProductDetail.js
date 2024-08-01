// pages/products/[id].js
import React from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Image from 'next/image';

const ProductDetail = ({ product }) => {
  const { title, description, price, mainImage, otherImages, sku, stock } = product;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Image src={mainImage} alt={title} width={500} height={500} className="w-full h-96 object-cover" />
          <div className="flex space-x-4 mt-4">
            {otherImages.map((img, index) => (
              <Image key={index} src={img} alt={`${title} ${index}`} width={100} height={100} className="w-20 h-20 object-cover" />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-xl font-bold mb-4">${price}</p>
          <p className="text-green-500 mb-4">Disponible</p>
          <p className="mb-4">SKU: {sku}</p>
          <p className="mb-4">Stock: {stock}</p>
          <div className="flex items-center mb-4">
            <button className="bg-gray-200 px-4 py-2">-</button>
            <input type="number" defaultValue={1} className="w-16 text-center" />
            <button className="bg-gray-200 px-4 py-2">+</button>
          </div>
          <button className="bg-purple-600 text-white py-2 px-4 rounded">Añadir Al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: { id: docSnap.id, ...docSnap.data() },
    },
  };
}

export default ProductDetail;
