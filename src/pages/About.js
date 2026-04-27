import React from 'react'
import {Helmet} from 'react-helmet'
import Pageheader from '../components/ui/pageheader/Pageheader'

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | My Hair Locs</title>
        <meta 
          name='description' 
          content='Learn more about My Hair Locs and our mission.' 
        />
        <meta
          name='keywords'
          content='about My Hair Locs, hair care brand, loc care mission, hair care company'
        />
      </Helmet>

      <div>
        <Pageheader 
          title={"Our Story"}
          des={"For over a decade, The Hair Locs has been dedicated to the art and culture of beautiful, healthy locs. We are more than a salon - we are a community."}
          image={'/assets/images/About/about-hero.jpg'}
        />
      </div>
    </>
  )
}

export default About
