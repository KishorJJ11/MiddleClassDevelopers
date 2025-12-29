import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: '',
        mobile: '',
        company: '',
        role: '',
        bio: ''
    });

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const { currentPassword, newPassword, confirmNewPassword } = passwordData;


    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/auth/user', {
                    headers: {
                        'x-auth-token': token
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                    setEditFormData({
                        name: data.name || '',
                        mobile: data.mobile || '',
                        company: data.company || '',
                        role: data.role || '',
                        bio: data.bio || ''
                    });
                } else {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handlePasswordChange = e => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    const handleEditChange = e => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(editFormData)
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data);
                setIsEditing(false);
                toast.success("Profile Updated Successfully");
            } else {
                toast.error(data.msg || 'Failed to update profile');
            }
        } catch (err) {
            console.error(err);
            toast.error('Server Error');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/auth/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.msg);
                setShowPasswordForm(false);
                setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
            } else {
                toast.error(data.msg || 'Failed to update password');
            }
        } catch (err) {
            console.error(err);
            toast.error('Server Error');
        }
    };



    if (!user) return <div className="profile-container">Loading...</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" className="profile-img-large" />

                    {!isEditing ? (
                        <>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>

                            <p className="profile-bio">{user.bio || 'No bio added yet.'}</p>

                            <div className="profile-details-grid">
                                <div className="detail-item">
                                    <strong>Mobile:</strong> {user.mobile || 'Not added'}
                                </div>
                                <div className="detail-item">
                                    <strong>Role:</strong> {user.role || 'Not added'}
                                </div>
                                <div className="detail-item">
                                    <strong>Company:</strong> {user.company || 'Not added'}
                                </div>
                            </div>

                            <button onClick={() => setIsEditing(true)} className="edit-profile-btn">Edit Profile</button>
                        </>
                    ) : (
                        <form className="edit-profile-form" onSubmit={handleEditSubmit}>
                            <div className="form-group-profile">
                                <label>Full Name</label>
                                <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} required />
                            </div>
                            <div className="form-group-profile">
                                <label>Bio</label>
                                <textarea name="bio" value={editFormData.bio} onChange={handleEditChange} rows="3" placeholder="Tell us about yourself..."></textarea>
                            </div>
                            <div className="form-group-profile">
                                <label>Mobile Number</label>
                                <input type="text" name="mobile" value={editFormData.mobile} onChange={handleEditChange} placeholder="+91..." />
                            </div>
                            <div className="form-group-profile">
                                <label>Company</label>
                                <input type="text" name="company" value={editFormData.company} onChange={handleEditChange} placeholder="Company Name" />
                            </div>

                            <div className="edit-actions">
                                <button type="submit" className="save-btn">Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="profile-body">
                    <div className="profile-section">
                        <h3>Account Status</h3>
                        <p className="status-active">Active Member</p>
                    </div>

                    {!isEditing && (
                        <div className="profile-section">
                            <button
                                className="toggle-password-btn"
                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                            >
                                {showPasswordForm ? 'Cancel Change Password' : 'Change Password'}
                            </button>

                            {showPasswordForm && (
                                <form className="change-password-form" onSubmit={handleChangePassword}>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="newPassword"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        minLength="6"
                                    />
                                    <input
                                        type="password"
                                        name="confirmNewPassword"
                                        placeholder="Confirm New Password"
                                        value={confirmNewPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        minLength="6"
                                    />
                                    <button type="submit" className="save-password-btn">Update Password</button>
                                </form>
                            )}
                        </div>
                    )}
                </div>

                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>


        </div>
    );
};

export default Profile;
