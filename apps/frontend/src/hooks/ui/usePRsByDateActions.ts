import { useState } from 'react';
import { message } from 'antd';
import moment from 'moment';

import useFetchPRsByDate from '../api/useFetchPRsByDate';

const usePRsByDateActions = (userData: any) => {
  const [projectName, setProjectName] = useState<string>('');
  const [dates, setDates] = useState<[moment.Moment, moment.Moment] | null>(
    null,
  );

  const { pullRequestsData, fetchData } = useFetchPRsByDate(
    userData._id,
    projectName,
    dates,
  );

  const handleSelectChange = (repoName: string) => {
    setProjectName(repoName);
  };

  const handleFetchData = async () => {
    await fetchData();
  };

  return {
    projectName,
    dates,
    pullRequestsData,
    handleSelectChange,
    handleFetchData,
    setDates,
  };
};

export default usePRsByDateActions;
