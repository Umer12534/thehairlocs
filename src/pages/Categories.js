import React from 'react'
import Pageheader from '../components/ui/pageheader/Pageheader'
import FilterTabs from '../components/ui/filterTabs/FilterTabs'
import AllCategoriesSection from '../components/sections/allcategoriessection/AllCategoriesSection'
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import { products } from '../data/Products';
import Heading from '../components/ui/heading/Heading'

const categories = [
    { name: "All Categories", sectionId: "all" },
    { name: "Hair_oils", sectionId: "Hair_oils" },
    { name: "Moisturizers", sectionId: "Moisturizers" },
    { name: "Shampoos", sectionId: "Shampoos" },
    { name: "Conditioners", sectionId: "Conditioners" },
    { name: "Styling", sectionId: "Styling" },
    { name: "Hair_Serums", sectionId: "styling" },
];

const Categories = () => {
  return (
    <>
    <Pageheader  
      title="Categories"
      des="Discover our premium collection of hair care products"
      image="/assets/images/categories/hero.jpg" />
    <FilterTabs categories = {categories}/>


    {categories.map((cat, index)=>(
      <section key={index} id={cat.sectionId} style={{scrollMarginTop: '150px'}}>
        
        {cat.name === "All Categories" ? (
          <>
          <Heading heading_text= {cat.name} position= 'left' />
          <AllCategoriesSection />
          </>
          ) : null}

        {cat.name === "Hair_oils"? (
          <>

          <Heading heading_text= {cat.name} position= 'left' />
          <ProductsSection category={cat.name} sortedFilteredProducts={products} layout={4}/>
          </>
          ) : null}

        {cat.name === "Moisturizers"? (
          <>
          <Heading heading_text= {cat.name} position= 'left' />
          <ProductsSection category={cat.name} sortedFilteredProducts={products} layout={4}/>
          </>
          ) : null}

        {cat.name === "Shampoos" ? (
          <>
          <Heading heading_text= {cat.name} position= 'left' />
          <ProductsSection category={cat.name} sortedFilteredProducts={products} layout={4}/>
          </>
          ) : null}

        {cat.name === "Conditioners" ? (
          <>
          <Heading heading_text= {cat.name} position= 'left' />
          <ProductsSection category={cat.name} sortedFilteredProducts={products} layout={4}/>
          </>
          ) : null}

        {cat.name === "Styling" ? (
          <>
          <Heading heading_text= {cat.name} position= 'left' />
          <ProductsSection category={cat.name} sortedFilteredProducts={products} layout={4}/>
          </>
          ) : null}

        {cat.name === "Hair_Serums" ? (
          <>
          <Heading heading_text= {cat.name} position= 'left' />
          <ProductsSection category={cat.name} sortedFilteredProducts={products} layout={4}/>
          </>
          ) : null}
      </section>
    ))}

    </>
  )
}

export default Categories
