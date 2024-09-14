import { Response } from 'express';
import { message } from 'antd';

export const handleApiError = (e: any) => {
  if (e.response) {
    if (e.response.status === 400) {
      message.error('Invalid or missing parameters!');
    } else {
      message.error(`${e.response.data.message}`);
    }
  } else {
    console.log(e);
    message.error('Network error or server is unreachable');
  }
};
