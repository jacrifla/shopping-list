import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken, getUserId } from '../services/authService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = () => {
            try {
                const id = getUserId();
                const token = getAuthToken();

                if (id && token) {
                    setUserId(id);
                } else {
                    setUserId(null);
                }
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