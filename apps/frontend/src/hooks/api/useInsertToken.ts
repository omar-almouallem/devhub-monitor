import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { handleApiError } from './handleApiError';
import { saveGithubToken } from '../../services/userData.service';

export const useInsertTokenApi = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveGithubToken = async (githubToken: string) => {
    setLoading(true);
    try {
      await saveGithubToken(githubToken);
      navigate('/dashboard');

      message.success('Token saved successfully');
    } catch (e: any) {
      handleApiError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSaveGithubToken,
    loading,
  };
};
