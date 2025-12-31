import React from 'react'
import Pageheader from '../components/ui/pageheader/Pageheader'
import FilterTabs from '../components/ui/filterTabs/FilterTabs'
import AllCategoriesSection from '../components/sections/allcategoriessection/AllCategoriesSection'
import FeaturedProducts from '../components/sections/ProductsSection/ProductsSection';
import { products } from '../data/Products';

const categories = [
    { name: "All Categories", sectionId: "all" },
    { name: "Hair Oils", sectionId: "hair-oils" },
    { name: "Shampoos", sectionId: "shampoos" },
    { name: "Conditioners", sectionId: "conditioners" },
    { name: "Styling", sectionId: "styling" },
];

const Categories = () => {
  return (
    <>
    <Pageheader  
      title="Categories"
      des="Discover our premium collection of hair care products"
      image="/assets/images/products/allProductsheader.jpg" />
    <FilterTabs categories = {categories}/>

    {categories.map((cat, index)=>(
      <section key={index} id={cat.sectionId} style={{scrollMarginTop: '150px'}}>
        {cat.name === "All Categories" ? <AllCategoriesSection /> : null}
        {cat.name === "Hair Oils"? <FeaturedProducts featuredCardproducts = {products} /> : null}
      </section>
    ))}

    </>
  )
}

export default Categories
