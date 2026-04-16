import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";
import { apiFetchAllProducts } from "../api/product";

/**
 * Startsidan – visar utvalda och rekommenderade produkter i två sektioner.
 */
function Home({ setRoute }) {
  // Vi använder ett enda state-objekt med ett "status"-fält istället för tre separata states.
  // Det gör det tydligt vilka tillstånd som är möjliga: "loading", "error" eller "success".
  const [state, setState] = useState({ status: "loading" });

  // useEffect körs efter att komponenten renderas första gången.
  // Den tomma arrayen [] som andra argument betyder att den bara körs en gång – vid mount.
  useEffect(() => {
    apiFetchAllProducts(12, 0)
      .then((products) => setState({ status: "success", products }))
      .catch((err) => setState({ status: "error", message: err.message }));
  }, []);

  // Vi hanterar de olika tillstånden direkt – om vi inte är klara returnerar vi tidigt.
  if (state.status === "loading") {
    return <p className="home-status">Loading products...</p>;
  }

  if (state.status === "error") {
    return (
      <p className="home-status home-status--error">
        Failed to load products: {state.message}
      </p>
    );
  }

  return (
    <div className="home-page">
      <ProductSection
        title="Featured Products"
        products={state.products.slice(0, 6)}
        setRoute={setRoute}
      />
      <ProductSection
        title="Recommended Products"
        products={state.products.slice(6, 12)}
        setRoute={setRoute}
      />
    </div>
  );
}

/**
 * En sektion med en rubrik och ett rutnät av produktkort.
 */
function ProductSection({ title, products, setRoute }) {
  return (
    <section className="product-section">
      <div className="products-header">
        <h2>{title}</h2>
        <button>See All</button>
      </div>
      <div className="products-grid">
        {/* key={product.id} behövs för att React ska kunna hålla koll på vilken
            komponent som är vilken när listan uppdateras. */}
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
