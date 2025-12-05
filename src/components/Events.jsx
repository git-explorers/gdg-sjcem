import React from 'react';
import './Events.css';

const Events = () => {
    const upcomingEvents = [
        {
            id: 1,
            date: '13 Dec 2025',
            type: 'Info session',
            title: 'TechSprint Hackathon 2025 – Kick-Off Session | GDG on Campus SJCEM',
            description: 'Welcome to the official Kick-Off Session of TechSprint 2025! Hosted by GDG on Campus – St. John College of Engineering &...',
            image: 'https://developers.google.com/community/gdg/images/event-hero.jpg' // Placeholder
        }
    ];

    const pastEvents = [
        {
            id: 1,
            date: '2 Oct 2025',
            type: 'Info session',
            title: 'Google Cloud Study Jams – Online Info Session',
            location: 'GDG on Campus St. John College of Engineering and Management Autonomous - Palghar, India'
        },
        {
            id: 2,
            date: '24 Sept 2025',
            type: 'Info session',
            title: 'Info Session: GDG on Campus – SJCEM | Kick-off 2025',
            location: 'GDG on Campus St. John College of Engineering and Management Autonomous - Palghar, India'
        }
    ];

    return (
        <section id="events" className="section events-section">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">Upcoming Events</h2>
                <div className="events-grid upcoming">
                    {upcomingEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className="event-card upcoming-card"
                            data-aos="flip-left"
                            data-aos-delay={index * 100}
                        >
                            <div className="event-image" style={{ backgroundImage: `url(${event.image})` }}>
                                <div className="event-date-badge">
                                    <span className="day">{event.date.split(' ')[0]}</span>
                                    <span className="month">{event.date.split(' ')[1]}</span>
                                </div>
                            </div>
                            <div className="event-content">
                                <span className="event-type">{event.type}</span>
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-desc">{event.description}</p>
                                <button className="btn btn-outline view-details-btn">View details →</button>
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="section-title past-title" data-aos="fade-up">Past Events</h2>
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
                            </div>
                            <div className="event-action-col">
                                <button className="btn-text">View details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
