import { useState } from 'react';
import { message } from 'antd';
import moment from 'moment';

import { getAveragePRsByDate } from '../../services/averagePRs.service';
import { getPRsByDate } from '../../services/userData.service';

import { handleApiError } from './handleApiError';

const useFetchPRsByDate = (
  projectName: string,
  dates: [moment.Moment, moment.Moment] | null,
) => {
  const [filteredRepo, setFilteredRepo] = useState([]);
  const [averageTime, setAverageTime] = useState<any>(null);

  const fetchData = async () => {
    if (!dates || dates.length !== 2) {
      message.error('Invalid date range provided');
      return;
    }

    try {
      const [startTime, endTime] = dates;
      const response = await getAveragePRsByDate(
        projectName,
        startTime.format('YYYY-MM-DD'),
        endTime.format('YYYY-MM-DD'),
      );
      const res = await getPRsByDate(
        projectName,
        startTime.format('YYYY-MM-DD'),
        endTime.format('YYYY-MM-DD'),
      );
      setFilteredRepo(res.data);
      if (response.status === 204) {
        message.error('No pull requests found !');
      }
      if (response.status === 200) {
        message.success('Data fetched successfully');
        setAverageTime(response.data);
      }
    } catch (e: any) {
      handleApiError(e);
    }
  };

  return { filteredRepo, averageTime, fetchData };
};

export default useFetchPRsByDate;
