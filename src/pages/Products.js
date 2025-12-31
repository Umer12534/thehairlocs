import React from 'react'
import Pageheader from '../components/ui/pageheader/Pageheader'
import Allproducts from '../components/sections/allproducts/Allproducts'

function Products() {
  return (
    <>
    <Pageheader  
      title="All Products"
      des="Discover our premium collection of hair care products"
      image="/assets/images/products/allProductsheader.jpg" />
    <Allproducts/>
    </>
  )
}

export default Products
