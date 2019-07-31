/**
 * MovieList
 * movie list components
 */
import React from "react";
import { ActivityIndicator, FlatList, TouchableHighlight, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import DateUtils from "../utils/dateUtils";
import { Container, Images, Typography } from "./baseComps";

import {
    MARGIN_SIZE,
    MOVIE_POSTER_LIST_SIZE,
    SCREEN_FOOTER_HEIGHT,
    TEXT_COLOR_ACCENT
} from "../data/constants";
import { IMovieInfo } from "../data/model/model";
import MovieApi from "../data/movieApi";

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
                        movie={item}
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

/**
 * takes a big array of IMovieInfo and displays them in a FlatList
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

export class MovieList extends React.Component<IPropsMovieList, {}> {
    public render() {
        return (
            <View style={this.props.style}>
                <FlatList<IMovieInfo>
                    {...this.props}
                    contentContainerStyle={{
                        paddingBottom: SCREEN_FOOTER_HEIGHT,
                        paddingHorizontal: MARGIN_SIZE * 4,
                        paddingTop: MARGIN_SIZE * 8
                    }}
                    indicatorStyle={"white"}
                    keyExtractor={this.keyExtractor}
                    ListFooterComponent={this.renderFooter}
                    renderItem={this.renderItem}
                    style={{ flex: 1 }}
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
    }

    private keyExtractor = (item: IMovieInfo, index: number) =>
        `movieRow_${index}_${item.id.toString()}`;

    private renderFooter = () => {
        let footerContent;
        if (this.props.loading) {
            footerContent = <ActivityIndicator size={"large"} color={"#ffff"} />;
        } else {
            footerContent = (
                <>
                    <Typography.Title3>🎬✨</Typography.Title3>
                    <Typography.Body>That's all the movies!</Typography.Body>
                </>
            );
        }
        return <Container.ListFooter>{footerContent}</Container.ListFooter>;
    };

    private renderItem = ({ item }) => (
        <MovieListItem item={item} onPress={this.props.onItemPress} />
    );
}
