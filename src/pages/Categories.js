import React from 'react'
import Pageheader from '../components/ui/pageheader/Pageheader'
import FilterTabs from '../components/ui/filterTabs/FilterTabs'
import AllCategoriesSection from '../components/sections/allcategoriessection/AllCategoriesSection'
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import { products } from '../data/Products';
import Heading from '../components/ui/heading/Heading'

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
        
        {cat.name === "All Categories" ? (
          <>
          <Heading heading_text= {cat.name} position= 'left' />
          <AllCategoriesSection />
          </>
          ) : null}

        {cat.name === "Hair Oils"? (
          <>

          <Heading heading_text= {cat.name} position= 'left' />
          <ProductsSection category={cat.name}/>
          </>
          ) : null}

        {cat.name === "Shampoos"? (
          <>
          <Heading heading_text= {cat.name} position= 'left' />
          <ProductsSection category={cat.name} />
          </>
          ) : null}

        {cat.name === "Conditioners" ? (
          <>
          <Heading heading_text= {cat.name} position= 'left' />
          <ProductsSection category={cat.name}/>
          </>
          ) : null}

        {cat.name === "Styling" ? (
          <>
          <Heading heading_text= {cat.name} position= 'left' />
          <ProductsSection category={cat.name}/>
          </>
          ) : null}
      </section>
    ))}

    </>
  )
}

export default Categories
