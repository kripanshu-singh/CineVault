import axios from "axios";

const BASE_URL = "https://my-movie-proxy.kripanshusingh160305.workers.dev/3";

const fetchDataApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      params,
    });
    return data;
  } catch (err) {
    console.log("fetchDataApi ~ error :- ", err);
    return err;
  }
};
export default fetchDataApi;
