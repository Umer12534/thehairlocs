import React from 'react'
import './ContactForm.css'
const ContactForm = () => {
  return (
    <>

    <div className="contact-form">
      <h2>Send Us a Message</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" className="form-control" placeholder="Your Name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" className="form-control" placeholder="your.email@example.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" className="form-control" placeholder="What is this regarding?" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" className="form-control" placeholder="Please share your questions..." required />
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
    </>
  )
}

export default ContactForm
