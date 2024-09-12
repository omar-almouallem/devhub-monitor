import express, { Response, Request } from 'express';

import { handleError } from '../lib/utils/errorHandler';
import { UserDataService } from '../service/userDataService';
import { getUserIdFromAccessToken } from '../lib/utils/authUtils';

const router = express.Router();
const userDataService = new UserDataService();

router.get('/user', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromAccessToken(req);
    const userData = await userDataService.getUserData(userId);
    res.status(200).json(userData);
  } catch (e) {
    handleError(res, e);
  }
});

export default router;
