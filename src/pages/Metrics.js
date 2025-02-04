import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Title from '../components/Title';
import purchaseService from '../services/purchaseService';
import { formatToISODate } from '../utils/functions';

const Metrics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalSpent, setTotalSpent] = useState(null);
    const [mostPurchased, setMostPurchased] = useState([]);
    const [itemsPurchased, setItemsPurchased] = useState(null);
    const [avgSpendPerPurchase, setAvgSpendPerPurchase] = useState(null);
    const [largestPurchase, setLargestPurchase] = useState(null);
    const [avgDailySpend, setAvgDailySpend] = useState(null);
    const [categoryPurchases, setCategoryPurchases] = useState([]);
    const [comparisonSpent, setComparisonSpent] = useState(null);
    const [topItemsByValue, setTopItemsByValue] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Define datas padrão formatadas corretamente
    useEffect(() => {
        const today = formatToISODate(new Date());
        const last30Days = formatToISODate(new Date(new Date().setDate(new Date().getDate() - 30)));

        setStartDate(last30Days);
        setEndDate(today);
    }, []);

    useEffect(() => {
        if (!startDate || !endDate) {
            setError('Datas inválidas fornecidas.');
            return;
        }

        const loadMetrics = async () => {
            setLoading(true);
            setError(null);
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

                const avgSpendPerPurchaseData = await purchaseService.getAvgSpendPerPurchase(startDate, endDate);
                if (avgSpendPerPurchaseData.success) {
                    setAvgSpendPerPurchase(avgSpendPerPurchaseData.avgSpendPerPurchase);
                } else {
                    setError(avgSpendPerPurchaseData.message);
                }

                const largestPurchaseData = await purchaseService.getLargestPurchase(startDate, endDate);
                if (largestPurchaseData.success) {
                    setLargestPurchase(largestPurchaseData.largestPurchase);
                } else {
                    setError(largestPurchaseData.message);
                }

                const avgDailySpendData = await purchaseService.getAvgDailySpend(startDate, endDate);
                if (avgDailySpendData.success) {
                    setAvgDailySpend(avgDailySpendData.avgDailySpend);
                } else {
                    setError(avgDailySpendData.message);
                }

                const categoryPurchasesData = await purchaseService.getCategoryPurchases(startDate, endDate);
                if (categoryPurchasesData.success) {
                    setCategoryPurchases(categoryPurchasesData.categoryPurchases);
                } else {
                    setError(categoryPurchasesData.message);
                }

                const comparisonSpentData = await purchaseService.getComparisonSpent(startDate, endDate);
                if (comparisonSpentData.success) {
                    setComparisonSpent(comparisonSpentData.comparisonSpent);
                } else {
                    setError(comparisonSpentData.message);
                }

                const topItemsByValueData = await purchaseService.getTopItemsByValue(startDate, endDate);
                if (topItemsByValueData.success) {
                    setTopItemsByValue(topItemsByValueData.topItemsByValue);
                } else {
                    setError(topItemsByValueData.message);
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
                <Title text="Métricas" icon="graph-up-arrow" className="mb-4" />

                {/* Inputs para seleção de datas */}
                <div className="row mb-4">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Data Inicial:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(formatToISODate(e.target.value))}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Data Final:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(formatToISODate(e.target.value))}
                        />
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        Erro ao carregar métricas: {error}
                    </div>
                )}

                <div className="row">
                    {/* Total Gasto */}
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

                    {/* Itens Mais Comprados */}
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
                                        {mostPurchased.map((item, index) => {
                                            return (
                                                <li className="list-group-item d-flex justify-content-between" key={index}>
                                                    <span>{item.name}</span>
                                                    <span className="badge bg-success">
                                                        {item.quantity && !isNaN(item.quantity) ? `${item.quantity} unidades` : 'Indefinido'}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p className="card-text">Sem dados</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Total de Itens Comprados */}
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

                    {/* Gasto Médio por Compra */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-info">
                            <div className="card-body">
                                <i className="bi bi-wallet2 fs-3 text-info mb-3"></i>
                                <h5 className="card-title">Gasto Médio por Compra</h5>
                                {loading ? (
                                    <div className="spinner-border text-info" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                ) : (
                                    <p className="card-text fs-5">
                                        {avgSpendPerPurchase !== null ? `R$ ${avgSpendPerPurchase.toFixed(2)}` : 'Sem dados'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Maior Compra */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-danger">
                            <div className="card-body">
                                <i className="bi bi-cash-coin fs-3 text-danger mb-3"></i>
                                <h5 className="card-title">Maior Compra</h5>
                                {loading ? (
                                    <div className="spinner-border text-danger" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                ) : (
                                    <p className="card-text fs-5">
                                        {largestPurchase !== null ? `R$ ${largestPurchase.toFixed(2)}` : 'Sem dados'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Gasto Diário Médio */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-dark">
                            <div className="card-body">
                                <i className="bi bi-calendar-day fs-3 text-dark mb-3"></i>
                                <h5 className="card-title">Gasto Diário Médio</h5>
                                {loading ? (
                                    <div className="spinner-border text-dark" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                ) : (
                                    <p className="card-text fs-5">
                                        {avgDailySpend !== null ? `R$ ${avgDailySpend.toFixed(2)}` : 'Sem dados'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Categorias de Compras */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-primary">
                            <div className="card-body">
                                <i className="bi bi-tags fs-3 text-primary mb-3"></i>
                                <h5 className="card-title">Categorias de Compras</h5>
                                {loading ? (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                ) : categoryPurchases.length > 0 ? (
                                    <ul className="list-group">
                                        {categoryPurchases.map((category, index) => (
                                            <li className="list-group-item d-flex justify-content-between" key={index}>
                                                <span>{category.categoryName}</span>
                                                <span className="badge bg-primary">
                                                    {category.totalSpent ? `R$ ${category.totalSpent.toFixed(2)}` : 'R$ 0.00'}
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

                    {/* Comparação de Gastos */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-primary">
                            <div className="card-body">
                                <i className="bi bi-bar-chart-line fs-3 text-primary mb-3"></i>
                                <h5 className="card-title">Comparação de Gastos</h5>
                                {loading ? (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                ) : comparisonSpent !== null ? (
                                    <p className="card-text fs-5">
                                        {comparisonSpent !== null ? `R$ ${comparisonSpent.toFixed(2)}` : 'Sem dados'}
                                    </p>
                                ) : (
                                    <p className="card-text">Sem dados</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Top Itens por Valor */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-warning">
                            <div className="card-body">
                                <i className="bi bi-box fs-3 text-warning mb-3"></i>
                                <h5 className="card-title">Top Itens por Valor</h5>
                                {loading ? (
                                    <div className="spinner-border text-warning" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                ) : topItemsByValue.length > 0 ? (
                                    <ul className="list-group">
                                        {topItemsByValue.map((item, index) => (
                                            <li className="list-group-item d-flex justify-content-between" key={index}>
                                                <span>{item.itemName}</span>
                                                <span className="badge bg-warning">
                                                    {item.totalValue ? `R$ ${item.totalValue.toFixed(2)}` : 'R$ 0.00'}
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
                </div>
            </div>
        </>
    );
};

export default Metrics;
