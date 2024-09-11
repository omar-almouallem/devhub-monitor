import { useState } from 'react';
import { message } from 'antd';

import { saveGithubToken } from '../../services/auth.service';
import { useUserData } from '../../context/UserDataContext';
import { handleApiError } from './handleApiError';

export const useInsertTokenApi = () => {
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);

  const handleSaveGithubToken = async (githubToken: string) => {
    setLoading(true);
    try {
      await saveGithubToken(userData._id, githubToken);
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
