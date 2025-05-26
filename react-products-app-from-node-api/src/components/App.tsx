import { ProductsProvider, CartProvider } from '../contexts/ShopContext.tsx'
import { NavigationProvider } from '../contexts/NavigationContext.tsx'
import Router from './Router.tsx'
import Cart  from './Cart.tsx'
import Products from "./Products";
import SingleProduct from "./SingleProduct"
import CategoryProducts from "./CategoryProducts"
import Default from "./Default.tsx"
import Route from "./Route.tsx"
// import type { RouteConfig } from '../vite-env.d.ts'

/**
 * The main application component.
 * 
 * This component wraps the entire application in a set of contexts:
 * - `NavigationProvider` provides a context for client-side route navigation
 * - `ProductsProvider` provides a context for products
 * - `CartProvider` provides a context for the shopping cart
 * 
 * The `Router` component is then used to render the correct component based on the current route.
 * The `Route` components are used to define the routes.
 * 
 * The `Cart` component is rendered separately from the router, as it should always be visible.
 * 
 * @returns The main application component
 */
const App = () => {

    const routes: { path: string; component: React.ComponentType}[] = [
        { path: "/", component: Products },
        // { path: "/product/:id", component: SingleProduct },
        // { path: "/category/:category", component: CategoryProducts },
        // { path: "/:*", component: Default }
    ]
  return (
    <NavigationProvider>
        <ProductsProvider>
          <CartProvider>
            <Router routes={routes} DefaultPage={Default}>
              <Route path="/shop" Component={Products} />
              <Route path="/product/:id" Component={SingleProduct} />
              <Route path="/category/:category" Component={CategoryProducts} />
              {/* <Route path="*" Component={Default} /> */}
            </Router>
            <Cart />
          </CartProvider>
        </ProductsProvider>
    </NavigationProvider>
  );
}

export default App;