import React from 'react';
import './Organizers.css';

const Organizers = () => {
    const organizers = [
        {
            name: 'Dhiraj Chaudhari',
            role: 'GDGoC Organizer',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/dhiraj_chaudhari.jpeg',
            twitter: 'https://twitter.com/DhirajC39511965',
            bioLink: '#'
        },
        {
            name: 'Aayush Bari',
            role: 'Co-Organizer',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/aayush_bari.jpg',
            twitter: 'https://twitter.com/aayush_bari02',
            bioLink: '#'
        },
        {
            name: 'Abhijeet Rogye',
            role: 'Design & Media Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/abhijeet_rogye_DhOJ3Wv.jpg',
            twitter: null,
            bioLink: '#'
        },
        {
            name: 'Sumedh Patil',
            role: 'Technical Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sumedh_patil_CV1e5fD.png',
            twitter: 'https://twitter.com/sumedh1102',
            bioLink: '#'
        },
        {
            name: 'Sahas Bochare',
            role: 'Community Head',
            image: null, // Placeholder if no image provided in snippet
            twitter: null,
            bioLink: '#'
        },
        {
            name: 'Rupesh Nandale',
            role: 'Events & Operations Head',
            image: null, // Placeholder
            twitter: null,
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
                        <li
                            key={index}
                            className="people-card general-card"
                            data-testid="organizer-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div
                                className="organizer-avatar-bg"
                                style={{
                                    backgroundImage: org.image ? `url(${org.image})` : 'none',
                                    backgroundColor: org.image ? 'transparent' : '#4285F4', // Fallback color
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

                            <div>
                                <a className="Button-styles__button Button-styles__outlined" aria-label={`See ${org.name}'s bio`} href={org.bioLink} rel="noopener">
                                    See bio
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Organizers;
