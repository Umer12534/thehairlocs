import React from 'react'
import './HeroSection.css'
import { Link } from 'react-router-dom'
import Button from '../../ui/button/Button'

function HeroSection({title, text, subscribe= false, btnText, btnLink, image, alt, reverse = false, bgimage}) {
    return (
        
        <div className="hero-slide" style={{ backgroundImage: `url(${bgimage})` }}>
            <div className={`hero-section ${reverse? 'reverse' : 'noreverse'} `}>
                <div className="hero-text">
                    <h2>{title}</h2>
                    <p>{text}</p>
                    {!subscribe && <Link to={btnLink} className="hero-btn">{btnText}</Link>}
                    {subscribe && (
                        <form class="newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                required/>
                            <button type="submit">Subscribe</button>
                        </form>
                    )}
                </div>
                <div className="hero-img">
                    <img src={image} alt={alt} />
                </div>
            </div>
            
        </div>
    )
}


export default HeroSection
