import { MOVIE_API_BASE_URL, MOVIE_API_KEY } from "./constants";
import { PopularMoviesResponse, Movie } from "./model/model";

export default class MovieApi {
    static async executeApiCall(
        path: string,
        params: [[string, string | number]]
    ): Promise<Response> {
        try {
            const queryString = params.reduce(
                (acc, param) => `${acc}&${param[0]}=${[param[1]]}`,
                ""
            );
            const getUrl = `${MOVIE_API_BASE_URL}${path}?api_key=${MOVIE_API_KEY}${queryString}`;
            const response = await fetch(getUrl);
            return response;
        } catch (err) {
            console.warn(err);
            return null;
        }
    }

    static async getPopularMovies(pageNumber: number = 1): Promise<Movie[]> {
        try {
            const response = await this.executeApiCall("movie/popular", [["page", pageNumber]]);
            const responseText = await response.text();
            const responseJson = JSON.parse(responseText) as PopularMoviesResponse;
            const movies = responseJson.results;
            return movies;
        } catch (err) {
            console.warn(err);
            return [];
        }
    }
}
