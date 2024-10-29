import { message } from 'antd';
import { getGithHubStatus } from '../../services/userData.service';
import { handleApiError } from './handleApiError';

export const fetchTokenStatus = async (
  setGitHubTokenStatus: (data: any) => void,
) => {
  try {
    const fetchedUserData = await getGithHubStatus();
    setGitHubTokenStatus(fetchedUserData);
  } catch (e) {
    if (e instanceof Error) {
      message.error(e.message);
      handleApiError(e);
    }
  }
};
