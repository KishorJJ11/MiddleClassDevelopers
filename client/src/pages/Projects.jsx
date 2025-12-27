import React from 'react';
import { FaExternalLinkAlt, FaCode, FaMobileAlt, FaLaptopCode } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Superstore',
            category: 'Web Development',
            desc: 'A full-fledged multi-vendor e-commerce platform built for high scalability. Featuring real-time inventory management, secure payment gateway integration, and a comprehensive admin dashboard.',
            tech: ['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe'],
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            link: '#'
        },
        {
            id: 2,
            title: 'HealthCare Plus App',
            category: 'Mobile App Development',
            desc: 'A patient management mobile application helping doctors track patient history, appointments, and prescriptions. Includes telemedicine features for remote consultations.',
            tech: ['Flutter', 'Firebase', 'Dart', 'WebRTC'],
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            link: '#'
        },
        {
            id: 3,
            title: 'FinTech Analytics Dashboard',
            category: 'SaaS Product',
            desc: 'An advanced financial analytics tool for small businesses to track expenses, profit margins, and forecast growth. Visualizes complex data into easy-to-understand charts.',
            tech: ['Vue.js', 'Python', 'Django', 'D3.js'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            link: '#'
        }
    ];

    return (
        <div className="projects-container">
            <div className="projects-header">
                <h1>Success Stories</h1>
                <p>Real problems. Real solutions. See how we transform ideas into digital reality.</p>
            </div>

            <div className="projects-list">
                {projects.map(project => (
                    <div className="project-card" key={project.id}>
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                            <div className="project-overlay">
                                <a href={project.link} className="visit-btn" target="_blank" rel="noopener noreferrer">
                                    Visit Live Site <FaExternalLinkAlt />
                                </a>
                            </div>
                        </div>
                        <div className="project-content">
                            <div className="project-category">{project.category}</div>
                            <h2>{project.title}</h2>
                            <p>{project.desc}</p>

                            <div className="tech-stack">
                                {project.tech.map((tech, index) => (
                                    <span key={index} className="tech-badge">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
