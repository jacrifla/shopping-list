import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import purchaseService from '../services/purchaseService';
import Title from '../components/Title';

const Metrics = ({ userId }) => {
    const [totalSpent, setTotalSpent] = useState(null);
    const [mostPurchased, setMostPurchased] = useState([]);
    const [itemsPurchased, setItemsPurchased] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const startDate = '2024-01-01';
    const endDate = '2025-01-31';

    useEffect(() => {
        if (!startDate || !endDate) {
            setError('Datas inválidas fornecidas.');
            return;
        }

        const loadMetrics = async () => {
            setLoading(true);
            try {
                const totalSpentData = await purchaseService.getTotalSpent(startDate, endDate);
                if (totalSpentData.success) {
                    setTotalSpent(totalSpentData.totalSpent);
                } else {
                    setError(totalSpentData.message);
                }

                const mostPurchasedData = await purchaseService.getMostPurchased(5);
                if (mostPurchasedData.success) {
                    setMostPurchased(mostPurchasedData.mostPurchased);
                } else {
                    setError(mostPurchasedData.message);
                }

                const itemsPurchasedData = await purchaseService.getItemsPurchased(startDate, endDate);
                if (itemsPurchasedData.success) {
                    setItemsPurchased(itemsPurchasedData.itemsPurchased);
                } else {
                    setError(itemsPurchasedData.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadMetrics();
    }, [startDate, endDate]);

    return (
        <>
            <Header />
            <div className="container mt-4">
                <Title
                    text={'Métricas'}
                    icon={'graph-up-arrow'}
                    className='mb-4'
                />
                {error && (
                    <div className="alert alert-danger">
                        Erro ao carregar métricas: {error}
                    </div>
                )}
                <div className="row">
                    {/* Total Gasto Card */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-primary">
                            <div className="card-body">
                                <i className="bi bi-cash fs-3 text-primary mb-3"></i>
                                <h5 className="card-title">Total Gasto</h5>
                                {loading ? (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                ) : (
                                    <p className="card-text fs-5">
                                        {totalSpent !== null ? `R$ ${totalSpent.toFixed(2)}` : 'Sem dados'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Itens Mais Comprados Card */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-success">
                            <div className="card-body">
                                <i className="bi bi-basket fs-3 text-success mb-3"></i>
                                <h5 className="card-title">Itens Mais Comprados</h5>
                                {loading ? (
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                ) : mostPurchased.length > 0 ? (
                                    <ul className="list-group">
                                        {mostPurchased.map((item, index) => (
                                            <li className="list-group-item d-flex justify-content-between" key={index}>
                                                <span>{item.name}</span>
                                                <span className="badge bg-success">{item.quantity} unidades</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="card-text">Sem dados</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Total de Itens Comprados Card */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-warning">
                            <div className="card-body">
                                <i className="bi bi-cart-check fs-3 text-warning mb-3"></i>
                                <h5 className="card-title">Total de Itens Comprados</h5>
                                {loading ? (
                                    <div className="spinner-border text-warning" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                ) : (
                                    <p className="card-text fs-5">
                                        {itemsPurchased !== null ? itemsPurchased : 'Sem dados'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .card {
                    border-radius: 8px;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
};

export default Metrics;
