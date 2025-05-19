import React from "react"

import '../assets/css/searchProductForm.css'
export const SearchProductsForm = ({onSearchProductSubmit, onSearchInputChange}: {onSearchProductSubmit: (searchSubmitQuery: string) => void; onSearchInputChange: (searchQuery: string | null) => void}) => {

    const handleSearchProductSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const searchSubmitQuery = formData.get('search') as string

        onSearchProductSubmit(searchSubmitQuery)
    }
    return (
        <form onSubmit={handleSearchProductSubmit} className="search-form">
            <input name="search" type="text" placeholder="Search product" onChange={(e) => onSearchInputChange(e.target.value)} className="search-input" />
            <button type="submit" className="search-button">Search</button>
        </form>
    )
}