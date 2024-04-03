import publicClient from "../client/public.client.js";

class LoginApi {
    login = (data) => {
        const url = '/login';
        return publicClient.post(url, data);
    }
}

export default new LoginApi();