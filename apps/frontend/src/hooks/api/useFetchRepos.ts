import { useState, useEffect } from 'react';
import { getPRsByRepo, getReposByUser } from '../../services/userData.service';
import { message } from 'antd';
import { handleApiError } from './handleApiError';

export const useRepositoriesAPI = () => {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [pulls, setPulls] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasMorePulls, setHasMorePulls] = useState<boolean>(true);

  const fetchRepositories = async (
    currentList: any[],
    setCursor: any,
    cursor?: string,
  ) => {
    try {
      const response = await getReposByUser(cursor);
      const { results, nextCursor, hasMore } = response.data;

      const uniqueResults = results.filter(
        (newRepo: any) =>
          !currentList.some(
            (existingRepo: any) => existingRepo.full_name === newRepo.full_name,
          ),
      );

      setRepositories([...currentList, ...uniqueResults]);

      if (hasMore === true) {
        setCursor(nextCursor);
      } else {
        setHasMore(false);
        setCursor(undefined);
      }
    } catch (e) {
      handleApiError(e);
    }
  };

  const fetchPullRequestsAndOpenModal = async (
    repo: any,
    currentList: any[],
    setCursor: any,
    cursor?: string,
  ) => {
    try {
      const unique_key = repo.full_name;
      const pullRequests = await getPRsByRepo(unique_key, cursor);
      const { results, nextCursor, hasMore } = pullRequests.data;

      const updatedPulls = [...currentList, ...results];

      setPulls(updatedPulls);

      if (hasMore === true) {
        setCursor(nextCursor);
      } else {
        setHasMorePulls(false);
        setCursor(undefined);
      }

      setSelectedRepo({
        full_name: repo.full_name,
        pullRequests: updatedPulls,
      });

      setIsModalVisible(true);
    } catch (e) {
      handleApiError(e);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRepo(null);
    setHasMorePulls(true);
  };
  const fetchMorePulls = async () => {
    await fetchPullRequestsAndOpenModal(selectedRepo, pulls, setCursor, cursor);
  };

  useEffect(() => {
    fetchRepositories([], setCursor, undefined);
  }, []);

  const fetchMoreRepos = async () => {
    await fetchRepositories(repositories, setCursor, cursor);
  };

  return {
    repositories,
    selectedRepo,
    isModalVisible,
    fetchPullRequestsAndOpenModal,
    closeModal,
    fetchMoreRepos,
    hasMore,
    setCursor,
    fetchMorePulls,
    setPulls,
    pulls,
    hasMorePulls,
  };
};
