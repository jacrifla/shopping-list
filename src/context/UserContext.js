import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserId } from '../services/authService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = () => {
            try {
                const id = getUserId();
                setUserId(id);
            } catch (error) {
                console.error("Erro ao obter o userId", error);
            }
        };

        fetchUserId();
    }, []);

    return (
        <UserContext.Provider value={userId}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);