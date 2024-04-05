import axios from 'axios';

export async function getImage(query, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '43183854-3276a6d2cec346ebc07eac88c',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page: currentPage,
  });
  // const url = `${BASE_URL}?${params}`;

  const res = await axios.get(BASE_URL, { params });
  return res.data;
}

// getImage().then(data => console.log(data.hits));
