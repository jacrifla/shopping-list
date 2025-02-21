import { URL_BASE } from "../utils/base";
import { getUserId } from "./authService";

const API_URL = `${URL_BASE}/items`;

const ItemsService = {
    createItem: async (name, categoryId, brandId, barcode) => {
        const userId = getUserId();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, categoryId, brandId, barcode, userId }),
            });
            const result = await response.json();
            if (response.ok) {
                return result.data;
            } else {
                throw new Error(result.message)
            }
        } catch (error) {
            throw error;
        }
    },

    updateItem: async (itemId, name, categoryId, brandId, barcode) => {
        const updatedBy = getUserId();
        try {
            const response = await fetch(`${API_URL}/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, categoryId, brandId, barcode, updatedBy }),
            });
            const result = await response.json();
            if (response.ok) {
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            throw error;
        }
    },

    deleteItem: async (itemId) => {
        try {
            const response = await fetch(`${API_URL}/${itemId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (response.ok) {
                return result;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            throw error;
        }
    },

    getItemByBarcodeName: async (searchTerm) => {
        try {
            const response = await fetch(`${API_URL}/search/${searchTerm}`);
            const result = await response.json();
            if (response.ok) {
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            throw error;
        }
    },

    getItemById: async (itemId) => {
        try {
            const response = await fetch(`${API_URL}/${itemId}`);
            const result = await response.json();
            if (response.ok) {
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            throw error;
        }
    },

    getAllItems: async () => {
        try {
            const response = await fetch(`${API_URL}/all`);
            const result = await response.json();
            if (response.ok) {
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            throw error;
        }
    }
};

export default ItemsService;