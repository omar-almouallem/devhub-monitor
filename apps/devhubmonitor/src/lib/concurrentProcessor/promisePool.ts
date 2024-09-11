import { PromisePool } from '@supercharge/promise-pool';

// Helper function to run promise pool with concurrency
export const runPromisePool = async <T>(
  items: T[],
  concurrency: number,
  processor: (item: T) => Promise<void>,
) => {
  const { results, errors } = await PromisePool.withConcurrency(concurrency)
    .for(items)
    .process(processor);

  return { results, errors };
};
