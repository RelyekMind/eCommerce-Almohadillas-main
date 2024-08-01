// components/ProductCard.js
import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <img src={product.mainImage} alt={product.title} className="object-contain h-48 w-full rounded-lg cursor-pointer" />
      </Link>
      <h3 className="mt-4 text-lg font-semibold cursor-pointer">
        <Link href={`/products/${product.id}`}>
          {product.title}
        </Link>
      </h3>
      <p className="text-gray-700">{formatPrice(product.price)}</p>
      <p className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
        {product.stock > 0 ? 'Disponible' : 'No disponible'}
      </p>
    </div>
  );
};

export default ProductCard;
