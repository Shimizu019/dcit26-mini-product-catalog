import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import products from "./data/products";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const handleAddToCart = (title) => {
    setCartCount((previousCount) => previousCount + 1);
    setLastAdded(title);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const filteredProducts = products
    .filter((product) =>
      product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    )
    .filter(
      (product) => category === "All" || product.category === category
    );

  const sortedProducts = [...filteredProducts].sort((first, second) => {
    if (sortOrder === "low-to-high") {
      return first.price - second.price;
    }
    if (sortOrder === "high-to-low") {
      return second.price - first.price;
    }
    return 0;
  });

  const handleClearFilters = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

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

        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClearFilters={handleClearFilters}
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
                {product.id === 1 && <span>New</span>}
                {product.id === 4 && <span>Sale</span>}
              </ProductCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
