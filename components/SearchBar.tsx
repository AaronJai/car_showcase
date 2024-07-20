'use client'

import { useState } from "react"

import SearchManufacturer from "./SearchManufacturer"

const SearchBar = () => {
    const [manufacturer, setmanufacturer] = useState('');

    const handleSearch = () => {}

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className="searchbar__items">
                <SearchManufacturer 
                    manufacturer={manufacturer}
                    setmanufacturer={setmanufacturer}
                />
            </div>
        </form>
    )
}

export default SearchBar