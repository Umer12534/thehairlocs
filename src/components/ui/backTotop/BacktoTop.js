import { useEffect, useState } from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './BacktoTop.css';

function BacktoTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  const toggleIsVisible = () => {
    if (window.pageYOffset > 300) setIsVisible(true);
    else setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleIsVisible);

    const footer = document.querySelector('footer');
    if (footer) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => setFooterVisible(entry.isIntersecting));
        },
        { threshold: 0.1 }
      );
      observer.observe(footer);
      return () => observer.disconnect();
    }

    return () => window.removeEventListener('scroll', toggleIsVisible);
  }, []);

  return (
    <button
      className={`to-top-icon ${isVisible ? 'show' : ''} ${footerVisible ? 'footer-visible' : ''}`}
      onClick={scrollToTop}
    >
      <FontAwesomeIcon icon={faAngleUp} className="top-icon" />
    </button>
  );
}

export default BacktoTop;
