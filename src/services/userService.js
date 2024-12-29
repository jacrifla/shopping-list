import { URL_BASE } from "../utils/base";

const API_URL = `${URL_BASE}/user`;

// Função para criar um novo usuário
export const createUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao criar usuário');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

// Função para buscar um usuário pelo e-mail
export const getUserByEmail = async (email) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            })
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao buscar usuário por e-mail');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

// Função para buscar um usuário pelo ID
export const getUserById = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'GET',
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao buscar usuário por ID');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

// Função para atualizar informações do usuário
export const updateUser = async (userId, name, email) => {
    try {
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
            }),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao atualizar usuário');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

// Função para deletar usuário
export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'DELETE',
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao deletar usuário');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

// Função para restaurar um usuário deletado
export const restoreUser = async (email) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao restaurar usuário');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

// Função para fazer login
export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao fazer login');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

// Função para resetar a senha
export const resetPassword = async (email, newPassword) => {
    try {
        const response = await fetch(`${API_URL}/reset-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                newPassword,
            }),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao resetar a senha');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};
