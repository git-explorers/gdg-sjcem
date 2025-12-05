import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">About Us</h2>
                <div className="about-content">
                    <div className="about-text" data-aos="fade-up" data-aos-delay="200">
                        <p>
                            Google Developer Group (GDG) on Campus at St. John College of Engineering and Management (Autonomous), Palghar is a vibrant student community passionate about technology, learning, and innovation.
                        </p>
                        <p>
                            As part of the global GDG network, we create opportunities for students to explore Google technologies such as <strong>Cloud, Android, Web, AI/ML, and Firebase</strong>, while also building essential skills in problem-solving, leadership, and collaboration.
                        </p>
                        <p>
                            Through hands-on workshops, hackathons, technical talks, and peer-to-peer learning, we aim to bridge the gap between academic knowledge and real-world application empowering students to grow into future-ready developers, creators, and community leaders.
                        </p>
                    </div>
                    <div className="tech-stack">
                        <div className="tech-item cloud" data-aos="fade-up" data-aos-delay="300">Cloud</div>
                        <div className="tech-item android" data-aos="fade-up" data-aos-delay="350">Android</div>
                        <div className="tech-item web" data-aos="fade-up" data-aos-delay="400">Web</div>
                        <div className="tech-item ai" data-aos="fade-up" data-aos-delay="450">AI/ML</div>
                        <div className="tech-item firebase" data-aos="fade-up" data-aos-delay="500">Firebase</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
