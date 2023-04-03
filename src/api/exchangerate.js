import apiClient from './exchangerateClient';

const getExchangerate = async base => {
  return await apiClient.get(`?base=${base}`);
};

export default { getExchangerate };
