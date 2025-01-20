import { URL_BASE } from "../utils/base";

const API_URL = `${URL_BASE}/brand`;

const BrandService = {
    createBrand: async (brandName) => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ brandName }),
            })

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            return responseData.data;
        } catch (error) {
            throw error;
        }
    },

    findAllBrands: async () => {
        try {
            const response = await fetch(`${API_URL}/all`, {
                method: 'GET',
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao buscar as marcas');
            }
            return responseData.data;
        } catch (error) {
            console.error('Erro:', error.message);
            throw error;
        }
    },

    updateBrand: async (brandId, brandName) => {
        try {
            const response = await fetch(`${API_URL}/${brandId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ brandName })
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao atualizar a marca');
            }
            return responseData.data;
        } catch (error) {
            console.error('Erro:', error.message);
            throw error;
        }
    },

    deleteBrand: async (brandId) => {
        try {
            const response = await fetch(`${API_URL}/${brandId}`, {
                method: 'DELETE',
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Erro ao deletar a marca');
            }
            return responseData.data;
        } catch (error) {
            console.error('Erro:', error.message);
            throw error;
        }
    },
};

export default BrandService;