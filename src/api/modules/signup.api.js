import publicClient from "../client/public.client.js";

class SignupApi {
    signUp = (data) => {
        const url = '/signup';
        return publicClient.post(url, data);
    }
}

export default new SignupApi();