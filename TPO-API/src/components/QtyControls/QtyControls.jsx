import "./QtyControls.css"

export default function QtyControls({qty,maxQty,onIncrease,onDecrease}) {
  return (
    <div className="qty-controls-container">
      <div className="qty-controls">
        <button onClick={() => onIncrease()}>+</button>
        <p>{qty}</p>
        <button onClick={() => onDecrease()} disabled={qty <= 1}>
          -
        </button>
      </div>
      <p className="qty-available">{maxQty} Disponible</p>
    </div>
  );
}
