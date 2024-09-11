import { Request } from 'express';
import { decodeToken } from '@dev-hub-monitor/utils';

export const getUserIdFromAccessToken = (req: Request): string => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Authorization header is missing');
  }
  const token = authHeader.split(' ')[1];
  return decodeToken(token);
};
