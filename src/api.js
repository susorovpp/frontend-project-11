import axios from 'axios';

const getProxyUrl = (url) => {
  const encodedUrl = encodeURIComponent(url);

  return `https://allorigins.hexlet.app/raw?disableCache=true&url=${encodedUrl}`;
};

export const getFeed = (url) => {
  const proxyUrl = getProxyUrl(url);

  return axios.get(proxyUrl).then((response) => response.data);
};
