import { useState } from 'react';
import useFetchPRsByRepo from '../api/useFetchPRsByRepo';
import { useListOfReposNames } from '../../context/ReposNamesContext';

const usePRsByRepoActions = () => {
  const [selectedRepositories, setSelectedRepositories] = useState<string[]>(
    [],
  );
  const { averagePRs, fetchPRsByRepo } = useFetchPRsByRepo();

  const { listOfReposNames, fetchMoreReposNames } = useListOfReposNames();

  const handleSelectChange = (repoNames: string[]) => {
    setSelectedRepositories(repoNames);
  };

  const handleCalculateAverage = () => {
    fetchPRsByRepo(selectedRepositories);
  };

  const handleLoadMore = () => {
    fetchMoreReposNames();
  };

  return {
    selectedRepositories,
    averagePRs,
    handleSelectChange,
    handleCalculateAverage,
    listOfReposNames,
    handleLoadMore,
  };
};

export default usePRsByRepoActions;
