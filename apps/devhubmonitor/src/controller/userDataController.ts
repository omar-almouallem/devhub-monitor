import express, { Response, Request } from 'express';

import { handleError } from '../lib/utils/errorHandler';
import { UserDataService } from '../service';
import { getUserIdFromAccessToken } from '../lib/utils/authUtils';

const router = express.Router();
const userDataService = new UserDataService();

router.get('/user/github-info', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromAccessToken(req);

    const gitHubInfo = await userDataService.getGitHubStatus(userId);
    res.status(200).json(gitHubInfo);
  } catch (e) {
    handleError(res, e);
  }
});

export default router;
