import Card from "./Card";
import "../styles/ProductCard.css";

function ProductCard({ type = "default", product }) {
  if (type === "small") {
    return <SmallProductCard product={product} />;
  } else {
    return <DefaultProductCard product={product} />;
  }
}

function SmallProductCard({ product }) {
  return <Card></Card>;
}

function DefaultProductCard({ product }) {
  return (
    <Card>
      <div className="default-product-card-header">
        <img src={product.thumbnail} width="100%" />
      </div>
      <div className="default-product-card-body">
        <h3>{product.title}</h3>
        <p>{product.category}</p>
      </div>
    </Card>
  );
}

export default ProductCard;
