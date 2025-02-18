import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Title from '../components/Title';
import purchaseService from '../services/purchaseService';
import { formatToISODate } from '../utils/functions';
import Input from '../components/Input';

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
                if (comparisonSpentData.status) {
                    setComparisonSpent(comparisonSpentData.data);

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
                        <Input
                            label='Data Inicial:'
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(formatToISODate(e.target.value))}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label='Data Final:'
                            type="date"
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
                        <div className="card shadow-lg border-primary">
                            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Total Gasto</h5>
                                <i className="bi bi-cash fs-3"></i>
                            </div>
                            <div className="card-body">
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

                    {/* Total de Itens Comprados */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-lg border-warning">
                            <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Total de Itens Comprados</h5>
                                <i className="bi bi-cart-check fs-3"></i>
                            </div>
                            <div className="card-body">
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
                        <div className="card shadow-lg border-info">
                            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Gasto Médio por Compra</h5>
                                <i className="bi bi-wallet2 fs-3"></i>
                            </div>
                            <div className="card-body">
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
                        <div className="card shadow-lg border-danger">
                            <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Maior Gasto de um Item</h5>
                                <i className="bi bi-cash-coin fs-3"></i>
                            </div>
                            <div className="card-body">
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
                        <div className="card shadow-lg border-dark">
                            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Gasto Diário Médio</h5>
                                <i className="bi bi-calendar-day fs-3"></i>
                            </div>
                            <div className="card-body">
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

                    {/* Itens Mais Comprados */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-lg border-success">
                            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Itens Mais Comprados</h5>
                                <i className="bi bi-basket fs-3"></i>
                            </div>
                            <div className="card-body">
                                {loading ? (
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                ) : mostPurchased.length > 0 ? (
                                    <ul className="list-group">
                                        {mostPurchased.map((item, index) => {
                                            const isKg = item.quantity && (item.quantity.toString().includes('.') || item.quantity.toString().includes(','));
                                            const unit = isKg ? 'kg' : 'unidades';
                                            return (
                                                <li className="list-group-item d-flex justify-content-between" key={index}>
                                                    <span>{item.name}</span>
                                                    <span className="badge bg-success">
                                                        {item.quantity && !isNaN(item.quantity) ? `${item.quantity} ${unit}` : 'Indefinido'}
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

                    {/* Categorias de Compras */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-lg border-primary">
                            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Categorias de Compras</h5>
                                <i className="bi bi-tags fs-3"></i>
                            </div>
                            <div className="card-body">
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

                    {/* Top Itens por Valor */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-lg border-warning">
                            <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Top Itens por Valor</h5>
                                <i className="bi bi-box fs-3"></i>
                            </div>
                            <div className="card-body">
                                {loading ? (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border text-warning" role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                    </div>
                                ) : topItemsByValue.length > 0 ? (
                                    <div>
                                        {topItemsByValue.map((item, index) => (
                                            <div key={index} className="mb-3 p-3 border rounded-3 shadow-sm bg-light">
                                                <h6 className="fw-bold">{item.itemName}</h6>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>
                                                        <strong>Valor Total:</strong>
                                                        {item.totalValue ? `R$ ${item.totalValue.toFixed(2)}` : 'R$ 0.00'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="card-text text-center">Sem dados</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Comparação de Gastos */}
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card shadow-lg border-primary">
                            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Comparação de Gastos</h5>
                                <i className="bi bi-bar-chart-line fs-3"></i>
                            </div>
                            <div className="card-body">
                                {loading ? (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                    </div>
                                ) : comparisonSpent && comparisonSpent.length > 0 ? (
                                    <div>
                                        {comparisonSpent.map((item, index) => (
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
                                    </div>
                                ) : (
                                    <p className="card-text text-center">Sem dados</p>
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
