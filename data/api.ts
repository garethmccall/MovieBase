// import {MOVIE_API_BASE_URL, MOVIE_API_KEY} from "./constants";
import {Movie} from "./model/model";

const MOVIE_API_KEY = "4b9bed2c7974d3e2ed5c2879df2fb7e2";
const MOVIE_API_BASE_URL = "https://api.themoviedb.org/3/";

export default class MovieApi {
    static async executeApiCall(path: string, params:[[string, string | number]]) : Promise<Response> {
        try {
            const queryString = params.reduce((acc,param)=>`${acc}&${param[0]}=${[param[1]]}`, "")
            const getUrl = `${MOVIE_API_BASE_URL}${path}?api_key=${MOVIE_API_KEY}${queryString}`
            const response = await fetch(getUrl)
            return response;
        } catch (err) {
            console.warn(err);
            return null;
        }
    }

    static async getTrendingMovies(pageNumber: number = 1) : Promise<Array<Movie>> {
        try {
            const response = await this.executeApiCall("movie/popular", [["page", pageNumber]]);
            const responseText = await response.text()
            const responseJson = JSON.parse(responseText);
            const movies = responseJson.results.map(movieObj=>(new Movie(movieObj)));
            return movies;
        } catch (err) {
            console.warn(err)
            return [];
        }
    }
}