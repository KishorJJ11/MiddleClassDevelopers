import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState('messages');
    const [loading, setLoading] = useState(true);

    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };

            const msgRes = await fetch('/api/contact', config);
            const notifRes = await fetch('/api/notifications', config);

            if (msgRes.ok) setMessages(await msgRes.json());
            if (notifRes.ok) setNotifications(await notifRes.json());

            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setLoading(false);
        }
    };

    const openMessage = (msg) => {
        setSelectedMessage(msg);
    };

    const closeMessage = () => {
        setSelectedMessage(null);
    };

    if (loading) return <div className="loading">Loading Dashboard...</div>;

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>

            <div className="admin-tabs">
                <button
                    className={activeTab === 'messages' ? 'active' : ''}
                    onClick={() => setActiveTab('messages')}
                >
                    Messages ({messages.length})
                </button>
                <button
                    className={activeTab === 'notifications' ? 'active' : ''}
                    onClick={() => setActiveTab('notifications')}
                >
                    Notifications ({notifications.length})
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'messages' ? (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map(msg => (
                                    <tr key={msg._id}>
                                        <td>{new Date(msg.date).toLocaleDateString()}</td>
                                        <td>{msg.name}</td>
                                        <td>{msg.email}</td>
                                        <td>{msg.subject}</td>
                                        <td>
                                            <button className="view-btn" onClick={() => openMessage(msg)}>View</button>
                                        </td>
                                    </tr>
                                ))}
                                {messages.length === 0 && <tr><td colSpan="5">No messages found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Email</th>
                                    <th>Interested Service</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notifications.map(notif => (
                                    <tr key={notif._id}>
                                        <td>{new Date(notif.date).toLocaleDateString()}</td>
                                        <td>{notif.email}</td>
                                        <td>{notif.service}</td>
                                    </tr>
                                ))}
                                {notifications.length === 0 && <tr><td colSpan="3">No notifications found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Message Modal */}
            {selectedMessage && (
                <div className="modal-overlay" onClick={closeMessage}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Message Details</h2>
                            <button className="close-btn" onClick={closeMessage}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
                            <p><strong>Mobile:</strong> {selectedMessage.mobile}</p>
                            <p><strong>Date:</strong> {new Date(selectedMessage.date).toLocaleString()}</p>
                            <div className="message-box">
                                <strong>Subject:</strong> {selectedMessage.subject}
                                <br /><br />
                                <strong>Message:</strong>
                                <p>{selectedMessage.message}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="close-btn-text" onClick={closeMessage}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
