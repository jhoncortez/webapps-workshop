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
export { ProductType, CategoryFilterProps, CategoryType, ImageType, ProductImagesSliderProps, ProductCategoriesProps, LoadingErrorsType}
