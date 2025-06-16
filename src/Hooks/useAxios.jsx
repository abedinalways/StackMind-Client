import { useCallback, use } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

const useAxios = () => {
  const { signOutUser } = use(AuthContext);
  const navigate = useNavigate();

  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        await signOutUser();
        navigate('/login', { replace: true });
      } else {
        toast.error(error.response?.data?.error || 'An error occurred');
      }
      return Promise.reject(error);
    }
  );

  const get = useCallback(async (url, config = {}) => {
    const response = await api.get(url, config);
    return response.data;
  }, []);

  const post = useCallback(async (url, data, config = {}) => {
    const response = await api.post(url, data, config);
    return response.data;
  }, []);

  const patch = useCallback(async (url, data, config = {}) => {
    const response = await api.patch(url, data, config);
    return response.data;
  }, []);

  const del = useCallback(async (url, config = {}) => {
    const response = await api.delete(url, config);
    return response.data;
  }, []);

  return { get, post, patch, del };
};

export default useAxios;
