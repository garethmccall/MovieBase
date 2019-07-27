import { MOVIE_API_BASE_URL, MOVIE_API_KEY } from "./constants";
import { IMovieInfo } from "./model/model";

class MovieAPIRequest {
    path: string;
    params: MovieAPIRequestParameter[];

    constructor(path: string, params: MovieAPIRequestParameter[] = []) {
        this.path = path;
        this.params = [MovieAPIRequestParameter.create({ api_key: MOVIE_API_KEY })].concat(params);
    }

    fetchUrl(): string {
        const queryString = this.params.reduce(
            (acc, param) => `${acc}&${param.key}=${param.value}`,
            "?"
        );
        const getUrl = `${MOVIE_API_BASE_URL}${this.path}${queryString}`;
        return getUrl;
    }
}

class MovieAPIRequestParameter {
    static create(from: { [key: string]: string | number }): MovieAPIRequestParameter {
        const me = new MovieAPIRequestParameter();
        me.key = Object.keys(from)[0];
        me.value = Object.values(from)[0];
        return me;
    }

    key: string;
    value: string | number;
}

interface IPopularMoviesResponse {
    page: number;
    results: IMovieInfo[];
    total_results: number;
    total_pages: number;
}

export default class MovieApi {
    static async executeApiCall(request: MovieAPIRequest): Promise<Response> {
        try {
            const url = request.fetchUrl();
            const response = await fetch(url);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    static async getPopularMovies(pageNumber: number = 1): Promise<IMovieInfo[]> {
        try {
            const request = new MovieAPIRequest("movie/popular", [
                MovieAPIRequestParameter.create({ page: pageNumber })
            ]);
            const response = await this.executeApiCall(request);
            const responseText = await response.text();
            const responseJson = JSON.parse(responseText) as IPopularMoviesResponse;
            const movies = responseJson.results;
            return movies;
        } catch (err) {
            console.warn(err);
            return [];
        }
    }
}
