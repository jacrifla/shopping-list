import { URL_BASE } from "../utils/base";

const API_URL = `${URL_BASE}/items`;

export const createItem = async (productName, categoryId, brandId, barcode) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_name: productName,
                category_id: categoryId,
                brand_id: brandId,
                barcode
            })
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao criar o item');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

export const updateItem = async (itemId, productName, categoryId, brandId, barcode) => {
    try {
        const response = await fetch(`${API_URL}/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_name: productName,
                category_id: categoryId,
                brand_id: brandId,
                barcode
            })
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao atualizar o item');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

export const findAllItems = async () => {
    try {
        const response = await fetch(`${API_URL}/all`, {
            method: 'GET',
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao listar os itens');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

export const deleteItem = async (itemId) => {
    try {
        const response = await fetch(`${API_URL}/${itemId}`, {
            method: 'DELETE',
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao excluir o item');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

export const findItemById = async (itemId) => {
    try {
        const response = await fetch(`${API_URL}/${itemId}`, {
            method: 'GET',
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao buscar o item');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

export const searchItemsByName = async (productName) => {
    try {
        const response = await fetch(`${API_URL}/search/name?product_name=${encodeURIComponent(productName)}`, {
            method: 'GET',
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao buscar itens por nome');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

export const searchItemsByBarcode = async (barcode) => {
    try {
        const response = await fetch(`${API_URL}/search/barcode?barcode=${encodeURIComponent(barcode)}`, {
            method: 'GET',
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao buscar itens por código de barras');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};

export const findAllItemsWithPagination = async (limit = 10, offset = 0) => {
    try {
        const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`, {
            method: 'GET',
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Erro ao buscar itens com paginação');
        }
        return responseData.data;
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
};