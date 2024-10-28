import express, { Response, Request } from 'express';
import {
  NoPullRequestsFoundError,
  NoUserWithPRsFoundError,
} from '@dev-hub-monitor/types';

import { getUserIdFromAccessToken } from '../lib/utils/authUtils';
import { handleError } from '../lib/utils/errorHandler';
import { PullRequestService } from '../service';

const router = express.Router();

const pullRequestService = new PullRequestService();

router.get(
  '/repos/:unique_key/pull-requests',
  async (req: Request, res: Response) => {
    try {
      const unique_key = req.params.unique_key;
      const cursor = req.query.cursor as string | undefined;

      const pullRequests = await pullRequestService.getPullRequestsByRepo(
        unique_key,
        cursor,
      );

      res.status(200).json({
        results: pullRequests.results,
        nextCursor: pullRequests.nextCursor,
        hasMore: pullRequests.hasMore,
      });
    } catch (e) {
      handleError(res, e);
    }
  },
);

router.get('/user/pull-requests', async (req, res) => {
  try {
    const userName = req.query.userName.toString();
    const userData = await pullRequestService.getPullRequestsByUser(userName);
    if (!userName) {
      return res.status(400).json({ message: 'User name is required' });
    }
    res.status(200).json(userData);
  } catch (e) {
    if (e instanceof NoPullRequestsFoundError) {
      return res.status(204).json({ message: e.message });
    }
    handleError(res, e);
  }
});

router.get(
  '/user/pull-request/by-date',
  async (req: Request, res: Response) => {
    try {
      const { repoName, startDate, endDate } = req.query;
      const repo = repoName.toString();
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      if (!repo || isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res
          .status(400)
          .json({ message: 'Invalid or missing parameters' });
      }
      const userData = await pullRequestService.getPullRequestsByDate(
        repo,
        start,
        end,
      );
      res.status(200).json(userData);
    } catch (e) {
      handleError(res, e);
    }
  },
);

router.get('/user/pull-request/owners', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromAccessToken(req);
    const userData = await pullRequestService.getPRsuserLoginByUserId(userId);
    res.status(200).json(userData);
  } catch (e) {
    switch (true) {
      case e instanceof NoUserWithPRsFoundError:
        return res.status(204).json({ message: e.message });
      default:
        handleError(res, e);
    }
  }
});

export default router;
