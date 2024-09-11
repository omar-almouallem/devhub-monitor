import { decodeToken } from '@dev-hub-monitor/utils';
import express, { Response, Request } from 'express';

import { UserDataService } from '../service/userDataService';
import { handleError } from '../lib/utils/errorHandler';

const router = express.Router();
const userDataService = new UserDataService();

router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = decodeToken(id);
    const userData = await userDataService.getUserData(userId);
    res.status(200).json(userData);
  } catch (e) {
    handleError(res, e);
  }
});

export default router;
