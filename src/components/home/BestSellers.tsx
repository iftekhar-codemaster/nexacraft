import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Mock data for best sellers
const bestSellers = [
  {
    id: '1',
    name: 'Classic Street',
    price: 45,
    originalPrice: 55,
    rating: 4.8,
    reviews: 124,
    image: '/placeholder-tshirt-1.jpg',
    isNew: false,
    discount: 18
  },
  {
    id: '2',
    name: 'Urban Minimal',
    price: 42,
    originalPrice: 50,
    rating: 4.9,
    reviews: 89,
    image: '/placeholder-tshirt-2.jpg',
    isNew: true,
    discount: 16
  },
  {
    id: '3',
    name: 'Retro Wave',
    price: 48,
    originalPrice: 60,
    rating: 4.7,
    reviews: 156,
    image: '/placeholder-tshirt-3.jpg',
    isNew: false,
    discount: 20
  },
  {
    id: '4',
    name: 'Abstract Art',
    price: 52,
    originalPrice: 65,
    rating: 4.6,
    reviews: 78,
    image: '/placeholder-tshirt-4.jpg',
    isNew: true,
    discount: 20
  }
]

export default function BestSellers() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most popular designs, loved by customers worldwide.
            Each with interactive 3D previews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
              {/* Product Image */}
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-32 bg-white border-2 border-gray-200 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">3D Preview</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                    View in 3D
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-indigo-600 cursor-pointer">
                  {product.name}
                </h3>

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
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" variant="outline">
              View All Best Sellers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}