import Categories from '../components/sections/categories/Categories'
import Hero from '../components/sections/Hero/Hero'
import FeaturedProducts from '../components/sections/FeaturedProducts/FeaturedProducts'
import Banner from '../components/sections/Banner/Banner';
import Explore from '../components/sections/Explore/Explore';
import ScrollingBar from '../components/sections/scrollingBar/ScrollingBar';

function Home() {
  return (
    <main>
      <Hero />
      <ScrollingBar/>
      <Categories />
      <Explore />
      <FeaturedProducts />
      <Banner/>
      <ScrollingBar/>
    </main>
  )
}

export default Home;
