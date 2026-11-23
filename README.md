# CvSU Mini Store — Mini Product Catalog

**Course:** DCIT26: Application Development and Emerging Technologies

**Laboratory Exercise:** Laboratory Exercise 3 — React Props and Component Communication

CvSU Mini Store is a responsive React mini product catalog built with Vite. The application demonstrates how an `App` parent component passes product information to reusable `ProductCard` components through props. It also uses parameter destructuring with a default `category` value, renders badges through the `children` prop, handles stock-dependent conditional rendering and styling, and uses a callback prop to communicate cart additions from a child component back to the parent.

## Features Implemented

- An 8-product catalog dataset containing product ID, title, price, category, and stock status.
- Responsive product card grid:
  - 4 columns on desktop
  - 2 columns on tablet
  - 1 column on mobile
- Philippine Peso prices formatted to two decimal places using `₱` and `toLocaleString("en-PH")`.
- Conditional `"In Stock"` and `"Out of Stock"` labels.
- Faded and desaturated styling with a disabled, unavailable button for out-of-stock products.
- Special `"New"` and `"Sale"` badges passed through the `children` prop.
- Live running cart status in the store header.
- Parent-to-child prop communication and child-to-parent communication through `onAddToCart`.
- List rendering through `.map()` with each card assigned `key={product.id}`.

## Project Structure

```text
product-catalog/
├── src/
│   ├── components/
│   │   ├── ProductCard.css
│   │   └── ProductCard.jsx
│   ├── data/
│   │   └── products.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## How to Run Locally

1. Open a terminal in the project root directory.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

4. Open the local address shown by Vite, usually `http://localhost:5173`.

## Guide Questions & Answers

### 1. What is the difference between props and state?

Props are values passed from a parent component to a child component. The child receives and uses them, but does not own or change them. State is data owned and managed by a component. When state changes with a state updater function, React renders the component again.

### 2. Why can a child component not modify the props it receives?

Props are read-only inputs that keep data flow predictable and follow React's one-way data-flow model. If every child could change a prop directly, multiple components could mutate the same value and make it difficult to track where updates originated. The parent keeps ownership of the source data.

### 3. How does the `onAddToCart` callback allow data to flow from child to parent even though props only flow downward?

The parent passes its `handleAddToCart` function down through the `onAddToCart` prop. The `ProductCard` calls `onAddToCart(title)` when the button is clicked. This executes the parent's function and sends the product title upward as an argument, allowing the parent to update `cartCount` and `lastAdded`.

### 4. Why is the `key` prop required when rendering a list with `.map()`? What could happen if it is missing or duplicated?

React uses the `key` prop to identify each rendered item and determine which items changed, were added, or were removed. Missing or duplicated keys can cause React to match items incorrectly. This may lead to unnecessary re-renders, lost component state, or incorrect updates when the product list changes.

### 5. What does the `children` prop allow you to do that a normal prop does not?

The `children` prop lets a parent place nested JSX content between a component's opening and closing tags. In this project, the parent passes `<span>New</span>` or `<span>Sale</span>` inside `ProductCard`, and the card renders that content in its badge slot. A normal prop also passes values, but it does not provide this direct nested-JSX composition pattern.
