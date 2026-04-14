import "../styles/Card.css";

/**
 * En generisk kortkomponent som vi kan använda som wrapper runt annat innehåll.
 * Om man skickar med en onClick-funktion blir kortet klickbart och får role="button"
 * så att skärmläsare förstår att det är interaktivt.
 */
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
