import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const PrivacyPolicy = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="privacy-policy-wrapper">
        <div className="privacy-policy-container">
          {/* Header */}
          <div className="privacy-header">
            <h1 className="privacy-title">Privacy Policy</h1>
            <div className="privacy-underline"></div>
            <p className="privacy-date">
              <strong>Effective Date:</strong> May 24, 2025
            </p>
          </div>

          {/* Content Card */}
          <div className="privacy-card">
            <div className="privacy-card-inner">
              {/* Introduction */}
              <div className="privacy-section">
                <p>
                  At <strong className="highlight">Mudralanka</strong>,
                  accessible from mudralanka.com, we are committed to protecting
                  your personal information and your right to privacy. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website or use
                  our services.
                </p>
              </div>

              {/* Repeat this structure for all sections */}
              <section className="privacy-section">
                <h2 className="privacy-section-title">
                  <span className="section-number">1</span>
                  Information We Collect
                </h2>
                <p>
                  We may collect personal information that you voluntarily
                  provide to us when you:
                </p>
                <ul>
                  <li>Place an order</li>
                  <li>Fill out a contact form</li>
                  <li>Sign up for our newsletter</li>
                  <li>
                    Interact with us through social media or messaging platforms
                    (e.g., WhatsApp)
                  </li>
                </ul>
                <p>This may include:</p>
                <ul>
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping address</li>
                  <li>
                    Payment details (processed securely through third-party
                    payment gateways)
                  </li>
                </ul>
                <p>
                  We may also collect non-personal information such as browser
                  type, IP address, and usage data via cookies and similar
                  technologies.
                </p>
              </section>

              {/* Repeat the same block format for other sections from 2 to 10 */}
              {/* ... */}

              {/* Contact Us */}
              <section className="privacy-section">
                <h2 className="privacy-section-title">
                  <span className="section-number">10</span>
                  Contact Us
                </h2>
                <p>
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:
                </p>
                <div className="privacy-contact-box">
                  <h3 className="contact-title">Mudralanka Print Shop</h3>
                  <div className="contact-info">
                    <p>
                      <strong>Email:</strong> mudralankashop@gmail.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +91 77993 72747
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="privacy-footer">
            <p>© 2025 Mudralanka Print Shop. All rights reserved.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
