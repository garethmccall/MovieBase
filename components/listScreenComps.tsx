/**
 * ListScreenComps
 * A set of custom components used in the MovieListScreen layout
 */

import React from "react";
import {
    ActivityIndicator,
    FlatList,
    Linking,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Container, Images, Typography } from "./baseComps";

import {
    MARGIN_SIZE,
    MOVIE_POSTER_LIST_SIZE,
    SCREEN_FOOTER_HEIGHT,
    TEXT_COLOR_ACCENT
} from "../data/constants";
import { IMovieInfo } from "../data/model/model";
import MovieApi from "../data/movieApi";
import DateUtils from "../utils/dateUtils";

const OpenTMDB = () => Linking.openURL("https://www.themoviedb.org/");

/**
 * Title component to show at the top of the screen
 */
export const Title = () => (
    <Container.ScreenHeader>
        <Container.ScreenNavigationBar />
        <Typography.Title1>Popular Movies</Typography.Title1>
        <TouchableOpacity onPress={OpenTMDB}>
            <Typography.Legal>
                Powered by <Typography.Link>The Movie Database</Typography.Link>
            </Typography.Legal>
        </TouchableOpacity>
    </Container.ScreenHeader>
);

/**
 * Movie list row. Takes a single IMovieInfo and displays the title, release date and poster image.
 *
 * @param props
 * @param {IMovieInfo} props.item - the movie to show
 * @param {function} props.onPress - callback when row is tapped
 */
const MovieListItem = ({
    item,
    onPress
}: {
    item: IMovieInfo;
    onPress: (movieInfo: IMovieInfo) => void;
}) => {
    const moviePosterUri = MovieApi.getMoviePosterUrl(item);
    const pressHandler = () => {
        onPress(item);
    };
    return (
        <Container.ListItem>
            <TouchableHighlight onPress={pressHandler} underlayColor={"#FFF6"}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "black",
                        padding: MARGIN_SIZE * 2
                    }}
                >
                    <Images.MoviePoster
                        source={{ uri: moviePosterUri }}
                        size={MOVIE_POSTER_LIST_SIZE}
                        style={{ marginRight: MARGIN_SIZE * 2 }}
                    />
                    <View style={{ flex: 1 }}>
                        <Typography.Title4 numberOfLines={3}>{item.title}</Typography.Title4>
                        <Typography.Body
                            style={{ marginTop: MARGIN_SIZE, color: TEXT_COLOR_ACCENT }}
                        >
                            Released: {DateUtils.getFormattedReleaseDate(item)}
                        </Typography.Body>
                    </View>
                </View>
            </TouchableHighlight>
        </Container.ListItem>
    );
};

const keyExtractor = (item: IMovieInfo, index: number) => `movieRow_${index}_${item.id.toString()}`;

/**
 * footer to show at the bottom of the list when more movies are being loaded
 */
const MovieListFooter = () => (
    <Container.ListFooter>
        <Typography.Title3>🎬✨</Typography.Title3>
        <Typography.Body>Could't load anymore movies!</Typography.Body>
    </Container.ListFooter>
);

/**
 * footer to show at the bottom of the list when more movies are NOT being loaded
 */
const LoadingFooter = () => (
    <Container.ListFooter>
        <ActivityIndicator size={"large"} color={"#ffff"} />
    </Container.ListFooter>
);

/**
 * movie list component. takes a big array of IMovieInfo.
 * utilizes the FlatList component, which offers better performance for long lists.
 * includes pull-to-refresh and "infinite scrolling" functionality
 */
interface IPropsMovieList {
    data: IMovieInfo[];
    loading: boolean;
    onEndReached: ((info: { distanceFromEnd: number }) => void) | null;
    onItemPress: (movieInfo: IMovieInfo) => void | null;
    onRefresh: () => void | null;
    refreshing: boolean;
    style: object;
}

export const MovieList = (props: IPropsMovieList) => {
    const renderItem = ({ item }) => <MovieListItem item={item} onPress={props.onItemPress} />;
    return (
        <View style={props.style}>
            <FlatList<IMovieInfo>
                {...props}
                contentContainerStyle={{
                    paddingBottom: SCREEN_FOOTER_HEIGHT,
                    paddingHorizontal: MARGIN_SIZE * 4,
                    paddingTop: MARGIN_SIZE * 8
                }}
                keyExtractor={keyExtractor}
                ListFooterComponent={props.loading ? LoadingFooter : MovieListFooter}
                renderItem={renderItem}
                style={{ flex: 1 }}
                indicatorStyle={"white"}
            />
            <LinearGradient
                colors={["#000f", "#0000"]}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: MARGIN_SIZE * 4,
                    marginHorizontal: MARGIN_SIZE * 4
                }}
            />
            <LinearGradient
                colors={["#0000", "#000f"]}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: SCREEN_FOOTER_HEIGHT,
                    marginHorizontal: MARGIN_SIZE * 4
                }}
            />
        </View>
    );
};
