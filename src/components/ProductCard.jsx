import "./ProductCard.css";

function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children,
}) {
  const formattedPrice = `₱${price.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <article className={`product-card ${inStock ? "" : "out-of-stock"}`}>
      <div className="product-visual" aria-hidden="true">
        {children && <div className="badge-slot">{children}</div>}
        <span className="product-monogram">
          {title
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>

      <div className="product-meta">
        <p className="product-category">{category}</p>
        <span
          className={`stock-label ${inStock ? "in-stock" : "out-of-stock-label"}`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="product-copy">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">{formattedPrice}</p>
      </div>

      <button
        type="button"
        className="add-to-cart-btn"
        disabled={!inStock}
        onClick={() => onAddToCart(title)}
      >
        {inStock ? "Add to Cart" : "Unavailable"}
      </button>
    </article>
  );
}

export default ProductCard;
