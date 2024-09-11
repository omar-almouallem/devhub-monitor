import { InvalidGitHubTokenError } from '@dev-hub-monitor/types';
import { decodeToken } from '@dev-hub-monitor/utils'; // تأكد أن هذا الدالة تدعم فك ترميز accessToken
import express, { Response, Request } from 'express';

import { GitHubConnectionService } from '../lib/github/githubConnectionService';
import { GitHubTokenService } from './../service/gitHubTokenService';
import { handleError } from '../lib/utils/errorHandler';

const router = express.Router();
const gitHubTokenService = new GitHubTokenService();
const gitHubConnectionService = new GitHubConnectionService();

router.post('/auth/github/', async (req: Request, res: Response) => {
  const githubToken = req.body.githubToken;

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication required!' });
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({ message: 'Invalid token format!' });
    }
    const userId = decodeToken(accessToken);

    if (!githubToken) {
      return res.status(400).json({ message: 'GitHub token is required!' });
    }

    const userData = await gitHubConnectionService.fetchData(githubToken);
    await gitHubTokenService.storeGitHubToken({
      userId,
      githubToken,
    });
    await gitHubTokenService.updateVerifyState(userId);
    await gitHubTokenService.storeGitHubData(userId, userData);

    return res.status(200).json({
      message: 'The token has been successfully stored',
    });
  } catch (e) {
    console.log(e);
    switch (true) {
      case e instanceof InvalidGitHubTokenError:
        return res.status(401).json({ message: e.message });
      default:
        return handleError(res, e);
    }
  }
});

export default router;
