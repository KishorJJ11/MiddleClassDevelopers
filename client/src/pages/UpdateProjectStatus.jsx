
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './UpdateProjectStatus.css';

const UpdateProjectStatus = () => {
    const [uniqueId, setUniqueId] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('Development');
    const [progress, setProgress] = useState(50);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please Login as Developer First');
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };

            const body = {
                uniqueId,
                subject,
                message,
                status,
                progress
            };

            const res = await axios.post('/api/projects/update', body, config);

            if (res.data) {
                toast.success(`Project ${uniqueId} Updated Successfully!`);
                // Clear form but keep ID for convenience? Or clear all.
                setSubject('');
                setMessage('');
                // setUniqueId(''); // Keep ID if they want to add another updates
            }
        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.msg || 'Update Failed';
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-status-container">
            <div className="update-card">
                <div className="update-header">
                    <h2>Developer Console</h2>
                    <p>Push updates to client projects</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="uniqueId">Project Unique ID</label>
                        <input
                            type="text"
                            id="uniqueId"
                            placeholder="e.g. PRJ-123456"
                            value={uniqueId}
                            onChange={(e) => setUniqueId(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Update Subject</label>
                        <input
                            type="text"
                            id="subject"
                            placeholder="e.g. Homepage UI Completed"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Detailed Message</label>
                        <textarea
                            id="message"
                            rows="4"
                            placeholder="Describe what was done..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Current Phase</label>
                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="Planning">Planning</option>
                            <option value="Design">Design</option>
                            <option value="Development">Development</option>
                            <option value="Testing">Testing</option>
                            <option value="Deployment">Deployment</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="progress">Progress ({progress}%)</label>
                        <input
                            type="range"
                            id="progress"
                            min="0"
                            max="100"
                            className="range-input"
                            value={progress}
                            onChange={(e) => setProgress(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="update-btn" disabled={loading}>
                        {loading ? 'Pushing Update...' : 'Submit Update'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProjectStatus;
