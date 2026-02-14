'use client'

import { useState } from 'react'
import { Star, Heart, Share2, ShoppingCart, Check, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Product {
  id: string
  name: string
  description: string
  price_usd: number
  price_bdt: number
  stock: number
  category: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  rating: number
  reviewCount: number
  tags: string[]
}

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const currentPrice = currency === 'USD' ? product.price_usd : product.price_bdt
  const currencySymbol = currency === 'USD' ? '$' : '৳'

  const handleAddToCart = () => {
    // In a real app, this would dispatch to cart context/store
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <span>Home</span> / <span>{product.category}</span> / <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Title and Rating */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-green-600">In Stock ({product.stock} available)</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as 'USD' | 'BDT')}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="USD">USD</option>
            <option value="BDT">BDT</option>
          </select>
        </div>
        <div className="text-3xl font-bold text-gray-900">
          {currencySymbol}{currentPrice}
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
        <div className="flex space-x-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full border-2 ${
                selectedColor.name === color.name
                  ? 'border-indigo-600'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2">{selectedColor.name}</p>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-2 px-4 border rounded-md text-sm font-medium ${
                selectedSize === size
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3"
          disabled={isAddedToCart}
        >
          {isAddedToCart ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="flex-1"
          >
            <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
            {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="border-t pt-6 space-y-3 text-sm text-gray-600">
        <div className="flex items-center">
          <Truck className="h-5 w-5 mr-3 text-indigo-600" />
          <span>Free shipping on orders over {currencySymbol}{currency === 'USD' ? '50' : '4000'}</span>
        </div>
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-3 text-indigo-600" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center">
          <Check className="h-5 w-5 mr-3 text-indigo-600" />
          <span>Premium quality guaranteed</span>
        </div>
      </div>
    </div>
  )
}