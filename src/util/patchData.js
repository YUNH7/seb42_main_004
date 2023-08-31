import axios from 'axios';

async function patchData(url, data) {
  try {
    const response = await axios.patch(
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

export default patchData;
