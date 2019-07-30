import { MOVIE_API_BASE_URL, MOVIE_API_KEY, MOVIE_API_POSTER_SIZE } from "./constants";
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

interface IConfigurationResponse {
    images: {
        base_url: string;
        secure_base_url: string;
        backdrop_sizes: string[];
        logo_sizes: string[];
        poster_sizes: string[];
        profile_sizes: string[];
        still_sizes: string[];
    };
    change_keys: string[];
}

interface IPopularMoviesResponse {
    page: number;
    results: IMovieInfo[];
    total_results: number;
    total_pages: number;
}

class MovieApi {
    private moviePosterBaseURL?: string;

    constructor() {
        this.init();
    }

    public getMoviePosterUrl(movie: IMovieInfo) {
        if (this.moviePosterBaseURL) {
            return `${this.moviePosterBaseURL}${MOVIE_API_POSTER_SIZE}${movie.poster_path}`;
        }
        return null;
    }

    public async getPopularMovies(pageNumber: number = 1): Promise<IPopularMoviesResponse> {
        try {
            const request = new MovieAPIGetRequest("/movie/popular", { page: pageNumber });
            const response = await this.executeApiGet(request);
            const responseText = await response.text();
            const responseJson = JSON.parse(responseText) as IPopularMoviesResponse;
            return responseJson;
        } catch (err) {
            console.warn(`could not parse popular movies API response: ${err}`);
        }
    }

    private async executeApiGet(request: MovieAPIGetRequest): Promise<Response> {
        try {
            const url = request.fetchUrl();
            const response = await fetch(url);
            return response;
        } catch (err) {
            console.warn(`could not execute API request ${request.fetchUrl}: ${err}`);
        }
    }

    private async init() {
        try {
            const configurationRequest = new MovieAPIGetRequest("/configuration");
            const configurationResponse = await this.executeApiGet(configurationRequest);
            const configurationText = await configurationResponse.text();
            const configurationJson = JSON.parse(configurationText) as IConfigurationResponse;
            this.moviePosterBaseURL = configurationJson.images.secure_base_url;
        } catch (err) {
            console.warn(`could not get base URL for movie posters: ${err}`);
        }
    }
}

export default new MovieApi();
