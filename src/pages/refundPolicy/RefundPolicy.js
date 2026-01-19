import React from 'react'
import './RefundPolicy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheckCircle, faEnvelope, faExchange, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
const RefundPolicy = () => {
  return (
    <>
    <div className="refund-container">
      <div className="refund-header">
        <h1>Refund Policy</h1>
        <p>
          Your satisfaction is our priority. Please read our refund guidelines
          carefully.
        </p>
      </div>

      <div className="refund-grid">
        <div className="refund-card">
          <div className="refund-card-icon">
            <FontAwesomeIcon icon={faCheckCircle}/>
          </div>
          <h3>Eligibility for Refunds</h3>
          <ul>
            <li>Items must be completely unused and in original packaging</li>
            <li>Refund request must be made within 7 days of delivery</li>
            <li>Product must be in resalable condition</li>
            <li>Original receipt or proof of purchase required</li>
          </ul>
        </div>

        <div className="refund-card">
          <div className="refund-card-icon">
            <FontAwesomeIcon icon={faBan}/>
          </div>
          <h3>Non-Refundable Items</h3>
          <ul>
            <li>Used or opened hair products</li>
            <li>Custom orders or personalized items</li>
            <li>Sale or clearance items (unless defective)</li>
            <li>Gift cards or digital products</li>
          </ul>
        </div>

        <div className="refund-card">
          <div className="refund-card-icon">
            <FontAwesomeIcon icon={faExchangeAlt}/>
          </div>
          <h3>Replacement Policy</h3>
          <p>
            If you received a defective, damaged, or incorrect product, we offer
            replacement after verification. Please contact us within 48 hours of
            delivery with photos/videos of the issue for faster resolution.
          </p>
        </div>
      </div>

      <div className="process-timeline">
        <h3 className="timeline-title">
          Refund Process Timeline
        </h3>

        <div className="timeline-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h4>Request Submission</h4>
            <p>
              Contact us at thehairlocs@gmail.com within 7 days of delivery with
              your order details and reason for refund request.
            </p>
          </div>
        </div>

        <div className="timeline-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h4>Verification</h4>
            <p>
              Our team will review your request and may ask for additional
              information or photos. This usually takes 1-2 business days.
            </p>
          </div>
        </div>

        <div className="timeline-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h4>Approval & Return Instructions</h4>
            <p>
              If approved, you'll receive return instructions and a return
              authorization number. Items must be returned within 7 days of
              approval.
            </p>
          </div>
        </div>

        <div className="timeline-step">
          <div className="step-number">4</div>
          <div className="step-content">
            <h4>Refund Processing</h4>
            <p>
              Once we receive and inspect the returned item, your refund will be
              processed within 5–7 business days via your original payment
              method or bank transfer.
            </p>
          </div>
        </div>
      </div>

      <div className="important-notice">
        <h3>Important Notice</h3>
        <ul>
          <li>
            Shipping costs are non-refundable unless the return is due to our
            error
          </li>
          <li>
            Refunds may take 1-2 billing cycles to appear on your statement
          </li>
          <li>
            We reserve the right to reject refund requests that don't meet our
            policy criteria
          </li>
          <li>
            For international returns, customer is responsible for return
            shipping costs
          </li>
        </ul>
      </div>

      <div className="contact-support-box">
        <h3>Need Help With a Refund?</h3>
        <p>
          Our customer support team is here to assist you with any questions or
          concerns about our refund policy.
        </p>

        <a href="mailto:thehairlocs@gmail.com" className="contact-email">
          <FontAwesomeIcon icon={faEnvelope}/> thehairlocs@gmail.com
        </a>

        <p class="contact-note">
          We typically respond within 24 hours during business days (Monday to
          Friday, 9 AM - 5 PM PST)
        </p>
      </div>
    </div>

    </>
    
  )
}

export default RefundPolicy
