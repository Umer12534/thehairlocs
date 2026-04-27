import AllCategoriesSection from '../components/sections/allcategoriessection/AllCategoriesSection'
import {Helmet} from 'react-helmet'
import Hero from '../components/sections/Hero/Hero'
import ProductsSection from '../components/sections/ProductsSection/ProductsSection'
import Banner from '../components/sections/Banner/Banner';
import Explore from '../components/sections/Explore/Explore';
import ScrollingBar from '../components/sections/scrollingBar/ScrollingBar';
import Heading from '../components/ui/heading/Heading';
import Button from '../components/ui/button/Button'
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const colectionRef = useMemo(() => collection(db, "products"), []);

  useEffect(() =>{
    const getProducts = async () => {
      try{
        const data = await getDocs(colectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setProducts(filteredData);
        setLoading(false);
      } catch(err){
        console.log(err);
      }
      
    }
    getProducts();
  }, [colectionRef])

  const navigate = useNavigate()
  return (
    <>
      <Helmet>
        <title>Home | My Hair Locs</title>
        <meta 
          name='description' 
          content='Shop premium hair care products and discover featured collections at My Hair Locs.' 
        />
        <meta
          name='keywords'
          content='My Hair Locs, hair care, loc care, featured products, premium hair products'
        />
      </Helmet>
      <main>
        <Hero />
        <ScrollingBar/>
        <Heading heading_text="All Categories" position='center'/>
        <AllCategoriesSection/>
        <Button children="EXPLORE ALL CATEGORIES" size='lg' position='center' onClick={()=> navigate("/categories")}/>
        <Explore /> 
        <Heading heading_text="Featured Products"/>
        <ProductsSection ProductsType = "featured" sortedFilteredProducts={products} loading= {loading}/>
        <Button children="EXPLORE ALL PRODUCTS" size='lg' position='center' onClick={() => navigate("/products")}/>
        <Banner />
        <ScrollingBar/>
      </main>
    </>
  )
}

export default Home;
