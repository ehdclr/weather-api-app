import axios from 'axios';

const fetchRequest = {
  async fetchData(url, params) {
    try {
      const response = await axios.get(url, {params});
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};

export default fetchRequest;