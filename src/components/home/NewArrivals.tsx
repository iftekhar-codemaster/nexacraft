'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Mock data for new arrivals
const newArrivals = [
  {
    id: '1',
    name: 'Neon Dreams',
    price: 46,
    image: '/placeholder-tshirt-1.jpg',
    category: 'Street Wear',
    daysAgo: 2
  },
  {
    id: '2',
    name: 'Digital Matrix',
    price: 44,
    image: '/placeholder-tshirt-2.jpg',
    category: 'Tech',
    daysAgo: 5
  },
  {
    id: '3',
    name: 'Ocean Waves',
    price: 48,
    image: '/placeholder-tshirt-3.jpg',
    category: 'Nature',
    daysAgo: 7
  },
  {
    id: '4',
    name: 'Geometric Patterns',
    price: 42,
    image: '/placeholder-tshirt-4.jpg',
    category: 'Abstract',
    daysAgo: 10
  },
  {
    id: '5',
    name: 'Vintage Typography',
    price: 45,
    image: '/placeholder-tshirt-5.jpg',
    category: 'Vintage',
    daysAgo: 12
  }
]

export default function NewArrivals() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4
  const maxIndex = Math.max(0, newArrivals.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-lg text-gray-600">
              Fresh designs just dropped. Be the first to experience them in 3D.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {newArrivals.map((product) => (
              <div key={product.id} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0">
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 group">
                  {/* Product Preview */}
                  <div className="relative h-48 bg-white rounded-lg mb-4 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-28 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center mb-2">
                          <span className="text-gray-400 text-xs">3D Model</span>
                        </div>
                        <p className="text-xs text-gray-500">New Arrival</p>
                      </div>
                    </div>

                    {/* New badge */}
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {product.daysAgo}d ago
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-indigo-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </p>

                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}