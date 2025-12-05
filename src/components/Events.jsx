import React from 'react';
import Tilt from 'react-parallax-tilt';
import EventModal from './EventModal';
import './Events.css';
import CountdownTimer from './CountdownTimer';

const Events = () => {
    const upcomingEvents = [
        {
            id: 1,
            date: '13 Dec 2025',
            type: 'Info session',
            title: 'TechSprint Hackathon 2025 – Kick-Off Session | GDG on Campus SJCEM',
            description: 'Welcome to the official Kick-Off Session of TechSprint 2025! Hosted by GDG on Campus – St. John College of Engineering &...',
            image: 'https://i.ibb.co/bjc6f31T/Generated-Image-December-04-2025-8-46-PM.jpg',
            showTimer: true,
            buttons: [
                {
                    text: 'Register Team',
                    link: 'https://hack2skill.com/',
                    style: 'primary'
                },
                {
                    text: 'Info Session',
                    link: 'https://gdg.community.dev/gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india/',
                    style: 'outline'
                }
            ]
        }
    ];

    const pastEvents = [
        {
            id: 1,
            date: '2 Oct 2025',
            type: 'Info session',
            title: 'Google Cloud Study Jams – Online Info Session',
            location: 'GDG on Campus St. John College of Engineering and Management Autonomous - Palghar, India',
            materialsLink: 'https://docs.google.com/presentation/d/1goUL1QPjTLqMbLyKFuzTORWKXmkiCJ7K_gBM2UG61z0/edit?usp=sharing',
            registrations: 152,
            image: 'https://i.ibb.co/Ng0NCJvj/blob-Pca-Hqc5.webp'
        },
        {
            id: 2,
            date: '24 Sept 2025',
            type: 'Info session',
            title: 'Info Session: GDG on Campus – SJCEM | Kick-off 2025',
            location: 'GDG on Campus St. John College of Engineering and Management Autonomous - Palghar, India',
            materialsLink: 'https://docs.google.com/presentation/d/1HUS16B9qQuLxBBUgkEHog2-ROPqccoG7b_ZpW4jS-y4/edit?usp=sharing',
            registrations: 200,
            image: 'https://i.ibb.co/nMk7f1mG/blob-Iq7f-MFD.webp'
        }
    ];

    const [selectedEvent, setSelectedEvent] = React.useState(null);

    return (
        <section id="events" className="section events-section">
            <div className="container">
                <h2 className="section-title" data-aos="fade-down" data-aos-duration="1000">Upcoming Events</h2>
                <div className="events-grid upcoming">
                    {upcomingEvents.map((event, index) => {
                        return (
                            <Tilt
                                key={event.id}
                                tiltMaxAngleX={10}
                                tiltMaxAngleY={10}
                                scale={1.02}
                                transitionSpeed={1500}
                                className="tilt-card-wrapper"
                            >
                                <div
                                    className="event-card upcoming-card"
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 150}
                                    data-aos-duration="1200"
                                >
                                    <div className="event-image">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            loading="lazy"
                                            decoding="async"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                                        />
                                        <div className="event-date-badge">
                                            <span className="day">{event.date.split(' ')[0]}</span>
                                            <span className="month">{event.date.split(' ')[1]}</span>
                                        </div>
                                    </div>
                                    <div className="event-content">
                                        <span className="event-type">{event.type}</span>
                                        <h3 className="event-title">{event.title}</h3>
                                        {event.showTimer && <CountdownTimer targetDate="Dec 13, 2025 10:00:00" />}
                                        <p className="event-desc">{event.description}</p>

                                        <div className="event-buttons">
                                            {event.buttons ? (
                                                event.buttons.map((btn, i) => (
                                                    <a
                                                        key={i}
                                                        href={btn.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`btn ${btn.style === 'primary' ? 'btn-primary' : 'btn-outline'} view-details-btn`}
                                                        style={{ textAlign: 'center', textDecoration: 'none' }}
                                                    >
                                                        {btn.text}
                                                    </a>
                                                ))
                                            ) : (
                                                <button
                                                    className="btn btn-outline view-details-btn"
                                                    onClick={() => setSelectedEvent(event)}
                                                >
                                                    View details →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Tilt>
                        );
                    })}
                </div>

                <h2 className="section-title past-title" data-aos="fade-right" data-aos-offset="200">Past Events</h2>
                <div className="events-list">
                    {pastEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className="event-row"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="event-date-col">
                                <span className="date-text">{event.date}</span>
                            </div>
                            <div className="event-info-col">
                                <span className="event-type-sm">{event.type}</span>
                                <h4 className="event-title-sm">{event.title}</h4>
                                <p className="event-location">{event.location}</p>
                                <div className="event-stats-row" style={{ display: 'flex', gap: '15px', marginTop: '5px', alignItems: 'center' }}>
                                    <span className="badge-closed" style={{
                                        background: '#EA4335', color: 'white', padding: '2px 8px',
                                        borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600'
                                    }}>
                                        Registration Closed
                                    </span>
                                    <span className="reg-count" style={{ fontSize: '0.85rem', color: '#5f6368', fontWeight: '500' }}>
                                        👥 {event.registrations}+ Registrations
                                    </span>
                                </div>
                            </div>
                            <div className="event-action-col">
                                <button
                                    className="btn-text"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    View details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <EventModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </section>
    );
};

export default Events;
