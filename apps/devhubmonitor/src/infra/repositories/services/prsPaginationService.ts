import { IPullRequest } from '@dev-hub-monitor/types';
import { Document, Query } from 'mongoose';

export const paginate = async (
  query: Query<Document[], IPullRequest & Document>,
  cursor?: string | null | any,
  limit: number = 2,
): Promise<{
  results: IPullRequest[];
  nextCursor: string;
  hasMore: boolean;
}> => {
  if (cursor) {
    query.where('unique_key').gt(cursor);
  }

  const results = await query.sort({ unique_key: 1 }).limit(limit).lean();

  const lastItem =
    results.length > 0 ? results[results.length - 1].unique_key : null;

  const hasMore = results.length === limit;

  return {
    results,
    nextCursor: lastItem,
    hasMore,
  };
};
