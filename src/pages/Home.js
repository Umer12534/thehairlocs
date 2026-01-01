import AllCategoriesSection from '../components/sections/allcategoriessection/AllCategoriesSection'
import Hero from '../components/sections/Hero/Hero'
import ProductsSection from '../components/sections/ProductsSection/ProductsSection'
import Banner from '../components/sections/Banner/Banner';
import Explore from '../components/sections/Explore/Explore';
import ScrollingBar from '../components/sections/scrollingBar/ScrollingBar';
// import { featuredCardproducts } from '../data/Products';
import Heading from '../components/ui/heading/Heading';
import Button from '../components/ui/button/Button'

function Home() {
  return (
    <main>
      <Hero />
      <ScrollingBar/>
      <Heading heading_text="All Categories" position='center'/>
      <AllCategoriesSection/>
      <Button children="EXPLORE ALL CATEGORIES" size='lg' position='center'/>
      <Explore />
      <Heading heading_text="Featured Products"/>
      <ProductsSection ProductsType = "featured"/>
      <Button children="EXPLORE ALL PRODUCTS" size='lg' position='center'/>
      <Banner />
      <ScrollingBar/>
    </main>
  )
}

export default Home;
