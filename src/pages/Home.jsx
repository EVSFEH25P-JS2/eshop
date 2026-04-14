import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";
import { apiFetchAllProducts } from "../api/product";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiFetchAllProducts()
      .then(setProducts)
      .catch((err) => {});
  }, []);

  return (
    <div className="home-page">
      <ProductSection
        title="Featured Products"
        products={products.slice(0, 6)}
      />
      <ProductSection
        title="Recommended Products"
        products={products.slice(6, 12)}
      />
    </div>
  );
}

function ProductSection({ title, products }) {
  return (
    <section className="product-section">
      <div className="products-header">
        <h2>{title}</h2>
        <button>See All</button>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard type="default" product={product} />
        ))}
      </div>
    </section>
  );
}

export default Home;
