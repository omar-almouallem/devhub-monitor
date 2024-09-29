import express, { Response, Request } from 'express';
import { InvalidGitHubTokenError } from '@dev-hub-monitor/types';

import { GitHubConnectionService } from '../lib/github/githubConnectionService';
import { GitHubTokenService } from './../service/gitHubTokenService';
import { getUserIdFromAccessToken } from '../lib/utils/authUtils';
import { handleError } from '../lib/utils/errorHandler';
import { getSixMonthsAgo } from '../lib/utils/timeHelpers';

const router = express.Router();
const gitHubTokenService = new GitHubTokenService();
const gitHubConnectionService = new GitHubConnectionService();

router.post('/auth/github/', async (req: Request, res: Response) => {
  const githubToken = req.body.githubToken;

  try {
    const userId = getUserIdFromAccessToken(req);

    if (!githubToken) {
      return res.status(400).json({ message: 'GitHub token is required!' });
    }

    await gitHubConnectionService.fetchData(
      userId,
      githubToken,
      getSixMonthsAgo(),
    );

    await gitHubTokenService.storeGitHubToken({
      userId,
      githubToken,
    });

    await gitHubTokenService.updateVerifyState(userId);

    return res.status(200).json({
      message: 'The token and GitHub data have been successfully stored',
    });
  } catch (e) {
    switch (true) {
      case e instanceof InvalidGitHubTokenError:
        return res.status(401).json({ message: e.message });
      default:
        return handleError(res, e);
    }
  }
});

export default router;
