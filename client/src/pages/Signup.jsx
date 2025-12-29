import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
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

    // Missing States Added
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const { name, email, password, confirmPassword, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true); // Start loading
        try {
            // Register route sends OTP now
            const res = await axios.post('/api/auth/register', {
                name,
                email,
                password,
                role
            });

            if (res.data) {
                toast.success('Verification Code Sent to Email!');
                setStep(2); // Move to OTP step
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.msg || 'Registration Failed';
            toast.error(errorMessage);
        } finally {
            setLoading(false); // Stop loading regardless of success/fail
        }
    };

    // OTP Verification Handler
    const handleOtpVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/api/auth/verify-email', { email, otp });
            if (res.data) {
                localStorage.setItem('token', res.data.token);
                toast.success('Email Verified! Login Successful.');
                navigate('/track-project'); // Redirect to dashboard
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg || 'Verification Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>{step === 1 ? 'Create Account' : 'Verify Email'}</h2>
                    <p>{step === 1 ? 'Join us to start your journey' : `Enter code sent to ${email}`}</p>
                </div>

                {step === 1 ? (
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
                        <button type="submit" className="signup-btn" disabled={loading}>
                            {loading ? 'Sending Code...' : 'Sign Up'}
                        </button>
                    </form>
                ) : (
                    <form className="signup-form" onSubmit={handleOtpVerify}>
                        <div className="form-group">
                            <label htmlFor="otp">Verification Code</label>
                            <input
                                type="text"
                                id="otp"
                                placeholder="Enter 6-digit code"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="otp-input"
                                style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem' }}
                            />
                        </div>
                        <button type="submit" className="signup-btn" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>
                        <button
                            type="button"
                            className="signup-btn"
                            onClick={() => setStep(1)}
                            style={{ background: 'transparent', border: '1px solid #fff', marginTop: '10px' }}
                        >
                            Back
                        </button>
                    </form>
                )}

                <div className="signup-footer">
                    <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;