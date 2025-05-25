import React from 'react';

const MetricCard = ({ title, value, icon, loading, color }) => (
    <div className={`col-12 col-md-4 mb-4`}>
        <div className={`card shadow-lg border-${color}`}>
            <div className={`card-header bg-${color} text-white d-flex justify-content-between align-items-center`}>
                <h5 className="mb-0">{title}</h5>
                <i className={`bi bi-${icon} fs-3`}></i>
            </div>
            <div className="card-body">
                {loading ? (
                    <div className={`spinner-border text-${color}`} role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                ) : (
                    <p className="card-text fs-5">{value}</p>
                )}
            </div>
        </div>
    </div>
);

export default MetricCard;