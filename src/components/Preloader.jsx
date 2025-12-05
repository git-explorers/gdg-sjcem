import React, { useState, useEffect } from 'react';
import preloaderGif from '../assets/preloader.gif';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setTimeout(onFinish, 800); // 0.8s wait for exit animation
        }, 3500); // Slightly longer for GIF to play

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`preloader ${!loading ? 'fade-out' : ''}`}>
            <div className="loader-content">
                <img src={preloaderGif} alt="Loading..." className="preloader-gif" />
                <div className="loading-indicator">
                    <div className="spinner"></div>
                    <span className="loading-text">Loading Experience...</span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
