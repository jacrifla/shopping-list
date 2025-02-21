import { useEffect, useState } from 'react';
import purchaseService from '../services/purchaseService';

const useComparisonSpent = (startDate, endDate, page, limit) => {
    const [comparisonSpent, setComparisonSpent] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadComparisonSpent = async () => {
            setLoading(true);
            setError(null);
            try {
                const offset = (page - 1) * limit;
                const comparisonSpentData = await purchaseService.getComparisonSpent(startDate, endDate, limit, offset);

                if (comparisonSpentData.status) {
                    setComparisonSpent(prevItems => [...prevItems, ...comparisonSpentData.data]);
                } else {
                    setError(comparisonSpentData.error || "Erro ao carregar dados.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadComparisonSpent();
    }, [startDate, endDate, page, limit]);

    return { comparisonSpent, error, loading };
};

export default useComparisonSpent;