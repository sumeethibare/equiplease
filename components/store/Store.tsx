'use client'

import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { sortOptions, subCategories, filters, equipmentItems, EquipmentItem } from './data'
import Image from 'next/image'
import { Search } from 'lucide-react'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const EquipmentCard: React.FC<{ item: EquipmentItem }> = ({ item }) => (
    <div className="group relative border rounded-lg overflow-hidden">
        <div className="aspect-h-4 aspect-w-3 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
            <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
                className="h-full w-full object-cover object-center sm:h-full sm:w-full"
            />
        </div>
        <div className="flex flex-col space-y-2 p-4">
            <h3 className="text-sm font-medium text-gray-900">
                <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.name}
                </a>
            </h3>
            <p className="text-sm text-gray-500">{item.subCategory}</p>
            <p className="text-base font-medium text-gray-900">${item.pricePerDay}/day</p>
            <p className="text-sm text-gray-500">Condition: {item.condition}</p>
            <p className={`text-sm ${item.availability === 'in-stock' ? 'text-green-600' : 'text-red-600'}`}>
                {item.availability === 'in-stock' ? 'Available' : 'Not Available'}
            </p>
        </div>
    </div>
)

export default function RentStore() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false)
    const [filteredItems, setFilteredItems] = useState<EquipmentItem[]>(equipmentItems)
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
    const [searchTerm, setSearchTerm] = useState<string>('')

    const applyFilters = () => {
        const newFilteredItems = equipmentItems.filter((item) => {
            const matchesFilters = Object.entries(activeFilters).every(([filterKey, filterValues]) => {
                if (filterValues.length === 0) return true
                return filterValues.includes(item[filterKey as keyof EquipmentItem] as string)
            })

            const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesFilters && matchesSearchTerm
        })
        setFilteredItems(newFilteredItems)
    }

    useEffect(() => {
        applyFilters()
    }, [activeFilters, searchTerm]) // Trigger filter when searchTerm changes

    const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
        setActiveFilters((prev) => {
            const updatedFilters = { ...prev }
            if (!updatedFilters[filterId]) {
                updatedFilters[filterId] = []
            }
            if (checked) {
                updatedFilters[filterId].push(value)
            } else {
                updatedFilters[filterId] = updatedFilters[filterId].filter((v) => v !== value)
            }
            return updatedFilters
        })
    }

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href} className="block px-2 py-3">
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            defaultChecked={option.checked}
                                                            onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl italic lowercase font-serif tracking-tight text-gray-900">Equiplease</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    href={option.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button
                                type="button"
                                className="inline-flex items-center ml-4 p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <FunnelIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                Filters
                            </button>

                        </div>
                    </div>

                    <label className="input flex items-center gap-2 my-6">
                        <Search className='size-5' />
                        <input type="text" className="grow" placeholder="Search for equipment..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                    </label>

                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
                        {filteredItems.map((item) => (
                            <EquipmentCard key={item.id} item={item} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}
