import { useState } from 'react';

const useRepositoryTable = (gitHubRepoData: any) => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = gitHubRepoData.filter((data: any) =>
    data.repo.full_name.toLowerCase().includes(searchText),
  );

  const handleCardClick = (data: any) => {
    setSelectedRepo(data);
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
