/**
 * DetailScreenComps
 * A set of custom components used in the MovieDetailsScreen layout
 */

import React from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";

import { MARGIN_SIZE, MOVIE_POSTER_DETAIL_SIZE, TEXT_COLOR_ACCENT } from "../data/constants";
import { IMovieInfo } from "../data/model/model";
import MovieApi from "../data/movieApi";
import DateUtils from "../utils/dateUtils";

import { Container, Images, Typography } from "./baseComps";

/**
 * details screen title component
 * @param props
 * @param {IMovieInfo} props.movie - the movie to show
 */
export const Title = ({ movie }: { movie: IMovieInfo }) => (
    <Container.ScreenHeader>
        <Typography.Title1>{movie.title}</Typography.Title1>
        <MovieReleaseDate movie={movie} />
    </Container.ScreenHeader>
);

/**
 * movie release date component formatted for the Details screen
 */
export const MovieReleaseDate = ({ movie }: { movie: IMovieInfo }) => {
    return (
        <Typography.Title5 style={{ color: TEXT_COLOR_ACCENT }}>
            Released {DateUtils.getFormattedReleaseDate(movie)}
        </Typography.Title5>
    );
};

/**
 * navigation "back" button
 */
export const BackButton = ({ onPress }) =>
    Platform.OS === "ios" ? (
        <TouchableOpacity onPress={onPress}>
            <Typography.Title5 style={{ color: TEXT_COLOR_ACCENT }}>{"< Back"}</Typography.Title5>
        </TouchableOpacity>
    ) : null;

/**
 * Movie Details screen content. Takes a single IMovieInfo and displays a summary and poster image for the movie.
 * Utilizes the ScrollView component, since we're not showing a lot of information,
 * but we might need to accomodate small screens if the content is too big
 *
 * @param props
 * @param {IMovieInfo} props.movie - the movie to show details for
 */
export const MovieDetails = ({ movie }) => (
    <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false} indicatorStyle={"white"}>
        <View style={{ padding: MARGIN_SIZE * 4, flexDirection: "row" }}>
            <Typography.Body style={{ flex: 1 }}>{movie.overview}</Typography.Body>
            <Images.MoviePoster
                movie={movie}
                size={MOVIE_POSTER_DETAIL_SIZE}
                style={{
                    marginLeft: MARGIN_SIZE * 2
                }}
            />
        </View>
    </ScrollView>
);
