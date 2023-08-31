import axios from 'axios';

async function getData(url) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}${url}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export default getData;
