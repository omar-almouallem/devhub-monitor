import { useState } from 'react';
import { message } from 'antd';

import { getAveragePullRequestsByProjects } from '../../services/auth.service';
import { handleApiError } from './handleApiError';

const useFetchPRsByRepo = () => {
  const [averagePRs, setAveragePRs] = useState<any>(null);

  const fetchPRsByRepo = async (
    userId: string,
    selectedRepositories: string[],
  ) => {
    try {
      const res = await getAveragePullRequestsByProjects(
        userId,
        selectedRepositories,
      );

      if (res.status === 204) {
        message.error('No pull requests found !');
      }
      if (res.status === 200) {
        message.success(' Data fetched successfully');

        setAveragePRs(res.data);
      }
    } catch (e: any) {
      handleApiError(e);
    }
  };

  return {
    averagePRs,
    fetchPRsByRepo,
  };
};

export default useFetchPRsByRepo;
