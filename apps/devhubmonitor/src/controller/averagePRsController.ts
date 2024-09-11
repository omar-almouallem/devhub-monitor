import express, { Response, Request } from 'express';

import { UserDataService } from '../service/userDataService';
import { handleError } from '../lib/utils/errorHandler';
import { NoPullRequestsFoundError } from '@dev-hub-monitor/types';

const router = express.Router();
const userDataService = new UserDataService();

router.get(
  '/averagePRsByProject/:userId',
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      let projectNames = req.query.projectNames as string[];
      if (typeof projectNames === 'string') {
        projectNames = [projectNames];
      }
      if (!projectNames) {
        return res.status(400).json({ message: 'Project names are required' });
      }
      if (projectNames.length === 0) {
        return res.status(400).json({ message: 'You must input minmum 1 nam' });
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
  },
);

router.get('/averagePRsByName/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
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
router.get('/averagePRsByDate/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
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
