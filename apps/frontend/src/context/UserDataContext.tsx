import React, { createContext, useContext, useState, ReactNode } from 'react';


interface UserDataContextType
{
    userData: any | null;
    setUserData: React.Dispatch<React.SetStateAction<any | null>>;
}
const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: ReactNode | any; }> = ({ children }) =>
{
    const [userData, setUserData] = useState<any | null>(null);

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () =>
{
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error('useUserDart must be used within an userDataProvider');
    }
    return context;
};
