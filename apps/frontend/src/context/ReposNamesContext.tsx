import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchListOfReposNames } from '../hooks/api/useFetchListOfReposNames';

const ReposNamesContext = createContext<any>(undefined);

export const ListOfReposNamesProvider: React.FC<{ children: ReactNode; }> = ({ children }) =>
{
    const [listOfReposNames, setListOfReposNames] = useState([]);
    const [cursor, setCursor] = useState<string | undefined>(undefined);

    const fetchMoreReposNames = async () =>
    {
        await fetchListOfReposNames(setListOfReposNames, listOfReposNames, setCursor, cursor);
    };

    useEffect(() =>
    {
        fetchListOfReposNames(setListOfReposNames, listOfReposNames, setCursor, undefined);
    }, []);
    return (
        <ReposNamesContext.Provider value={{ listOfReposNames, cursor, fetchMoreReposNames }}>
            {children}
        </ReposNamesContext.Provider>
    );
};

export const useListOfReposNames = () =>
{
    const context = useContext(ReposNamesContext);
    if (!context) {
        throw new Error('useListOfReposNames must be used within a ListOfReposNamesProvider');
    }
    return context;
};
