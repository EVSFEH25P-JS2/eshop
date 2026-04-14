import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";
import { apiFetchAllProducts } from "../api/product";

function Home({ setRoute }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiFetchAllProducts(12, 0)
      .then(setProducts)
      .catch((err) => {});
  }, []);

  return (
    <div className="home-page">
      <ProductSection
        title="Featured Products"
        products={products.slice(0, 6)}
        setRoute={setRoute}
      />
      <ProductSection
        title="Recommended Products"
        products={products.slice(6, 12)}
        setRoute={setRoute}
      />
    </div>
  );
}

function ProductSection({ title, products, setRoute }) {
  return (
    <section className="product-section">
      <div className="products-header">
        <h2>{title}</h2>
        <button>See All</button>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            type="default"
            product={product}
            setRoute={setRoute}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
