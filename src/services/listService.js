
import { URL_BASE } from "../utils/base";

const API_URL = `${URL_BASE}/list`;

export const createList = async (userId, listName) => {
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
};

export const getAllLists = async () => {
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
};

export const getListsByUserId = async (userId) => {
    
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
};

export const updateList = async (listId, listName) => {
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
};

export const markListAsCompleted = async (listId, items) => {
    const sanitizedItems = items.map((item) => ({
        ...item,
        unitPrice: item.unitPrice ?? 0,
    }));

    const totalAmount = sanitizedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    try {
        const response = await fetch(`${API_URL}/mark/${listId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalAmount }),
        });

        const result = await response.json();
        
        if (result.status) {
            return {
                success: true,
                message: `Lista marcada como concluída! Total gasto: R$ ${totalAmount.toFixed(2)}`,
            };
        } else {
            return {
                success: false,
                message: result.message || 'Erro ao marcar a lista como concluída.',
            };
        }
    } catch (error) {
        console.error('Erro ao marcar como concluído:', error);
        return {
            success: false,
            message: 'Erro ao marcar a lista como concluída. Tente novamente mais tarde.',
        };
    }
};

export const deleteList = async (listId) => {
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
};
