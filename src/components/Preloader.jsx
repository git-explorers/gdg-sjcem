import React, { useState, useEffect } from 'react';
import preloaderVideo from '../assets/new_preloader.mp4';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
    const [loading, setLoading] = useState(true);
    const videoRef = React.useRef(null);

    const handleVideoEnd = () => {
        setLoading(false);
        setTimeout(onFinish, 800); // 0.8s wait for exit animation
    };

    const handleMetadataLoaded = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 2;
        }
    };

    return (
        <div className={`preloader ${!loading ? 'fade-out' : ''}`}>
            <div className="loader-content">
                <video
                    ref={videoRef}
                    src={preloaderVideo}
                    autoPlay
                    muted
                    playsInline
                    className="preloader-video"
                    onLoadedMetadata={handleMetadataLoaded}
                    onEnded={handleVideoEnd}
                />
            </div>
        </div>
    );
};

export default Preloader;
