import { create } from 'apisauce';

const baseUrl = 'https://restcountries.com/v3.1';

const countriesClient = create({
  baseURL: baseUrl
});

export default countriesClient;
