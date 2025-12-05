import React, { useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const images = [
        "https://i.ibb.co/xtMWG5bB/IMG-0354.avif",
        "https://i.ibb.co/mFBXVYTS/IMG-0370.avif",
        "https://i.ibb.co/ybtt9nh/IMG-0383.avif",
        "https://i.ibb.co/RGw3wqpg/IMG-0389.avif",
        "https://i.ibb.co/cKDyxhgw/IMG-0398.avif",
        "https://i.ibb.co/pjT400g4/IMG-20250924-151820514.jpg",
        "/images/event-1.webp",
        "/images/event-2.webp",
        "/images/event-3.webp",
        "/images/event-4.webp",
        "/images/event-5.webp"
    ];

    return (
        <section className="section gallery-section">
            <div className="container">
                <h1 className="section-title">Event Gallery</h1>
                <p className="section-subtitle">A glimpse into our vibrant community events and workshops.</p>

                <div className="gallery-grid">
                    {images.map((src, index) => (
                        <div key={index} className="gallery-item" data-aos="fade-up" data-aos-delay={index * 50}>
                            <img src={src} alt={`Gallery Event ${index + 1}`} loading="lazy" />
                            <div className="gallery-overlay">
                                <span>GDG Event</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
