import { Page } from "../App";
import "../styles/Nav.css";

function Nav({ routeName, setRoute }) {
  return (
    <nav className="nav">
      <div>
        <div>
          <img />
        </div>

        <ul>
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

      <div></div>
    </nav>
  );
}

export default Nav;
