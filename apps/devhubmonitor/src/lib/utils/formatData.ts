import { IPullRequest, IRepository } from '@dev-hub-monitor/types';

export function formatPullRequestsData (
  pullRequestsResponse: any,
): Promise<[IPullRequest]> {
  return pullRequestsResponse.data.map((pullRequest: IPullRequest) => ({
    id: pullRequest.id,
    title: pullRequest.title,
    user: {
      login: pullRequest.user.login,
    },
    number: pullRequest.number,
    state: pullRequest.state,
    created_at: pullRequest.created_at,
    updated_at: pullRequest.updated_at,
    closed_at: pullRequest.closed_at,
    merged_at: pullRequest.merged_at,
    duration: calculatePullRequestDuration(
      pullRequest.created_at,
      pullRequest.merged_at,
    ),
  }));
}

export function formatRepoData (repoResponse: any): Promise<[IRepository]> {
  return repoResponse.data.map((repo: IRepository) => ({
    name: repo.name,
    full_name: repo.full_name,
    owner: {
      login: repo.owner.login,
      url: repo.owner.url,
    },
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    stars: repo.stars,
    visibility: repo.visibility,
    watchers: repo.watchers,
    language: repo.language,
  }));
}

function calculatePullRequestDuration (
  created_at: Date,
  merged_at: Date | null,
): { hours: number; minutes: number } | null {
  const createdAt = new Date(created_at);
  const mergedAt = merged_at ? new Date(merged_at) : null;

  if (mergedAt) {
    const durationMs = Math.abs(mergedAt.getTime() - createdAt.getTime());
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  } else {
    return null;
  }
}
