import React from 'react';

const ComparisonSpentCard = ({ title, items, loading, error, loadMore }) => (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
        <div className="card shadow-lg border-primary">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{title}</h5>
                <i className="bi bi-bar-chart-line fs-3"></i>
            </div>
            <div className="card-body">
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                    </div>
                ) : items.length > 0 ? (
                    <div>
                        {items.map((item, index) => (
                            <div key={index} className="mb-3 p-3 border rounded-3 shadow-sm bg-light">
                                <h6 className="fw-bold">{item.itemName}</h6>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-muted">
                                        <strong>Preço:</strong>
                                        {`R$ ${parseFloat(item.minPrice).toFixed(2)} - R$ ${parseFloat(item.maxPrice).toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <div>
                                        <small className="text-primary"><strong>Menor Preço:</strong></small>
                                        <p className="mb-0">{new Date(item.minPriceDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <small className="text-danger"><strong>Maior Preço:</strong></small>
                                        <p className="mb-0">{new Date(item.maxPriceDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="text-center mt-4">
                            <button
                                onClick={loadMore}
                                className="btn btn-primary"
                                disabled={loading || items.length === 0}
                            >
                                {loading ? "Carregando..." : "Carregar Mais"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="card-text text-center">Sem dados</p>
                )}
            </div>
        </div>
    </div>
);

export default ComparisonSpentCard;