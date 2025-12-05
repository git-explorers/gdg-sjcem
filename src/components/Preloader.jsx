import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setTimeout(onFinish, 500); // Wait for exit animation
        }, 2500); // 2.5s loading time

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`preloader ${!loading ? 'fade-out' : ''}`}>
            <div className="loader-content">
                <div className="google-spinner">
                    <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left"><div className="circle"></div></div>
                        <div className="gap-patch"><div className="circle"></div></div>
                        <div className="circle-clipper right"><div className="circle"></div></div>
                    </div>
                    <div className="spinner-layer spinner-red">
                        <div className="circle-clipper left"><div className="circle"></div></div>
                        <div className="gap-patch"><div className="circle"></div></div>
                        <div className="circle-clipper right"><div className="circle"></div></div>
                    </div>
                    <div className="spinner-layer spinner-yellow">
                        <div className="circle-clipper left"><div className="circle"></div></div>
                        <div className="gap-patch"><div className="circle"></div></div>
                        <div className="circle-clipper right"><div className="circle"></div></div>
                    </div>
                    <div className="spinner-layer spinner-green">
                        <div className="circle-clipper left"><div className="circle"></div></div>
                        <div className="gap-patch"><div className="circle"></div></div>
                        <div className="circle-clipper right"><div className="circle"></div></div>
                    </div>
                </div>
                <h2 className="loading-text">GDG on Campus SJCEM</h2>
            </div>
        </div>
    );
};

export default Preloader;
