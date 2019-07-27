export interface PopularMoviesResponse {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
}
