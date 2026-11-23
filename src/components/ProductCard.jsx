import {
  BookOpen,
  Keyboard,
  Laptop,
  Mouse,
  NotebookPen,
  Usb,
  CupSoda,
  ShoppingBag,
} from "lucide-react";
import "./ProductCard.css";

const categoryIcons = {
  Electronics: Mouse,
  Books: BookOpen,
  "School Supplies": NotebookPen,
  Accessories: Laptop,
};

const titleIcons = {
  "Wireless Mouse": Mouse,
  "Mechanical Keyboard": Keyboard,
  "USB-C Hub": Usb,
  "JavaScript Handbook": BookOpen,
  "React Essentials": BookOpen,
  "Notebook Set": NotebookPen,
  "Laptop Sleeve": Laptop,
  "Water Bottle": CupSoda,
};

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
  const Icon = titleIcons[title] || categoryIcons[category] || ShoppingBag;

  return (
    <div className={`product-card ${!inStock ? "out-of-stock" : ""}`}>
      <div className="product-visual" aria-hidden="true">
        {children && (
          <span className={`badge ${String(children).toLowerCase()}`}>
            {children}
          </span>
        )}
        <Icon className="product-icon" strokeWidth={1.35} />
      </div>

      <div className="product-meta">
        <p className="product-category">{category}</p>
        {inStock ? (
          <span className="stock-label in-stock">In Stock</span>
        ) : (
          <span className="stock-label out-of-stock-label">Out of Stock</span>
        )}
      </div>

      <div className="product-copy">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">{formattedPrice}</p>
      </div>

      <button
        className="add-to-cart-btn"
        disabled={!inStock}
        onClick={() => onAddToCart(title)}
      >
        {inStock ? "Add to Cart" : "Unavailable"}
      </button>
    </div>
  );
}

export default ProductCard;
