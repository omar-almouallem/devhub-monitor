import axios from 'axios';
import { IBasicLoginInput, IBasicSignupInput } from '@dev-hub-monitor/types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function BasicSignup (data: IBasicSignupInput) {
  const response = await apiClient.post('/signup/basic', data);
  return response;
}
export async function BasicLogin (data: IBasicLoginInput) {
  const response = await apiClient.post('/login/basic', data);
  return response;
}
export async function getUserData (token: string) {
  const response = await apiClient.get(`/user/${token}`);
  console.log(response.data);
  return response.data;
}
export async function saveGithubToken (userId: string, githubToken: string) {
  const response = await apiClient.post(`/auth/github/${userId}`, {
    githubToken,
  });
  return response;
}
export async function getAveragePullRequestsByProjects (
  userId: string,
  projectNames: string[],
) {
  const queryParams = projectNames
    .map((name) => `projectNames=${encodeURIComponent(name)}`)
    .join('&');
  const response = await apiClient.get(
    `averagePRsByProject/${userId}?${queryParams}`,
  );

  return response;
}
export async function filterPullRequestsByUser (
  userId: string,
  userName: string,
) {
  const response = await apiClient.get(`/averagePRsByName/${userId}`, {
    params: {
      userName,
    },
  });

  return response;
}
export async function filterByDate (
  userId: string,
  projectName: string,
  startTime: string,
  endTime: string,
) {
  const response = await apiClient.get(`/averagePRsByDate/${userId}`, {
    params: {
      projectName,
      startTime,
      endTime,
    },
  });

  return response;
}
