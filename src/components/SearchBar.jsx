function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClearFilters,
}) {
  return (
    <div className="search-bar">
      <label className="search-field">
        <span className="sr-only">Search products</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label className="category-field">
        <span className="sr-only">Filter by category</span>
        <select
          className="category-select"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="School Supplies">School Supplies</option>
          <option value="Accessories">Accessories</option>
        </select>
      </label>

      <label className="sort-field">
        <span className="sr-only">Sort products by price</span>
        <select
          className="sort-select"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </label>

      <button
        type="button"
        className="clear-filters-btn"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}

export default SearchBar;
