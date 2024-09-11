import { useState } from 'react';

import { Repository } from '../../types/types';

const useRepositoryTable = (gitHubRepoData: Repository[]) => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = gitHubRepoData.filter((repo: Repository) =>
    repo.name.toLowerCase().includes(searchText),
  );

  const handleCardClick = (repo: Repository) => {
    setSelectedRepo(repo);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRepo(null);
  };

  return {
    searchText,
    isModalVisible,
    selectedRepo,
    filteredData,
    handleSearch,
    handleCardClick,
    handleModalClose,
  };
};

export default useRepositoryTable;
