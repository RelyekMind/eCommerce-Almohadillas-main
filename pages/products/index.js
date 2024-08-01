import ProductList from '../../components/ProductList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ProductsPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center my-8">Products</h1>
        <ProductList />
      </div>
      <Footer />
    </div>
  );
}
