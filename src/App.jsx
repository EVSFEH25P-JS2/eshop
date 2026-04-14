import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Vi samlar alla sidnamn här så vi slipper skriva strängar direkt i koden.
// På så sätt får vi felmeddelanden om vi stavar fel, istället för att tyst hamna på fel sida.
class Page {
  static HOME = "home";
  static SHOP = "shop";
  static PRODUCT = "product";
}

// App är rotkompnenten – den enda som känner till vilken sida vi är på.
// Vi lyfter upp route-staten hit så att både Nav och sidorna kan läsa och ändra den.
function App() {
  // route håller koll på vilken sida vi visar och eventuell extra data (t.ex. produkt-id).
  const [route, setRoute] = useState({
    name: Page.HOME,
    data: {},
  });

  // updateRoute är en hjälpfunktion som vi skickar ner till komponenter som behöver byta sida.
  const updateRoute = (name, data = {}) => {
    setRoute({ name, data });
  };

  // Vi väljer vilken sida som ska renderas baserat på route.name.
  let page = null;
  switch (route.name) {
    case Page.HOME:
      page = <Home setRoute={updateRoute} />;
      break;
    case Page.SHOP:
      page = <Shop setRoute={updateRoute} />;
      break;
    case Page.PRODUCT:
      // Vi skickar med routeData så att ProductDetails vet vilken produkt som ska visas.
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

      <main>
        <div>{page}</div>
      </main>

      <Footer />
    </>
  );
}

export default App;
export { Page };
