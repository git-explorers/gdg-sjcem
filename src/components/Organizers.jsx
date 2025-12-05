import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import './Organizers.css';

const Organizers = () => {
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedOrganizer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedOrganizer]);

    const organizers = [
        {
            name: 'Dhiraj Chaudhari',
            role: 'GDGoC Organizer',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/dhiraj_chaudhari.jpeg',
            twitter: 'https://twitter.com/DhirajC39511965',
            bio: 'Passionate about building communities and empowering students through technology. Leading the GDG on Campus to create impactful learning experiences.',
            bioLink: '#'
        },
        {
            name: 'Aayush Bari',
            role: 'Co-Organizer',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/aayush_bari.jpg',
            twitter: 'https://twitter.com/aayush_bari02',
            bio: 'Tech enthusiast and community builder. Helping orchestrate events and ensuring smooth operations for the chapter.',
            bioLink: '#'
        },
        {
            name: 'Abhijeet Rogye',
            role: 'Design & Media Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/abhijeet_rogye_DhOJ3Wv.jpg',
            twitter: 'https://www.linkedin.com/in/abhijeetrogye/',
            bio: 'Creative mind behind the visuals. Expert in crafting engaging designs and managing the social media presence of the community.',
            bioLink: '#'
        },
        {
            name: 'Sumedh Patil',
            role: 'Technical Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sumedh_patil_CV1e5fD.png',
            twitter: 'https://twitter.com/sumedh1102',
            bio: 'Full-stack developer and technical mentor. Guiding the team on technical projects and workshops.',
            bioLink: '#'
        },
        {
            name: 'Sahas Bochare',
            role: 'Community Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sahas_bochare_EIH7Urf.jpg',
            twitter: null,
            bio: 'Dedicated to fostering a welcoming and inclusive environment for all community members. Connecting students with opportunities.',
            bioLink: '#'
        },
        {
            name: 'Rupesh Nandale',
            role: 'Events & Operations Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/rupesh_nandale_eQDyo0t.jpeg',
            twitter: null,
            bio: 'Ensuring every event runs seamlessly. Master of logistics and operational planning for the chapter.',
            bioLink: '#'
        },
    ];

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2);
    };

    return (
        <section id="organizers" className="section organizers-section theme-provider-namespace-people-card">
            <div className="container">
                <h1 className="section-title" style={{ color: '#202124' }} data-aos="fade-up">Organizers</h1>
                <ul className="organizers-grid">
                    {organizers.map((org, index) => (
                        <Tilt
                            key={index}
                            tiltMaxAngleX={5}
                            tiltMaxAngleY={5}
                            perspective={1000}
                            scale={1.02}
                            transitionSpeed={400}
                            className="organizer-tilt-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <li
                                className="people-card general-card"
                                data-testid="organizer-card"
                            >
                                <div
                                    className="organizer-avatar-bg"
                                    style={{
                                        backgroundImage: org.image ? `url(${org.image})` : 'none',
                                        backgroundColor: org.image ? 'transparent' : '#4285F4',
                                    }}
                                    role="img"
                                    aria-label={`${org.name} avatar`}
                                >
                                    {!org.image && <span className="initials">{getInitials(org.name)}</span>}
                                </div>

                                {org.twitter && (
                                    <div className="People-styles-socialContainer">
                                        <a aria-label={`View ${org.name} on X`} className="People-styles-socialIcon" href={org.twitter} rel="nofollow" target="_blank">
                                            <svg viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" role="img" alt="XIcon" aria-hidden="true" color="currentColor">
                                                <path d="M9.51664 6.79444L15.3449 0.0195312H13.9638L8.90311 5.90209L4.86115 0.0195312H0.199219L6.31146 8.915L0.199219 16.0195H1.58041L6.92464 9.80735L11.1933 16.0195H15.8552L9.5163 6.79444H9.51664ZM7.62491 8.99337L7.00561 8.10758L2.07808 1.05927H4.19951L8.17609 6.74748L8.79538 7.63327L13.9645 15.0271H11.843L7.62491 8.99371V8.99337Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                    </div>
                                )}

                                <div className="People-styles-info">
                                    <h2 className="organizer-name-premium" dir="auto">{org.name}</h2>
                                    <p className="organizer-role-premium" dir="auto">{org.role}</p>
                                </div>

                                <div className="organizer-actions">
                                    <button
                                        className="Button-styles__button Button-styles__outlined"
                                        aria-label={`See ${org.name}'s bio`}
                                        onClick={() => setSelectedOrganizer(org)}
                                    >
                                        See bio
                                    </button>
                                </div>
                            </li>
                        </Tilt>
                    ))}
                </ul>
            </div>

            {/* Premium Bio Modal */}
            {selectedOrganizer && (
                <div className="organizer-modal-overlay" onClick={() => setSelectedOrganizer(null)}>
                    <div className="organizer-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedOrganizer(null)} aria-label="Close modal">
                            &times;
                        </button>

                        <div className="modal-header">
                            <div
                                className="modal-avatar"
                                style={{
                                    backgroundImage: selectedOrganizer.image ? `url(${selectedOrganizer.image})` : 'none',
                                    backgroundColor: selectedOrganizer.image ? 'transparent' : '#4285F4',
                                }}
                            >
                                {!selectedOrganizer.image && <span className="initials">{getInitials(selectedOrganizer.name)}</span>}
                            </div>
                        </div>

                        <div className="modal-body">
                            <h2 className="modal-name">{selectedOrganizer.name}</h2>
                            <p className="modal-role">{selectedOrganizer.role}</p>
                            <p className="modal-bio">{selectedOrganizer.bio}</p>

                            {selectedOrganizer.twitter && (
                                <a href={selectedOrganizer.twitter} target="_blank" rel="noopener noreferrer" className="modal-social-link">
                                    Follow on X
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Organizers;
