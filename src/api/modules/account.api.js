import publicClient from "../client/public.client.js";

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
            const request = await publicClient.get(url);
            return request;
        } catch (err) {
            return { err };
        }
    },
    getFavorite: async (username) => {
        const url = `account/${username}/favorite`;
        try {
            const request = await publicClient.get(url);
            return request;
        } catch (err) {
            return { err };
        }
    }

}
export default accountApi;