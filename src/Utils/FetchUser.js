import { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalVariables from './GlobalVariables';

const useFetchUser = (retryDelay = 1000) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('authEmail');
      const token = localStorage.getItem('authToken');

      while (true) {
        try {
          const response = await axios.get(`${GlobalVariables.API_BASE_URL}/api/auth/v1/users/detail/${email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setError(null);
          break;
        } catch (error) {
          setError(error.message);
          await new Promise(resolve => setTimeout(resolve, retryDelay)); 
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [retryDelay]); 

  return { user, loading, error };
};

export default useFetchUser;