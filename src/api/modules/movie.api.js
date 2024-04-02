import publicClient from "../client/public.client.js";
const MovieApi = {
    getInfo : async (movieId) => {
        try {
            const response = await publicClient.get(
                `movie/${movieId}`
            );
            return  {response} ;
        } catch (err) { return { err }; }
    },
    getMovieList: async ({movieType}) => {
        try {
            const response = await publicClient.get(
                `movie/${movieType}`
            );
            return { response };
        } catch (err) { return { err }; }
    },
    getVideos: async (movieId) => {
        try {
            const response = await publicClient.get(
                `movie/videos/${movieId}`
            );
            return { response };
        } catch (err) { return { err }; }
    },
    getCredits: async (movieId) => {
        try {
            const response = await publicClient.get(
                `movie/credits/${movieId}`
            );
            return { response };
        } catch (err) { return { err }; }
    },
    search: async (query) => {
        try {
            const response = await publicClient.get(
                `movie/search?query=${query}`
            );
            return { response };
        } catch (err) { return { err }; }
    },
}

export default MovieApi;