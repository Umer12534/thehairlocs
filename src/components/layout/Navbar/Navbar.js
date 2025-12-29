import { useState } from 'react'
import './Navbar.css'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faMagnifyingGlass, faBagShopping, faBars, faXmark, faHouse, faTags, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import CartSiderbar from '../CartSidebar/CartSidebar'


const sale = ("We are running a sale - Get 20% off on all products!")
const SaleBaner = () => {
    return (
        <>
        {/* <!-- sale banner --> */}
        <div class="sale-banner">
            <p>{sale}</p>
        </div>
        </>
    ) 
}

export default function Navbar(){

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [navOpen, setnavOpen] = useState(false)
    
    function Togglenav(){
        setnavOpen(!navOpen);
    }
    return (
        <>
            <div className="StickyTop">
                <SaleBaner />
                 {/* <!-- navegation bar --> */}
                <nav>
                    <div className="nav-container">
                        {/* <!-- Hamburger Toggle --> */}
                        <div className="nav-toggle">
                            <FontAwesomeIcon icon={faBars} onClick={Togglenav} className='Nav-Toggle-Btn'/>
                        </div>
                        {/* <!-- Left Tabs --> */}
                        <ul className={`nav-tabs ${navOpen? "active" : ""}`}>
                            <li className="nav-close" onClick={Togglenav}>
                                <FontAwesomeIcon icon={faXmark} />
                            </li>
                            <li>
                                <NavLink to={"/"} className={({isActive}) => isActive? "NavLink Active": "NavLink"}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/product"} className={({isActive}) => isActive? "NavLink Active": "NavLink"}>Product</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/Categories"} className={({isActive}) => isActive? "NavLink Active": "NavLink"}>Categories</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/Sale"} className={({isActive}) => isActive? "NavLink Active": "NavLink"}>Sale</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/Contact"} className={({isActive}) => isActive? "NavLink Active": "NavLink"}>Contact</NavLink>
                            </li>
                        </ul>

                        {/* <!-- Logo --> */}
                        <div className="logo-container">
                            <Link to="/" className='NavLink'>
                                <img src="logo192.png" alt="logo" className="logo" />
                            </Link>
                        </div>

                        {/* <!-- Right Icons --> */}
                        <div className="nav-icons">
                            <Link to = "/" className='NavLink'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Link>
                            <Link to = "/" className='NavLink'>
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                            <Link className='cart-link NavLink' >
                                <FontAwesomeIcon icon={faBagShopping} onClick={() => {
                                    setIsCartOpen(true)
                                }}/>
                                <span className="cart-count"></span>
                            </Link>    
                        </div>
                    </div>
                </nav>
            </div>
            
            {/* <!-- Bottom Mobile Navigation --> */}
            <div class="mobile-bottom-nav">

                <Link to="/" className="nav-item">
                    <FontAwesomeIcon icon={faHouse} className='iCon'/>
                    <span>Home</span>
                </Link>

                <Link to="/sale" className="nav-item">
                    <FontAwesomeIcon icon={faTags} className='iCon' />
                    <span>Sale</span>
                </Link>

                <Link to={"/"} className='nav-item'>
                    <FontAwesomeIcon icon={faWhatsapp} className='iCon whatsapp' />
                    <span>Chat</span>
                </Link>

                <button className="nav-item cart-btn" >
                    <FontAwesomeIcon icon={faCartShopping} className='iCon' onClick={() => { setIsCartOpen(true) }}/>
                    <span>Cart</span>
                </button>
            </div>
            <CartSiderbar 
            isCartOpen={isCartOpen}
            closeCart={()=> setIsCartOpen(false)}
            />
        </>
    );
}