import axios from "axios";

const BASE_URL = "https://my-movie-proxy.kripanshusingh160305.workers.dev/3";
const TMBD_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const fetchDataApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      params: {
        api_key: TMBD_TOKEN,
        ...params,
      },
    });
    return data;
  } catch (err) {
    console.log("fetchDataApi ~ error :- ", err);
    return err;
  }
};
export default fetchDataApi;
