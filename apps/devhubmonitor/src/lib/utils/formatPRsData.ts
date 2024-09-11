import { IPullRequest, IPullRequestsResponse } from '@dev-hub-monitor/types';

export function formatPullRequestsData (
  pullRequestsResponse: IPullRequestsResponse,
) {
  return pullRequestsResponse.data.map((pullRequest: IPullRequest) => ({
    id: pullRequest.id,
    title: pullRequest.title,
    user: {
      login: pullRequest.user.login,
    },
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

function calculatePullRequestDuration (
  created_at: string,
  merged_at: string | null,
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
