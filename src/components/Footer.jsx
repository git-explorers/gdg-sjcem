import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-col" data-aos="fade-up" data-aos-delay="100">
                        <h3 className="footer-logo">GDG on Campus SJCEM</h3>
                        <p className="footer-desc">
                            St. John College of Engineering and Management (Autonomous), Palghar.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link">Instagram</a>
                            <a href="#" className="social-link">LinkedIn</a>
                            <a href="#" className="social-link">Twitter</a>
                        </div>
                    </div>

                    <div className="footer-col" data-aos="fade-up" data-aos-delay="200">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#about">About GDG</a></li>
                            <li><a href="#events">Upcoming Events</a></li>
                            <li><a href="#organizers">Organizers</a></li>
                            <li><a href="https://gdg.community.dev/" target="_blank" rel="noopener noreferrer">Chapters</a></li>
                        </ul>
                    </div>

                    <div className="footer-col" data-aos="fade-up" data-aos-delay="300">
                        <h4 className="footer-heading">Legal</h4>
                        <ul className="footer-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Participation Terms</a></li>
                            <li><a href="#">Organizer Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom" data-aos="fade-up" data-aos-delay="400">
                    <p>&copy; {new Date().getFullYear()} GDG on Campus SJCEM. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Community Guidelines</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
