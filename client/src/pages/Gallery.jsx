import React, { useState } from 'react';
import { FaEye, FaTimes } from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
    const [filter, setFilter] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    const portfolioItems = [
        { id: 1, category: 'E-Commerce', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Luxury Store', desc: 'Premium Fashion Outlet' },
        { id: 2, category: 'Web App', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'FinTech Dashboard', desc: 'Financial Analytics Tool' },
        { id: 3, category: 'Mobile App', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Fitness Tracker', desc: 'Health & Wellness App' },
        { id: 4, category: 'Branding', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Corporate Identity', desc: 'Tech Startup Branding' },
        { id: 5, category: 'E-Commerce', image: 'https://images.unsplash.com/photo-1472851294608-415522f716a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Gadget Hub', desc: 'Electronics Store' },
        { id: 6, category: 'Web App', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Project Manager', desc: 'Task Management System' },
        { id: 7, category: 'Mobile App', image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Food Delivery', desc: 'Order & Track App' },
        { id: 8, category: 'Branding', image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Coffee Brand', desc: 'Packaging & Logo Design' },
    ];

    const filteredItems = filter === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === filter);

    return (
        <div className="gallery-container">
            <div className="gallery-header">
                <h1>Our Masterpieces</h1>
                <p>Explore a collection of our finest work, crafted with precision and passion.</p>
            </div>

            <div className="filter-buttons">
                {['All', 'E-Commerce', 'Web App', 'Mobile App', 'Branding'].map(cat => (
                    <button
                        key={cat}
                        className={filter === cat ? 'active' : ''}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="gallery-grid">
                {filteredItems.map(item => (
                    <div className="gallery-item" key={item.id} onClick={() => setSelectedImage(item)}>
                        <img src={item.image} alt={item.title} />
                        <div className="item-overlay">
                            <h3>{item.title}</h3>
                            <p>{item.category}</p>
                            <span className="view-icon"><FaEye /></span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}><FaTimes /></button>
                        <img src={selectedImage.image} alt={selectedImage.title} />
                        <div className="lightbox-info">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
