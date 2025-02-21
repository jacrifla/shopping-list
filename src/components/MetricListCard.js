import React from 'react';

const MetricListCard = ({ title, items, loading, color, itemNameKey, itemValueKey, valuePrefix = 'R$' }) => (
    <div className={`col-12 col-md-4 mb-4`}>
        <div className={`card shadow-lg border-${color}`}>
            <div className={`card-header bg-${color} text-white d-flex justify-content-between align-items-center`}>
                <h5 className="mb-0">{title}</h5>
                <i className={`bi bi-tags fs-3`}></i>
            </div>
            <div className="card-body">
                {loading ? (
                    <div className={`spinner-border text-${color}`} role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                ) : items.length > 0 ? (
                    <ul className="list-group">
                        {items.map((item, index) => (
                            <li className="list-group-item d-flex justify-content-between" key={index}>
                                <span>{item[itemNameKey]}</span>
                                <span className={`badge bg-${color}`}>
                                    {item[itemValueKey] ? `${valuePrefix} ${item[itemValueKey].toFixed(2)}` : `${valuePrefix} 0.00`}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="card-text">Sem dados</p>
                )}
            </div>
        </div>
    </div>
);

export default MetricListCard;