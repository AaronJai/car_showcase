'use client';

import { SearchManufacturerProps } from '@/types'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import Image from 'next/image';
import { useState, Fragment } from 'react';
import { manufacturers } from '@/constants';

// Utilises a combobox which allows auto-fill of manufacturer names
const SearchManufacturer = ({ selected, setSelected}: SearchManufacturerProps ) => {
    const [query, setQuery] = useState('');

    // filter manufacturer list
    const filteredManufacturers = query === "" 
        ? manufacturers 
        : manufacturers.filter((item) => (
        // replace empty spaces with empty string, and check if the manufacturer name includes the query
        item.toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase()
            .replace(/\s+/g, '')   
    )))

    return (
        <div className='search-manufacturer'>
            <Combobox value={selected} onChange={setSelected}>
                <div className='relative w-full'>
                    <ComboboxButton className='absolute top-[14px]'>
                        <Image 
                            src="/car-logo.svg" 
                            width={20} 
                            height={20} 
                            className='ml-4' 
                            alt='car logo'
                        />
                    </ComboboxButton>

                    <ComboboxInput 
                        className='search-manufacturer__input'
                        placeholder='Volkswagen' 
                        displayValue={(manufacturer: string) => manufacturer} 
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    
                    {/* Component to give the combobox search functionality */}
                    <Transition 
                        as={Fragment} 
                        leave='transition ease-in duration-100' 
                        leaveFrom='opacity-100' 
                        leaveTo='opacity-0' 
                        afterLeave={() => setQuery('')}>

                            <ComboboxOptions>
                                {/* filter based on input */}
                                {filteredManufacturers.map((item) => (
                                        <ComboboxOption key={item} className={({ active }) => `relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`} value={item}>
                                            {({ selected, active }) => (
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    {item}
                                                </span>
                                            )}
                                        </ComboboxOption>
                                    )
                                )}
                            </ComboboxOptions>
                    </Transition>
                </div>
            </Combobox>

        </div>
    )
}

export default SearchManufacturer