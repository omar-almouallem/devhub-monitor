import { useState } from 'react';
import moment from 'moment';

import { getAveragePRsByDate } from '../../services/userData.service';
import { message } from 'antd';
import { handleApiError } from './handleApiError';

const useFetchPRsByDate = (
  projectName: string,
  dates: [moment.Moment, moment.Moment] | null,
) => {
  const [pullRequestsData, setPullRequestsData] = useState<any>(null);

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
      if (response.status === 204) {
        message.error('No pull requests found !');
      }
      if (response.status === 200) {
        message.success('Data fetched successfully');
        setPullRequestsData(response.data);
      }
    } catch (e: any) {
      handleApiError(e);
    }
  };

  return { pullRequestsData, fetchData };
};

export default useFetchPRsByDate;
