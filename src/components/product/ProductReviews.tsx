'use client'

import { useState } from 'react'
import { Star, ThumbsUp, MessageCircle, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Mock reviews data
const mockReviews = [
  {
    id: '1',
    user: 'Sarah Johnson',
    rating: 5,
    title: 'Absolutely love this design!',
    comment: 'The 3D preview was amazing and the actual product exceeded my expectations. The quality is top-notch and the fit is perfect.',
    date: '2024-02-10',
    verified: true,
    helpful: 12,
    images: ['/placeholder-review-1.jpg']
  },
  {
    id: '2',
    user: 'Ahmed Rahman',
    rating: 5,
    title: 'Great quality and fast shipping',
    comment: 'Ordered in BDT and the payment process was smooth. The t-shirt arrived quickly and the print quality is excellent.',
    date: '2024-02-08',
    verified: true,
    helpful: 8,
    images: []
  },
  {
    id: '3',
    user: 'Maria Garcia',
    rating: 4,
    title: 'Beautiful design, runs a bit large',
    comment: 'Love the street art design! The colors are vibrant and the material feels premium. Just note that it runs a bit large.',
    date: '2024-02-05',
    verified: true,
    helpful: 6,
    images: ['/placeholder-review-2.jpg', '/placeholder-review-3.jpg']
  }
]

interface ProductReviewsProps {
  productId: string
  rating: number
  reviewCount: number
}

export default function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState('newest')
  const [showAllReviews, setShowAllReviews] = useState(false)

  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">{rating}</span>
            <span className="ml-2 text-gray-600">({reviewCount} reviews)</span>
          </div>
        </div>

        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <MessageCircle className="h-4 w-4 mr-2" />
          Write a Review
        </Button>
      </div>

      {/* Rating Breakdown */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = mockReviews.filter(r => r.rating === stars).length
            const percentage = (count / mockReviews.length) * 100
            return (
              <div key={stars} className="flex items-center space-x-3">
                <span className="text-sm w-8">{stars}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sort and Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded px-3 py-1"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{review.user}</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-700">{review.comment}</p>
            </div>

            {/* Review Images */}
            {review.images.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review.images.map((image, index) => (
                  <div key={index} className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      Image
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Helpful Button */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {mockReviews.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less' : `Show All ${mockReviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  )
}