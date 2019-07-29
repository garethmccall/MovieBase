import React from "react";
import { ActivityIndicator, FlatList, Linking, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { MARGIN_SIZE, SCREEN_FOOTER_HEIGHT } from "../data/constants";
import { IMovieInfo } from "../data/model/model";
import { Container, Typography } from "./baseComps";

const OpenTMDB = () => Linking.openURL("https://www.themoviedb.org/");

export const Title = () => (
    <Container.ScreenHeader>
        <Typography.Title1>Popular Movies</Typography.Title1>
        <TouchableOpacity onPress={OpenTMDB}>
            <Typography.Legal style={{ color: "#000A" }}>
                Powered by <Typography.Link>The Movie Database</Typography.Link>
            </Typography.Legal>
        </TouchableOpacity>
    </Container.ScreenHeader>
);

const MovieListItem = ({ item }: { item: IMovieInfo }) => {
    const releaseDate = new Date(item.release_date);
    const dateFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    const releaseDateFormatted = releaseDate.toLocaleDateString("en-CA", dateFormatOptions);
    return (
        <Container.ListItem>
            <Typography.Title4 numberOfLines={1}>{item.title}</Typography.Title4>
            <Typography.Body style={{ marginTop: 4, color: "#000A" }}>
                Released: {releaseDateFormatted}
            </Typography.Body>
        </Container.ListItem>
    );
};

const keyExtractor = (item: IMovieInfo, index: number) => `movieRow_${index}_${item.id.toString()}`;

const MovieListFooter = () => (
    <Container.ListFooter>
        <Typography.Title3>🎬✨</Typography.Title3>
        <Typography.Body>Could't load anymore movies!</Typography.Body>
    </Container.ListFooter>
);

const LoadingFooter = () => (
    <Container.ListFooter>
        <ActivityIndicator size={"large"} color={"#0004"} />
    </Container.ListFooter>
);

interface IPropsMovieList {
    data: IMovieInfo[];
    onEndReached: ((info: { distanceFromEnd: number }) => void) | null;
    style: object;
    loading: boolean;
}

export const MovieList = (props: IPropsMovieList) => (
    <View style={props.style}>
        <FlatList<IMovieInfo>
            {...props}
            contentContainerStyle={{
                paddingBottom: 60,
                paddingHorizontal: 16,
                paddingTop: 32
            }}
            keyExtractor={keyExtractor}
            ListFooterComponent={props.loading ? LoadingFooter : MovieListFooter}
            renderItem={MovieListItem}
            style={{ flex: 1 }}
        />
        <LinearGradient
            colors={["#ffff", "#fff0"]}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: MARGIN_SIZE * 4 }}
        />
        <LinearGradient
            colors={["#fff0", "#ffff"]}
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: SCREEN_FOOTER_HEIGHT
            }}
        />
    </View>
);
