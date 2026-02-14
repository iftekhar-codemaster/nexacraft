'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Mock data for featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Urban Street Art',
    price: 45,
    image: '/placeholder-tshirt-1.jpg',
    category: 'Street Wear'
  },
  {
    id: '2',
    name: 'Minimalist Geometric',
    price: 42,
    image: '/placeholder-tshirt-2.jpg',
    category: 'Minimalist'
  },
  {
    id: '3',
    name: 'Vintage Retro',
    price: 48,
    image: '/placeholder-tshirt-3.jpg',
    category: 'Vintage'
  },
  {
    id: '4',
    name: 'Abstract Expression',
    price: 52,
    image: '/placeholder-tshirt-4.jpg',
    category: 'Artistic'
  }
]

export default function FeaturedCollection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium t-shirt designs,
            each with its own unique 3D interactive experience.
          </p>
        </div>

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Product Image/3D Preview */}
                    <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-32 h-48 bg-white border-2 border-gray-200 rounded-lg mb-4 mx-auto flex items-center justify-center">
                            <span className="text-gray-400 text-sm">3D Model</span>
                          </div>
                          <p className="text-sm text-gray-500">Interactive 3D Preview</p>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                      <div>
                        <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mb-2">
                          {product.category}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-3xl font-bold text-indigo-600">
                          ${product.price}
                        </p>
                      </div>

                      <p className="text-gray-600">
                        Experience this design in full 3D. Rotate, zoom, and see every detail
                        before making your purchase. Premium quality cotton with vibrant colors.
                      </p>

                      <div className="flex gap-4">
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                          View in 3D
                        </Button>
                        <Button variant="outline">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" variant="outline">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}