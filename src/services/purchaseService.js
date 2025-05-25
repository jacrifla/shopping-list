import fetchWrapper from "../utils/fetchWrapper";
import { URL_BASE } from "../utils/base";
import { getUserId } from "./authService";

const API_URL = `${URL_BASE}/purchase`;

// Helper para montar query string com params opcionais
const buildQuery = (params) => {
  return (
    "?" +
    Object.entries(params)
      .filter(([_, v]) => v !== undefined && v !== null) // só inclui params com valor definido
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&")
  );
};

const Purchase = {
  createPurchase: async (itemId, quantity, price, marketId) => {
    const userId = getUserId();
    const body = { itemId, userId, quantity, price };
    if (marketId) body.marketId = marketId;

    return await fetchWrapper(API_URL, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  getTotalSpent: async (startDate, endDate, marketId) => {
    const userId = getUserId();
    const query = buildQuery({ userId, startDate, endDate, marketId });
    return await fetchWrapper(`${API_URL}/total-spent${query}`);
  },

  getMostPurchased: async (limit, marketId) => {
    const userId = getUserId();
    const query = buildQuery({ userId, limit, marketId });
    const data = await fetchWrapper(`${API_URL}/most-purchased${query}`);

    return {
      mostPurchased: data.map((item) => ({
        name: item.itemName,
        quantity: parseFloat(item.totalQuantity),
      })),
    };
  },

  getItemsPurchased: async (startDate, endDate, marketId) => {
    const userId = getUserId();
    const query = buildQuery({ userId, startDate, endDate, marketId });
    return await fetchWrapper(`${API_URL}/items-purchased${query}`);
  },

  getAvgSpendPerPurchase: async (startDate, endDate, marketId) => {
    const userId = getUserId();
    const query = buildQuery({ userId, startDate, endDate, marketId });
    return await fetchWrapper(`${API_URL}/avg-spend-per-purchase${query}`);
  },

  getLargestPurchase: async (startDate, endDate, marketId) => {
    const userId = getUserId();
    const query = buildQuery({ userId, startDate, endDate, marketId });
    return await fetchWrapper(`${API_URL}/largest-purchase${query}`);
  },

  getAvgDailySpend: async (startDate, endDate, marketId) => {
    const userId = getUserId();
    const query = buildQuery({ userId, startDate, endDate, marketId });
    return await fetchWrapper(`${API_URL}/avg-daily-spend${query}`);
  },

  getCategoryPurchases: async (startDate, endDate, marketId) => {
    const userId = getUserId();
    const query = buildQuery({ userId, startDate, endDate, marketId });
    return await fetchWrapper(`${API_URL}/category-purchases${query}`);
  },

  getComparisonSpent: async (startDate, endDate, limit, offset, marketId) => {
    const userId = getUserId();
    const query = buildQuery({ userId, startDate, endDate, limit, offset, marketId });
    return await fetchWrapper(`${API_URL}/comparison-spent${query}`);
  },

  getTopItemsByValue: async (startDate, endDate, marketId) => {
    const userId = getUserId();
    const query = buildQuery({ userId, startDate, endDate, marketId });
    return await fetchWrapper(`${API_URL}/top-items-by-value${query}`);
  },
};

export default Purchase;
