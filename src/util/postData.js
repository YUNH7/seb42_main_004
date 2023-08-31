import axios from 'axios';

async function postData(url, data) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}${url}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export default postData;
