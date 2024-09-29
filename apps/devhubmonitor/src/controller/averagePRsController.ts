import express, { Response, Request } from 'express';
import { NoPullRequestsFoundError } from '@dev-hub-monitor/types';

import { handleError } from '../lib/utils/errorHandler';
import { UserDataService } from '../service/userDataService';

const router = express.Router();
const userDataService = new UserDataService();
router.get('/averagePRsByRepo', async (req: Request, res: Response) => {
  try {
    let repoFullName = req.query.repoFullName as string[];
    if (typeof repoFullName === 'string') {
      repoFullName = [repoFullName];
    }
    if (!repoFullName) {
      return res.status(400).json({ message: 'Project names are required' });
    }
    if (repoFullName.length === 0) {
      return res.status(400).json({ message: 'You must input minimum 1 name' });
    }

    const result = await userDataService.avregePRsByRepo(repoFullName);

    res.status(200).json(result);
  } catch (e) {
    if (e instanceof NoPullRequestsFoundError) {
      return res.status(204).json({ message: e.message });
    }
    handleError(res, e);
  }
});
router.get('/averagePRsByUser', async (req: Request, res: Response) => {
  try {
    const userName = req.query.userName.toString();
    const userData = await userDataService.avregePRsByUser(userName);
    if (!userName) {
      return res.status(400).json({ message: 'Project name is required' });
    }
    res.status(200).json(userData);
  } catch (e) {
    if (e instanceof NoPullRequestsFoundError) {
      return res.status(204).json({ message: e.message });
    }
    handleError(res, e);
  }
});
router.get('/averagePRsByDate', async (req: Request, res: Response) => {
  try {
    const { repoName, startDate, endDate } = req.query;
    const repo = repoName.toString();
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    if (!repo || isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid or missing parameters' });
    }
    const userData = await userDataService.avregePRsByDate(repo, start, end);
    res.status(200).json(userData);
  } catch (e) {
    if (e instanceof NoPullRequestsFoundError) {
      return res.status(204).json({ message: e.message });
    }
    handleError(res, e);
  }
});

export default router;
