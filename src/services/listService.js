import { getUserId } from '../services/authService';
import { URL_BASE } from "../utils/base";

const API_URL = `${URL_BASE}/list`;
const API_URL_SHARE_LIST = `${URL_BASE}/shared-list-tokens`;

const List = {
    createList: async (listName) => {
        const userId = getUserId();
        if (!userId) {
            throw new Error('Usuário não autenticado');
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, listName }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao criar lista');
            }

            return responseData.data;
        } catch (error) {
            console.error('Erro ao criar lista:', error);
            throw error;
        }
    },

    getAllLists: async () => {
        try {
            const response = await fetch(`${API_URL}/find-all`);
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao listar listas');
            }

            return responseData.data;
        } catch (error) {
            console.error('Erro ao listar listas:', error);
            throw error;
        }
    },

    getListsByUserId: async () => {
        const userId = getUserId();
        if (!userId) {
            throw new Error('Usuário não autenticado');
        }

        try {
            const response = await fetch(`${API_URL}/${userId}`);

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao listar as listas do usuário');
            }

            return responseData.data;
        } catch (error) {
            console.error('Erro ao listar as listas do usuário:', error);
            throw error;
        }
    },

    updateList: async (listId, listName) => {
        try {
            const response = await fetch(`${API_URL}/${listId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ listName }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao atualizar lista');
            }

            return responseData.data;
        } catch (error) {
            console.error('Erro ao atualizar lista:', error);
            throw error;
        }
    },

    markAsCompleted: async (listId, totalAmount) => {
        if (!listId || totalAmount == null) {
            throw new Error('ID da lista e o total da lista são obrigatórios');
        }

        try {
            const response = await fetch(`${API_URL}/mark/${listId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ totalAmount }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao marcar como concluída');
            }

            return data;
        } catch (error) {
            console.error('Erro ao marcar como concluída:', error.message);
            throw error;
        }
    },

    deleteList: async (listId) => {
        try {
            const response = await fetch(`${API_URL}/${listId}`, {
                method: 'DELETE',
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao excluir lista');
            }

            return responseData.data;
        } catch (error) {
            console.error('Erro ao excluir lista:', error);
            throw error;
        }
    },

    generateShareToken: async (listId) => {
        try {
            if (!listId) throw new Error("O ID da lista é obrigatório.");

            const response = await fetch(`${API_URL_SHARE_LIST}/generate-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ listId }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao gerar token de compartilhamento.');
            }

            const data = await response.json();
            return data.data; // Retorna o token e expiresAt
        } catch (error) {
            console.error('Erro em generateShareToken:', error);
            throw error;
        }
    },

    acceptShareToken: async (token) => {
        const userId = getUserId();
        try {
            if (!userId || !token) throw new Error("O ID do usuário e o token são obrigatórios.");            

            const response = await fetch(`${API_URL_SHARE_LIST}/accept-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, token }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao aceitar token de compartilhamento.');
            }

            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Erro em acceptShareToken:', error);
            throw error;
        }
    },
};

export default List;