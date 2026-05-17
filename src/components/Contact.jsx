import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';
import { Magnetic } from './Magnetic';

const FormField = ({ type = 'text', name, label, delay = 0, isTextarea = false }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = React.useRef(null);
  const isActive = focused || value.length > 0;

  const Tag = isTextarea ? 'textarea' : 'input';

  // Detect browser autofill which doesn't trigger onChange
  React.useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    // Check for autofill on mount and after a short delay
    const checkAutofill = () => {
      if (el.value && el.value !== value) {
        setValue(el.value);
      }
    };

    // Webkit fires an animation on autofill
    const handleAnimation = (e) => {
      if (e.animationName === 'onAutoFillStart') {
        setValue(el.value || ' ');
      }
    };

    el.addEventListener('animationstart', handleAnimation);

    // Poll briefly to catch autofill
    const timers = [
      setTimeout(checkAutofill, 100),
      setTimeout(checkAutofill, 500),
      setTimeout(checkAutofill, 1000),
    ];

    return () => {
      el.removeEventListener('animationstart', handleAnimation);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.div
      className={`anim-field ${isActive ? 'active' : ''} ${focused ? 'focused' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tag
        ref={inputRef}
        type={type}
        name={name}
        id={name}
        placeholder=" "
        rows={isTextarea ? 4 : undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        autoComplete="off"
      />
      <label htmlFor={name}>
        <motion.span
          animate={{
            y: isActive ? -28 : 0,
            scale: isActive ? 0.8 : 1,
            color: focused ? '#FF5E3A' : isActive ? '#8B8B8B' : '#8B8B8B'
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {label}
        </motion.span>
      </label>
      <motion.div
        className="field-line"
        animate={{
          scaleX: focused ? 1 : 0,
          opacity: focused ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="field-bg" />
    </motion.div>
  );
};

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const formData = new FormData(e.target);
    const data = {
      access_key: 'c0087441-6a16-4ba7-a3f5-ece3ba1551c6',
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
      subject: `New Project Inquiry from ${formData.get('name')}`,
      from_name: 'LUNEX TECH Website'
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact">
      <div className="floating-orb orb-1 orb-dark"></div>
      <div className="container">
        <Reveal>
          <div className="section-badge">Get In Touch</div>
          <h2 className="section-title">Ready To <span className="grad">Start?</span></h2>
        </Reveal>
        <div className="contact-wrap">
          <Reveal delay={0.1}>
            <div className="contact-info">
              <p className="contact-sub">We're always excited to discuss new projects. Reach out to us through the form or directly via email or WhatsApp.</p>
              
              <Magnetic intensity={0.2}>
                <a href="https://wa.me/6381231706" target="_blank" rel="noopener noreferrer" className="ci-link glass-card magnetic" style={{ display: 'flex' }}>
                  <span className="ci-icon">💬</span>
                  <div>
                    <strong>WhatsApp Us</strong>
                    <span>Quickest response</span>
                  </div>
                </a>
              </Magnetic>
              
              <Magnetic intensity={0.2}>
                <a href="mailto:lunextech15@gmail.com" className="ci-link glass-card magnetic" style={{ display: 'flex' }}>
                  <span className="ci-icon">✉️</span>
                  <div>
                    <strong>Email Us</strong>
                    <span>lunextech15@gmail.com</span>
                  </div>
                </a>
              </Magnetic>
            </div>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="anim-form-card">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="anim-form-header">
                      <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        Start a project
                      </motion.h3>
                      <motion.div
                        className="form-header-line"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>

                    <div className="form-row">
                      <FormField name="name" label="Your Name" delay={0.1} />
                      <FormField name="phone" label="Phone Number" type="tel" delay={0.15} />
                    </div>
                    <FormField name="email" label="Email Address" type="email" delay={0.2} />
                    <FormField name="company" label="Company / Brand" delay={0.25} />
                    <FormField name="message" label="Tell us about your project..." isTextarea delay={0.3} />

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Magnetic>
                        <motion.button
                          type="submit"
                          className="anim-submit-btn"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          disabled={sending}
                        >
                          <AnimatePresence mode="wait">
                            {sending ? (
                              <motion.span
                                key="sending"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="btn-sending"
                              >
                                <span className="send-dot"></span>
                                <span className="send-dot"></span>
                                <span className="send-dot"></span>
                              </motion.span>
                            ) : (
                              <motion.span
                                key="text"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                Send Message →
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </Magnetic>
                      {error && (
                        <motion.p
                          className="form-error"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{ color: '#FF5E3A', fontSize: '0.85rem', marginTop: '12px', textAlign: 'center' }}
                        >
                          {error}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="anim-success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="success-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
                    >
                      ✓
                    </motion.div>
                    <h3>Message Sent!</h3>
                    <p>We'll get back to you within 24 hours.</p>
                    <motion.button
                      className="anim-reset-btn"
                      onClick={() => setSubmitted(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Another
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
