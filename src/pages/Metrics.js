import React, { useState } from 'react';
import Header from '../components/Header';
import Title from '../components/Title';
import Input from '../components/Input';
import useMetrics from '../hooks/useMetrics';
import useComparisonSpent from '../hooks/useComparisonSpent';
import { formatToISODate } from '../utils/functions';
import MetricCard from '../components/MetricCard';
import MetricListCard from '../components/MetricListCard';
import ComparisonSpentCard from '../components/ComparisonSpentCard';

const Metrics = () => {
    const [startDate, setStartDate] = useState(formatToISODate(new Date(new Date().setDate(new Date().getDate() - 30))));
    const [endDate, setEndDate] = useState(formatToISODate(new Date()));
    const [page, setPage] = useState(1);
    const limit = 5;

    const {
        totalSpent,
        mostPurchased,
        itemsPurchased,
        avgSpendPerPurchase,
        largestPurchase,
        avgDailySpend,
        categoryPurchases,
        topItemsByValue,
        error,
        loading
    } = useMetrics(startDate, endDate);

    const { comparisonSpent, error: comparisonError, loading: comparisonLoading } = useComparisonSpent(startDate, endDate, page, limit);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

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

                {/* Renderização das métricas */}
                <div className="row">
                    {/* Total Gasto */}
                    <MetricCard
                        title="Total Gasto"
                        value={totalSpent !== null ? `R$ ${totalSpent.toFixed(2)}` : 'Sem dados'}
                        icon="cash"
                        loading={loading}
                        color="primary"
                    />

                    {/* Total de Itens Comprados */}
                    <MetricCard
                        title="Total de Itens Comprados"
                        value={itemsPurchased !== null ? itemsPurchased : 'Sem dados'}
                        icon="cart-check"
                        loading={loading}
                        color="warning"
                    />

                    {/* Gasto Médio por Compra */}
                    <MetricCard
                        title="Gasto Médio por Compra"
                        value={avgSpendPerPurchase !== null ? `R$ ${avgSpendPerPurchase.toFixed(2)}` : 'Sem dados'}
                        icon="wallet2"
                        loading={loading}
                        color="info"
                    />

                    {/* Maior Gasto de um Item */}
                    <MetricCard
                        title="Maior Gasto de um Item"
                        value={largestPurchase !== null ? `R$ ${largestPurchase.toFixed(2)}` : 'Sem dados'}
                        icon="cash-coin"
                        loading={loading}
                        color="danger"
                    />

                    {/* Gasto Diário Médio */}
                    <MetricCard
                        title="Gasto Diário Médio"
                        value={avgDailySpend !== null ? `R$ ${avgDailySpend.toFixed(2)}` : 'Sem dados'}
                        icon="calendar-day"
                        loading={loading}
                        color="dark"
                    />

                    {/* Itens Mais Comprados */}
                    <MetricListCard
                        title="Itens Mais Comprados"
                        items={mostPurchased}
                        loading={loading}
                        color="success"
                        itemNameKey="name"
                        itemValueKey="quantity"
                        valuePrefix="" // Remove o prefixo "R$" para quantidades
                    />

                    {/* Categorias de Compras */}
                    <MetricListCard
                        title="Categorias de Compras"
                        items={categoryPurchases}
                        loading={loading}
                        color="primary"
                        itemNameKey="categoryName"
                        itemValueKey="totalSpent"
                    />

                    {/* Top Itens por Valor */}
                    <MetricListCard
                        title="Top Itens por Valor"
                        items={topItemsByValue}
                        loading={loading}
                        color="warning"
                        itemNameKey="itemName"
                        itemValueKey="totalValue"
                    />

                    {/* Comparação de Gastos */}
                    <ComparisonSpentCard
                        title="Comparação de Gastos"
                        items={comparisonSpent}
                        loading={comparisonLoading}
                        error={comparisonError}
                        loadMore={loadMore}
                    />
                </div>
            </div>
        </>
    );
};

export default Metrics;