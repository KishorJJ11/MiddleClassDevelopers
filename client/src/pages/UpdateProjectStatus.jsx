
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './UpdateProjectStatus.css';

const UpdateProjectStatus = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Form States
    const [newProject, setNewProject] = useState({
        uniqueId: 'MCD', // Default Prefix
        clientName: '',
        title: '',
        description: '',
        status: 'Pending',
        estimatedCompletion: ''
    });

    const [updateData, setUpdateData] = useState({
        subject: '', message: '', status: '', progress: 0
    });


    // Fetch Projects
    const fetchProjects = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // No token, probably not logged in or token expired.
            // Don't fetch, avoid error.
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get('/api/projects/all', {
                headers: { 'x-auth-token': token }
            });
            setProjects(res.data);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 404) {
                toast.error('Server API missing. Please RESTART the backend server.');
            } else if (err.response && err.response.status === 401) {
                toast.error('Unauthorized. Please login again.');
            } else {
                toast.error('Failed to load projects');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);


    // Handle Create Project
    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/projects/create', newProject, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Project Created Successfully');
            setShowCreateModal(false);
            setNewProject({ uniqueId: 'MCD', clientName: '', title: '', description: '', status: 'Pending', estimatedCompletion: '' }); // Reset to MCD
            fetchProjects(); // Refresh list
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Creation Failed');
        }
    };

    // Handle Update Click
    const openUpdateModal = (project) => {
        setSelectedProject(project);
        setUpdateData({
            subject: '',
            message: '',
            status: project.status, // Pre-fill current status
            progress: project.progress // Pre-fill current progress
        });
        setShowUpdateModal(true);
    };

    // Handle Update Submit
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/projects/update', {
                uniqueId: selectedProject.uniqueId,
                ...updateData
            }, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Project Updated Successfully');
            setShowUpdateModal(false);
            fetchProjects(); // Refresh list
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Update Failed');
        }
    };


    const currentProjects = projects.filter(p => p.status !== 'Completed');
    const completedProjects = projects.filter(p => p.status === 'Completed');

    if (loading) return <div className="dashboard-container">Loading...</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Developer Console</h2>
                <button className="new-project-btn" onClick={() => setShowCreateModal(true)}>
                    + New Project
                </button>
            </div>

            {/* Current Projects Table */}
            <h3 className="section-title">Current Projects</h3>
            {currentProjects.length > 0 ? (
                <div className="table-responsive">
                    <table className="projects-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Client</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Progress</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProjects.map(project => (
                                <tr key={project._id}>
                                    <td>{project.uniqueId}</td>
                                    <td>{project.clientName}</td>
                                    <td>{project.title}</td>
                                    <td><span className={`status-badge ${project.status.toLowerCase()}`}>{project.status}</span></td>
                                    <td>{project.progress}%</td>
                                    <td>
                                        <button className="action-btn" onClick={() => openUpdateModal(project)}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : <p style={{ marginBottom: '2rem', color: '#888' }}>No active projects.</p>}


            {/* Completed Projects Table */}
            <h3 className="section-title">Completed Projects</h3>
            {completedProjects.length > 0 ? (
                <div className="table-responsive">
                    <table className="projects-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Client</th>
                                <th>Title</th>
                                <th>Finished On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedProjects.map(project => (
                                <tr key={project._id}>
                                    <td>{project.uniqueId}</td>
                                    <td>{project.clientName}</td>
                                    <td>{project.title}</td>
                                    <td>{new Date(project.updates[0]?.date || Date.now()).toLocaleDateString()}</td>
                                    <td>
                                        <button className="action-btn" onClick={() => openUpdateModal(project)}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : <p style={{ color: '#888' }}>No completed projects yet.</p>}


            {/* Create Project Modal */}
            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Create New Project</h3>
                            <button className="close-btn" onClick={() => setShowCreateModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="form-group">
                                <label>Unique ID</label>
                                <input
                                    required
                                    value={newProject.uniqueId}
                                    onChange={e => {
                                        const val = e.target.value;
                                        if (val.startsWith('MCD')) {
                                            setNewProject({ ...newProject, uniqueId: val });
                                        }
                                    }}
                                />
                            </div>
                            <div className="form-group"><label>Client Name</label><input required value={newProject.clientName} onChange={e => setNewProject({ ...newProject, clientName: e.target.value })} /></div>
                            <div className="form-group"><label>Project Title</label><input required value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} /></div>
                            <div className="form-group"><label>Description</label><textarea value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} /></div>
                            <div className="form-group"><label>Est. Completion</label><input value={newProject.estimatedCompletion} onChange={e => setNewProject({ ...newProject, estimatedCompletion: e.target.value })} /></div>
                            <button type="submit" className="submit-btn">Create Project</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Project Modal */}
            {showUpdateModal && selectedProject && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Update Status: {selectedProject.uniqueId}</h3>
                            <button className="close-btn" onClick={() => setShowUpdateModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="form-group"><label>Update Subject</label><input required placeholder="e.g. UI Phase 1 Done" value={updateData.subject} onChange={e => setUpdateData({ ...updateData, subject: e.target.value })} /></div>
                            <div className="form-group"><label>Message</label><textarea required placeholder="Details..." value={updateData.message} onChange={e => setUpdateData({ ...updateData, message: e.target.value })} /></div>
                            <div className="form-group">
                                <label>Status</label>
                                <select value={updateData.status} onChange={e => setUpdateData({ ...updateData, status: e.target.value })}>
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
                                <label>Progress ({updateData.progress}%)</label>
                                <input type="range" min="0" max="100" value={updateData.progress} onChange={e => setUpdateData({ ...updateData, progress: e.target.value })} />
                            </div>
                            <button type="submit" className="submit-btn">Push Update</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UpdateProjectStatus;
