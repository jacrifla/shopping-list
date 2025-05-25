import { URL_BASE } from "../utils/base";
import fetchWrapper from "../utils/fetchWrapper";

const ENDPOINT = `${URL_BASE}/markets`;

const MarketService = {
    createMarket: async (marketName) => {
        return await fetchWrapper(`${ENDPOINT}`, {
            method: 'POST',
            body: JSON.stringify({ marketName }),
        });
    },

    getAllMarkets: async () => {
        return await fetchWrapper(`${ENDPOINT}`, {
            method: 'GET',
        });
    },

    updateMarket: async (marketId, marketName) => {
        return await fetchWrapper(`${ENDPOINT}/${marketId}`, {
            method: 'PUT',
            body: JSON.stringify({ marketName }),
        });
    },

    deleteMarket: async (marketId) => {
        return await fetchWrapper(`${ENDPOINT}/${marketId}`, {
            method: 'DELETE',
        });
    }
};

export default MarketService;
