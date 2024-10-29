import { useState, useEffect } from 'react';

export const useRepositoriesUI = (repositories: any[]) => {
  const [filteredData, setFilteredData] = useState<any[]>(repositories);
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredData(
      repositories.filter((repo: any) =>
        repo.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, repositories]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRepo(null);
  };

  return {
    filteredData,
    selectedRepo,
    isModalVisible,
    searchTerm,
    setSelectedRepo,
    setIsModalVisible,
    handleSearch,
    handleModalClose,
  };
};
