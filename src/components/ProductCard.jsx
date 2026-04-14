import Card from "./Card";
import "../styles/ProductCard.css";
import { Page } from "../App";

function ProductCard({ type = "default", product, setRoute }) {
  let variant = null;
  if (type === "small") {
    variant = <SmallProductCard product={product} setRoute={setRoute} />;
  } else {
    variant = <DefaultProductCard product={product} setRoute={setRoute} />;
  }

  return (
    <Card onClick={() => setRoute(Page.PRODUCT, { productId: product.id })}>
      {variant}
    </Card>
  );
}

function SmallProductCard({ product }) {
  return <></>;
}

function DefaultProductCard({ product }) {
  return (
    <>
      <div className="default-product-card-header">
        <img
          src={product.thumbnail}
          width="100%"
          alt={`Thumbnail of ${product.title}`}
        />
      </div>
      <div className="default-product-card-body">
        <h3>{product.title}</h3>
        <p>{product.category}</p>
      </div>
    </>
  );
}

export default ProductCard;
