import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons'


function Footer(){
    return (
    <>
    {/* <!-- footer --> */}
    <footer>
          <div className="footer-container">
      <div className="body-fit">
        <div className="footer-top">
          <div className="footer-card">
            <Link to={"/"} className='Link'>
                <img
                    src="/logo512.png"
                    alt="Logo"
                    className="footer-logo"
                />
            </Link>

          </div>
          <div className="footer-card">
            <ul>
                <li><h3>Pages</h3></li>
                <li>
                    <Link to={"/"} className='Link'>Home</Link>
                </li>
                <li>
                    <Link to={"/About"} className='Link'>About</Link>
                </li>
                <li>
                    <Link to={"/Contact"} className='Link'>Contact</Link>    
                </li>
                <li>
                    <Link to={"/Products"} className='Link'>Products</Link>
                </li>
                <li>
                    <Link to={"/Categories"} className='Link'>Categories</Link>
                </li>
            </ul>
          </div>
          <div className="footer-card">
            <ul>
                <li><h3>Help</h3></li>     
                <li>
                    <Link to={"/faqs"} className='Link'>F.A.Qs</Link>
                </li>
                <li>
                    <Link to={"/Privacy-Policy"} className='Link'>Privacy Policy</Link>
                </li>
                <li>
                    <Link to={"/Shipping-Policy"} className='Link'>Shipping Policy</Link>
                </li>
                <li>
                    <Link to={"/Refund-Policy"} className='Link'>Refund Policy</Link>
                </li>
            </ul>
          </div>
          <div className="footer-card">
            <ul>
              <li><h3>Contact US</h3></li>
              <li>Gujrat, punjab, pakistan</li>
              <li>
                <p>Phone:</p>
                0333-3333333
              </li>
              <li>
                <p>Email:</p>
                hairlocs@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="subscribe-section">
            <input type="text" placeholder="Email" />
            <Link to={"/"} className='subscribe-sectrion-btn Link'>
                <FontAwesomeIcon icon={faCheck} />
            </Link>
          </div>
          <div className="social-icons">
            <Link to={"/"} className='social-icons-btn Link'>
                <FontAwesomeIcon icon={faFacebookF} size='lg'/>
            </Link>
            <Link to={"/"} className='social-icons-btn Link'>
                <FontAwesomeIcon icon={faWhatsapp} size='lg'/>
            </Link>
            <Link to={"/"} className='social-icons-btn Link'>
                <FontAwesomeIcon icon={faInstagram} size='lg'/>
            </Link>
          </div>
        </div>
        <div className="footer-copyright">
          <span className='footerCopyright-text'>
            @Copyrights reserved - 2025, This website is developed by UMER
          </span>
        </div>
      </div>
    </div>
    </footer>
    </>
    )
}

export default Footer

