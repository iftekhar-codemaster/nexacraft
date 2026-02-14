'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Product {
  id: string
  name: string
  price_usd: number
  price_bdt: number
  stock: number
  category: string
  rating: number
  reviewCount: number
  tags: string[]
  colors: { name: string; hex: string }[]
  sizes: string[]
}

interface ProductGridProps {
  products: Product[]
  viewMode: 'grid' | 'list'
  currency: 'USD' | 'BDT'
}

export default function ProductGrid({ products, viewMode, currency }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-5v2m0 0v2m0-2h2m-2 0h-2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} currency={currency} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} currency={currency} />
      ))}
    </div>
  )
}

function ProductCard({ product, currency }: { product: Product; currency: 'USD' | 'BDT' }) {
  const currentPrice = currency === 'USD' ? product.price_usd : product.price_bdt
  const currencySymbol = currency === 'USD' ? '$' : '৳'

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-28 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">3D Preview</span>
            </div>
          </div>
        </div>

        {/* Stock indicator */}
        {product.stock < 10 && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              Only {product.stock} left
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
              Quick View
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {currencySymbol}{currentPrice}
          </span>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ProductListItem({ product, currency }: { product: Product; currency: 'USD' | 'BDT' }) {
  const currentPrice = currency === 'USD' ? product.price_usd : product.price_bdt
  const currencySymbol = currency === 'USD' ? '$' : '৳'

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="text-center">
            <div className="w-16 h-20 bg-white border border-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-400 text-xs">3D</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2">
                <span className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
                  {product.category}
                </span>
              </div>

              <Link href={`/products/${product.id}`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {product.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Sizes */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-600">Sizes:</span>
                <div className="flex gap-1">
                  {product.sizes.slice(0, 4).map((size) => (
                    <span
                      key={size}
                      className="text-xs border border-gray-300 px-2 py-1 rounded"
                    >
                      {size}
                    </span>
                  ))}
                  {product.sizes.length > 4 && (
                    <span className="text-xs text-gray-500">+{product.sizes.length - 4} more</span>
                  )}
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="text-right ml-6">
              <div className="text-2xl font-bold text-gray-900 mb-3">
                {currencySymbol}{currentPrice}
              </div>

              <div className="flex flex-col gap-2">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
              </div>

              {product.stock < 10 && (
                <div className="text-sm text-red-600 mt-2">
                  Only {product.stock} left in stock
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}