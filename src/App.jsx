import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import products from "./data/products";
import "./App.css";

function App() {
  // ----- Lab 3: cart state -----
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState(null);

  const handleAddToCart = (title) => {
    setCartCount((prev) => prev + 1);
    setLastAdded(title);
  };

  // ----- Lab 4: search / filter / sort state -----
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Debounce effect: wait 300ms after typing stops before updating debouncedSearch
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer); // cleanup on every keystroke
  }, [searchText]);

  // Derive filtered + sorted list without mutating the original array
  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((p) => category === "All" || p.category === category);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-high") return a.price - b.price;
    if (sortOrder === "high-low") return b.price - a.price;
    return 0;
  });

  // Update the browser tab title whenever the result count changes
  useEffect(() => {
    document.title = `CvSU Mini Store (${sortedProducts.length} results)`;
  }, [sortedProducts.length]);

  const handleClearFilters = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>CvSU Mini Store</h1>
        <p className="cart-message">
          {cartCount === 0
            ? "Your cart is empty."
            : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
        </p>
      </header>

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        category={category}
        setCategory={setCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onClear={handleClearFilters}
      />

      <p className="results-count">
        Showing {sortedProducts.length} of {products.length} products
      </p>

      {sortedProducts.length === 0 ? (
        <p className="empty-state">
          No products found. Try a different keyword or category.
        </p>
      ) : (
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              inStock={product.inStock}
              onAddToCart={handleAddToCart}
            >
              {product.id === 1 && "New"}
              {product.id === 5 && "Sale"}
            </ProductCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
