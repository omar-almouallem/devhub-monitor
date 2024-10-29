import { useState } from 'react';
import moment from 'moment';

import useFetchPRsByDate from '../api/useFetchPRsByDate';
import { useListOfReposNames } from '../../context/ReposNamesContext';

const usePRsByDateActions = () => {
  const [selectedRepositories, setSelectedRepositories] = useState('');
  const [dates, setDates] = useState<[moment.Moment, moment.Moment] | null>(
    null,
  );

  const { filteredRepo, averageTime, fetchData } = useFetchPRsByDate(
    selectedRepositories,
    dates,
  );
  const { listOfReposNames, fetchMoreReposNames } = useListOfReposNames();

  const handleSelectChange = (repoName: string) => {
    setSelectedRepositories(repoName);
  };

  const handleFetchData = async () => {
    await fetchData();
  };
  const handleLoadMore = () => {
    fetchMoreReposNames();
  };

  return {
    selectedRepositories,
    dates,
    filteredRepo,
    handleSelectChange,
    handleFetchData,
    setDates,
    listOfReposNames,
    handleLoadMore,
    averageTime,
  };
};

export default usePRsByDateActions;
