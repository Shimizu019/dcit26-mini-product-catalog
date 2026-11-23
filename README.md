# CvSU Mini Store — Lab 3 & Lab 4 (DCIT26)

A Mini Product Catalog built with React + Vite. Implements:
- **Lab 3**: Props and Component Communication (ProductCard, callback props, children prop)
- **Lab 4**: useState and useEffect (live search, category filter, price sort, debounce, document title effect)

## How to run

1. Open this folder in VS Code.
2. Open a terminal in VS Code (`` Ctrl+` ``) and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Project structure

```
src/
  components/
    ProductCard.jsx
    ProductCard.css
    SearchBar.jsx
  data/
    products.js
  App.jsx
  App.css
  main.jsx
```

## Git submission steps (for both labs)

```bash
git init
git add .
git commit -m "Project setup"
# ... make the other required commits as you build each piece ...
git branch lab4-livesearch     # for Lab 4, before adding search/filter code
git checkout lab4-livesearch
# commit Lab 4 work here, then:
git push -u origin main
git push -u origin lab4-livesearch
```
Remember to create the GitHub repo first and add it as `origin` with
`git remote add origin <your-repo-url>` before pushing.

---

## Guide Question Answers

### Lab 3 — Props and Component Communication

**1. What is the difference between props and state?**
Props are data passed into a component from its parent; the component receiving them cannot change them. State is data a component manages internally and can update over time, which causes the component to re-render.

**2. Why can a child component not modify the props it receives?**
Props are read-only by design (React follows one-way data flow). Letting a child mutate its props would make data flow unpredictable, since the parent would no longer be the single source of truth for that value.

**3. How does the onAddToCart callback allow data to flow from child to parent even though props only flow downward?**
The parent passes a function down as a prop. When the child calls that function (e.g., on a button click), it is really executing code that lives in the parent, and can pass arguments (like the product title) back up through that function call — so information travels upward through a callback even though props themselves only travel downward.

**4. Why is the key prop required when rendering a list with .map()? What could happen if it is missing or duplicated?**
`key` helps React identify which items changed, were added, or were removed between renders, so it can update the DOM efficiently and correctly. If keys are missing or duplicated, React may misidentify items, causing incorrect re-renders, lost component state, or UI bugs when the list order or content changes.

**5. What does the children prop allow you to do that a normal prop does not?**
`children` lets a parent pass arbitrary JSX content between a component's opening and closing tags (like nesting a `<span>Sale</span>` inside `<ProductCard>`), rather than passing a fixed value through a named attribute. It makes the component more flexible and reusable as a "wrapper."

### Lab 4 — useState and useEffect

**1. Why do we use two separate states, searchText and debouncedSearch, instead of only one?**
`searchText` updates instantly on every keystroke so the input field feels responsive. `debouncedSearch` only updates after the user pauses typing, so the actual filtering (which can be expensive) doesn't run on every single keystroke — just on the final value.

**2. What would happen if the debounce effect did not return a cleanup function?**
Every keystroke would start a new `setTimeout`, but old timers would never be cancelled. All of them would eventually fire, calling `setDebouncedSearch` multiple times with outdated values — wasting work and potentially flashing stale results.

**3. What is the purpose of the dependency array? What happens if it is empty ([])? What happens if it is left out completely?**
The dependency array tells React when to re-run the effect — only when one of the listed values changes. An empty array (`[]`) means the effect runs only once, after the first render. Leaving the array out completely means the effect runs after every single render, which can cause performance issues or infinite loops if the effect also updates state.

**4. Why should we avoid sorting the original products array directly?**
`Array.prototype.sort()` mutates the array in place. If we sorted `products` directly, we would permanently change the original data order, which could break other parts of the app relying on the original order, and would violate React's principle of treating data as immutable. Copying with the spread operator (`[...products]`) avoids this.

**5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.**
It's better calculated during rendering (derived state), as done here. The filtered list is fully determined by `products`, `debouncedSearch`, `category`, and `sortOrder` — storing it in its own state would duplicate data and risk it going out of sync with those source values. Deriving it keeps a single source of truth and avoids extra `useEffect` calls just to keep two states in sync.
