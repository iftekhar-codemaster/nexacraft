'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { X } from 'lucide-react'

interface ProductFiltersProps {
  categories: string[]
  allSizes: string[]
  selectedCategory: string
  selectedSizes: string[]
  priceRange: [number, number]
  currency: 'USD' | 'BDT'
  onCategoryChange: (category: string) => void
  onSizeToggle: (size: string) => void
  onPriceRangeChange: (range: [number, number]) => void
  onClearFilters: () => void
}

export default function ProductFilters({
  categories,
  allSizes,
  selectedCategory,
  selectedSizes,
  priceRange,
  currency,
  onCategoryChange,
  onSizeToggle,
  onPriceRangeChange,
  onClearFilters
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange)

  const maxPrice = currency === 'USD' ? 100 : 8500
  const currencySymbol = currency === 'USD' ? '$' : '৳'

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...localPriceRange]
    newRange[index] = value
    setLocalPriceRange(newRange)
    onPriceRangeChange(newRange)
  }

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    selectedSizes.length +
    (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-600 hover:text-gray-900"
          >
            Clear all ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('')}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
              selectedCategory === ''
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                selectedCategory === category
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Price Range ({currencySymbol})
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              max={maxPrice}
              value={localPriceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Min"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              min="0"
              max={maxPrice}
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Max"
            />
          </div>

          {/* Price range slider */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={localPriceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider-thumb"
            />
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider-thumb"
            />
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>{currencySymbol}0</span>
            <span>{currencySymbol}{maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeToggle(size)}
              className={`px-3 py-2 border rounded-md text-sm font-medium ${
                selectedSizes.includes(size)
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">
                {selectedCategory}
                <button
                  onClick={() => onCategoryChange('')}
                  className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedSizes.map((size) => (
              <span key={size} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">
                Size: {size}
                <button
                  onClick={() => onSizeToggle(size)}
                  className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">
                Price: {currencySymbol}{priceRange[0]} - {currencySymbol}{priceRange[1]}
                <button
                  onClick={() => onPriceRangeChange([0, maxPrice])}
                  className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}