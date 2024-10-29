import { useState, useEffect } from 'react';

const useFetchUserData = (token: string | null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  

  return { userData, loading, error };
};

export default useFetchUserData;
