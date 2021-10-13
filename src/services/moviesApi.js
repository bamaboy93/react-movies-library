import axios from 'axios';

const API_KEY = 'a7722589dc29fac056c18bf39b029797';
const BASE_URL = 'https://api.themoviedb.org/3/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  language: 'en-US',
};
const getPopularMovies = async (page = 1) => {
  const { data } = await axios.get(`/trending/all/day?page=${page}`);
  return data;
};
// async function getPopularMovies() {
//   try {
//     const config = {
//       url: `trending/movie/day`,
//     };
//     const { data } = await axios(config);

//     return data.results;
//   } catch (error) {
//     console.log('error', { error });
//     return null;
//   }
// }
const getMoviesByQuery = async (query, page = 1) => {
  const { data } = await axios.get(
    `/search/movie?language=en-US&page=${page}&include_adult=false&query=${query}`,
  );
  return data;
};
// async function getMoviesByQuery(query) {
//   try {
//     const config = {
//       url: `search/movie`,
//       params: {
//         query,
//       },
//     };
//     const { data } = await axios(config, query);

//     return data.results;
//   } catch (error) {
//     console.log('error', { error });
//     return null;
//   }
// }
const getMovieById = async movieID => {
  try {
    const response = await axios.get(`/movie/${movieID}`);
    if (response.status === 200) {
      console.log('result', response.status);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
// async function getMovieById(id) {
//   try {
//     const config = {
//       url: `movie/${id}`,
//     };
//     const { data } = await axios(config, id);

//     return data;
//   } catch (error) {
//     console.log('error', { error });
//     return null;
//   }
// }
const getCastInfo = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data;
};
// async function getCastInfo(id) {
//   try {
//     const config = {
//       url: `movie/${id}/credits`,
//     };
//     const { data } = await axios(config, id);

//     return data.cast;
//   } catch (error) {
//     console.log('error', { error });
//     return null;
//   }
// }
const getMovieVideo = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/videos`);
  return data;
};
// async function getMovieVideo(id) {
//   try {
//     const config = {
//       url: `movie/${id}/videos`,
//     };
//     const { data } = await axios(config, id);

//     return data.results;
//   } catch (error) {
//     console.log('error', { error });
//     return null;
//   }
// }

export {
  getPopularMovies,
  getMoviesByQuery,
  getMovieById,
  getCastInfo,
  getMovieVideo,
};
