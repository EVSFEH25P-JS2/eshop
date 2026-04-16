import { Page } from "../App";
import "../styles/Nav.css";

/**
 * Navigeringsfältet högst upp på sidan.
 * Vi tar emot routeName för att kunna markera vilken sida som är aktiv,
 * och setRoute för att kunna byta sida när användaren klickar.
 */
function Nav({ routeName, setRoute, setCartOpen }) {
  return (
    <nav className="nav">
      <div>
        {/* TODO: lägg till logotyp */}
        <div>
          <img />
        </div>

        <ul>
          {/* Vi jämför routeName med Page-konstanterna för att sätta "active"-klassen rätt. */}
          <li>
            <button
              className={routeName === Page.HOME ? "active" : ""}
              onClick={() => setRoute(Page.HOME)}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={routeName === Page.SHOP ? "active" : ""}
              onClick={() => setRoute(Page.SHOP)}
            >
              Shop
            </button>
          </li>
          {/* TODO: implementera Featured- och Recommended-sidor */}
          <li>
            <button onClick={() => setRoute("TODO: add featured page")}>
              Featured
            </button>
          </li>
          <li>
            <button onClick={() => setRoute("TODO: add recommended page")}>
              Recommended
            </button>
          </li>
        </ul>
      </div>

      {/* TODO: lägg till t.ex. kundvagn eller inloggning här */}
      <div>
        <button onClick={() => setCartOpen(true)}>Cart</button>
      </div>
    </nav>
  );
}

export default Nav;
