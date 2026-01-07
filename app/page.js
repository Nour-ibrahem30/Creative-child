import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedProducts from '@/components/FeaturedProducts'
import SpecialOffer from '@/components/SpecialOffer'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <Categories />
            <FeaturedProducts />
            <SpecialOffer />
            <Testimonials />
            <Newsletter />
            <Footer />
        </main>
    )
}
