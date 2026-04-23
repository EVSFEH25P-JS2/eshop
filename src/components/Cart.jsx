import { useCartOpenStore, useCartStore } from "../stores/cart";
import "../styles/Cart.css";
import Card from "./Card";

/**
 * Kundvagnen som glider in från sidan.
 * Vi tar emot cartService som hanterar all logik för varor,
 * och setCartOpen för att kunna stänga vagnen.
 */
function Cart() {
  const toggleCart = useCartOpenStore((state) => state.toggle);
  const cartItems = useCartStore((state) => state.items);
  const clearItems = useCartStore((state) => state.clearItems);
  // Räkna ut totalpriset genom att summera antal × pris för varje rad.
  let totalPrice = cartItems.reduce(
    (sum, item) => sum + item.amount * item.product.price,
    0,
  );

  return (
    <section className="cart">
      <div className="cart-header">
        <button onClick={() => toggleCart()}>Close</button>
        <button onClick={clearItems}>Clear</button>
        <span>Total price: {totalPrice}</span>
      </div>
      {/* Vi renderar en CartItem per rad i kundvagnen. */}
      <ul>
        {cartItems.map(({ amount, product }) => (
          <li key={product.id}>
            <CartItem amount={amount} product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * En enskild rad i kundvagnen med bild, namn, pris och knappar för att justera antal.
 * Vi använder cartService direkt härifrån så att varje rad kan öka, minska eller ta bort sig själv.
 */
function CartItem({ amount, product }) {
  const addOrIncrementItem = useCartStore((state) => state.addOrIncrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);

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
          {/* + och - justerar antalet; når vi 0 via decrementItem tas varan bort automatiskt. */}
          <button onClick={() => addOrIncrementItem(product)}>+</button>
          <button onClick={() => decrementItem(product.id)}>-</button>
          <button onClick={() => removeItem(product.id)}>Remove</button>
        </div>
      </article>
    </Card>
  );
}

export default Cart;
