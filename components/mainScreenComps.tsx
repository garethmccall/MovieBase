import React from "react";
import { FlatList, Linking, ListRenderItem, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { IMovieInfo } from "../data/model/model";

const OpenTMDB = () => Linking.openURL("https://www.themoviedb.org/");

export const Title = () => (
    <View style={{ marginVertical: 32, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 48 }}>Popular Movies</Text>
        <TouchableOpacity onPress={OpenTMDB}>
            <Text style={{ fontSize: 12, color: "#000A" }}>
                {`Powered by `}
                <Text style={{ textDecorationLine: "underline" }}>The Movie Database</Text>
            </Text>
        </TouchableOpacity>
    </View>
);

export const ListItem = ({ item }: { item: IMovieInfo }) => {
    const releaseDate = new Date(item.release_date);
    const dateFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    const releaseDateFormatted = releaseDate.toLocaleDateString("en-CA", dateFormatOptions);
    return (
        <View
            style={{
                borderColor: "black",
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 8
            }}
        >
            <Text style={{ fontSize: 24 }} numberOfLines={1}>
                {item.title}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 4, color: "#000A" }}>
                Released: {releaseDateFormatted}
            </Text>
        </View>
    );
};

interface IPropsMovieList {
    data: IMovieInfo[];
    keyExtractor: (item: IMovieInfo, index: number) => string;
    renderItem: ListRenderItem<IMovieInfo>;
    style: object;
    contentContainerStyle: object;
}

export const MovieList = (props: IPropsMovieList) => (
    <View style={props.style}>
        <FlatList<IMovieInfo> {...props} style={{ flex: 1 }} />
        <LinearGradient
            colors={["#ffff", "#fff0"]}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 32 }}
        />
        <LinearGradient
            colors={["#fff0", "#ffff"]}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60 }}
        />
    </View>
);
