import Categories from '../components/sections/categories/Categories'
import Hero from '../components/sections/Hero/Hero'
import FeaturedProducts from '../components/sections/FeaturedProducts/FeaturedProducts'
import Banner from '../components/sections/Banner/Banner';

function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Banner/>
    </main>
  )
}

export default Home;
