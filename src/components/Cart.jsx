import "../styles/Cart.css";
import Card from "./Card";

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
