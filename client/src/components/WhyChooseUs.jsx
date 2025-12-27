import React from 'react';
import { FaWallet, FaGem, FaRocket, FaHeadset } from 'react-icons/fa';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
    const features = [
        {
            id: 1,
            icon: <FaWallet />,
            title: "Pocket-Friendly Pricing",
            desc: "Quality shouldn't break the bank. We offer premium digital solutions tailored to fit perfectly within your budget."
        },
        {
            id: 2,
            icon: <FaGem />,
            title: "Premium Design",
            desc: "First impressions matter. We craft world-class, aesthetic interfaces that captivate your audience instantly."
        },
        {
            id: 3,
            icon: <FaRocket />,
            title: "Scalable Code",
            desc: "Built to grow with your business. Our robust codebases ensure your app performs flawlessly as you scale."
        },
        {
            id: 4,
            icon: <FaHeadset />,
            title: "Lightning Fast Support",
            desc: "We are always here for you. Experience dedicated support that resolves your queries in record time."
        }
    ];

    return (
        <section className="why-choose-us-container">
            <h2 className="section-title">Why Middle Class Developers?</h2>
            <div className="features-grid">
                {features.map(feature => (
                    <div className="feature-card" key={feature.id}>
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
