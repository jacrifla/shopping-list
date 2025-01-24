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
            console.log('Data: ',data);
            
            if (response.ok) {
                return { success: true, totalSpent: parseFloat(data.data) };
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
                return { success: true, itemsPurchased: parseInt(data.data, 10) }; // Converte string para número
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

};

export default Purchase;
