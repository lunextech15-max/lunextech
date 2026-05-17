import React from 'react';
import { Reveal } from './Reveal';

export const TermsConditions = () => {
  return (
    <div className="policy-page">
      <div className="floating-orb orb-1 orb-light"></div>
      <div className="floating-orb orb-2 orb-dark"></div>

      <div className="container">
        <Reveal>
          <div className="policy-header">
            <span className="section-badge">Service Agreement</span>
            <h1 className="section-title">Terms & <span className="grad">Conditions</span></h1>
            <p className="policy-updated">Last Updated: May 17, 2026</p>
          </div>
        </Reveal>

        <div className="policy-content-grid">
          <Reveal delay={0.1}>
            <div className="policy-section glass-card">
              <h3>1. Agreement to Terms</h3>
              <p>
                These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and <strong>LUNEX TECH</strong> (registered MSME micro-enterprise UDYAM-TN-03-0324784, based in Coimbatore, Tamil Nadu, India). By engaging our digital design, development, layout optimization, and consulting services, you agree to comply with these terms in full.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="policy-section glass-card">
              <h3>2. Services Provided</h3>
              <p>
                LUNEX TECH specializes in Web Development, Landing Pages, UI/UX Design, Website Redesigns, and Custom Applications. The detailed scope, deliverables, and features of each project will be outlined in a specific project proposal or invoice. Any adjustments to the scope after kickoff will be subject to renegotiation or additional fees.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="policy-section glass-card">
              <h3>3. Payment Schedules</h3>
              <p>We work on a milestone or project-based fee model:</p>
              <ul>
                <li><strong>Advance Deposit:</strong> A standard advance payment (usually 50% or as stated on the invoice) is required before we schedule and begin any development.</li>
                <li><strong>Milestone Payments:</strong> Remaining milestones or the final balance must be cleared upon review and approval, prior to pushing the code live to production servers or transferring files.</li>
                <li><strong>Late Fees:</strong> Failure to clear invoices within 7 business days of delivery may result in temporary project suspension or website downtime.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="policy-section glass-card">
              <h3>4. Project Timelines & Execution</h3>
              <p>
                We strive for fast delivery and realistic completion schedules. Timelines are shared at project kickoff. However, execution times depend highly on the client providing required text copy, custom logos, graphics, assets, or feedback in a timely manner. LUNEX TECH is not liable for project delays caused by client inaction or delayed asset deliveries.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="policy-section glass-card">
              <h3>5. Intellectual Property (IP) Rights</h3>
              <p>Ownership of assets and codebase is structured as follows:</p>
              <ul>
                <li><strong>Client Ownership:</strong> Upon receiving full and final payment, complete intellectual property and source code ownership of the developed design, assets, and custom code are transferred to the client.</li>
                <li><strong>Developer Credit:</strong> LUNEX TECH retains the right to display design wireframes, prototypes, screenshots, and live links in our portfolios, services listings, and case studies for marketing purposes.</li>
                <li><strong>Pre-existing Code:</strong> Third-party libraries, framework dependencies (e.g., React, Vite, Framer Motion), and standard design modules remain governed under their respective open-source licenses.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="policy-section glass-card">
              <h3>6. Client Responsibilities</h3>
              <p>
                Clients agree to use all developed assets, structures, and websites in compliance with local laws. You represent that any content (logos, text, photos) provided to us does not violate third-party copyrights or intellectual property rights. LUNEX TECH is not responsible for validating the legality or copyright status of content supplied by clients.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="policy-section glass-card">
              <h3>7. Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by Indian Law, LUNEX TECH, its founders, or team members shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, our custom websites, servers, or databases. This includes domain configuration, hosting downtime, database exploits, or search engine ranking changes.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="policy-section glass-card contact-box-style">
              <h3>8. Governing Law & Contact</h3>
              <p>
                These terms are governed and construed in accordance with the laws of the State of Tamil Nadu, India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Coimbatore, Tamil Nadu.
              </p>
              <div className="policy-contact-details">
                <p><strong>LUNEX TECH</strong></p>
                <p>Email: <a href="mailto:lunextech15@gmail.com">lunextech15@gmail.com</a></p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
