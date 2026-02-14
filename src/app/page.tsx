import Layout from '@/components/layout/Layout'
import HeroSection from '@/components/home/HeroSection'
import FeaturedCollection from '@/components/home/FeaturedCollection'
import BestSellers from '@/components/home/BestSellers'
import NewArrivals from '@/components/home/NewArrivals'
import DesignStories from '@/components/home/DesignStories'
import Testimonials from '@/components/home/Testimonials'
import CustomDesignCTA from '@/components/home/CustomDesignCTA'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCollection />
      <BestSellers />
      <NewArrivals />
      <DesignStories />
      <Testimonials />
      <CustomDesignCTA />
    </Layout>
  )
}
