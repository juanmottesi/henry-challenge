import Axios, { Method } from 'axios';

import { processRanking, processTours } from './ApiUtils';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const baseURL = `https://${API_HOST}`;

const request = (method: Method, url: string, params = {}, data = {}, headers = {} ) => Axios.request({
  baseURL,
  method,
  url,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
    ...headers,
  },
  data,
  params,
});

const Api = {
  getTours: () => request('GET', '/tours')
    .then(processTours),
  getRanking: (tourId: number, season: number) => request('GET', `/tour-rankings/${tourId}/${season}`)
    .then(processRanking),
};

export default Api;
