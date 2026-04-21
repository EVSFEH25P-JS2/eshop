import Card from "./Card";
import "../styles/ProductCard.css";
import { Link } from "react-router";

/**
 * Visar ett produktkort och navigerar till produktsidan när man klickar.
 * Vi stödjer två varianter via "type"-propen: "default" (stor) och "small" (liten).
 */
function ProductCard({ type = "default", product }) {
  let variant = null;
  if (type === "small") {
    variant = <SmallProductCard product={product} />;
  } else {
    variant = <DefaultProductCard product={product} />;
  }

  return (
    // Vi skickar produktens id med i route-datan så att ProductDetails vet vad som ska hämtas.
    <Card>
      <Link to={`/products/${product.id}`}>{variant}</Link>
    </Card>
  );
}

// TODO: implementera den lilla varianten av produktkortet
function SmallProductCard({ product }) {
  return <></>;
}

/**
 * Standardvarianten av produktkortet med bild, titel och kategori.
 */
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
