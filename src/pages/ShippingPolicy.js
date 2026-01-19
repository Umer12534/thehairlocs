import { faCalculator, faClock, faExclamationTriangle, faMapMarker, faShippingFast } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '../styles/ShippingPolicy.css'
const ShippingPolicy = () => {
  return (
    <>
    <div className="policy-container">
      <div className="policy-header">
        <h1>Shipping Policy</h1>
        <p>
          Thank you for shopping at The Hair Locs! Below you'll find detailed
          information about our shipping processes, delivery times, and
          important details to ensure a smooth experience.
        </p>
      </div>

      <div className="policy-content">
        <div className="policy-section">
          <h2>
            <FontAwesomeIcon icon={faClock} /> Processing Time</h2>
          <p>
            All orders are processed within
            <strong>1-2 business days</strong> after payment confirmation.
            Orders are not processed or shipped on weekends or holidays.
          </p>
          <p>
            If we are experiencing a high volume of orders, processing times may
            be longer than usual. In such cases, we will notify you via email.
          </p>
        </div>

        <div className="policy-section">
          <h2>
            <FontAwesomeIcon icon={faShippingFast}/> Delivery Time</h2>
          <p>
            Once your order is processed and shipped, you can expect delivery
            within the following timeframes:
          </p>

          <div className="delivery-time-container">
            <div className="delivery-card">
              <h3>Standard Delivery</h3>
              <p>Within Pakistan</p>
              <span className="time">3–7 Days</span>
              <p>Working days</p>
            </div>

            <div className="delivery-card">
              <h3>International</h3>
              <p>Worldwide Shipping</p>
              <span className="time">10-20 Days</span>
              <p>Working days</p>
            </div>
          </div>

          <p className="mt-3">
            <em
              >Please note: Delivery times are estimates and may vary due to
              factors beyond our control such as customs clearance, weather
              conditions, or carrier delays.</em
            >
          </p>
        </div>

        <div className="policy-section">
          <h2>
            <FontAwesomeIcon icon={faCalculator} /> Shipping Charges</h2>
          <p>
            Shipping charges are calculated at checkout based on the following
            factors:
          </p>
          <ul className="policy-list">
            <li>Delivery location and destination</li>
            <li>Total weight of your order</li>
            <li>Selected shipping method</li>
            <li>Any ongoing promotions or free shipping offers</li>
          </ul>
          <p>
            We occasionally offer free shipping promotions which will be clearly
            advertised on our website and social media channels.
          </p>
        </div>

        <div className="policy-section">
          <h2>
            <FontAwesomeIcon icon={faMapMarker}/> Order Tracking</h2>
          <p>
            Once your order is shipped, you will receive a tracking number via
            SMS or Email (depending on the contact information provided).
          </p>
          <p>
            You can use this tracking number to monitor your package's journey
            on our carrier's website. If you haven't received tracking
            information within 3 business days of your order confirmation,
            please contact our customer service team.
          </p>
        </div>

        <div className="important-note">
          <h3>
            <FontAwesomeIcon icon={faExclamationTriangle}/> Important Address Information
          </h3>
          <p>
            <strong>Incorrect Shipping Address:</strong> The Hair Locs is not
            responsible for delays or losses due to wrong address entries.
            Please double-check your shipping address before completing your
            purchase.
          </p>
          <p>
            If you realize you've entered an incorrect address after placing
            your order, please contact us immediately at
            <strong>hairlocs@gmail.com</strong> with your order number and
            correct address. We can only modify the shipping address if the
            order hasn't been processed for shipping yet.
          </p>
        </div>
      </div>

      <div className="contact-support">
        <h3>Need Help With Shipping?</h3>
        <p>
          If you have any questions about our shipping policy or need assistance
          with an existing order, our customer service team is here to help!
        </p>
        <a href="./Contact.html" class="contact-btn"
          >Contact Our Support Team</a
        >
      </div>
    </div>
    </>
  )
}

export default ShippingPolicy
