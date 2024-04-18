
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
    getImages: async (movieId) => {
        try {
            const response = await publicClient.get(
                `movie/images/${movieId}`
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
    getDiscover: async (page, with_genres, primary_release_year, language ) => {
    try {
       
        const response = await publicClient.get('movie', {
            params: {
                page,
                with_genres,
                // 'primary_release_date.gte': primary_release_date,
                primary_release_year,
                language
                //sort_by: popularity.desc
            }
        });
        return { response };
    } catch (err) {
        return { err };
    }
},
    getSimilar: async (movieId) => {
        try {
            const response = await publicClient.get(
                `movie/similar/${movieId}`
            );
            return { response };
        } catch (err) { return { err }; }
    },
    getImages: async(movieId) => {
        try {
            const response = await publicClient.get(
                `movie/images/${movieId}`
            );
            return { response };
        } catch (err) { return { err }; }
    },
    getReviews: async (movieId) => {
        try {
            const response = await publicClient.get(
                `movie/reviews/${movieId}`
            );
            return { response };
        } catch (err) { return { err }; }
    }
}

export default MovieApi;