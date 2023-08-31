import axios from 'axios';

async function deleteData(url) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}${url}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export default deleteData;
