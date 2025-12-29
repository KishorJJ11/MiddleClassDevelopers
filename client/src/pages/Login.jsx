import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                toast.success('Login Successful');
                navigate('/');
            } else {
                toast.error(data.msg || 'Login Failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('Server Error');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Login to your account to continue</p>
                </div>
                <form className="login-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="Enter your email" value={email} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={onChange}
                                required
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
                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember me
                        </label>
                        <Link to="#" className="forgot-password">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="login-footer">
                    <p>Don't have an account? <Link to="/signup" className="create-account">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
