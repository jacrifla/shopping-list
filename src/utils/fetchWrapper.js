const fetchWrapper = async (url, options = {}) => {
    try {
        const defaultHeaders = {
            "Content-Type": "application/json",
        };

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro na requisição.");
        }

        return data.data ?? data;
    } catch (error) {
        throw error;
    }
};

export default fetchWrapper;
