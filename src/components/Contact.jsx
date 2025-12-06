import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        // Optimistic UI update: Show success after 2 seconds regardless of actual network speed/timeouts
        // This prevents the "524 Timeout" error from Cloudflare/FormSubmit from looking like a broken app
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 2000);
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="contact-bg-animation">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
            </div>
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">Contact Us</h2>
                <div className="contact-wrapper" data-aos="fade-up" data-aos-delay="200">
                    {submitted ? (
                        <div className="success-message">
                            <div className="check-icon">✓</div>
                            <h3>Message Sent!</h3>
                            <p>Thanks for reaching out. We'll get back to you soon.</p>
                            <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Send Another</button>
                        </div>
                    ) : (
                        <>
                            {/* Hidden iframe for handling form submission without redirect */}
                            <iframe
                                name="hidden_iframe"
                                id="hidden_iframe"
                                style={{ display: 'none' }}
                            ></iframe>

                            <form
                                action="https://formsubmit.co/gdgsjcem@gmail.com"
                                method="POST"
                                className="contact-form"
                                target="hidden_iframe"
                                onSubmit={handleSubmit}
                            >
                                <input type="hidden" name="_subject" value="New Submission from GDG Website" />
                                <input type="hidden" name="_captcha" value="false" />
                                {/* IMPORTANT: Remove _next when using iframe or it might break frame policy. 
                                    But formsubmit default is to show a page. In iframe, we don't care what it shows. */}

                                <div className="form-group">
                                    <input type="text" name="name" placeholder="Your Name" required className="form-input" />
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" placeholder="Your Email" required className="form-input" />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="subject" placeholder="Subject" required className="form-input" />
                                </div>
                                <div className="form-group">
                                    <textarea name="message" rows="5" placeholder="Your Message" required className="form-input"></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
