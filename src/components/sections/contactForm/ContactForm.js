import React, { useState } from 'react'
import './ContactForm.css'
const ContactForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("")

  const submitHandler=(e)=>{
    e.preventDefault()
    console.log(`form submited: ${name}, ${email}, ${subject}, ${message}`)
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
  }
  return (
    <>
    <div className="contact-form">
      <h2>Send Us a Message</h2>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input 
          type="text" 
          id="name" 
          value={name} 
          className="form-control" 
          placeholder="Your Name" 
          required 
          onChange={(e)=>{
            setName(e.target.value)
          }}

          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
          type="email" 
          id="email" 
          value={email} 
          className="form-control" 
          placeholder="your.email@example.com" 
          required 
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input 
          type="text" 
          id="subject" 
          value={subject} 
          className="form-control" 
          placeholder="What is this regarding?" 
          required 
          onChange={(e)=>{
            setSubject(e.target.value)
          }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea 
          id="message" 
          value={message} 
          className="form-control" 
          placeholder="Please share your questions..." 
          required 
          onChange={(e)=>{
            setMessage(e.target.value)
          }}
          />
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
    </>
  )
}

export default ContactForm
