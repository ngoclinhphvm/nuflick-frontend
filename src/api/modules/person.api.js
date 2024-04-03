import publicClient from "../client/public.client.js";
import axios from "axios";
const personApi = {
    getDetails : async (id) => {
        
        try {
        const response = await publicClient.get(`person/${id}`);
        if(!response.data) return { err : "No data found" };
        return response;
        } catch (err) { return { err }; }
    },
    getMovieCredits : (id) => {
        const url = `person/${id}/movie_credits`;
        return publicClient.get(url);
    }
}
export default personApi;