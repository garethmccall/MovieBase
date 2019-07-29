/**
 * MovieApi
 * Provides interfaces and functions to query the TMDB API
 */

import { MOVIE_API_BASE_URL, MOVIE_API_KEY, MOVIE_API_POSTER_SIZE } from "./constants";
import { IMovieInfo } from "./model/model";

/**
 * definitions for API requests.
 * right now we are just using GET requests with URL parameters and no additional data.
 */
interface IMovieAPIRequestParameters {
    [key: string]: string | number;
}

class MovieAPIGetRequest {
    private path: string;
    private urlParams: IMovieAPIRequestParameters;

    constructor(path: string, params: IMovieAPIRequestParameters = {}) {
        this.path = path;
        // automatically add the API key to the parameter list
        this.urlParams = {
            api_key: MOVIE_API_KEY,
            ...params
        };
    }

    public fetchUrl(): string {
        // build the query string from the parameters
        const queryString = Object.keys(this.urlParams).reduce(
            (acc, key) => `${acc}&${key}=${this.urlParams[key]}`,
            "?"
        );
        const getUrl = `${MOVIE_API_BASE_URL}${this.path}${queryString}`;
        return getUrl;
    }
}

class MovieAPIGetPopularMoviesRequest extends MovieAPIGetRequest {
    constructor(pageNumber: number) {
        super("/movie/popular", { page: pageNumber });
    }
}

class MovieAPIGetConfigurationRequest extends MovieAPIGetRequest {
    constructor() {
        super("/configuration");
    }
}

/**
 * definitions for the two API responses we can receive
 */
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

/**
 *  singleton pattern: define a class, create a single instance of the class, and export the instance
 */

class MovieApi {
    private moviePosterBaseURL?: string;

    constructor() {
        this.init();
    }

    /**
     * takes a movie object and returns the URL of the movie poster image on TMDB
     * (returns null if configuration call failed or has not yet completed)
     *
     * @param {IMovieInfo} movie - the movie object
     */
    public getMoviePosterUrl(movie: IMovieInfo) {
        if (this.moviePosterBaseURL) {
            return `${this.moviePosterBaseURL}${MOVIE_API_POSTER_SIZE}${movie.poster_path}`;
        }
        return null;
    }

    /**
     * returns the results of a "/movie/popular" call to the TMDB API
     *
     * @param {number} pageNumber - the page of results to get. returns 20 items per page
     */
    public async getPopularMovies(pageNumber: number = 1): Promise<IPopularMoviesResponse> {
        try {
            const request = new MovieAPIGetPopularMoviesRequest(pageNumber);
            const response = await this.executeApiGet(request);
            const responseText = await response.text();
            const responseJson = JSON.parse(responseText) as IPopularMoviesResponse;
            return responseJson;
        } catch (err) {
            console.warn(`could not parse popular movies API response: ${err}`);
        }
    }

    /**
     * generic API request function. takes any MovieApiGetRequest instance and attempts to fetch it
     *
     * @param {MovieApiGetRequest} request - the request to send
     */
    private async executeApiGet(request: MovieAPIGetRequest): Promise<Response> {
        try {
            const url = request.fetchUrl();
            const response = await fetch(url);
            return response;
        } catch (err) {
            console.warn(`could not execute API request ${request.fetchUrl}: ${err}`);
        }
    }

    /**
     * initial setup for MovieApi. gets the base URL for movie posters (needed for "getMoviePosterUrl")
     */
    private async init() {
        try {
            const configurationRequest = new MovieAPIGetConfigurationRequest();
            const configurationResponse = await this.executeApiGet(configurationRequest);
            const configurationText = await configurationResponse.text();
            const configurationJson = JSON.parse(configurationText) as IConfigurationResponse;
            this.moviePosterBaseURL = configurationJson.images.secure_base_url;
        } catch (err) {
            console.warn(`could not get base URL for movie posters: ${err}`);
        }
    }
}

const instance = new MovieApi();
export default instance as MovieApi;
