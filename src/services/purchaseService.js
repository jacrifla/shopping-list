import { URL_BASE } from "../utils/base";

const API_URL = `${URL_BASE}/purchase`;

const Purchase = {
    createPurchase: async (itemId, userId, quantity, price) => {
        try {
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
              return { success: false, message: data.error };
            }
          } catch (error) {
            return { success: false, message: error.message };
          }
    },

    getTotalSpent: async (userId, startDate, endDate) => {
        try {
            const response = await fetch(`${API_URL}/purchase/total-spent?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();
            if (response.ok) {
              return { success: true, totalSpent: data.data };
            } else {
              return { success: false, message: data.error };
            }
          } catch (error) {
            return { success: false, message: error.message };
          }
    },

    getMostPurchased: async (userId, limit) => {
        try {
            const response = await fetch(`${API_URL}/purchase/most-purchased?userId=${userId}&limit=${limit}`);
            const data = await response.json();
            if (response.ok) {
              return { success: true, mostPurchased: data.data };
            } else {
              return { success: false, message: data.error };
            }
          } catch (error) {
            return { success: false, message: error.message };
          }
    },

    getItemsPurchased: async (userId, startDate, endDate) => {
        try {
            const response = await fetch(`${API_URL}/purchase/items-purchased?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();
            if (response.ok) {
              return { success: true, itemsPurchased: data.data };
            } else {
              return { success: false, message: data.error };
            }
          } catch (error) {
            return { success: false, message: error.message };
          }
    }

};
export default Purchase;