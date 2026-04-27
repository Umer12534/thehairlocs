import React from 'react'
import {Helmet} from 'react-helmet'
import HeroSection from '../components/sections/HeroSection/HeroSection'
import ContactForm from '../components/sections/contactForm/ContactForm'
import ContactInfo from '../components/sections/contactInfo/ContactInfo'
import MapSection from '../components/sections/mapSection/MapSection'
import '../styles/Contact.css'
function Contact(){
  return(
    <>
    <Helmet>
      <title>Contact | My Hair Locs</title>
      <meta 
        name='description' 
        content='Get in touch with My Hair Locs for support, questions, and updates.' 
      />
      <meta
        name='keywords'
        content='contact My Hair Locs, customer support, hair care help, contact page'
      />
    </Helmet>
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
