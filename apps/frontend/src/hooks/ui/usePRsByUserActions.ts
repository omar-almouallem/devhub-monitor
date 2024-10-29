import { useState } from 'react';

import useFetchPRsByUser from '../api/useFetchPRsByUser';

const usePRsByUserActions = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const { fetchPRsByUser, averageTime, filteredPRs, listOfNames } =
    useFetchPRsByUser();

  const handleSelectChange = (username: string) => {
    setSelectedUser(username);
  };
  const handleFilterByUser = async () => {
    await fetchPRsByUser(selectedUser);
  };
  return {
    selectedUser,
    filteredPRs,
    averageTime,
    listOfNames,
    handleSelectChange,
    handleFilterByUser,
  };
};

export default usePRsByUserActions;
