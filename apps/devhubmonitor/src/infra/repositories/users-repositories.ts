import {
  IGithubData,
  IInsertUserInput,
  IUserRepository,
  IUserSchema,
} from '@dev-hub-monitor/types';
import mongoose from 'mongoose';

import * as AggregationHelpers from '../../lib/utils/aggregationHelpers';

import UserModel from '../../module/users-schema';

export class MongoTodoRepository implements IUserRepository {
  async insertUser (user: IInsertUserInput): Promise<IUserSchema> {
    const newUser = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...user,
    };
    await UserModel.create(newUser);
    return this.getUserById(newUser._id);
  }
  async insertToken (id: string, token: string): Promise<IUserSchema> {
    await UserModel.findOneAndUpdate(
      { _id: id },
      { githubToken: token },
      { new: true },
    );
    return this.getUserById(id);
  }
  async updateUserById (
    id: string,
    data: Partial<IUserSchema>,
  ): Promise<IUserSchema> {
    await UserModel.findByIdAndUpdate({ _id: id }, data, { new: true });
    return this.getUserById(id);
  }

  async insertGitHubData (
    id: string,
    githubData: IGithubData,
  ): Promise<IUserSchema> {
    await UserModel.findByIdAndUpdate(
      { _id: id },
      { gitHubRepoData: githubData },
      { new: true },
    );
    return this.getUserById(id);
  }
  async getAllUser () {
    const users = await UserModel.find({});
    return users;
  }
  async getUserByEmail (email: string): Promise<IUserSchema> {
    const user = await UserModel.findOne({ email });
    return user;
  }
  getUserById (id: string): Promise<IUserSchema> {
    const user = UserModel.findById({ _id: id });
    return user;
  }

  async getAveragePRsByProject (
    userId: string,
    projectNames: string[],
  ): Promise<any> {
    const aggregationPipeline = [
      { $match: { _id: userId } },

      AggregationHelpers.getUnwindPipeline('gitHubRepoData'),
      {
        $match: {
          'gitHubRepoData.name': { $in: projectNames },
          'gitHubRepoData.pull_requests.duration': { $exists: true, $ne: null },
        },
      },
      AggregationHelpers.getUnwindPipeline('gitHubRepoData.pull_requests'),
      AggregationHelpers.getMatchDuration(),
      {
        $group: {
          _id: '$gitHubRepoData.name',
          totalPullRequestTimes: AggregationHelpers.getTotalPullRequestTimes(),
          countPullRequests: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          totalPullRequestTimes: 1,
          countPullRequests: 1,
          averagePullRequestTime:
            AggregationHelpers.getAveragePullRequestTimeExpression(),
        },
      },

      {
        $group: {
          _id: null,
          projects: {
            $push: {
              name: '$name',
              averagePullRequestTime: '$averagePullRequestTime',
            },
          },
          totalAveragePullRequestTime: { $sum: '$averagePullRequestTime' },
          projectCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          projects: 1,
          totalAveragePullRequestTime: 1,
          projectCount: 1,
          overallAveragePullRequestTime: {
            $cond: [
              { $gt: ['$projectCount', 0] }, // التأكد من أن projectCount ليس صفرًا
              { $divide: ['$totalAveragePullRequestTime', '$projectCount'] },
              0, // قيمة افتراضية في حالة القسمة على صفر
            ],
          },
        },
      },
    ];

    const result = await UserModel.aggregate(aggregationPipeline);
    console.log('Result:', result);

    return result[0];
  }

  async getAveragePRsByUser (userId: string, userName: string) {
    const aggregationPipeline = [
      { $match: { _id: userId } },
      AggregationHelpers.getUnwindPipeline('gitHubRepoData'),
      AggregationHelpers.getUnwindPipeline('gitHubRepoData.pull_requests'),
      AggregationHelpers.getMatchUser(userName),
      {
        $group: {
          _id: '$gitHubRepoData.name',
          repoName: { $first: '$gitHubRepoData.name' },
          pullRequests: {
            $push: {
              title: '$gitHubRepoData.pull_requests.title',
              user: '$gitHubRepoData.pull_requests.user.login',
              duration: '$gitHubRepoData.pull_requests.duration',
              created_at: '$gitHubRepoData.pull_requests.created_at',
              updated_at: '$gitHubRepoData.pull_requests.updated_at',
              closed_at: '$gitHubRepoData.pull_requests.closed_at',
              merged_at: '$gitHubRepoData.pull_requests.merged_at',
            },
          },
          totalPullRequestTimes: AggregationHelpers.getTotalPullRequestTimes(),
          countPullRequests: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          repoName: 1,
          pullRequests: 1,
          totalPullRequestTimes: 1,
          countPullRequests: 1,
          averagePullRequestTime:
            AggregationHelpers.getAveragePullRequestTimeExpression(),
        },
      },
      {
        $group: {
          _id: null,
          repositories: {
            $push: {
              repoName: '$repoName',
              pullRequests: '$pullRequests',
              averagePullRequestTime: '$averagePullRequestTime',
            },
          },
          totalAveragePullRequestTime: { $sum: '$averagePullRequestTime' },
          projectCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          repositories: 1,
          overallAveragePullRequestTime: {
            $cond: [
              { $gt: ['$projectCount', 0] },
              { $divide: ['$totalAveragePullRequestTime', '$projectCount'] },
              null,
            ],
          },
        },
      },
    ];

    const result = await UserModel.aggregate(aggregationPipeline);
    return result[0];
  }

  async getAveragePRsByDate (
    userId: string,
    projectName: string,
    startTime: Date,
    endTime: Date,
  ) {
    const aggregationPipeline = [
      { $match: { _id: userId } },
      AggregationHelpers.getUnwindPipeline('gitHubRepoData'),
      {
        $match: {
          'gitHubRepoData.name': projectName,
        },
      },
      AggregationHelpers.getUnwindPipeline('gitHubRepoData.pull_requests'),
      AggregationHelpers.getMatchCreatedAt(startTime, endTime),
      {
        $group: {
          _id: null,
          pullRequests: {
            $push: {
              title: '$gitHubRepoData.pull_requests.title',
              user: '$gitHubRepoData.pull_requests.user.login',
              created_at: '$gitHubRepoData.pull_requests.created_at',
              updated_at: '$gitHubRepoData.pull_requests.updated_at',
              closed_at: '$gitHubRepoData.pull_requests.closed_at',
              merged_at: '$gitHubRepoData.pull_requests.merged_at',
              duration: '$gitHubRepoData.pull_requests.duration',
            },
          },
          countPullRequests: { $sum: 1 },
          totalPullRequestTimes: AggregationHelpers.getTotalPullRequestTimes(),
        },
      },
      {
        $project: {
          _id: 0,
          projectName: projectName,
          pullRequests: 1,
          countPullRequests: 1,
          averagePullRequestTime:
            AggregationHelpers.getAveragePullRequestTimeExpression(),
        },
      },
    ];

    const result = await UserModel.aggregate(aggregationPipeline);
    return result[0];
  }
}
