import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchTokenStatus } from '../hooks/api/useFetchTokenStatus';


interface GitHubTokenStatus
{
    githubToken?: string;
    isVerified: boolean;
}

interface GitHubTokenStatusContextType
{
    gitHubTokenStatus: GitHubTokenStatus | null;
    setGitHubTokenStatus: React.Dispatch<React.SetStateAction<GitHubTokenStatus | null>>;
    resetTokenStatus: any;
}
const GitHubTokenStatusContext = createContext<GitHubTokenStatusContextType | undefined>(undefined);
export const GitHubTokenProvider: React.FC<{ children: ReactNode; }> = ({ children }) =>
{
    const [gitHubTokenStatus, setGitHubTokenStatus] = useState<GitHubTokenStatus | null>(null);

    useEffect(() =>
    {
        fetchTokenStatus(setGitHubTokenStatus);
    }, []);
    const resetTokenStatus = () =>
    {
        setGitHubTokenStatus(null);
    };

    return (
        <GitHubTokenStatusContext.Provider value={{ gitHubTokenStatus, setGitHubTokenStatus, resetTokenStatus }}>
            {children}
        </GitHubTokenStatusContext.Provider>
    );
};
export const useGitHubTokenStatus = () =>
{
    const context = useContext(GitHubTokenStatusContext);
    if (!context) {
        throw new Error('useGitHubTokenStatus must be used within a GitHubTokenProvider');
    }
    return context;
};
