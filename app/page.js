// page.js
import BodySection from '../components/Body';
import ProductCarousel from '../components/ProductCarousel';

export default function Home() {
  return (
    <div>
      <BodySection />
      <div className="mt-20">
        <h2 className="text-4xl font-bold text-center my-8">Productos destacados</h2>
        <ProductCarousel />
      </div>
    </div>
  );
}
