import { URL_BASE } from "../utils/base";
import fetchWrapper from "../utils/fetchWrapper";

const API_URL = `${URL_BASE}/unit`;

const UnitService = {
    createUnit: async (unitName) => {
        return await fetchWrapper(`${API_URL}`, {
            method: "POST",
            body: JSON.stringify({ unitName }),
        });
    },

    findAllUnits: async () => {
        return await fetchWrapper(`${API_URL}/all`, {
            method: 'GET',
        });
    },

    updateUnit: async (unitId, unitName) => {
        return await fetchWrapper(`${API_URL}/${unitId}`, {
            method: 'PUT',
            body: JSON.stringify({ unitName }),
        });
    },

    deleteUnit: async (unitId) => {
        return await fetchWrapper(`${API_URL}/${unitId}`, {
            method: 'DELETE',
        });
    },
};

export default UnitService;
