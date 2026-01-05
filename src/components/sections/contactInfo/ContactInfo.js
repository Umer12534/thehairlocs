import { faClock, faEnvelope, faMapMarked, faPhone } from '@fortawesome/free-solid-svg-icons';
import './ContactInfo.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactInfo = () => {
  return (
    <>
    {/* <!-- Contact Information --> */}
      <div class="contact-info">
        <h2>Contact Information</h2>
        <div class="info-item">
          <div class="info-icon">
            <FontAwesomeIcon icon={faMapMarked} className='icon'/>
          </div>
          <div class="info-text">
            <h3>Our Location</h3>
            <p>Gujrat, Punjab, Pakistan</p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">
            <FontAwesomeIcon icon={faPhone} className='icon'/>
          </div>
          <div class="info-text">
            <h3>Phone Number</h3>
            <p>0333-3333333</p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">
            <FontAwesomeIcon icon={faEnvelope} className='icon'/>
          </div>
          <div class="info-text">
            <h3>Email Address</h3>
            <p>hairlocs@gmail.com</p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">
            <FontAwesomeIcon icon={faClock} className='icone'/>
          </div>
          <div class="info-text">
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactInfo
