import { useState } from 'react';
import { message } from 'antd';

import { getAveragePRsByRepo } from '../../services/userData.service';
import { handleApiError } from './handleApiError';

const useFetchPRsByRepo = () => {
  const [averagePRs, setAveragePRs] = useState<any>(null);

  const fetchPRsByRepo = async (selectedRepositories: string[]) => {
    try {
      const res = await getAveragePRsByRepo(selectedRepositories);

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
