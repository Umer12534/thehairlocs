import React from 'react'
import './HeroSection.css'
import { Link } from 'react-router-dom'

function Hero({title, text, btnText, btnLink, image, alt, reverse = false}) {
    return (
        
        <div className="hero-slide">
            <div className={`hero-section ${reverse? 'reverse' : 'noreverse'} `}>
                <div className="hero-text">
                    <h2>{title}</h2>
                    <p>{text}</p>
                    <Link to={btnLink} className="hero-btn">{btnText}</Link>
                </div>
                <div className="hero-img">
                    <img src={image} alt={alt} />
                </div>
            </div>
            
        </div>
    )
}


export default Hero
