import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Mock related products data
const relatedProducts = [
  {
    id: '2',
    name: 'Minimalist Geometric',
    price: 42,
    originalPrice: 50,
    rating: 4.9,
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
    image: '/placeholder-tshirt-4.jpg',
    isNew: true,
    discount: 20
  },
  {
    id: '5',
    name: 'Vintage Typography',
    price: 45,
    image: '/placeholder-tshirt-5.jpg',
    rating: 4.8,
    isNew: false
  }
]

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  // Filter out current product and limit to 4 items
  const filteredProducts = relatedProducts.filter(p => p.id !== currentProductId).slice(0, 4)

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-1">
                      <span className="text-gray-400 text-xs">3D</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                    View Details
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
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
                    {product.rating}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Quick Add
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href={`/collections/${category.toLowerCase().replace(' ', '-')}`}>
          <Button size="lg" variant="outline">
            View All {category} Designs
          </Button>
        </Link>
      </div>
    </div>
  )
}