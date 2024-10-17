export interface SortOption {
    name: string
    href: string
    current: boolean
}

export interface SubCategory {
    name: string
    href: string
}

export interface FilterOption {
    value: string
    label: string
    checked: boolean
}

export interface FilterSection {
    id: string
    name: string
    options: FilterOption[]
}

export interface EquipmentItem {
    id: string
    name: string
    category: string
    subCategory: string
    pricePerDay: number
    availability: string
    condition: string
    image: string
}

export const sortOptions: SortOption[] = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]

export const subCategories: SubCategory[] = [
    { name: 'Power Tools', href: '#' },
    { name: 'Hand Tools', href: '#' },
    { name: 'Gardening', href: '#' },
    { name: 'Construction', href: '#' },
    { name: 'Cleaning', href: '#' },
]

export const filters: FilterSection[] = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'power-tools', label: 'Power Tools', checked: false },
            { value: 'hand-tools', label: 'Hand Tools', checked: false },
            { value: 'gardening', label: 'Gardening', checked: false },
            { value: 'construction', label: 'Construction', checked: false },
            { value: 'cleaning', label: 'Cleaning', checked: false },
        ],
    },
    {
        id: 'availability',
        name: 'Availability',
        options: [
            { value: 'in-stock', label: 'In Stock', checked: false },
            { value: 'out-of-stock', label: 'Out of Stock', checked: false },
        ],
    },
    {
        id: 'condition',
        name: 'Condition',
        options: [
            { value: 'new', label: 'New', checked: false },
            { value: 'like-new', label: 'Like New', checked: false },
            { value: 'good', label: 'Good', checked: false },
            { value: 'fair', label: 'Fair', checked: false },
        ],
    },
]

export const equipmentItems: EquipmentItem[] = [
    {
        id: '1',
        name: 'Electric Drill',
        category: 'power-tools',
        subCategory: 'Power Tools',
        pricePerDay: 25,
        availability: 'in-stock',
        condition: 'new',
        image: '/images/electric-drill.jpg',
    },
    {
        id: '2',
        name: 'Chainsaw',
        category: 'power-tools',
        subCategory: 'Power Tools',
        pricePerDay: 40,
        availability: 'in-stock',
        condition: 'good',
        image: '/images/chainsaw.jpg',
    },
    {
        id: '3',
        name: 'Hammer',
        category: 'hand-tools',
        subCategory: 'Hand Tools',
        pricePerDay: 5,
        availability: 'in-stock',
        condition: 'like-new',
        image: '/images/hammer.jpg',
    },
    {
        id: '4',
        name: 'Lawnmower',
        category: 'gardening',
        subCategory: 'Gardening',
        pricePerDay: 30,
        availability: 'out-of-stock',
        condition: 'fair',
        image: '/images/lawnmower.jpg',
    },
    {
        id: '5',
        name: 'Concrete Mixer',
        category: 'construction',
        subCategory: 'Construction',
        pricePerDay: 75,
        availability: 'in-stock',
        condition: 'good',
        image: '/images/concrete-mixer.jpg',
    },
]