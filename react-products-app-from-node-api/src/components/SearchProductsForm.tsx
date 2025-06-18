import React from "react"
import { useProductsContext } from "../contexts/ShopContext"

import '../assets/css/searchProductForm.css'
export const SearchProductsForm = () => {

    const { setSearchQuery: onSearchProduct } = useProductsContext()

    const handleSearchProductSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const searchSubmitQuery = formData.get('search') as string

        if (!searchSubmitQuery) {
            return
        }
        onSearchProduct(searchSubmitQuery)
    }
    return (
        <>
            <h2>Search Product</h2>
            <form onSubmit={handleSearchProductSubmit} className="search-form">
                <input name="search" type="text" placeholder="Type product name" onChange={(e) => onSearchProduct(e.target.value)} className="search-input" />
                <button type="submit" className="search-button">Search</button>
            </form>
        </>
    )
}