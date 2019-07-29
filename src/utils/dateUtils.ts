/**
 * DateUtils
 * Provides convenience functions for parsing and formatting dates
 */

import { IMovieInfo } from "../data/model/model";

export default class DateUtils {
    public static getFormattedReleaseDate = (movie: IMovieInfo) =>
        new Date(movie.release_date).toLocaleDateString("en-CA", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}
