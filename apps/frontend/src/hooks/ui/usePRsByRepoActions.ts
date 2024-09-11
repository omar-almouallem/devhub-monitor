import { useState } from 'react';

import useFetchPRsByRepo from '../api/useFetchPRsByRepo';

const usePRsByRepoActions = (userData: any) => {
  const [selectedRepositories, setSelectedRepositories] = useState<string[]>(
    [],
  );
  const { averagePRs, fetchPRsByRepo } = useFetchPRsByRepo();

  const handleSelectChange = (repoNames: string[]) => {
    setSelectedRepositories(repoNames);
  };

  const handleCalculateAverage = () => {
    fetchPRsByRepo(userData._id, selectedRepositories);
  };

  const repositoriesWithPRs = userData.gitHubRepoData.filter(
    (repo: any) => repo.pull_requests && repo.pull_requests.length > 0,
  );

  return {
    selectedRepositories,
    averagePRs,
    handleSelectChange,
    handleCalculateAverage,
    repositoriesWithPRs,
  };
};

export default usePRsByRepoActions;
