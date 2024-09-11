export function getTotalPullRequestTimes () {
  return {
    $sum: {
      $add: [
        { $toDouble: '$gitHubRepoData.pull_requests.duration.hours' },
        {
          $divide: [
            { $toDouble: '$gitHubRepoData.pull_requests.duration.minutes' },
            60,
          ],
        },
      ],
    },
  };
}

export function getAveragePullRequestTimeExpression () {
  return {
    $cond: [
      { $ne: ['$countPullRequests', 0] },
      { $divide: ['$totalPullRequestTimes', '$countPullRequests'] },
      null,
    ],
  };
}

export function getUnwindPipeline (field: string) {
  return { $unwind: `$${field}` };
}

export function getMatchDuration () {
  return {
    $match: {
      'gitHubRepoData.pull_requests.duration': { $exists: true, $ne: null },
    },
  };
}

export function getMatchUser (userName: string) {
  return {
    $match: {
      'gitHubRepoData.pull_requests.user.login': userName,
      'gitHubRepoData.pull_requests.duration': { $exists: true, $ne: null },
    },
  };
}

export function getMatchCreatedAt (startTime: Date, endTime: Date) {
  return {
    $match: {
      'gitHubRepoData.pull_requests.created_at': {
        $gte: startTime,
        $lte: endTime,
      },
    },
  };
}
