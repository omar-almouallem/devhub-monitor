import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useGithubUi = (
  handleSaveGithubToken: (token: string) => Promise<void>,
) => {
  const [githubToken, setGithubToken] = useState('');
  const navigate = useNavigate();

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubToken(e.target.value);
  };

  const handleSubmit = async () => {
    await handleSaveGithubToken(githubToken);
    navigate('/dashboard');
  };

  return {
    githubToken,
    handleTokenChange,
    handleSubmit,
  };
};
