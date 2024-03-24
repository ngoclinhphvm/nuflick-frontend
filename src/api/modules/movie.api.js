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
    getMovieList: async () => {
        try {
            const response = await publicClient.get(
                `movie/popular`
            );
            return { response };
        } catch (err) { return { err }; }
    }
}

export default MovieApi;