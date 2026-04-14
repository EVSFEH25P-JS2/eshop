import "../styles/Card.css";

function Card({ children, onClick = undefined }) {
  return (
    <article
      className="card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {children}
    </article>
  );
}

export default Card;
