import { useState } from 'react';

import useFetchPRsByUser from '../api/useFetchPRsByUser';

const usePRsByUserActions = (userData: any) => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const { filteredPRs, fetchPRsByUser } = useFetchPRsByUser();

  const handleSelectChange = (username: string) => {
    setSelectedUser(username);
  };

  const handleFilterByUser = () => {
    fetchPRsByUser(userData._id, selectedUser);
  };

  const usersWithPRs: any[] = [
    ...new Set(
      userData.gitHubRepoData
        .filter(
          (repo: any) => repo.pull_requests && repo.pull_requests.length > 0,
        )
        .flatMap((repo: any) =>
          repo.pull_requests.map((pr: any) => pr.user.login),
        ),
    ),
  ];

  return {
    selectedUser,
    filteredPRs,
    usersWithPRs,
    handleSelectChange,
    handleFilterByUser,
  };
};

export default usePRsByUserActions;
