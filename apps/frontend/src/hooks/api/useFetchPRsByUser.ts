import { useState } from 'react';
import { message } from 'antd';

import { filterPullRequestsByUser } from '../../services/auth.service';
import { handleApiError } from './handleApiError';

const useFetchPRsByUser = () => {
  const [filteredPRs, setFilteredPRs] = useState<any>({
    repositories: [],
    overallAveragePullRequestTime: null,
  });

  const fetchPRsByUser = async (userId: string, username: string) => {
    try {
      const result = await filterPullRequestsByUser(userId, username);
      setFilteredPRs(result.data);
      message.success(`Filtered pull requests by user: ${username}`);
      if (result.status === 400) {
        message.error('No pull requests found !');
      }
    } catch (e: any) {
      handleApiError(e);
    }
  };

  return {
    filteredPRs,
    fetchPRsByUser,
  };
};

export default useFetchPRsByUser;
