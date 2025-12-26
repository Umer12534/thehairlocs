import React from 'react'
import Pageheader from '../components/ui/pageheader/Pageheader'
import FilterBar from '../components/ui/filterbar/FilterBar'

function Products() {
  return (
    <>
    <Pageheader  
      title="All Products"
      des="Discover our premium collection of hair care products"
      image="/assets/images/products/allProductsheader.jpg" />
      
    <FilterBar />
    </>
  )
}

export default Products
