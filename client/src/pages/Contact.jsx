import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
    });

    const { name, email, mobile, subject, message } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success('Message Sent Successfully!');
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    subject: '',
                    message: ''
                });
            } else {
                toast.error('Failed to send message. Please try again.');
            }
        } catch (err) {
            console.error('Error sending message:', err);
            toast.error('Something went wrong. Please check your connection.');
        }
    };

    return (
        <div className="contact-container">
            <h1 className="contact-title">Get In Touch</h1>
            <div className="contact-wrapper">
                {/* Contact Information */}
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p>Fill up the form and our team will get back to you within 24 hours.</p>

                    <div className="info-item">
                        <FaPhone className="info-icon" style={{ transform: 'scaleX(-1)' }} />
                        <span>+91 63741 74627</span>
                    </div>
                    <div className="info-item">
                        <FaEnvelope className="info-icon" />
                        <span>kishorjj05@gmail.com</span>
                    </div>
                    <div className="info-item">
                        <FaMapMarkerAlt className="info-icon" />
                        <span>Chennai, India</span>
                    </div>

                    <div className="contact-socials">
                        <a href="https://wa.me/916374174627" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                        <a href="https://instagram.com/middleclass.devs" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/in/kishorjj/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    </div>
                </div>

                {/* Contact Form */}
                <form className="contact-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Your Name</label>
                        <input type="text" name="name" value={name} onChange={onChange} required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={email} onChange={onChange} required placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="tel" name="mobile" value={mobile} onChange={onChange} required placeholder="+91 9876543210" />
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <input type="text" name="subject" value={subject} onChange={onChange} required placeholder="Project Inquiry" />
                    </div>
                    <div className="form-group full-width">
                        <label>Message</label>
                        <textarea name="message" value={message} onChange={onChange} required placeholder="Tell us about your project..." rows="5"></textarea>
                    </div>
                    <div className="form-group full-width">
                        <button type="submit" className="contact-btn">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
