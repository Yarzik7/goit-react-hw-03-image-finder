import axios from 'axios';

const requestParameters = {
  key: '33868787-6baf6a5b231479a4e20e31aff',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  page: 1,
  per_page: 12,
};

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages(requestText, page, perPage) {
  requestParameters.q = requestText;
  requestParameters.page = page;
  requestParameters.per_page = perPage;

  const parameters = new URLSearchParams(requestParameters); // Отримує частину url з параметрами

  const response = await axios.get(`?${parameters}`);

    if (!response.data.totalHits) {
        return Promise.reject(new Error(`No images found for "${requestText}"!`));
    }
    
  return response.data.hits;
}

export { fetchImages };