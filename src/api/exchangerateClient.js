import { create } from 'apisauce';

const baseUrl = 'https://api.exchangerate.host/latest';

const exchangerateClient = create({
  baseURL: baseUrl,
});

export default exchangerateClient;
