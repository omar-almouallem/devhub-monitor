import { useState } from 'react';
import { message } from 'antd';

import { getAveragePRsByRepo } from '../../services/averagePRs.service';

import { handleApiError } from './handleApiError';

const useFetchPRsByRepo = () => {
  const [filteredRepo, setFilteredRepo] = useState([]);
  const [averagePRs, setAveragePRs] = useState<any>(null);

  const fetchPRsByRepo = async (selectedRepositories: string[]) => {
    try {
      const res = await getAveragePRsByRepo(selectedRepositories);
      setFilteredRepo(res.data);
      if (res.status === 204) {
        message.error('No pull requests found !');
      }
      if (res.status === 200) {
        message.success(' Data fetched successfully');

        setAveragePRs(res.data);
      }
    } catch (e) {
      if (e instanceof Error) {
        handleApiError(e);
      }
    }
  };

  return {
    filteredRepo,
    averagePRs,
    fetchPRsByRepo,
  };
};

export default useFetchPRsByRepo;
