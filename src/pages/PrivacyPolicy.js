import React from 'react';
import {Helmet} from 'react-helmet'
import '../styles/PrivacyPolicy.css'; // We'll create this CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import {
  faCogs,
  faShareAlt,
  faShieldAlt,
  faCookieBite,
  faUserShield,
  faEnvelope,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";


const PrivacyPolicy = () => {
  return (
    <>
    <Helmet>
      <title>Privacy Policy | My Hair Locs</title>
      <meta 
        name='description' 
        content='Read the My Hair Locs privacy policy and learn how your information is handled.' 
      />
      <meta
        name='keywords'
        content='privacy policy, data privacy, customer privacy, My Hair Locs policy'
      />
    </Helmet>
    <div className="privacy-container">
      <div className="privacy-header">
        <h1>Privacy Policy</h1>
        <p>
          Welcome to The Hair Locs. Your privacy is extremely important to us.
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you visit our website or make a purchase.
        </p>
        <div className="last-updated">
          <i className="fas fa-calendar-alt"></i> Last Updated: March 2025
        </div>
      </div>

      <div className="privacy-grid">
        <div className="privacy-card">
          <div className="privacy-card-icon">
            <FontAwesomeIcon icon={faInfoCircle} className='icon'/>
          </div>
          <h3>Information We Collect</h3>
          <ul>
            <li>Name and contact information (email, phone number)</li>
            <li>Shipping and billing addresses</li>
            <li>
              Payment details (processed securely through our payment gateway)
            </li>
            <li>Order history and purchase preferences</li>
            <li>Device and browser information for analytics</li>
          </ul>
        </div>

        <div className="privacy-card">
          <div className="privacy-card-icon">
            <FontAwesomeIcon icon={faCogs} />

          </div>
          <h3>How We Use Your Information</h3>
          <ul>
            <li>To process and deliver your orders</li>
            <li>To communicate about your purchases and account</li>
            <li>To improve our website and shopping experience</li>
            <li>To send marketing communications (only with your consent)</li>
            <li>To prevent fraud and ensure security</li>
          </ul>
        </div>

        <div className="privacy-card">
          <div className="privacy-card-icon">
            <FontAwesomeIcon icon={faShareAlt} />
          </div>
          <h3>Information Sharing</h3>
          <p>
            We do not sell or rent your personal information to third parties.
            We only share information with:
          </p>
          <ul>
            <li>Shipping carriers for delivery purposes</li>
            <li>Payment processors to complete transactions</li>
            <li>Service providers who assist our operations</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </div>
      </div>

      <div className="data-protection">
        <div className="data-protection-header">
          <FontAwesomeIcon icon={faShieldAlt} />
          <h3>Security of Your Data</h3>
        </div>
        <p>
          We implement industry-standard security measures to protect your
          personal information:
        </p>

        <div className="data-protection-grid">
          <div className="protection-item">
            <h4>Secure Servers</h4>
            <p>
              All data is stored on encrypted, secure servers with restricted
              access.
            </p>
          </div>
          <div className="protection-item">
            <h4>Encrypted Payments</h4>
            <p>
              Payment information is processed through SSL-encrypted gateways.
            </p>
          </div>
          <div className="protection-item">
            <h4>Regular Audits</h4>
            <p>Our security measures are regularly reviewed and updated.</p>
          </div>
        </div>
      </div>

      <div className="cookies-section">
        <h3>
          <FontAwesomeIcon icon={faCookieBite} /> Cookies & Tracking
        </h3>
        <p>
          We use cookies and similar tracking technologies to enhance your
          browsing experience, analyze website traffic, and understand where our
          visitors come from.
        </p>

        <div className="cookie-types">
          <span className="cookie-tag">Essential Cookies</span>
          <span className="cookie-tag">Performance Cookies</span>
          <span className="cookie-tag">Functionality Cookies</span>
          <span className="cookie-tag">Marketing Cookies</span>
        </div>

        <p style={{ marginTop: '20px' }}>
          You can control cookies through your browser settings. However,
          disabling certain cookies may affect website functionality.
        </p>
      </div>

      <div className="privacy-rights">
        <h3>
          <FontAwesomeIcon icon={faUserShield} /> Your Privacy Rights
        </h3>
        <p>You have the right to:</p>

        <div className="rights-list">
          <div className="right-item">
            <h4>Access Your Data</h4>
            <p>Request a copy of the personal information we hold about you.</p>
          </div>
          <div className="right-item">
            <h4>Correct Information</h4>
            <p>Update or correct any inaccurate personal information.</p>
          </div>
          <div className="right-item">
            <h4>Delete Data</h4>
            <p>
              Request deletion of your personal information under certain
              conditions.
            </p>
          </div>
          <div className="right-item">
            <h4>Opt-Out</h4>
            <p>Unsubscribe from marketing communications at any time.</p>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h3>Questions About Our Privacy Policy?</h3>
        <p>
          If you have any questions, concerns, or would like to exercise your
          privacy rights, please don't hesitate to contact our privacy team.
        </p>

        <NavLink to="/contact" className="contact-email">
          <FontAwesomeIcon icon={faEnvelope} /> Contact Our Privacy Team
        </NavLink>

        <p style={{ marginTop: '25px', color: '#777', fontSize: '0.95rem' }}>
          <i className="fas fa-clock"></i> We typically respond within 48 hours
          during business days.
        </p>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;
