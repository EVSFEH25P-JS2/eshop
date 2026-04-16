import "../styles/Cart.css";
import Card from "./Card";

class Product {
  constructor(
    id,
    title,
    description,
    category,
    price,
    rating,
    tags,
    thumbnail,
    images,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.rating = rating;
    this.tags = tags;
    this.thumbnail = thumbnail;
    this.images = images;
  }
}

const cartItems = [
  new Product(
    1,
    "Essence Mascara Lash Princess",
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
    "beauty",
    9.99,
    4.94,
    ["beauty", "mascara"],
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    [
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
    ],
  ),
  new Product(
    2,
    "Eyeshadow Palette with Mirror",
    "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks.",
    "beauty",
    19.99,
    3.28,
    ["beauty", "eyeshadow"],
    "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
    [
      "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
    ],
  ),
  new Product(
    3,
    "Powder Canister",
    "The Powder Canister is a finely milled setting powder designed to set makeup and control shine.",
    "beauty",
    14.99,
    3.82,
    ["beauty", "powder"],
    "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
    [
      "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
    ],
  ),
];

function Cart({ setCartOpen, cartService }) {
  let totalPrice = cartService.items.reduce(
    (sum, item) => sum + item.amount * item.product.price,
    0,
  );

  return (
    <section className="cart">
      <div className="cart-header">
        <button onClick={() => setCartOpen(false)}>Close</button>
        <button onClick={cartService.clearItems}>Clear</button>
        <span>Total price: {totalPrice}</span>
      </div>
      <ul>
        {cartService.items.map(({ amount, product }) => (
          <li key={product.id}>
            <CartItem
              amount={amount}
              product={product}
              cartService={cartService}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function CartItem({ amount, product, cartService }) {
  return (
    <Card>
      <article className="cart-item">
        <div>
          <img src={product.thumbnail} width="100%" />
        </div>
        <div>
          <p>
            {product.title} ({product.price} kr)
          </p>
          <span>Amount: {amount}</span>
          <button onClick={() => cartService.addOrIncrementItem(product)}>
            +
          </button>
          <button onClick={() => cartService.decrementItem(product.id)}>
            -
          </button>
          <button onClick={() => cartService.removeItem(product.id)}>
            Remove
          </button>
        </div>
      </article>
    </Card>
  );
}

export default Cart;
