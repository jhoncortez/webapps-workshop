import ProductImageSlider from "./ProductImageSlider";
import type { ProductType } from "../vite-env.d.ts";
import Link from "./Link";
import { limitString } from "../utils/utils.ts";
import { useProductsContext } from '../contexts/ShopContext'
import { useEffect, useRef } from "react";

type AssistantFullProduct =  ProductType | undefined | null

export const AssistantProductItem = ({ product }: { product: ProductType }) => {


    const { products } = useProductsContext()

    const productFromProductsRef = useRef<AssistantFullProduct>(undefined);


    const getProductFromProducts = (id: string) => {
        return products.find(product => product._id === id)
    }

    useEffect(() => {
    if (product._id) {
        const productFromProducts = getProductFromProducts(product._id);
        if (productFromProducts) {
            productFromProductsRef.current = productFromProducts;
        } else {
            productFromProductsRef.current = null;
        }
    }
    }, [product]);

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="mr-4 w-16 h-16 overflow-hidden">
                    <ProductImageSlider images={productFromProductsRef.current?.images} />
                </div>
                <div className="flex flex-col">
                    {/* <h3 className="text-lg font-semibold">{productFromProductsRef.current?.name}</h3> */}
                    {/* <p className="text-gray-600">${product.price}</p> */}
                    <p className="text-gray-600">{product.description && limitString(product.description, 100)}</p>
                </div>
                <div className="ml-4">
                    <Link to={`/product/:id`} params={{ id: product._id }}>View Product</Link>
                </div>
            </div>
        </div>
    );
};