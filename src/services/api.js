import axios from 'axios';

const BASE_URl = 'https://pixabay.com/api/';
const KEY = '36140304-24ca5329f989cc2333b5f303d';
const searchParams = new URLSearchParams({
  key: KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
});

axios.defaults.baseURL = BASE_URl;

const getImages = async (searchSubject, page) => {
  const response = await axios.get(
    `?${searchParams}&q=${searchSubject}&page=${page}`
  );
  return response.data;
};

const getPerPage = () => {
  return searchParams.get('per_page');
};

export { getImages, getPerPage };
