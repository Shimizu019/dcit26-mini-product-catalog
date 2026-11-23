import { useState } from "react";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  const handleAddToCart = (title) => {
    setCartCount((previousCount) => previousCount + 1);
    setLastAdded(title);
  };

  return (
    <div className="app">
      <header className="store-header">
        <div className="store-brand">
          <div className="store-logo" aria-hidden="true">
            CV
          </div>
          <div>
            <h1>CvSU Mini Store</h1>
            <p>Campus Tech, Books &amp; Everyday Essentials</p>
          </div>
        </div>

        <p className="cart-message" role="status" aria-live="polite">
          {cartCount === 0
            ? "Your cart is empty."
            : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
        </p>
      </header>

      <main className="store-main">
        <div className="catalog-heading">
          <p>Student collection</p>
          <h2>Campus essentials</h2>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              inStock={product.inStock}
              onAddToCart={handleAddToCart}
            >
              {product.id === 1 && <span>New</span>}
              {product.id === 4 && <span>Sale</span>}
            </ProductCard>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
