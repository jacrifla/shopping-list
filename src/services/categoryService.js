import { URL_BASE } from "../utils/base";

const API_URL = `${URL_BASE}/category`;

const CategoryService = {
    createCategory: async (categoryName) => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryName })
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao criar a categoria');
            }

            return responseData.data;
        } catch (error) {
            console.error('Erro:', error.message);
            throw error;
        }
    },

    findAllCategories: async () => {
        try {
            const response = await fetch(`${API_URL}/all`, {
                method: 'GET',
            });

            const responseData = await response.json();            
            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao buscar as categorias');
            }
            return responseData.data;
        } catch (error) {
            console.error('Erro:', error.message);
            throw error;
        }
    },

    updateCategory: async (categoryId, categoryName) => {
        try {
            const response = await fetch(`${API_URL}/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryName })
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao atualizar a categoria');
            }
            return responseData.data;
        } catch (error) {
            console.error('Erro:', error.message);
            throw error;
        }
    },

    deleteCategory: async (categoryId) => {
        try {
            const response = await fetch(`${API_URL}/${categoryId}`, {
                method: 'DELETE',
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao deletar a categoria');
            }
            return responseData.data;
        } catch (error) {
            console.error('Erro:', error.message);
            throw error;
        }
    }
};

export default CategoryService;