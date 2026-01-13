import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./WhatsappIcon.css";

function WhatsappIcon() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector("footer"); 
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Hide icon when footer is visible
          setIsVisible(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Link className={`whatsapp-icon ${isVisible ? 'show' : ''}`} to={"/"}>
      <FontAwesomeIcon icon={faWhatsapp} />
      <span className="whatsapp-tooltip">Chat with us</span>
    </Link>
  );
}

export default WhatsappIcon;
