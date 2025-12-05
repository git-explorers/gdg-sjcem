import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="shape shape-blue"></div>
                <div className="shape shape-red"></div>
                <div className="shape shape-yellow"></div>
                <div className="shape shape-green"></div>
            </div>
            <div className="container hero-content">
                <div className="hero-text">
                    <div
                        className="hero-badge"
                        data-aos="fade-down"
                        data-aos-delay="200"
                    >
                        Welcome to our community
                    </div>
                    <h1
                        className="hero-title"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Google Developer Group <br />
                        <span className="highlight">on Campus SJCEM</span>
                    </h1>
                    <p
                        className="hero-subtitle"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        St. John College of Engineering and Management (Autonomous) <br /> Palghar, India
                    </p>
                    <div
                        className="hero-stats"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <div className="stat-item">
                            <span className="stat-number">1045+</span>
                            <span className="stat-label">Community Members</span>
                        </div>
                    </div>
                    <div
                        className="hero-actions"
                        data-aos="zoom-in"
                        data-aos-delay="600"
                    >
                        <button className="btn btn-primary hero-btn">Join Chapter</button>
                        <button className="btn btn-outline hero-btn-outline">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
