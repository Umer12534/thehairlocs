import AllCategoriesSection from '../components/sections/allcategoriessection/AllCategoriesSection'
import Hero from '../components/sections/Hero/Hero'
import ProductsSection from '../components/sections/ProductsSection/ProductsSection'
import Banner from '../components/sections/Banner/Banner';
import Explore from '../components/sections/Explore/Explore';
import ScrollingBar from '../components/sections/scrollingBar/ScrollingBar';
import { featuredCardproducts } from '../data/Products';
import './Home.css'

function Home() {
  return (
    <main>
      <Hero />
      <ScrollingBar/>
      <div className="title-section">
          <h2>All Categories</h2>
      </div>
      <AllCategoriesSection/>
      <Explore />
      <div className="title-section">
          <h2>Featured Products</h2>
      </div>
      <ProductsSection featuredCardproducts = {featuredCardproducts}/>
      <Banner/>
      <ScrollingBar/>
    </main>
  )
}

export default Home;
