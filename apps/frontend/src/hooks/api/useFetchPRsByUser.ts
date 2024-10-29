import { useEffect, useState } from 'react';
import { message } from 'antd';

import {
  getPRsByUser,
  getPRsUsersLogin,
} from '../../services/userData.service';
import { getAveragePRsByUser } from '../../services/averagePRs.service';

import { handleApiError } from './handleApiError';

const useFetchPRsByUser = () => {
  const [filteredPRs, setFilteredPRs] = useState([]);
  const [averageTime, setAverageTime] = useState<any>(null);
  const [listOfNames, setListOfNames] = useState<string[]>([]);
  const fetchPRsUsersLogin = async () => {
    try {
      const response = await getPRsUsersLogin();
      if (response.status === 204) {
        setListOfNames([]);
      } else {
        setListOfNames(response.data);
      }
    } catch (e: any) {
      handleApiError(e);
    }
  };

  const fetchPRsByUser = async (username: string) => {
    try {
      const averageResult = await getAveragePRsByUser(username);
      setAverageTime(averageResult.data);

      const pullRequestsResult = await getPRsByUser(username);

      setFilteredPRs(pullRequestsResult);
      message.success(`Filtered pull requests by user: ${username}`);

      if (pullRequestsResult.status === 400 || averageResult.status === 400) {
        message.error('No pull requests found!');
      }
    } catch (e: any) {
      handleApiError(e);
    }
  };
  useEffect(() => {
    fetchPRsUsersLogin();
  }, []);

  return {
    listOfNames,
    filteredPRs,
    averageTime,
    fetchPRsByUser,
  };
};

export default useFetchPRsByUser;
