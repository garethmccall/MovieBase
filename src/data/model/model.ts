/**
 * Model
 * Right now we just have one entity in our model: IMovieInfo
 */

export interface IMovieInfo {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
}
