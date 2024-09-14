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

export async function getUserData () {
  const response = await apiClient.get('/user');
  return response.data;
}

export async function saveGithubToken (githubToken: string) {
  const response = await apiClient.post('/auth/github', { githubToken });
  return response;
}

export async function getAveragePRsByRepo (projectNames: string[]) {
  const queryParams = projectNames
    .map((name) => `projectNames=${encodeURIComponent(name)}`)
    .join('&');
  const response = await apiClient.get(`/averagePRsByProject?${queryParams}`);
  return response;
}

export async function getAveragePRsByUser (userName: string) {
  const response = await apiClient.get('/averagePRsByName/', {
    params: { userName },
  });
  return response;
}

export async function getAveragePRsByDate (
  projectName: string,
  startTime: string,
  endTime: string,
) {
  const response = await apiClient.get('/averagePRsByDate', {
    params: { projectName, startTime, endTime },
  });
  return response;
}
