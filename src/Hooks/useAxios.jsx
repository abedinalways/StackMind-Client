import { useCallback, useEffect, useMemo, use } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const api = axios.create({
  baseURL: 'https://stack-mind-server.vercel.app',
  withCredentials: true,
  timeout: 500000,
});

const publicEndpoints = [/\/allBlogs\/.*/, /\/comments\?blogId=.*/];

const useAxios = () => {
  const { signOutUser } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      async error => {
        const url = error.config?.url;
        const status = error.response?.status;

        console.error('Axios error:', {
          url,
          status,
          data: error.response?.data,
        });

        const isPublicEndpoint = publicEndpoints.some(regex => regex.test(url));

        if (status === 401 && !isPublicEndpoint) {
          toast.error('Session expired. Please log in again.');
          await signOutUser();
          navigate('/login', { replace: true });
        } else if (status === 401 && isPublicEndpoint) {
          return Promise.resolve({ data: [] });
        } else {
          toast.error(error.response?.data?.error || 'An error occurred');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [signOutUser, navigate]);

  const get = useCallback(async (url, config = {}) => {
    const response = await api.get(url, config);
    return response.data;
  }, []);

  const post = useCallback(async (url, data, config = {}) => {
    const response = await api.post(url, data, config);
    return response.data;
  }, []);

  const put = useCallback(async (url, data, config = {}) => {
    const response = await api.put(url, data, config);
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

  return useMemo(
    () => ({ get, post, put, patch, del }),
    [get, post, put, patch, del]
  );
};

export default useAxios;
