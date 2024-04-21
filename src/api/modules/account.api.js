import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";
import axios from "axios";

const accountApi = {
    login : async (data) => {
        const url = '/account/login';
        try {
            const request = await publicClient.post(url, data);
            return request;
        } catch (err) {
            return { err };
        }
    },
    signUp : async (data) => {
        const url = '/account/signup';
        try {
            const request = await publicClient.post(url, data);
            return request;
        } catch (err) {
            return { err };
        }
    },
    getInfo: async (username) => {
    const url = `account/${username}`;
    try {
        const response = await publicClient.get(url);
        return response;
    } catch (err) {
        return { err };
    }
    },
    getFavorite: async (username) => {
    const url = `account/${username}/favorite`;
    try {
        const response = await publicClient.get(url);
        return response;
    } catch (err) {
        return { err };
    }
    },
    addFavorite: async (username, movieId, accessToken) => {
        const url = `account/${username}/addfavorite/${movieId}`;
        console.log(url);
        try {
            const response = await publicClient.post(
                url,
                {},
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                }
            );
            return response;
        } catch (err) { 
            console.log(err);
            return { err };
        }
    },
    removeFavorite: async (username, movieId, accessToken) => {
        const url = `account/${username}/removefavorite/${movieId}`;
        try {
            const response = await publicClient.post(
                url,
                {},
                {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                }
            );
            return response;
        } catch (err) {
            return { err };
        }
    }

}
export default accountApi;