/**
 * Entry point of the React application.
 * 
 * This file is responsible for rendering the root React component (`App`) 
 * into the DOM. It uses React's `StrictMode` to highlight potential problems 
 * in the application during development.
 * 
 * - Imports:
 *   - `StrictMode`: A tool for identifying issues in the application.
 *   - `createRoot`: A method from React DOM for creating a root to render the app.
 *   - `App`: The main application component.
 * 
 * - Functionality:
 *   - Retrieves the DOM element with the ID `root`.
 *   - Creates a React root using `createRoot`.
 *   - Renders the `App` component wrapped in `StrictMode` into the root element.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalProvider } from './contexts/GlobalContext.tsx'
import { ProductsProvider } from './contexts/ShopContext.tsx'
import Products from './components/Products.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <ProductsProvider>
        <Products />
      </ProductsProvider>
    </GlobalProvider>
  </StrictMode>,
)
