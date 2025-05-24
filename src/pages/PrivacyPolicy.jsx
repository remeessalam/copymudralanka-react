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

              {/* Section 1 */}
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

              {/* Section 2 */}
              <section className="privacy-section">
                <h2 className="privacy-section-title">
                  <span className="section-number">2</span>
                  How We Use Your Information
                </h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process and fulfill orders</li>
                  <li>Respond to customer service requests</li>
                  <li>Send promotional emails and newsletters</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraudulent transactions</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="privacy-section">
                <h2 className="privacy-section-title">
                  <span className="section-number">3</span>
                  Sharing Your Information
                </h2>
                <p>
                  We do not sell or rent your personal information to third
                  parties. We may share your information with:
                </p>
                <ul>
                  <li>
                    Service providers who assist in our business operations
                  </li>
                  <li>Legal authorities when required by law</li>
                  <li>Third parties with your consent</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="privacy-section">
                <h2 className="privacy-section-title">
                  <span className="section-number">4</span>
                  Cookies and Tracking Technologies
                </h2>
                <p>
                  We use cookies and similar technologies to enhance your
                  experience, gather general visitor information, and track
                  visits to our website. You can choose to disable cookies
                  through your browser settings.
                </p>
              </section>

              {/* Section 5 */}
              <section className="privacy-section">
                <h2 className="privacy-section-title">
                  <span className="section-number">5</span>
                  Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information. However, no
                  method of transmission over the Internet or method of
                  electronic storage is 100% secure.
                </p>
              </section>

              {/* Section 6 */}
              <section className="privacy-section">
                <h2 className="privacy-section-title">
                  <span className="section-number">6</span>
                  Your Data Protection Rights
                </h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul>
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section className="privacy-section">
                <h2 className="privacy-section-title">
                  <span className="section-number">7</span>
                  Third-Party Links
                </h2>
                <p>
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices of those sites. We
                  encourage you to read their privacy policies.
                </p>
              </section>

              {/* Section 8 */}
              <section className="privacy-section">
                <h2 className="privacy-section-title">
                  <span className="section-number">8</span>
                  Children's Privacy
                </h2>
                <p>
                  Our services are not intended for children under the age of
                  13. We do not knowingly collect personal information from
                  children without parental consent.
                </p>
              </section>

              {/* Section 9 */}
              <section className="privacy-section">
                <h2 className="privacy-section-title">
                  <span className="section-number">9</span>
                  Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with an updated revision
                  date.
                </p>
              </section>

              {/* Section 10 */}
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
