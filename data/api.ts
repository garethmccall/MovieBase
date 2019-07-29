import { MOVIE_API_BASE_URL, MOVIE_API_KEY } from "./constants";
import { IMovieInfo } from "./model/model";

interface IMovieAPIRequestParameters {
    [key: string]: string | number;
}

class MovieAPIGetRequest {
    private path: string;
    private urlParams: IMovieAPIRequestParameters;

    constructor(path: string, params: IMovieAPIRequestParameters = {}) {
        this.path = path;
        this.urlParams = {
            api_key: MOVIE_API_KEY,
            ...params
        };
    }

    public fetchUrl(): string {
        const queryString = Object.keys(this.urlParams).reduce(
            (acc, key) => `${acc}&${key}=${this.urlParams[key]}`,
            "?"
        );
        const getUrl = `${MOVIE_API_BASE_URL}${this.path}${queryString}`;
        return getUrl;
    }
}

interface IPopularMoviesResponse {
    page: number;
    results: IMovieInfo[];
    total_results: number;
    total_pages: number;
}

export default class MovieApi {
    public static async getPopularMovies(pageNumber: number = 1): Promise<IPopularMoviesResponse> {
        try {
            const request = new MovieAPIGetRequest("movie/popular", { page: pageNumber });
            const response = await this.executeApiGet(request);
            const responseText = await response.text();
            const responseJson = JSON.parse(responseText) as IPopularMoviesResponse;
            return responseJson;
        } catch (err) {
            console.warn(err);
        }
    }

    private static async executeApiGet(request: MovieAPIGetRequest): Promise<Response> {
        try {
            const url = request.fetchUrl();
            const response = await fetch(url);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }
}
