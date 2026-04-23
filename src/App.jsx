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
import { useCartOpenStore } from "./stores/cart";

// App är rotkomponenten – den enda som känner till vilken sida vi är på.
// Vi lyfter upp route-staten hit så att både Nav och sidorna kan läsa och ändra den.
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  const cartOpen = useCartOpenStore((state) => state.open);

  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <div>
          <Outlet />
        </div>
        {cartOpen && <Cart />}
      </main>

      <Footer />
    </>
  );
}

export default App;
