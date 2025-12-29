import React from 'react'
import Pageheader from '../components/ui/pageheader/Pageheader'
import FilterBar from '../components/ui/filterbar/FilterBar'
import Allproducts from '../components/sections/allproducts/Allproducts'

function Products() {
  return (
    <>
    <Pageheader  
      title="All Products"
      des="Discover our premium collection of hair care products"
      image="/assets/images/products/allProductsheader.jpg" />
    <FilterBar />
    <Allproducts/>
    
    </>
  )
}

export default Products
