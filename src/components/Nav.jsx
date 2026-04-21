import { NavLink } from "react-router";
import "../styles/Nav.css";

/**
 * Navigeringsfältet högst upp på sidan.
 * Vi tar emot routeName för att kunna markera vilken sida som är aktiv,
 * och setRoute för att kunna byta sida när användaren klickar.
 */
function Nav({ setCartOpen }) {
  return (
    <nav className="nav">
      <div>
        {/* TODO: lägg till logotyp */}
        <div>
          <img />
        </div>

        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>
      </div>

      {/* TODO: lägg till t.ex. inloggning här */}
      <div>
        <button onClick={() => setCartOpen(true)}>Cart</button>
      </div>
    </nav>
  );
}

export default Nav;
