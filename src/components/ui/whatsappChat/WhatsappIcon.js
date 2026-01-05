import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./WhatsappIcon.css";

function WhatsappIcon() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector("footer"); // Adjust if your footer has a different selector
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Hide icon when footer is visible
          setIsVisible(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Trigger when 10% of footer is visible
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <Link to={"/"} className='whatsapp-icon'>
      <FontAwesomeIcon icon={faWhatsapp} />
      <span className="whatsapp-tooltip">Chat with us</span>
    </Link>
  );
}

export default WhatsappIcon;
