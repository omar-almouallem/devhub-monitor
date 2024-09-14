import { useState, useEffect } from 'react';

import { getUserData } from '../../services/userData.service';

const useFetchUserData = (token: string | null) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const fetchedUserData = await getUserData();
          setUserData(fetchedUserData);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setError('Failed to fetch user data');
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [token]);

  return { userData, loading, error };
};

export default useFetchUserData;
