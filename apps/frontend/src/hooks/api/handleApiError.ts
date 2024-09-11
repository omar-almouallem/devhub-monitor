import { message } from 'antd';

export const handleApiError = (e: any) => {
  if (e.response) {
    if (e.response.status === 400) {
      message.error('Invalid or missing parameters!');
    } else {
      message.error('An error occurred while fetching data');
    }
  } else {
    message.error('Network error or server is unreachable');
  }
};
