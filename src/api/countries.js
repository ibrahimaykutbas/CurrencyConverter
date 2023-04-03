import apiClient from './countriesClient';

const getCounties = async () => {
  return await apiClient.get('/all');
};

export default { getCounties };
