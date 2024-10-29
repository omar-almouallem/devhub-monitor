import express, { Response, Request } from 'express';

import { handleError } from '../lib/utils/errorHandler';
import { GithubRepoService } from '../service';
import { getUserIdFromAccessToken } from '../lib/utils/authUtils';
import { NoRepositoriesFoundError } from '@dev-hub-monitor/types';

const router = express.Router();

const githubRepoService = new GithubRepoService();

router.get('/user/repos', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromAccessToken(req);
    const cursor = req.query.cursor as string | undefined;
    const repos = await githubRepoService.getUserReposById(userId, cursor);
    res.status(200).json({
      results: repos.results,
      nextCursor: repos.nextCursor,
      hasMore: repos.hasMore,
    });
  } catch (e) {
    handleError(res, e);
  }
});

router.get('/user/repo-names', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromAccessToken(req);
    const cursor = req.query.cursor as string | undefined;
    const userData = await githubRepoService.getRepoNamesById(userId, cursor);

    res.status(200).json(userData);
  } catch (e) {
    switch (true) {
      case e instanceof NoRepositoriesFoundError:
        return res.status(204).json({ message: e.message });
      default:
        return handleError(res, e);
    }
  }
});

export default router;
