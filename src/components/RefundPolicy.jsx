import React from 'react';
import { Reveal } from './Reveal';

export const RefundPolicy = () => {
  return (
    <div className="policy-page">
      <div className="floating-orb orb-1 orb-light"></div>
      <div className="floating-orb orb-2 orb-dark"></div>

      <div className="container">
        <Reveal>
          <div className="policy-header">
            <span className="section-badge">Financial Policies</span>
            <h1 className="section-title">Refund & <span className="grad">Cancellation</span></h1>
            <p className="policy-updated">Last Updated: May 17, 2026</p>
          </div>
        </Reveal>

        <div className="policy-content-grid">
          <Reveal delay={0.1}>
            <div className="policy-section glass-card">
              <h3>1. Digital Services & Limitations</h3>
              <p>
                At <strong>LUNEX TECH</strong>, we build bespoke digital assets, websites, wireframes, and applications tailored to the precise needs of your business. Because our web development, landing pages, and UI/UX solutions are custom-crafted, resource-intensive digital services, we have a clear, startup-friendly refund and cancellation policy outlined below.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="policy-section glass-card">
              <h3>2. Deposit & Kickoff Commitments</h3>
              <p>
                All projects require an upfront advance deposit (as specified on the project invoice) to reserve development slots, establish server sandboxes, and schedule designers. 
              </p>
              <ul>
                <li><strong>Advance deposits are non-refundable once design or development work has officially kicked off.</strong></li>
                <li>If a project is cancelled by the client *prior* to LUNEX TECH allocating developer hours or initiating design wireframes, a full refund of the deposit (minus any transaction fees) may be processed upon request.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="policy-section glass-card">
              <h3>3. Project Cancellation During Development</h3>
              <p>
                If the client chooses to cancel a project while it is actively in progress, the following terms apply:
              </p>
              <ul>
                <li><strong>Completed Milestones:</strong> All payments made for completed milestones (e.g., UI/UX mockup approvals, static landing page layouts) are non-refundable.</li>
                <li><strong>Partial Billing:</strong> We will evaluate the total hours allocated up to the cancellation date. The client will be billed proportionally for any incomplete milestone work, and any remaining balance from the deposit will be returned.</li>
                <li><strong>Code & Assets:</strong> In the event of mid-project cancellation, no source code, functional repositories, or design Figma files will be transferred to the client unless fully paid for.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="policy-section glass-card">
              <h3>4. Non-Refundable Situations</h3>
              <p>Refunds are not applicable under the following conditions:</p>
              <ul>
                <li><strong>Delayed Client Actions:</strong> If a project is delayed or stalled for more than 30 consecutive days due to the client's failure to provide feedback, media assets, text content, or domain access, the project is considered suspended and no refunds can be claimed.</li>
                <li><strong>Live Release:</strong> Once the custom code has been deployed to the client's hosting servers, pushed to their live repository, or transferred as final files, the project is officially closed, and no refunds will be granted.</li>
                <li><strong>Third-Party Costs:</strong> Any external expenditures made for third-party hosting, domains, font licensing, premium APIs, or subscription widgets are non-refundable under all circumstances.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="policy-section glass-card">
              <h3>5. Refund Eligibility & Request Process</h3>
              <p>
                To file an official refund request or cancellation, you must send an email to <a href="mailto:lunextech15@gmail.com">lunextech15@gmail.com</a>. Please include your business details, the UDYAM registration verification link if applicable, invoice number, and clear reasons for cancellation.
              </p>
              <p>
                If a refund is approved by our management, it will be processed and credited to the original bank account/payment source within 7-10 business days of approval.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="policy-section glass-card contact-box-style">
              <h3>6. Governing Authority & Support</h3>
              <p>
                Any transactional disputes under this policy shall fall within the jurisdiction of the courts of Coimbatore, Tamil Nadu, India.
              </p>
              <div className="policy-contact-details">
                <p><strong>LUNEX TECH</strong></p>
                <p>Industry: Web Development & Digital Solutions</p>
                <p>UDYAM Reg: UDYAM-TN-03-0324784</p>
                <p>Email: <a href="mailto:lunextech15@gmail.com">lunextech15@gmail.com</a></p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
