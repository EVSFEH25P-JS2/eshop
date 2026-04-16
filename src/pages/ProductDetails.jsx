import { useEffect, useState } from "react";
import { apiFetchProductById } from "../api/product";
import Card from "../components/Card";
import "../styles/ProductDetails.css";
import ColorSelect from "../components/ColorSelect";

function ProductDetails({ routeData, cartService }) {
  const productId = routeData.productId;

  // TODO: Add productId validation and error handling

  const sizes = ["10mm", "20mm", "30mm"];
  const colors = [
    "#DC143C",
    "#FFFF00",
    "#32CD32",
    "#00FFFF",
    "#1E90FF",
    "#708090",
  ];
  const [state, setState] = useState({ status: "loading" });
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    apiFetchProductById(productId)
      .then((product) => {
        setState({ status: "success", product });
        setThumbnail(product.thumbnail);
      })
      .catch((err) => setState({ status: "error", message: err.message }));
  }, []);

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

          <div id="product-details-thumbnail">
            <img src={thumbnail} width="100%" alt="Selected product image" />
          </div>

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
