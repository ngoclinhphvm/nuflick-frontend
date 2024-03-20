import axiosClient from "./axiosClient.js";

export const movieType = {
    popular: 'popular',
    top_rated: 'top_rated',
    upcoming: 'upcoming'
}

const tmdbApi = {
    getMovieList: (movieId, params) => {
        const url = `movie/${movieId}/lists`; 
        return axiosClient.get(url, params);
    },
    getVideos: (movieId) => {
        const url = `movie/${movieId}/videos`;
        return axiosClient.get(url, {params: {}});
    },
    search: (params) => {
        const url = `search/movie`;
        return axiosClient.get(url, params);
    },
    detail: (movieId, params) => {
        const url = `movie/${movieId}`;
        return axiosClient.get(url, params);
    },
    credits: (movieId, params) => {
        const url = `movie/${movieId}/credits`;
        return axiosClient.get(url, params)
    }
}

export default tmdbApi;