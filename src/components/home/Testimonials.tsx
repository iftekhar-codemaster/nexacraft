import { Star, Quote } from 'lucide-react'

// Mock testimonials data
const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    text: 'The 3D preview feature is incredible! I could see exactly how the design would look before buying. The quality exceeded my expectations.',
    avatar: '/placeholder-avatar-1.jpg',
    product: 'Urban Street Art T-Shirt'
  },
  {
    id: '2',
    name: 'Ahmed Rahman',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    text: 'Finally, a platform that supports both USD and BDT payments. The custom design process was smooth and the final product was perfect.',
    avatar: '/placeholder-avatar-2.jpg',
    product: 'Custom Design Request'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    location: 'Barcelona, Spain',
    rating: 5,
    text: 'The attention to detail in their designs is amazing. Each t-shirt feels premium and the 3D experience makes shopping so much more engaging.',
    avatar: '/placeholder-avatar-3.jpg',
    product: 'Minimalist Geometric T-Shirt'
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what customers around the world
            are saying about their NexaCraft experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6 relative">
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-indigo-200" />

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Customer info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.location}
                  </div>
                  <div className="text-xs text-indigo-600 mt-1">
                    Purchased: {testimonial.product}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Unique Designs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}