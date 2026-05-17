import React from 'react';
import { Reveal } from './Reveal';

export const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="floating-orb orb-1 orb-light"></div>
      <div className="floating-orb orb-2 orb-dark"></div>

      <div className="container">
        <Reveal>
          <div className="policy-header">
            <span className="section-badge">Legal & Trust</span>
            <h1 className="section-title">Privacy <span className="grad">Policy</span></h1>
            <p className="policy-updated">Last Updated: May 17, 2026</p>
          </div>
        </Reveal>

        <div className="policy-content-grid">
          <Reveal delay={0.1}>
            <div className="policy-section glass-card">
              <h3>1. Overview & Scope</h3>
              <p>
                Welcome to <strong>LUNEX TECH</strong>. We are a registered MSME Micro Enterprise (UDYAM-TN-03-0324784) based in Coimbatore, Tamil Nadu, India. We are committed to safeguarding the privacy of our website visitors and clients. This policy explains how we collect, store, process, and protect your personal information when you use our web development and digital solutions services or interact with our website.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="policy-section glass-card">
              <h3>2. Information We Collect</h3>
              <p>We collect information necessary to provide high-quality digital solutions. This includes:</p>
              <ul>
                <li><strong>Contact Information:</strong> Name, business name, email address, phone number, and WhatsApp contact details when filled in our forms.</li>
                <li><strong>Project Details:</strong> Any functional specs, assets, or feedback shared for design and development.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, operating system, and browsing activity collected automatically via standard analytics tools.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="policy-section glass-card">
              <h3>3. How We Use Your Information</h3>
              <p>The information collected is used strictly for legitimate business activities, including:</p>
              <ul>
                <li>Responding to your inquiries and executing project contracts.</li>
                <li>Providing customized design, layout prototypes, and clean code solutions.</li>
                <li>Processing transactions securely through payment processors.</li>
                <li>Improving our website performance and user experience using anonymous telemetry.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="policy-section glass-card">
              <h3>4. Cookies & Web Analytics</h3>
              <p>
                We use cookies to improve your browsing experience, save preferences, and track aggregate, non-personal usage patterns. You can manage cookie preferences directly through your browser settings. Rest assured, we do not sell, trade, or share your cookie data with malicious third-party data brokers.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="policy-section glass-card">
              <h3>5. Data Security & Storage</h3>
              <p>
                LUNEX TECH employs modern encryption protocols and secure server integrations to protect your data. Since we develop custom applications and static websites, your sensitive database structures are protected under strong credential encryption policies. However, please note that no method of transmission over the internet is 100% secure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="policy-section glass-card">
              <h3>6. Third-Party Integrations</h3>
              <p>
                Our projects may contain links to third-party services, APIs, payment gateways (e.g., Razorpay, Stripe), and external tools (e.g., Visme Forms, WhatsApp integrations). We encourage you to read their respective privacy policies, as LUNEX TECH does not exert direct administrative control over third-party platforms.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="policy-section glass-card">
              <h3>7. Your Rights & Access</h3>
              <p>
                Under applicable Indian IT Laws, you have the right to request access to, correction of, or deletion of the personal data we hold about you. To execute any of these actions, please contact our support team.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="policy-section glass-card contact-box-style">
              <h3>8. Contact & Compliance</h3>
              <p>For any questions regarding this Privacy Policy or compliance requests, reach out to us at:</p>
              <div className="policy-contact-details">
                <p><strong>LUNEX TECH</strong></p>
                <p>Industry: Web Development & Digital Solutions</p>
                <p>UDYAM Reg: UDYAM-TN-03-0324784</p>
                <p>Location: Coimbatore, Tamil Nadu, India</p>
                <p>Email: <a href="mailto:lunextech15@gmail.com">lunextech15@gmail.com</a></p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
