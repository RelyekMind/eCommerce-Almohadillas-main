import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Ajusta la ruta según tu configuración
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        }
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center my-8">{product.title}</h1>
        <div className="flex">
          <div className="w-1/2">
            <Image src={product.mainImage} alt={product.title} className="object-contain" width={500} height={500} />
            <div className="flex mt-4 space-x-2">
              {product.otherImages && product.otherImages.map((image, index) => (
                <img key={index} src={image} alt={`${product.title} ${index}`} className="w-24 h-24 object-contain" />
              ))}
            </div>
          </div>
          <div className="w-1/2 pl-8">
            <p className="text-xl font-semibold">{product.description}</p>
            <p className="text-2xl text-gray-800 mt-4">{formatPrice(product.price)}</p>
            <p className="text-green-500 mt-2">Disponible</p>
            <button className="bg-purple-500 text-white rounded-full px-4 py-2 mt-4">Añadir al carrito</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
