import Card from "./Card";
import "../styles/ProductCard.css";
import { Page } from "../App";

function ProductCard({ type = "default", product, setRoute }) {
  if (type === "small") {
    return <SmallProductCard product={product} setRoute={setRoute} />;
  } else {
    return <DefaultProductCard product={product} setRoute={setRoute} />;
  }
}

function SmallProductCard({ product, setRoute }) {
  return <Card></Card>;
}

function DefaultProductCard({ product, setRoute }) {
  return (
    <Card onClick={() => setRoute(Page.PRODUCT, { productId: product.id })}>
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
