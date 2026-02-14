'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilters from '@/components/product/ProductFilters'
import SearchBar from '@/components/product/SearchBar'
import { Button } from '@/components/ui/Button'
import { SlidersHorizontal, Grid, List } from 'lucide-react'

// Mock product data - in real app, this would come from Supabase
const mockProducts = [
  {
    id: '1',
    name: 'Urban Street Art',
    price_usd: 45,
    price_bdt: 3800,
    stock: 25,
    category: 'Street Wear',
    rating: 4.8,
    reviewCount: 124,
    tags: ['urban', 'street', 'art'],
    colors: [{ name: 'Black', hex: '#000000' }, { name: 'White', hex: '#ffffff' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL']
  },
  {
    id: '2',
    name: 'Minimalist Geometric',
    price_usd: 42,
    price_bdt: 3550,
    stock: 18,
    category: 'Minimalist',
    rating: 4.9,
    reviewCount: 89,
    tags: ['minimal', 'geometric', 'clean'],
    colors: [{ name: 'Navy', hex: '#1e3a8a' }, { name: 'Gray', hex: '#6b7280' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Retro Wave',
    price_usd: 48,
    price_bdt: 4050,
    stock: 32,
    category: 'Vintage',
    rating: 4.7,
    reviewCount: 156,
    tags: ['retro', 'wave', 'vintage'],
    colors: [{ name: 'Red', hex: '#dc2626' }, { name: 'Blue', hex: '#2563eb' }],
    sizes: ['S', 'M', 'L', 'XL', '2XL']
  },
  {
    id: '4',
    name: 'Abstract Expression',
    price_usd: 52,
    price_bdt: 4400,
    stock: 15,
    category: 'Artistic',
    rating: 4.6,
    reviewCount: 78,
    tags: ['abstract', 'expression', 'art'],
    colors: [{ name: 'Purple', hex: '#7c3aed' }, { name: 'Green', hex: '#059669' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '5',
    name: 'Vintage Typography',
    price_usd: 45,
    price_bdt: 3800,
    stock: 28,
    category: 'Vintage',
    rating: 4.8,
    reviewCount: 92,
    tags: ['typography', 'vintage', 'text'],
    colors: [{ name: 'Black', hex: '#000000' }, { name: 'Cream', hex: '#fef3c7' }],
    sizes: ['S', 'M', 'L', 'XL', '2XL']
  },
  {
    id: '6',
    name: 'Neon Dreams',
    price_usd: 46,
    price_bdt: 3900,
    stock: 20,
    category: 'Street Wear',
    rating: 4.5,
    reviewCount: 67,
    tags: ['neon', 'bright', 'street'],
    colors: [{ name: 'Neon Pink', hex: '#ec4899' }, { name: 'Neon Green', hex: '#10b981' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  }
]

type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'rating' | 'popular'
type ViewMode = 'grid' | 'list'

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)))

  // Get unique sizes
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)))

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || product.category === selectedCategory

      const productPrice = currency === 'USD' ? product.price_usd : product.price_bdt
      const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1]

      const matchesSizes = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size))

      return matchesSearch && matchesCategory && matchesPrice && matchesSizes
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.id.localeCompare(a.id) // Assuming higher ID = newer
        case 'oldest':
          return a.id.localeCompare(b.id)
        case 'price-low':
          return (currency === 'USD' ? a.price_usd : a.price_bdt) - (currency === 'USD' ? b.price_usd : b.price_bdt)
        case 'price-high':
          return (currency === 'USD' ? b.price_usd : b.price_bdt) - (currency === 'USD' ? a.price_usd : a.price_bdt)
        case 'rating':
          return b.rating - a.rating
        case 'popular':
        default:
          return b.reviewCount - a.reviewCount
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, priceRange, selectedSizes, sortBy, currency])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range)
  }

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setPriceRange([0, 100])
    setSelectedSizes([])
    setSortBy('popular')
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
                <p className="text-gray-600 mt-1">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center space-x-4">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as 'USD' | 'BDT')}
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="USD">USD</option>
                  <option value="BDT">BDT</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-6">
              <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className={`w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <ProductFilters
                  categories={categories}
                  allSizes={allSizes}
                  selectedCategory={selectedCategory}
                  selectedSizes={selectedSizes}
                  priceRange={priceRange}
                  currency={currency}
                  onCategoryChange={handleCategoryChange}
                  onSizeToggle={handleSizeToggle}
                  onPriceRangeChange={handlePriceRangeChange}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort and Filter Toggle */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters</span>
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <ProductGrid
                products={filteredProducts}
                viewMode={viewMode}
                currency={currency}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  )
}