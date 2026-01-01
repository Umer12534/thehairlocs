import React from 'react'
import Pageheader from '../components/ui/pageheader/Pageheader'
import ProductsWithfilters from '../components/sections/productsWithfilters/ProductsWithfilters'

function Products() {
  return (
    <>
    <Pageheader  
      title="All Products"
      des="Discover our premium collection of hair care products"
      image="/assets/images/products/allProductsheader.jpg" />
    <ProductsWithfilters badgeType={null}/>
    </>
  )
}

export default Products
