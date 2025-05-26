import { useNavigationContext } from "../contexts/NavigationContext";
import { match } from "path-to-regexp";
import Products from "./Products";
import SingleProduct from "./SingleProduct"
import CategoryProducts from "./CategoryProducts"

const routes = [
    { path: "/", component: Products },
    { path: "/product/:id", component: SingleProduct },
    { path: "/category/:category", component: CategoryProducts },
];

const Router = () => {
    const { routeState: { currentRoute } } = useNavigationContext();

    const matchedRoute = routes.find((route) => match(route.path, { decode: decodeURIComponent })(currentRoute)); // find the route that matches the current route
    const matchedResult = matchedRoute ? match(matchedRoute.path, { decode: decodeURIComponent })(currentRoute) : null; // match the current route against the route path
    const params = matchedResult ? matchedResult.params : {};


    if (matchedRoute) {
        const Component = matchedRoute.component;
        return <Component {...params} />;
    }

    return <h1>404 - Not Found</h1>;
};

export default Router;