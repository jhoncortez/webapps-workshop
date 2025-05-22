import { useCartContext } from "../contexts/ShopContext";

export const useInitCart = () => {
    return useCartContext()
}