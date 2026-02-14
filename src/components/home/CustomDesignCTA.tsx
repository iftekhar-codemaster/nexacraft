import Link from 'next/link'
import { Palette, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function CustomDesignCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <Palette className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have a Vision? Let's Bring It to Life
          </h2>

          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Can't find the perfect design? Our custom design service lets you create
            something truly unique. From concept to final product, we make your vision reality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">01</div>
              <h3 className="text-lg font-semibold text-white mb-2">Share Your Idea</h3>
              <p className="text-indigo-100">
                Upload reference images, describe your vision, and specify requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">02</div>
              <h3 className="text-lg font-semibold text-white mb-2">Design & Review</h3>
              <p className="text-indigo-100">
                Our designers create mockups and 3D previews for your approval.
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">03</div>
              <h3 className="text-lg font-semibold text-white mb-2">Production</h3>
              <p className="text-indigo-100">
                Once approved, we produce and deliver your custom design.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/custom-design">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3">
                Start Custom Design
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
              View Examples
            </Button>
          </div>

          <p className="text-indigo-200 mt-6 text-sm">
            Starting from $25 • Free design consultation • 30-day satisfaction guarantee
          </p>
        </div>
      </div>
    </section>
  )
}