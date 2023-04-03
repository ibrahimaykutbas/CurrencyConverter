import { useState } from 'react';

export default useApi = apiFunc => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const request = async (...arg) => {
    setLoading(true);
    const response = await apiFunc(...arg);
    setData(response.data);
    setError(!response.ok);
    setLoading(false);
    return response;
  };

  return { data, error, loading, request };
};
