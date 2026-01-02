import React from 'react'
import HeroSection from '../components/sections/HeroSection/HeroSection'

function Contact(){
  return(
    <>
    <HeroSection 
      title="Stay Updated" 
      text="Subscribe to our newsletter for exclusive offers, hair care tips, and new product launches." 
      subscribe={true}
      image="/assets/images/Contact/contact_hero.jpg"
      bgimage="/assets/images/explore/explore-bg.png"
      alt/>
      
    </>
  )
}


export default Contact
