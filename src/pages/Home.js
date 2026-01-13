import AllCategoriesSection from '../components/sections/allcategoriessection/AllCategoriesSection'
import Hero from '../components/sections/Hero/Hero'
import ProductsSection from '../components/sections/ProductsSection/ProductsSection'
import Banner from '../components/sections/Banner/Banner';
import Explore from '../components/sections/Explore/Explore';
import ScrollingBar from '../components/sections/scrollingBar/ScrollingBar';
// import { featuredCardproducts } from '../data/Products';
import Heading from '../components/ui/heading/Heading';
import Button from '../components/ui/button/Button'
import { useNavigate } from 'react-router-dom';
import { products } from '../data/Products';

function Home() {
  const navigate = useNavigate()
  return (
    <main>
      <Hero />
      <ScrollingBar/>
      <Heading heading_text="All Categories" position='center'/>
      <AllCategoriesSection/>
      <Button children="EXPLORE ALL CATEGORIES" size='lg' position='center'/>
      <Explore /> 
      <Heading heading_text="Featured Products"/>
      <ProductsSection ProductsType = "featured" sortedFilteredProducts={products}/>
      <Button children="EXPLORE ALL PRODUCTS" size='lg' position='center' onClick={() => navigate("/product")}/>
      <Banner />
      <ScrollingBar/>
    </main>
  )
}

export default Home;
