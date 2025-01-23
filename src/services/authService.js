// Função para salvar o token no localStorage
export const saveAuthToken = (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', JSON.stringify(user.userId))
};

// Função para obter o token do localStorage
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const getUserId = () => {    
    return localStorage.getItem('userId');
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
    return localStorage.getItem('authToken');
};

// Função para limpar a autenticação (logout)
export const clearAuth = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
};
