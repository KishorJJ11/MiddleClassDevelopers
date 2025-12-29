import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './TrackProject.css';

const TrackProject = () => {
    const [trackId, setTrackId] = useState('');
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!trackId.trim()) {
            toast.error("Please enter a Project ID");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/projects/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uniqueId: trackId })
            });

            const data = await res.json();

            if (res.ok) {
                setProjectData(data);
                toast.success("Project Found!");
            } else {
                setProjectData(null);
                toast.error(data.msg || "Project not found");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server Error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="track-project-container">
            <div className="track-project-content">
                <h1 className="track-title">Track Your Project</h1>
                <p className="track-subtitle">Enter your Unique Project ID to check real-time status and progress.</p>

                <form onSubmit={handleTrack} className="tracking-input-group">
                    <input
                        type="text"
                        className="tracking-input-main"
                        placeholder="Enter Project ID (e.g., MCD-2025-01)"
                        value={trackId}
                        onChange={(e) => setTrackId(e.target.value)}
                    />
                    <button type="submit" className="track-btn-main" disabled={loading}>
                        {loading ? 'Searching...' : 'Track Now'}
                    </button>
                </form>

                {projectData && (
                    <div className="status-result-card">
                        <div className="result-header">
                            <div>
                                <h2>{projectData.title}</h2>
                                <span className="client-id">ID: {projectData.uniqueId}</span>
                            </div>
                            <span className={`status-badge-large ${projectData.status.toLowerCase()}`}>
                                {projectData.status}
                            </span>
                        </div>

                        <p className="project-details">
                            {projectData.description || "No description available for this project."}
                        </p>

                        <div className="progress-section">
                            <div className="progress-info">
                                <span>Completion Status</span>
                                <span>{projectData.progress}%</span>
                            </div>
                            <div className="progress-track">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${projectData.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="meta-grid">
                            <div className="meta-box">
                                <h4>Client Name</h4>
                                <p>{projectData.clientName}</p>
                            </div>
                            <div className="meta-box">
                                <h4>Start Date</h4>
                                <p>{new Date(projectData.startDate).toLocaleDateString()}</p>
                            </div>
                            <div className="meta-box">
                                <h4>Est. Completion</h4>
                                <p>{projectData.estimatedCompletion || 'TBD'}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackProject;
