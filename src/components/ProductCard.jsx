import "./ProductCard.css";

function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children,
}) {
  const formattedPrice = `₱${price.toFixed(2)}`;

  return (
    <div className={`product-card ${!inStock ? "out-of-stock" : ""}`}>
      {children && <div className="badge">{children}</div>}

      <h3 className="product-title">{title}</h3>
      <p className="product-category">{category}</p>
      <p className="product-price">{formattedPrice}</p>

      {inStock ? (
        <span className="stock-label in-stock">In Stock</span>
      ) : (
        <span className="stock-label out-of-stock-label">Out of Stock</span>
      )}

      <button
        className="add-to-cart-btn"
        disabled={!inStock}
        onClick={() => onAddToCart(title)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
