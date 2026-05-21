import React from 'react';
import { Reveal } from './Reveal';

export const Transparency = () => {
  return (
    <div className="policy-page">
      <div className="floating-orb orb-1 orb-light"></div>
      <div className="floating-orb orb-2 orb-dark"></div>

      <div className="container">
        <Reveal>
          <div className="policy-header">
            <span className="section-badge">Pricing & Trust</span>
            <h1 className="section-title">Pricing & <span className="grad">Ownership</span></h1>
            <p className="policy-updated">Last Updated: May 21, 2026</p>
          </div>
        </Reveal>

        <div className="policy-content-grid">
          {/* Overview Section */}
          <Reveal delay={0.1}>
            <div className="policy-section glass-card">
              <h3>1. Pricing Philosophy</h3>
              <p>
                At <strong>LUNEX TECH</strong>, we believe in complete transparency. We want to ensure you know exactly what is included in your one-time development fee and what operational costs remain your direct responsibility as a website owner. This policy eliminates surprises and helps you plan your digital budget accurately.
              </p>
            </div>
          </Reveal>

          {/* One-Time Cost Section */}
          <Reveal delay={0.15}>
            <div className="policy-section glass-card">
              <h3>2. One-Time Cost (Paid to LUNEXTECH)</h3>
              <p>The upfront development costs shown on our service packages and proposals cover our design, coding, and setup efforts. This includes:</p>
              <ul>
                <li><strong>Website Design & UI/UX:</strong> Layout wireframing, styling, responsive optimization, and customized visual elements.</li>
                <li><strong>Website Development:</strong> Client-side coding, framework integrations, and clean codebase creation.</li>
                <li><strong>Deployment & Configuration:</strong> Initial setup of your site files and database structures.</li>
                <li><strong>Basic Testing:</strong> Compatibility checks across modern desktop and mobile browsers.</li>
                <li><strong>Initial Setup & Support:</strong> Final configuration support to push the site live on your chosen server.</li>
              </ul>
            </div>
          </Reveal>

          {/* Recurring Cost Section */}
          <Reveal delay={0.2}>
            <div className="policy-section glass-card">
              <h3>3. Annual / Recurring Costs (Paid by Client)</h3>
              <p>Recurring operational costs are not included in LUNEX TECH's development fees. These must be paid directly to third-party registrars, hostings, or service providers based on usage and rates:</p>
              <ul>
                <li><strong>Domain Renewal:</strong> Varies yearly depending on the registrar, domain extension (e.g., .IN / .COM), and optional protection features.</li>
                <li><strong>Hosting / Server:</strong> Varies based on website traffic, database storage requirements, and server plan specifications.</li>
                <li><strong>Backend Storage & Database:</strong> Cloud computing databases and assets storage charges are billed directly based on actual operational volume.</li>
                <li><strong>API Integration Charges (if used):</strong> Third-party integrations may carry separate subscription plans. Examples include:
                  <ul>
                    <li>Maps APIs (e.g., Google Maps API)</li>
                    <li>Email Delivery APIs (e.g., SendGrid, Resend)</li>
                    <li>AI / LLM API services</li>
                    <li>SMS & OTP Authentication APIs</li>
                    <li>Payment Gateways</li>
                    <li>Analytics & Tracking tools</li>
                  </ul>
                </li>
                <li><strong>E-Commerce Delivery & Logistics:</strong> Integrated shipping/delivery providers charge based on factors such as order count, weight, and distance.</li>
                <li><strong>Payment Gateway Transaction Fees:</strong> Standard fees charged per successful customer transaction by payment processors.</li>
                <li><strong>Maintenance & Feature Updates:</strong> Post-launch revisions or new feature requests are optional and billed separately.</li>
              </ul>
            </div>
          </Reveal>

          {/* Domain Renewal Policy */}
          <Reveal delay={0.25}>
            <div className="policy-section glass-card">
              <h3>4. Domain Renewal Policy</h3>
              <p>
                To secure your brand's digital identity, LUNEX TECH insists that clients maintain full ownership of their domains.
              </p>
              <ul>
                <li><strong>Initial Term:</strong> Domain registration is included only for the initial term (if specifically stated in your selected package).</li>
                <li><strong>Renewal Charges:</strong> All future domain renewal charges apply separately after the initial term expires.</li>
                <li><strong>Variable Pricing:</strong> Renewal pricing is set by registrars and varies based on extensions (.IN, .COM, etc.) and market rates.</li>
                <li><strong>Provider Rates:</strong> Renewals are billed at the current market/provider rate at the time of renewal.</li>
                <li><strong>No Development Cost Overlap:</strong> Website development costs do not include, cover, or subsidize future domain renewals.</li>
                <li><strong>Client Ownership:</strong> You retain complete ownership and renewal control over your domain name.</li>
              </ul>
              <p className="policy-updated" style={{ textAlign: 'left', marginTop: '10px' }}>
                * Example note: .IN and .COM renewal pricing may change annually based on registrar rates.
              </p>
            </div>
          </Reveal>

          {/* Client Responsibilities */}
          <Reveal delay={0.3}>
            <div className="policy-section glass-card">
              <h3>5. Client Responsibilities & Account Ownership</h3>
              <p>
                To protect your business long-term, we recommend setting up and managing your own billing accounts for third-party tools. You maintain direct control over:
              </p>
              <ul>
                <li>✓ Domain registrations and billing details</li>
                <li>✓ Web hosting and virtual server plans</li>
                <li>✓ Merchant delivery and courier accounts</li>
                <li>✓ Payment gateway integrations (e.g., Razorpay, Stripe)</li>
                <li>✓ Cloud databases and media storages</li>
                <li>✓ Premium third-party API subscriptions</li>
              </ul>
            </div>
          </Reveal>

          {/* Comparative Table */}
          <Reveal delay={0.35}>
            <div className="policy-section glass-card">
              <h3>6. Initial vs. Future Cost Matrix</h3>
              <p>
                The matrix below outlines the initial setup coverage versus your ongoing financial responsibilities:
              </p>
              <div className="transparency-table-wrap">
                <table className="transparency-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Included Initially</th>
                      <th>Future / Recurring Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Website Development</strong></td>
                      <td>✓ (Initial Build)</td>
                      <td>No (One-time cost)</td>
                    </tr>
                    <tr>
                      <td><strong>Domain Name</strong></td>
                      <td>Package Based (Year 1)</td>
                      <td>Annual Renewal Charges</td>
                    </tr>
                    <tr>
                      <td><strong>Hosting / Server</strong></td>
                      <td>Package Based (Initial Setup)</td>
                      <td>Annual/Monthly Renewal</td>
                    </tr>
                    <tr>
                      <td><strong>Delivery Integration</strong></td>
                      <td>Setup Only</td>
                      <td>Usage-based Charges (Per Order)</td>
                    </tr>
                    <tr>
                      <td><strong>API Services</strong></td>
                      <td>Setup Only</td>
                      <td>Usage-based Charges</td>
                    </tr>
                    <tr>
                      <td><strong>Backend Storage</strong></td>
                      <td>Setup Only</td>
                      <td>Usage-based Charges</td>
                    </tr>
                    <tr>
                      <td><strong>Payment Gateway</strong></td>
                      <td>Setup Only</td>
                      <td>Transaction Fees (Per Payment)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* Important Note */}
          <Reveal delay={0.4}>
            <div className="policy-section glass-card contact-box-style">
              <h3>7. Important Wording & Disclaimers</h3>
              <p>
                Prices listed on our proposals and plans cover the creation and initial setup of your website environment. Future recurring operational costs depend on third-party pricing, traffic growth, and actual service usage.
              </p>
              <p>
                This ensures our clients retain total ownership over their digital infrastructure without hidden platform markups.
              </p>
              <div className="transparency-footer-badge">
                Transparent Pricing • Client Ownership • No Hidden Charges
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
