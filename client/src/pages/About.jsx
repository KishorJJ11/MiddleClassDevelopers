import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaHandshake, FaLaptopCode, FaRegSmileBeam } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            {/* Hero Section */}
            <div className="about-hero">
                <div className="about-hero-content">
                    <h1>We Don't Just Write Code. <br /><span>We Build Futures.</span></h1>
                    <p>A team of passionate developers making premium tech accessible to everyone.</p>
                </div>
            </div>

            {/* Our Story Section */}
            <section className="about-section story-section">
                <div className="section-content">
                    <div className="text-col">
                        <h2>Who Are "Middle Class Developers"?</h2>
                        <p>
                            The name says it all. We understand the value of every rupee you invest.
                            We started this journey because we noticed a huge gap: Business owners had to choose between
                            <strong> expensive agencies</strong> that drain budgets or <strong>unreliable freelancers</strong> who ghost you midway.
                        </p>
                        <p>
                            We are the bridge. We offer <strong>Agency-Level Quality</strong> at <strong>Freelancer-Friendly Prices</strong>.
                            We are grounded, hardworking, and obsessed with delivering perfection.
                        </p>
                    </div>
                    <div className="img-col">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" alt="Team collaborating" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stat-item">
                    <FaLaptopCode className="stat-icon" />
                    <h3>50+</h3>
                    <p>Projects Delivered</p>
                </div>
                <div className="stat-item">
                    <FaRegSmileBeam className="stat-icon" />
                    <h3>30+</h3>
                    <p>Happy Clients</p>
                </div>
                <div className="stat-item">
                    <FaRocket className="stat-icon" />
                    <h3>100%</h3>
                    <p>On-Time Delivery</p>
                </div>
                <div className="stat-item">
                    <FaHandshake className="stat-icon" />
                    <h3>24/7</h3>
                    <p>Dedicated Support</p>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="about-section mission-section">
                <div className="section-content reverse">
                    <div className="text-col">
                        <h2>Our Mission</h2>
                        <p>
                            To empower small and medium businesses with enterprise-grade technology.
                            We believe that high-quality web/app development shouldn't be a luxury—it should be a standard.
                        </p>
                        <p>
                            Whether you need a simple landing page or a complex e-commerce platform,
                            we treat your project with the same level of dedication and precision.
                        </p>
                        <Link to="/services">
                            <button className="about-btn">Start Your Journey With Us</button>
                        </Link>
                    </div>
                    <div className="img-col">
                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop" alt="Our Mission" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
