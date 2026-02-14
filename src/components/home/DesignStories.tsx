import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Palette, Zap, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Mock data for design stories
const designStories = [
  {
    id: '1',
    title: 'From Street to Style',
    description: 'How urban graffiti inspired our bestselling street wear collection',
    image: '/placeholder-story-1.jpg',
    icon: Palette,
    readTime: '3 min read',
    category: 'Inspiration'
  },
  {
    id: '2',
    title: 'The Art of Minimalism',
    description: 'Exploring the power of simplicity in modern t-shirt design',
    image: '/placeholder-story-2.jpg',
    icon: Zap,
    readTime: '4 min read',
    category: 'Design Process'
  },
  {
    id: '3',
    title: 'Customer Stories',
    description: 'Real stories from customers who found their perfect design',
    image: '/placeholder-story-3.jpg',
    icon: Heart,
    readTime: '5 min read',
    category: 'Community'
  }
]

export default function DesignStories() {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Design Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Behind every great design is a story. Discover the inspiration,
            process, and passion that goes into each NexaCraft creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {designStories.map((story) => {
            const IconComponent = story.icon
            return (
              <article key={story.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                {/* Story Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <IconComponent className="h-12 w-12 text-indigo-600 mb-2" />
                      <p className="text-sm text-gray-500">Design Story</p>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded">
                      {story.category}
                    </span>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-indigo-600 font-medium">
                      {story.readTime}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {story.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {story.description}
                  </p>

                  <Link href={`/stories/${story.id}`}>
                    <Button variant="ghost" className="p-0 h-auto text-indigo-600 hover:text-indigo-700 font-medium">
                      Read Story
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/stories">
            <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
              View All Stories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}