import axios from 'axios';
import { useEffect, useState } from 'react';

function Apimethods(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    setLoading(true);
    axios
      .get(url, config)
      .then((response) => setData(response.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const login = async (email: string, client_password: string) => {
    try {
      const response = await axios.post(`${url}/api/sessions`, { email, client_password });
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Login failed');
    }
  };

  const getProductById = async (id: any) => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    };

    setLoading(true);

    try {
      if (!id) {
        throw new Error('Invalid dish ID');
      }

      const response = await axios.get(`${url}/api/dishes/${id}`, config);
      return response.data;
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const registerClient = (email: any, client_name: any, direction: any, client_password: any)  => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    };

    setLoading(true);
    axios.post(url, { client: { client_name, email, client_password, direction, status_client: 0 } }, config)
      .then((response) => setData(response.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return { data, loading, getProductById, error, fetchData, login, registerClient, validateEmail, addOrder };
}

export default Apimethods;
