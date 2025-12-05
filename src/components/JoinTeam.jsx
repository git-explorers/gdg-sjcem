import React, { useState, useEffect } from 'react';
import './JoinTeam.css';

const JoinTeam = () => {
    // Set Deadline: Sunday, Dec 7, 2025 at 8:00 PM
    const deadline = new Date("2025-12-07T20:00:00").getTime();
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        const checkDeadline = () => {
            const now = new Date().getTime();
            if (now > deadline) {
                setIsClosed(true);
            }
        };

        checkDeadline();
        const interval = setInterval(checkDeadline, 1000 * 60); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="join-team-section">
            <div className="join-container" data-aos="fade-up">
                <h1 className="section-title">Join the Core Team</h1>
                <p className="section-subtitle">
                    Be a part of the driving force behind GDG on Campus SJCEM.
                </p>

                {isClosed ? (
                    <div className="applications-closed-card" data-aos="zoom-in">
                        <div className="closed-icon">🔒</div>
                        <h2>Applications Are Closed</h2>
                        <p>We are no longer accepting responses for this recruitment phase.</p>
                        <p>
                            If you have any urgent queries, please contact us at: <br />
                            <a href="mailto:gdg@sjcem.edu.in" className="contact-link">gdg@sjcem.edu.in</a>
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="deadline-alert">
                            ⚠️ <strong>Deadline:</strong> Sunday, 8:00 PM. Please complete this on time!
                        </div>
                        <div className="form-wrapper">
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSdXvJjJ7y8x8x8x8x8x8x8x8x8x8x8x/viewform?embedded=true"
                                width="100%"
                                height="1150"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                title="Recruitment Form"
                            >
                                Loading…
                            </iframe>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default JoinTeam;

