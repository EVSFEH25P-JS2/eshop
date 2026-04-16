import "../styles/Cart.css";
import Card from "./Card";

/**
 * Kundvagnen som glider in från sidan.
 * Vi tar emot cartService som hanterar all logik för varor,
 * och setCartOpen för att kunna stänga vagnen.
 */
function Cart({ setCartOpen, cartService }) {
  // Räkna ut totalpriset genom att summera antal × pris för varje rad.
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
      {/* Vi renderar en CartItem per rad i kundvagnen. */}
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

/**
 * En enskild rad i kundvagnen med bild, namn, pris och knappar för att justera antal.
 * Vi använder cartService direkt härifrån så att varje rad kan öka, minska eller ta bort sig själv.
 */
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
          {/* + och - justerar antalet; når vi 0 via decrementItem tas varan bort automatiskt. */}
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
