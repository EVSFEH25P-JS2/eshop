import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <ProductSection title="Featured Products" products={[]} />
      <ProductSection title="Recommended Products" products={[]} />
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
      <div className="product-grid"></div>
    </section>
  );
}

export default Home;
