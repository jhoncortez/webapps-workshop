/// <reference types="vite/client" />

type CategoryType = {
    id: number,
    name: string,
    slug: string
}
type ImageType = {
    id: number,
    src: string,
    name: string,
    alt: string
}

type ProductType = {
    _id: string,
    name: string,
    price: string,
    categories?: CategoryType[]
    images?: ImageType[]
}

interface CategoryFilterProps {
    categories: CategoryType[] | undefined | null;
    selectedCategory: string;
    onFilter: (category: string) => void;
}

interface ProductImagesSliderProps { 
    images?: ImageType[]
}

interface ProductCategoriesProps {
    categories?: CategoryType[]
}

// interface ProductTypeResponse {
//     data: ProductType[]
//     ok: boolean 
// }

interface LoadingErrorsType {
    loading: boolean,
    error: string | null,
    refreshLoading: (loading: boolean) => void,
    refreshError: (error: string | null) => void
}
interface ProductsContextType {
    products: ProductType[],
    filteredProducts: ProductType[],
    searchQuery: string,
    categorySlug: string,
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
    setFilteredProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
    setCategorySlug: React.Dispatch<React.SetStateAction<string>>
}
interface CartContextType {
    cart: CartProductType[],
    addToCart: (product: ProductType, quantity: number) => void,
    removeFromCart: (id: ProductType['_id']) => void,
    updateProductInCart: (id: string, quantity: number) => void;
    productInCartQuantity?: (id: ProductType['_id']) => number,
}

interface CartProductType extends ProductType {
    quantity: number | undefined
}

export interface CartItemResponse extends CartProductRequestBody {
    _id: string
}

export interface CartProductRequestBody {
    productId: ProductType['_id'],
    quantity: number | undefined
}

export interface CartProductResponse {
    products: CartItemResponse[]
}
export interface CartQueryResponse {
    data: CartProductResponse
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
}

// navigation types
enum Routes {
    PRODUCTS = '/',
    CATEGORY = '/category/:category',
    PRODUCT = '/product/:id',
    ABOUT ='/about'
}

type currentRoute = string | Routes
interface NavigationContextType {
  routeState: {currentRoute: currentRoute, updateCurrentRoute: (location_pathname: string=window.location.pathname) => void}
//   navigate: (route: string | Routes, params?: Record<string, string>) => void;
}

interface LinkProps {
  to: string | Routes
  params?: Record<string, string>;
  className?: string;
  children: React.ReactNode;
}

type RouteConfig<T = unknown> = {
  path: string;
  Component: React.ComponentType<T>;
}

export type UserPreferences = {
    favoriteCategories?: string[],
    priceRange?: {
        min: number,
        max: number
    }
}

interface AuthenticatedUser {
    _id: string,
    email: string,
    // role: string,
    // preferences?: UserPreferences
    error?: string
}

interface RequestedProfile extends AuthenticatedUser {
    name: string
    // password?: string | undefined
}

type ProfileDataBody =  {
  name: string;
  email: string;
}

export {RequestedProfile, ProfileDataBody, AuthenticatedUser, RouteConfig, LinkProps, Routes, NavigationContextType, CartProductType, CartContextType, ProductsContextType, ProductType, CategoryFilterProps, CategoryType, ImageType, ProductImagesSliderProps, ProductCategoriesProps, LoadingErrorsType}
