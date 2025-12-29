// import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./WhatsappIcon.css"


function WhatsappIcon(){
  // const [isVisible, setIsvisible] = useState(true)

  return (
    <div>
      <click/>
       {/* <!-- whatsapp icone --> */}
        <Link to={"/"} className='whatsapp-icon'>
        <FontAwesomeIcon icon={faWhatsapp} />
        <span class="whatsapp-tooltip">chat with us</span>
        </Link>
    </div>
  )
}

export default WhatsappIcon
