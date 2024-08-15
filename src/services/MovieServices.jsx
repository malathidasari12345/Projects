const Key = process.env.REACT_APP_TMDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

if (!Key) {
    throw new Error("TMDB API Key is not defined!");
}

const endpoints = {
    popular: `${baseUrl}/movie/popular?api_key=${Key}`,
    topRated: `${baseUrl}/movie/top_rated?api_key=${Key}`,
    trending: `${baseUrl}/trending/movie/day?api_key=${Key}&language=en-US&page=2`,
    comedy: `${baseUrl}/search/movie?api_key=${Key}&language=en-US&query=comedy&page=1&include_adult=false`,
    upcoming: `${baseUrl}/movie/upcoming?api_key=${Key}`,
};

export function CreateImageUrl(filename, size){
    return `http://image.tmdb.org/t/p/${size}/${filename}`
}

export default endpoints;
