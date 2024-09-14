import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps
{
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode; }> = ({ children }) =>
{
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    {
        const token = localStorage.getItem('accessToken');
        return !!token;
    });

    useEffect(() =>
    {
        if (isAuthenticated) {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setIsAuthenticated(false);
            }
        } else {
            localStorage.removeItem('accessToken');
        }
    }, [isAuthenticated]);

    const login = () => setIsAuthenticated(true);
    const logout = () =>
    {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
{
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
