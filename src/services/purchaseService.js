import { URL_BASE } from "../utils/base";
import { getUserId } from "./authService";

const API_URL = `${URL_BASE}/purchase`;

const Purchase = {
    createPurchase: async (itemId, quantity, price) => {
        try {
            const userId = getUserId();
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, userId, quantity, price }),
            });

            const data = await response.json();
            if (response.ok) {
                return { success: true, message: data.message, purchase: data.data };
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getTotalSpent: async (startDate, endDate) => {
        try {
            const userId = getUserId();
            const response = await fetch(`${API_URL}/total-spent?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();

            if (response.ok) {
                return { success: true, totalSpent: parseFloat(data.data.totalSpent) };
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getMostPurchased: async (limit) => {
        try {
            const userId = getUserId();
            const response = await fetch(`${API_URL}/most-purchased?userId=${userId}&limit=${limit}`);
            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    mostPurchased: data.data.map(item => ({
                        name: item.itemName,
                        quantity: parseFloat(item.totalQuantity),
                    })),
                };
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getItemsPurchased: async (startDate, endDate) => {
        try {
            const userId = getUserId();
            const response = await fetch(`${API_URL}/items-purchased?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();

            if (response.ok) {
                return { success: true, itemsPurchased: parseInt(data.data.totalQuantity, 10) };
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getAvgSpendPerPurchase: async (startDate, endDate) => {
        try {
            const userId = getUserId();
            const response = await fetch(`${API_URL}/avg-spend-per-purchase?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();

            if (response.ok) {
                return { success: true, avgSpendPerPurchase: parseFloat(data.data.avgSpendPerPurchase) };
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getLargestPurchase: async (startDate, endDate) => {
        try {
            const userId = getUserId();
            const response = await fetch(`${API_URL}/largest-purchase?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();

            if (response.ok) {
                return { success: true, largestPurchase: parseFloat(data.data) };
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getAvgDailySpend: async (startDate, endDate) => {
        try {
            const userId = getUserId();
            const response = await fetch(`${API_URL}/avg-daily-spend?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();

            if (response.ok) {
                return { success: true, avgDailySpend: parseFloat(data.data.avgDailySpend) };
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getCategoryPurchases: async (startDate, endDate) => {
        try {
            const userId = getUserId();
            const response = await fetch(`${API_URL}/category-purchases?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    categoryPurchases: data.data
                };
                
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getComparisonSpent: async (startDate, endDate, limit, offset) => {
        try {
            const userId = getUserId();
            const response = await fetch(`${API_URL}/comparison-spent?userId=${userId}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&offset=${offset}`);
            const responseData = await response.json();

            if (response.ok && responseData && responseData.data.length > 0) {
                return responseData;
            } else {
                throw new Error(responseData.error || "Erro desconhecido");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getTopItemsByValue: async (startDate, endDate) => {
        try {
            const userId = getUserId();
            const response = await fetch(`${API_URL}/top-items-by-value?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();

            if (response.ok) {
                return { success: true, topItemsByValue: data.data };
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default Purchase;
