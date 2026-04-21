import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import { Outlet, Route, Routes } from "react-router";

// App är rotkomponenten – den enda som känner till vilken sida vi är på.
// Vi lyfter upp route-staten hit så att både Nav och sidorna kan läsa och ändra den.
function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const cartService = {
    items: cartItems,

    addOrIncrementItem: (product) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, amount: item.amount + 1 }
              : item,
          );
        } else {
          return [...prev, { amount: 1, product }];
        }
      });
    },

    removeItem: (productId) => {
      setCartItems((prev) =>
        prev.filter((item) => item.product.id !== productId),
      );
    },

    decrementItem: (productId) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.product.id === productId);
        if (!existing) return prev;

        if (existing.amount === 1) {
          return prev.filter((item) => item.product.id !== productId);
        }

        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, amount: item.amount - 1 }
            : item,
        );
      });
    },

    clearItems: () => setCartItems([]),
  };

  return (
    <Routes>
      <Route
        element={
          <Layout
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            cartService={cartService}
          />
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/products/:id"
          element={<ProductDetails cartService={cartService} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function Layout({ cartOpen, setCartOpen, cartService }) {
  return (
    <>
      <header>
        <Nav setCartOpen={setCartOpen} />
      </header>

      <main>
        <div>
          <Outlet />
        </div>
        {cartOpen && (
          <Cart setCartOpen={setCartOpen} cartService={cartService} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
