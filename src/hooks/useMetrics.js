import { useEffect, useState } from 'react';
import purchaseService from '../services/purchaseService';

const useMetrics = (startDate, endDate) => {
    const [metrics, setMetrics] = useState({
        totalSpent: null,
        mostPurchased: [],
        itemsPurchased: null,
        avgSpendPerPurchase: null,
        largestPurchase: null,
        avgDailySpend: null,
        categoryPurchases: [],
        comparisonSpent: [],
        topItemsByValue: [],
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);    

    useEffect(() => {
        if (!startDate || !endDate) {
            setError('Datas inválidas fornecidas.');
            return;
        }

        const loadMetrics = async () => {
            setLoading(true);
            setError(null);
            try {
                const [
                    totalSpentData,
                    mostPurchasedData,
                    itemsPurchasedData,
                    avgSpendPerPurchaseData,
                    largestPurchaseData,
                    avgDailySpendData,
                    categoryPurchasesData,
                    topItemsByValueData,
                ] = await Promise.all([
                    purchaseService.getTotalSpent(startDate, endDate),
                    purchaseService.getMostPurchased(5),
                    purchaseService.getItemsPurchased(startDate, endDate),
                    purchaseService.getAvgSpendPerPurchase(startDate, endDate),
                    purchaseService.getLargestPurchase(startDate, endDate),
                    purchaseService.getAvgDailySpend(startDate, endDate),
                    purchaseService.getCategoryPurchases(startDate, endDate),
                    purchaseService.getTopItemsByValue(startDate, endDate),
                ]);

                setMetrics({
                    totalSpent: totalSpentData.success ? totalSpentData.totalSpent : null,
                    mostPurchased: mostPurchasedData.success ? mostPurchasedData.mostPurchased : [],
                    itemsPurchased: itemsPurchasedData.success ? itemsPurchasedData.itemsPurchased : null,
                    avgSpendPerPurchase: avgSpendPerPurchaseData.success ? avgSpendPerPurchaseData.avgSpendPerPurchase : null,
                    largestPurchase: largestPurchaseData.success ? largestPurchaseData.largestPurchase : null,
                    avgDailySpend: avgDailySpendData.success ? avgDailySpendData.avgDailySpend : null,
                    categoryPurchases: categoryPurchasesData.success ? categoryPurchasesData.categoryPurchases : [],
                    topItemsByValue: topItemsByValueData.success ? topItemsByValueData.topItemsByValue : [],
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadMetrics();
    }, [startDate, endDate]);

    return { ...metrics, error, loading };
};

export default useMetrics;