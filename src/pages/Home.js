import Categories from '../components/sections/categories/Categories'
import Hero from '../components/sections/Hero/Hero'
import FeaturedProducts from '../components/sections/FeaturedProducts/FeaturedProducts'

function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </main>
  )
}

export default Home;
