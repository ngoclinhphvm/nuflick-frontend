import publicClient from '../client/public.client.js';
const reviewApi = {
    async getDetails(id) {
        try {
            const response = await publicClient.get(`review/${id}`);
            if (!response) return { err: "No data found" };
            return response;
        } catch (err) {
            return { err };
        }
    }
}

export default  reviewApi;