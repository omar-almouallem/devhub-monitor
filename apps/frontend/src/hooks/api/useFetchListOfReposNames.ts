import { useState } from 'react';
import { getListOfReposNames } from '../../services/userData.service';
import { handleApiError } from './handleApiError';

export const fetchListOfReposNames = async (
  setlistOfReposNames: (data: any) => void,
  currentList: any[],
  setCursor: (cursor: string | undefined) => void,
  cursor?: string,
) => {
  try {
    const response = await getListOfReposNames(cursor);
    if (response.status === 204) {
      setlistOfReposNames([]);
    } else {
      const { results, nextCursor, hasMore } = response.data;

      setlistOfReposNames([...currentList, ...results]);
      if (hasMore === true) {
        setCursor(nextCursor);
      } else {
        setCursor(undefined);
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      handleApiError(e);
    }
  }
};
