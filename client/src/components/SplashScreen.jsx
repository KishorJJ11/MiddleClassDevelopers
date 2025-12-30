import React from 'react';
import './SplashScreen.css';
import logo from '../assets/MClogo.jpeg';

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <div className="splash-content">
                <img src={logo} alt="MCDevs Logo" className="splash-logo" />
                <h1 className="splash-text">Middle Class Developers</h1>
            </div>
        </div>
    );
};

export default SplashScreen;
