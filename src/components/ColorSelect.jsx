import "../styles/ColorSelect.css";

function getCheckColor(color) {
  let r, g, b;
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
  } else {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  }
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness > 128 ? "#000000" : "#ffffff";
}

function ColorSelect({ value, onChange, colors }) {
  return (
    <ul className="color-select">
      {colors.map((color) => (
        <li key={color}>
          <button style={{ background: color }} onClick={() => onChange(color)}>
            {value === color && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill={getCheckColor(color)}
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ColorSelect;
