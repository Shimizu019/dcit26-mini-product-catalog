import { useState, useEffect } from "react";
import { ShoppingBag, Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "./components/ProductCard";
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
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827]">
      <header className="store-header">
        <div className="header-inner">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true">
              <ShoppingBag size={21} strokeWidth={2} />
            </div>
            <div>
              <h1>CvSU Mini Store</h1>
              <p>Campus Tech, Books &amp; Everyday Essentials</p>
            </div>
          </div>

          <div className="cart-message" role="status" aria-live="polite">
            <ShoppingBag size={16} strokeWidth={2} />
            <span>
              {cartCount === 0
                ? "Your cart is empty."
                : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
            </span>
          </div>
        </div>
      </header>

      <main className="store-main">
        <div className="catalog-toolbar">
          <div className="toolbar-heading">
            <p>Student collection</p>
            <h2>Campus essentials</h2>
          </div>

          <div className="search-bar">
            <label className="search-field">
              <Search size={17} aria-hidden="true" />
              <input
                type="search"
                className="search-input"
                placeholder="Search products"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </label>

            <label className="select-field">
              <SlidersHorizontal size={16} aria-hidden="true" />
              <select
                className="category-select"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter by category"
              >
                <option value="All">All categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="School Supplies">School Supplies</option>
                <option value="Accessories">Accessories</option>
              </select>
            </label>

            <select
              className="sort-select"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              aria-label="Sort products"
            >
              <option value="default">Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>

            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Clear
            </button>
          </div>
        </div>

        <div className="results-row">
          <p>
            Showing <strong>{sortedProducts.length}</strong> of {products.length} products
          </p>
          {sortedProducts.length > 0 && <span>{category === "All" ? "All categories" : category}</span>}
        </div>

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
                image={product.image}
              >
                {product.badge}
              </ProductCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
