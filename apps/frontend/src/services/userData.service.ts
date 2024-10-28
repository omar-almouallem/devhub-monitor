import axios from 'axios';

import { API_BASE_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function saveGithubToken (githubToken: string) {
  const response = await apiClient.post('/auth/github', { githubToken });
  return response;
}
export async function getGithHubStatus () {
  const response = await apiClient.get('/user/github-info');
  return response.data;
}
export async function getReposByUser (cursor?: string) {
  const response = await apiClient.get('/user/repos', {
    params: { cursor: cursor || undefined },
  });
  return response;
}

export async function getListOfReposNames (cursor?: string) {
  const response = await apiClient.get('/user/repo-names', {
    params: { cursor: cursor || undefined },
  });

  return response;
}

export async function getPRsByUser (userName: string) {
  const response = await apiClient.get('/user/pull-requests', {
    params: { userName },
  });
  return response.data;
}

export async function getPRsUsersLogin () {
  const response = await apiClient.get('/user/pull-request/owners');
  return response;
}

export async function getPRsByDate (
  repoName: string,
  startDate: string,
  endDate: string,
) {
  const response = await apiClient.get('/user/pull-request/by-date', {
    params: { repoName, startDate, endDate },
  });

  return response;
}

export async function getPRsByRepo (unique_key: string, cursor?: string) {
  const encodedKey = encodeURIComponent(unique_key);
  const response = await apiClient.get(`/repos/${encodedKey}/pull-requests`, {
    params: {
      cursor: cursor || undefined,
    },
  });
  return response;
}
