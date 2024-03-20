const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'YOUR_API_KEY',
    backdropImg: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    posterImg: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`
}

export default apiConfig;