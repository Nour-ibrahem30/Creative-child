import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedProducts from '@/components/FeaturedProducts'
import Footer from '@/components/Footer'

// Lazy load below-the-fold sections
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'))
const NewArrivals = dynamic(() => import('@/components/NewArrivals'))
const Stats = dynamic(() => import('@/components/Stats'))
const BestSellers = dynamic(() => import('@/components/BestSellers'))
const TestimonialsNew = dynamic(() => import('@/components/TestimonialsNew'))
const NewsletterNew = dynamic(() => import('@/components/NewsletterNew'))

export default function Home() {
  return (
    <main className="cc-home">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <NewArrivals />
      <Stats />
      <BestSellers />
      <TestimonialsNew />
      <NewsletterNew />
      <Footer />
    </main>
  )
}
