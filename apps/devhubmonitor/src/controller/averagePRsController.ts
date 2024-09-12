import express, { Response, Request } from 'express';
import { NoPullRequestsFoundError } from '@dev-hub-monitor/types';

import { handleError } from '../lib/utils/errorHandler';
import { UserDataService } from '../service/userDataService';
import { getUserIdFromAccessToken } from '../lib/utils/authUtils';

const router = express.Router();
const userDataService = new UserDataService();

router.get('/averagePRsByProject', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromAccessToken(req);
    console.log(userId);
    let projectNames = req.query.projectNames as string[];
    if (typeof projectNames === 'string') {
      projectNames = [projectNames];
    }
    if (!projectNames) {
      return res.status(400).json({ message: 'Project names are required' });
    }
    if (projectNames.length === 0) {
      return res.status(400).json({ message: 'You must input minimum 1 name' });
    }

    const result = await userDataService.avregePRsByProject(
      userId,
      projectNames,
    );
    return res.json(result);
  } catch (e) {
    if (e instanceof NoPullRequestsFoundError) {
      return res.status(204).json({ message: e.message });
    }
    handleError(res, e);
  }
});

router.get('/averagePRsByName', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromAccessToken(req);
    const userName = req.query.userName.toString();

    if (!userName) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const result = await userDataService.avregePRsByName(userId, userName);
    return res.json(result);
  } catch (e) {
    if (e instanceof NoPullRequestsFoundError) {
      return res.status(204).json({ message: e.message });
    }
    handleError(res, e);
  }
});

router.get('/averagePRsByDate', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromAccessToken(req);
    const { projectName, startTime, endTime } = req.query;
    const start = new Date(startTime as string);
    const end = new Date(endTime as string);

    if (!projectName || isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid or missing parameters' });
    }

    const result = await userDataService.avregePRsByDate(
      userId,
      projectName.toString(),
      start,
      end,
    );
    return res.json(result);
  } catch (e) {
    if (e instanceof NoPullRequestsFoundError) {
      return res.status(204).json({ message: e.message });
    }
    handleError(res, e);
  }
});

export default router;
