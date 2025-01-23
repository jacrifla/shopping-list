import { URL_BASE } from "../utils/base";
const API_URL = `${URL_BASE}/list-item`;

const ListItem = {
    creatListItem: async (itemData) => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemData),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Erro ao criar item:", error);
            throw error;
        }
    },

    getItemsByListId: async (listId) => {
        try {
            const response = await fetch(`${API_URL}/${listId}`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
            throw error;
        }
    },

    updateListItem: async (itemListId, itemData) => {
        try {
            const response = await fetch(`${API_URL}/${itemListId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemData),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Erro ao atualizar item:", error);
            throw error;
        }
    },

    deleteListItem: async (itemListId) => {
        try {
            const response = await fetch(`${API_URL}/${itemListId}`, {
                method: "DELETE",
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Erro ao deletar item:", error);
            throw error;
        }
    },

    markAsPurchased: async (purchaseData) => {
        try {
            const response = await fetch(`${API_URL}/purchased`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(purchaseData),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Erro ao marcar item como comprado:", error);
            throw error;
        }
    },
};
export default ListItem;