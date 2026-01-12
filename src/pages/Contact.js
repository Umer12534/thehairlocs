import React from 'react'
import HeroSection from '../components/sections/HeroSection/HeroSection'
import ContactForm from '../components/sections/contactForm/ContactForm'
import ContactInfo from '../components/sections/contactInfo/ContactInfo'
import MapSection from '../components/sections/mapSection/MapSection'
import './Contact.css'
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
      
      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            
              <ContactForm />
              <ContactInfo />
            
          </div>
        </div>

        <MapSection/>
      </div>
    </>
  )
}


export default Contact
