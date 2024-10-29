import axios from 'axios';

import { API_BASE_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getAveragePRsByDate (
  repoName: string,
  startDate: string,
  endDate: string,
) {
  const response = await apiClient.get('/average/byDate', {
    params: { repoName, startDate, endDate },
  });
  return response;
}

export async function getAveragePRsByRepo (repoFullName: string[]) {
  const response = await apiClient.get(`/average/byRepo`, {
    params: { repoFullName },
  });
  console.log(response);
  return response;
}

export async function getAveragePRsByUser (userName: string) {
  const response = await apiClient.get('/average/byUser', {
    params: { userName },
  });
  return response;
}
