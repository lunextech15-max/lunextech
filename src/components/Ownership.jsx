import React from 'react';
import { Reveal } from './Reveal';

export const Ownership = () => {
  return (
    <section id="ownership">
      <div className="floating-orb orb-1 orb-light"></div>
      <div className="floating-orb orb-2 orb-dark" style={{ opacity: 0.15 }}></div>
      <div className="container">
        <Reveal>
          <div className="section-header-wrap" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-badge">Ownership & Costs</div>
            <h2 className="section-title">100% Client Ownership.<br /><span className="grad">Zero Hidden Fees.</span></h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              We design and build your website, but you retain complete control over your assets. 
              Here is a clear breakdown of ownership and recurring third-party costs.
            </p>
          </div>
        </Reveal>

        <div className="ownership-grid">
          <Reveal delay={0.1}>
            <div className="ownership-card glass-card">
              <div className="ownership-card-glow"></div>
              <h3>✓ Client-Owned Assets</h3>
              <p className="card-desc">To protect your brand long-term, we configure all core accounts in your name. You maintain direct control and billing ownership of:</p>
              <ul className="ownership-list">
                <li><span>Domain name registrations</span></li>
                <li><span>Cloud hosting & web servers</span></li>
                <li><span>Payment gateways (Razorpay, Stripe)</span></li>
                <li><span>Courier & logistics delivery portals</span></li>
                <li><span>Cloud databases & media storage accounts</span></li>
                <li><span>Third-party API accounts (Email, Maps, OTPs)</span></li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="ownership-card glass-card">
              <div className="ownership-card-glow"></div>
              <h3>✓ Renewal & API Policies</h3>
              <p className="card-desc">Operating a web platform involves third-party services. These charges are billed at cost directly from the providers:</p>
              <ul className="ownership-list">
                <li>
                  <strong>Domain Renewal:</strong> Included for Year 1 (if package supported). Future renewals are billed separately at current registrar market rates (.IN, .COM, etc.).
                </li>
                <li>
                  <strong>Server Hosting:</strong> Setup is included. Server plans vary based on actual traffic volume, database storage, and platform scale.
                </li>
                <li>
                  <strong>API Usage Fees:</strong> Google Maps, SMS/OTP, AI, or transactional Email services carry usage-based third-party subscription rates.
                </li>
                <li>
                  <strong>Transaction charges:</strong> Standard percentage fees applied per transaction by your payment gateway processor.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Highlight trust details & link to full matrix */}
        <Reveal delay={0.3}>
          <div className="ownership-bottom-box dark-card">
            <div className="bottom-badges-row">
              <span className="badge-item">✓ Transparent Renewal Rates</span>
              <span className="badge-item">✓ Direct Billing Accounts</span>
              <span className="badge-item">✓ Complete Source Code Rights</span>
            </div>
            <div className="bottom-callout-action">
              <p>
                Interested in viewing the full initial vs. future cost matrix? Read our detailed policy.
              </p>
              <a href="/transparency" className="btn-outline light">
                View Full Cost Matrix <span className="arrow" style={{ marginLeft: '6px' }}>→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
