import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { useUserData } from '../../context/UserDataContext';
import useFetchUserData from '../api/useRepositoriesData';

export const useRepositoriesData = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserData();
  const { login, logout } = useAuth();
  const token = localStorage.getItem('accessToken');

  const { userData, loading, error } = useFetchUserData(token);

  if (error || !token) {
    logout();
    navigate('/auth/login');
  } else if (userData) {
    login();
    setUserData(userData);
  }

  return { userData, loading };
};
