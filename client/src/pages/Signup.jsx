import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Client' // Default role
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { name, email, password, confirmPassword, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, role })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                toast.success('Account Created Successfully');
                navigate('/');
            } else {
                toast.error(data.msg || 'Registration Failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('Server Error');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create Account</h2>
                    <p>Join us to start your journey</p>
                </div>
                <form className="signup-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="Enter your full name" value={name} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" placeholder="Enter your email" value={email} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">I am a...</label>
                        <select id="role" value={role} onChange={onChange} className="role-select">
                            <option value="Client">Client</option>
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Marketing Team">Marketing Team</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={onChange}
                                required
                                minLength="6"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={onChange}
                                required
                                minLength="6"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                <div className="signup-footer">
                    <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
