import { notFound } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import Product3DViewer from '@/components/product/Product3DViewer'
import ProductInfo from '@/components/product/ProductInfo'
import ProductSpecifications from '@/components/product/ProductSpecifications'
import ProductReviews from '@/components/product/ProductReviews'
import RelatedProducts from '../../../components/product/RelatedProducts'
import { Button } from '@/components/ui/Button'
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react'

// Mock product data - in real app, this would come from database
const getProduct = async (id: string) => {
  // Simulate API call
  const products = {
    '1': {
      id: '1',
      name: 'Urban Street Art',
      description: 'A bold street art inspired design that captures the essence of urban culture. Featuring intricate graffiti elements and vibrant colors that make a statement.',
      price_usd: 45,
      price_bdt: 3800,
      stock: 25,
      category: 'Street Wear',
      model_url: '/models/tshirt-street-art.glb',
      specifications: [
        { name: 'Material', value: '100% Premium Cotton' },
        { name: 'Weight', value: '180 GSM' },
        { name: 'Fit', value: 'Regular Fit' },
        { name: 'Care', value: 'Machine wash cold, tumble dry low' },
        { name: 'Origin', value: 'Made in Bangladesh' }
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Navy', hex: '#1e40af' },
        { name: 'Gray', hex: '#6b7280' }
      ],
      images: [
        '/placeholder-tshirt-1.jpg',
        '/placeholder-tshirt-1-back.jpg',
        '/placeholder-tshirt-1-detail.jpg'
      ],
      rating: 4.8,
      reviewCount: 124,
      tags: ['streetwear', 'urban', 'graffiti', 'bold']
    }
  }

  return products[id as keyof typeof products] || null
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* 3D Viewer Section */}
          <div className="space-y-4">
            <Product3DViewer modelUrl={product.model_url} />
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Product Image {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <ProductInfo product={product} />
        </div>

        {/* Product Specifications */}
        <ProductSpecifications specifications={product.specifications} />

        {/* Shipping & Returns Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <div className="text-center">
            <Truck className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">Free shipping on orders over $50 USD / ৳4000 BDT</p>
          </div>
          <div className="text-center">
            <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-gray-600">Premium materials and craftsmanship guaranteed</p>
          </div>
          <div className="text-center">
            <RotateCcw className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy for your peace of mind</p>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </Layout>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: 'Product Not Found | NexaCraft'
    }
  }

  return {
    title: `${product.name} | NexaCraft`,
    description: product.description,
    openGraph: {
      title: `${product.name} | NexaCraft`,
      description: product.description,
      images: product.images
    }
  }
}