import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

class Page {
  static HOME = "home";
  static SHOP = "shop";
  static PRODUCT = "product";
}

function App() {
  const [route, setRoute] = useState({
    name: Page.HOME,
    data: {},
  });

  const updateRoute = (name, data = {}) => {
    setRoute({ name, data });
  };

  let page = null;
  switch (route.name) {
    case Page.HOME:
      page = <Home setRoute={updateRoute} />;
      break;
    case Page.SHOP:
      page = <Shop setRoute={updateRoute} />;
      break;
    case Page.PRODUCT:
      page = <ProductDetails routeData={route.data} setRoute={updateRoute} />;
      break;
    default:
      page = <NotFound setRoute={updateRoute} />;
  }

  return (
    <>
      <header>
        <Nav routeName={route.name} setRoute={updateRoute} />
      </header>

      <main>{page}</main>

      <Footer />
    </>
  );
}

// Lifting state up

export default App;
export { Page };
