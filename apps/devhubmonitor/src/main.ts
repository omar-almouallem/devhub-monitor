import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { PORT } from './config';
import { GLOBALPREFIX } from './config/constants';
import authController from './controller/authController';
import userDataController from './controller/userDataController';
import githubRepoController from './controller/githubRepoController';
import averagePRsController from './controller/averagePRsController';
import gitHubTokenController from './controller/gitHubTokenController';
import pullRequestsController from './controller/pullRequestsController';
import connectToDatabase from './infra/db.provider';
import { startCronJob } from './lib/schedule/cronJob';

const app = express();
app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  }),
);

const cors = require('cors');
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(
  `/${GLOBALPREFIX}`,
  authController,
  userDataController,
  averagePRsController,
  githubRepoController,
  gitHubTokenController,
  pullRequestsController,
);
async function main () {
  try {
    await connectToDatabase();
    app.listen(PORT, async () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
    await startCronJob();
  } catch (e) {
    console.log(e);
  }
}
main();
