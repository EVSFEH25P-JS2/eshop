import "../styles/Card.css";

function Card({ children }) {
  return <article className="card">{children}</article>;
}

export default Card;
