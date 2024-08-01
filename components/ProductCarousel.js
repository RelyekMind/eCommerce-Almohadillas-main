"use client";
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import "../styles/carousel.css";

const ProductCarousel = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  let isDragging = false;

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const featuredCollection = collection(db, 'featured');
      const featuredSnapshot = await getDocs(featuredCollection);
      const productIds = featuredSnapshot.docs.map(doc => doc.id);

      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(product => productIds.includes(product.id));

      setFeaturedProducts(productList);
    };

    fetchFeaturedProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    customPaging: (i) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "#00bcd4",
          borderRadius: "50%",
        }}
      ></div>
    ),
    dotsClass: "slick-dots custom-dots",
    beforeChange: () => {
      isDragging = true;
    },
    afterChange: () => {
      isDragging = false;
    },
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    console.log("Botón 'AÑADIR AL CARRITO' clickeado.", product);
  };

  const formatPrice = (price) => {
    return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {featuredProducts.map((product) => (
          <div key={product.id} className="p-1 product-card no-drag">
            <div
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
              onMouseDown={() => isDragging = false}
              onMouseMove={() => isDragging = true}
              onMouseUp={() => {
                if (!isDragging) {
                  window.location.href = `/products/${product.id}`;
                }
              }}
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center no-drag">
                <img
                  src={product.mainImage}
                  alt={product.title}
                  className="object-contain h-full no-drag"
                  width={200}
                  height={200}
                  draggable="false"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold">{product.title}</h3>
              <p className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                {product.stock > 0 ? 'Disponible' : 'No disponible'}
              </p>
              <div className="flex items-center mt-2 mb-4">
                {Array(product.rating || 0)
                  .fill()
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-current no-drag"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      draggable="false"
                    >
                      <path d="M12 .587l3.668 7.431 8.167 1.182-5.897 5.744 1.389 8.087L12 18.897l-7.327 3.834 1.389-8.087L.74 9.2l8.167-1.182z" />
                    </svg>
                  ))}
              </div>
              <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
              <button
                className="bg-purple-500 text-white rounded-full px-4 py-2 mt-4 text-sm"
                onMouseUp={(e) => e.stopPropagation()}
                onClick={(e) => handleAddToCart(product, e)}
              >
                AÑADIR AL CARRITO
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
