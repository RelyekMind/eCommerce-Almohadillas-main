import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Ajusta la ruta según tu configuración
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { useCart } from '../../components/cart/CartContext';  // Ajuste de la ruta de importación

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAddToCart = () => {
    addToCart(product);
    console.log("Producto añadido al carrito:", product);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">{product.title}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <Image src={product.mainImage} alt={product.title} className="object-contain" width={500} height={500} />
            <div className="flex mt-4 space-x-2">
              {product.otherImages && product.otherImages.map((image, index) => (
                <img key={index} src={image} alt={`${product.title} ${index}`} className="w-24 h-24 object-contain" />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <p className="text-xl font-semibold mb-4">{product.description}</p>
            <p className="text-2xl text-gray-800 mb-4">{formatPrice(product.price)}</p>
            <p className="mb-4">{product.sku && <strong>SKU: {product.sku}</strong>}</p>
            <p className={product.stock > 0 ? 'text-green-500 mb-4' : 'text-red-500 mb-4'}>
              {product.stock > 0 ? `Disponible (${product.stock})` : 'No disponible'}
            </p>
            <button 
              className="bg-blue-900 text-white rounded-full px-4 py-2"
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
