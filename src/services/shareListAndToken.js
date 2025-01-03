import { URL_BASE } from "../utils/base";

const API_URL = `${URL_BASE}/shared-list-tokens`;


// Função para gerar o token
export const generateToken = async (listId, userId) => {
    try {
        const response = await fetch(`${API_URL}/generate-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ listId, userId }),
        });

        if (!response.ok) {
            throw new Error('Erro ao gerar o token');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao gerar o token:', error);
        throw error;
    }
};

// Função para conceder acesso ao usuário
export const grantAccess = async (token, userId) => {    
    try {
        const response = await fetch(`${API_URL}/grant-access`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, userId }),
        });
        

        if (!response.ok) {
            throw new Error('Erro ao conceder acesso');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const findToken = async (token) => {
    try {
        const response = await fetch(`${API_URL}/find-token/${token}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        throw error;
    }
};

export const revokeToken = async (token) => {
    try {
        const response = await fetch(`${API_URL}/revoke-token/${token}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao revogar compartilhamento:', error);
        throw error;
    }
};

export const findAllTokens = async () => {
    try {
        const response = await fetch(`${API_URL}/find-all-tokens`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao listar tokens:', error);
        throw error;
    }
};