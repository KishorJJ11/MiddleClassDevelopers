import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section brand">
                    <h2>Middle Class Developers</h2>
                    <p>Premium Digital Solutions for Every Budget.</p>
                </div>

                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p><FaEnvelope />kishorjj05@gmail.com</p>
                    <p><FaPhone style={{ transform: 'scaleX(-1)' }} /> +91 63741 74627</p>
                </div>

                <div className="footer-section social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://wa.me/916374174627" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                        <a href="https://instagram.com/middleclass.devs" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/in/kishorjj/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Middle Class Developers. All Rights Reserved. (v1.1)</p>
            </div>
        </footer>
    );
};

export default Footer;
