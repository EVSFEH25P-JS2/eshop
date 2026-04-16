import { useEffect, useState } from "react";
import { apiFetchProductById } from "../api/product";
import Card from "../components/Card";
import "../styles/ProductDetails.css";
import ColorSelect from "../components/ColorSelect";

/**
 * Detaljsidan för en enskild produkt.
 * Vi tar emot productId via routeData och hämtar produkten från API:et när sidan laddas.
 * cartService skickas vidare så att användaren kan lägga till produkten i kundvagnen.
 */
function ProductDetails({ routeData, cartService }) {
  const productId = routeData.productId;

  // TODO: Add productId validation and error handling

  // Hårdkodade storlekar och färger tills vi vet hur det ska hanteras i API:et.
  const sizes = ["10mm", "20mm", "30mm"];
  const colors = [
    "#DC143C",
    "#FFFF00",
    "#32CD32",
    "#00FFFF",
    "#1E90FF",
    "#708090",
  ];

  // state håller hämtningsstatusen – "loading", "success" eller "error".
  const [state, setState] = useState({ status: "loading" });
  // thumbnail är den stora bilden vi visar, användaren kan byta den genom att klicka på en miniatyrbild.
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  // Vi hämtar produkten varje gång productId ändras.
  useEffect(() => {
    apiFetchProductById(productId)
      .then((product) => {
        setState({ status: "success", product });
        // Sätt produktens standardbild som thumbnail direkt när vi fått svaret.
        setThumbnail(product.thumbnail);
      })
      .catch((err) => setState({ status: "error", message: err.message }));
  }, [productId]);

  if (state.status === "loading") {
    return <p className="product-status">Loading product...</p>;
  }

  if (state.status === "error") {
    return (
      <p className="product-status product-status--error">
        Failed to load product: {state.message}
      </p>
    );
  }

  const { product } = state;

  return (
    <div id="product-details">
      <Card>
        <div id="product-details-grid">
          {/* Miniatyrbilder till vänster – klick på en bild byter ut den stora thumbnailbilden. */}
          <div id="product-details-images">
            {product.images.map((image) => (
              <img
                key={image}
                src={image}
                width="100%"
                onClick={() => setThumbnail(image)}
              />
            ))}
          </div>

          {/* Den stora bilden i mitten som uppdateras när användaren klickar på en miniatyr. */}
          <div id="product-details-thumbnail">
            <img src={thumbnail} width="100%" alt="Selected product image" />
          </div>

          {/* Produktinfo och val av storlek, färg samt knapp för att lägga i kundvagnen. */}
          <div id="product-details-info">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.category}</p>

            <label>Sizes</label>
            <select
              value={selectedSize}
              onChange={(event) => setSelectedSize(event.target.value)}
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <label>Colors</label>
            <ColorSelect
              value={selectedColor}
              onChange={setSelectedColor}
              colors={colors}
            />

            <button onClick={() => cartService.addOrIncrementItem(product)}>
              Add to cart
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductDetails;
