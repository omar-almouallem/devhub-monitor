import { CronJob } from 'cron';

import { UpdateDataService } from '../../service/updateRepositoriesData';

const updateDataService = new UpdateDataService();

export const startCronJob = async () => {
  const job = new CronJob('*/1 * * * * ', () => {
    // Update repositories every 4 hours
    updateDataService.updateRepositoriesData();
  });

  job.start();
};
